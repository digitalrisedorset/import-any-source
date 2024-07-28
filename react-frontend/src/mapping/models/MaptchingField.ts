import {MagentoAttribute, PimAttribute} from "../../types/keystone";

interface MappingData {
    matching: {
        attributes: MagentoAttribute[];
        initialAttribute? : PimAttribute
    }
}

export class MatchingModel {
    private MAX_MATCHES = 5;

    private initialAttribute: PimAttribute | undefined

    private attributes: MagentoAttribute[] = []

    constructor(data: MappingData) {
        if (data.matching !== undefined) {
            this.attributes = data.matching.attributes
            this.initialAttribute = data.matching.initialAttribute
        }
    }

    getInitialAttribute(): PimAttribute | undefined {
        return this.initialAttribute
    }

    getNumberMatch() {
        if (!this.hasAttributes()) {
            return 0
        }

        return Math.max(this.attributes.length, this.MAX_MATCHES)
    }

    getParams() {
        return {match: this.getAttributes(), initialAttribute: this.initialAttribute}
    }

    setAttributes(data: MappingData) {
        //this.attributes = data.match
        //this.initialAttribute = data.initialAttribute
    }

    getAttributes() {
        return this.attributes.slice(0, this.MAX_MATCHES).map((attribute: MagentoAttribute) => ({
            code: attribute.code,//?? attribute.value,
            name: attribute.name//?? attribute.label
        }));
    }

    hasAttributes(): boolean {
        if (this.attributes === undefined) {
            return false;
        }
        return this.attributes.length>0
    }
}
