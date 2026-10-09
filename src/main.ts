import { buscarPokemon } from "./services/pokeApi";

console.log("Hello, World!");

async function main(): Promise<void> {
    let nomeOuId = "pikachu";

    const pokemon = await buscarPokemon(nomeOuId);

    if (pokemon !== null) {
        console.log(pokemon);
        console.log(`[OK] Pokémon encontrado: ${pokemon.nome}`);
    }
}

main();