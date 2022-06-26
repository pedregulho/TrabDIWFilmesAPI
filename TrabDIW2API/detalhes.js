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
    .then(data => {
      setMovie(data);
    })
    .catch(err => {
      throw new Error(err);
    })
} catch(err) {
  console.log('Error');
  console.log(err);
}

function getMovies() {
  return new Promise((resolve, reject) => {
    fetch(`https://api.themoviedb.org/3/movie/${urlParams.id}?language=pt-BR&api_key=${API_ACCESS_TOKEN}`)
      .then(res => res.json())
      .then(res => {
        const movie = createMovieObject(res);
        resolve(movie)
      })
      .catch(err => {
        console.log(err)
        reject();
      });
  })
}

function createMovieObject(rawData) {
  const movie = {
    id: rawData.id,
    title: rawData.title,
    overview: rawData.overview,
    genreIds: rawData.genres.map(el => el.id),
    genreNames: rawData.genres.map(el => el.name),
    releaseDate: rawData.release_date,
    posterPath: rawData.poster_path,
    voteAverage: rawData.vote_average
  }

  return movie;
}

function setMovie(movieObject) {
  const filmesContainer = document.querySelector('#filmes');

  const movieHtml =
    `<div class="card">
      <img src="http://image.tmdb.org/t/p//w780/${movieObject.posterPath}" class="card-img-top" alt="...">
      <div class="card-body d-flex flex-column justify-content-between">
        <h5 class="card-title">${movieObject.title}</h5>
        <p>
          <strong>Avaliação</strong>: ${movieObject.voteAverage}
          <br />
          <strong>Estreia</strong>: ${movieObject.releaseDate}
        </p>
        <p>
          <strong>Gêneros</strong>: ${movieObject.genreNames.map(el => {
            return `<span style="background: gold; border-radius: 4px; padding: 0.15em 0.5em;">${el}</span>`
          }).join(' ')}
        </p>
        <p>
          <strong>Sinopse</strong>: ${movieObject.overview}
        </p>
      </div>
    </div>`;

  filmesContainer.innerHTML += movieHtml;
}