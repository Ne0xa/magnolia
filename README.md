# 🌸 Magnolia

> Site de cartes Pokémon à collectionner — visualisation, recherche et galerie de cartes haute résolution.

🔗 **Demo live :** [ne0xa.github.io/magnolia](https://ne0xa.github.io/magnolia/)

---

## ✨ Fonctionnalités

- **Carrousel de cartes** — slideshow animé des cartes Pokémon en haute résolution via Swiper.js
- **Lightbox** — agrandissement des cartes au clic grâce à GLightbox
- **Recherche Pokédex** — recherche d'un Pokémon par nom via l'API PokéTCG
- **Galerie de cartes** — collection de 24 cartes issues de plusieurs sets (Base Set, Sword & Shield, Scarlet & Violet…)
- **Formulaire de contact** — formulaire avec validation (pseudo, email, mot de passe)
- **Navigation par onglets** — interface single-page avec onglets Accueil / Cartes / Contact

---

## 🛠️ Stack technique

| Couche | Technologie |
|---|---|
| Frontend | HTML5, CSS3, JavaScript vanilla |
| Carrousel | [Swiper.js](https://swiperjs.com/) v12 |
| Lightbox | [GLightbox](https://biati-digital.github.io/glightbox/) |
| Backend | PHP (PSR-4) |
| HTTP Client | [Guzzle](https://docs.guzzlephp.org/) ^7.10 |
| Données cartes | [Pokémon TCG API](https://pokemontcg.io/) |

---

## 📁 Structure du projet

```
magnolia/
├── src/                    # Backend PHP (namespace Neoxa\MagnoliaBackend)
├── index.html              # Page principale (SPA avec onglets)
├── style.css               # Styles globaux
├── main.js                 # Logique JavaScript (tabs, swiper, recherche)
├── composer.json           # Dépendances PHP
└── composer.lock
```

---

## 🚀 Installation

### Prérequis

- PHP >= 8.0
- [Composer](https://getcomposer.org/)
- Un serveur web (Apache, Nginx, ou `php -S`)

### Étapes

```bash
# Cloner le dépôt
git clone https://github.com/Ne0xa/magnolia.git
cd magnolia

# Installer les dépendances PHP
composer install

# Lancer un serveur de développement local
php -S localhost:8000
```

Ouvrir ensuite [http://localhost:8000](http://localhost:8000) dans le navigateur.

---

## 🃏 Cartes disponibles

La galerie inclut des cartes issues des sets suivants :

- **Base Set** — Charizard, Blastoise, Pikachu, Nidoran, Squirtle…
- **Sword & Shield** — Gossifleur, Cinderace, Cinccino, Stonjourner VMAX…
- **Scarlet & Violet (sv1, sv2, sv3pt5)** — Charcadet, Kilowattrel, Tinkatink, Eevee, Snorlax, Haunter, Dragonair…

---

## 📄 Licence

Ce projet est distribué sous la licence **Academic Free License v. 3.0 (AFL-3.0)**.

Elle accorde une licence mondiale, libre de redevances et non exclusive permettant de reproduire, modifier, distribuer et déployer le projet, sous réserve de conserver les mentions de copyright et d'attribution dans tout travail dérivé.

Pour plus de détails : [opensource.org/license/AFL-3.0](https://opensource.org/license/AFL-3.0)
