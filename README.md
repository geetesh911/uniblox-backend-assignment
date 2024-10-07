# Order Management API

This project is an Order Management API built with Node.js, Express, and TypeScript. It provides endpoints for managing orders, including adding items to a cart, checking out, and generating discount codes.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Add to Cart](#add-to-cart)
  - [Checkout](#checkout)
  - [Generate Discount](#generate-discount)
  - [Get Stats](#get-stats)
- [Testing](#testing)
- [License](#license)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-repo/order-management-api.git
    cd order-management-api
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file based on the `.env.template`:

    ```sh
    cp .env.template .env
    ```

4. Build the project:

    ```sh
    npm run build
    ```

5. Start the server:

    ```sh
    npm start
    ```

## Usage

The API can be accessed at `http://localhost:3000`. You can use tools like Postman or cURL to interact with the endpoints.

## API Endpoints

### Add to Cart

- **URL:** `/api/cart/add`
- **Method:** `POST`
- **Request Body:**

    ```json
    {
      "name": "Item Name",
      "price": 100
    }
    ```

- **Response:**

    ```json
    {
      "success": true,
      "message": "Item added to cart",
      "responseObject": [
        {
          "id": "unique-item-id",
          "name": "Item Name",
          "price": 100
        }
      ]
    }
    ```

### Checkout

- **URL:** `/api/checkout`
- **Method:** `POST`
- **Request Body:**

    ```json
    {
      "discountCode": "DISCOUNT10"
    }
    ```

- **Response:**

    ```json
    {
      "success": true,
      "message": "Order placed successfully",
      "responseObject": {
        "total": 90,
        "discountApplied": true
      }
    }
    ```

### Generate Discount

- **URL:** `/api/admin/generate-discount`
- **Method:** `POST`
- **Response:**

    ```json
    {
      "success": true,
      "message": "Discount code generated",
      "responseObject": {
        "code": "NEWCODE1234"
      }
    }
    ```

### Get Stats

- **URL:** `/api/admin/stats`
- **Method:** `GET`
- **Response:**

    ```json
    {
      "success": true,
      "message": "Store Stats",
      "responseObject": {
        "itemsPurchased": 10,
        "totalPurchaseAmount": 1000,
        "discountCodes": ["CODE1", "CODE2"],
        "totalDiscountAmount": 100
      }
    }
    ```

## Testing

To run the tests, use the following command:

```sh
npm test