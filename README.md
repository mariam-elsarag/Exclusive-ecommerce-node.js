# Exclusive-ecommerce-node.js

A simple ecommerce application built with Node.js, providing essential features for an online shopping experience.

## Features

- **Product Management**: View a wide range of products with detailed descriptions.
- **Add to Cart**: Add items to your cart for easy checkout.
- **Favorites**: Save your favorite products for later.
- **Authentication**:
  - Secure user authentication using **JWT (JSON Web Tokens)**.
  - Support for **refresh tokens** to maintain user sessions securely.
- **Payment Integration**: Secure payments using Stripe.
- **Reviews**:
  - Only users who have purchased a product can leave a review.
  - Users can update their review if they make another purchase of the same product.
- **Order Management**: Place orders and track them easily.

## Postman Documentation

For detailed API documentation and usage examples, please refer to the [Postman Documentation](https://documenter.getpostman.com/view/39898064/2sAYBd67XC).

## Environment Variables

The following environment variables are required to configure and run the application correctly. Make sure to add them to your `.env` file:

### General

- **`NODE_ENV`**: Set to `"production"` or `"development"` depending on the environment.

### Database Configuration

- **`DATABASE`**: Connection string for your database.
- **`DATABASE_PASSWORD`**: Password for the database.

### Token Configuration

- **`JWT_SECRET`**: Secret key for signing JSON Web Tokens.
- **`JWT_EXPIRE_IN`**: Expiration time for access tokens (in minutes).
- **`JWT_REFRESH_TOKEN_EXPIRE_IN`**: Expiration time for refresh tokens (in minutes).

### Cloudinary Configuration

- **`CLOUDNARY_CLOUD_NAME`**: Your Cloudinary cloud name.
- **`CLOUDNARY_API_KEY`**: API key for Cloudinary.
- **`CLOUDNARY_SECRET_KEY`**: Secret key for Cloudinary.

### Twilio Configuration

- **`TWILLO_ACCOUNT_SID`**: Twilio Account SID.
- **`TWILLO_AUTH_TOKEN`**: Twilio Auth Token.
- **`TWILLO_NUMBER`**: Twilio phone number.

### Stripe Configuration

- **`STRIPE_SECRET_KEY`**: Secret key for Stripe payments.

### Frontend Server

- **`FRONT_SERVER`**: URL for the frontend server.

### Example `.env` File

```env
NODE_ENV="production"
# NODE_ENV="development"

# for Db connections
DATABASE=""
DATABASE_PASSWORD=""

# for token
JWT_SECRET=""
JWT_EXPIRE_IN=30
JWT_REFRESH_TOKEN_EXPIRE_IN=60

# for cloudinary connections
CLOUDNARY_CLOUD_NAME=""
CLOUDNARY_API_KEY=""
CLOUDNARY_SECRET_KEY=""

# for twilio connections
TWILLO_ACCOUNT_SID=""
TWILLO_AUTH_TOKEN=""
TWILLO_NUMBER=""

# for stripe connections
STRIPE_SECRET_KEY=""

FRONT_SERVER=""
```
