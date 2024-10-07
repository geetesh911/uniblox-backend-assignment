import type { Item } from "@/api/order/order.model";
import type { ServiceResponse } from "@/common/models/serviceResponse";
import { app } from "@/server";
import { StatusCodes } from "http-status-codes";
import request from "supertest";

describe("Order API Endpoints", () => {
  describe("POST /api/cart/add", () => {
    it("should add an item to the cart", async () => {
      // Arrange
      const newItem = { name: "Item Name", price: 100 };

      // Act
      const response = await request(app).post("/api/cart/add").send(newItem);
      const responseBody: ServiceResponse<Item[]> = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("Item added to cart");
      expect(responseBody.responseObject).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Item Name",
            price: 100,
          }),
        ]),
      );
    });

    it("should return a bad request for invalid input", async () => {
      // Act
      const invalidItem = { name: "Item Name" }; // Missing price
      const response = await request(app).post("/api/cart/add").send(invalidItem);
      const responseBody: ServiceResponse = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain("Invalid input");
      expect(responseBody.responseObject).toBeNull();
    });
  });

  describe("POST /api/checkout", () => {
    it("should checkout the cart", async () => {
      // Arrange
      const discountCode = { discountCode: "DISCOUNT10" };

      // Act
      const response = await request(app).post("/api/checkout").send(discountCode);
      const responseBody: ServiceResponse<{
        total: number;
        discountApplied: boolean;
      }> = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("Order placed successfully");
      expect(responseBody.responseObject).toEqual(
        expect.objectContaining({
          total: expect.any(Number),
          discountApplied: expect.any(Boolean),
        }),
      );
    });

    it("should return a bad request for invalid discount code", async () => {
      // Act
      const invalidDiscountCode = { discountCode: 12345 }; // Invalid format
      const response = await request(app).post("/api/checkout").send(invalidDiscountCode);
      const responseBody: ServiceResponse = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain("Invalid input");
      expect(responseBody.responseObject).toBeNull();
    });
  });
});
