import os
import json
import unittest
from movielens import MovieLens
from app import app


class App(unittest.TestCase):
    "Unit tests for App."

    def setUp(self):
        super().setUp()
        app.config["TESTING"] = True
        self.app = app.test_client()
        self.movielens = MovieLens()

    def tearDown(self):
        super().tearDown()

    def test_app_is_available(self):
        response_json = json.loads(self.app.get("/test").get_data(as_text=True))
        self.assertEqual(response_json, {"backend": "python", "result": "ok"})


if __name__ == "__main__":
    unittest.main(verbosity=2)
