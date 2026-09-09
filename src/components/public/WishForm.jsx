import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import WishSuccess from "./WishSuccess";
import { supabase } from "../../lib/supabase";

const fieldVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.08,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

function WishForm() {
    const shouldReduceMotion = useReducedMotion();
    const [ submitError, setSubmitError] = useState("")
    const [formData, setFormData] = useState ({ 
        name: "", message: "",
    })
    
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const name = formData.name.trim()
        const message = formData.message.trim()

        if (!name || !message) {
            return;
        }
        setIsSubmitting(true)
        setSubmitError("")

        const { error } = await supabase
            .from("wishes")
            .insert({
            name,
            message,
        })

        if (error) {
            setSubmitError(
                "Failed to submit wish. Please try again."
            )
            setIsSubmitting(false)
            return
        }

        setIsSubmitting(false)
        setIsSubmitted(true)
    }

    const handleReset = () => {
        setFormData({ 
            name: "", 
            message: "" 
        })
        setIsSubmitted(false)
    }
    const animationProps = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.01 },
      }
    : {
        initial: "hidden",
        animate: "visible",
    };

    return (
        <AnimatePresence mode="wait">
            {isSubmitted ? ( 
                <WishSuccess key="success" onReset={handleReset}
                />
            ) : (
                <motion.form className="wish-form" key="form"
                    onSubmit={handleSubmit} noValidate {...animationProps}
                >
                    <motion.div className="wish-form-field" 
                        custom={0} 
                        variants={fieldVariants} >
                        <label htmlFor="name">Your name</label>
                        <input type="text" 
                            id="name" 
                            name="name" 
                            placeholder="What should she call you?" 
                            value={formData.name} 
                            autoComplete="name"
                            onChange={handleChange} 
                            disabled={isSubmitting} 
                            required />
                    </motion.div>

                    <motion.div className="wish-form-field"
                        custom={1} 
                        variants={fieldVariants} >
                        <label htmlFor="message">Your birthday wish</label>
                        <textarea id="message" 
                            name="message"
                            placeholder="Write something beautiful..."
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            required
                        />
                    </motion.div>

                    {submitError && (
                        <p
                            className="wish-form-error"
                            role="alert"
                        >
                            {submitError}
                        </p>
                    )}
                    <motion.button type="submit" 
                        className="wish-form-submit"
                        custom={2} 
                        variants={fieldVariants}
                        disabled={isSubmitting || !formData.name.trim() || !formData.message.trim()} 
                        whileHover={ 
                        shouldReduceMotion ? undefined : { y: -3 } 
                        }
                        whileTap={
                        shouldReduceMotion ? undefined : { scale: 0.98 } 
                        }
                        > 
                        {isSubmitting ? ( 
                            <>
                                <span className="wish-form-submit-spinner" aria-hidden="true" />
                                Sending...
                            </>
                        ) : ("Send your wish")}
                    </motion.button>
                </motion.form>
            )}     
        </AnimatePresence>
    )
}

export default WishForm