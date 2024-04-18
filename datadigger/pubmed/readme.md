# Pubmed Data Digger Deployment

## Baseline Job

#### Configuration
1. Follow the instruction from the pubmed [README.md](https://github.com/curieo-org/data-digger/blob/master/pubmed/data-digger-etl/README.md) to setup the pubmed data digger.
2. Convert the credentials.json file's content to base64 and replace `<base64 encoded credentials.json>` with it in the [baseline_job.yaml](./baseline_job.yaml) file. 

#### Image Generation
1. Go to the [root directory](https://github.com/curieo-org/data-digger/blob/master/pubmed) of the pubmed data digger.
2. Run the commands from the [baseline_ecr.sh](./baseline_ecr.sh) file to generate the image and push it to the ECR.

#### Deployment
Create a new baseline job using the [baseline_job.yaml](./baseline_job.yaml) file with following command:
```bash
kubectl apply -f baseline_job.yaml -n <namespace>
```