import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import {
  GenerateDiscountResSchema,
  GenerateDiscountSchema,
  GetStatsSchema,
  OrderSchema,
} from "@/api/order/order.model";
import { validateRequest } from "@/common/utils/httpHandlers";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { orderAdminController } from "./order-admin.controller";

export const orderAdminRegistry = new OpenAPIRegistry();
export const orderAdminRouter: Router = express.Router();

orderAdminRegistry.register("Order Admin", OrderSchema);

orderAdminRegistry.registerPath({
  method: "post",
  path: "/api/admin/generate-discount",
  tags: ["Order Admin"],
  request: {
    body: {
      content: {
        "application/json": { schema: GenerateDiscountSchema.shape.body },
      },
    },
  },
  responses: createApiResponse(z.array(GenerateDiscountResSchema), "Success"),
});

orderAdminRouter.post(
  "/generate-discount",
  validateRequest(GenerateDiscountSchema),
  orderAdminController.generateDiscount,
);

orderAdminRegistry.registerPath({
  method: "get",
  path: "/api/admin/stats",
  tags: ["Order Admin"],
  responses: createApiResponse(GetStatsSchema, "Success"),
});

orderAdminRouter.get("/stats", orderAdminController.getStats);
