# [Backstage Service](https://portal.platform.buy4.io/)

This is a scaffolded [Backstage App](https://backstage.io)

## Where is the service running

The service is deployed using an [Azure Devops Pipeline](https://stonepagamentos.visualstudio.com/chapter-sre/_build?definitionId=5242) to GKE clusters managed by the sre-platform team.

## Authentication

Authentication is done with the Github OAuth app provider. Guests users are not authorized.

## Environment variables

Environment variables are imported in 'app-config.*.yaml' files with the syntax `${ENV_VAR}`
For production environment we use this [Azure DevOps Variable Group](https://stonepagamentos.visualstudio.com/chapter-sre/_library?itemType=VariableGroups&view=VariableGroupView&variableGroupId=5506)

## How To Run Locally

* **Docker**
After setting up your dependencies and environment variables, run from the 'src' folder:

```sh
docker image build . -f Dockerfile.local --tag backstage.local
docker run -d -p7007:7007 -e GITHUB_TOKEN=<YOUR_TOKEN> backstage.local
```

* **Yarn**

    List of [prerequisites](https://backstage.io/docs/getting-started/#prerequisites)

```sh
export GITHUB_TOKEN=<YOUR_TOKEN>
yarn
yarn dev
```
