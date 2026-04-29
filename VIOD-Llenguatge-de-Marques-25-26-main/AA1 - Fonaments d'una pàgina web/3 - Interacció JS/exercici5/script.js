const UNKNOWN_POKEMON_IMG = "https://media.tenor.com/OPn74TiVetgAAAAe/pokemon-emerald-question-mark.png";

const img = document.getElementById("pokemon-img");
const text = document.getElementById("text");

const imatges = {
    bulbasaur: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    charmander: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    squirtle: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
};

// Per cada botó, 
document.querySelectorAll(".poke-btn").forEach(boto => {
    
    // s'afegeix un esdeveniment de click
    boto.addEventListener("click", () => {
        
        // i s'assigna la imatge segons el seu dataset
        const nom = boto.dataset.pokemon;
        img.src = imatges[nom];
    });
});