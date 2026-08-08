import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Research from './components/Research';
import Hobbies from './components/Hobbies';
import WeatherBackground from './components/WeatherBackground';

const Home = () => (
  <>
    <Hero />
    <About />
    <Education />
    <Skills />
    <Projects />
    <Experience />
    <Research />
    <Hobbies />
  </>
);

function App() {
  return (
    <Layout>
      <WeatherBackground />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Layout>
  );
}

export default App;
