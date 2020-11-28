pipeline {
    agent {label 'ci-cd'}
    options {
        parallelsAlwaysFailFast()
    }
    environment {
        kubernetesServer = "https://10.0.2.10:6443"
        kubernetesToken = credentials('kubectl')
        dockerhubUsername = "thelinkin3000"
        registryCredential = "dockerhub_id"
    }

    stages {
        stage('Build') {
            parallel {
                stage('Back-end') {
                    steps {
                        echo 'Building back-end...'
                        container('docker') {
                            script {
                                webappBack = docker.build("${dockerhubUsername}/webapp-back:${BUILD_NUMBER}", "./webapp-back")
                                docker.withRegistry('', registryCredential) { 
                                    if (env.BRANCH_NAME == 'main') {
                                        webappBack.push('latest')
                                    } else {
                                        webappBack.push()
                                        webappBack.push('dev')
                                    }
                                }
                            }
                        }
                    }
                }
                stage('Front-end') {
                    steps {
                        echo 'Building front-end...'
                        container('docker') {
                            script {
                                webappFront = docker.build("${dockerhubUsername}/webapp-front:${BUILD_NUMBER}", "./webapp-front")
                                docker.withRegistry('', registryCredential) {
                                    if (env.BRANCH_NAME == 'main') {
                                        webappFront.push('latest')
                                    } else {
                                        webappFront.push()
                                        webappFront.push('dev')
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Here we would run the tests if we had them...'
            }
        }
        stage('Database-migration') {
            steps {
                echo 'Updating database...'
                container('dotnet') {
                    script {
                        // sh 'cd ./webapp-back'
                        // migrationsList = sh(script: 'dotnet ef migrations list', returnStdout: true)
                        // echo 'Migrations: ${migrationsList}'
                        // sh 'dotnet ef database update'
                        sh 'cd ./webapp-back && dotnet ef migrations list && dotnet ef database update'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                container('kubectl') {
                    script {
                        if (env.BRANCH_NAME == 'main') {
                            sh 'kubectl --server=${kubernetesServer} --token=${kubernetesToken} --insecure-skip-tls-verify apply -f k8s-prod.yml'
                        } else {
                            sh 'kubectl --server=${kubernetesServer} --token=${kubernetesToken} --insecure-skip-tls-verify apply -f k8s-dev.yml'
                        }
                        sh 'kubectl --server=${kubernetesServer} --token=${kubernetesToken} --insecure-skip-tls-verify rollout restart'
                    }
                }
            }
        }
    }
}
