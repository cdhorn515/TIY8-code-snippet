# Code Snippets

I build a Node.js Express application that uses a Mongo NoSQL database to store snippets of code created by logged in users. User authorization and authentication is used for logging in and making sure users only see the code snippets they have created. API endpoints were also developed for creating and viewing snippets using Postman.

Password hashing is used to encrypt user passwords.

This project also demonstrates the principles of Test Driven Development (TDD). All controllers and models were developed using TDD with Mocha and Chai.

### Built with
* Node.js (version 8)
* Express
* Mustache template
* Mongo database [Mongo documentation]

### To run locally
* Clone this repo
* In your terminal shell type `git clone` and paste url you copied
* Make sure you have Node installed on your machine
  * Check to see if you have Node.js installed by typing the following command in your terminal:
  ```
  node -v
  ```
  * If you don't have [Homebrew](https://brew.sh/) installed, then first run:
  ```
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  ```
  * Then install Node.js using [Homebrew](https://brew.sh/) with the following command:
  ```
  brew install node@8
  ```
* Once you have Node.js installed type `npm install` which will download all of the dependencies required for this application
* You will also need to have MongoDB running. If you aren't sure if you have MongoDB on your computer check by typing `which mongo` in your terminal.
* To install Mongo type
```
brew install mongodb
```
to install using [Homebrew](https://brew.sh/).
* Start your Mongo database by typing
```
brew services start mongodb
```
It's fine to leave this running in the background, but if you want to stop it you should type
```
brew services stop mongodb
```

* Now type `node app.js`, then point a browser window to `localhost:3000`, and start saving some snippets! :grinning: :laughing: :grinning:


When you are ready to stop running the application in your terminal press `ctrl-c`


U using Node.js. Express and a Mongo database that organizes code snippets that users create and save for later use. Use TDD for all controllers and models. Authorization and authentication of endpoints, user passwords stored as a hash. API endponts for creating and viewing snippets. Users can search for snippet by language or by specific tag.
