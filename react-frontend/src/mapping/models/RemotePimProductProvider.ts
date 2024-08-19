import {useImmer} from "use-immer";
import Axios from "axios";
import {KeystoneProduct, RemoteProductsToCreate} from '../../types/keystone'
import {PimApiProducteResponse} from '../../types/pim'

export function RemotePimProductProvider() {
    const [state, setState] = useImmer({
        productsToCreate: []
    })

    const createKeystoneSeedProducts = async function() {
        try {
            await Axios.post('/createKeystoneImport');
        } catch (e) {
            console.log(e)
        }
    }

    const makeid = function makeid() {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 8) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    const getImageUpload = async function(url: string) {
        return fetch(url, {mode:  "cors", cache:  "no-cache", headers: {'Content-Type': 'application/json'}})
            .then(response  =>  response.blob())
            .then(blob  => {
                return  new  File([blob], `${makeid()}.jpg`, { type:  "image/jpg" })
            });
    }

    const loadProducts = async function() {
        try {
            const ourRequest = Axios.CancelToken.source()
            const response: PimApiProducteResponse = await Axios.get('/productList', { cancelToken: ourRequest.token });
            setState((draft: RemoteProductsToCreate) => {
                draft.productsToCreate = response.data.map(product => ({
                    name: product.name,
                    description: product.description,
                    status: 'AVAILABLE',
                    photo: { create: { image: getImageUpload(product?.images[0]?.src), altText: product.name } }
                } as KeystoneProduct))
            })
            ourRequest.cancel()
        } catch (e) {
            console.log(e)
        }
    }

    const hasProductsToCreate = function () {
        return getProductsToCreateCount()>0
    }

    const getProductsToCreateCount = function () {
        if (state.productsToCreate === undefined) {
            return false;
        }
        return state.productsToCreate.length
    }

    const getProductsToCreate = function () {
        return state.productsToCreate
    }

    return {
        loadProducts,
        hasProductsToCreate,
        getProductsToCreate,
        getProductsToCreateCount,
        createKeystoneSeedProducts
    }
}