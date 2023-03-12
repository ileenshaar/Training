export type MovieData = {
    id: number;
    title: string;
    poster: string;
    overview: string;
    release_date: number;
    genres: string[];
  }[];
  
  export const movieData: MovieData = [];

export async function fetchMovies() {
  const response = await fetch('https://mocki.io/v1/26cead06-d092-41d0-9317-d964faa232ee');
  const jsonData = await response.json();
  return jsonData;
}
