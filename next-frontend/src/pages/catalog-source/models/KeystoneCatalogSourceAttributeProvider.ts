import {KeystoneCatalogSourceAttribute} from "../../types/keystone";

export class CatalogSourceAttributeProvider {
    private attributes: KeystoneCatalogSourceAttribute[];

    constructor(attributes: KeystoneCatalogSourceAttribute[]) {
        this.attributes = attributes
    }

    public getAttributes() {
        const requiredAttribute = this.attributes.filter(opt => opt.required)
        const optionalAttribute = this.attributes.filter(opt => !opt.required)

        return [...requiredAttribute, ...optionalAttribute]
    }

    public getListWithMapping() {
        const attributes = this.getAttributes()
        return attributes.filter(attribute => attribute.magentoCode!== null && attribute.magentoCode.code !== '')
    }

    public hasAttributes() {
        if (this.attributes === undefined) {
            return false;
        }
        return this.attributes.length>0
    }

    public getAttributeCodeList() {
        if (this.hasAttributes()) {
            return this.attributes.map(attribute => ({"code":attribute.code}))
        }
    }
}