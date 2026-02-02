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
import Series from './components/hobbies/Series';
import Books from './components/hobbies/Books';
import Blogs from './components/hobbies/Blogs';

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
        <Route path="/series" element={<Series />} />
        <Route path="/books" element={<Books />} />

        <Route path="/travel" element={<Travel />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>
    </Layout>
  );
}

export default App;
