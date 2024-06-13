# Update llama3 docker image to use less neuroncore

### Build docker image locally and push to AWS ECR 

```sh
docker build -t 698471419283.dkr.ecr.eu-central-1.amazonaws.com/curieo-llama3:1.0 .

aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 698471419283.dkr.ecr.eu-central-1.amazonaws.com

docker push 698471419283.dkr.ecr.eu-central-1.amazonaws.com/curieo-llama3:1.0
```

### Update the rayservice config to use this newly created docker image 

