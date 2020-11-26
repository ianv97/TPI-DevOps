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
                failFast true
                stage('back-end') {
                    // agent {
                        
                    // }
                    steps {
                        echo 'Building back-end...'
                        // container('docker') {
                        //     script {
                        def webapp-back = docker.build("ianv97/webapp-back:${BUILD_NUMBER}", "./webapp-back")
                        webapp-back.push('latest')
                        //     }
                        // }
                    }
                }
                stage('front-end') {
                    steps {
                        echo 'Building front-end...'
                        // container('docker') {
                        //     script {
                        def webapp-front = docker.build("ianv97/webapp-front:${BUILD_NUMBER}", "./webapp-front")
                        webapp-back.push('latest')
                        //     }
                        // }
                    }
                }
        }
        stage('Test') {
            echo 'Here we would run the tests if we had them...'
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


