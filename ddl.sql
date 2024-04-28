-- cineprime.actors definition
CREATE TABLE `actors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb3;
-- cineprime.movies definition
CREATE TABLE `movies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `overview` text NOT NULL,
  `duration` int NOT NULL,
  `director` varchar(50) NOT NULL,
  `genre` varchar(50) NOT NULL,
  `rating` varchar(50) NOT NULL,
  `release_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 47 DEFAULT CHARSET = utf8mb3;
-- cineprime.seats definition
CREATE TABLE `seats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `seat_number` varchar(5) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 15 DEFAULT CHARSET = utf8mb3;
-- cineprime.users definition
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8mb3;
-- cineprime.movie_casts definition
CREATE TABLE `movie_casts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `movie_id` int NOT NULL,
  `actor_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `movie_id` (`movie_id`),
  KEY `actor_id` (`actor_id`),
  CONSTRAINT `movie_casts_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`),
  CONSTRAINT `movie_casts_ibfk_2` FOREIGN KEY (`actor_id`) REFERENCES `actors` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 63 DEFAULT CHARSET = utf8mb3;
-- cineprime.movie_shows definition
CREATE TABLE `movie_shows` (
  `id` int NOT NULL AUTO_INCREMENT,
  `movie_id` int NOT NULL,
  `price` int NOT NULL,
  `show_time` datetime NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `status` enum('upcoming', 'now_showing', 'finished') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `movie_id` (`movie_id`),
  CONSTRAINT `movie_shows_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 22 DEFAULT CHARSET = utf8mb3;
-- cineprime.showtime_seats definition
CREATE TABLE `showtime_seats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `movie_show_id` int NOT NULL,
  `seat_id` int NOT NULL,
  `status` enum('available', 'booked') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `movie_show_id` (`movie_show_id`),
  KEY `seat_id` (`seat_id`),
  CONSTRAINT `showtime_seats_ibfk_1` FOREIGN KEY (`movie_show_id`) REFERENCES `movie_shows` (`id`),
  CONSTRAINT `showtime_seats_ibfk_2` FOREIGN KEY (`seat_id`) REFERENCES `seats` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 34 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
-- cineprime.bookings definition
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `booking_code` varchar(50) NOT NULL,
  `user_id` int NOT NULL,
  `showtime_seat_id` int NOT NULL,
  `status` enum('pending', 'confirmed', 'cancelled', 'expired') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `booking_code` (`booking_code`),
  KEY `user_id` (`user_id`),
  KEY `showtime_seat_id` (`showtime_seat_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`showtime_seat_id`) REFERENCES `showtime_seats` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;