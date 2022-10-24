export interface OmdbApiTitleIdResponse {
  Title?: string;
  Year?: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster?: string;
  Ratings?: [
     {
        Source: string;
        Value: string;
     },
     {
        Source: string;
        Value: string;
     },
     {
        Source: string;
        Value: string;
     }
  ];
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  imdbID?: string;
  Type?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: string;
  Error?: string
}

export interface OmdbApiSearchResponse {
  Search?: Show[];
  totalResults?: string;
  Response: string;
  Error?: string;
}

export interface Show {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export enum StatusResponse {
  Success = 'True',
  Error = 'False'
}

