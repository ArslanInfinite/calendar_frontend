import { FETCH_QURAN, SET_ERROR } from '../reducers/types';
//.then/.catch or async/await (with try/catch)
export default function fetchQuran() {
  return async (dispatch) => {
    try {
      const ayah = Math.floor(Math.random() * 6236) + 1
      const url = "https://api.alquran.cloud/ayah/" + ayah + "/en.asad";
      const urlArabic = "https://api.alquran.cloud/ayah/" + ayah;

      let arabicVerse = await fetch(urlArabic);
      arabicVerse = await arabicVerse.json();
      const arText = arabicVerse.data.text;

      let surahData = await fetch(url);
      surahData = await surahData.json();
      const enText = surahData.data.text;
      const surah = surahData.data.surah.englishName;
      const ayahNumber = surahData.data.surah.numberOfAyahs;
      const surahAndAyah = surah + " : " + ayahNumber;

      dispatch({
        type: FETCH_QURAN,
        payload: { arText, enText, surahAndAyah }
      })
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err
      })
    }
  }
}