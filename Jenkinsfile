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
                    sleep 5
                    curl -fsS http://localhost:3000/health
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
