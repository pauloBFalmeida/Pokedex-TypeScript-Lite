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

    const pokemon = await buscarAddPokemon(catalogo, "pikachu");

    if (pokemon !== null) {
        console.log(pokemon);
    }
}

main();