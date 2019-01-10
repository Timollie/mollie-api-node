import { startsWith } from 'lodash';

import Resource from '../../resource';
import Order from '../../models/Order';
import List from '../../models/List';
import {
  ICancelParams,
  ICreateParams,
  IGetParams,
  IListParams,
  IUpdateParams,
} from '../../types/order/params';
import {
  CancelCallback,
  CreateCallback,
  GetCallback,
  ListCallback,
  UpdateCallback,
} from '../../types/order/callback';

/**
 * The `orders` resource
 *
 * @since 2.2.0
 */
export default class Orders extends Resource {
  public resource = 'orders';
  public model = Order;
  public apiName = 'Orders API';

  // API METHODS

  /**
   * Using the Orders API is the preferred approach when integrating
   * the Mollie API into e-commerce applications such as webshops.
   * If you want to use pay after delivery methods such as Klarna Pay later,
   * using the Orders API is mandatory.
   *
   * Creating an order will automatically create the required payment to allow
   * your customer to pay for the order.
   *
   * Once you have created an order, you should redirect your customer to the
   * URL in the _links.checkout property from the response.
   *
   * Note that when the payment fails, expires or is canceled, you can create
   * a new payment using the Create order payment API. This is only possible
   * for orders that have a created status.
   *
   * @param params - Create Order parameters
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of
   *             the returned `Promise` object
   *
   * @returns The newly created Order
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/create-order
   * @public ✓ This method is part of the public API
   */
  public async create(params: ICreateParams, cb?: CreateCallback): Promise<Order> {
    return super.create(params, cb) as Promise<Order>;
  }

  /**
   * Retrieve an Order.
   *
   * @param id - Order ID
   * @param params - Get Order parameters
   *                 (DEPRECATED SINCE 2.2.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The Order
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/get-order
   * @public ✓ This method is part of the public API
   */
  public async get(id: string, params: IGetParams | GetCallback, cb?: GetCallback): Promise<Order> {
    if (!startsWith(id, Order.resourcePrefix)) {
      Resource.errorHandler(
        Resource.errorHandler({ error: { message: 'The order id is invalid' } }, cb),
      );
    }

    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      return super.get(
        id,
        typeof params === 'function' ? null : params,
        typeof params === 'function' ? params : cb,
      ) as Promise<Order>;
    }

    return super.get(id, params, cb) as Promise<Order>;
  }

  /**
   * List Orders.
   *
   * @param params - List Order parameters
   *                 (DEPRECATED SINCE 2.2.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of the Orders found
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/list-orders
   * @public ✓ This method is part of the public API
   */
  public async list(params?: IListParams | ListCallback, cb?: ListCallback): Promise<List<Order>> {
    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      return super.list(
        typeof params === 'function' ? null : params,
        typeof params === 'function' ? params : cb,
      ) as Promise<List<Order>>;
    }

    return super.list(params, cb) as Promise<List<Order>>;
  }

  /**
   * Update an Order.
   *
   * @param id - Order ID
   * @param data - Update Order parameters
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The updated Order
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/update-order
   * @public ✓ This method is part of the public API
   */
  public async update(id: string, data: IUpdateParams, cb?: UpdateCallback): Promise<Order> {
    if (!startsWith(id, Order.resourcePrefix)) {
      Resource.errorHandler(
        Resource.errorHandler({ error: { message: 'The order id is invalid' } }, cb),
      );
    }

    return super.update(id, data, cb) as Promise<Order>;
  }

  /**
   * Cancel an Order.
   *
   * @param id - Order ID
   * @param params - Cancel Order parameters
   *                 (DEPRECATED SINCE 2.2.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 2.2.0) Callback object, can be used instead of the returned `Promise` object
   *
   * @returns Updated Order object
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/cancel-order
   * @public ✓ This method is part of the public API
   */
  public async cancel(
    id: string,
    params?: ICancelParams | CancelCallback,
    cb?: CancelCallback,
  ): Promise<Order> {
    if (!startsWith(id, Order.resourcePrefix)) {
      Resource.errorHandler(
        Resource.errorHandler({ error: { message: 'The order id is invalid' } }, cb),
      );
    }

    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      return super.delete(
        id,
        typeof params === 'function' ? null : params,
        typeof params === 'function' ? params : cb,
      ) as Promise<Order>;
    }

    return super.delete(id, params, cb) as Promise<Order>;
  }

  // ALIASES

  /**
   * Cancel an Order.
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/cancel-order
   * @public ✓ This method is part of the public API
   * @alias cancel
   */
  delete = this.cancel;

  /**
   * List Orders.
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/list-orders
   * @public ✓ This method is part of the public API
   * @alias list
   */
  all = this.list;
}