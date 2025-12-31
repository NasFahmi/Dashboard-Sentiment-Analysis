# Multi-stage Dockerfile for React Dashboard Analysis App

# Stage 1: Build stage with Bun
FROM oven/bun:latest AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lock bunfig.toml* ./

# Install dependencies using bun
RUN bun install

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Stage 2: Production server stage
FROM nginx:alpine AS production

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx configuration (if exists) or use default
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]