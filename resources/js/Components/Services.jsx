import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import VanillaTilt from 'vanilla-tilt';

function ServiceCard({ icon, title, desc, delay }) {
    const cardRef = useRef(null);
    useEffect(() => {
        if (cardRef.current) {
            VanillaTilt.init(cardRef.current, { max: 12, speed: 400, glare: true, 'max-glare': 0.15 });
        }
        return () => cardRef.current?.vanillaTilt?.destroy();
    }, []);

    return (
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay }}
            ref={cardRef}
            className="card-glass text-center p-10 group cursor-default select-none">
            <div className="w-16 h-16 bg-accent rounded-xl mx-auto mb-6 flex items-center justify-center
                group-hover:scale-110 transition-all duration-300 shadow-lg shadow-accent/30 relative">
                <i className={`bi ${icon} text-2xl text-white`} />
                <div className="absolute inset-0 rounded-xl bg-accent/20 blur-md -z-10 group-hover:blur-xl transition-all duration-300" />
            </div>
            <h4 className="text-xl font-bold font-display text-white mb-4 group-hover:text-accent transition-colors duration-300">{title}</h4>
            <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
        </motion.div>
    );
}

export default function Services({ data = [] }) {
    return (
        <section id="services" className="py-24 bg-dark">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
                    <span className="text-accent text-sm font-display tracking-[4px] uppercase">What I Do</span>
                    <h2 className="text-4xl md:text-5xl font-bold font-display text-white mt-3">My Services</h2>
                    <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {data.map((s, i) => <ServiceCard key={i} {...s} delay={i * 0.15} />)}
                </div>
            </div>
        </section>
    );
}
