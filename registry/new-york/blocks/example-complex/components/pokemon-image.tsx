import { usePokemonImage } from "@/registry/new-york/blocks/example-complex/hooks/use-pokemon";

export function PokemonImage({
  name,
  number,
}: {
  name: string;
  number: number;
}) {
  const imageUrl = usePokemonImage(number);

  if (!imageUrl) {
    return null;
  }

  return <img src={imageUrl} alt={name} />;
}
