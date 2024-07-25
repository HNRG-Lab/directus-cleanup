# Directus Cleanup

## Description
A CLI tool to clean up Directus activities

## Installation
Install the package using yarn:
```
yarn add @hnrg-lab/directus-cleanup
```

## Configuration
You must have these variables in the `.env` of your directus project:
```
DB_CLIENT
DB_HOST
DB_DATABASE
DB_USER
DB_PASSWORD
DB_PORT
```
These variables are optional:
```
DB_SSL
DB_SSL_CA
DB_ACTIVITIES_RETENTION_DAYS
DB_ACTIVITIES_DELETE_CHUNK_SIZE (default 5000)
```

## Usage
Once installed, you can run the cleanup command from the command line. 
You have the option to specify the number of days directly or use an environment variable to set the retention period.

### Command Line Option
You can specify the number of days directly using the `--days` option:
```
yarn directus-cleanup activities --days 30
```

### Environment Variable
Alternatively, you can set the `DB_ACTIVITIES_RETENTION_DAYS` environment variable to specify the number of days:
```
yarn directus-cleanup activities
```
