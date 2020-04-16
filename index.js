const modal = document.getElementById("myModal");
const form = document.getElementById('searchbar');
const span = document.getElementsByClassName("close")[0];


 form.innerHTML += `

        <form>
            <input type="text" id="input" class="col-12 mt-5 mb-3 form-control" placeholder="type your value here..."></input>
            <button type="submit" id="submit_formulaire" class="btn btn-primary btn-lg btn-block mb-5">Submit</button>
        </form>
    `

const inputValue = (e) => {
	const valeur = document.getElementById('input').value;
		if (valeur != ""){
			requestMovies();
		}
		else{
			console.log("pas de valeur")
		}
	e.preventDefault();
}

document.getElementById('submit_formulaire').addEventListener("click", inputValue);