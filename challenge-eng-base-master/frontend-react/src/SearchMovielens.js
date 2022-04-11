import React, { Component } from "react";
import btnDecrementClick from "./movielens/btnDecrementClick"
import btnIncrementClick from "./movielens/btnIncrementClick"
import btnNextClick from "./movielens/btnNextClick"
import btnPrevClick from "./movielens/btnPrevClick"
import filterListByGenre from "./movielens/filterListByGenre"
import handleEnterKeypress from "./movielens/handleEnterKeypress"
import renderActiveGenre from "./movielens/renderActiveGenre"
import renderItems from "./movielens/renderItems"
import renderPagnationButtons from "./movielens/renderPagnationButtons"
import setGenreFilter from "./movielens/setGenreFilter"
import setPrevAndNextBtnClass from "./movielens/setPrevAndNextBtnClass"
import setSortOrder from "./movielens/setSortOrder"
import setUrlParams from "./movielens/setUrlParams"
import submitForm from "./movielens/submitForm"
import updateFormFromUrlParams from "./movielens/updateFormFromUrlParams"
import updatePagenation from "./movielens/updatePagenation"
import updateSearchInputValue from "./movielens/updateSearchInputValue"
import updateSearchResults from "./movielens/updateSearchResults"

class SearchMovieLens extends Component {
    state = {
        sortOrder: 'desc',
        genreFilter: '',
        items: [],
        unfilteredItems: [],
        searchInput: '',
        currentPage: 1,
        resultsPerPage: 6,
        upperPageBound: 6,
        lowerPageBound: 0,
        isPrevBtnActive: 'disabled',
        isNextBtnActive: '',
        pageBound: 6
    };

    btnDecrementClick = btnDecrementClick.bind(this)
    btnIncrementClick = btnIncrementClick.bind(this)
    btnNextClick = btnNextClick.bind(this)
    btnPrevClick = btnPrevClick.bind(this)
    filterListByGenre = filterListByGenre.bind(this)
    handleEnterKeypress = handleEnterKeypress.bind(this)
    renderActiveGenre = renderActiveGenre.bind(this)
    renderItems = renderItems.bind(this)
    renderPagnationButtons = renderPagnationButtons.bind(this)
    setGenreFilter = setGenreFilter.bind(this)
    setPrevAndNextBtnClass = setPrevAndNextBtnClass.bind(this)
    setSortOrder = setSortOrder.bind(this)
    setUrlParams = setUrlParams.bind(this)
    submitForm = submitForm.bind(this)
    updateFormFromUrlParams = updateFormFromUrlParams.bind(this)
    updatePagenation = updatePagenation.bind(this)
    updateSearchInputValue = updateSearchInputValue.bind(this)
    updateSearchResults = updateSearchResults.bind(this)


    componentDidMount() {
        this.updateFormFromUrlParams()
    }

    render() {
        const { renderPrevBtn, pageDecrementBtn, renderPageNumbers, pageIncrementBtn, renderNextBtn } = this.renderPagnationButtons()
        return (
            <div>
                <div>
                    <form onSubmit={this.updateSearchResults} >
                        <div className="filter">
                            <div className="searchInput">Search: <input aria-label="searchInputField" id="searchInputField" type="text" placeholder="Search Movies" value={this.state.searchInput} onBlur={this.updateSearchResults} onKeyDown={this.handleEnterKeypress} onChange={this.updateSearchInputValue} /></div>
                            <div className="sortOrderInput">Sort by: &nbsp;
                                <select aria-label="sortOrderInput" id="sortfilter" onChange={this.setSortOrder}>
                                    <option aria-label="sortOrderDesc" value="desc">Rating: High to Low</option>
                                    <option aria-label="sortOrderAsc" value="asc">Rating: Low to High</option>
                                </select>
                            </div>
                            <div aria-label="genreDisplay" className="genreDisplay">Genre: {this.renderActiveGenre()}</div>
                        </div>
                        <input type="submit" value="Submit" hidden />
                    </form>
                    <div>
                        {this.renderItems()}
                    </div>
                </div>

                <div className="paginationWrapper">
                    <ul id="pageNumbers" className="pagination">
                        {renderPrevBtn}
                        {pageDecrementBtn}
                        {renderPageNumbers}
                        {pageIncrementBtn}
                        {renderNextBtn}
                    </ul>
                </div>
            </div>
        );
    }


}

export default SearchMovieLens;