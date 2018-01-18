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
* You will also need to have a Mongo instance running. If you aren't sure if you have Mongo on your computer check by typing `which mongo` in your terminal.
* To install Mongo using [Homebrew](https://brew.sh/) type
```
brew install mongodb
```
* Start your Mongo database by typing
```
brew services start mongodb
```
* You will want to create your own database. To do this open a Mongo shell by typing
```
mongo
```
* In the new terminal tab that opens up type the following to create your database
```
use [whatever-you-want-to-call-your-database]
```
* Back in the tab where you've cloned the repo type `npm install` which will download all of the dependencies required for this application.
* Almost ready to run the app! Open the **config.json** file in whatever text editor you choose, replace **cdc_code_snippet_dev** with the name you gave your database, and save this file.
```
mongodb://localhost:27017/[your_database_name_goes_here]
```
* Now type `node app.js`, then point a browser window to `localhost:3000`, create a user, and start saving some snippets! Snippets are searchable by language or tags so save a few and then search for them using these methods.

When you are ready to stop running the application in your terminal press `ctrl-c`
It's fine to leave this running in the background, but if you want to stop it when you're finished running the app type
```
brew services stop mongodb
```

:bowtie:
("Bowties are :cool:!", :mask::question::hash::one::two:)
