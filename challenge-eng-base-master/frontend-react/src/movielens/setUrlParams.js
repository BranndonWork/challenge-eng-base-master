export default function() {
    setTimeout(() => {
        let sortOrder = this.state.sortOrder
        let genre = this.state.genreFilter
        let searchInput = this.state.searchInput

        let newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname
        if (genre || sortOrder) {
            let queryParams = []
            if (genre) {
                queryParams.push(`genre=${genre}`)
            }
            if (sortOrder) {
                queryParams.push(`sort=${sortOrder}`)
            }
            if (searchInput) {
                queryParams.push(`search=${searchInput}`)
            }
            newUrl += '?' + queryParams.join('&')
        }
        window.history.pushState({
            path: newUrl
        }, '', newUrl);

    }, 50);
    return true
}
