import Navbar from './Navbar';
import Hero from './Hero';
import OurStory from './OurStory';
import Events from './Events';
import Gallery from './Gallery';
import DressCode from './DressCode';
import Venue from './Venue';

import LiveStream from './LiveStream';
import GuestBook from './GuestBook';
import FamilyIntro from './FamilyIntro';
import Footer from './Footer';

export default function PublicHome() {
    return (
        <>
            <Navbar />
            <Hero />
            <OurStory />
            <Events />
            <Gallery />
            <DressCode />
            <FamilyIntro />
            <Venue />

            <LiveStream />
            <GuestBook />
            <Footer />
        </>
    );
}
