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

// Hobby Pages
import Movies from './components/hobbies/Movies';
import Sitcoms from './components/hobbies/Sitcoms';
import Books from './components/hobbies/Books';
import Songs from './components/hobbies/Songs';
import Sports from './components/hobbies/Sports';
import Travel from './components/hobbies/Travel';

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
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Sitcoms />} />
        <Route path="/books" element={<Books />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/travel" element={<Travel />} />
      </Routes>
    </Layout>
  );
}

export default App;
