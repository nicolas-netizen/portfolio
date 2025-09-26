# Multi-stage build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci --silent

# Copy source code
COPY . .

# Clean any existing dist folder and build
RUN rm -rf dist && \
    echo "=== Starting build process ===" && \
    npm run build && \
    echo "=== Build process completed ===" && \
    echo "=== Verifying build integrity ===" && \
    test -f dist/index.html && \
    test -f dist/assets/index.ec866c15.js && \
    echo "=== Build verification passed ==="

# Verify build output with detailed information
RUN echo "=== Build output verification ===" && \
    ls -la dist/ && \
    echo "=== Assets directory ===" && \
    ls -la dist/assets/ && \
    echo "=== HTML file content ===" && \
    head -50 dist/index.html && \
    echo "=== Build completed successfully ==="

# Production stage
FROM nginx:alpine

# Install gettext for envsubst
RUN apk add --no-cache gettext

# Copy built application
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Expose port
EXPOSE $PORT

# Start nginx
CMD ["/start.sh"]
