
## Engineering assumptions
1) The tweeter stream is infinite.
2) The server side should process the data all the time.
3) The processed data should be available all the time to be requested by the the client side.
4) The client side should be updated every few seconds.
5) The client side should be updated manually.

## Solution thought process
1) Using the libraries pump,ndjson,through2,hyperquest to process the infinite stram.
2) Using a small collections that keep top-ten words/names/hashtags with their counts to be available all the time by the client request .
3) The client side sends an xmlhttprequest by the axios library to fetch data every five seconds.
4) The client side has buttons that send an xmlhttprequests by the axios library to fetch each data collection.


## What would I do differently
I would add an history graph that would show the history of average tweets per second. 

## Parts that not handled
As I see it, all the requested parts had been handled,including the bonus.

## Execution instructions

### Node ^V12.11.0

### `Client side`
1) Get enter to tweeter-analyst/client .
2) Run in terminal/bash and run: `npm install`
3) Run in terminal/bash and run: `npm run start`

### `Server side`
1) Get enter to tweeter-analyst/server.
2) Run in terminal/bash and run: `npm install`
3) Run in terminal/bash and run: `npm run start`

