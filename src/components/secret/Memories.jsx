import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import memory1 from "../../assets/images/memory-1.jpg"
import memory2 from "../../assets/images/memory-2.jpg"
import memory3 from "../../assets/images/memory-3.jpg"
import memory4 from "../../assets/images/memory-4.jpg"
import memory5 from "../../assets/images/memory-5.jpg"


const memories = [
    {
    id: 1,
    title: "The Beginning of moment that worth keeping",
    description:
      "Some moments become memories before we even realize it.",
    image: memory1,
  },
  {
    id: 2,
    title: "Growing; Another beautiful chapter",
    description:
      "The little moments often become the ones we remember most.",
    image: memory2,
  },
  {
    id: 3,
    title: "A memory in motion",
    description:
      "Here's to the moments that made the journey special.",
    image: memory3,
  },
  {
    id: 4,
    title: "Becoming",
    description:
      "A stronger, brighter version of you..",
    image: memory4,
  },
  {
    id: 5,
    title: "This Moment",
    description:
      "And here we are, celebrating you.",
    image: memory5,
  },
]

function Memories( ) {
  const shouldReduceMotion = useReducedMotion()

  const [ activeIndex, setActiveIndex ] = useState(0)
  const [ isPaused, setIsPaused ] = useState(false)

  const goTo = (index) => {
    const nextIndex =
        (index + memories.length) % memories.length

      setActiveIndex(nextIndex) 
  }

  useEffect(() => {
    if (shouldReduceMotion || isPaused) return;

    const autoplay = setInterval(() => {
      setActiveIndex((currentIndex) => {
        return (currentIndex + 1) % memories.length;
      });
    }, 5000);

    return () => clearInterval(autoplay);
  }, [shouldReduceMotion, isPaused]);

  const handleDragEnd = (_, info) => {
    const swipeDistance = info.offset.x 

    if (swipeDistance < -60) {
        goTo(activeIndex +1)
      }

      if (swipeDistance >60) {
        goTo(activeIndex -1)
      }
  }

  return (
    <section className="memories" id="memories">
      <div className="memories-heading">
          <motion.p
            className="memories-eyebrow"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            >
            The moments
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            > 
              Memories <span> worth keeping.</span>
          </motion.h2>

          <motion.p
            className="memories-intro"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            >
              A few moments from a journey that continues
              to become more beautiful with time.
          </motion.p>
      </div>

      <div className="memories-carousel" onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)} onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}>
        <motion.div
              className="memory-card"
              key={memories[activeIndex].id}
              drag={shouldReduceMotion ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              initial={ shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", }}
              whileTap={ shouldReduceMotion ? undefined : { cursor: "grabbing" }}
              >
            <div className="memory-card-image">
            <img src={memories[activeIndex].image}
              alt={memories[activeIndex].title}
              draggable="false"
            />
            <div className="memory-card-overlay" />
            </div>

            <div className="memory-card-content">
            <p className="memory-card-number"> 
                {String(activeIndex + 1).padStart(2, "0")}
              <span> / 
                {String(memories.length).padStart(2, "0")}
              </span>
            </p>
              <h3> {memories[activeIndex].title}  </h3>
              <p> {memories[activeIndex].description} </p>
            </div>
          </motion.div>
      </div>

      <div className="memories-controls">
        <button
            type="button"
            className="memories-arrow"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous memory"
            >
            &#11013;
        </button>

        <div
            className="memories-dots"
            aria-label="Memory navigation"
            >
            {memories.map((memory, index) => (
          <button
            key={memory.id}
            type="button"
            className={`memories-dot ${
            index === activeIndex
            ? "memories-dot-active"
            : ""
            }`}
            onClick={() => goTo(index)}
            aria-label={`Go to memory ${index + 1}`}
            aria-current={ index === activeIndex ? "true" : undefined }
          /> ))}
        </div>

        <button
            type="button"
            className="memories-arrow"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next memory"
            >
            &#10145;
        </button>
      </div>
        <p className="memories-swipe-hint">
          &#11013; Swipe to explore &#10145;
        </p>
  </section>
  )
}

export default Memories