#!/bin/bash

# 1. Get the real External IP of this Google Cloud instance
REAL_IP=$(curl -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/instance/network-interfaces/0/access-configs/0/external-ip)

# 2. Update and install dependencies
sudo apt update
sudo apt install -y nodejs npm git nginx curl

# 3. Setup NodeSource for Node 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 4. Define Variables
REPO_URL="https://github.com/hamzafayaz/cloud-computing-lab-12.git"
PROJECT_NAME="cloud-computing-lab-12"
USER_NAME=$(whoami)
BUILD_PATH="/home/$USER_NAME/$PROJECT_NAME/build"

# 5. Clone and Build [cite: 98, 101, 102]
if [ -d "$PROJECT_NAME" ]; then
    sudo rm -rf "$PROJECT_NAME"
fi

git clone $REPO_URL
cd $PROJECT_NAME
npm install
npm run build

# 6. Configure Nginx [cite: 103, 104, 105]
cat <<EOF | sudo tee /etc/nginx/sites-available/default
server {
    listen 80;
    listen [::]:80;

    root $BUILD_PATH;
    index index.html index.htm;

    server_name _;

    location / {
        try_files \$uri /index.html;
    }
}
EOF

# 7. Set Permissions and Restart [cite: 105, 106]
sudo chmod o+x /home/$USER_NAME
sudo systemctl restart nginx

echo "------------------------------------------------"
echo "Deployment Complete!"
echo "Your app is live at: http://$REAL_IP"
echo "------------------------------------------------"