const Button = ({ children, variant = "primary", ...props }) => {
    const base =
        "px-6 py-3 rounded-md font-medium transition-all duration-300";

    const variants = {
        primary:
            "bg-gradient-primary text-primary-foreground hover:-translate-y-1",
        outline:
            "border border-primary/30 hover:border-primary hover:bg-primary/10",
    };

    return (
        <button className={`${base} ${variants[variant]}`} {...props}>
            {children}
        </button>
    );
};

export default Button;