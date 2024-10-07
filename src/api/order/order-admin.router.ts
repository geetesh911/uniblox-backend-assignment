import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { GenerateDiscountResSchema, GetStatsSchema, OrderSchema } from "@/api/order/order.model";
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
  responses: createApiResponse(z.array(GenerateDiscountResSchema), "Success"),
});

orderAdminRouter.post("/generate-discount", orderAdminController.generateDiscount);

orderAdminRegistry.registerPath({
  method: "get",
  path: "/api/admin/stats",
  tags: ["Order Admin"],
  responses: createApiResponse(GetStatsSchema, "Success"),
});

orderAdminRouter.get("/stats", orderAdminController.getStats);
