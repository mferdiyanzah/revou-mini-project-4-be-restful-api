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
) ENGINE = InnoDB AUTO_INCREMENT = 50 DEFAULT CHARSET = utf8mb3;
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
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb3;
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
) ENGINE = InnoDB AUTO_INCREMENT = 68 DEFAULT CHARSET = utf8mb3;
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
) ENGINE = InnoDB AUTO_INCREMENT = 32 DEFAULT CHARSET = utf8mb3;
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
) ENGINE = InnoDB AUTO_INCREMENT = 79 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
-- cineprime.bookings definition
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `booking_code` varchar(50) NOT NULL,
  `user_id` int NOT NULL,
  `showtime_seat_id` int NOT NULL,
  `status` enum('pending', 'confirmed', 'cancelled', 'expired') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `booking_code` (`booking_code`),
  KEY `user_id` (`user_id`),
  KEY `showtime_seat_id` (`showtime_seat_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`showtime_seat_id`) REFERENCES `showtime_seats` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 15 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
-- DML
-- cineprime.actors data
INSERT INTO `actors` (`id`, `name`, `created_at`, `updated_at`)
VALUES (
    1,
    'Tom Hanks',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00'
  ),
  (
    2,
    'Tom Cruise',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00'
  );
-- cineprime.movies data
INSERT INTO `movies` (
    `id`,
    `title`,
    `overview`,
    `duration`,
    `director`,
    `genre`,
    `rating`,
    `release_date`,
    `created_at`,
    `updated_at`,
    `deleted_at`
  )
VALUES (
    1,
    'Forrest Gump',
    'Forrest Gump is a person who despite his low IQ, leads a truly extraordinary life, being present at some of the most important events of the 20th century.',
    142,
    'Robert Zemeckis',
    'Drama',
    'PG-13',
    '1994-07-06',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00',
    NULL
  ),
  (
    2,
    'Top Gun',
    'The Top Gun Naval Fighter Weapons School is where the best of the best train to refine their elite flying skills.',
    110,
    'Tony Scott',
    'Action',
    'PG',
    '1986-05-16',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00',
    NULL
  );
-- cineprime.movie_casts data
INSERT INTO `movie_casts` (
    `id`,
    `movie_id`,
    `actor_id`,
    `created_at`,
    `updated_at`
  )
VALUES (
    1,
    1,
    1,
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00'
  ),
  (
    2,
    2,
    2,
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00'
  );
-- cineprime.movie_shows data
INSERT INTO `movie_shows` (
    `id`,
    `movie_id`,
    `price`,
    `show_time`,
    `created_at`,
    `updated_at`,
    `deleted_at`,
    `status`
  )
VALUES (
    1,
    1,
    100000,
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00',
    NULL,
    'now_showing'
  ),
  (
    2,
    2,
    100000,
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00',
    NULL,
    'now_showing'
  );
-- cineprime.seats data
INSERT INTO `seats` (
    `id`,
    `seat_number`,
    `created_at`,
    `updated_at`,
    `deleted_at`
  )
VALUES (
    1,
    'A1',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00',
    NULL
  ),
  (
    2,
    'A2',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00',
    NULL
  ),
  (
    3,
    'A3',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00',
    NULL
  ),
  (
    4,
    'A4',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00',
    NULL
  ),
  (
    5,
    'A5',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00',
    NULL
  ),
  (
    6,
    'A6',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00',
    NULL
  ),
  (
    7,
    'A7',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00',
    NULL
  ),
  (
    8,
    'A8',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00',
    NULL
  ),
  (
    9,
    'A9',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00',
    NULL
  ),
  (
    10,
    'A10',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00',
    NULL
  ),
  (
    11,
    'A11',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00',
    NULL
  ),
  (
    12,
    'A12',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00',
    NULL
  ),
  (
    13,
    'A13',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00',
    NULL
  ),
  (
    14,
    'A14',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00',
    NULL
  );
-- cineprime.showtime_seats data
INSERT INTO `showtime_seats` (
    `id`,
    `movie_show_id`,
    `seat_id`,
    `status`,
    `created_at`,
    `updated_at`
  )
VALUES (
    1,
    1,
    1,
    'available',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00'
  ),
  (
    2,
    1,
    2,
    'available',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00'
  ),
  (
    3,
    1,
    3,
    'available',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00'
  ),
  (
    4,
    1,
    4,
    'available',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00'
  ),
  (
    5,
    1,
    5,
    'available',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00'
  ),
  (
    6,
    1,
    6,
    'available',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00'
  ),
  (
    7,
    1,
    7,
    'available',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00'
  ),
  (
    8,
    1,
    8,
    'available',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00'
  ),
  (
    9,
    1,
    9,
    'available',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00'
  ),
  (
    10,
    1,
    10,
    'available',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00'
  ),
  (
    11,
    1,
    11,
    'available',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00'
  ),
  (
    12,
    1,
    12,
    'available',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00'
  ),
  (
    13,
    1,
    13,
    'available',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00'
  ),
  (
    14,
    1,
    14,
    'available',
    '2021-09-01 00:00:00',
    '2021-09-01 00:00:00'
  );