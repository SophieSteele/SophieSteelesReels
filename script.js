// Preloader and Fade-in Effects
window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');
  const fadeElements = document.querySelectorAll('.fade-in');
  if (!sessionStorage.getItem('preloaderShown')) {
    setTimeout(() => {
      preloader.style.opacity = '0';
      fadeElements.forEach(el => {
        el.classList.add('visible');
      });
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }, 3000);
    sessionStorage.setItem('preloaderShown', 'true');
  } else {
    preloader.style.display = 'none';
    fadeElements.forEach(el => {
      el.classList.add('visible');
    });
  }
});

// Search Functionality
document.getElementById('search-input').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const title = post.querySelector('h2').textContent.toLowerCase();
    const content = post.querySelector('p:last-child').textContent.toLowerCase();

    if (title.includes(query) || content.includes(query)) {
      post.style.display = 'block';
    } else {
      post.style.display = 'none';
    }
  });
});

// Carousel navigation functionality
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    let index = 0;
    const totalItems = document.querySelectorAll('.carousel-item').length;

    function updateCarousel() {
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
        index = index > 0 ? index - 1 : totalItems - 1;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        index = index < totalItems - 1 ? index + 1 : 0;
        updateCarousel();
    });

    // Auto-slide every 5 seconds
    setInterval(() => {
        index = index < totalItems - 1 ? index + 1 : 0;
        updateCarousel();
    }, 5000);
});

// Open Modal Functionality
function openModal(post) {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');

  // Clear any previous content in modalContent
  modalContent.innerHTML = '';

  if (post.image) {
    const modalImage = document.createElement('img');
    modalImage.src = post.image;
    modalImage.alt = post.title;
    modalImage.style.maxWidth = '100%';
    modalImage.style.marginTop = '20px';
    modalContent.appendChild(modalImage);
  }

  // Display the modal
  modal.style.display = 'flex';

  // Set the modal title and content
  modalTitle.textContent = post.title;
  modalContent.innerHTML += post.content;
}

// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    let index = 0;
    const totalItems = document.querySelectorAll('.carousel-item').length;

    function updateCarousel() {
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
        index = index > 0 ? index - 1 : totalItems - 1;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        index = index < totalItems - 1 ? index + 1 : 0;
        updateCarousel();
    });

    // Auto-slide every 5 seconds
    setInterval(() => {
        index = index < totalItems - 1 ? index + 1 : 0;
        updateCarousel();
    }, 5000);
});


// Close Modal when clicking on the close button or outside the modal
document.querySelector('.close-button').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'none';
});

window.addEventListener('click', (e) => {
  const modal = document.getElementById('modal');
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Load posts when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadPosts);
