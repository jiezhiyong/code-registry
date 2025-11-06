"use client";

import { PokemonImage } from "@/registry/blocks/example-complex/components/pokemon-image";
import { getPokemon } from "@/registry/blocks/example-complex/lib/pokemon";
import { Card, CardContent } from "@/registry/ui/card";
import { useEffect, useState } from "react";

interface Pokemon {
  name: string;
  id: number;
}

export function PokemonCard({ name }: { name: string }) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const data = await getPokemon(name);
        setPokemon(data);
      } catch (error) {
        console.error("Failed to fetch pokemon:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [name]);

  if (loading) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center p-2">
          <div className="animate-pulse bg-gray-200 w-20 h-20 rounded"></div>
          <div className="animate-pulse bg-gray-200 w-16 h-4 rounded mt-2"></div>
        </CardContent>
      </Card>
    );
  }

  if (!pokemon) {
    return null;
  }

  return (
    <Card>
      <CardContent className="flex flex-col items-center p-2">
        <div>
          <PokemonImage name={pokemon.name} number={pokemon.id} />
        </div>
        <div className="text-center font-medium">{pokemon.name}</div>
      </CardContent>
    </Card>
  );
}
