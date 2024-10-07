import type { Request, RequestHandler, Response } from "express";

import { orderService } from "@/api/order/order.service";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class OrderAdminController {
  public generateDiscount: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await orderService.generateDiscount();

    return handleServiceResponse(serviceResponse, res);
  };

  public getStats: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await orderService.getStats();

    return handleServiceResponse(serviceResponse, res);
  };
}

export const orderAdminController = new OrderAdminController();
