# User Repositories Scrapper
A puppeteer script to scrap user repositories informations

## What it can scrap ?
 - Repository title
 - Repository description
 - Repository stars number
 - Repository forks number
 - Repository dominant language (most used in repository)
 - Repository last updateR

## Usage
First, you should have puppeteer installed fot your project
<br>
<a href="https://pptr.dev/">Get started with puppeteer</a>
<br><br>
Or you can start with this : 
First, install puppeter in your folder project, or clone this repository
 ```
 npm i puppeteer --save
 ```
 Note: this will install a Chromium browser where puppeteer will run
 
Second, in the index.js you would be able to see my github repositories link, change it with the link you want

Third, run the script with
```
node index.js
```
And wait, a chromium browser will be opened to scrap the data of user repositories and log it in the console



# To-do
 - turn the result to json format
 - save the result into a json file, so it'll be useful as an API
 
 
