#!/bin/bash
# OEL Part 2 — one-shot deploy: install deps, build React, serve with Nginx
# Usage (on VM after clone):
#   cd cloud-computing-lab-12
#   chmod +x scripts/deploy.sh
#   sudo ./scripts/deploy.sh

set -euo pipefail

if [ "$(id -u)" -ne 0 ]; then
  echo "Run with sudo: sudo ./scripts/deploy.sh"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
DEPLOY_USER="${SUDO_USER:-root}"
WEB_ROOT="/var/www/html"
NGINX_SITE="/etc/nginx/sites-available/oel-portfolio"

echo "==> Updating system packages..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y nginx git curl

if ! command -v node >/dev/null 2>&1 || [[ "$(node -v | cut -d. -f1 | tr -d v)" -lt 18 ]]; then
  echo "==> Installing Node.js 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

echo "==> Node $(node -v) | npm $(npm -v) | nginx $(nginx -v 2>&1 | awk '{print $3}')"

echo "==> Building React app in $REPO_ROOT..."
cd "$REPO_ROOT"
sudo -u "$DEPLOY_USER" npm install
sudo -u "$DEPLOY_USER" npm run build

if [ ! -f "$REPO_ROOT/build/index.html" ]; then
  echo "Build failed: build/index.html not found"
  exit 1
fi

echo "==> Deploying build to $WEB_ROOT..."
rm -rf "${WEB_ROOT:?}/"*
cp -r "$REPO_ROOT/build/"* "$WEB_ROOT/"
chown -R www-data:www-data "$WEB_ROOT"

echo "==> Configuring Nginx..."
cat >"$NGINX_SITE" <<'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;
    index index.html;

    server_name _;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

ln -sf "$NGINX_SITE" /etc/nginx/sites-enabled/default
nginx -t
systemctl enable nginx
systemctl restart nginx

EXTERNAL_IP=""
if curl -sf -H "Metadata-Flavor: Google" \
  "http://metadata.google.internal/computeMetadata/v1/instance/network-interfaces/0/access-configs/0/external-ip" \
  >/dev/null 2>&1; then
  EXTERNAL_IP="$(curl -sf -H "Metadata-Flavor: Google" \
    "http://metadata.google.internal/computeMetadata/v1/instance/network-interfaces/0/access-configs/0/external-ip")"
fi

echo ""
echo "========================================"
echo "  Deployment complete!"
if [ -n "$EXTERNAL_IP" ]; then
  echo "  Website: http://$EXTERNAL_IP"
else
  echo "  Website: http://<VM_EXTERNAL_IP>"
fi
echo "========================================"
