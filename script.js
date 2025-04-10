// Menu Mobile com ícone único - VERSÃO CORRIGIDA
document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  let touchStartX = 0;
  let touchEndX = 0;

  // Criar overlay para fechamento por toque
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  document.body.appendChild(overlay);

  // Função para alternar o ícone
  function toggleIcon() {
    const icon = mobileMenuBtn.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  }

  // Abrir/fechar menu
  function toggleMenu() {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    overlay.classList.toggle('active');
    toggleIcon(); // Alternar o ícone

    // Prevenir scroll do body quando menu está aberto
    if (navLinks.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  // Event listener para botão mobile
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMenu);
  }

  // Fechar menu ao clicar em um link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // Fechar menu ao clicar no overlay
  overlay.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      toggleMenu();
    }
  });

  // Detectar gestos de arrasto para fechar o menu
  if (navLinks) {
    // Evento de toque inicial
    navLinks.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    // Evento de toque final
    navLinks.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    // Verificar direção do arrasto
    function handleSwipe() {
      // Se arrastou da direita para a esquerda (>50px)
      if (touchStartX - touchEndX > 50) {
        if (navLinks.classList.contains('active')) {
          toggleMenu();
        }
      }
    }
  }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Testimonials Slider
document.addEventListener('DOMContentLoaded', function () {
  const testimonialsTrack = document.querySelector('.testimonials-track');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentSlide = 0;

  if (testimonialsTrack && testimonialCards.length > 0) {
    // Configurar a largura do track como número de slides * 100%
    testimonialsTrack.style.width = `${testimonialCards.length * 100}%`;

    // Configurar cada card para ter a largura apropriada
    testimonialCards.forEach(card => {
      card.style.width = `${100 / testimonialCards.length}%`;
    });

    // Função para atualizar a posição do slider
    function updateSlidePosition() {
      testimonialsTrack.style.transform = `translateX(-${currentSlide * (100 / testimonialCards.length)}%)`;
    }

    // Próximo slide
    function goToNextSlide() {
      if (currentSlide >= testimonialCards.length - 1) {
        currentSlide = 0;
      } else {
        currentSlide++;
      }
      testimonialsTrack.style.transition = 'transform 0.5s ease';
      updateSlidePosition();
    }

    // Slide anterior
    function goToPrevSlide() {
      if (currentSlide <= 0) {
        currentSlide = testimonialCards.length - 1;
      } else {
        currentSlide--;
      }
      testimonialsTrack.style.transition = 'transform 0.5s ease';
      updateSlidePosition();
    }

    // Event listeners para botões
    nextBtn.addEventListener('click', goToNextSlide);
    prevBtn.addEventListener('click', goToPrevSlide);

    // Auto slide a cada 5 segundos
    let slideInterval = setInterval(goToNextSlide, 5000);

    // Pausar autoplay ao passar o mouse
    const slider = document.querySelector('.testimonials-slider');
    slider.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });

    slider.addEventListener('mouseleave', () => {
      slideInterval = setInterval(goToNextSlide, 5000);
    });
  }
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  // In a real site, you would send this data to a server
  // For this demo, we'll just show a success message
  alert(`Obrigado ${name}! Sua mensagem foi enviada com sucesso.\nEntraremos em contato em breve!`);

  // Reset form
  contactForm.reset();
});

// Highlight active nav link based on scroll position
function highlightNavLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= (sectionTop - 100)) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// Add scroll event listener
window.addEventListener('scroll', highlightNavLink);

// Add active class style
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active::after {
      width: 100%;
            }
    `;
document.head.appendChild(style);

// Run on page load
document.addEventListener('DOMContentLoaded', function () {
  highlightNavLink();
});