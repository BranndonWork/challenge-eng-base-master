def query_movies(self, query_string, sort_order):
    return self.db_query(
        (
            "SELECT movie_id, title, average_rating, genres FROM movies_full WHERE "
            + f"title LIKE '%{query_string}%' OR "
            + f"tags LIKE '%{query_string}%' "
            + f"ORDER BY average_rating {sort_order}, title ASC"
        )
    )
