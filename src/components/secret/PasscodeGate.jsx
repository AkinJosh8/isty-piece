import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

function PasscodeGate( { passcode, onUnlock } ) {
    const shouldReduceMotion = useReducedMotion();

    const [ value, setValue] = useState("")
    const [ error, setError] = useState("")
    const [ isUnlocking, setIsUnlocking] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!value.trim()) {
            setError(" Enter the passcode to continue.")
            return
        }

        if (value !== passcode) {
            setError("That doesn't seem to be the right code.")
            setValue("")
            return
        }
        
        setError("")
        setIsUnlocking(true)

        await new Promise((resolve) => {
            setTimeout(resolve, 900)
        })
        sessionStorage.setItem("isUnlocked", "true")
        onUnlock()
    }

    return (
        <main className="passcode-gate">
            <div className="passcode-gate-ambient"
                aria-hidden="true">
                <div className="passcode-gate-orb passcode-gate-orb-purple" />
                <div className="passcode-gate-orb passcode-gate-orb-blue" />
            </div>

            <motion.div className="passcode-gate-card"
                initial={ 
                    shouldReduceMotion 
                        ? { opacity: 0 } 
                        : { opacity: 0, y: 24,scale: 0.97 
                    }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                >
                <motion.div className="passcode-gate-lock"
                    animate={ 
                        shouldReduceMotion 
                        ? undefined
                        : { y: [0, -4, 0], 
                    }}
                    transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        ease: "easeInOut" 
                    }}
                    aria-hidden="true"
                >   &#x1F512;
                </motion.div>
                    <p className="passcode-gate-eyebrow">
                        Private Access
                     </p>
            
                    <h1>
                        A little world
                        <span> awaits you.</span>
                    </h1>

                    <p className="passcode-gate-description">
                        This part is just for her. Enter the secret
                        passcode to continue.
                    </p>
                    
                <form
                        className="passcode-gate-form"
                        onSubmit={handleSubmit}
                        >
                        <label htmlFor="secret-passcode">
                            Secret passcode
                        </label>

                        <input
                            id="secret-passcode"
                            type="password"
                            value={value}
                            onChange={(event) => {
                                setValue(event.target.value);
                                setError("");
                            }}
                            disabled={isUnlocking}
                            placeholder="Enter your passcode"
                            autoComplete="off"
                            autoFocus
                        />
                        {error && (
                        <motion.p 
                            className="passcode-gate-error"
                            initial={{ opacity: 0, y: -6 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                x: shouldReduceMotion ? 0
                                : [0, -6, 6, -4, 4, 0],
                            }}
                                transition={{ duration: 0.35 }}
                                role="alert"
                            >
                                {error}
                        </motion.p>
                        )}

                    <motion.button
                        type="submit"
                        className="passcode-gate-button"
                        disabled={isUnlocking}
                        whileHover={ shouldReduceMotion ? undefined : { y: -3 } 
                            }
                        whileTap={ shouldReduceMotion ? undefined : { scale: 0.98 } 
                            }
                        >
                            {isUnlocking ? (
                                <>
                                    <span
                                        className="passcode-gate-spinner"
                                        aria-hidden="true"
                                    />
                                    Unlocking...
                                </>
                            ) : (
                            "Enter the room"
                        )}
                    </motion.button>
                </form>
                    <p className="passcode-gate-hint">
                        Made with love, just for you.
                    </p>
            </motion.div>
        </main>
    )
}

export default PasscodeGate