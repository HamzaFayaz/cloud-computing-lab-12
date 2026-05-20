#!/bin/bash
# One-time VM setup: Nginx + web root for Lab 13 CI/CD deploys
set -eux

export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y nginx rsync

mkdir -p /var/www/lab13
chown -R www-data:www-data /var/www/lab13
chmod -R 755 /var/www/lab13

cat >/etc/nginx/sites-available/lab13 <<'NGINX'
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/lab13;
    index index.html index.htm;

    server_name _;

    location / {
        try_files $uri /index.html;
    }
}
NGINX

rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/lab13 /etc/nginx/sites-enabled/lab13
nginx -t
systemctl enable nginx
systemctl restart nginx
