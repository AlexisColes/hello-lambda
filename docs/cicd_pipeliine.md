# cicd pipeline
There is a basic [github actions workflow file](../.github/workflows/pipeline.yaml) to deploy this application, deployments will be zero downtime.


The pipeline will do the following

- build the typescript
- run the unit tests
- deploy all the infracturture and the lamba code
- test the deployed lambda is basicly functioning

:boom: The action in the repository has been tested using temprary creditials and the repository secrets will need updating to deploy this to the account of your choosing.

This solution could use some future improvments.

- The buid and test stage should run in its own job
- Artifacts should be uploaded at the end of this job
- Seperate jobs should deploy the soution through the various environments (dev, staging, prod)  
- Between each stage should be an approval step
- There should be a rollback job triggered if the end to end tests fail on any stage.