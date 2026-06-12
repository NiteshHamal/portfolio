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
    const seo = settings.seo ?? {};
    const title = seo.title || 'Nitesh Hamal — Backend Developer from Nepal';
    const desc  = seo.description || 'Crafting efficient, scalable web applications with clean code and modern technologies from Kathmandu, Nepal.';

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta head-key="description"   name="description"         content={desc} />
                <meta head-key="og:type"       property="og:type"         content="website" />
                <meta head-key="og:title"      property="og:title"        content={title} />
                <meta head-key="og:description" property="og:description" content={desc} />
                {seo.og_image && <meta head-key="og:image" property="og:image" content={seo.og_image} />}
            </Head>
            <Navbar />
            <main>
                <Hero     data={settings.hero} photo={settings.about?.photo} />
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
