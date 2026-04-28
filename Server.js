const express = require("express");
const cors    = require("cors");
const jwt     = require("jsonwebtoken");

const app    = express();
const SECRET = "nx-desk-secret-key"; // change this in production

app.use(cors());
app.use(express.json());

// ─────────────────────────────────────────────
//  In-memory user store (replace with DB later)
// ─────────────────────────────────────────────
let users = [
  {
    id: 1,
    name:     "Admin User",
    email:    "admin@tech9labs.com",
    password: "admin123",
    role:     "admin",
    modules:  { Dashboard: true, Sales: true, Operations: true, Support: true, Reports: true, Settings: true },
    active:   true,
  },
  {
    id: 2,
    name:     "Sales User",
    email:    "sales@tech9labs.com",
    password: "sales123",
    role:     "sales",
    modules:  { Dashboard: true, Sales: true, Operations: false, Support: false, Reports: true, Settings: false },
    active:   true,
  },
  {
    id: 3,
    name:     "Support User",
    email:    "support@tech9labs.com",
    password: "support123",
    role:     "support",
    modules:  { Dashboard: true, Sales: false, Operations: true, Support: true, Reports: false, Settings: false },
    active:   true,
  },
  {
    id: 4,
    name:     "Viewer",
    email:    "viewer@tech9labs.com",
    password: "viewer123",
    role:     "user",
    modules:  { Dashboard: true, Sales: false, Operations: false, Support: false, Reports: false, Settings: false },
    active:   true,
  },
    {
    id: 5,
    name:     "Mandeep Singh",
    email:    "mandeep@tech9labs.com",
    password: "mandeep123",
    role:     "user",
    modules:  { Dashboard: true, Sales: true, Operations: true, Support: true, Reports: true, Settings: true },
    active:   true,
  },
];

// ─────────────────────────────────────────────
//  Middleware — verify JWT token
// ─────────────────────────────────────────────
function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "No token provided" });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

function adminOnly(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
}

// ─────────────────────────────────────────────
//  POST /login
// ─────────────────────────────────────────────
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  if (!user.active) {
    return res.status(403).json({ error: "Account is inactive" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    SECRET,
    { expiresIn: "8h" }
  );

  res.json({
    token,
    role:    user.role,
    name:    user.name,
    email:   user.email,
    modules: user.modules,
  });
});

// ─────────────────────────────────────────────
//  GET /users  (admin only)
// ─────────────────────────────────────────────
app.get("/users", authMiddleware, adminOnly, (req, res) => {
  // Don't send passwords to the client
  const safe = users.map(({ password, ...rest }) => rest);
  res.json(safe);
});

// ─────────────────────────────────────────────
//  POST /users — create new user  (admin only)
// ─────────────────────────────────────────────
app.post("/users", authMiddleware, adminOnly, (req, res) => {
  const { name, email, password, role, modules } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ error: "Email already exists" });
  }

  const newUser = {
    id:       Date.now(),
    name:     name || email.split("@")[0],
    email,
    password,
    role:     role || "user",
    modules:  modules || { Dashboard: true, Sales: false, Operations: false, Support: false, Reports: false, Settings: false },
    active:   true,
  };

  users.push(newUser);

  const { password: _pw, ...safeUser } = newUser;
  res.status(201).json({ success: true, user: safeUser });
});

// ─────────────────────────────────────────────
//  DELETE /users/:id  (admin only)
// ─────────────────────────────────────────────
app.delete("/users/:id", authMiddleware, adminOnly, (req, res) => {
  const id = parseInt(req.params.id);

  if (id === req.user.id) {
    return res.status(400).json({ error: "Cannot delete your own account" });
  }

  const before = users.length;
  users = users.filter((u) => u.id !== id);

  if (users.length === before) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ success: true });
});

// ─────────────────────────────────────────────
//  PATCH /users/:id — update role or active status  (admin only)
// ─────────────────────────────────────────────
app.patch("/users/:id", authMiddleware, adminOnly, (req, res) => {
  const id   = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) return res.status(404).json({ error: "User not found" });

  const { role, active, modules, name } = req.body;
  if (role    !== undefined) user.role    = role;
  if (active  !== undefined) user.active  = active;
  if (modules !== undefined) user.modules = modules;
  if (name    !== undefined) user.name    = name;

  const { password: _pw, ...safeUser } = user;
  res.json({ success: true, user: safeUser });
});

// ─────────────────────────────────────────────
//  GET /me — verify token and return current user
// ─────────────────────────────────────────────
app.get("/me", authMiddleware, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  const { password: _pw, ...safeUser } = user;
  res.json(safeUser);
});

// ─────────────────────────────────────────────
//  Health check
// ─────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({ status: "ok", users: users.length });
});

// ─────────────────────────────────────────────
//  Start
// ─────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n  NX-Desk backend running on http://localhost:${PORT}`);
  console.log(`\n  Seed credentials:`);
  users.forEach((u) =>
    console.log(`    ${u.role.padEnd(8)} │ ${u.email.padEnd(22)} │ ${u.password}`)
  );
  console.log("");
});