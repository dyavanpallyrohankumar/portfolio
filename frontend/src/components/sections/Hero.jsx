import SectionWrapper from "../ui/SectionWrapper";

export default function Hero() {
    return (
        <SectionWrapper id="home">
            <div className="hero">
                <h1>Rohankumar Dyavanpally</h1>
                <h3 className="hero-title">Frontend Developer</h3>
                <p className="hero-description">
                    I build clean, responsive, and high-performance web interfaces using React.
                </p>

                <div className="hero-buttons">
                    <a href="#projects" className="btn-primary">View Projects</a>
                    <a href="/resume.pdf" className="btn-outline" download>
                        Download Resume
                    </a>
                </div>
            </div>
        </SectionWrapper>
    );
}
