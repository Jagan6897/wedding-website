import { useState, useEffect } from 'react';
import { WEDDING_CONFIG } from '../config';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { label: 'Our Story', href: '#story' },
        { label: 'Events', href: '#events' },
        { label: 'Gallery', href: '#gallery' },
        { label: 'Venue', href: '#venue' },
        { label: 'RSVP', href: '#rsvp' },
        { label: 'Live', href: '#livestream' },
    ];

    const handleClick = () => setMenuOpen(false);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <a href="#" className="navbar-brand">
                {WEDDING_CONFIG.groom} & {WEDDING_CONFIG.bride}
            </a>
            <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
                {links.map((link) => (
                    <li key={link.href}>
                        <a href={link.href} onClick={handleClick}>{link.label}</a>
                    </li>
                ))}
            </ul>
            <button
                className="hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                <span />
                <span />
                <span />
            </button>
        </nav>
    );
}
