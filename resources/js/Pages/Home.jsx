import { Head } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import About from '../Components/About';
import Resume from '../Components/Resume';
import Services from '../Components/Services';
import PortfolioSection from '../Components/Portfolio';
import Contact from '../Components/Contact';
import Footer from '../Components/Footer';

export default function Home({ projects = [], settings = {} }) {
    return (
        <>
            <Head title="Nitesh Hamal - Backend Developer" />
            <Navbar />
            <main>
                <Hero     data={settings.hero} />
                <About    data={settings.about} skills={settings.skills} stats={settings.stats} />
                <Resume   data={settings.resume} />
                <Services data={settings.services} />
                <PortfolioSection projects={projects} />
                <Contact  data={settings.contact} />
            </main>
            <Footer />
        </>
    );
}
