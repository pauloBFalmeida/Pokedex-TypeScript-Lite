import { PokemonApiResponse, PokemonResumo } from "../models/Pokemon";

const URL_BASE = "https://pokeapi.co/api/v2/pokemon";

// Busca na PokeAPI
export async function buscarPokemon(nomeOuId: string): Promise<PokemonResumo | null> {
  try {
    const resposta = await fetch(`${URL_BASE}/${nomeOuId.trim().toLowerCase()}`);

    // 404 Pokémon inexistente
    if (!resposta.ok) {
      console.log(`[ERRO] Pokémon não encontrado: ${nomeOuId}`);
      return null;
    }

    const dados = (await resposta.json()) as PokemonApiResponse;

    return {
      id: dados.id,
      nome: dados.name,
      tipos: dados.types.map((item) => item.type.name),
      altura: dados.height,
      peso: dados.weight,
    };
  } catch {
    // Outras falhas
    console.log("[ERRO] Não foi possível buscar o Pokémon.");
    return null;
  }
}
