# Local Development Guide

This guide is for people who want to contribute to the development of the project.

## Prerequisites

- Vscode
- high mental health (recommended; we are dealing with JS and CSS here)
- UNIX based OS (WSL for Windows enjoyers)

## Setup

### Devcontainer

- Install the [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) extension for VSCode
- Clone the repository
- Open the repository in VSCode
- Uncomment `postCreateCommand` in `.devcontainer/devcontainer.json`

```json
  // Use 'postCreateCommand' to run commands after the container is created.
  "postCreateCommand": "cd app && npm install", // this line
  // Uncomment to connect as root instead. More info: https://aka.ms/dev-containers-non-root.
```

- Click on the green button in the bottom left corner and select `Reopen in Container`
- Wait for the container to build
- Open a terminal in VSCode and run `npm run dev` to start the development server

### Local

- Install [Volta](https://volta.sh/)
- Install Node@20 via Volta: `volta install node@20`
- Clone the repository
- Open the repository in VSCode
- cd into .devcontainer
- add extra config to the `docker-compose.yml`` file

```yml
db:
  image: mongo:latest
  restart: unless-stopped
  volumes:
    - mongodb-data:/data/db
  ports: # add this
    - 27017:27017
```

- run `docker compose create db` to create the db container
- run `docker compose start db` to start the db container
- run `npm i` to install dependencies
- wait for the db container to start ....
- still waiting ....
- its not done yet ....
- run `npm run dev` to start the development server

## Connecting to the database

in Vscode, open the `MongoDB for VSCode` extension and click on the `Connect` button on advanced tab. It should be filled automatically. If not, use the following connection string: `mongodb://localhost:27017/`

## Adding database and collections

there will be 3 collections in the database by default. `admin`, `config`, `local` ignore them. To add a new collection, click on the `Add Collection` button on the advanced tab. Name the collection and click on `Create Collection`. You can now add documents to the collection.
