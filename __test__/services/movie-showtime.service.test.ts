import pool from "../../src/libs/db";
import {
  movieShowTimeRepository, seatRepository, showTimeSeatRepository
} from "../../src/repositories";
import { movieShowTimeService } from "../../src/services";

jest.mock("../../src/repositories");
jest.mock("../../src/libs/db");

describe("Movie Show Time Service", () => {
  const mockConnection = {
    beginTransaction: jest.fn(),
    commit: jest.fn(),
    rollback: jest.fn(),
    release: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("Add Show Time", () => {
    it("should return true", async () => {
      (pool.getConnection as jest.Mock).mockResolvedValue(mockConnection);

      const request = {
        movie_id: 1,
        price: 10000,
        show_time: "2021-01-01 12:00:00",
        status: "upcoming" as const,
      };

      (movieShowTimeRepository.addShowTime as jest.Mock).mockResolvedValue("1");
      (seatRepository.getAllSeats as jest.Mock).mockResolvedValue([
        { id: "1" },
        { id: "2" },
      ]);
      (showTimeSeatRepository.addShowTimeSeat as jest.Mock).mockResolvedValue(1);

      const result = await movieShowTimeService.addShowTime(request);

      expect(result).toBe(true);
      expect(mockConnection.beginTransaction).toHaveBeenCalledTimes(1);
    });

    it("should rollback transactio if error", async () => {
      (pool.getConnection as jest.Mock).mockResolvedValue(mockConnection);

      const request = {
        movie_id: 1,
        price: 10000,
        show_time: "2021-01-01 12:00:00",
        status: "upcoming" as const,
      };

      (movieShowTimeRepository.addShowTime as jest.Mock).mockRejectedValue(new Error());
      (seatRepository.getAllSeats as jest.Mock).mockResolvedValue([
        { id: "1" },
        { id: "2" },
      ]);

      await expect(movieShowTimeService.addShowTime(request)).rejects.toThrow();

      expect(mockConnection.rollback).toHaveBeenCalledTimes(1);
    });
  });

  describe("Delete Show Time", () => {
    it("should return number if success", async () => {
      const showTimeId = "1";
      (movieShowTimeRepository.deleteShowTime as jest.Mock).mockResolvedValue(1);

      const result = await movieShowTimeService.deleteShowTime(showTimeId);

      expect(result).toBe(1);
    });
  });

  describe("Update Show Time", () => {
    it("should return number if success", async () => {
      const request = {
        id: 1,
        movie_id: 1,
        price: 10000,
        show_time: "2021-01-01 12:00:00",
        status: "upcoming" as const,
      };
      (movieShowTimeRepository.updateShowTime as jest.Mock).mockResolvedValue(1);

      const result = await movieShowTimeService.updateShowTime(request);

      expect(result).toBe(1);
    });
  });
});