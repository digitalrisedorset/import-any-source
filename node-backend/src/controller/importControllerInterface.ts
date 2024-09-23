import { Request, Response } from "express";
import {DrdSimpleProduct} from "../types/drd";


export type ErrorResponse = {
    "error": string
}

export type SuccessResponse = "success"

type BaseResponse<TData> = TData | ErrorResponse;

export type AttributeResponse = BaseResponse<[{
        "code": string;
        "name": string;
        "type": "unknown" | "options"
    }]>

export type ProductResponse = BaseResponse<DrdSimpleProduct[]>

export type MinimalResponse = BaseResponse<SuccessResponse>

export type CsvImportCreation = {
    filename: string,
    rows: DrdSimpleProduct[]
}

export type CsvImportCreationResponse = BaseResponse<CsvImportCreation>

export type CsvImportUpdate = {
    filename: string,
    update: number,
    rows: DrdSimpleProduct[]
}

export type CsvImportUpdateResponse = BaseResponse<CsvImportUpdate>

export type WebhookResponse = {
    delete: string,
    message: 'success'
}

export type WebhookApiResponse = BaseResponse<WebhookResponse>

export type CsvDeleteNotificationResponse = {
    filename: string,
    delete: number,
    rows: DrdSimpleProduct[]
}

export type CsvDeleteApiResponse = BaseResponse<CsvDeleteNotificationResponse>

export interface ImportControllerInterface {
    apiGetAttributeList: (req: Request, res: Response) => Promise<AttributeResponse>;

    apiGetProductList: (req: Request, res: Response) => Promise<ProductResponse>;

    setProductImported: (req: Request, res: Response) => MinimalResponse;

    createImport: (req: Request, res: Response) => Promise<CsvImportCreationResponse>;

    createUpdateImport: (req: Request, res: Response) => Promise<CsvImportUpdateResponse>;

    notifyProductDeletion: (req: Request, res: Response) => WebhookApiResponse;

    getDeleteNotification: (req: Request, res: Response) => Promise<CsvDeleteApiResponse>;

    createFeedImport: (req: Request, res: Response) => Promise<any>;
}