#!/bin/sh
# Replace $PORT in nginx.conf with actual port
envsubst '$PORT' < /etc/nginx/conf.d/default.conf > /tmp/nginx.conf
mv /tmp/nginx.conf /etc/nginx/conf.d/default.conf

# Debug: List files in the nginx html directory
echo "Files in /usr/share/nginx/html:"
ls -la /usr/share/nginx/html/
echo "Files in /usr/share/nginx/html/assets:"
ls -la /usr/share/nginx/html/assets/ || echo "No assets directory found"

# Test nginx configuration
nginx -t

# Start nginx
nginx -g 'daemon off;'
