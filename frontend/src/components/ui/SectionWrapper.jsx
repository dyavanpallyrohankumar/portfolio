export default function SectionWrapper({ id, children }) {
    return (
        <section id={id} className="section">
            <div className="container">
                {children}
            </div>
        </section>
    );
}
