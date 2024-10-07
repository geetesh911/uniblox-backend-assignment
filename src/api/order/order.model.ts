import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Order = z.infer<typeof OrderSchema>;
export type Item = z.infer<typeof CartSchema>;

export const CartSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
});

export const OrderSchema = z.object({
  id: z.string(),
  items: CartSchema.array(),
  total: z.number(),
});

export const CheckoutResSchema = z.object({
  total: z.number(),
  discountApplied: z.boolean(),
});

export const GenerateDiscountResSchema = z.object({
  code: z.string(),
});

// Input Validation for 'POST cart/add' endpoint
export const AddToCartSchema = z.object({
  body: z.object({
    name: z.string(),
    price: z.number(),
  }),
});

// Input Validation for 'POST checkout' endpoint
export const CheckoutSchema = z.object({
  body: z.object({
    discountCode: z.string().optional(),
  }),
});

// Input Validation for 'POST /admin/generate-discount' endpoint
export const GenerateDiscountSchema = z.object({
  body: z.object({
    code: z.string(),
  }),
});

// Input Validation for 'GET admin/stats' endpoint
export const GetStatsSchema = z.object({
  itemsPurchased: z.number(),
  totalPurchaseAmount: z.number(),
  totalDiscountAmount: z.number(),
  discountCodes: z.array(z.string()),
});
