export default function () {
    let {
        items,
        currentPage,
        resultsPerPage,
    } = this.state;

    const indexOfLastItem = currentPage * resultsPerPage;
    const indexOfFirstItem = indexOfLastItem - resultsPerPage;
    let currentItems = []
    if (items.length) {
        currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    }

    const renderItems = currentItems.map((item) => {
        let movie_title = item[1]
        let rating = item[2]
        if (rating && !isNaN(rating)) {
            rating = parseFloat(rating).toFixed(1)
        } else {
            rating = 'N/A'

        }

        let genres = item[3]
        if (!genres) {
            genres = []
        } else {
            genres = genres.split('|')
        }

        const renderGenres = genres.map((genre) => {

            if (genre == '(no genres listed)') {
                return <span key={genre} className="smallText genre">{genre}</span>
            }

            const ariaLabel = 'filterGenre' + genre
            return <a key={genre} aria-label={ariaLabel} className="smallText genre" onClick={() => this.setGenreFilter(genre)}><span>{genre}</span></a>
        });

        const ariaLabel = 'movieResult-' + String(item[0])
        return <div aria-label={ariaLabel} key={item[0]} className="wrapper">
            <div className="info" aria-label="movieListing">
                <i
                    className="fas fa-map-marker"
                    style={{ color: "orangered", fontSize: "12px" }}
                ></i>
                {renderGenres}
                <br />
                <span className="name">{movie_title}</span>
                <br />
                <span className="smallText">Rating: {rating}</span>

            </div>

        </div>
    });

    return renderItems

}