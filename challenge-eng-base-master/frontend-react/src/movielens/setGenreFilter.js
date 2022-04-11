export default function (genre) {
    this.setState({ genreFilter: genre });
    this.setUrlParams();
    this.updateSearchResults();
    return true
}
