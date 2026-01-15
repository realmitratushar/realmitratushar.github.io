import React from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Research from './components/Research';


import WeatherBackground from './components/WeatherBackground';

function App() {
  return (
    <Layout>
      <WeatherBackground />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Experience />
      <Research />
    </Layout>
  );
}

export default App;
