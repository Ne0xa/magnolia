# 🌸 Magnolia — Pokémon Trading Card Collector

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=for-the-badge&logo=swiper&logoColor=white)
![License](https://img.shields.io/badge/License-Academic-blue?style=for-the-badge)
![School](https://img.shields.io/badge/IIM-Digital%20School-ff6b6b?style=for-the-badge)

A responsive web application for browsing and collecting Pokémon trading cards, featuring interactive 3D card tilt effects, a card carousel, a lightbox gallery, and a validated contact form.

---

## 📸 Preview

> Browse cards with a holographic tilt effect, swipe through featured cards, and navigate between pages — all in one clean interface.

---

## ✨ Features

- **Tab navigation** — Smooth animated transitions between Home, Cards, and Contact pages
- **Swiper carousel** — Auto-playing slideshow of featured cards on the homepage
- **GLightbox** — Click any carousel card to open a fullscreen lightbox
- **3D card tilt effect** — Mouse-tracking holographic tilt with glare highlight on each card
- **Scroll-in animation** — Cards fade and slide in with a staggered delay when the Cards tab is opened
- **Contact form** — Client-side validation with visual success/error feedback

---

## 🃏 Card Tilt Effect — Credits & Inspiration

The holographic 3D card tilt effect is inspired by and based on the following open-source work:

- **[simeydotme/pokemon-cards-css](https://github.com/simeydotme/pokemon-cards-css)** — Original concept and CSS techniques for Pokémon card holographic effects
- **[poke-holo.simey.me](https://poke-holo.simey.me/)** — Live demo by the same author
- **[Cosmeak/iim-bachelor-3 — card.jsx](https://github.com/Cosmeak/iim-bachelor-3/blob/main/react/src/components/card.jsx)** — React component adaptation used as a reference for the JavaScript implementation

---

## 🗂️ Project Structure

```
magnolia/
│
├── index.html       # Main HTML file — structure, tabs, swiper, card grid, contact form
├── style.css        # All styles — layout, animations, card tilt, form, responsive grid
└── main.js          # All interactivity — tabs, swiper init, lightbox, tilt logic, form validation
```

### `index.html`
- Site header with tab navigation links
- **#home** section: welcome text + Swiper carousel with GLightbox-enabled images
- **#cards** section: CSS grid of 24 Pokémon cards (images from `pokemontcg.io`)
- **#contact** section: registration form with name, email, password, and password confirmation fields

### `style.css`
- Global reset and base styles
- Header and navigation styles with hover glow effect
- Tab show/hide logic via `.tab-content` / `.active` classes with `fadeIn` animation
- Swiper container sizing and floating card animation (`@keyframes float`)
- Card grid layout using `auto-fill` with `minmax(180px, 1fr)`
- Card 3D tilt using CSS custom properties (`--rx`, `--ry`, `--mx`, `--my`, `--hyp`)
- Holographic glare overlay via `::after` pseudo-element with `radial-gradient` and `mix-blend-mode: screen`
- Contact form layout, input/button styles, shake/pulse animations, and error/success state classes

### `main.js`
- **Tab system**: Switches `.active` class between sections; triggers card stagger animation on Cards tab
- **Swiper**: Initialized with loop, autoplay (2500ms delay), and pagination
- **GLightbox**: Initialized on `.glightbox` elements with touch navigation and loop
- **Card tilt**: Per-card mouse tracking using `requestAnimationFrame` for smooth lerp-based rotation; updates CSS custom properties for glare position and intensity
- **Form validation**: Checks email field is not empty; validates password with regex (`/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/`); applies `.success` / `.error` classes accordingly

---

## 🛠️ Technologies Used

| Technology | Usage |
|---|---|
| HTML5 | Structure and semantic markup |
| CSS3 | Styling, animations, 3D transforms |
| Vanilla JavaScript | Interactivity and DOM manipulation |
| [Swiper.js v12](https://swiperjs.com/) | Touch-enabled card carousel |
| [GLightbox](https://biati-digital.github.io/glightbox/) | Fullscreen image lightbox |
| [Pokémon TCG API](https://pokemontcg.io/) | Card image assets |

---

## 🚀 Getting Started

No build step or dependencies to install. Just open the project in a browser:

```bash
# Clone the repository
git clone <your-repo-url>
cd magnolia

# Open directly in browser
open index.html
```

---

## 👨‍🎓 Academic Context

| | |
|---|---|
| **Course** | Advanced JavaScript |
| **Level** | First-year Bachelor (B1) |
| **Institution** | IIM — Digital School |
| **Semester** | B1 |

---

## 📄 Licence

This project was developed as part of an academic assignment. All rights reserved to the student.
