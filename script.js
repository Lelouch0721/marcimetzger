document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       HAMBURGER / MOBILE NAV
    =============================== */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    const header = document.querySelector('.header-content');
    let lastScroll = window.scrollY;

    window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // scrolling DOWN → hide
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('hide');
    } 
    // scrolling UP → show
    else {
        header.classList.remove('hide');
    }

    lastScroll = currentScroll;
});

    hamburger.addEventListener('click', () => {
        navMenu.classList.add('open');
        document.body.classList.add('nav-open');
        header.classList.remove('hide'); // keep header visible
    });

    function closeNav() {
        navMenu.classList.remove('open');
        document.body.classList.remove('nav-open');
    }

    navClose.addEventListener('click', closeNav);

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', closeNav);
    });
    /* ===============================
       GALLERY SETUP
    =============================== */
    const images = [
        "images/gallery1.webp",
        "images/gallery2.webp",
        "images/gallery3.webp",
        "images/gallery4.webp",
        "images/gallery5.webp",
        "images/gallery6.webp",
        "images/gallery7.webp"
    ];

    let currentIndex = 0;

    const mainImage = document.getElementById('main-image');
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const thumbs = document.querySelectorAll('.gallery-thumbs img');

    function showImage(index) {
        currentIndex = (index + images.length) % images.length;
        mainImage.style.opacity = 0;

        setTimeout(() => {
            mainImage.src = images[currentIndex];
            mainImage.style.opacity = 1;
        }, 200);

        thumbs.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === currentIndex);
        });
    }

    window.nextImage = () => showImage(currentIndex + 1);
    window.prevImage = () => showImage(currentIndex - 1);

    /* ===============================
       AUTO SLIDE
    =============================== */
    let autoSlide = setInterval(() => {
        showImage(currentIndex + 1);
    }, 5000);

    mainImage.addEventListener('mouseenter', () => clearInterval(autoSlide));
    mainImage.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            showImage(currentIndex + 1);
        }, 5000);
    });

    /* ===============================
       MODAL
    =============================== */
    window.openModal = () => {
        modal.style.display = 'flex';
        modalImage.src = images[currentIndex];
    };

    window.closeModal = () => {
        modal.style.display = 'none';
    };

    /* ===============================
       MOBILE SWIPE
    =============================== */
    let startX = 0;

    mainImage.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    });

    mainImage.addEventListener('touchend', e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (diff > 50) nextImage();
        if (diff < -50) prevImage();
    });

    /* ===============================
       SMOOTH SCROLL
    =============================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href'))
                ?.scrollIntoView({ behavior: 'smooth' });
        });
    });

});

/* ===============================
   KEYBOARD NAVIGATION
=============================== */
document.addEventListener('keydown', e => {

    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'Escape') closeModal();
});
