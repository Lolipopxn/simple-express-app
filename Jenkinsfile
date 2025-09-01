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
                    sh 'npx sonar-scanner -Dsonar.projectKey=Sample_jenkinsApp'
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}
