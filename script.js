var data = [];

for (let i = 1; i <= 898; i++) {
    // var data_name = [];
    const url ='https://pokeapi.co/api/v2/pokemon/' + i; 
    
    fetch(url)
    .then(function(response){
        
        return response.json();
    })

    .then(result => {

        data.push(result); // On envoie les reponses dans un tableau pour pouvoir le trier
        data.sort((a,b) => a.id - b.id); // On trie le tableau par rapport aux id par défaut

        if(i === 898){ // Triple ou double égale pour vérifier que tous les éléments sont dans le tableau
            data.forEach(element =>{
                if(!element.types[1]){
                    pokeFunction(element.name, element.sprites.front_default, element.types[0].type.name, element.height, element.weight, "");
                }
                else{
                    pokeFunction(element.name, element.sprites.front_default, element.types[0].type.name, element.height, element.weight, "-" + element.types[1].type.name); // Pour chaque élément, lancer la fonction pokeFunction
                }
                document.getElementById("loading").style.display = "none";
            })
        }
    })
}
// A Optimiser : 
function pokeFunction(pokeName, pokeImg, pokeType, pokeHeight, pokeWeight, pokeType2) {
    
    var link = document.createElement("a");
    link.setAttribute('href', 'https://www.pokemon.com/us/pokedex/' + pokeName);
    link.setAttribute('target', '_blank')
    document.getElementById("poke_list").appendChild(link);

    var div = document.createElement("div");
    div.setAttribute('class', 'pokemon');
    link.appendChild(div)

    var name = document.createElement("li");
    name.setAttribute('class', 'pokemon_name');
    div.appendChild(name);

    var textName = document.createTextNode(pokeName);
    name.appendChild(textName);

    var img = document.createElement("img");
    img.setAttribute('src', pokeImg);
    div.appendChild(img);

    var type = document.createElement("p");
    type.setAttribute('class', 'pokemon_type');
    div.appendChild(type);

    var textType = document.createTextNode(pokeType);
    type.appendChild(textType);

    var type2 = document.createElement("p");
    type2.setAttribute('class', 'pokemon_type2');
    div.appendChild(type2);

    var textType2 = document.createTextNode(pokeType2);
    type2.appendChild(textType2);

    var div_height = document.createElement("div");
    div_height.setAttribute('class', 'height_container');
    div.appendChild(div_height);

    var height = document.createElement("p");
    height.setAttribute('class', 'height')
    div_height.appendChild(height);

    var textHeight = document.createTextNode(pokeHeight + " dm ");
    height.appendChild(textHeight);

    var weight = document.createElement("p");
    weight.setAttribute('class', 'weight')
    div_height.appendChild(weight);

    var textWeight = document.createTextNode( pokeWeight + " hg");
    weight.appendChild(textWeight);
    
    const color_type = colors[pokeType]; // lie la couleur (const colors) avec le type du pokémon
    div.style.backgroundColor = color_type; // Affiche la couleur correspondante en background
}



// Search bar Pokemon
function search_pokemon() {
	let input = document.getElementById('searchbar').value;
    input = input.toLowerCase();
    let w = document.getElementsByClassName('pokemon_type');
	let x = document.getElementsByClassName('pokemon_name');
    let y = document.getElementsByClassName('pokemon');
	
	for (i = 0; i < x.length; i++) { // Pour chaque Pokemon :
		if (!x[i].innerHTML.toLowerCase().includes(input)){ // Si le pokémon ne correpond pas avec les lettres présentes dans l'input

            if(!w[i].innerHTML.toLowerCase().includes(input)) { // Si le type ne correspond pas avec les lettres présentes dans l'input
                y[i].style.display="none"; // Ne pas afficher la div du pokémon 
            }
            if(!w[i].innerHTML.toLowerCase().includes(input)) { // Si le type ne correspond pas avec les lettres présentes dans l'input
                y[i].style.display="none"; // Ne pas afficher la div du pokémon 
            }
		}
		else {
			y[i].style.display="flex";	// Sinon, afficher la div (obligatoire sinon ne réapparait pas)
		}
	}
}
function Sort(button, sortFunction){
document.getElementById(button).addEventListener('click', () =>{
    data.sort(sortFunction);
    document.getElementById("poke_list").innerHTML = "";
    data.forEach(element =>{
        if(!element.types[1]){
            pokeFunction(element.name, element.sprites.front_default, element.types[0].type.name, element.height, element.weight, "");
        }
        else{
            pokeFunction(element.name, element.sprites.front_default, element.types[0].type.name, element.height, element.weight, "-" + element.types[1].type.name);
        }
    })
})
}

Sort('button_type', sortByType);
Sort('button_id', sortById);
Sort('button_name', sortByName);
Sort('button_height', sortByHeight);
Sort('button_weight', sortByWeight);


    function sortByType(x, y){
        if (x.types[0].type.name < y.types[0].type.name) {return -1;}
        if (x.types[0].type.name > y.types[0].type.name) {return 1;}
        return 0;
    }
    
    function sortById(x, y){
        if (x.id < y.id) {return -1;}
        if (x.id > y.id) {return 1;}
        return 0;
    }
    function sortByName(x, y){
        if (x.name < y.name) {return -1;}
        if (x.name > y.name) {return 1;}
        return 0;
    }

    function sortByHeight(x, y){
        if (x.height < y.height) {return -1;}
        if (x.height > y.height) {return 1;}
        return 0;
    }
    
    function sortByWeight(x, y){
        if (x.weight < y.weight) {return -1;}
        if (x.weight > y.weight) {return 1;}
        return 0;
    }

    const colors = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    };
