# tinyURL service

This contains code to generate a tinyURL service which does the following

1. Given a long url, returns a short code for it.
2. Given a short url, returns the long url if it exists or not found.
3. It also contains JMeter test plan for load testing.

the journey to get to this code is documented [here](https://medium.com/@adhasmana/system-design-create-a-url-shortening-service-part-1-overview-26aae5597914)

Tech stack details:

* Node.js using Hapi server
* Postgres as database
* Sequelize as ORM
* Redis for caching
* JMeter for load testing

