CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 AUTO_INCREMENT = 1;
CREATE TABLE IF NOT EXISTS `movies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `overview` text NOT NULL,
  `duration` int(11) NOT NULL,
  `director` varchar(50) NOT NULL,
  `genre` varchar(50) NOT NULL,
  `rating` varchar(50) NOT NULL,
  `release_date` date NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 AUTO_INCREMENT = 1;
CREATE TABLE IF NOT EXISTS `actors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 AUTO_INCREMENT = 1;
CREATE TABLE IF NOT EXISTS `movie_casts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_id` int(11) NOT NULL,
  `actor_id` int(11) NOT NULL,
  `created_at` timestamp default current_timestamp,
  `updated_at` timestamp default current_timestamp,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`movie_id`) REFERENCES `movies`(`id`),
  FOREIGN KEY (`actor_id`) REFERENCES `actors`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 AUTO_INCREMENT = 1;
CREATE TABLE IF NOT EXISTS `movie_showtimes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `show_time` datetime NOT NULL,
  `status` enum('upcoming', 'now_showing', 'finished') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`movie_id`) REFERENCES `movies`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 AUTO_INCREMENT = 1;
CREATE TABLE IF NOT EXISTS `seats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seat_number` varchar(5) NOT NULL,
  `row_number` varchar(5) NOT NULL,
  `created_at` timestamp default now(),
  `updated_at` timestamp default now(),
  `deleted_at` timestamp default null,
  PRIMARY KEY (`id`),
) ENGINE = InnoDB DEFAULT CHARSET = utf8 AUTO_INCREMENT = 1;
CREATE TABLE IF NOT EXIST `showtime_seats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `movie_show_id` int NOT NULL,
  `seat_id` int NOT NULL,
  `status` enum('available', 'booked') NOT NULL,
  `created_at` timestamp default now(),
  `updated_at` timestamp default now(),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`movie_show_id`) REFERENCES `movie_shows`(`id`),
  FOREIGN KEY (`seat_id`) REFERENCES `seats`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 AUTO_INCREMENT = 1;
CREATE TABLE IF NOT EXISTS `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `booking_code` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `showtime_seat_id` int(11) NOT NULL,
  `status` enum('pending', 'confirmed', 'cancelled') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`booking_code`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
  FOREIGN KEY (`showtime_seat_id`) REFERENCES `showtime_seats`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 AUTO_INCREMENT = 1;
-- Booking history with all movie details
SELECT b.booking_code,
  b.status,
  m.title,
  m.release_date,
  m.duration,
  m.genre,
  m.rating,
  m.director,
  m.overview,
  s.show_time,
  s.price,
  s.total_seats,
  u.username
FROM bookings b
  JOIN showtime_seats ss ON b.showtime_seat_id = ss.id
  JOIN movie_showtimes s ON ss.movie_show_id = s.id
  JOIN movies m ON s.movie_id = m.id
  JOIN users u ON b.user_id = u.id
WHERE b.user_id = 1;
-- get movie detail with actor
SELECT m.title,
  m.overview,
  m.duration,
  m.director,
  m.genre,
  m.rating,
  m.release_date,
  a.name as actor_name
FROM movies m
  JOIN movie_casts mc ON m.id = mc.movie_id
  JOIN actors a ON mc.actor_id = a.id
WHERE m.id = 1;