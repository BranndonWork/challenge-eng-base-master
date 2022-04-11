export default function () {
    let {
        items,
        currentPage,
        resultsPerPage,
        upperPageBound,
        lowerPageBound,
        isPrevBtnActive,
        isNextBtnActive
    } = this.state;

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(items.length / resultsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((pageNumber) => {

        if (pageNumber === 1 && currentPage === 1) {
            return (
                <li
                    key={pageNumber}
                    id={pageNumber}
                    className="active pagnationNumber"
                ><a
                    href='#'
                    id={pageNumber}
                    onClick={this.updatePagenation}
                >{pageNumber}</a>
                </li>
            )
        }
        else if ((pageNumber < upperPageBound + 1) && pageNumber > lowerPageBound) {
            let liClassNames = 'pagnationNumber'
            if (Number(pageNumber) == Number(currentPage)) {
                liClassNames += ' active'
            }
            return (
                <li
                    key={pageNumber}
                    id={pageNumber}
                    className={liClassNames}
                ><a
                    href='#'
                    id={pageNumber}
                    onClick={this.updatePagenation}>{pageNumber}</a>
                </li>
            )
        }

    });

    let pageIncrementBtn = null;
    if (pageNumbers.length > upperPageBound) {
        pageIncrementBtn = <li className=''><a href='#' onClick={this.btnIncrementClick}> &hellip; </a></li>
    }

    let pageDecrementBtn = null;
    if (lowerPageBound >= 1) {
        pageDecrementBtn = <li className=''><a href='#' onClick={this.btnDecrementClick}> &hellip; </a></li>
    }

    let renderPrevBtn = null;
    let renderNextBtn = null;
    if (pageNumbers.length) {
        if (isPrevBtnActive === 'disabled') {
            renderPrevBtn = <li className={isPrevBtnActive}><span id="btnPrev" className="pagnationNumber"> Prev </span></li>
        }
        else {
            renderPrevBtn = <li className={isPrevBtnActive}><a href='#' id="btnPrev" onClick={this.btnPrevClick} className="pagnationNumber"> Prev </a></li>
        }
        if (isNextBtnActive === 'disabled') {
            renderNextBtn = <li className={isNextBtnActive}><span id="btnNext" className="pagnationNumber"> Next </span></li>
        }
        else {
            renderNextBtn = <li className={isNextBtnActive}><a href='#' id="btnNext" onClick={this.btnNextClick} className="pagnationNumber"> Next </a></li>
        }
    }

    return { renderPrevBtn, pageDecrementBtn, renderPageNumbers, pageIncrementBtn, renderNextBtn }
}