// import { useState, useEffect } from 'react'
// import './App.css'
// import ParticlesBackground from './ParticlesBackground'
// import Hero from './components/sections/Hero'
// import Loader from './components/Loader'
// import './styles/globals.css'

// function App() {
//   const [count, setCount] = useState(0)

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1500);

//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) return <Loader />;


//   return (
//     <>
//       <ParticlesBackground />
//       <div className="content">
//         <Hero />
//       </div>
//     </>
//   )
// }

// export default App


import { useEffect, useState } from "react";
import Navbar from "./components/layout/Navbar";
import Loader from "./components/Loader";
import Hero from "./components/sections/Hero"; // if exists

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <Hero />
      {/* other sections */}
    </>
  );
}
