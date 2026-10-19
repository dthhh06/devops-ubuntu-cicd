#!/usr/bin/env bash
set -euo pipefail

CONFIG="/etc/nginx/sites-available/devops-app"
ENABLED="/etc/nginx/sites-enabled/devops-app"

if [[ $EUID -ne 0 ]]; then
    echo "Please run with sudo"
    exit 1
fi

if ! command -v nginx >/dev/null 2>&1; then
    echo "Nginx is not installed."
    exit 1
fi

BACKUP="/etc/nginx/devops-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP"
cp -a /etc/nginx/nginx.conf "$BACKUP/"
cp -a /etc/nginx/sites-available "$BACKUP/"
cp -a /etc/nginx/sites-enabled "$BACKUP/"

cat > "$CONFIG" <<'EOF'
server {
    listen 80;
    server_name localhost;

    client_max_body_size 20M;
    keepalive_timeout 30s;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

ln -sfn "$CONFIG" "$ENABLED"

if [[ -L /etc/nginx/sites-enabled/default ]]; then
    rm /etc/nginx/sites-enabled/default
fi

if nginx -t; then
    systemctl reload nginx
    echo "Nginx configured successfully!"
    echo "Backup: $BACKUP"
else
    echo "Nginx validation failed."
    echo "Restore configuration from: $BACKUP"
    exit 1
fi
