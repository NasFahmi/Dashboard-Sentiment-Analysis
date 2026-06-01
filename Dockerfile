# Single-stage Dockerfile for serving pre-built React Dashboard App
FROM nginx:alpine

# Copy built assets from local build
COPY dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]