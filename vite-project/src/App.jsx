
import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import CareerScale from './components/CareerScale'
import About from './components/About'
import Skills from './components/Skills'
import SkillsRadar from './components/SkillsRadar'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'

function App() {

  return (
    <>
    <Navbar />
      <Hero />
      <CareerScale />
      <About />
      <Skills />
      <SkillsRadar />
      <Projects />
      <Education />
      <Contact />
    </>
  )
}

export default App
