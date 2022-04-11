export default function(event) {
    event.preventDefault()
    event.stopPropagation()
    this.setUrlParams()
    this.updateSearchResults()
}
