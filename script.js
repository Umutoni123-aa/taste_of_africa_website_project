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