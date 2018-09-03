#!/bin/bash

# General local server setup is:
# 

# Change the below values to your local environment _AND DO NOT COMMIT YOUR CHANGES_
# Unless you want your username/password leaked (its probably fine to commit a silly username/password)

export DATABASE_USERNAME="user"
export DATABASE_PASSWORD="password"
export DATABASE_HOST="localhost"
export DATABASE_PORT="5432"
export DATABASE_NAME="poolapp-local"
export JWT_SECRET_KEY="THIS_IS_A_SILLY_SECRET"

# Our server expects DATABASE_URL to be exported, as this is how Heroku does it
export DATABASE_URL=postgres://$DATABASE_USERNAME:$DATABASE_PASSWORD@$DATABASE_HOST:$DATABASE_PORT/$DATABASE_NAME
echo "Using DATABASE_URL=$DATABASE_URL"

npm run start:dev

# All changes are automatically detected and hot reloaded