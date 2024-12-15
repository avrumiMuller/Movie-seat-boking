const container = document.querySelector(".container");
const movie = document.getElementById("movie");
const numSeats = document.getElementById("count");
const price = document.getElementById("price");
const button = document.getElementById("btn");

class App {
  constructor() {
    this.currentMovie;
    this.selected;
    this.seats = container.querySelectorAll(".seat");
    this.populateUI();
    movie.addEventListener("change", this.handleCangeMovieEvents.bind(this));
    container.addEventListener("click", this.handleSeatSelectEvents.bind(this));
    button.addEventListener("click", this.handleButtonClickEvents.bind(this));
  }

  storeSeatsIndex(type) {
    const selectedSeats = container.querySelectorAll(`.${type}`);
    this.seats = container.querySelectorAll(".seat");
    const seatsIndex = [...selectedSeats].map((seat) =>
      [...this.seats].indexOf(seat)
    );
    localStorage.setItem(
      `${type}Index${movie.selectedIndex}`,
      JSON.stringify(seatsIndex)
    );
  }

  updateSeatsBasedMovie(type) {
    const seatsIndex = JSON.parse(
      localStorage.getItem(`${type}Index${movie.selectedIndex}`)
    );

    if (seatsIndex && seatsIndex.length > 0) {
      seatsIndex.forEach((key) => {
        [...this.seats][key].classList.add(type);
      });
    }
  }

  setNumSeatsAndTotalprice() {
    this.selected = container.querySelectorAll(".selected");

    // Seats
    numSeats.innerText = this.selected.length;
    // price
    price.innerText = movie.value * this.selected.length;
  }

  populateUI() {
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

    if (selectedMovieIndex) {
      movie.selectedIndex = selectedMovieIndex;
    }
    this.currentMovie = movie.value;

    this.updateSeatsBasedMovie("selected");
    this.updateSeatsBasedMovie("occupied");

    this.setNumSeatsAndTotalprice();
  }

  handleCangeMovieEvents() {
    localStorage.setItem("selectedMovieIndex", movie.selectedIndex);
    this.currentMovie = movie.value;
    [...this.seats].forEach((seat) => (seat.classList = "seat"));

    this.updateSeatsBasedMovie("selected");

    this.updateSeatsBasedMovie("occupied");

    // Set the number seats selected and total price
    this.setNumSeatsAndTotalprice();
  }

  handleSeatSelectEvents(e) {
    const target = e.target;
    if (
      !target.classList.contains("seat") ||
      target.classList.contains("occupied")
    )
      return;

    // Set to selected
    e.target.classList.toggle("selected");

    //Store selected seats in local storage
    this.storeSeatsIndex("selected");

    // Set the number seats selected and total price
    this.setNumSeatsAndTotalprice();
  }

  handleButtonClickEvents(e) {
    this.selected = container.querySelectorAll(".selected");
    if (this.selected.length < 1) return;

    console.log(111);
    this.selected.forEach((seat) => {
      seat.classList.remove("selected");
      seat.classList.add("occupied");
      price.innerText = "0";
      numSeats.innerText = "0";
    });

    //Store occupied seats in local storage
    this.storeSeatsIndex("occupied");
    // Clean select from local storage
    localStorage.removeItem(`selectedIndex${movie.selectedIndex}`);
  }
}
new App();
// localStorage.clear();
