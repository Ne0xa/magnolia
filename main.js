function applyTilt(card) {
  var state = { tiltX: 0, tiltY: 0, targetX: 0, targetY: 0 };
  var friction = 1 / 15;
  var maxTilt = 10;

  (function animate() {
    state.tiltX += (state.targetX - state.tiltX) * friction;
    state.tiltY += (state.targetY - state.tiltY) * friction;
    var inner = card.querySelector(".card-inner");
    if (inner)
      inner.style.transform =
        "rotateY(" + state.tiltX + "deg) rotateX(" + state.tiltY + "deg)";
    requestAnimationFrame(animate);
  })();

  card.addEventListener("mousemove", function (e) {
    var r = card.getBoundingClientRect();
    var cx = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    var cy = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
    card.style.setProperty("--mx", cx * 100 + "%");
    card.style.setProperty("--my", cy * 100 + "%");
    var dx = cx - 0.5,
      dy = cy - 0.5;
    card.style.setProperty(
      "--hyp",
      Math.min(1, Math.sqrt(dx * dx + dy * dy) / 0.5),
    );
    state.targetX = dx * 2 * maxTilt;
    state.targetY = -dy * 2 * maxTilt;
  });

  card.addEventListener("mouseleave", function () {
    state.targetX = 0;
    state.targetY = 0;
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "50%");
    card.style.setProperty("--hyp", "0");
  });
}

var CARD_POOL = [
  { url: "https://images.pokemontcg.io/base1/4_hires.png", name: "Charizard" },
  { url: "https://images.pokemontcg.io/base1/58_hires.png", name: "Pikachu" },
  { url: "https://images.pokemontcg.io/base1/2_hires.png", name: "Blastoise" },
  { url: "https://images.pokemontcg.io/base1/55_hires.png", name: "Nidoran" },
  { url: "https://images.pokemontcg.io/base1/69_hires.png", name: "Weedle" },
  { url: "https://images.pokemontcg.io/base1/63_hires.png", name: "Squirtle" },
  { url: "https://images.pokemontcg.io/base1/66_hires.png", name: "Tangela" },
  { url: "https://images.pokemontcg.io/base1/54_hires.png", name: "Metapod" },
  {
    url: "https://images.pokemontcg.io/swsh1/20_hires.png",
    name: "Gossifleur",
  },
  { url: "https://images.pokemontcg.io/swsh1/35_hires.png", name: "Cinderace" },
  { url: "https://images.pokemontcg.io/swsh1/147_hires.png", name: "Cinccino" },
  { url: "https://images.pokemontcg.io/sv1/39_hires.png", name: "Charcadet" },
  { url: "https://images.pokemontcg.io/sv1/79_hires.png", name: "Kilowattrel" },
  { url: "https://images.pokemontcg.io/sv2/100_hires.png", name: "Tinkatink" },
  { url: "https://images.pokemontcg.io/sv1/11_hires.png", name: "Skiddo" },
  { url: "https://images.pokemontcg.io/sv2/115_hires.png", name: "Toxicroak" },
  { url: "https://images.pokemontcg.io/sv3pt5/160_hires.png", name: "Erika" },
  {
    url: "https://images.pokemontcg.io/sv3pt5/154_hires.png",
    name: "Old Amber",
  },
  { url: "https://images.pokemontcg.io/sv3pt5/143_hires.png", name: "Snorlax" },
  { url: "https://images.pokemontcg.io/sv3pt5/133_hires.png", name: "Evoli" },
  { url: "https://images.pokemontcg.io/sv3pt5/93_hires.png", name: "Spectrum" },
  {
    url: "https://images.pokemontcg.io/sv3pt5/181_hires.png",
    name: "Dragonair",
  },
  {
    url: "https://images.pokemontcg.io/swsh1/116_hires.png",
    name: "Stonjourner VMAX",
  },
];

window.addEventListener("load", function () {
  //Tabs
  var tabs = document.querySelectorAll(".tab-btn");
  var contents = document.querySelectorAll(".tab-content");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      contents.forEach(function (c) {
        c.classList.remove("active");
      });
      document.getElementById(tab.dataset.tab).classList.add("active");

      if (tab.dataset.tab === "cards") {
        document.querySelectorAll("#cards .card").forEach(function (card, i) {
          setTimeout(function () {
            card.classList.add("show");
          }, i * 100);
        });
      }
    });
  });

  // Swiper
  try {
    new Swiper(".mySwiper", {
      loop: true,
      autoplay: { delay: 2500 },
      pagination: { el: ".swiper-pagination", clickable: true },
    });
  } catch (e) {
    console.warn("Swiper:", e);
  }

  // GLightBox
  try {
    GLightbox({ selector: ".glightbox", touchNavigation: true, loop: true });
  } catch (e) {
    console.warn("GLightbox:", e);
  }

  document.querySelectorAll(".card").forEach(applyTilt);

  // Formulaire
  var formEl = document.querySelector("form");
  if (formEl) {
    formEl.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = document.querySelector("#email");
      var password = document.querySelector("#password");
      var passCheck = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      var valid = true;

      if (!email.value) {
        email.classList.add("error");
        email.classList.remove("success");
        valid = false;
      } else {
        email.classList.add("success");
        email.classList.remove("error");
      }

      if (!passCheck.test(password.value)) {
        password.classList.add("error");
        password.classList.remove("success");
        valid = false;
      } else {
        password.classList.add("success");
        password.classList.remove("error");
      }

      var successMsg = document.querySelector(".success-message");
      var errorMsg = document.querySelector(".error-message");
      if (successMsg) successMsg.style.display = valid ? "block" : "none";
      if (errorMsg) errorMsg.style.display = valid ? "none" : "block";
    });
  }

  // Pokédex
  var pokeBtn = document.getElementById("getPokemon");
  if (pokeBtn) {
    pokeBtn.addEventListener("click", function () {
      var name = document.getElementById("pokeName").value.trim() || "pikachu";
      fetch("src/pokeApi.php?name=" + encodeURIComponent(name))
        .then(function (r) {
          if (!r.ok) throw new Error();
          return r.json();
        })
        .then(function (data) {
          document.getElementById("pokeResult").innerHTML =
            "<p><strong>Nom :</strong> " +
            data.name +
            "</p>" +
            "<p><strong>Type :</strong> " +
            data.types[0].type.name +
            "</p>" +
            "<p><strong>HP :</strong> " +
            data.stats[0].base_stat +
            "</p>" +
            "<img src='" +
            data.sprites.front_default +
            "' alt='" +
            data.name +
            "'/>";
        })
        .catch(function () {
          document.getElementById("pokeResult").innerText =
            "Pokemon introuvable.";
        });
    });
  }

  // Booster
  var overlay = document.getElementById("booster-overlay");
  var openBtn = document.getElementById("openBooster");
  var closeBtn = document.getElementById("closeBooster");
  var boosterGrid = document.getElementById("booster-cards");

  function openBooster() {
    var pool = CARD_POOL.slice().sort(function () {
      return Math.random() - 0.5;
    });
    var picked = pool.slice(0, 5);
    boosterGrid.innerHTML = "";

    picked.forEach(function (c, i) {
      var el = document.createElement("div");
      el.className = "card";
      el.innerHTML =
        "<div class='card-inner'><div class='card-front'><img src='" +
        c.url +
        "' alt='" +
        c.name +
        "'/></div></div>";
      boosterGrid.appendChild(el);
      applyTilt(el);
      setTimeout(function () {
        el.classList.add("show");
      }, i * 150);
    });

    overlay.classList.remove("hidden");
  }

  function closeBooster() {
    overlay.classList.add("hidden");
  }

  if (openBtn) openBtn.addEventListener("click", openBooster);
  if (closeBtn) closeBtn.addEventListener("click", closeBooster);
  if (overlay)
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeBooster();
    });
});

// Tabs
const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    contents.forEach((c) => c.classList.remove("active"));

    const target = document.getElementById(tab.dataset.tab);
    target.classList.add("active");

    if (tab.dataset.tab === "cards") {
      document.querySelectorAll("#cards .card").forEach((card, index) => {
        setTimeout(() => {
          card.classList.add("show");
        }, index * 100);
      });
    }
  });
});

// SWIPER
const swiper = new Swiper(".mySwiper", {
  loop: true,
  autoplay: { delay: 2500 },
  pagination: { el: ".swiper-pagination", clickable: true },
});

// GLightBox
const lightbox = GLightbox({
  selector: ".glightbox",
  touchNavigation: true,
  loop: true,
  autoplayVideos: false,
});

// Cards
document.querySelectorAll(".card").forEach((card) => {
  const state = {
    tiltX: 0,
    tiltY: 0,
    targetX: 0,
    targetY: 0,
  };

  const friction = 1 / 15;
  const maxTilt = 10;

  function animate() {
    state.tiltX += (state.targetX - state.tiltX) * friction;
    state.tiltY += (state.targetY - state.tiltY) * friction;

    const inner = card.querySelector(".card-inner");
    inner.style.transform = `
            rotateY(${state.tiltX}deg)
            rotateX(${state.tiltY}deg)
        `;

    requestAnimationFrame(animate);
  }
  animate();

  function handleMouseMove(e) {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const cx = Math.max(0, Math.min(1, x));
    const cy = Math.max(0, Math.min(1, y));

    card.style.setProperty("--mx", cx * 100 + "%");
    card.style.setProperty("--my", cy * 100 + "%");

    const dx = cx - 0.5;
    const dy = cy - 0.5;
    const hyp = Math.min(1, Math.sqrt(dx * dx + dy * dy) / 0.5);
    card.style.setProperty("--hyp", hyp);

    state.targetX = dx * 2 * maxTilt;
    state.targetY = -dy * 2 * maxTilt;
  }

  function handleMouseLeave() {
    state.targetX = 0;
    state.targetY = 0;

    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "50%");
    card.style.setProperty("--hyp", "0");
  }

  card.addEventListener("mousemove", handleMouseMove);
  card.addEventListener("mouseleave", handleMouseLeave);
});

// Formulaire

let form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // email
  let email = document.querySelector("#email");

  if (email.value == "") {
    console.log("invalide");
  } else {
    email.classList.add("success");
  }

  // password
  let password = document.querySelector("#password");
  let passCheck = new RegExp("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$");
  if (!passCheck.test(password.value)) {
    password.classList.add("error");
    password.classList.remove("success");
  } else {
    password.classList.add("success");
    password.classList.remove("error");
  }
});

// API
document.getElementById("getPokemon").addEventListener("click", () => {
  const name = document.getElementById("pokeName").value || "pikachu";
  const url = `src/pokeApi.php?name=${name}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        console.log(response);
        throw new Error("Erreur réseau ou API");
      }
      return response.json();
    })
    .then((data) => {
      const result = document.getElementById("pokeResult");

      result.innerHTML = `
      <p> Nom : ${data.name}</p>
      <p>Type : ${data.types[0].type.name}</p>
      <p>HP : ${data.stats[0].base_stat}</p>
      <img src="${data.sprites.front_default}"/>
    `;
    })
    .catch((error) => {
      console.log("Erreur : ", error);
      document.getElementById("pokeResult").innerText =
        "Erreur lors de la récup des données";
    });
});
