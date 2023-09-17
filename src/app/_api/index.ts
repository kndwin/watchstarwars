import data from "./starwar.json";

export type StarWarItem = {
  type: "TV Show" | "Movie";
  series: string;
  number: string;
  title: string;
  minutes: number;
  haveWatched: boolean;
};

export async function getData(): Promise<StarWarItem[]> {
  return data.map((data) => ({
    ...data,
    haveWatched: false,
  })) as StarWarItem[];
}
