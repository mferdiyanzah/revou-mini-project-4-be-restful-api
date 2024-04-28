interface BookingModel {
  id: string;
  booking_code: string;
  user_id: number;
  showtime_seat_id: number;
  status: "pending" | "cancelled" | "confirmed";
  created_at: Date;
};

interface BookingHistory {
  booking_code: string;
  movie_title: string;
  show_time: string;
  seat_number: string;
  status: "pending" | "cancelled" | "confirmed";
};

type AddBookingRequest = Pick<BookingModel, "booking_code" | "user_id" | "showtime_seat_id">;

type AddBookingPayload = Pick<AddBookingRequest, "user_id" | "showtime_seat_id">;

type AddBookingResponse = Pick<BookingModel, "booking_code" | "status">;

interface UpdateBookingStatusRequest {
  userId: number;
  bookingId: string;
  status: string;
};

export type {
  BookingModel, AddBookingRequest, AddBookingResponse, AddBookingPayload, BookingHistory, UpdateBookingStatusRequest
};