import Axios from "axios";

export function mappingModel(wocommerceList, magentoList) {
    const Mapping = function (wocommerceList, magentoList) {
        this.wocommerceList = wocommerceList
        this.magentoList = magentoList
    }

    Mapping.prototype.createAttributesImport = async function() {
        try {
            const fields = this.getFieldList()
            const response = await Axios.post(
                '/createWoocommerceImport',
                {'mapping':fields }
            );
        } catch (e) {
            console.log(e)
        }
    }

    Mapping.prototype.getFieldList = function () {
        return this.wocommerceList.map(attribute => ({
            woocommerceFieldCode: attribute.code,
            magentoLinkedCode: this.getMagentoFieldCode(attribute.code)
        }))
    }

    Mapping.prototype.getMagentoFieldCode = function (woocommerceFieldCode) {
        const field = this.magentoList.filter(
            attribute => attribute.assignedTo.code === woocommerceFieldCode
        );

        return field[0].code
    }

    return new Mapping(wocommerceList, magentoList)
}

