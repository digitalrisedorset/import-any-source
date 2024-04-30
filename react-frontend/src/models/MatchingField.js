export function matchingModel(data) {

    const MAX_MATCHES = 5;
    const Matching = function(data) {
        if (data.matching === undefined) {
            this.attributes = []
            this.initialAttribute = null
        } else {
            this.attributes = data.matching.attributes
            this.initialAttribute = data.matching.initialAttribute
        }
    }

    Matching.prototype.getInitialAttribute = function () {
        return this.initialAttribute
    }

    Matching.prototype.getNumberMatch = function () {
        if (!this.hasAttributes()) {
            return 0
        }

        return Math.max(this.initialAttribute.length, MAX_MATCHES)
    }

    Matching.prototype.getParams = function () {
        return {match: this.getAttributes(), initialAttribute: this.initialAttribute}
    }

    Matching.prototype.setAttributes = function (data) {
        this.attributes = data.match
        this.initialAttribute = data.initialAttribute
    }

    Matching.prototype.getAttributes = function () {
        return this.attributes.slice(0, MAX_MATCHES).map((attribute) => ({
            code: attribute.code?? attribute.value,
            name: attribute.name?? attribute.label
        }));
    }

    Matching.prototype.hasAttributes = function () {
        if (this.attributes === undefined) {
            return false;
        }
        return this.attributes.length>0
    }

    return new Matching(data)
}
