#!/bin/bash

# Run TypeORM migration generation command
tsx ./node_modules/typeorm/cli.js migration:generate -d ./src/database/typeorm.config.ts ./src/database/migrations/$1