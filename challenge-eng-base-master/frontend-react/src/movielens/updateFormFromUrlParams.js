export default function() {
    const query = new URLSearchParams(window.location.search);
    const search = query.get('search')
    let queryApi = false;

    if (search) {
        this.setState({
            searchInput: search
        });
        queryApi = true;
    }

    const genre = query.get('genre')
    if (genre) {
        this.setState({
            genreFilter: genre
        });
        queryApi = true;
    }

    const sort = query.get('sort')
    if (sort) {
        this.setState({
            sortOrder: sort
        });
        queryApi = true;
    }

    if (queryApi) {
        setTimeout(() => {
            this.updateSearchResults()
        }, 50);
    }
}
