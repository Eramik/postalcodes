class SearchResult {
    data;
    matchRate;

    constructor(data, matchRate) {
        this.data = data;
        this.matchRate = matchRate;
    }
}

module.exports = SearchResult;