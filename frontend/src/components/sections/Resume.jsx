const Resume = () => {
    return (
        <section className="min-h-screen bg-gray-950 px-6 py-20">
            <div className="max-w-5xl mx-auto">

                <h2 className="text-4xl font-bold text-white mb-10 text-center">
                    Resume
                </h2>

                <div className="border border-gray-800 rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        src="/Resume.pdf"
                        title="Rohankumar Resume"
                        className="w-full h-[90vh]"
                    />
                </div>

                <div className="flex justify-center mt-8">
                    <a
                        href="/Resume.pdf"
                        download="Rohankumar_Resume.pdf"
                        className="px-6 py-3 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition"
                    >
                        Download Resume
                    </a>
                </div>

            </div>
        </section>
    );
};

export default Resume;
