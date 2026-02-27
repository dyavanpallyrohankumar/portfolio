import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Loader from "./components/Loader";
import Footer from "./components/layout/Footer";

const Hero = lazy(() => import("./components/sections/Hero"));
const Projects = lazy(() => import("./components/sections/Projects"));
const Resume = lazy(() => import("./components/sections/Resume"));
const Education = lazy(() => import("./components/sections/Education"));
const ExperienceAndSkills = lazy(() => import("./components/sections/Experience"));
// const CertificationsSection = lazy(() => import("../src/components/"));
const Contact = lazy(() => import("./components/sections/Contact"));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="relative min-h-screen text-white bg-gray-950 overflow-x-hidden">

      <Navbar />
      <main className="relative z-10">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/education" element={<Education />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/experience" element={<ExperienceAndSkills />} />
            {/* <Route path="/certificate" element={<CertificationsSection />} /> */}
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;