"use client";

import { PokemonCard } from "@/registry/new-york/blocks/example-complex/components/pokemon-card";
import "./page.css";
import { useEffect, useState } from "react";
import { getPokemonList } from "@/registry/new-york/blocks/example-complex/lib/pokemon";

export default function ExampleComplex() {
  const [pokemonNames, setPokemonNames] = useState<string[]>([]);

  useEffect(() => {
    async function fetchPokemonNames() {
      const pokemonList = await getPokemonList({ limit: 12 });
      if (pokemonList) {
        setPokemonNames(pokemonList.results.map((p) => p.name));
      }
    }
    fetchPokemonNames();
  }, []);

  return (
    <div className="mx-auto w-4xl px-4">
      <div className="grid grid-cols-2 gap-4 py-10 sm:grid-cols-3 md:grid-cols-4">
        {pokemonNames.map((name) => (
          <PokemonCard key={name} name={name} />
        ))}
      </div>
    </div>
  );
}
