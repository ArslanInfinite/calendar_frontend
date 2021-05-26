import { useEffect, useState } from 'react';
import QuranRender from './QuranRender';

const Quran = () => {
  const [state, setState] = useState({
    arText: '',
    enText: '',
    surahAndAyah: ''
  });
  const { enText, arText, surahAndAyah } = state;

  useEffect(() => {
    getQuote();
  }, []);

  const getQuote = async () => {
    try {
      const ayah = Math.floor(Math.random() * 6236) + 1
      const url = "https://api.alquran.cloud/ayah/" + ayah + "/en.asad";
      const urlArabic = "https://api.alquran.cloud/ayah/" + ayah;

      let arabicVerse = await fetch(urlArabic);
      arabicVerse = await arabicVerse.json();
      const arText = arabicVerse.data.text;
      setState(prev => ({ ...prev, arText }));

      let surahData = await fetch(url);
      surahData = await surahData.json();
      const enText = surahData.data.text;
      const surah = surahData.data.surah.englishName;
      const ayahNumber = surahData.data.surah.numberOfAyahs;
      const surahAndAyah = surah + " : " + ayahNumber;
      setState(prev => ({ ...prev, enText, surahAndAyah }));
    } catch (err) {
      console.log('an error occurred==>>', err);
    }
  }



  return (
    <QuranRender quranData={state} getQuote={getQuote} />
    )
}

export default Quran;