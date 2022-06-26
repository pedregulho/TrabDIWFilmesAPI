let popularMovies = [];
const urlParams = Object.fromEntries((new URLSearchParams(window.location.search)).entries());

const movieGenres = {
  12: "Aventura",
  14: "Fantasia",
  16: "Animação",
  18: "Drama",
  27: "Terror",
  28: "Ação",
  35: "Comédia",
  36: "História",
  37: "Faroeste",
  53: "Thriller",
  80: "Crime",
  99: "Documentário",
  878: "Ficção científica",
  9648: "Mistério",
  10402: "Música",
  10749: "Romance",
  10751: "Família",
  10752: "Guerra",
  10770: "Cinema TV",
};

try {
  getMovies()
    .then(res => {
      popularMovies = res;
      setMovies();
    })
    .catch(err => {
      throw new Error('Falha ao carregar página');
    })
} catch(err) {
  console.log('Error');
  console.log(err);
}

function getMovies() {
  return new Promise((resolve, reject) => {
    fetch(`https://api.themoviedb.org/3/search/movie?language=pt-BR&query=${urlParams.find}&sort_by=release_date.desc&api_key=${API_ACCESS_TOKEN}`)
      .then(res => res.json())
      .then(res => {
        const movies = res.results.map(el => {
          return createMovieObject(el);
        })

        resolve(movies)
      })
      .catch(err => {
        reject(err);
      });
  })
}

function createMovieObject(rawData) {
  const movie = {
    id: rawData.id,
    title: rawData.title,
    overview: rawData.overview,
    genreIds: rawData.genre_ids,
    genreNames: rawData.genre_ids.map(el => movieGenres[el]),
    releaseDate: rawData.release_date,
    posterPath: rawData.poster_path,
    voteAverage: rawData.vote_average
  }

  return movie;
}

function setMovies() {
  const filmesContainer = document.querySelector('#filmes');

  popularMovies.forEach(movieObject => {

    const movie =
      `<div class="card" style="width: 18rem;">
        <img src="http://image.tmdb.org/t/p//w780/${movieObject.posterPath}" class="card-img-top" alt="...">
        <div class="card-body d-flex flex-column justify-content-between">
          <h5 class="card-title">${movieObject.title}</h5>
          <p>
            Avaliação: ${movieObject.voteAverage}
            <br />
            Estreia: ${movieObject.releaseDate}
          </p>
          <a href="detalhes.html?id=${movieObject.id}" class="btn btn-primary">Detalhes</a>
        </div>
      </div>`;

      filmesContainer.innerHTML += movie;
  });
}