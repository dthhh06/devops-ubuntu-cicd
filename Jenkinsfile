pipeline {
    agent any

    stages {
        stage('Checkout Source') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t my-web-app:2.0 .'
            }
        }

        stage('Deploy Application') {
            steps {
                sh '''
                    docker rm -f devops-web-app || true

                    docker run -d \
                      --name devops-web-app \
                      --restart unless-stopped \
                      -p 3000:3000 \
                      my-web-app:2.0
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    for i in $(seq 1 12); do
                        STATUS=$(docker inspect \
                          --format='{{.State.Health.Status}}' \
                          devops-web-app 2>/dev/null || true)

                        echo "Health status: $STATUS"

                        if [ "$STATUS" = "healthy" ]; then
                            echo "Application is healthy!"
                            exit 0
                        fi

                        if [ "$STATUS" = "unhealthy" ]; then
                            docker logs --tail 30 devops-web-app
                            exit 1
                        fi

                        sleep 5
                    done

                    echo "Health check timed out!"
                    docker logs --tail 30 devops-web-app
                    exit 1
                '''
            }
        }
    }

    post {
        success {
            echo 'CI/CD Pipeline SUCCESS!'
        }
        failure {
            echo 'CI/CD Pipeline FAILED!'
        }
    }
}
