def load_movielens_dataset_to_database(self, verbose=False):
    self.download_movielens_dataset(verbose)
    self.create_all_movielens_tables(verbose)
    self.import_movielens_data_into_database(verbose)
    self.create_database_view(verbose)

    if verbose:
        print("Complete setting up movielens data!")
