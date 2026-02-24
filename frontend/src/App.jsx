import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./components/layout/Navbar";
import Loader from "./components/Loader";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Resume from "./components/sections/Resume";
import ParticlesBackground from "./components/background/ParticlesBackground";
import Education from "./components/sections/education/EducationComponent";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="relative min-h-screen text-white bg-gray-950 overflow-x-hidden">

      {/* Background Layer */}
      <div className="fixed inset-0 -z-10">
        <ParticlesBackground />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/education" element={<Education />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </main>

    </div>
  );
}

export default App;








//  return (
//       <BrowserRouter basename="/">
//         <Switch>
//           <Route
//             path="/"
//             exact
//             render={(props) =>
//               settings.isSplash ? (
//                 <Splash {...props} theme={this.props.theme} />
//               ) : (
//                 <Home {...props} theme={this.props.theme} />
//               )
//             }
//           />
//           <Route
//             path="/home"
//             render={(props) => <Home {...props} theme={this.props.theme} />}
//           />
//           <Route
//             path="/experience"
//             exact
//             render={(props) => (
//               <Experience {...props} theme={this.props.theme} />
//             )}
//           />
//           <Route
//             path="/education"
//             render={(props) => (
//               <Education {...props} theme={this.props.theme} />
//             )}
//           />
//           <Route
//             path="/opensource"
//             render={(props) => (
//               <Opensource {...props} theme={this.props.theme} />
//             )}
//           />
//           <Route
//             path="/contact"
//             render={(props) => <Contact {...props} theme={this.props.theme} />}
//           />

//           {settings.isSplash && (
//             <Route
//               path="/splash"
//               render={(props) => <Splash {...props} theme={this.props.theme} />}
//             />
//           )}

//           <Route
//             path="/projects"
//             render={(props) => <Projects {...props} theme={this.props.theme} />}
//           />
//           <Route
//             path="/resume"
//             render={(props) => <ResumePage {...props} theme={this.props.theme} />}
//           />
//           <Route
//             path="*"
//             render={(props) => <Error404 {...props} theme={this.props.theme} />}
//           />
//         </Switch>
//       </BrowserRouter>
//     );