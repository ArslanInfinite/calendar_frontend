import React from 'react'

export default function QuranRender(props) {
  const {quranData, getQuote} = props;
  const {arText, enText, surahAndAyah} = quranData;
  return (
    <div className="quran-wrapper">
      <h1>Quran Page</h1>

      <p className="arabic-text">{arText}</p>
      <p>{enText}</p>
      <p>{surahAndAyah}</p>

      <button onClick={getQuote}>Get New Verse</button>
    </div>
  )
}
