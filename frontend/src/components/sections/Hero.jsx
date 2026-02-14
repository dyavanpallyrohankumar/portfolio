// const Hero = () => {
//     return (
//         <section className="min-h-screen flex items-center bg-gray-950 px-6">
//             <div className="max-w-5xl mx-auto w-full">

import Button from "../ui/Button";

//                 {/* Terminal Header */}
//                 <p className="font-mono text-gray-500 mb-3 text-lg">
//                     rohankumar@frontend:~$
//                 </p>

//                 {/* Command */}
//                 <p className="font-mono text-cyan-400 mb-8 text-2xl">
//                     whoami
//                 </p>

//                 {/* Main Heading */}
//                 <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
//                     Rohankumar Dyavanpally
//                 </h1>

//                 <h2 className="text-2xl md:text-3xl text-cyan-400 font-semibold mb-6">
//                     Frontend Developer
//                 </h2>

//                 <p className="text-gray-400 text-lg max-w-2xl mb-10 leading-relaxed">
//                     I build clean, responsive, and high-performance web interfaces
//                     using React, modern UI architecture, and scalable frontend patterns.
//                 </p>

//                 <div className="flex gap-6">
//                     <a
//                         href="#projects"
//                         className="px-6 py-3 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition"
//                     >
//                         View Projects
//                     </a>
//                     <a
//                         href="/resume.pdf"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition"
//                     >
//                         Download Resume
//                     </a>
//                 </div>

//             </div>
//         </section>
//     );
// };

// export default Hero;



const Hero = () => {
    return (
        <section className="relative z-10 min-h-screen flex items-center justify-center px-6 text-white">
            <div className="max-w-4xl mx-auto text-center space-y-8">

                <div className="space-y-6">

                    <p className="text-xs sm:text-sm text-accent uppercase tracking-[0.2em] font-mono font-medium">
                        $ deploy-ai-infrastructure --optimize=true --scale=auto
                    </p>

                    <h1 className="hero-text">
                        <span className="block text-foreground font-mono">
                            rohankumar@frontend:~$
                        </span>

                        <span className="block hero-gradient animate-gradient-shift mt-2">
                            whoami
                        </span>
                    </h1>

                    <div className="space-y-4 max-w-4xl mx-auto">

                        <p className="text-xl sm:text-2xl text-muted-foreground font-mono h-8 flex items-center justify-center">
                            <span>&gt; Frontend Developer</span>
                        </p>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Architecting scalable UI systems, building performant React
                            applications, and crafting clean user experiences using
                            modern frontend architecture.
                        </p>

                        <div className="flex flex-wrap gap-2 justify-center mt-4">

                            <span className="px-3 py-1 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-full text-xs font-mono text-purple-400">
                                React Architecture
                            </span>

                            <span className="px-3 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-xs font-mono text-blue-400">
                                UI Engineering
                            </span>

                            <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full text-xs font-mono text-cyan-400">
                                Performance
                            </span>

                            <span className="px-3 py-1 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-full text-xs font-mono text-pink-400">
                                Component Systems
                            </span>

                        </div>

                    </div>
                </div>

                <div className="space-y-6">

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button>Explore My Work</Button>
                        <Button variant="outline">Get In Touch</Button>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default Hero;
