console.log("JS cargado correctamente");


const input = document.getElementById("searchInput");
const button = document.getElementById("searchBtn");
const results = document.getElementById("results");

const searchShows = async (query) => {
  try {
    const response = await axios.get(
      `https://api.tvmaze.com/search/shows?q=${query}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos", error);
    results.innerHTML = "<p>Error al cargar datos</p>";
  }
};

const renderShows = (shows) => {
  results.innerHTML = "";

  shows.forEach(item => {
    const show = item.show;

    const card = document.createElement("article");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${show.name}</h3>
      ${
        show.image
          ? `<img src="${show.image.medium}" alt="${show.name}">`
          : "<p>Sin imagen</p>"
      }
      <p>${show.summary ? show.summary : "Sin descripción"}</p>
    `;

    results.appendChild(card);
  });
};

button.addEventListener("click", async () => {
  const query = input.value.trim();
  if (!query) return;

  const shows = await searchShows(query);
  renderShows(shows);
});

console.log("JS cargado correctamente");
