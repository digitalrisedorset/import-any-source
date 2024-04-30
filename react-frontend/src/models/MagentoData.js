export function magentoModel(data) {
    const Magento = function(data) {
        if (data.magento === undefined) {
            this.attributes = []
        } else {
            this.attributes = data.magento.attributes
        }
    }

    Magento.prototype.setAttributes = function (data) {
        this.attributes = data;
    }

    Magento.prototype.getAttributes = function () {
        return this.attributes;
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
