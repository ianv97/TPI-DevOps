pipeline {
    options {
        parallelsAlwaysFailFast()
    }
    environment {
        kubernetesServer = "10.0.3.10"
        kubernetesToken = credentials('kubernetes-token')
        dockerhubUsername = "ianv97"
    }

    stages {
        stage('Build') {
            parallel {
                stage('back-end') {
                    agent {label 'ci-cd'}
                    steps {
                        echo 'Building back-end...'
                        container('docker') {
                            script {
                                webappBack = docker.build("${dockerhubUsername}/webapp-back:${BUILD_NUMBER}", "./webapp-back")
                                webappBack.push()
                                webappBack.push('latest')
                            }
                        }
                    }
                }
                stage('front-end') {
                    agent {label 'ci-cd'}
                    steps {
                        echo 'Building front-end...'
                        container('docker') {
                            script {
                                webappFront = docker.build("${dockerhubUsername}/webapp-front:${BUILD_NUMBER}", "./webapp-front")
                                webappFront.push()
                                webappFront.push('latest')
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
            agent {
                docker {
                    image 'ianv97/kubectl'
                }
            }
            steps {
                echo 'Deploying...'
                // container('kubectl') {
                //     script {
                sh 'kubectl --server=${kubernetesServer} --token=${kubernetesToken} --insecure-skip-tls-verify get pods --all-namespaces'
                sh 'kubectl --server=${kubernetesServer} --token=${kubernetesToken} --insecure-skip-tls-verify apply -f tp-devops.yml'
                //     }
                // }
            }
        }
    }
}

// stage('Publish') {
//     steps {
//         container('docker') {
//             script {
//                 docker.withRegistry('',registryCredentials){
//                     dockerImage.push('latest')
//                 }
//             }
//         }
//     }
// }


