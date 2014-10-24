# Dungeon Lords Play-By-Email Tool
This is a tool to help people play Dungeon Lords via e-mail or forum.

# Built on.... [![MEAN Logo](http://www.mean.io/img/logos/meanlogo.png)](http://mean.io/) MEAN Stack
If you want to play around with the source code, check out the MEAN.IO stack which this is heavily based on.

# Deployment
We use Heroku as our application server and Compose (formerly MongoHQ) as our database server. Once you register an account on both and setup the Heroku toolkit, run the following:

    heroku config:add DB_USER=username
    heroku config:add DB_PASSWORD=password
    heroku config:add BUILDPACK_URL=https://github.com/mbuchetics/heroku-buildpack-nodejs-grunt.git
    heroku config:set NODE_ENV=production
 
Then you can deploy to Heroku normally. You may also need to update the database connection URL in production.js

## More Information
  * [Czech Games, creators of the Dungeon Lords Board Game](http://czechgames.com/en/dungeon-lords/)
  * [Purchase a copy of Dungeon Lords](http://www.amazon.com/Z-Man-Games-ZMG-7044-Dungeon/dp/B00359OCFC)
  * [MEAN.IO](http://www.mean.io/)

## License
[The MIT License](http://opensource.org/licenses/MIT)
