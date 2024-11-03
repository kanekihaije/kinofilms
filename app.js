const API_KEY = '19ae7c88579fc407408449238ef627a3'; 
async function searchMovies() {
    const query = document.getElementById('search').value;
    if (!query) {
        alert('Введите название фильма!');
        return;
    }
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=ru-RU`; 

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Ошибка сети');
        }
        const data = await response.json();
        if (data.results.length === 0) {
            alert('Фильмы не найдены!');
            return;
        }
        displayMovies(data.results);
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при получении данных.');
    }
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies');
    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML = 
        `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h2>${movie.title}</h2>
            <p>${movie.overview}</p>
            `
        ; 

        moviesContainer.appendChild(movieElement);
    });
}