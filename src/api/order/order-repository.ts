import type { Item, Order } from "./order.model";

const cart: Item[] = [];
const orders: Order[] = [];
const discountCodes: string[] = [];
const totalPurchaseAmount = 0;
const totalDiscountAmount = 0;
const orderCount = 0;
const NTH_ORDER_FOR_DISCOUNT: number = 3;

export class OrderRepository {
  public cart: Item[] = [];
  public orders: Order[] = [];
  public discountCodes: string[] = [];
  public totalPurchaseAmount = 0;
  public totalDiscountAmount = 0;
  public orderCount = 0;
  public readonly NTH_ORDER_FOR_DISCOUNT: number = 3;
}
