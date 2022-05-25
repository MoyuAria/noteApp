import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <div>
      <nav className='nav'>
        <Link className='nav__item' to="/">笔记</Link>
        <Link className='nav__item' to="pricing">导入 csv</Link>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}

export default App
