def create_database_view(self, verbose=False):
    if verbose:
        print("Setting up movielens views, this may take a couple minutes..")

    self.execute_sql_from_file(self.dir_path + "/create_view.sql")
