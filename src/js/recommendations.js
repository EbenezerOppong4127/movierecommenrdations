import { fetchPopularMovies, fetchGenres } from './movie.mjs';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch genres and create buttons
    const genres = await fetchGenres();
    console.log('Fetched Genres:', genres);

    const genreContainer = document.querySelector('.tr-movie-menu-active');
    genreContainer.innerHTML = ''; // Clear any existing content

    // Create "All" button
    const allButton = document.createElement('button');
    allButton.classList.add('active');
    allButton.dataset.filter = '*';
    allButton.textContent = 'All';
    genreContainer.appendChild(allButton);

    // Create genre buttons
    genres.forEach(genre => {
      const genreButton = document.createElement('button');
      genreButton.dataset.filter = `cat-${genre.id}`;
      genreButton.textContent = genre.name;
      genreContainer.appendChild(genreButton);
    });

    // Fetch and display popular movies
    const movieData = await fetchPopularMovies(1);
    console.log('Fetched Movies:', movieData);

    const movieContainer = document.querySelector('.tr-movie-active');
    movieContainer.innerHTML = ''; // Clear existing content

    // Render movies and assign genre classes
    movieData.results.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.classList.add('col-xl-3', 'col-lg-4', 'col-sm-6', 'grid-item', 'grid-sizer');

      // Add genre-based classes (e.g., "cat-12" for Adventure)
      movie.genre_ids.forEach(genreId => {
        movieElement.classList.add(`cat-${genreId}`);
      });

      // Movie item with modal trigger
      movieElement.innerHTML = `
        <div class="movie-item mb-60">
          <div class="movie-poster">
            <a href="#" class="movie-details-trigger" data-movie-id="${movie.id}"><img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"></a>
          </div>
          <div class="movie-content">
            <div class="top">
              <h5 class="title"><a href="#" class="movie-details-trigger" data-movie-id="${movie.id}">${movie.title}</a></h5>
              <span class="date">${new Date(movie.release_date).getFullYear()}</span>
            </div>
            <div class="bottom">
              <ul>
                <li><span class="quality">HD</span></li>
                <li>
                  <span class="duration"><i class="far fa-clock"></i> ${movie.runtime || '120'} min</span>
                  <span class="rating"><i class="fas fa-thumbs-up"></i> ${movie.vote_average}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      `;

      movieContainer.appendChild(movieElement);
    });

    // Modal structure
    document.body.insertAdjacentHTML('beforeend', `
  <div class="modal" id="movie-modal" style="
    display: none;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
    overflow: auto;
  ">
    <div class="modal-content" style="
      background-color: #fff;
      border-radius: 8px;
      padding: 20px;
      max-width: 500px;
      width: 90%;
      position: relative;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      animation: fadeIn 0.3s ease-out;
    ">
      <span class="close" style="
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 24px;
        font-weight: bold;
        color: #333;
        cursor: pointer;
        transition: color 0.2s;
      ">&times;</span>
      <div class="modal-body">
        <h3 id="modal-title" style="
          margin-top: 0;
          font-size: 1.6em;
          color: #333;
        "></h3>
        <p id="modal-overview" style="
          font-size: 1em;
          color: #555;
          line-height: 1.6;
        "></p>
        <p style="font-size: 1em; color: #555; line-height: 1.6;">
          <strong style="color: #333;">Release Date:</strong> 
          <span id="modal-release-date"></span>
        </p>
        <p style="font-size: 1em; color: #555; line-height: 1.6;">
          <strong style="color: #333;">Genres:</strong> 
          <span id="modal-genres"></span>
        </p>
        <img id="modal-poster" src="" alt="Movie Poster" style="
          display: block;
          width: 100%;
          max-width: 300px;
          margin: 20px auto 0;
          border-radius: 8px;
        " />
      </div>
    </div>
  </div>
  <style>
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
    .close:hover {
      color: #888;
    }
  </style>
`);


    // Function to show the modal with movie details
    const showModal = async (movieId) => {
      const movie = movieData.results.find(m => m.id === parseInt(movieId));
      if (!movie) return;

      document.getElementById('modal-title').textContent = movie.title;
      document.getElementById('modal-overview').textContent = movie.overview;
      document.getElementById('modal-release-date').textContent = movie.release_date;
      document.getElementById('modal-poster').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      document.getElementById('modal-genres').textContent = movie.genre_ids.map(id => genres.find(g => g.id === id)?.name).join(', ');

      document.getElementById('movie-modal').style.display = 'flex';
    };

    // Add click event listener to open the modal
    document.querySelectorAll('.movie-details-trigger').forEach(trigger => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        const movieId = event.target.closest('.movie-details-trigger').dataset.movieId;
        showModal(movieId);
      });
    });

    // Modal close logic
    document.querySelector('.close').onclick = function () {
      document.getElementById('movie-modal').style.display = 'none';
    };

    window.onclick = function (event) {
      const modal = document.getElementById('movie-modal');
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };

    // Filtering logic for genres
    genreContainer.addEventListener('click', (event) => {
      const filter = event.target.dataset.filter;
      const movieItems = document.querySelectorAll('.grid-item');

      movieItems.forEach(item => {
        if (filter === '*' || item.classList.contains(filter)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

      console.log(`Filter applied: ${filter}`);
    });

  } catch (error) {
    console.error("Error loading data:", error);
  }
  // Add an event listener to close the modal when the close button is clicked
});

