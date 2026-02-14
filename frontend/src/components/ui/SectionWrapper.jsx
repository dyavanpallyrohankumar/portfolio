const SectionWrapper = ({ id, children }) => {
    return (
        <section
            id={id}
            className="relative z-10 px-6 py-24 min-h-screen"
        >
            <div className="max-w-6xl mx-auto">
                {children}
            </div>
        </section>
    );
};

export default SectionWrapper;