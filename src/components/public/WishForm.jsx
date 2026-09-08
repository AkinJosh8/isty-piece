import { useState } from "react";

function WishForm() {
    const [formData, setFormData] = useState ({ name: "", message: "",})

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()


    }
    return (
        <form className="wish-form" onSubmit={handleSubmit}>
            <div className="wish-form-field">
                <label>Your name</label>
                <input id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="What should she call you?"
                    required
                />
            </div>

            <div className="wish-form-field">
                <label htmlFor="message">Your birthday wish</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write something beautiful..."
                    required
                    rows={5}
                />
            </div>

            <button type="submit" className="wish-form-button">
                Send your wish
            </button>
        </form>
    )
}

export default WishForm