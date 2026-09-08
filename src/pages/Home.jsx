import { motion, useReducedMotion } from "framer-motion";

import WishForm from "../components/public/WishForm";
import GlowOrb from "../components/effects/GlowOrb";

function Home() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = ( delay = 0) => ({
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 0},
        animate: { opacity: 1},
        animation: { duration: 0.01},
      }
    },

    return: {
      initial: { opacity: 0, y: 24},
      animate: { opacity: 1, y: 0},
      transition: { duration: 0.7, delay, ease: "easeOut"},
    }
  })


  return (
    <main>
      <section className="home">

        <div className="home-ambient">
          <GlowOrb className="glow-orb-purple" />
          <GlowOrb className="glow-orb-blue" />
          <GlowOrb className="glow-orb-center" />
        </div>

        <div className="home-noise" aria-hidden="true" />

        <div className="home-content">
          <motion.p className="home-eyebrow" 
          {...reveal(0.1)} >
            A little something special
          </motion.p>
          
          <motion.h1 
          {...reveal(0.2)} >
              Leave a little
            <span> Love.</span>
          </motion.h1>

          <motion.p className="home-description"
          {...reveal(0.3)} >
            She's celebrating another beautiful year, and we'd
            love for you to be part of her story.
          </motion.p>

          <WishForm />
        </div>
      </section>
    </main>
  );
}

export default Home;