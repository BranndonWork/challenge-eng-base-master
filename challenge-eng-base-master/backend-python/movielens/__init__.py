import os
from db import db


class MovieLens:
    def __init__(self):
        self.db = db
        self.dir_path = os.path.dirname(os.path.realpath(__file__))

    # by breaking down the class methods into separate files
    # we ensure we don't have one monolithic class file
    from .load_movielens_dataset_to_database import load_movielens_dataset_to_database
    from .download_movielens_dataset import download_movielens_dataset
    from .replace_missing_vals_with_zero import replace_missing_vals_with_zero
    from .get_value_placeholders import get_value_placeholders
    from .clean_movie_titles import clean_movie_titles
    from .db_insert import db_insert
    from .db_query import db_query
    from .query_movies import query_movies
    from .import_movielens_data_into_database import import_movielens_data_into_database
    from .execute_sql_from_file import execute_sql_from_file
    from .create_all_movielens_tables import create_all_movielens_tables
    from .create_database_view import create_database_view
