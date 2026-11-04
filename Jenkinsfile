pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        timestamps()
    }

    environment {
        REPO_URL = 'https://github.com/dthhh06/devops-ubuntu-cicd.git'
        IMAGE_NAME = 'devops-app'
    }

    stages {
        stage('Checkout GitHub') {
            steps {
                git branch: 'main', url: "${REPO_URL}"
            }
        }

        stage('Blue-Green Deployment') {
            steps {
                sh '''#!/bin/bash
set -Eeuo pipefail

IMAGE="${IMAGE_NAME}:build-${BUILD_NUMBER}"
PROXY="bluegreen-proxy"
CONFIG="/etc/nginx/conf.d/default.conf"

ACTIVE=""
TARGET=""
PORT=""
OLDPORT=""
SWITCH_STARTED=0

echo "========== DETECT ACTIVE ENVIRONMENT =========="

CURRENT=$(docker exec "$PROXY" cat "$CONFIG")

if echo "$CURRENT" | grep -q 'proxy_pass http://127.0.0.1:3000;'; then
    ACTIVE="blue"
    TARGET="green"
    PORT=3002
    OLDPORT=3000
elif echo "$CURRENT" | grep -q 'proxy_pass http://127.0.0.1:3002;'; then
    ACTIVE="green"
    TARGET="blue"
    PORT=3000
    OLDPORT=3002
else
    echo "ERROR: Cannot identify active environment"
    exit 1
fi

echo "ACTIVE: $ACTIVE"
echo "DEPLOY TARGET: $TARGET"

rollback() {
    echo "========== DEPLOYMENT FAILED =========="

    if [ "$SWITCH_STARTED" -eq 1 ]; then
        echo "Attempting rollback to $ACTIVE..."

        docker exec "$PROXY" sed -i \
            "s/127.0.0.1:$PORT/127.0.0.1:$OLDPORT/g" \
            "$CONFIG"

        docker exec "$PROXY" nginx -t
        docker exec "$PROXY" nginx -s reload

        echo "ROLLBACK TO $ACTIVE"
    else
        echo "Traffic unchanged. $ACTIVE remains active."
    fi
}

trap rollback ERR

echo "========== BUILD DOCKER IMAGE =========="

tar --exclude=.git -cf - . | docker build -t "$IMAGE" -

echo "========== DEPLOY STANDBY =========="

docker rm -f "devops-$TARGET" 2>/dev/null || true

docker run -d \
    --name "devops-$TARGET" \
    --restart unless-stopped \
    --log-opt max-size=5m \
    --log-opt max-file=2 \
    -p "127.0.0.1:$PORT:3000" \
    "$IMAGE"

echo "========== HEALTH CHECK =========="

HEALTHY=0

for i in $(seq 1 20); do
    STATUS=$(docker inspect \
        --format '{{.State.Health.Status}}' \
        "devops-$TARGET" 2>/dev/null || true)

    if [ "$STATUS" = "healthy" ]; then
        HEALTHY=1
        break
    fi

    sleep 3
done

if [ "$HEALTHY" -ne 1 ]; then
    echo "ERROR: New container is unhealthy"
    exit 1
fi

echo "========== SWITCH TRAFFIC =========="

SWITCH_STARTED=1

docker exec "$PROXY" sed -i \
    "s/127.0.0.1:$OLDPORT/127.0.0.1:$PORT/g" \
    "$CONFIG"

docker exec "$PROXY" nginx -t
docker exec "$PROXY" nginx -s reload

echo "========== VERIFY NEW ENVIRONMENT =========="

docker exec "$PROXY" wget -q -O /dev/null \
    http://127.0.0.1:3005/health

trap - ERR

echo "========== DEPLOYMENT SUCCESS =========="
echo "Traffic switched: $ACTIVE -> $TARGET"
echo "Previous environment retained for rollback"
'''
            }
        }
    }

    post {
        success {echo 'SUCCESS: Blue-Green deployment completed.'
        }

        failure {
            echo 'FAILED: Check deployment and rollback logs.'
        }
    }
}
