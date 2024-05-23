import {MagentoAttribute, WoocommerceAttributeData} from "../types/keystone";

export class MagentoAttributeProvider {
    private attributes: MagentoAttribute[];

    constructor(attributes: MagentoAttribute[]) {
        this.attributes = attributes
    }

    public getAttributes() {
        const requiredAttribute = this.attributes.filter(opt => opt.required)
        const optionalAttribute = this.attributes.filter(opt => !opt.required)

        return [...requiredAttribute, ...optionalAttribute]
    }

    public getListWithMapping() {
        const attributes = this.getAttributes()
        return attributes.filter(
            attribute => (
                attribute.assignedTo !== null && attribute.assignedTo.code !== ''
            )
        )
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