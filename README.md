#### CinePrime

CinePrime is a web application that allows users to search for movies and TV shows, view details about them, and save them to their watchlist. Users can also view their watchlist and remove items from it. The application uses the OMDb API to search for movies and TV shows.

### Scenario

- CinePrime only has a theater in one location.
- A theater only has one screen.
- Users can register and log in to the platform.
- Users can browse a list of available movies.
- Users can view details about a specific movie.
- Users can book tickets for a movie screening.
- Users can view their booking history.
- Admin users can manage movie listings, including adding, updating, and deleting movies.
- Admin users can manage showtimes for each movie, including adding, updating, and deleting showtimes.
- Users receive email notifications for booking confirmation and reminders before the showtime.
- Users can search for movies and TV shows using the OMDb API.

### MVP

Use Cases

1. User Registration:
   a. Use Case: New users should be able to register on the platform.
   b. Functionality: Users can sign up with their email and password, and their
   credentials are securely stored in the database. Upon successful
   registration, users receive a JWT token for authentication.
2. User Login:
   a. Use Case: Registered users should be able to log in to the platform.
   b. Functionality: Users provide their email and password to log in. If the
   credentials are correct, they receive a JWT token to authenticate
   subsequent requests.
3. Browse Movies:
   a. Authentication : no
   b. Use Case: Users want to see a list of available movies.
   c. Functionality: The API provides endpoints to retrieve a list of movies
   currently showing, including details such as title, genre, duration, and
   available showtimes.
4. Movie Details:
   a. Authentication : no
   b. Use Case: Users want to view details about a specific movie.
   c. Functionality: Users can retrieve detailed information about a particular
   movie, including synopsis, cast, director, and ratings.
5. Book Tickets:
   a. Authentication : yes
   b. Use Case: Users want to book tickets for a movie screening.
   c. Functionality: Users can select a movie, choose a showtime, and book
   tickets for the desired number of seats. Upon successful booking, users
   receive a confirmation along with a booking reference.
6. View Booking History:
   a. Authentication : yes
   b. Use Case: Users want to see their past and upcoming bookings.
   c. Functionality: Users can view their booking history, including details such
   as movie title, showtime, number of tickets, and booking status.
7. Manage Movies (Admin Only):
   a. Authentication : yes
   b. Use Case: Admin users need to manage movie listings.
   c. Functionality: Admin users can add new movies, update existing movie
   details, delete movies, and manage showtimes.

### Endpoints

1. POST /api/users/register: Register a new user.
2. POST /api/users/login: Log in an existing user.
3. GET /api/movies: Retrieve a list of available movies.
4. GET /api/movies/:id: Retrieve details about a specific movie.
5. POST /api/bookings: Book tickets for a movie screening.
6. GET /api/bookings: Retrieve a user's booking history.
7. POST /api/movies: Add a new movie (admin only).
8. PUT /api/movies/:id: Update movie details (admin only).
9. DELETE /api/movies/:id: Delete a movie (admin only).
10. POST /api/showtimes: Add a new showtime (admin only).
11. PUT /api/showtimes/:id: Update showtime details (admin only).
12. DELETE /api/showtimes/:id: Delete a showtime (admin only).
13. GET /api/showtimes: Retrieve a list of available showtimes.

### Detailed Endpoint Description

<ol>
  <li>POST /api/users/register: Register a new user.
    <ul>
      <li>Request Body:
        <ul>
          <li>email: string (required)</li>
          <li>password: string (required)</li>
        </ul>
      </li>
      <li>Response:
        <ul>
          <li>id: string</li>
          <li>email: string</li>
          <li>token: string</li>
        </ul>
      </li>
      <li>Error Use Cases:
        <ul>
          <li>400: Invalid request body</li>
          <li>409: User already exists</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>POST /api/users/login: Log in an existing user.
    <ul>
      <li>Request Body:
        <ul>
          <li>email: string (required)</li>
          <li>password: string (required)</li>
        </ul>
      </li>
      <li>Response:
        <ul>
          <li>id: string</li>
          <li>email: string</li>
          <li>token: string</li>
        </ul>
      </li>
      <li>Error Use Cases:
        <ul>
          <li>400: Invalid request body</li>
          <li>401: Unauthorized</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>GET /api/movies: Retrieve a list of available movies.
    <ul>
      <li>Response:
        <ul>
          <li>movies: array of objects</li>
        </ul>
      </li>
      <li>Error Use Cases:
        <ul>
          <li>401: Unauthorized</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>GET /api/movies/:id: Retrieve details about a specific movie.
    <ul>
      <li>Response:
        <ul>
          <li>movie: object</li>
        </ul>
      </li>
      <li>Error Use Cases:
        <ul>
          <li>401: Unauthorized</li>
          <li>404: Movie not found</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>POST /api/bookings: Book tickets for a movie screening.
    <ul>
      <li>Request Body:
        <ul>
          <li>movieId: string (required)</li>
          <li>showtimeId: string (required)</li>
          <li>numTickets: number (required)</li>
        </ul>
      </li>
      <li>Response:
        <ul>
          <li>booking: object</li>
        </ul>
      </li>
      <li>Error Use Cases:
        <ul>
          <li>400: Invalid request body</li>
          <li>401: Unauthorized</li>
          <li>404: Movie or showtime not found</li>
          <li>409: Insufficient tickets available</li>
        </ul>
      </li>
    </ul>
    <li>GET /api/bookings: Retrieve a user's booking history.
      <ul>
        <li>Response:
          <ul>
            <li>bookings: array of objects</li>
          </ul>
        </li>
        <li>Error Use Cases:
          <ul>
            <li>401: Unauthorized</li>
          </ul>
        </li>
      </ul>
    </li>
    <li>POST /api/movies: Add a new movie (admin only).
      <ul>
        <li>Request Body:
          <ul>
            <li>title: string (required)</li>
            <li>genre: string (required)</li>
            <li>duration: number (required)</li>
          </ul>
        </li>
        <li>Response:
          <ul>
            <li>movie: object</li>
          </ul>
        </li>
        <li>Error Use Cases:
          <ul>
            <li>400: Invalid request body</li>
            <li>401: Unauthorized</li>
          </ul>
        </li>
      </ul>
    </li>
    <li>PUT /api/movies/:id: Update movie details (admin only).
      <ul>
        <li>Request Body:
          <ul>
            <li>title: string</li>
            <li>genre: string</li>
            <li>duration: number</li>
          </ul>
        </li>
        <li>Response:
          <ul>
            <li>movie: object</li>
          </ul>
        </li>
        <li>Error Use Cases:
          <ul>
            <li>400: Invalid request body</li>
            <li>401: Unauthorized</li>
            <li>404: Movie not found</li>
          </ul>
        </li>
      </ul>
    </li>
    <li>DELETE /api/movies/:id: Delete a movie (admin only).
      <ul>
        <li>Response:
          <ul>
            <li>message: string</li>
          </ul>
        </li>
        <li>Error Use Cases:
          <ul>
            <li>401: Unauthorized</li>
            <li>404: Movie not found</li>
          </ul>
        </li>
      </ul>
    </li>
    <li>POST /api/showtimes: Add a new showtime (admin only).
      <ul>
        <li>Request Body:
          <ul>
            <li>movieId: string (required)</li>
            <li>time: string (required)</li>
            <li>date: string (required)</li>
          </ul>
        </li>
        <li>Response:
          <ul>
            <li>showtime: object</li>
          </ul>
        </li>
        <li>Error Use Cases:
          <ul>
            <li>400: Invalid request body</li>
            <li>401: Unauthorized</li>
            <li>404: Movie not found</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>PUT /api/showtimes/:id: Update showtime details (admin only).
    <ul>
      <li>Request Body:
        <ul>
          <li>time: string</li>
          <li>date: string</li>
        </ul>
      </li>
      <li>Response:
        <ul>
          <li>showtime: object</li>
        </ul>
      </li>
      <li>Error Use Cases:
        <ul>
          <li>400: Invalid request body</li>
          <li>401: Unauthorized</li>
          <li>404: Showtime not found</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>DELETE /api/showtimes/:id: Delete a showtime (admin only).
    <ul>
      <li>Response:
        <ul>
          <li>message: string</li>
        </ul>
      </li>
      <li>Error Use Cases:
        <ul>
          <li>401: Unauthorized</li>
          <li>404: Showtime not found</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>GET /api/showtimes: Retrieve a list of available showtimes.
    <ul>
      <li>Response:
        <ul>
          <li>showtimes: array of objects</li>
        </ul>
      </li>
      <li>Error Use Cases:
        <ul>
          <li>401: Unauthorized</li>
        </ul>
      </li>
    </ul>
  </li>
  
</ol>

### Scheduler Jobs

1. Send Booking Confirmation Emails: Send email notifications to users after
   booking tickets.
2. Send Booking Reminders: Send email reminders to users before the showtime.
3. Update Booking Status: Automatically update the booking status based on the
   showtime.
4. Delete Expired Bookings: Remove expired bookings from the database.
