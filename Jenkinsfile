pipeline {
    agent any
    options {
        parallelsAlwaysFailFast()
    }
    environment {
        kubernetesServer = "10.0.3.10"
        kubernetesToken = credentials('kubernetes-token')
    }

    stages {
        stage('Build') {
            parallel {
                stage('back-end') {
                    // agent {
                        
                    // }
                    steps {
                        echo 'Building back-end...'
                        // container('docker') {
                        script {
                            webappBack = docker.build("ianv97/webapp-back", "./webapp-back")
                            webappBack.push('latest')
                        }
                        // }
                    }
                }
                stage('front-end') {
                    steps {
                        echo 'Building front-end...'
                        // container('docker') {
                        script {
                            webappFront = docker.build("ianv97/webapp-front", "./webapp-front")
                            webappFront.push('latest')
                        }
                        // }
                    }
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Here we would run the tests if we had them...'ç
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


