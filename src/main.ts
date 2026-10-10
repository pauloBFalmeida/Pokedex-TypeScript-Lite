import { buscarPokemon } from "./services/pokeApi";
import { CatalogoPokemon } from "./models/CatalogoPokemon";

async function buscarAddPokemon(catalogo: CatalogoPokemon, nomeOuId: string): Promise<void> {
  const pokemon = await buscarPokemon(nomeOuId);

  if (pokemon !== null) {
    catalogo.adicionar(pokemon);
    console.log(pokemon);
  }

}

async function main(): Promise<void> {
    const catalogo = new CatalogoPokemon();

    console.log("--- Capturar Pokemons ---");
    // captura pikachu
    await buscarAddPokemon(catalogo, "pikachu");
    // captura charmander
    await buscarAddPokemon(catalogo, "charmander");
    // pikachu duplicado
    await buscarAddPokemon(catalogo, "25");
    // pokemon inexistente
    await buscarAddPokemon(catalogo, "pokemon-inexistente");

    // funcionamento do catalogo
    console.log("--- Catalogo ---");
    catalogo.listar();
    catalogo.remover(25);
    catalogo.listar();
}

main();