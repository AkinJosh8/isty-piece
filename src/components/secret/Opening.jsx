import { motion, useReducedMotion } from "framer-motion";
import openingImage from "../../assets/images/opening-1.jpg"

function Opening( { onEnter } ) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="opening">
      <motion.div 
        className="opening-background"
        style={{ backgroundImage: `url(${openingImage})`
        }}
        initial={ shouldReduceMotion ? { opacity: 1} : { opacity: 0, scale: 1.02 }}
        animate= { shouldReduceMotion ? {opacity: 1} : { opacity:1, scale: 1.06 }}
        transition={{ opacity: {duration: 0.8}, scale: {duration: 14, ease: "easeOut", }, }}
        aria-hidden= "true"
      />

      <div className="opening-overlay" aria-hidden="true" />
      <div className="opening-glow" aria-hidden="true" />

      <motion.div
        className="opening-content"
        initial={ shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 } }
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", }}
        >
        <motion.p
          className="opening-eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7, }}
          >
          Welcome to your little world, Isty
        </motion.p>

        <motion.h1
          initial={
            shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 } }
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          > This was made <span> just for you.</span>
        </motion.h1>

        <motion.p
          className="opening-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        > A collection of memories, moments,
          and a few surprises are waiting inside.
        </motion.p>

        <motion.button
          type="button"
          className="opening-button"
          onClick={onEnter}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          whileHover={ shouldReduceMotion ? undefined : { y: -3 } }
          whileTap={ shouldReduceMotion ? undefined : { scale: 0.98 } }
        >
          Enter
        </motion.button>
      </motion.div>
    </main>
  )
}

export default Opening