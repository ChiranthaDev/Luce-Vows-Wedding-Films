import Hero from './components/Hero'
import Services from './components/Services'
import Stats from './components/Stats'
import Work from './components/Work'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'
import Testimonials from './components/Testimonials'
import Experience from './components/Experience'
import Contact from './components/Contact'
import BackgroundAudio from './components/BackgroundAudio'
import './index.css'

function App() {
    return (
        <main>
            <Preloader />
            <CustomCursor />
            <Hero />
            <Stats />
            <Services />
            <Experience />
            <Work />
            <Testimonials />
            <Contact />
            <Footer />
            <BackgroundAudio />
        </main>
    )
}

export default App
