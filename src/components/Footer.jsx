export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        // Replace website link with our own

        <footer className="footer bg-body-tertiary text-center text-lg-start">
            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2022 - {currentYear},
                <span className="text-body"> Bagels Etc.</span>
            </div>
        </footer>
    );
}