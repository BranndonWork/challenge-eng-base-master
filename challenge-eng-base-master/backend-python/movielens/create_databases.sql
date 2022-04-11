ALTER TABLE test ADD UNIQUE (col);

CREATE OR REPLACE TABLE `links` (
    `movie_id` int(11) NOT NULL,
    `imdb_id` int(11) NOT NULL,
    `tmdb_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE OR REPLACE TABLE `movies` (
    `movie_id` int(11) NOT NULL,
    `title` tinytext NOT NULL,
    `genres` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE OR REPLACE TABLE `ratings` (
    `movie_id` int(11) NOT NULL,
    `user_id` int(11) NOT NULL,
    `rating` float NOT NULL,
    `timestamp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE OR REPLACE TABLE `tags` (
    `movie_id` int(11) NOT NULL,
    `user_id` int(11) NOT NULL,
    `tag` tinytext NOT NULL,
    `timestamp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

