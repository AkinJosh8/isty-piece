# Isty World 🎂

> A private, interactive birthday experience created to celebrate Isty - her journey, memories, the people who care about her, and a few surprises along the way.

🔗 **Live Website:** https://istyworld.netlify.app/

---

## About The Project

Isty World is a custom interactive birthday experience built from scratch with React.

Instead of creating a traditional birthday webpage, the goal was to build something that feels more like a small digital experience - combining memories, personal messages, animations, guest wishes, and a private surprise into one cohesive journey.

The experience is divided into two main areas:

- **Public Birthday Wishes** - visitors can leave a personal birthday message.
- **Private Secret Room** - a passcode-protected experience containing memories, a personalized message, a surprise letter, and guest wishes.

The project was designed with a strong focus on:

- Visual storytelling
- Smooth interactions
- Responsive design
- Accessibility
- Reduced-motion support
- Performance
- Secure data handling through Supabase

---

## Features

### Public Birthday Wishes

- Visitors can enter their name and birthday wish.
- Wishes are stored using Supabase.
- Animated success state after submission.
- Visitors can submit multiple wishes.
- Multiline messages are preserved when displayed.
- Accessible form labels and interaction states.

### Secret Room

- Passcode-protected private experience.
- Session-based unlock state.
- Animated entrance experience.
- Cinematic visual treatment.

### Opening Experience

- Full-screen cinematic background.
- Dark atmospheric overlay.
- Slow image zoom animation.
- Framer Motion entrance animations.
- Reduced-motion support.

### Hero Section

- Personal birthday message.
- Animated typography.
- Ambient glow effects.
- Responsive layout across devices.

### Memories

- Interactive memory slideshow.
- Five personal memory cards.
- Automatic slideshow playback.
- Manual navigation controls.
- Responsive mobile experience.
- Swipe interaction support.
- Reduced-motion support.

### Surprise

- Personalized love letter experience.
- Animated letter reveal.
- Cinematic glassmorphism design.
- Dedicated space for personal media.
- Ambient glow effects.

### Guest Wishes

- Wishes submitted from the public page appear inside the Secret Room.
- Dynamic data loaded from Supabase.
- Responsive card layout.
- Preserves line breaks in longer messages.
- Animated card entrance.

### Admin Dashboard

- Supabase Authentication.
- Authenticated dashboard access.
- View submitted wishes.
- Wish statistics.
- Refresh wishes.
- Delete wishes.
- Formatted submission dates.

---

## Tech Stack

- **React**
- **Vite**
- **JavaScript (ES6+)**
- **CSS3**
- **Framer Motion**
- **Supabase**
- **Netlify**
- **Git & GitHub**

---

## Project Architecture

```text
src/
├── assets/
│   ├── images/
│   └── videos/
│
├── components/
│   ├── ui/
│   │   └── Footer.jsx
│   │
│   ├── public/
│   │   ├── WishForm.jsx
│   │   └── WishSuccess.jsx
│   │
│   ├── secret/
│   │   ├── PasscodeGate.jsx
│   │   ├── Opening.jsx
│   │   ├── Hero.jsx
│   │   ├── Memories.jsx
│   │   ├── Surprise.jsx
│   │   └── GuestWishes.jsx
│   │
│   └── effects/
│       └── GlowOrb.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── SecretRoom.jsx
│   └── Admin.jsx
│
├── data/
│   └── birthdayData.js
│
├── lib/
│   └── supabase.js
│
├── styles/
│   ├── globals.css
│   ├── variables.css
│   └── animations.css
│
├── App.jsx
└── main.jsx