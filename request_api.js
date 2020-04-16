const selector = document.getElementById('show_film');
const description_selector = document.getElementById('modal_description');


const requestMovies = () => {

    const valeur = document.getElementById('input').value;
    const URL = `http://www.omdbapi.com/?apikey=${key}&s=${valeur}`

    fetch(URL)
        .then((response) => response.json())
        .then((response) => {
         					console.log(response)
         					return response;
         					})
        .then((response) => {
                            selector.innerHTML = ""
    						const allMovies = response.Search;
                            console.log(allMovies);

                                allMovies.forEach(function(x){
                                    console.log("x")
                                    showMovies(selector, x.Title, x.Year, x.Poster, x.imdbID)
                                })

                            })
    	.catch((error) => console.error(error));
};

const showMovies = (selector, title, date, poster, id) => {

    selector.innerHTML += `

        <div class="card col-lg-3 mt-5 mr-3">
            <img class="card-img-top" src="${poster}" alt="Card image cap">
            <div class="card-body">
                <h6>${title}</h6>
                <p class="card-text">${date}</p>
                <button type="button" class="btn btn-styled btn-primary btn-lg btn-block" onclick="requestDescription('${id}')" id="${id}">Read More
                </button>
            </div>
        </div>   
    `
};

requestDescription = (id) => {

    const valeur = document.getElementById('input').value;
    const URL2 = `http://www.omdbapi.com/?apikey=${key}&i=${id}`

    fetch(URL2)
        .then((response) => response.json())
        .then((response) => {
                            console.log(response)
                            return response;
                            })
        .then((response) => {
                            const description = response.Plot;
                            showModal(description_selector, description)
                            })
        .catch((error) => console.error(error));
};

showModal = (description_selector, description) => {

    modal.style.display = "block";

    description_selector.innerHTML = ""

    description_selector.innerHTML += `
    ${description}
    `
};

closeModal = () => {
    modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};