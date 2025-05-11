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

// Load Posts from JSON
async function loadPosts() {
  const container = document.getElementById('posts-container');
  const fileNames = ['posts.json'];

  for (const fileName of fileNames) {
    try {
      const response = await fetch(`data/${fileName}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      if (data && Array.isArray(data.posts)) {
        data.posts.reverse().forEach((post) => {
          const postElement = document.createElement('article');
          postElement.classList.add('post');

          // Truncate the content if it's too long
          const truncatedContent = post.content.length > 200
            ? post.content.substring(0, 200) + '...'
            : post.content;

          // Add the image if it exists
          let postImage = '';
          if (post.image) {
            console.log("loaded Image");
            postImage = `<img src="${post.image}" alt="${post.title}" style="max-width: 100%; height: auto; margin-bottom: 10px;">`;
          }
          // Combine the image, title, date and content into the post HTML
          postElement.innerHTML = `
            ${postImage}
            <h2>${post.title}</h2>
            <p><strong>Posted on:</strong> ${post.date} by Sophie Steele</p>
            <p>${truncatedContent}</p>
          `;

          // Open modal when clicking on a post
          postElement.addEventListener('click', () => openModal(post));
          container.appendChild(postElement);
        });
      } else {
        console.error(`Expected an object with a posts array but got ${typeof data}`);
      }
    } catch (error) {
      console.error(`Failed to load ${fileName}:`, error);
    }
  }
}

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
