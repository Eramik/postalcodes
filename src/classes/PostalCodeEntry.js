const ISearchable = require('./ISearcheable');
const {transliterate} = require('transliteration');

class PostalCodeEntry extends ISearchable {
    countryCode;
    postalCode;
    placeName;
    region;
    community;

    constructor(data = {}) {
        super();
        this.countryCode = data.countryCode || null;
        this.postalCode = data.postalCode || null;
        this.placeName = data.placeName || null;
        this.region = data.region || null;
        this.community = data.community || null;
    }

    calculateMatchRate(searchData) {
        var matchRate = 0;
        for(let searchKey in searchData) {
            matchRate += this._calculatePartialMatchRate(this[searchKey], searchData[searchKey]);
        }
        return matchRate;
    }

    __mod(x) {
        return x > 0 ? x : x * (-1);
    }

    _calculatePartialMatchRate(text, searchText) {
        if(!text || !searchText) return 0;
        let rawMatchPts = 0;
        let t = transliterate(text).toLowerCase().split('');
        let s = transliterate(searchText).toLowerCase().split('');
        for(let i = 0; i < s.length; i++) {
            let index = t.indexOf(s[i]);
            if(index === -1) continue;
            t[index] = null;
            rawMatchPts += 1 / (this.__mod(i - index) + 1);
        }
        if(rawMatchPts === 0) return 0;
        let maxLen = this.__maxLen(t,s);
        let pts = rawMatchPts * 100 / maxLen;
        return pts;
    }

    __minLen(s1, s2) {
        let l1 = s1.length;
        let l2 = s2.length;
        if(l1 < l2) {
            return l1;
        }
        return l2;
    }

    __maxLen(s1, s2) {
        let l1 = s1.length;
        let l2 = s2.length;
        if(l1 > l2) {
            return l1;
        }
        return l2;
    }
}

module.exports = PostalCodeEntry;