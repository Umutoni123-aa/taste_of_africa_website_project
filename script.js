// Recipe filter
const filterButtons = document.querySelectorAll('.filter-btn');
const recipeCards = document.querySelectorAll('.recipe-card');

filterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const selected = button.dataset.filter;

    filterButtons.forEach(function (btn) {
      btn.classList.remove('active');
    });
    button.classList.add('active');

    // Show or hide each recipe card
    recipeCards.forEach(function (card) {
      if (selected === 'all' || card.dataset.region === selected) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

const favButtons = document.querySelectorAll('.fav-btn');

// Get saved favorites, or an empty list if none
function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

function saveFavorites(list) {
  localStorage.setItem('favorites', JSON.stringify(list));
}
const savedFavorites = getFavorites();
favButtons.forEach(function (button) {
  const id = button.closest('.recipe-card').dataset.id;
  if (savedFavorites.includes(id)) {
    button.classList.add('favorited');
  }
});

// When a button is clicked, add or remove the favorite
favButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const id = button.closest('.recipe-card').dataset.id;
    let favorites = getFavorites();

    if (favorites.includes(id)) {
      favorites = favorites.filter(function (item) {
        return item !== id;
      });
      button.classList.remove('favorited');
    } else {
      favorites.push(id);
      button.classList.add('favorited');
    }

    saveFavorites(favorites);
  });
});
// Contact form validation
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  const messageError = document.getElementById('message-error');
  const confirmation = document.getElementById('confirmation');

  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    if (message.length <= 20) {
      messageError.textContent = 'Your message must be more than 20 characters.';
      return;
    }

    messageError.textContent = '';
    contactForm.classList.add('hidden');
    confirmation.textContent = "Thank you, " + name + "! We've received your message.";
    confirmation.classList.remove('hidden');
  });
}
// Dark / light mode
const themeToggle = document.getElementById('theme-toggle');

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', function () {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');

  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
});
// Ingredient scaling
const servingSelects = document.querySelectorAll('.servings');

servingSelects.forEach(function (select) {
  select.addEventListener('change', function () {
    const multiplier = Number(select.value);
    const card = select.closest('.recipe-card');

    card.querySelectorAll('.amount').forEach(function (span) {
      const base = Number(span.dataset.base);
      span.textContent = Math.round(base * multiplier * 100) / 100;
    });
  });
});
// Highlight the current page in the nav
const currentPage = location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('nav ul a').forEach(function (link) {
  const linkPage = link.getAttribute('href');
  if (linkPage === currentPage || (currentPage === 'index' && linkPage === 'index.html')) {
    link.classList.add('active');
  }
});
// Newsletter signup
const newsletterForm = document.getElementById('newsletter-form');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', function (event) {
    event.preventDefault();
    document.getElementById('newsletter-message').textContent =
      'Thanks for subscribing!';
    newsletterForm.reset();
  });
}