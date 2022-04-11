import requests
import zipfile
import io


def download_movielens_dataset(self, verbose=False):
    if verbose:
        print("Downloading movielens dataset..")

    dataset_url = "https://files.grouplens.org/datasets/movielens/ml-latest-small.zip"
    response = requests.get(dataset_url)
    zip_file = zipfile.ZipFile(io.BytesIO(response.content))
    zip_file.extractall()
