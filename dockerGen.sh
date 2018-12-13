docker run \
-u root \
-d \
--name blue-ocean \
-p 8080:8080 \
-v jenkins-data:/var/jenkins_home \
-v npm-cache:/root/.npm \
-v cypress-cache:/root/.cache \
-v /var/run/docker.sock:/var/run/docker.sock \
jenkinsci/blueocean:latest
