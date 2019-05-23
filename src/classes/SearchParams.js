class SearchParams {
    resultsLimit;
    searchData;

    constructor(searchData, resultsLimit = 10) {
        if(!searchData) {
            throw new Error('Missing required argument: searchData');
        }
        this.searchData = searchData;
        this.resultsLimit = resultsLimit;
    }
}

module.exports = SearchParams;