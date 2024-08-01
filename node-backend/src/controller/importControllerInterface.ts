import {Request, Response} from "express";

export interface ImportControllerInterface {
    apiGetAttributeList: (req: Request, res: Response) => Promise<void>;

    apiGetProductList: (req: Request, res: Response) => Promise<void>;

    setProductImported: (req: Request, res: Response) => void;

    createImport: (req: Request, res: Response) => Promise<void>;

    createUpdateImport: (req: Request, res: Response) => Promise<void>;

    notifyProductDeletion: (req: Request, res: Response) => void;

    getDeleteNotification: (req: Request, res: Response) => Promise<void>;
}