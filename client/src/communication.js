import axios from "axios"

const TOP_NAMES_PATH = "http://localhost:4000/getTopFrequentNames";
const TOP_WORDS_PATH = "http://localhost:4000/getTopFrequentWords";
const TOP_HASHTAGS_PATH = "http://localhost:4000/getTopFrequentHashtags";
const AVG_TwittS_PATH = "http://localhost:4000/getAvgTweetsPerSecond";


export function getAvgTweetPerSecond(callBack){
  axios.get(AVG_TWITTS_PATH, {params: {}})
        .then(function (response) {
            callBack (response.data)
        })

}
export function getNames(callBack){
  axios.get(TOP_NAMES_PATH, {params: {}})
        .then(function (response) {
            callBack (response.data)
        })
}

export function getWords(callBack){
  axios.get(TOP_WORDS_PATH, {params: {}})
        .then(function (response) {
            callBack (response.data)
        })
}

export function getHashtags(callBack){
  axios.get(TOP_HASHTAGS_PATH, {params: {}})
        .then(function (response) {
            callBack (response.data)
        })
}
