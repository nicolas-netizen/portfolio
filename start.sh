#!/bin/sh
# Replace $PORT in nginx.conf with actual port
envsubst '$PORT' < /etc/nginx/conf.d/default.conf > /tmp/nginx.conf
mv /tmp/nginx.conf /etc/nginx/conf.d/default.conf

# Start nginx
nginx -g 'daemon off;'
