async function loadMovies(){
    const moviesList= document.getElementById("films");
    const response = await fetch("http://localhost:3000/films");
        const movies= await response.json();
        movies.forEach(movie => {
            const li = document.createElement("li");
            li.classList.add("film", "item");
            li.textContent= movie.title;
            li.addEventListener('click', (e) => {
                loadMovieDetails(movie.id);
            });
            moviesList.appendChild(li);
        });
}
const buyTicketBtn = document.getElementById("buy-ticket-btn");
let ticketsAvailable = 0;


 async function loadMovieDetails(movieId) {
    const movieDetailsElement= document.getElementById("movie-details");
         const response = await fetch(`http://localhost:3000/films/${movieId}`)
        const movie = response.json();

         ticketsAvailable = movie.capacity - movie.tickets_sold;
        const movieDetails= `
        <div class="movie-details">
        <img class="poster" src="${movie.poster}" alt="${movie.title}" />
        <h3 class="title">${movie.title}</h3>
        <p class="runtime">Runtime: ${movie.runtime} minutes</p>
        <p class="showtime">Showtime: ${movie.showtime}</p>
        <p class="tickets">Tickets Available: ${ticketsAvailable}</p>
        <p class="description">Description: ${movie.description}</p>
        <button id="buy-ticket-btn">Buy Ticket</button>
        </div>
        `;
        movieDetailsElement.innerHTML = movieDetails;

        buyTicketBtn.addEventListener('click',async (e) => {
            if (ticketsAvailable > 0) {
                const response = await fetch (`http://localhost:3000/films/${movieId}`, {
                    method: "PUT",
                    headers:{"Content-Type": "application/json" },
                    body: JSON.stringify({ tickets_sold: movie.tickets_sold + 1}),
                });
                const updatedMovie = await response.json();
                ticketsAvailable = updatedMovie.capacity - updatedMovie.tickets_sold;
                ticketsAvailable = updatedTicketsAvailable;
                document.querySelector('.tickets').textContent = `Tickets Available: ${ticketsAvailable}`;
                } else {
                    alert("Sold Out!");
                }
            });
        }
        
        document.addEventListener('DOMContentLoaded', () => {
            loadMovies();
        });
            

    