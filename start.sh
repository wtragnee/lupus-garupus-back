#!/usr/bin/env bash

echo "NODE_ENV is $NODE_ENV"

if [ $NODE_ENV == 'dev' ] || [ $NODE_ENV == 'docker' ]; then
    npm install
    npm run start-dev
else
    npm install --production
    npm start
fi
