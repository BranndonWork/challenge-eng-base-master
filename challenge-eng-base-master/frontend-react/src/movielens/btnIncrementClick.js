export default function() {
    this.setState({
        upperPageBound: this.state.upperPageBound + this.state.pageBound
    });
    this.setState({
        lowerPageBound: this.state.lowerPageBound + this.state.pageBound
    });
    let listid = this.state.upperPageBound + 1;
    this.setState({
        currentPage: listid
    });
    this.setPrevAndNextBtnClass(listid);
}
