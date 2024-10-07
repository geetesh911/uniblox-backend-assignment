import type { Request, RequestHandler, Response } from "express";

import { orderService } from "@/api/order/order.service";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class OrderController {
  public addToCart: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await orderService.addToCart(req.body);

    return handleServiceResponse(serviceResponse, res);
  };

  public checkout: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await orderService.checkout(req.body?.discountCode);

    return handleServiceResponse(serviceResponse, res);
  };
}

export const orderController = new OrderController();
