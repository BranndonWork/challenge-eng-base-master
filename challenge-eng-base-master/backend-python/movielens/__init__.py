import csv
import io
import os
import requests
import shutil
import zipfile
from db import db


class MovieLens:
    def __init__(self):
        self.db = db
        self.dir_path = os.path.dirname(os.path.realpath(__file__))

    def clean_movie_titles(self, row):
        find_this = ", The ("
        if find_this not in row[1]:
            return row
        row[1] = "The " + row[1].replace(find_this, " (")
        return row

    def create_all_movielens_tables(self, verbose=False):
        if verbose:
            print("Creating tables..")
        self.execute_sql_from_file(self.dir_path + "/create_databases.sql")

    def create_database_view(self, verbose=False):
        if verbose:
            print("Setting up movielens views, this may take a couple minutes..")
        self.execute_sql_from_file(self.dir_path + "/create_view.sql")

    def db_insert(self, filename, table, columns, skip_header_row=True):
        cursor = self.db.cursor()
        with open(filename) as fh:
            csv_data = csv.reader(fh)
            if skip_header_row:
                next(csv_data)
            for row in csv_data:
                row = self.replace_missing_vals_with_zero(row)
                value_placeholders = self.get_value_placeholders(row)
                if table == "movies":
                    row = self.clean_movie_titles(row)
                sql_command = (
                    f"REPLACE INTO {table} ({columns}) VALUES({value_placeholders})"
                )
                cursor.execute(sql_command, row)
            self.db.commit()
            cursor.close()

    def replace_missing_vals_with_zero(self, values):
        for index, _ in enumerate(values):
            if values[index] == "":
                values[index] = 0
        return values

    def clean_movie_titles(self, row):
        find_this = ", The ("
        if find_this not in row[1]:
            return row
        row[1] = "The " + row[1].replace(find_this, " (")
        return row

    def query_movies(self, query_string, sort_order):
        return self.db_query(
            (
                "SELECT movie_id, title, average_rating, genres FROM movies_full WHERE "
                + f"title LIKE '%{query_string}%' OR "
                + f"tags LIKE '%{query_string}%' "
                + f"ORDER BY average_rating {sort_order}, title ASC"
            )
        )

    def load_movielens_dataset_to_database(self, verbose=False):
        self.download_movielens_dataset(verbose)
        self.create_all_movielens_tables(verbose)
        self.import_movielens_data_into_database(verbose)
        self.create_database_view(verbose)

        if verbose:
            print("Complete setting up movielens data!")

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

    def get_value_placeholders(self, row):
        value_placeholders = []
        for _ in range(len(row)):
            value_placeholders.append("%s")
        return ",".join(value_placeholders)

    def execute_sql_from_file(self, file_path):
        cursor = self.db.cursor()
        fh = open(file_path, "r")
        sql_file = fh.read()
        fh.close()
        sql_commands = sql_file.split(";")
        for command in sql_commands:
            command = " ".join(command.split())
            if command != "":
                cursor.execute(command)

        self.db.commit()
        cursor.close()

    def download_movielens_dataset(self, verbose=False):
        if verbose:
            print("Downloading movielens dataset..")
        dataset_url = (
            "https://files.grouplens.org/datasets/movielens/ml-latest-small.zip"
        )
        response = requests.get(dataset_url)
        zip_file = zipfile.ZipFile(io.BytesIO(response.content))
        zip_file.extractall()

    def db_query(self, query_string):
        # reconnecting mysql before execute sql prevents 500 errors
        # Source: https://stackoverflow.com/questions/55365543
        self.db.ping()
        with self.db.cursor() as cur:
            cur.execute(query_string)
            return cur.fetchall()

    def db_insert(self, filename, table, columns, skip_header_row=True):
        cursor = self.db.cursor()
        with open(filename) as fh:
            csv_data = csv.reader(fh)
            if skip_header_row:
                next(csv_data)
            for row in csv_data:
                row = self.replace_missing_vals_with_zero(row)
                value_placeholders = self.get_value_placeholders(row)
                if table == "movies":
                    row = self.clean_movie_titles(row)
                sql_command = (
                    f"REPLACE INTO {table} ({columns}) VALUES({value_placeholders})"
                )
                cursor.execute(sql_command, row)
            self.db.commit()
            cursor.close()
