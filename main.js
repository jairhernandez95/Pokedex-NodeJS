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
    pokemonToSearch = pokemonToSearch.toLowerCase();
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
    let config = {
        method : "GET",
        url : `https://pokeapi.co/api/v2/pokemon/${element.textContent}`,
        headers : { }
    }
    axios(config).then(
        function(response)
        {
            let pokemon = response.data;
            let pokemonAbilities = null;
            let pokemonMoves = null;
            let pokemonTypes = null;
            for (let i = 0; i < pokemon.abilities.length; i++)
            {
                pokemonAbilities += pokemon.abilities[i].ability.name;
                pokemonAbilities += ", ";
            }
            for(let j = 0; j < pokemon.moves.length; j++)
            {
                pokemonMoves += pokemon.moves[j].move.name;
                pokemonMoves += ", ";
            }
            for(let k = 0; k < pokemon.types.length; k++)
            {
                pokemonTypes += pokemon.types[k].type.name;
                pokemonTypes += ", ";
            }
            pokemonAbilities = pokemonAbilities.slice(4);
            pokemonAbilities = pokemonAbilities.slice(0, pokemonAbilities.length-2);
            pokemonMoves = pokemonMoves.slice(4);
            pokemonMoves = pokemonMoves.slice(0, pokemonMoves.length-2);
            pokemonTypes = pokemonTypes.slice(4);
            pokemonTypes = pokemonTypes.slice(0, pokemonTypes.length-2);
            Swal.fire({
                title: `More about ${pokemon.name}`,
                text: `Types: ${pokemonTypes}. Abilities: ${pokemonAbilities}. Moves: ${pokemonMoves}`,
                imageUrl: `${pokemon.sprites.front_default}`,
                imageWidth: 300,
                imageAlt: 'Custom image',
            })
        }).catch(
            Swal.fire({
                title: `Loading...`,
                showCancelButton: false,
                showConfirmButton: false
                // Swal.fire({
                //     icon: "error",
                //     title: `Error`,
                //     text: `We dont have enough information about this pokemon, we need to Ash to keep us updated, if you see him please tell him 😡`,
                // })
        }))
}

getData();