# Placeholder Dockerfile for Nomologi Next.js frontend
# To be adapted for production and DigitalOcean App Platform.

FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install
COPY . .
CMD ["pnpm", "dev"]
