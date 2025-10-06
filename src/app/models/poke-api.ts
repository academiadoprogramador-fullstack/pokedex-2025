export interface PokeApiResponse {
  count: number;
  results: { name: string; url: string }[];
}

export interface PokeApiDetailsResponse {
  id: number;
  name: string;
  types: { type: { name: string } }[];

  cries: {
    latest: string;
    legacy: string;
  };

  sprites: {
    back_default?: string;
    back_female?: string;
    back_shiny?: string;
    back_shiny_female?: string;
    front_default?: string;
    front_female?: string;
    front_shiny?: string;
    front_shiny_female?: string;
    other: {
      dream_world: {
        front_default?: string;
        front_female?: string;
      };
      home: {
        front_default?: string;
        front_female?: string;
        front_shiny?: string;
        front_shiny_female?: string;
      };
      'official-artwork': {
        front_default?: string;
        front_shiny?: string;
      };
      showdown: {
        back_default?: string;
        back_female?: string;
        back_shiny?: string;
        back_shiny_female?: string;
        front_default?: string;
        front_female?: string;
        front_shiny?: string;
        front_shiny_female?: string;
      };
    };
  };
}
