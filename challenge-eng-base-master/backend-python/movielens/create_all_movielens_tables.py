def create_all_movielens_tables(self, verbose=False):
    if verbose:
        print("Creating tables..")

    self.execute_sql_from_file(self.dir_path + "/create_databases.sql")
