export default function(event) {
    this.setState({
        currentPage: Number(event.target.id)
    });
}
