import os
import shutil


def import_movielens_data_into_database(self, verbose=False):
    if verbose:
        print("Importing movielens data into tables..")

    dataset_dir = os.path.dirname(self.dir_path) + "/ml-latest-small"

    links_file = dataset_dir + "/links.csv"
    movies_file = dataset_dir + "/movies.csv"
    ratings_file = dataset_dir + "/ratings.csv"
    tags_file = dataset_dir + "/tags.csv"

    self.db_insert(links_file, "links", "movie_id,imdb_id,tmdb_id")
    self.db_insert(movies_file, "movies", "movie_id,title,genres")
    self.db_insert(ratings_file, "ratings", "movie_id,user_id,rating,timestamp")
    self.db_insert(tags_file, "tags", "movie_id,user_id,tag,timestamp")

    shutil.rmtree(dataset_dir, ignore_errors=True)
