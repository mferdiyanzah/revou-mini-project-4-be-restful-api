interface SeatModel {
  id: number
  seat_number: string;
  row_number: number;
};

type GetAllSeatsResponse = Array<Pick<SeatModel, "id">>;


export type { SeatModel, GetAllSeatsResponse };