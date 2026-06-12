export default function Footer() {
    return (
        <footer className="bg-black/90 text-white/50 text-sm text-center py-6 font-sans">
            &copy; {new Date().getFullYear()}{' '}
            <span className="text-accent font-semibold">Nitesh Hamal</span>. All Rights Reserved.
        </footer>
    );
}
