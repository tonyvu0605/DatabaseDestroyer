# The Database Destroyer

The Database Destroyer is a project that aims to [provide a brief description of the project's purpose or goal].

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
- [Development](#development)
    - [Linting](#linting)
    - [Formatting](#formatting)
- [Docker Compose](#docker-compose)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before getting started, ensure you have the following installed on your system:

- Node.js
- Yarn package manager
- Docker

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/tonyvu0605/DatabaseDestroyer.git
   ```

2. Navigate to the project base directory:

   ```bash
   cd DatabaseDestroyer
   ```

3. Install the dependencies in the `/client` and `/api` directories using Yarn:

   ```bash
   cd client
   yarn install
   cd ../api
   yarn install
   ```

### Running the Application

To start the application, use Docker Compose. Ensure the configurations in `.env` and `src/secrets/*` are set up correctly.

```bash
docker compose -f compose.yaml up --build
```

This command will build the Docker images (if necessary) and start the containers defined in the `compose.yaml` file.

To stop and remove the Docker containers, use the following command:

```bash
docker compose -f compose.yaml down
```

To also remove the associated volumes, add the `-v` flag:

```bash
docker compose -f compose.yaml down -v
```

## Development

### Linting

This project uses ESLint for linting JavaScript and TypeScript files. To run the linter, use the following command:

```bash
yarn lint
```

To automatically fix fixable linting issues, use the `lint:fix` script:

```bash
yarn lint:fix
```

### Formatting

This project uses Prettier for code formatting. To format the code, use the following command:

```bash
yarn prettier
```

## Docker Compose

Docker Compose is used to define and run multi-container Docker applications. The `compose.yaml` file specifies the services and their configurations.

For more information on running the application with Docker Compose, refer to the [Running the Application](#running-the-application) section.

## Scripts

The `package.json` file contains several scripts that you can use to perform various tasks:

- `start`: Starts the application using Nodemon and enables debugging.
- `rm:all`: Removes the `node_modules`, `.next`, `yarn.lock`, `out`, `dist`, and `build` directories.
- `re:start`: Removes all the generated files and directories, reinstalls the dependencies, and starts the application.
- `lint`: Runs ESLint on the JavaScript and TypeScript files in the `src` directory.
- `lint:fix`: Runs ESLint with the `--fix` flag to automatically fix fixable issues.
- `prettier`: Runs Prettier to format the JavaScript and TypeScript files in the `src` directory.

You can run these scripts using the `yarn` command followed by the script name. For example:

```bash
yarn start
```
