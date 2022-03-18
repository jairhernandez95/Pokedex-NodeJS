let dataFromJSON = [];
let dataClean = [];
function getData()
{
    let resultDiv = document.getElementById("resultDiv");
    let allDataDiv = document.getElementById("allDataDiv");
    allDataDiv.innerHTML = ``;
    resultDiv.innerHTML = ``;
    axios("https://pokeapi.co/api/v2/pokemon?limit=1126").then(
        function (response)
        {
            let pokemons = response.data.results;
            for(let i = 0; i < 1126; i++)
            {
                dataFromJSON.push(pokemons.pop());
            }
            dataFromJSON.reverse();
            showAllPokemons(dataFromJSON.reverse());
        }
    );
}
function showPokemonTypes(array)
{
    let categoriesSelect = document.getElementById("categoriesSelect");
    for(let i = 0; i < array.length; i++)
    {
        let option = document.createElement("option");
        let type = array[i];
        option.value = type;
        option.text = type;
        categoriesSelect.appendChild(option);
    }
}
function showAllPokemons(array)
{
    let resultDiv = document.getElementById("resultDiv");
    resultDiv.innerHTML = ``;
    let allDataDiv = document.getElementById("allDataDiv");
    allDataDiv.innerHTML = ``;
    for(let j = 0; j < array.length; j++)
    {
        if(j == 0)
        {
            let individualDataDiv = document.createElement("div");
            individualDataDiv.setAttribute("class", "individualDataDiv");
            individualDataDiv.setAttribute("onclick", "showModalPokemon(this)")
            individualDataDiv.setAttribute("id", `${array[j].name}`);
            // let pokemonImage = document.createElement("div");
            // pokemonImage.innerHTML = `<img src="${array[j].ThumbnailImage}" onerror="this.onerror=null;this.src='errorLoad.png';">`
            let pokemonName = document.createElement("div");
            pokemonName.innerHTML = `<h5 id=${j}>${array[j].name}</h5>`;
            // let pokemonType = document.createElement("div");
            // pokemonType.innerHTML = `<h5>Type: ${array[j].type}</h5>`;
            allDataDiv.insertAdjacentElement("afterbegin",individualDataDiv);
            // individualDataDiv.insertAdjacentElement("afterbegin", pokemonType);
            individualDataDiv.insertAdjacentElement("afterbegin", pokemonName);
            // individualDataDiv.insertAdjacentElement("afterbegin", pokemonImage);
        }
        else if(j > 0)
        {
            if(array[j].name == array[j-1].name)
            {
                continue;
            }
            else
            {
                let individualDataDiv = document.createElement("div");
                individualDataDiv.setAttribute("class", "individualDataDiv");
                individualDataDiv.setAttribute("onclick", "showModalPokemon(this)")
                individualDataDiv.setAttribute("id", `${array[j].name}`);
                // let pokemonImage = document.createElement("div");
                // pokemonImage.innerHTML = `<img src="${array[j].ThumbnailImage}" onerror="this.onerror=null;this.src='errorLoad.png';">`
                let pokemonName = document.createElement("div");
                pokemonName.innerHTML = `<h5 id=${j}>${array[j].name}</h5>`;
                // let pokemonType = document.createElement("div");
                // pokemonType.innerHTML = `<h5>Type: ${array[j].type}</h5>`;
                allDataDiv.insertAdjacentElement("afterbegin",individualDataDiv);
                // individualDataDiv.insertAdjacentElement("afterbegin", pokemonType);
                individualDataDiv.insertAdjacentElement("afterbegin", pokemonName);
                // individualDataDiv.insertAdjacentElement("afterbegin", pokemonImage);
            }
        }
    }
}
function showFilteredData(array)
{
    let resultDiv = document.getElementById("resultDiv");
    let allDataDiv = document.getElementById("allDataDiv");
    allDataDiv.innerHTML = ``;
    resultDiv.innerHTML = ``;
    for(let m = array.length-1; m >= 0; m--)
    {
        let individualDataDiv = document.createElement("div");
        individualDataDiv.setAttribute("class", "individualDataDiv");
        individualDataDiv.setAttribute("onclick", "showModalPokemon(this)")
        individualDataDiv.setAttribute("id", `${array[m].name}`);
        // let pokemonImage = document.createElement("div");
        // pokemonImage.innerHTML = `<img src="${array[m].ThumbnailImage}" onerror="this.onerror=null;this.src='errorLoad.png';">`
        let pokemonName = document.createElement("div");
        pokemonName.innerHTML = `<h5 id=${m}>${array[m].name}</h5>`;
        let pokemonType = document.createElement("div");
        pokemonType.innerHTML = `<h5>Type: ${array[m].type}</h5>`;
        resultDiv.insertAdjacentElement("afterbegin",individualDataDiv);
        // individualDataDiv.insertAdjacentElement("afterbegin", pokemonType);
        individualDataDiv.insertAdjacentElement("afterbegin", pokemonName);
        // individualDataDiv.insertAdjacentElement("afterbegin", pokemonImage);
    }
}
function searchPokemon(array)
{
    let pokemonToSearch = document.getElementById("pokemonToSearch").value;
    let auxiliarArray = [];
    for(let l = 0; l < array.length; l++)
    {
        if(array[l].name.includes(pokemonToSearch))
        {
            auxiliarArray.push(array[l]);
        }
        else
        {
            continue;
        }
    }
    auxiliarArray.reverse();
    showFilteredData(auxiliarArray);
}
function showModalPokemon(element)
{
    let array = [];
    console.log(element.textContent);
    let config = {
        method : "GET",
        url : `https://pokeapi.co/api/v2/pokemon/${element.textContent}`,
        headers : { }
    }
    axios(config).then(
        function (response)
        {
            let pokemon = response.data;
            console.log(pokemon);
            Swal.fire({
                title: `More about ${pokemon.name}`,
                text: `Type: ${pokemon.types[0].type.name}. Abilities: ${pokemon.abilities[0].ability.name}, ${pokemon.abilities[1].ability.name}. Moves: ${pokemon.moves[0].move.name}, ${pokemon.moves[1].move.name}`,
                imageUrl: `${pokemon.sprites.front_default}`,
                imageWidth: 300,
                imageAlt: 'Custom image',
              })
        }
    ).catch( function(error)
        {
            console.log(error); //estaría mejor agregar la parte de error que da la api de pokemon
        }
    );
}
getData();