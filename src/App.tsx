import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ButtonGlow from './components/animations/ButtonGlow'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CursorEffect from './components/animations/CursorEffect'

export default function App() {
  return (
    <div className="min-h-screen">
      <CursorEffect />
      <ButtonGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
