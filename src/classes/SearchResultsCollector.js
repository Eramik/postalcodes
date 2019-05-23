class SearchResultsCollector {
    _resultsAmountLimit;
    _searchResults = [];
    _minMatchRate = null;
    _minMatchRateIndex = null;

    constructor(_searchResultsLimit = 10) {
        this._searchResultsLimit = _searchResultsLimit;
    }

    get resultsAmountLimit() {
        return this._resultsAmountLimit;
    }

    set resultsAmountLimit(value) {
        if(!value || value < 1) return;
        this._resultsAmountLimit = value;
        this._searchResults = [];
    }

    get results() {
        return this._searchResults.sort((a,b) => a.matchRate - b.matchRate);
    }

    addResult(searchResult) {
        if(searchResult.matchRate === 0) {
            return;
        }

        // Init.
        if(this._searchResults.length === 0) {
            this._searchResults.push(searchResult);
            this._minMatchRate = this._searchResults[0].matchRate;
            this._minMatchRateIndex = 0;
            return;
        }

        if(this._searchResults.length < this._resultsAmountLimit) {
            this._searchResults.push(searchResult);
            return this._updateMinMatchRate();
        }

        if(searchResult.matchRate < this._minMatchRate) {
            return;
        }

        this._searchResults[this._minMatchRateIndex] = searchResult;
        return this._updateMinMatchRate();
    }

    reset() {
        this._searchResults = [];
        this._updateMinMatchRate();
    }

    _updateMinMatchRate() {
        if(this._searchResults.length === 0) {
            this._minMatchRate = null;
            this._minMatchRateIndex = null;
            return;
        }
        this._minMatchRate = this._searchResults[0].matchRate;
        this._minMatchRateIndex = 0;

        for(let i = 0; i < this._searchResults.length; i++) {
            if(this._searchResults[i].matchRate < this._minMatchRate) {
                this._minMatchRate = this._searchResults[i].matchRate;
                this._minMatchRateIndex = i;
            }
        }
    }
}

module.exports = SearchResultsCollector;