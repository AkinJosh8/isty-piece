import { easeOut, motion } from "framer-motion"

function WishSuccess ({ onReset }) {
    return (
        <motion.div className="wish-success"
            initial={{ opacity: 0, scale: 0.96, y:16 }}
            animate={{ opacity:1, scale: 1, y:0 }}
            exit={{ opacity:0, scale:0.96, y: -12 }}
            transition={{ duration: 0.5, ease: "easeOut", }}
            role="status" aria-live="polite"
        >
        <motion.div className="wish-success-icon" initial={{ scale: 0, rotate:-20 }}
            animate={{ scale: 1, rotate:0 }}
            transition={{ duration: 0.45, delay: 0.15, type: "spring", stiffness: 180, }}
            aria-hidden="true"
        > <span style={{ color: 'blue', fontSize: '24px' }}>&#10004;</span>
        </motion.div>
        
            <h2>Wish received</h2>

            <p>Your words are now part of her birthday story</p>
            <motion.button type="button" className="wish-success-reset"
                onClick={onReset} whileHover={{ y: -2, }}
                whileTap={{ scale: 0.96, }}
            >
                Send another wish
            </motion.button>
        </motion.div>
    )
}

export default WishSuccess