console.log("JS cargado correctamente");

const input = document.getElementById("searchInput");
const button = document.getElementById("searchBtn");
const results = document.getElementById("results");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

let allShows = [];
let currentPage = 1;
const itemsPerPage = 10;
const maxItems = 30;

// ==========================
// Fetch
// ==========================
const searchShows = async (query) => {
  try {
    const response = await axios.get(
      `https://api.tvmaze.com/search/shows?q=${query}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// ==========================
// Render
// ==========================
const renderShows = () => {
  results.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const showsToRender = allShows.slice(start, end);

  showsToRender.forEach(item => {
    const show = item.show;

    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <h3>${show.name}</h3>
      ${
        show.image
          ? `<img src="${show.image.medium}" alt="${show.name}">`
          : "<p>Sin imagen</p>"
      }
      <p>${show.summary || "Sin descripción"}</p>
    `;

    results.appendChild(card);
  });

  pageInfo.textContent = `Página ${currentPage} de ${Math.ceil(allShows.length / itemsPerPage)}`;

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage * itemsPerPage >= allShows.length;
};

// ==========================
// Search
// ==========================
button.addEventListener("click", async () => {
  const query = input.value.trim();
  if (query.length < 1) return;

  currentPage = 1;

  const data = await searchShows(query);

  // Limitar a 30 resultados
  allShows = data.slice(0, maxItems);

  renderShows();
});

// ==========================
// Pagination
// ==========================
nextBtn.addEventListener("click", () => {
  currentPage++;
  renderShows();
});

prevBtn.addEventListener("click", () => {
  currentPage--;
  renderShows();
});

// ==========================
// Autosearch (Google-like)
// ==========================
let typingTimer;
const delay = 500;

input.addEventListener("input", () => {
  clearTimeout(typingTimer);

  typingTimer = setTimeout(() => {
    if (input.value.trim().length >= 1) {
      button.click();
    }
  }, delay);
});
