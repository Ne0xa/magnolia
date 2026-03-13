// Tabs
const tabs = document.querySelectorAll('.tab-btn')
const contents = document.querySelectorAll('.tab-content')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        contents.forEach(c => c.classList.remove('active'))
        document.getElementById(tab.dataset.tab).classList.add('active')
    })
})

// SWIPER 
const swiper = new Swiper(".mySwiper", {
    loop: true,
    autoplay: { delay: 2500 },
    pagination: { el: ".swiper-pagination", clickable: true }
});

// Cards

document.querySelectorAll('.card').forEach(card => {
    const state = {
        tiltX: 0,
        tiltY: 0,
        targetX: 0,
        targetY: 0
    };

    const friction = 1/15;
    const maxTilt = 10;

    function animate() {
        state.tiltX += (state.targetX - state.tiltX) * friction;
        state.tiltY += (state.targetY - state.tiltY) * friction;

        const inner = card.querySelector('.card-inner');
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

        card.style.setProperty('--mx', (cx * 100) + "%");
        card.style.setProperty('--my', (cy * 100) + "%");

        const dx = cx - 0.5;
        const dy = cy - 0.5;
        const hyp = Math.min(1, Math.sqrt(dx*dx + dy*dy) / 0.5);
        card.style.setProperty('--hyp', hyp);

        state.targetX = dx * 2 * maxTilt;
        state.targetY = -dy * 2 * maxTilt;
    }

    function handleMouseLeave() {
        state.targetX = 0;
        state.targetY = 0;

        card.style.setProperty('--mx', "50%");
        card.style.setProperty('--my', "50%");
        card.style.setProperty('--hyp', "0");
    }

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
});


// Formulaire

let form = document.querySelector('form')
form.addEventListener('submit', function(event) {
    event.preventDefault()

    // email
    let email = document.querySelector('#email')

    if(email.value == '') {
        console.log("invalide")
    }
    else {
        email.classList.add('success')
    }

    // password
    let password = document.querySelector('#password')
    let passCheck = new RegExp(
        "^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$"
    )

    if(password.value.length < 6 || passCheck.test(password.value) == false) {
        console.log("Mot de passe invalide")
        password.classList.remove('success')
        password.classList.add('error')
    }
    else {
        console.log("Mot de passe valide")
        password.classList.remove('error')
        password.classList.add('success')
    }
})