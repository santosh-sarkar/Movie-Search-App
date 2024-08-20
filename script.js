const API_KEY = 'bd276bad';
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=`;

const displayMovies= (movies)=>{
    console.log(movies);
    
    const movieContainer = document.getElementById('movie-container');
    movieContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'}" alt="Movie Poster" class="movie-poster"  style="width: 150px; height: 150px;">
            <div class="movie-info">
                <h2 class="movie-title">${movie.Title}</h2>
                <p class="movie-year">Year: ${movie.Year}</p>
                <p class="movie-Type">Type:${movie.Type}</p>
            </div>
        `;
        movieContainer.appendChild(movieCard);
    });
    
}

const fetchMovie = async (value)=>{
    try {
        const response = await fetch(`${API_URL}${value}`)
        const data = await response.json()
        if (data.Response === 'True') {
            displayMovies(data.Search);
        } else {
            document.getElementById('movieList').innerHTML = `<p>No movies found</p>`;
        }
    } catch (error) {
        console.error('failed to connect!', error);
    }

}

const searchBtn= document.getElementById('searchButton')
searchBtn.addEventListener('click',()=>{
    const searchInput = document.getElementById('searchInput')

    if (searchInput.value){
       fetchMovie(searchInput.value)
    }
    searchInput.value=""
})
