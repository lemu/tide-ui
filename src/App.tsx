import { BrowserRouter, Routes, Route, Link } from 'react-router'
import Home from './routes/Home'
import About from './routes/About'
import Contact from './routes/Contact'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
