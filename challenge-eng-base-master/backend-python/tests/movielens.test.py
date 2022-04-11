import os
import json
import unittest
from movielens import MovieLens
from app import app


class MovieLensTest(unittest.TestCase):
    "Unit tests for MovieLens class"

    def setUp(self):
        super().setUp()
        app.config["TESTING"] = True
        self.app = app.test_client()
        self.movielens = MovieLens()
        self.movielens.db_query("DELETE FROM test WHERE col = 'test_data'")

    def tearDown(self):
        super().tearDown()

    def test_01_movielens_dataset_downloads(self):
        self.movielens.download_movielens_dataset()
        self.assertTrue(os.path.isfile("/app/tests/ml-latest-small/links.csv"))

    def test_02_app_search_works(self):
        response_json = json.loads(
            self.app.get("/search?query=test").get_data(as_text=True)
        )
        self.assertTrue(response_json[0][1] == "The Shawshank Redemption (1994)")

    def test_03_app_search_sorted_works(self):
        response_json = json.loads(
            self.app.get("/search?query=test&sort=asc").get_data(as_text=True)
        )
        self.assertTrue(
            response_json[0][1] == "Enron: The Smartest Guys in the Room (2005)"
        )

    def test_04_replace_missing_vals_with_zero(self):
        result = self.movielens.replace_missing_vals_with_zero([123, 456, ""])
        self.assertTrue(result == [123, 456, 0])

    def test_05_get_value_placeholders(self):
        result = self.movielens.get_value_placeholders([123, 456, ""])
        self.assertTrue(result == "%s,%s,%s")

    def test_06_clean_movie_titles(self):
        result = self.movielens.clean_movie_titles([0, "Best Movie, The (2030)"])
        self.assertTrue(result[1] == "The Best Movie (2030)")

    def test_07_db_query(self):
        result = self.movielens.db_query("SELECT col FROM test")
        self.assertTrue(result == (("ok",),))

    def test_08_db_insert(self):
        self.movielens.db_insert("/app/tests/db_insert_test_data.csv", "test", "col")
        result = self.movielens.db_query("SELECT col FROM test")
        self.assertTrue(result == (("ok",), ("test_data",)))


if __name__ == "__main__":
    unittest.main(verbosity=2)
