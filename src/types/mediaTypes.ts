export type Media = {
  id: number;
  title?: string;
  name?:string;
  original_language: string;
  overview: string;
  popularity: number;
  release_date: Date;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  trailer_key?: string | null;
};

export type MediaResults = {
  id: number;
  results: Media[];
};

export type Video = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
};

export type VideosResults = {
  id: number;
  results: Video[];
};

export type PromiseResponse = {
  status: string;
  value?: {
    id: number;
    results: Video[];
  };
};
