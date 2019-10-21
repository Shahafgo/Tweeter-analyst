const pump = require('pump');
const ndjson = require('ndjson');
const through = require('through2');
const hyperquest = require('hyperquest');
const get = require('get-value');

const STREAM_PATH  = 'http://34.67.195.184';
const QUANTITY_TOP_FREQUENT = 10;
const MILISECONDES_DIVIDER = 1000;
const REG_EX = /[,.:/@!#$^&-+=]/;

var hashtagsStoraged = [];
var namesStoraged = [];
var wordsStoraged = [];
var topFrequentNames = [];
var topFrequentWords = [];
var topFrequentHashtags = [];
var countOfTweets = 0;
var firstTweet = null;
var lastTweet = null;
var avgTweetsPerSecond = 0;

function start(){
  pump(
    hyperquest(STREAM_PATH),
    ndjson.parse(),
    through.obj(analystData),
    process.stdout
  );
}

function insertHashtags(hashtags) {
  for(let tweetIndex  in hashtags){
    increaseOrInsert(hashtagsStoraged,hashtags[tweetIndex].text);
  }
  topFrequentHashtags = sortByValue(hashtagsStoraged);
}

function insertNames(name){
  if(name !== ' ')
  {
    increaseOrInsert(namesStoraged,name);
    topFrequentNames = sortByValue(namesStoraged);
  }
}

function sortByValue(countedArrayValues){
   return countedArrayValues.sort((a,b)=> {
     return (b.value-a.value)}).slice(0,QUANTITY_TOP_FREQUENT);
}

function calculateAvgTweetPerTime(createdAt){
  countOfTweets += 1;
  lastTweet = Date.parse(createdAt);
  if(countOfTweets === 1){
    firstTweet = lastTweet;
  }
  avgTweetsPerSecond = (countOfTweets)
                          / ((lastTweet-firstTweet)/MILISECONDES_DIVIDER);
}

function insertText(text){
  text = text.replace(/\s/g, ',')
  const words = text.split(REG_EX);
  for(let i in words){
   if (words[i] !== '') {
     increaseOrInsert(wordsStoraged,words[i]);
   }
}
  topFrequentWords  = sortByValue(wordsStoraged);
}

function increaseOrInsert(collection,keyName){
  const result = collection.find( ({ key }) => key === keyName );
  if(typeof result !== "undefined"){
      result.value = Number(result.value) + 1;
  }
  else {
    collection.push({key:keyName,value:1});
  }
}

function analystData (row, enc, next) {
  var text = get(row,'text',' ');
  var name = get (row,'user.screen_name',' ');
  var hashtags = get(row,'entities.hashtags',{defualt:[]});
  var createdAt = get(row,'created_at');
  insertText(text);
  insertNames(name);
  insertHashtags(hashtags);
  calculateAvgTweetPerTime(createdAt);
  next(null,"");
}

module.exports.getNames = function(){
  return JSON.stringify(topFrequentNames);
}

module.exports.getWords =  function(){
  return JSON.stringify(topFrequentWords);
}

module.exports.getHasTags = function(){
  return JSON.stringify(topFrequentHashtags);
}

module.exports.getAvgTweetsPerSecond = function(){
  return avgTweetsPerSecond.toString();
}

module.exports.start = start;
