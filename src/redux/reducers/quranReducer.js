import { FETCH_QURAN } from './types.js'

const initialState = { quranData: {arText: '', enText: '', surahAndAyah: ''}, error: '' }

export default function quranReducer(state = initialState, action) {

  const { type, payload } = action
  switch (type) {
    case FETCH_QURAN: {
      return {
        ...state, quranData: payload
      };
    }

    default:
      return state;
  }
}