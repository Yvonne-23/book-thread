import { useNavigate } from 'react-router-dom'
import capybara from './assets/bookbridge-capybara.png'
import './App.css'

function App() {
  const navigate = useNavigate()

  return (
    <>
      <nav className="navbar">
        <div className="brand">
          <span className="brand-mark">B</span>
          <span>BOOKBRIDGE</span>
        </div>

        <div className="nav-links">
          <button className="nav-link">HOW IT WORKS</button>
          <button className="menu-button">•••</button>
        </div>
      </nav>

     <main className="hero-section">
  <div className="hero-content">

    <div className="mascot-container">
      <img
        src={capybara}
        alt="BookBridge capybara carrying a book across a bridge"
        className="mascot"
      />
    </div>

    <span className="eyebrow">A LITTLE BRIDGE FOR YOUR BOOKS</span>

    <h1>
      Your books belong
      <br />
      <span>with you.</span>
    </h1>

    <p className="hero-description">
      Move your ebooks from one device to another
      without the usual headache.
    </p>

    <div className="hero-actions">
     <button
  className="primary-button"
  onClick={() => navigate('/send')}
>
  SEND A BOOK
  <span>→</span>
</button>

      <button
  className="secondary-button"
  onClick={() => navigate('/receive')}
>
  RECEIVE A BOOK
</button>
    </div>

  </div>
</main>
<section className="steps-section">
  <div className="step">
    <span className="step-number">01</span>
    <span>GET A CODE</span>
  </div>

  <span className="step-arrow">→</span>

  <div className="step">
    <span className="step-number">02</span>
    <span>SEND THE BOOK</span>
  </div>

  <span className="step-arrow">→</span>

  <div className="step">
    <span className="step-number">03</span>
    <span>START READING</span>
  </div>
</section>
    </>
  )
}

export default App