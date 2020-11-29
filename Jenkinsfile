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
		db_host_prod = credentials('db_host_prod')
		db_host_dev = credentials('db_host_dev')
		db_port = credentials('db_port')
		db_user = credentials('db_user')
		db_pass = credentials('db_pass')
		db_db = credentials('db_db')
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
                                    }
                                    if (env.BRANCH_NAME == 'dev') {
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
                                if (env.BRANCH_NAME == 'main') {
                                    webappFront = docker.build("${dockerhubUsername}/webapp-front:${BUILD_NUMBER}", "--build-arg STAGE=prod ./webapp-front")
                                    docker.withRegistry('', registryCredential) {
                                        webappFront.push('latest')
                                    }
                                }
                                if (env.BRANCH_NAME == 'dev') {
                                    webappFront = docker.build("${dockerhubUsername}/webapp-front:${BUILD_NUMBER}", "--build-arg STAGE=dev ./webapp-front")
                                    docker.withRegistry('', registryCredential) {
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
						if (env.BRANCH_NAME == 'main') {
							sh 'cd ./webapp-back && dotnet ef migrations list && DB_HOST=${db_host_prod} DB_PORT=${db_port} POSTGRES_USER=${db_user} POSTGRES_PASSWORD=${db_pass} POSTGRES_DB=${db_db} dotnet ef database update'
						}
                        if (env.BRANCH_NAME == 'dev') {
							sh 'cd ./webapp-back && dotnet ef migrations list && DB_HOST=${db_host_dev} DB_PORT=${db_port} POSTGRES_USER=${db_user} POSTGRES_PASSWORD=${db_pass} POSTGRES_DB=${db_db} dotnet ef database update'
                        }
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
							sh 'kubectl --server=${kubernetesServer} --token=${kubernetesToken} --insecure-skip-tls-verify rollout restart deployment/webapp-back  -n tp-devops-prod'
							sh 'kubectl --server=${kubernetesServer} --token=${kubernetesToken} --insecure-skip-tls-verify rollout restart deployment/webapp-front -n tp-devops-prod'
                        }
                        if (env.BRANCH_NAME == 'dev') {
                            sh 'kubectl --server=${kubernetesServer} --token=${kubernetesToken} --insecure-skip-tls-verify apply -f k8s-dev.yml'
							sh 'kubectl --server=${kubernetesServer} --token=${kubernetesToken} --insecure-skip-tls-verify rollout restart deployment/webapp-back  -n tp-devops-dev'
							sh 'kubectl --server=${kubernetesServer} --token=${kubernetesToken} --insecure-skip-tls-verify rollout restart deployment/webapp-front -n tp-devops-dev'
                        }
                        
                    }
                }
            }
        }
    }
}
