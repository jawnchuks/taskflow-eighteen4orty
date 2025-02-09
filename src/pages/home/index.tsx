import './../../styles/index.css'
import Hero from './../../../public/hero.png'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <main className="home_main">
      {/* nav */}
      <header className="home_header">
        <nav className="home_nav">
          <h6>Taskflow</h6>
          <button onClick={() => navigate('/tasks')} className="button_primary">
            Get started
          </button>
        </nav>
      </header>
      <section className="home_body">
        <h1 className="hero_title">Take control of your tasks</h1>
        <p className="hero_desc">
          Taskflow helps you stay ahead of your task and manage your time
          efficiently
        </p>
        <span>
          <button onClick={() => navigate('/tasks')} className="button_primary">
            Get started
          </button>
        </span>
        <picture>
          <img src={Hero} alt="" className="hero_img" />
        </picture>
      </section>
      <footer>{`copyright. 2025`}</footer>
    </main>
  )
}

export default HomePage
