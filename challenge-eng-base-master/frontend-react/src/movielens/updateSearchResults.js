export default function () {
    this.setUrlParams()
    this.setState({
        currentPage: 1,
        upperPageBound: 6,
        lowerPageBound: 0,
    }, () => {
        let apiUrl = `/search?query=${this.state.searchInput}&sort=${this.state.sortOrder}`
        fetch(apiUrl).then((res) => {
            return res.json();
        }).then((res) => {
            if (!res['error']) {
                this.setState({ unfilteredItems: res, items: res }, () => {
                    this.filterListByGenre();
                });
            }
        }).catch((err) => {
            this.setState({ err });
        })
    });

    return true
}
