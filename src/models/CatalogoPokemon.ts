import { PokemonResumo } from "./Pokemon";

// Catálogo dos Pokemons capturados
export class CatalogoPokemon {
  private pokemons: PokemonResumo[] = [];

  // adiciona na lista
  adicionar(pokemon: PokemonResumo): void {
    const jaExiste = this.pokemons.some((item) => item.id === pokemon.id);

    if (jaExiste) {
      console.log(`[AVISO] ${pokemon.nome} já está no catálogo.`);
      return;
    }

    this.pokemons.push(pokemon);
    console.log(`[OK] ${pokemon.nome} adicionado ao catálogo.`);
  }

  // imprime cada pokemon presente na lista
  listar(): void {
    if (this.pokemons.length === 0) {
      console.log("[AVISO] Catálogo vazio.");
      return;
    }

    console.log("Catálogo atual:");
    this.pokemons.forEach((pokemon) => {
      console.log(
        `#${pokemon.id} - ${pokemon.nome} | Tipos: ${pokemon.tipos.join(", ")}`
      );
    });
  }

  // remove da lista
  remover(id: number): void {
    const existe = this.pokemons.some((pokemon) => pokemon.id === id);

    if (!existe) {
      console.log("[AVISO] Nenhum Pokémon encontrado com esse ID.");
      return;
    }

    this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== id);
    console.log("[OK] Pokémon removido do catálogo.");
  }

}
