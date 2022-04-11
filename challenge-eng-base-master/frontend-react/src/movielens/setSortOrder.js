export default function() {
    let sortfilter = document.getElementById("sortfilter");
    let newSortOrder = sortfilter.options[sortfilter.selectedIndex].value;
    this.setState({
        sortOrder: newSortOrder
    });
    this.setUrlParams()
    this.updateSearchResults()
    return true
}
