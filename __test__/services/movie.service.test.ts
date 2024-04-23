import { movieRepository } from "../../src/repositories";
import { movieService } from "../../src/services";

jest.mock("../../src/repositories");

describe("Movie Service", () => {
  describe("getMovies", () => {
    it("should return movies", async () => {
      const request = {
        search: "",
        limit: 10,
        offset: 1,
      };
      (movieRepository.getMovies as jest.Mock).mockResolvedValue({
        results: [],
        page: 1,
        limit: 10,
      });

      const movies = await movieService.getMovies(request);

      expect(movies).toBeDefined();
      expect(movies.results).toEqual([]);
    });
  });

  describe("getMovieById", () => {
    it("should return movie", async () => {
      const movieMock = {
        id: "1",
        title: "Movie",
        release_date: new Date(),
        director: "Director",
        genre: "Genre",
        duration: 120,
        rating: 5,
        overview: "Overview",
        actor: "Actor",
      };
      (movieRepository.getMovieById as jest.Mock).mockResolvedValue([movieMock]);

      const movie = await movieService.getMovieById("1");

      expect(movie).toBeDefined();
      expect(movie.id).toEqual(movieMock.id);
    });
  });

  describe("addNewMovie", () => {
    it("should return id", async () => {
      const movieMock = {
        title: "Movie",
        release_date: "2021-01-01",
        director: "Director",
        genre: "Genre",
        duration: 120,
        rating: "PG",
        overview: "Overview",
        actors: [1, 2],
      };
      (movieRepository.addNewMovie as jest.Mock).mockResolvedValue(1);

      const id = await movieService.addNewMovie(movieMock);

      expect(id).toBeDefined();
    });
  });

  describe("getMoviesNowPlaying", () => {
    it("should return movies", async () => {
      const results = [
        {
          id: "1",
          title: "Movie",
          release_date: new Date(),
          director: "Director",
          genre: "Genre",
          duration: 120,
          rating: 5,
          overview: "Overview",
          show_time: "2021-01-01",
        },
        {
          id: "1",
          title: "Movie",
          release_date: new Date(),
          director: "Director",
          genre: "Genre",
          duration: 120,
          rating: 5,
          overview: "Overview",
          show_time: "2023-01-01",
        },
      ];
      (movieRepository.getMoviesNowPlaying as jest.Mock).mockResolvedValue(results);

      const movies = await movieService.getMoviesNowPlaying();

      expect(movies).toBeDefined();
      expect(movies.length).toEqual(1);
    });
  });

  describe("updateMovieById", () => {
    it("should update movie", async () => {
      const movieMock = {
        title: "Movie",
        release_date: "2021-01-01",
        director: "Director",
        genre: "Genre",
        duration: 120,
        rating: "PG",
        overview: "Overview",
        actors: [1, 2],
      };
      (movieRepository.updateMovieById as jest.Mock).mockResolvedValue(undefined);

      await movieService.updateMovieById("1", movieMock);

      expect(movieRepository.updateMovieById).toHaveBeenCalledWith("1", movieMock);
    });
  });

  describe("deleteMovieById", () => {
    it("should delete movie", async () => {
      (movieRepository.deleteMovieById as jest.Mock).mockResolvedValue(undefined);

      await movieService.deleteMovieById("1");

      expect(movieRepository.deleteMovieById).toHaveBeenCalledWith("1");
    });
  });

});