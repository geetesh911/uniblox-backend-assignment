import { OrderRepository } from "@/api/order/order-repository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";
import { nanoid } from "nanoid";
import type { OrderStats } from "./order.interface";
import type { Item } from "./order.model";

export class OrderService {
  private orderRepository: OrderRepository;

  constructor(repository: OrderRepository = new OrderRepository()) {
    this.orderRepository = repository;
  }

  /**
   * Adds a new item to the cart.
   *
   * @param item Item to be added to the cart
   *
   * @returns A ServiceResponse containing the updated cart, or an error message if something went wrong.
   */
  async addToCart(item: Item): Promise<ServiceResponse<Item[]>> {
    this.orderRepository.cart.push({ ...item, id: nanoid() });

    return ServiceResponse.success<Item[]>("Item added to cart", this.orderRepository.cart);
  }

  /**
   * Creates a new order based on the current cart contents, and applies any given discount code.
   *
   * The discount code is removed from the list of available codes after use.
   *
   * If the order count is a multiple of `NTH_ORDER_FOR_DISCOUNT`, a new discount code is generated.
   *
   * The total purchase amount is updated, and the order is stored in the list of orders.
   *
   * The cart is then reset.
   *
   * @param discountCode the discount code to apply
   * @returns a service response containing the total cost of the order, and a boolean indicating whether a discount was applied
   */
  async checkout(discountCode: string): Promise<ServiceResponse<{ total: number; discountApplied: boolean }>> {
    let discount = 0;

    if (discountCode && this.orderRepository.discountCodes.includes(discountCode)) {
      discount = 0.1; // 10% discount

      this.orderRepository.discountCodes = this.orderRepository.discountCodes.filter((code) => code !== discountCode);
      this.orderRepository.totalDiscountAmount += this.calculateTotal(this.orderRepository.cart) * discount;
    }

    const total: number = this.calculateTotal(this.orderRepository.cart) * (1 - discount);

    this.orderRepository.orderCount++;
    this.orderRepository.totalPurchaseAmount += total;
    this.orderRepository.orders.push({
      id: nanoid(),
      items: [...this.orderRepository.cart],
      total,
    });

    if (this.orderRepository.orderCount % this.orderRepository.NTH_ORDER_FOR_DISCOUNT === 0) {
      const newDiscountCode: string = this.generateDiscountCode();
      this.orderRepository.discountCodes.push(newDiscountCode);
    }

    this.orderRepository.cart = [];

    return ServiceResponse.success("Order placed successfully", {
      total,
      discountApplied: discount > 0,
    });
  }

  /**
   * Generates a new discount code if the order count is a multiple of `NTH_ORDER_FOR_DISCOUNT`.
   *
   * If a new discount code is generated, it is added to the list of available codes.
   *
   * @returns a service response containing the new discount code, or null if no discount code can be generated
   */
  async generateDiscount(): Promise<ServiceResponse<{ code: string } | null>> {
    if (
      this.orderRepository.orderCount !== 0 &&
      this.orderRepository.orderCount % this.orderRepository.NTH_ORDER_FOR_DISCOUNT === 0
    ) {
      const newDiscountCode: string = this.generateDiscountCode();
      this.orderRepository.discountCodes.push(newDiscountCode);

      return ServiceResponse.success("Discount code generated", {
        code: newDiscountCode,
      });
    }

    return ServiceResponse.failure("Discount code cannot be generated", null, StatusCodes.BAD_REQUEST);
  }

  /**
   * Returns statistics about the store, including the total number of items purchased,
   * the total purchase amount, the number of discount codes, and the total discount amount.
   *
   * @returns a service response containing the store statistics
   */
  async getStats(): Promise<ServiceResponse<OrderStats | null>> {
    return ServiceResponse.success("Sotore Stats", {
      itemsPurchased: this.orderRepository.orders.reduce((total, order) => total + order.items.length, 0),
      totalPurchaseAmount: this.orderRepository.totalPurchaseAmount,
      discountCodes: this.orderRepository.discountCodes,
      totalDiscountAmount: this.orderRepository.totalDiscountAmount,
    });
  }

  private calculateTotal(items: Item[]): number {
    return items.reduce((total, item) => total + item.price, 0);
  }

  private generateDiscountCode(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }
}

export const orderService = new OrderService();
