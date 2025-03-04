
const apiKey = "b742e76d";
const fetchmovie = async (title) => {
  console.log(title);
  const resp = await fetch(
    `https://www.omdbapi.com/?s=${title}&apikey=${apiKey} `
  );
  const data = await resp.json();
  console.log(data);
  return data;
};

const searchbttitle = async () => {
  const title = document.querySelector("#moviesearch").value.trim();
  if (!title) {
    alert("Please enter a movie title");
    return;
  }
  displayMovies(await fetchmovie(title));
};

function displayMovies(data) {
  console.log(data);
  const movieResult = document.querySelector("#movieResult");
  movieResult.innerHTML = "";
  movieResult.style.display = "flex"; 
  movieResult.style.flexWrap = "wrap"; 
  movieResult.style.justifyContent = "center"; 
  movieResult.style.gap = "10px"; 

  if (data.Response === "False") {
    movieResult.innerHTML = `<div class='alert alert-danger'>No movies Found 😞 </div>`;
    return;
  }

  data.Search.forEach((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie-card");
    movieDiv.innerHTML = `
      <div class='card'>
         <img src='${movie.Poster}' alt='${movie.Title}' style="width: 100%; height: auto;">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
      </div>
    `;
    movieResult.appendChild(movieDiv);
  });
}
