export const authorizationKey: string =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjhmODk5MjNkMjk2YmIyZGJhZDBmZGQ2NDk4YjliNCIsIm5iZiI6MTY5MzIwMTA4OC4zNDUsInN1YiI6IjY0ZWMzMmMwZTg5NGE2MDEzYmIxOWRiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Dhig1ZzKmogOur2HIK8KMX1_eguRY5t6ARa0NdD9BR4";

export const TMDB_API_KEY: string = "db8f89923d296bb2dbad0fdd6498b9b4";

export const RequestOptions = (passmethod?: string) => ({
  method: passmethod || "GET",
  headers: {
    accept: "application/json",
    authorization: `Bearer ${authorizationKey}`,
  },
});