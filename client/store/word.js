import axios from 'axios'
import history from '../history'

const initialState = {
    words: [],
    single: {}
}

const GET_ALL_WORDS = 'GET_ALL_WORDS'
const ADD_WORD = 'ADD_WORD'
const REMOVE_WORD = 'REMOVE_WORD'

const getWordList = (words) => ({type: GET_ALL_WORDS, words})
const addWord = word => ({type: ADD_WORD, word})
const removeWord = id => ({type: REMOVE_WORD, id})

export const fetchWordList = () => async dispatch => {
    try {
       const res = await axios.get('/api/words')
       dispatch(getWordList(res.data))
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

export const eraseWord = (wordId) => async dispatch => {
    try{
        const res = await axios.delete(`/api/words/${wordId}`, wordId)
        dispatch(removeWord(res.data.id))
    }
    catch(err) {
        console.error(err)
    }
}

export const wordSubreducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_WORDS:
            return { ...state, words: action.words}
        case ADD_WORD:
            return { ...state, words: [...state.words, action.word.word]};
        case REMOVE_WORD:
            return {...state, words: [...state.words.filter(word => +word.id !== +action.id)]}
        default:
            return state;
    }
}
