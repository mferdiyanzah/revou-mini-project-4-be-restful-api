interface SeatModel {
  id: number
  seat_number: string;
};

type GetAllSeatsResponse = Array<Pick<SeatModel, "id">>;


export type { SeatModel, GetAllSeatsResponse };