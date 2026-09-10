import { motion, useReducedMotion } from "framer-motion";

import birthdayData from "../../data/birthdayData";
import GlowOrb from "../effects/GlowOrb";

function Hero() {
  const shouldReduceMotion = useReducedMotion();

    return (
        <section className="secret-hero">
            <div className="secret-hero-ambient"
                aria-hidden="true"
                >
                <GlowOrb className="glow-orb-purple" />
                <GlowOrb className="glow-orb-blue" />
                <GlowOrb className="glow-orb-center" />
            </div>

            <div className="secret-hero-particles" aria-hidden="true"
            >   
                <span>&#x2726;</span>
                <span>&#x2726;</span>
                <span>&#x2726;</span>
                <span>&#x2726;</span>
                <span>&#x2726;</span>
            </div>

            <motion.div
                className="secret-hero-content"
                initial={
                    shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: 30 }
                }   
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1,
                        ease: "easeOut",
                    }}
                    >
                <motion.p
                    className="secret-hero-eyebrow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    >
                    Today is all about you...
                </motion.p>

                <motion.h1
                    initial={
                    shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: 25 }
                    }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                        delay: 0.4,
                        duration: 0.9,
                    }}
                    >
                    Happy Birthday,
                    <span>{birthdayData.name}.</span>
                </motion.h1>

                <motion.p
                    className="secret-hero-message"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        delay: 0.8,
                        duration: 0.8,
                    }}
                >
                    {birthdayData.heroTagline}
                </motion.p>

                <motion.div
                    className="secret-hero-scroll"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        delay: 1.4,
                         duration: 0.8,
                    }}
                    >
                        <span>Scroll to explore</span>
                        <span className="secret-hero-arrow">&#x2193;</span>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Hero 