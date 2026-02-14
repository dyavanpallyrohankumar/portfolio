import {
    FaGithub,
    FaExternalLinkAlt,
    FaReact,
    FaNodeJs,
    FaHtml5,
    FaCss3Alt,
} from "react-icons/fa";
import { SiMongodb, SiExpress, SiJavascript } from "react-icons/si";
import { allProjects } from "../../data/staticData";

const techIcons = {
    React: <FaReact className="text-sky-400" />,
    "Node.js": <FaNodeJs className="text-green-500" />,
    MongoDB: <SiMongodb className="text-green-400" />,
    Express: <SiExpress className="text-gray-300" />,
    HTML: <FaHtml5 className="text-orange-500" />,
    CSS: <FaCss3Alt className="text-blue-500" />,
    JavaScript: <SiJavascript className="text-yellow-400" />,
};

const Projects = () => {
    const projects = allProjects

    return (
        <section id="projects" className="py-24 bg-gray-950">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Featured <span className="text-cyan-400">Projects</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Selected frontend and full-stack applications built with modern
                        technologies and clean UI architecture.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-cyan-400/40"
                        >
                            {/* Image */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-cyan-500 p-3 rounded-full text-white hover:bg-cyan-600 transition"
                                    >
                                        <FaExternalLinkAlt />
                                    </a>
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-800 p-3 rounded-full text-white hover:bg-gray-700 transition"
                                    >
                                        <FaGithub />
                                    </a>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-white mb-3 flex justify-between items-center">
                                    {project.title}
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-cyan-400 transition"
                                    >
                                        <FaGithub size={18} />
                                    </a>
                                </h3>

                                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                    {project.description}
                                </p>

                                {/* Tech Stack with Logos */}
                                <div className="flex flex-wrap gap-3 mb-6">
                                    {project.technologies.map((tech, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 text-xs px-3 py-1 bg-gray-800 rounded-full border border-gray-700"
                                        >
                                            {techIcons[tech]}
                                            <span className="text-gray-300">{tech}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-4">
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 text-center py-2 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition"
                                    >
                                        Live
                                    </a>
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 text-center py-2 border border-cyan-400 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-400 hover:text-black transition"
                                    >
                                        Code
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
