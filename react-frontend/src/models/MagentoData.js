export function magentoModel(data) {
    const Magento = function(data) {
        if (data === undefined || data.magento === undefined) {
            this.attributes = []
        } else {
            this.attributes = data.magento.attributes
        }
    }

    Magento.prototype.setAttributes = function (data) {
        this.attributes = data;
    }

    Magento.prototype.getAttributes = function () {
        const requiredAttribute = this.attributes.filter(opt => opt.required)
        const optionalAttribute = this.attributes.filter(opt => !opt.required)

        return [...requiredAttribute, ... optionalAttribute]
    }

    Magento.prototype.getListWithMapping = function () {
        const attributes = this.getAttributes()
        return attributes.filter(
            attribute => (
                attribute.assignedTo !== null && attribute.assignedTo.code !== ''
            )
        )
    }

    Magento.prototype.hasAttributes = function () {
        if (this.attributes === undefined) {
            return false;
        }
        return this.attributes.length>0
    }

    Magento.prototype.getAttributeCodeList = function () {
        if (this.hasAttributes()) {
            return this.attributes.map(attribute => ({"code":attribute.code}))
        }
    }

    return new Magento(data)
}
