[![Build Status](https://travis-ci.org/quantumlicht/collarbone.svg?branch=no-library)](https://travis-ci.org/quantumlicht/collarbone)
# Movie Trivia project
This project used the yeoman stacked generator extensively.
https://www.npmjs.org/package/generator-stacked


#Start Project
- node server.js

- "E:\PROGRAMS\MongoDB 2.6 Standard\bin\mongod" --dbpath "E:\My Documents"


Once the DB is started, you can user mongo.exe to use command prompt

- show dbs
- use defaultDB
- show collections
- db.users.find()
- db.users.remove({}) // removes all

-- TODO
- Figure problem with sessions not active  before first refresh
- Make sure API return proper response code
- add API test for all endpoints
- add model validation for all properties
NOT-DONE add utils to the app so it's globally available
- since the blog title is unique, we can put it in the url. Similar to users path.
- remove secrets from all files. Store them in the environment file instead
- pagination of comments,blogposts and trivias
- abstract triviaView and blogpostView Comment code (renderComment, submitComment, etc) into a common structure.