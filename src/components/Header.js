import { Link } from 'react-router-dom'

const Header = () => (
  <header>
    <h1>Islamic Calendar - Lite</h1>
    <nav>
      <Link to='/'>Homepage</Link>
      <Link to='/about'>About</Link>
      <Link to='/quran'>Quran Verses</Link>
    </nav>
  </header>
)

export default Header