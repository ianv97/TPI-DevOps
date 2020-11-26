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
                stage('back-end') {
                    steps {
                        echo 'Building back-end...'
                        container('docker') {
                            script {
                                webappBack = docker.build("${dockerhubUsername}/webapp-back:${BUILD_NUMBER}", "./webapp-back")
                                docker.withRegistry('', registryCredential) { 
                                    webappBack.push()
                                    webappBack.push('latest')
                                }
                            }
                        }
                    }
                }
                stage('front-end') {
                    steps {
                        echo 'Building front-end...'
                        container('docker') {
                            script {
                                webappFront = docker.build("${dockerhubUsername}/webapp-front:${BUILD_NUMBER}", "./webapp-front")
                                docker.withRegistry('', registryCredential) {
                                    webappFront.push()
                                    webappFront.push('latest')
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
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                container('kubectl') {
                    script {
                        sh 'kubectl --server=${kubernetesServer} --token=${kubernetesToken} --insecure-skip-tls-verify get pods --all-namespaces'
                        sh 'kubectl --server=${kubernetesServer} --token=${kubernetesToken} --insecure-skip-tls-verify apply -f tp-devops.yml'
                    }
                }
            }
        }
    }
}
