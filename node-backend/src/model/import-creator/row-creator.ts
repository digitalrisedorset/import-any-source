import {
    InitialProductData,
    DrdProduct, DrdProductFieldCase,
} from "../../types/drd";
import { ImportMappingFields } from "../../types/general";
import { HeaderField } from "../../types/general";
import { MagentoProductFieldMap } from "../../types/magento";
import { DrdDataMapper } from "../drd/data-mapper";
import { MagentoData } from '../magento-data'

export class ImportRowCreator {
    drdDataMapper = new DrdDataMapper()
    magentoData = new MagentoData()

    getSkuRecord = function (record: Readonly<DrdProduct>) {
        let sku = record['sku'];
        if (sku === '') {
            sku = record['name'].replace(/[/\\?%*:|"<>]/g, '-')
        }

        return sku
    }

    createHeader = async (mappingFields: Readonly<ImportMappingFields>) => {
        return this.drdDataMapper.setMappingFields(mappingFields)
            .then(() => {
                return this.drdDataMapper.getMagentoCsvHeader()
            })
    }

    createHeaderFromCache = () => {
        this.drdDataMapper.getMagentoFieldsFromCache()

        return this.drdDataMapper.getMagentoCsvHeader()
    }

    getMappingFields = async () => {
        return await this.drdDataMapper.getMagentoFieldsFromCache();
    }

    createCsvRow = async (record: Readonly<DrdProduct>) => {
        const header: HeaderField[] = this.drdDataMapper.getMagentoCsvHeader()

        let row: InitialProductData = this.magentoData.getInitialData()

        header.forEach(async (field: HeaderField) => { // key should be of type validDrdProductKeys
            // https://www.totaltypescript.com/iterate-over-object-keys-in-typescript
            const magentoFieldCode: string = field.id;
            const catalogSourceFieldCode = this.drdDataMapper.getDrdField(magentoFieldCode)

            if (magentoFieldCode === 'sku') {
                row[magentoFieldCode] = this.getSkuRecord(record)
            } else if (catalogSourceFieldCode) {
                row[magentoFieldCode] = await this.drdDataMapper.getMagentoValue(record, catalogSourceFieldCode, magentoFieldCode)
                if (magentoFieldCode === 'image') {
                    row['thumbnail'] = row[magentoFieldCode]
                    row['small_image'] = row[magentoFieldCode]
                }
            }
        })

        row['product_type'] = (record['variations'] === undefined || record['variations'].length === 0) ? 'simple' : 'configurable'

        return row
    }
}