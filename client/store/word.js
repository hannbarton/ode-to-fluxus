import axios from 'axios'
import history from '../history'

const initialState = {
    words: []
}

const GET_ALL_WORDS = 'GET_ALL_WORDS'
const ADD_WORD = 'ADD_WORD'
const REMOVE_WORD = 'REMOVE_WORD'

const getWordList = () => ({type: GET_ALL_WORDS})
const addWord = word => ({type: ADD_WORD, word})
const removeWord = word => ({type: REMOVE_WORD, word})

export const fetchWordList = () => async dispatch => {
    try {
       const res = await axios.get('/api/words')
       dispatch(getWordList(res.data))
    }
    catch(err) {
        console.error(err)
    }
}
