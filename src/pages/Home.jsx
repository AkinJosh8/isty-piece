import { motion, useReducedMotion } from "framer-motion";
import WishForm from "../components/public/WishForm";
import GlowOrb from "../components/effects/GlowOrb";
import Memories from "../components/secret/Memories";
import openingImage from "../assets/images/opening-1.jpg";

function Home({ onSecretRoom }) {
  const shouldReduceMotion = useReducedMotion();

  const reveal = ( delay = 0) => {
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.01 },
      }
    }
      return {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay,ease: "easeOut",
      },
    };
  }


  return (
    <main>
      <section className="home">
        <motion.div
          className="home-background"
          style={{ backgroundImage: `url(${openingImage})`, }}
          initial={ shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.02 }}
          animate={ shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1.06 }}
          transition={{ opacity: { duration: 0.8, }, scale: {duration: 16, ease: "easeOut", }, }}
          aria-hidden="true"
        />

        <div className="home-overlay" aria-hidden="true" />
        <div className="home-glow" aria-hidden="true" />

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

          <motion.div className="home-wish-card" {...reveal(0.44)}>
            <WishForm />
          </motion.div>

          <motion.button
            type="button"
            className="home-secret-link"
            onClick={onSecretRoom}
            {...reveal(0.56)}
          >
            For her eyes only <span>&#10132;</span>
          </motion.button>
        </div>
      </section>
      <Memories />
    </main>
  );
}

export default Home;