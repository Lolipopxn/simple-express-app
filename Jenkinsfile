pipeline {
    agent any

    tools {
        nodejs 'node-24.7.0'
    }

    environment {
        SONARQUBE = credentials('sonarqube-token')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Lolipopxn/simple-express-app.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('SonarQube Scan') {
            steps {
                withSonarQubeEnv('sonarqube-25.8.0') {
                    sh '''
            echo "SONAR_HOST_URL=$SONAR_HOST_URL"
            # ลองเช็คสถานะ server (ถ้ามี curl)
            # curl -sSf "$SONAR_HOST_URL/api/system/status" || true

            npx -y sonarqube-scanner \
              -Dsonar.projectKey=Sample_jenkinsApp \
              -Dsonar.sources=. \
              -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
              -Dsonar.host.url="$SONAR_HOST_URL" \
              -Dsonar.token="$SONAR_AUTH_TOKEN"
          '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}
