import axios from 'axios'
import history from '../history'

const initialState = {
  words: [],
  single: {},
  singleMyWord: {},
  singleTweet: {},
  name: [],
  myTweets: []
}

const GET_ALL_WORDS = 'GET_ALL_WORDS'
const ADD_WORD = 'ADD_WORD'
const REMOVE_WORD = 'REMOVE_WORD'
const REMOVE_TWITTER = 'REMOVE_TWITTER'
const GET_TWITTER_HASHTAGS = 'GET_TWITTER_HASHTAGS'
const GET_MY_TWEETS = 'GET_MY_TWEETS'
// const GET_COMMON_WORDS = 'GET_COMMON_WORDS'
const SET_SINGLE_WORD = 'SET_SINGLE_WORD'
const CLEAR_SINGLE_WORD = 'CLEAR_SINGLE_WORD'
const SET_SINGLE_MY_WORD = 'SET_SINGLE_MY_WORD'
const REMOVE_MY_TWEET = 'REMOVE_MY_TWEET'
const SET_TWEET_WORD = 'SET_TWEET_WORD'

const getWordList = words => ({type: GET_ALL_WORDS, words})
const addWord = word => ({type: ADD_WORD, word})
const removeWord = id => ({type: REMOVE_WORD, id})
const removeTwitter = id => ({type: REMOVE_TWITTER, id})
const getTwitter = name => ({type: GET_TWITTER_HASHTAGS, name})
const getMyTweets = tweet => ({type: GET_MY_TWEETS, tweet})
// const getCommonWords = tweet => ({type: GET_COMMON_WORDS, tweet})
const setWord = single => ({type: SET_SINGLE_WORD, single})
const setMyWord = singleMyWord => ({type: SET_SINGLE_MY_WORD, singleMyWord})
const refreshWord = () => ({type: CLEAR_SINGLE_WORD})
const removeMyTweets = id => ({type: REMOVE_MY_TWEET, id})
const setTweetWord = singleTweet => ({type: SET_TWEET_WORD, singleTweet})

export const fetchWordList = () => async dispatch => {
  try {
    const res = await axios.get('/api/words/words')
    dispatch(getWordList(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const clearSingleWord = () => dispatch => {
  try {
    dispatch(refreshWord())
  } catch (err) {
    console.error(err)
  }
}

export const fetchTwitter = () => async dispatch => {
  try {
    const res = await axios.get('/api/words/twitter')
    console.log(res.data)
    dispatch(getTwitter(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchSingleWord = id => async dispatch => {
  try {
    const res = await axios.get(`/api/words/twitter/${id}`)
    dispatch(setWord(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchSingleMyWord = id => async dispatch => {
  try{
    const res = await axios.get(`/api/words/words/${id}`)
    dispatch(setMyWord(res.data))
  }
  catch(err) {
    console.error(err)
  }
}

export const fetchMyTweets = () => async dispatch => {
  try {
    const res = await axios.get('/api/words/myTweets')
    dispatch(getMyTweets(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchSingleTweet = id => async dispatch => {
  try {
    const res = await axios.get(`/api/words/myTweets/${id}`)
    dispatch(setTweetWord(res.data))
  }
  catch(err) {
    console.error(err)
  }
}

export const postWord = word => async dispatch => {
  try {
    const res = await axios.post('/api/words/words', word)
    dispatch(addWord(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const eraseWord = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/words/words/${id}`, id)
    dispatch(removeWord(res.data.id))
  } catch (err) {
    console.error(err)
  }
}

export const eraseTwitter = id => async dispatch => {
  try {
    dispatch(refreshWord())
    const res = await axios.delete(`/api/words/twitter/${id}`, id)
    dispatch(removeTwitter(res.data.id))
  } catch (err) {
    console.error(err)
  }
}

export const eraseMyTweets = id => async dispatch => {
  try{
    const res = await axios.delete(`/api/words/myTweets/${id}`, id)
    dispatch(removeMyTweets(res.data.id))
  }
  catch(err) {
    console.error(err)
  }
}

export const fetchCommonWords = () => async dispatch => {
  try {
    const res = await axios.get('/api/words/common')
    dispatch(getMyTweets(res.data))
  } catch (err) {
    console.error(err)
  }
}

//eslint-disable-next-line
export default function(state = initialState, action) {
  switch (action.type) {
    case CLEAR_SINGLE_WORD:
      return {...state, single: {}, singleMyWord: {}, singleTweet: {}}
    case SET_SINGLE_WORD:
      return {...state, single: action.single}
    case SET_SINGLE_MY_WORD:
      return {...state, singleMyWord: action.singleMyWord}
    case SET_TWEET_WORD:
      return {...state, singleTweet: action.singleTweet}
    case GET_ALL_WORDS:
      return {...state, words: action.words}
    case GET_TWITTER_HASHTAGS:
      return {...state, name: action.name}
    case GET_MY_TWEETS:
      return {...state, tweet: action.tweet}
    case ADD_WORD:
      return {...state, words: [...state.words, action.word.word]}
    case REMOVE_WORD:
      return {
        ...state,
        words: [...state.words.filter(word => +word.id !== +action.id)]
      }
    case REMOVE_TWITTER:
      return {
        ...state,
        name: [...state.name.filter(eachName => +eachName.id !== +action.id)]
      }
      case REMOVE_MY_TWEET:
        return {...state, tweet: [...state.tweet.filter(eachtweet => +eachtweet.id !== +action.id)]}
    // case GET_COMMON_WORDS:
    //     return {...state, tweet: action.tweet}
    default:
      return state
  }
}
