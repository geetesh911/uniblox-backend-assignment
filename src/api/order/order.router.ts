import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { AddToCartSchema, CartSchema, CheckoutResSchema, CheckoutSchema, OrderSchema } from "@/api/order/order.model";
import { validateRequest } from "@/common/utils/httpHandlers";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { orderController } from "./order.controller";

export const orderRegistry = new OpenAPIRegistry();
export const orderRouter: Router = express.Router();

orderRegistry.register("Order", OrderSchema);

orderRegistry.registerPath({
  method: "post",
  path: "/api/cart/add",
  tags: ["Order"],
  request: {
    body: {
      content: { "application/json": { schema: AddToCartSchema.shape.body } },
    },
  },
  responses: createApiResponse(z.array(CartSchema), "Success"),
});

orderRouter.post("/cart/add", validateRequest(AddToCartSchema), orderController.addToCart);

orderRegistry.registerPath({
  method: "post",
  path: "/api/checkout",
  tags: ["Order"],
  request: {
    body: {
      content: { "application/json": { schema: CheckoutSchema.shape.body } },
    },
  },
  responses: createApiResponse(CheckoutResSchema, "Success"),
});

orderRouter.post("/checkout", validateRequest(CheckoutSchema), orderController.checkout);
