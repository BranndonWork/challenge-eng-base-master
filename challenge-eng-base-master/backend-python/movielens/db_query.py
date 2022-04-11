def db_query(self, query_string):
    # reconnecting mysql before execute sql prevents 500 errors
    # Source: https://stackoverflow.com/questions/55365543
    self.db.ping()
    with self.db.cursor() as cur:
        cur.execute(query_string)
        return cur.fetchall()
