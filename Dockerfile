# ---------- Build stage ----------
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies (cache package.json)
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build the Vite app
RUN npm run build

# ---------- Production stage ----------
FROM nginx:stable-alpine AS production
# Remove default nginx html
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy our nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Use a non-daemon command so container runs in foreground
CMD ["nginx", "-g", "daemon off;"]
