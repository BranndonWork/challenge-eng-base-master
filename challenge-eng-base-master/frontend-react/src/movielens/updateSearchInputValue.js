export default function(event) {
    this.setState({
        searchInput: event.target.value
    });
    return true
}
