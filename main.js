let dataFromJSON = [];
let dataClean = [];
let pokemonTypes = ["none","normal", "fire", "water", "grass", "electric", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dark", "dragon", "steel", "fairy"];
function getData()
{
    let resultDiv = document.getElementById("resultDiv");
    let allDataDiv = document.getElementById("allDataDiv");
    allDataDiv.innerHTML = ``;
    resultDiv.innerHTML = ``;
    fetch("pokeapi.json")
    .then(Response => Response.json())
    .then(dataFile => {
        dataFromJSON.push(dataFile);
        showPokemonTypes(pokemonTypes);
        cleanData(dataFromJSON);
        showAllPokemons(dataClean);
    });
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
function cleanData(array)
{
    for(let j = array[0].length-1; j >= 0; j--)
    {
        if(j == array[0].length-1 && j == 0 || j == 0)
        {
            dataClean.push(array[0][j]);
        }
        else if(j < array[0].length-1)
        {
            if(array[0][j].name == array[0][j-1].name)
            {
                continue
            }
            else
            {
                dataClean.push(array[0][j]);
            }
        }
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
            individualDataDiv.setAttribute("onclick", "showModalPokemon(this, dataClean)")
            individualDataDiv.setAttribute("id", `${array[j].name}`);
            let pokemonImage = document.createElement("div");
            pokemonImage.innerHTML = `<img src="${array[j].ThumbnailImage}" onerror="this.onerror=null;this.src='errorLoad.png';">`
            let pokemonName = document.createElement("div");
            pokemonName.innerHTML = `<h5 id=${j}>${array[j].name}</h5>`;
            let pokemonType = document.createElement("div");
            pokemonType.innerHTML = `<h5>Type: ${array[j].type}</h5>`;
            allDataDiv.insertAdjacentElement("afterbegin",individualDataDiv);
            // individualDataDiv.insertAdjacentElement("afterbegin", pokemonType);
            individualDataDiv.insertAdjacentElement("afterbegin", pokemonName);
            individualDataDiv.insertAdjacentElement("afterbegin", pokemonImage);
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
                individualDataDiv.setAttribute("onclick", "showModalPokemon(this, dataClean)")
                individualDataDiv.setAttribute("id", `${array[j].name}`);
                let pokemonImage = document.createElement("div");
                pokemonImage.innerHTML = `<img src="${array[j].ThumbnailImage}" onerror="this.onerror=null;this.src='errorLoad.png';">`
                let pokemonName = document.createElement("div");
                pokemonName.innerHTML = `<h5 id=${j}>${array[j].name}</h5>`;
                let pokemonType = document.createElement("div");
                pokemonType.innerHTML = `<h5>Type: ${array[j].type}</h5>`;
                allDataDiv.insertAdjacentElement("afterbegin",individualDataDiv);
                // individualDataDiv.insertAdjacentElement("afterbegin", pokemonType);
                individualDataDiv.insertAdjacentElement("afterbegin", pokemonName);
                individualDataDiv.insertAdjacentElement("afterbegin", pokemonImage);
            }
        }
    }
}
function filterByType(array)
{
    let auxiliarArray = [];
    let option = document.getElementById("categoriesSelect").value;
    for(let l = 0; l < array.length; l++)
    {
        if(option == "none")
        {
            dataFromJSON = [];
            dataClean = [];
            pokemonTypes = [];
            getData();
            break;
        }
        else
        {
            if(array[l].type.includes(option))
            {
                auxiliarArray.push(array[l]);
            }
            else
            {
                continue;
            }
        }
    }
    auxiliarArray.reverse();
    showFilteredData(auxiliarArray);
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
        individualDataDiv.setAttribute("onclick", "showModalPokemon(this, dataClean)")
        individualDataDiv.setAttribute("id", `${array[m].name}`);
        let pokemonImage = document.createElement("div");
        pokemonImage.innerHTML = `<img src="${array[m].ThumbnailImage}" onerror="this.onerror=null;this.src='errorLoad.png';">`
        let pokemonName = document.createElement("div");
        pokemonName.innerHTML = `<h5 id=${m}>${array[m].name}</h5>`;
        let pokemonType = document.createElement("div");
        pokemonType.innerHTML = `<h5>Type: ${array[m].type}</h5>`;
        resultDiv.insertAdjacentElement("afterbegin",individualDataDiv);
        // individualDataDiv.insertAdjacentElement("afterbegin", pokemonType);
        individualDataDiv.insertAdjacentElement("afterbegin", pokemonName);
        individualDataDiv.insertAdjacentElement("afterbegin", pokemonImage);
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
function showModalPokemon(element, array)
{
    for(let i = array.length-1; i >= 0; i--)
    {
        if(element.textContent == (array[i].name))
        {
            Swal.fire({
                title: `More about ${array[i].name}`,
                text: `Type: ${array[i].type}. Abilities: ${array[i].abilities}. Weakness: ${array[i].weakness}`,
                imageUrl: `${array[i].ThumbnailImage}`,
                imageWidth: 300,
                imageAlt: 'Custom image',
              })
        }
    }
}
getData();