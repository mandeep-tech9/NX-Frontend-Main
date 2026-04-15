# **NX-Desk**

NX-Desk is a modern, containerized **React + Vite** frontend application designed for **enterprise-grade deployment**.
It supports scalable architecture, cloud-native deployment, AI-powered proposal generation workflows, and seamless integration with **Azure Container Apps**.

This documentation covers full architecture, development workflow, Dockerization, CI/CD, custom domains, HTTPS configuration, environment management, and operational best practices.

---

## **📌 Overview**

NX-Desk is built for:

* Sales and Proposal teams
* Automated proposal generation (AI-assisted)
* Modular multi-agent architecture
* Deployment to Azure using **Docker + Azure Container Apps + ACR**
* Custom domain mapping and **Managed HTTPS SSL**
* Future expansion:

  * Backend APIs
  * Supabase / Convex integration
  * Autoscaling
  * CrewAI orchestration
  * CI/CD automation

---

## **🏗️ Tech Stack**

| Layer            | Tools                                              |
| ---------------- | -------------------------------------------------- |
| Frontend         | React + Vite, TailwindCSS (optional), Lucide Icons |
| Container        | Docker, Nginx (SPA routing)                        |
| Cloud Hosting    | Azure Container Apps                               |
| Image Registry   | Azure Container Registry (ACR)                     |
| Domain & DNS     | Custom DNS (CNAME + TXT verification)              |
| SSL Certificates | Azure Managed Certificates                         |
| Optional Backend | Supabase, Convex, FastAPI, Node.js                 |
| CI/CD            | GitHub Actions (optional)                          |

---

## **📁 Project Structure**

```
nx-desk/
├── public/
│   └── assets/            # images, logos, static files
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
│
├── Dockerfile
├── nginx.conf
├── .dockerignore
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## **🚀 Local Development**

### **Install dependencies**

```bash
npm install
```

### **Run development server**

```bash
npm run dev
```

Access at:
➡ **[http://localhost:5173](http://localhost:5173)**

### **Production build**

```bash
npm run build
```

Build output is generated in **dist/**.

---

## **🐳 Docker (Production Build)**

### **Build Docker image**

```bash
docker build -t nx-desk:latest .
```

### **Run the container**

```bash
docker run -p 8080:80 nx-desk:latest
```

Access locally:
➡ **[http://localhost:8080](http://localhost:8080)**

### **Dockerfile Features**

* Multi-stage build (Node → Nginx)
* Optimized static file serving
* SPA routing via:

```nginx
try_files $uri $uri/ /index.html;
```

---

# **☁️ Deploying to Azure Container Apps**

## **1. Create Resource Group**

```bash
az group create --name nx-desk --location "Central India"
```

## **2. Create Azure Container Registry**

```bash
az acr create \
  --resource-group nx-desk \
  --name nxdeskacrXXXX \
  --sku Basic \
  --admin-enabled true
```

## **3. Fetch ACR Credentials**

```bash
az acr credential show --name nxdeskacrXXXX --resource-group nx-desk
```

## **4. Login & Push Image**

```bash
docker login nxdeskacrXXXX.azurecr.io -u <username> -p <password>

docker tag nx-desk:latest nxdeskacrXXXX.azurecr.io/nx-desk:latest
docker push nxdeskacrXXXX.azurecr.io/nx-desk:latest
```

## **5. Create Container Apps Environment**

```bash
az containerapp env create \
  --name nxdesk-env \
  --resource-group nx-desk \
  --location "Central India"
```

## **6. Deploy Container App**

```bash
az containerapp create \
  --name nx-desk-app \
  --resource-group nx-desk \
  --environment nxdesk-env \
  --image nxdeskacrXXXX.azurecr.io/nx-desk:latest \
  --ingress external \
  --target-port 80 \
  --registry-server nxdeskacrXXXX.azurecr.io \
  --registry-username <username> \
  --registry-password <password>
```

## **7. Retrieve Public URL**

```bash
az containerapp show \
  --name nx-desk-app \
  --resource-group nx-desk \
  --query properties.configuration.ingress.fqdn \
  -o tsv
```

---

# **🌐 Custom Domain + HTTPS**

## **1. Create CNAME record**

```
Host: nxdesk
Type: CNAME
Value: <container-app-fqdn>
```

## **2. Add TXT verification record**

Azure displays a TXT record like:

```
Host: asuid.nxdesk
Type: TXT
Value: <verification-hash>
```

## **3. Validate in Azure Portal**

Navigation:
**Container App → Custom Domains → Add Domain → Validate**

## **4. Create SSL Certificate**

**Container Apps Environment → Certificates → Create Managed Certificate**

## **5. Bind SSL to Custom Domain**

**Container App → Custom domains → Add binding**

* Binding type: **SNI**
* Certificate: your managed certificate

### **Final Domain**

➡ **[https://nxdesk.tech9labs.com](https://nxdesk.tech9labs.com)**

---

# **🔧 Environment Variables (Optional)**

### Build-time variables (Vite)

```
VITE_PUBLIC_API_URL=https://api.example.com
```

### Runtime variables (Azure Container Apps)

```bash
az containerapp update \
  --name nx-desk-app \
  --resource-group nx-desk \
  --set-env-vars "API_URL=https://example.com"
```

---

# **⚙️ GitHub Actions CI/CD (Optional)**

Example workflow in `.github/workflows/deploy.yml`:

```yaml
name: Build & Deploy NX-Desk
on:
  push:
    branches: [ "main" ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Azure Login
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}

      - name: Build Docker Image
        run: docker build -t nx-desk:latest .

      - name: ACR Login
        run: az acr login --name ${{ secrets.ACR_NAME }}

      - name: Tag & Push Image
        run: |
          docker tag nx-desk:latest ${{ secrets.ACR_NAME }}.azurecr.io/nx-desk:latest
          docker push ${{ secrets.ACR_NAME }}.azurecr.io/nx-desk:latest

      - name: Deploy to Container Apps
        run: |
          az containerapp update \
            --name nx-desk-app \
            --resource-group nx-desk \
            --image ${{ secrets.ACR_NAME }}.azurecr.io/nx-desk:latest
```

---

# **🩺 Troubleshooting**

### **SSL Certificate Pending**

* TXT record must be EXACT
* Wait 5–30 minutes
* Refresh Portal

### **Domain not mapping**

Test with:

```
dig nxdesk.tech9labs.com
dig asuid.nxdesk.tech9labs.com TXT
```

### **Blank Screen**

* Missing SPA fallback in nginx.conf
* Incorrect Vite base path
* Dist folder not copied

---

# **📈 Roadmap**

### **Completed**

✔ Containerization
✔ Azure deployment
✔ Custom domain
✔ HTTPS integration

### **Planned**

⬜ Backend (Supabase / Convex / Node API)
⬜ AI agent backend (CrewAI / LangChain)
⬜ CI/CD automation
⬜ Autoscaling (CPU / RPS)
⬜ Cloudflare CDN + WAF
⬜ Role-based dashboards

---

# **📜 License**

MIT License — free for commercial and personal use.
