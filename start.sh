#!/bin/sh
# Replace $PORT in nginx.conf with actual port
echo "Setting up nginx with PORT: $PORT"
envsubst '$PORT' < /etc/nginx/conf.d/default.conf > /tmp/nginx.conf
mv /tmp/nginx.conf /etc/nginx/conf.d/default.conf

# Debug: List files in the nginx html directory
echo "=== Files in /usr/share/nginx/html ==="
ls -la /usr/share/nginx/html/
echo "=== Files in /usr/share/nginx/html/assets ==="
ls -la /usr/share/nginx/html/assets/ || echo "No assets directory found"

# Show the final nginx configuration
echo "=== Final nginx configuration ==="
cat /etc/nginx/conf.d/default.conf

# Test nginx configuration
echo "=== Testing nginx configuration ==="
nginx -t

# Create nginx log directory if it doesn't exist
mkdir -p /var/log/nginx

# Start nginx
echo "=== Starting nginx ==="
nginx -g 'daemon off;'
