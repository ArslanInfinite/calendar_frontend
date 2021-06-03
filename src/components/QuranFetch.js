import { useEffect } from 'react';
import { connect } from 'react-redux'
import QuranRender from './QuranRender';
import fetchQuran from '../redux/actions/fetchQuran'

const Quran = ({ quranData, fetchQuran }) => {

  useEffect(() => {
    fetchQuran();
  }, [fetchQuran]);

  return (
    <QuranRender quranData={quranData} getQuote={fetchQuran} />
  )
}

const mapStateToProps = state => ({
  quranData: state.quran.quranData
})

export default connect(mapStateToProps, { fetchQuran })(Quran);