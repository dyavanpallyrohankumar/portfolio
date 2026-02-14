import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
                    ? "bg-gray-900/90 backdrop-blur-md py-2 shadow-lg"
                    : "bg-transparent py-4"
                }`}
        >
            <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                {/* Logo */}
                <a href="#" className="text-2xl font-bold">
                    <span className="text-cyan-400">&lt;</span>
                    Rohankumar
                    <span className="text-cyan-400">/&gt;</span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <a href="#about" className="text-gray-300 hover:text-white">
                        About
                    </a>
                    <a href="#skills" className="text-gray-300 hover:text-white">
                        Skills
                    </a>
                    <a href="#projects" className="text-gray-300 hover:text-white">
                        Projects
                    </a>
                    <a href="#contact" className="text-gray-300 hover:text-white">
                        Contact
                    </a>

                    {/* Social Icons */}
                    <div className="flex space-x-4">
                        <a
                            href="https://github.com/yourgithub"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white"
                        >
                            <FaGithub size={20} />
                        </a>
                        <a
                            href="https://linkedin.com/in/yourlinkedin"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white"
                        >
                            <FaLinkedin size={20} />
                        </a>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-gray-300"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {/* Hamburger / Close */}
                    {isMobileMenuOpen ? (
                        <span className="text-2xl">✕</span>
                    ) : (
                        <span className="text-2xl">☰</span>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-gray-800 py-4">
                    <div className="flex flex-col items-center space-y-4">
                        <a href="#about" className="text-gray-300 hover:text-white">
                            About
                        </a>
                        <a href="#skills" className="text-gray-300 hover:text-white">
                            Skills
                        </a>
                        <a href="#projects" className="text-gray-300 hover:text-white">
                            Projects
                        </a>
                        <a href="#contact" className="text-gray-300 hover:text-white">
                            Contact
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
