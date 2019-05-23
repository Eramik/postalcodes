class ISearchable {
    calculateMatchRate(searchData) {
        throw new Error('The function must be implemented by derived class.');
    }
}

module.exports = ISearchable;