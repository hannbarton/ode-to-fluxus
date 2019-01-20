import axios from 'axios'
import history from '../history'

const initialState = {
    words: [],
    single: {},
    name: []
}

const GET_ALL_WORDS = 'GET_ALL_WORDS'
const ADD_WORD = 'ADD_WORD'
const REMOVE_WORD = 'REMOVE_WORD'
const REMOVE_TWITTER = 'REMOVE_TWITTER'
const GET_TWITTER_HASHTAGS = 'GET_TWITTER_HASHTAGS'
const GET_MY_TWEETS = 'GET_MY_TWEETS'

const getWordList = words => ({type: GET_ALL_WORDS, words})
const addWord = word => ({type: ADD_WORD, word})
const removeWord = id => ({type: REMOVE_WORD, id})
const removeTwitter = id => ({type: REMOVE_TWITTER, id})
const getTwitter = name => ({type: GET_TWITTER_HASHTAGS, name})
const getMyTweets = tweet => ({type: GET_MY_TWEETS, tweet})

export const fetchWordList = () => async dispatch => {
    try {
       const res = await axios.get('/api/words')
       dispatch(getWordList(res.data))
    }
    catch(err) {
        console.error(err)
    }
}

export const fetchTwitter = () => async dispatch => {
    try {
       const res = await axios.get('/api/words/twitter')
       dispatch(getTwitter(res.data))
    }
    catch(err) {
        console.error(err)
    }
}

export const fetchMyTweets = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/words/myTweets/${id}`)
        dispatch(getMyTweets(res.data.id))
    }
    catch(err) {
        console.error(err)
    }
}

export const postWord = (word) => async dispatch => {
    try {
        const res = await axios.post('/api/words', word)
        dispatch(addWord(res.data))
    }
    catch(err) {
        console.error(err)
    }
}

export const eraseWord = (id) => async dispatch => {
    try{
        const res = await axios.delete(`/api/words/${id}`, id)
        dispatch(removeWord(res.data.id))
    }
    catch(err) {
        console.error(err)
    }
}

export const eraseTwitter = (id) => async dispatch => {
    try{
        const res = await axios.delete(`/api/words/twitter/${id}`, id)
        dispatch(removeTwitter(res.data.id))
    }
    catch(err) {
        console.error(err)
    }
}


export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_WORDS:
            return { ...state, words: action.words}
        case GET_TWITTER_HASHTAGS:
            return {...state, name: action.name}
        case GET_MY_TWEETS:
            return {...state, tweet: action.tweet}
        case ADD_WORD:
            return { ...state, words: [...state.words, action.word.word]};
        case REMOVE_WORD:
            return {...state, words: [...state.words.filter(word => +word.id !== +action.id)]}
        case REMOVE_TWITTER:
            return {...state, name: [...state.name.filter(eachWord => +eachWord.id !== +action.id)]}
        default:
            return state;
    }
}
