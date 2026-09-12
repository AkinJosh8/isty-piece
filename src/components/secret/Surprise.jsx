import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import couplePhoto from "../../assets/images/Couple-photo.jpeg"


const letter = `16th of September, one of the dates I’m always looking forward to.

Well, you guessed right! It’s my baby’s birthday, and somehow, the date becomes even more special as the years pass by. We’ve had so many memories over the years, the laughter, little arguments, random conversations, beautiful moments and everything in between. Honestly, I wouldn’t trade any of it for anything.

But this year feels a little different because you’ve achieved so much, and I’m genuinely so proud of you. Watching you grow, become better, stronger, wiser and more confident in yourself has been such a beautiful thing to witness. Sometimes I just sit back and realise how far you’ve come, and it makes me happy knowing I get to be part of your journey.

I probably don’t always say it the way I should, and sometimes I may not show it enough, but I really, really love you. You’ve become such an important part of my life, and having you in it is something I’ll never take for granted.

You’re not just my girlfriend. You’re my baby, my person, someone I can talk to about serious things and still laugh about the most stupid things with. Your happiness genuinely matters to me, and I hope you never forget that you are deeply loved.

On your birthday, I just want you to know how proud I am of the woman you’re becoming. I’m proud of everything you’ve achieved, everything you’ve overcome, and even the little things you probably don’t think are worth mentioning. I see your effort, I see your growth, and I hope you always remember how amazing you are.

I pray this new year brings you the kind of happiness that stays. May Allah continue to guide you, protect you, grant you your heart’s desires and put the right people and opportunities in your path. I pray you never have to doubt yourself or your worth, because you’re capable of so much more than you sometimes realise.

And selfishly, I pray I get to experience many more 16th of September with you. More birthdays, more memories, more laughter, more adventures, more silly arguments we’ll eventually laugh about, and more moments where I get to look at you and think, “Yeah, this is my girl.”

Thank you for being you. Thank you for the love, the memories, the laughter and even the difficult moments that have helped us understand each other better. I wouldn’t change our story for anything.

I love you so much, more than I probably know how to put into words. 

Happy birthday, my beautiful baby.`;

function Surprise() {
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="surprise" id="surprise">
      <div className="surprise-ambient" aria-hidden="true">
        <div className="surprise-orb surprise-orb-purple" />
        <div className="surprise-orb surprise-orb-blue" />
      </div>

      {!isOpen ? (
        <motion.div
          className="surprise-intro"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          >
          <motion.p
            className="surprise-eyebrow"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            A little something
          </motion.p>

          <motion.h2
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 18 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.8 }}
          >
            For you...
            <span>&#x2726;</span>
          </motion.h2>

          <motion.button
            type="button"
            className="surprise-open-button"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7 }}
            whileHover={ shouldReduceMotion ? undefined : { y: -3 }}
            whileTap={ shouldReduceMotion ? undefined : { scale: 0.98 }}
          >
            Open your letter
            <span>&#x2726;</span>
          </motion.button>
        </motion.div> ) : (
        <motion.div
          className="surprise-letter-wrapper"
          initial={ shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.97, }}
          animate={{ opacity: 1, y: 0, scale: 1, }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          >
          <motion.div
            className="surprise-letter"
            initial={ shouldReduceMotion ? undefined : { rotateX: 8 }}
            animate={{ rotateX: 0 }}
            transition={{ duration: 1, ease: "easeOut", }}
            >
            <div className="surprise-letter-top">
              <span>&#x2726;</span>
              <span>For you</span>
              <span>&#x2726;</span>
            </div>

            <div className="surprise-letter-content">
              <p className="surprise-letter-greeting">
                Dear Isty,
              </p>

              <div className="surprise-letter-text">
                {letter.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="surprise-letter-bottom">
              <span>With love,</span>
              <span>Abdazeez Ayomide</span>
            </div>
          </motion.div>

          <motion.div
            className="surprise-media-slot"
            initial={ shouldReduceMotion ? {opacity: 0} : {opacity: 0, y: 30} }
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9, ease:"easeOut" }}
            >
            <div className="surprise-photo-heading">
              <span>&#x2726;</span>
              <span>A moment together</span>
              <span>&#x2726;</span>
            </div>

            <motion.div className="surprise-photo-frame"
              whileHover={ shouldReduceMotion ? undefined : { scale: 1.015 }}
              transition={{ duration: 0.4, ease: "easeOut", }}
              >
              <img src={couplePhoto} alt="A couple sharing a moment together" />

              <div  className="surprise-photo-overlay"  aria-hidden="true"  />

              <div  className="surprise-photo-glow" aria-hidden="true"  />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

export default Surprise;