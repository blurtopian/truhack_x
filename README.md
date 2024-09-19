## KOII x Truflation Hackathon Tasks

This task aims to integrate different components with KOII nodes. 
This is just one part of the system.

Other parts are:
1. Task
  - This repository 
2. [Backend API](https://github.com/blurtopian/truhack_api)
  - retrieves all data 
  - submits tweets to a backend API for analysis
3. [A Telegram Mini App](https://github.com/blurtopian/truhack_tgapp)
  - accessible thru @ktruhack_bot
![alt text](image.png)
![alt text](image-1.png)

## What's in the Project?
This is an implementation of the default data-gatherer class of Koii tasks.

There are four main components, detailed in the adapter file: `adapters/twitter/twitter.js`
1. Negotiate Session
2. Fetch a list
3. search for an item
4. Store the item

The repo also contains a host of test files, most importantly `test/test-one-round.js` which details the full flow of one [gradual consensus](https://docs.koii.network/concepts/gradual-consensus/runtime-flow) round. 

Run the test with 
```
yarn install or npm install
yarn test or npm run test
```