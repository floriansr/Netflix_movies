const selector = document.getElementById('show_film');
const description_selector = document.getElementById('modal_description');


const requestMovies = () => {

    const valeur = document.getElementById('input').value;
    const URL = `https://www.omdbapi.com/?apikey=${key_api}&s=${valeur}`
 
    fetch(URL)
        .then((response) => response.json())
        .then((response) => {
                            selector.innerHTML = ""
    						const allMovies = response.Search;
                            console.log(allMovies);

                                allMovies.forEach(function(x){
                                    console.log("x")
                                    showMovies(selector, x.Title, x.Year, x.Poster, x.imdbID)
                                })
                            return response;
                            })
        .then((response) => {

                    let observer = new IntersectionObserver(function (cards) {
                        cards.forEach(function (card){
                            if (card.intersectionRatio > 0.5) {
                                card.target.classList.remove('not-visible')
                                console.log('Item visible')
                            }
                        })
                    },{
                        threshold: [0.5]
                    })

                    let items = document.querySelectorAll('.card')
                        items.forEach(function(item){
                            item.classList.add('not-visible')
                            observer.observe(item)
                        })
                    })
    	.catch((error) => console.error(error));
};

const showMovies = (selector, title, date, poster, id) => {

    selector.innerHTML += `

        <div class="card col-lg-5 mt-5 mr-3">
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
    const URL2 = `https://www.omdbapi.com/?apikey=${key_api}&i=${id}`

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