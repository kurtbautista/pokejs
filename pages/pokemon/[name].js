import Link from "next/link";
import Image from "next/Image";
import styles from "../../styles/Home.module.css";

const Pokemon = ({ pokemon }) => {
  return (
    <div>
      <Link href="/">back to pokedex</Link>
      <div className={styles.card}>
        <h2 className={styles.title}>{pokemon.name}</h2>
        <Image
          src={pokemon.sprites.other.dream_world.front_default}
          alt={pokemon.name}
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};

export default Pokemon;

export const getStaticPaths = async () => {
  const resp = await fetch("https://pokeapi.co/api/v2/pokemon");
  const pokemon = await resp.json();
  return {
    paths: await pokemon.results.map((poke) => ({
      params: { name: poke.name.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);

  return {
    props: {
      pokemon: await resp.json(),
    },
  };
};
