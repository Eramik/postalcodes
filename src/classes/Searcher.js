const SearchResultsCollector = require('./SearchResultsCollector');
const SearchResult = require('./SearchResult');
const PostalCodeEntry = require('./PostalCodeEntry');

class Searcher {
    database;
    _searchResultsCollector = new SearchResultsCollector();;

    constructor(database) {
        if(!database) {
            throw new Error('Missing required argument: database');
        }
        this.database = database;
        for(let key in this.database) {
            this.database[key].__proto__ = PostalCodeEntry.prototype;
        }
    }

    search(searchParams) {
        this._searchResultsCollector.resultsAmountLimit = searchParams.resultsLimit;
        for(let i = 0; i < this.database.length; i++) {
            let record = this.database[i];
            let result = new SearchResult(record, record.calculateMatchRate(searchParams.searchData));
            this._searchResultsCollector.addResult(result);
        }
        return this._searchResultsCollector.results;
    }
}

module.exports = Searcher;