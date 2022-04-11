export default function () {
    let activeGenre = this.state.genreFilter
    let iconVisible = 'cancelButton'
    if (!activeGenre) {
        activeGenre = 'All'
        iconVisible = iconVisible + " hidden"
    } else {
        activeGenre = activeGenre
    }

    return <span id="genreActive">{activeGenre} <img
        onClick={() => this.setGenreFilter('')}
        className={iconVisible}
        aria-label="clearGenreFilter"
        src="data:image/png;base64,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"
    />
    </span>
};
