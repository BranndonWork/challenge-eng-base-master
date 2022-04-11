export default function(newPageNumber) {
    let totalPage = Math.ceil(this.state.items.length / this.state.resultsPerPage);
    this.setState({
        isNextBtnActive: 'disabled'
    });
    this.setState({
        isPrevBtnActive: 'disabled'
    });
    if (totalPage === newPageNumber && totalPage > 1) {
        this.setState({
            isPrevBtnActive: ''
        });
    } else if (newPageNumber === 1 && totalPage > 1) {
        this.setState({
            isNextBtnActive: ''
        });
    } else if (totalPage > 1) {
        this.setState({
            isNextBtnActive: ''
        });
        this.setState({
            isPrevBtnActive: ''
        });
    }
}
