const ISearchable = require('./ISearcheable');

class PostalCodeEntry extends ISearchable {
    countryCode;
    postalCode;
    placeName;
    region;
    community;

    constructor(data = {}) {
        super();
        this.countryCode = data.countryCode | null;
        this.postalCode = data.postalCode | null;
        this.placeName = data.placeName | null;
        this.region = data.region | null;
        this.community = data.community | null;
    }

    calculateMatchRate(searchData) {
        var matchRate = 0;
        for(let searchKey in searchData) {
            matchRate += this._calculatePartialMatchRate(this[searchKey], searchData[searchKey]);
        }
        return matchRate;
    }

    _calculatePartialMatchRate(text, searchText) {
        console.log('text: ', text);
        return text.toString().search(searchText) !== -1 ? 1 : 0;
    }
}

module.exports = PostalCodeEntry;