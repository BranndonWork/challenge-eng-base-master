export default function() {
    if ((this.state.currentPage - 1) % this.state.pageBound === 0) {
        this.setState({
            upperPageBound: this.state.upperPageBound - this.state.pageBound
        });
        this.setState({
            lowerPageBound: this.state.lowerPageBound - this.state.pageBound
        });
    }
    let listid = this.state.currentPage - 1;
    this.setState({
        currentPage: listid
    });
    this.setPrevAndNextBtnClass(listid);
}
