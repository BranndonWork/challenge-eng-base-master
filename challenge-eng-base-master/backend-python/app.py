import flask
from db import db
from movielens import MovieLens

app = flask.Flask(__name__)


@app.route("/test")
def test():
    with db.cursor() as cur:
        cur.execute("SELECT col FROM test;")
        (result,) = cur.fetchone()
        return flask.jsonify(dict(result=result, backend="python"))


@app.route("/search")
def query():
    if not flask.request.args.get("query"):
        return flask.jsonify({"error": "query parameter required"})

    return flask.jsonify(
        MovieLens().query_movies(
            flask.request.args.get("query"),
            flask.request.args.get("sort", "DESC").upper(),
        )
    )


@app.cli.command("load-movielens")
def load_movielens():
    MovieLens().load_movielens_dataset_to_database(verbose=True)
