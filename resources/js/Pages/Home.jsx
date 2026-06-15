import { Head } from '@inertiajs/react';
import PageTransition from '../Components/PageTransition';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import About from '../Components/About';
import Resume from '../Components/Resume';
import Services from '../Components/Services';
import PortfolioSection from '../Components/Portfolio';
import Process from '../Components/Process';
import Contact from '../Components/Contact';
import TechTicker from '../Components/TechTicker';
import Testimonials from '../Components/Testimonials';
import Footer from '../Components/Footer';
import BackToTop from '../Components/BackToTop';
import ScrollProgress from '../Components/ScrollProgress';
import Preloader from '../Components/Preloader';
import SectionDots from '../Components/SectionDots';

export default function Home({ projects = [], settings = {}, testimonials = [] }) {
    const seo = settings.seo ?? {};
    const title = seo.title || 'Nitesh Hamal — Backend Developer from Nepal';
    const desc  = seo.description || 'Crafting efficient, scalable web applications with clean code and modern technologies from Kathmandu, Nepal.';

    return (
        <PageTransition>
            <Head>
                <title>{title}</title>
                <meta head-key="description"   name="description"         content={desc} />
                <meta head-key="og:type"       property="og:type"         content="website" />
                <meta head-key="og:title"      property="og:title"        content={title} />
                <meta head-key="og:description" property="og:description" content={desc} />
                {seo.og_image && <meta head-key="og:image" property="og:image" content={seo.og_image} />}
            </Head>
            <Preloader />
            <ScrollProgress />
            <Navbar />
            <main>
                <Hero     data={settings.hero} />
                <TechTicker />
                <About    data={settings.about} skills={settings.skills} />
                <Resume   data={settings.resume} />
                <Services data={settings.services} />
                <Process />
                <PortfolioSection projects={projects} />
                <Testimonials testimonials={testimonials} />
                <Contact  data={settings.contact} />
            </main>
            <Footer hero={settings.hero} contact={settings.contact} />
            <SectionDots />
            <BackToTop />
        </PageTransition>
    );
}
