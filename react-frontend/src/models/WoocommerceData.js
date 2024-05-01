export function woocommerceModel(data) {
    const Woocommerce = function(data) {
        if (data === undefined || data.woocommerce === undefined) {
            this.attributes = []
        } else {
            this.attributes = data.woocommerce.attributes
        }
    }

    Woocommerce.prototype.setAttributes = function (data) {
        this.attributes = data;
    }

    Woocommerce.prototype.getAttributes = function () {
        const requiredAttribute = this.attributes.filter(opt => opt.required)
        const optionalAttribute = this.attributes.filter(opt => !opt.required)

        return [...requiredAttribute, ... optionalAttribute]
    }

    Woocommerce.prototype.getListWithMapping = function () {
        const attributes = this.getAttributes()
        return attributes.filter(attribute => attribute.magentoCode!== null && attribute.magentoCode.code !== '')
    }

    Woocommerce.prototype.hasAttributes = function () {
        if (this.attributes === undefined) {
            return false;
        }
        return this.attributes.length>0
    }

    Woocommerce.prototype.getAttributeCodeList = function () {
        if (this.hasAttributes()) {
            return this.attributes.map(attribute => ({"code":attribute.code}))
        }
    }

    return new Woocommerce(data)
}