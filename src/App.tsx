import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import Events from './components/Events';
import Gallery from './components/Gallery';
import DressCode from './components/DressCode';
import Venue from './components/Venue';
import RSVP from './components/RSVP';
import LiveStream from './components/LiveStream';
import GuestBook from './components/GuestBook';
import FamilyIntro from './components/FamilyIntro';
import Footer from './components/Footer';

export default function App() {
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
      <RSVP />
      <LiveStream />
      <GuestBook />
      <Footer />
    </>
  );
}
