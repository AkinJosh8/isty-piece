import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { supabase } from "../../lib/supabase";

function GuestWishes() {
    //usereducemotion() for users with reduced motion enabed in their OS
    const shouldReduceMotion = useReducedMotion()
    //a piece which intially contains nothing, but will be somthing when synced with wishes from supabase
    const [wishes, setWishes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() =>{
        const fetchWishes = async ( ) => {
            setIsLoading(true)
            setError("")

            const { data, error: fetchError } = await supabase
                .from("wishes")
                .select("id, name, message, created_at")
                .order("created_at", {ascending: false})

            if (fetchError) {
                setError("We couldn't load the wishes right now")
                setIsLoading(false)
                return
            }

            setWishes( data || [] )
            setIsLoading(false)
        }
        fetchWishes()
    }, [])

    return (
        <section className="guest-wishes" id="wishes">
            <div className="guest-wishes-ambient" aria-hidden="true">
                <div className="guest-wishes-orb guest-wishes-orb-purple"></div>
                <div className="guest-wishes-orb guest-wishes-orb-blue"></div>
            </div>
            <div className="guest-wishes-container">
                <motion.div className="guest-wishes-heading"
                    initial={ shouldReduceMotion ? {opacity: 0 } : {opacity:0, y:25 }}
                    whileInView={{ opacity:1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                    <p className="guest-wishes-eyebrow"
                    >
                    From the people who care about you &#x2726;</p>
                    <h2>Birthday <span>wishes.</span></h2>
                    <p className="guest-wishes-intro" 
                    >A few words from people who wanted to make your day a little more special.</p>
                </motion.div>
                
                {isLoading &&(
                    <div className="guest-wishes-status" role="alert">
                        <span className="guest-wishes-spinner" />
                        <p>Gathering your wishes...</p>
                    </div>  
                )}

                {!isLoading && error && (
                    <div className="guest-wishes-status" role="alert">
                        <p>{error}</p>
                    </div>
                )}

                {!isLoading && !error && wishes.length === 0 && (
                    <div className="guest-wishes-empty">
                        <span aria-hidden="true">&#x2726;</span>
                        <p>No wishes yet.</p>
                        <small>Be the first to leave a birthday message.</small>
                    </div>
                )}

                {!isLoading && !error && wishes.length > 0 && (
                    <div className="guest-wishes-grid">
                        {wishes.map((wish, index) => (
                            <motion.article key={wish.id} className="guest-wish-card"
                                initial={ shouldReduceMotion ? { opacity: 0} : {opacity: 0, y:25 }}
                                whileInView={{ opacity: 1, y: 0}}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{ duration: 0.6, delay: Math.min(index *0.08, 0.4), ease: "easeOut"}}
                            >
                                <div className="guest-wish-card-top">
                                    <span className="guest-wish-mark" aria-hidden="true">&#8220;</span>
                                    <span className="guest-wish-star" aria-hidden="true">&#x2726;</span>
                                </div>

                                <p className="guest-wish-message">{wish.message}</p>
                                <div className="guest-wish-author">
                                    <span  >{wish.name.charAt(0).toUpperCase()}</span>
                                    <div>
                                        <strong>{wish.name}</strong>
                                        <span>Birthday wish</span>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default GuestWishes