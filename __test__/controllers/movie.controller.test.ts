import { type Request, type Response } from 'express';

import { movieController } from '../../src/controllers';
import { movieService } from '../../src/services';

jest.mock('../../src/services');

describe('Movie Controller', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {} as unknown as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllMovies', () => {

    it('should get all movies', async () => {
      const expectedMovies = [
        {
          id: 1,
          title: 'Movie 1',
          overview: 'Overview 1',
          poster_path: 'Poster Path 1',
          backdrop_path: 'Backdrop Path 1',
          release_date: '2021-01-01',
          runtime: 120,
          genres: ['Action', 'Adventure'],
        },
        {
          id: 2,
          title: 'Movie 2',
          overview: 'Overview 2',
          poster_path: 'Poster Path 2',
          backdrop_path: 'Backdrop Path 2',
          release_date: '2021-01-02',
          runtime: 130,
          genres: ['Action', 'Comedy'],
        },
      ];

      req.query = {
        limit: '10',
        page: '1',
        search: 'dun',
        sort: 'release_date',
        order: 'desc'
      } as any;

      (movieService.getMovies as jest.Mock).mockResolvedValue(expectedMovies);

      await movieController.getMovies(req, res);

      expect(movieService.getMovies).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: expectedMovies }));
    });

    it('should return 400 if no limit or page query', async () => {
      req.query = {};

      await movieController.getMovies(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Invalid limit or page' }));
    });

    it('shoulf return no movies if limit or page is null', async () => {
      req.query = {
        limit: null,
        page: null,
      } as any;

      await movieController.getMovies(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        data: {
          results: [], page: 1, limit: 0
        }
      }));
    });

    it('should return 400 if service throws an error', async () => {
      req.query = {
        limit: '10',
        page: '1',
        search: 'dun',
        sort: 'release_date',
        order: 'desc'
      } as any;

      (movieService.getMovies as jest.Mock).mockRejectedValue(new Error('Service Error'));

      await movieController.getMovies(req, res);

      expect(movieService.getMovies).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Service Error' }));
    });
  });

  describe('getMovieById', () => {
    it('should get a movie by id', async () => {
      const expectedMovie = {
        id: 1,
        title: 'Movie 1',
        overview: 'Overview 1',
        poster_path: 'Poster Path 1',
        backdrop_path: 'Backdrop Path 1',
        release_date: '2021-01-01',
        runtime: 120,
        genres: ['Action', 'Adventure'],
      };

      req.params = { id: '1' } as any;

      (movieService.getMovieById as jest.Mock).mockResolvedValue(expectedMovie);

      await movieController.getMovieById(req, res);

      expect(movieService.getMovieById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: expectedMovie }));
    });

    it('should return 400 if service throws an error', async () => {
      req.params = { id: '1' } as any;

      (movieService.getMovieById as jest.Mock).mockRejectedValue(new Error('Service Error'));

      await movieController.getMovieById(req, res);

      expect(movieService.getMovieById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Service Error' }));
    });
  });

  describe('addNewMovie', () => {
    it('should add a new movie', async () => {
      const requestBody = {
        title: 'Movie 1',
        overview: 'Overview 1',
        director: 'Director 1',
        genre: 'Genre 1',
        duration: 120,
        rating: 'PG',
        actors: ['Actor 1', 'Actor 2'],
        release_date: '2021-01-01',
      };

      req.body = requestBody;

      (movieService.addNewMovie as jest.Mock).mockResolvedValue(1);

      await movieController.addNewMovie(req, res);

      expect(movieService.addNewMovie).toHaveBeenCalledWith(requestBody);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: { id: 1 } }));
    });

    it('should return 400 if request body is not complete', async () => {
      const requestBody = {
        title: 'Movie 1',
        overview: 'Overview 1',
        director: 'Director 1',
        genre: 'Genre 1',
        duration: 120,
        rating: 'PG',
        actors: ['Actor 1', 'Actor 2'],
      };

      req.body = requestBody;

      await movieController.addNewMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'All fields are required' }));
    });

    it('should return 400 if service throws an error', async () => {
      const requestBody = {
        title: 'Movie 1',
        overview: 'Overview 1',
        director: 'Director 1',
        genre: 'Genre 1',
        duration: 120,
        rating: 'PG',
        actors: ['Actor 1', 'Actor 2'],
        release_date: '2021-01-01',
      };

      req.body = requestBody;

      (movieService.addNewMovie as jest.Mock).mockRejectedValue(new Error('Service Error'));

      await movieController.addNewMovie(req, res);

      expect(movieService.addNewMovie).toHaveBeenCalledWith(requestBody);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Service Error' }));
    });
  });

  describe('getMoviesNowPlaying', () => {
    it('should get movies now playing', async () => {
      const expectedMovies = [
        {
          id: 1,
          title: 'Movie 1',
          overview: 'Overview 1',
          poster_path: 'Poster Path 1',
          backdrop_path: 'Backdrop Path 1',
          release_date: '2021-01-01',
          runtime: 120,
          genres: ['Action', 'Adventure'],
        },
        {
          id: 2,
          title: 'Movie 2',
          overview: 'Overview 2',
          poster_path: 'Poster Path 2',
          backdrop_path: 'Backdrop Path 2',
          release_date: '2021-01-02',
          runtime: 130,
          genres: ['Action', 'Comedy'],
        },
      ];

      (movieService.getMoviesNowPlaying as jest.Mock).mockResolvedValue(expectedMovies);

      await movieController.getMoviesNowPlaying(req, res);

      expect(movieService.getMoviesNowPlaying).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: expectedMovies }));
    });

    it('should return 400 if service throws an error', async () => {
      (movieService.getMoviesNowPlaying as jest.Mock).mockRejectedValue(new Error('Service Error'));

      await movieController.getMoviesNowPlaying(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Service Error' }));
    });
  });

  describe('updateMovieById', () => {
    it('should update a movie by id', async () => {
      const requestBody = {
        title: 'Movie 1',
        overview: 'Overview 1',
        poster_path: 'Poster Path 1',
        backdrop_path: 'Backdrop Path 1',
        release_date: '2021-01-01',
        runtime: 120,
        genres: ['Action', 'Adventure'],
      };

      req.body = requestBody;
      req.params = { id: '1' } as any;

      (movieService.updateMovieById as jest.Mock).mockResolvedValue(undefined);

      await movieController.updateMovieById(req, res);

      expect(movieService.updateMovieById).toHaveBeenCalledWith('1', requestBody);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: undefined }));
    });

    it('should return 400 if no request body', async () => {
      req.params = { id: '1' } as any;

      await movieController.updateMovieById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });


    it('should return 400 if service throws an error', async () => {
      const requestBody = {
        title: 'Movie 1',
        overview: 'Overview 1',
        poster_path: 'Poster Path 1',
        backdrop_path: 'Backdrop Path 1',
        release_date: '2021-01-01',
        runtime: 120,
        genres: ['Action', 'Adventure'],
      };

      req.body = requestBody;
      req.params = { id: '1' } as any;

      (movieService.updateMovieById as jest.Mock).mockRejectedValue(new Error('Service Error'));

      await movieController.updateMovieById(req, res);

      expect(movieService.updateMovieById).toHaveBeenCalledWith('1', requestBody);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Service Error' }));
    });
  });

  describe('deleteMovieById', () => {
    it('should delete a movie by id', async () => {
      req.params = { id: '1' } as any;

      (movieService.deleteMovieById as jest.Mock).mockResolvedValue(undefined);

      await movieController.deleteMovieById(req, res);

      expect(movieService.deleteMovieById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: undefined }));
    });

    it('should return 400 if service throws an error', async () => {
      req.params = { id: '1' } as any;

      (movieService.deleteMovieById as jest.Mock).mockRejectedValue(new Error('Service Error'));

      await movieController.deleteMovieById(req, res);

      expect(movieService.deleteMovieById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Service Error' }));
    });
  });
});