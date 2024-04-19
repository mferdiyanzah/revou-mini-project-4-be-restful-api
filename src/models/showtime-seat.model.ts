interface ShowTimeSeatModel {
  id: string;
  movie_show_id: number;
  seat_id: number;
  status: "booked" | "available";
};

type AddShowTimeSeatRequest = Omit<ShowTimeSeatModel, "id">;

export type { ShowTimeSeatModel, AddShowTimeSeatRequest };