export default function() {

    let genre = this.state.genreFilter;
    if (genre) {
        let filteredItems = this.state.unfilteredItems.filter((item) => {
            return item[3].includes(genre);
        });
        this.setState({
            items: filteredItems
        });
    } else {
        this.setState({
            items: [...this.state.unfilteredItems]
        });
    }

    return true;
}
