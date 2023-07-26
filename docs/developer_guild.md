# Developer guide
## pre-requisits 

node > v18.0

if you do not have node install I recommed using NVM to install

to install nvm please run the following command
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
```

to install the latest version of nvm 18.X
```
nvm install 18
```
to use the latest verion of 18.x
```
nvm use 18
```

## node commands
Once you have npm installed there are the following command that will help you work with this project

```
# compile the typescript files
npm run build

# run the unit tests
npm run test

# perform a serverless deployment
npm run deployment

# run the lambda locally
npm run start
```

## Permissions
In order to run either the deployment or the lambda locally you will need to have some aws credentails set up with appropriate permissions via one of the many ways aws provides.  Please see the [offical documentation for help](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-authentication.html)

## running locally
When running locally the lambda will try to connect to the dynamomDb you will need to have this set up before you can succesfully call the api.