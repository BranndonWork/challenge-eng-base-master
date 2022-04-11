DROP VIEW IF EXISTS movies_full_view;
CREATE VIEW movies_full_view AS  
    SELECT 
        movies.movie_id as movie_id,
        movies.title as title,
        movies.genres as genres,
        AVG(ratings.rating) as average_rating,
        GROUP_CONCAT(DISTINCT tags.tag SEPARATOR ' | ') AS tags
    FROM movies
    LEFT JOIN tags 
        ON tags.movie_id = movies.movie_id 
    LEFT JOIN ratings 
        ON ratings.movie_id = movies.movie_id 
    GROUP BY movie_id
    ORDER BY movie_id ASC;
    
CREATE OR REPLACE TABLE movies_full AS
SELECT
    movie_id,
    title,
    average_rating,
    genres,
    tags
FROM movies_full_view;

DROP VIEW IF EXISTS movies_full_view;
