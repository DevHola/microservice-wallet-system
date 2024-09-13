# E-Wallet Backend System
# Overview
This is the backend system for the E-Wallet application, built with a microservices architecture to ensure scalability and maintainability. The system is composed of several microservices, including the Auth microservice for authentication and token management, the Wallet microservice for managing wallet operations and in-app transactions between users, the Processing microservice for handling external funding and withdrawals, and the Mail microservice for sending emails.

# Table of Contents
  * Overview
  * Features
  * Technologies Used
  * Installation
  * Usage
  * Contributing

# Features
* User authentication and authorization with JWT
* Wallet creation and management
* In-app transactions (transfer and money requests between users)
* External funding and withdrawals
* Email notifications
* Microservices architecture for better scalability
* API Gateway for routing requests to appropriate services
* RabbitMQ for message queuing
* Redis for token management and rotation

# Technologies Used
* Node.js
* Express
* PostgreSQL
* Docker
* RabbitMQ
* Redis
* Jest
* Supertest
* TypeScript
* JWT for authentication

# Installation
## Setup Instructions

1. **Clone the repository**:
    ```bash
    git clone https://github.com/DevHola/microservice-wallet-system.git
    cd e-wallet-backend
    ```

2. **Install dependencies for each microservice**:
    ```bash
    cd auth-service
    npm install
    cd ../wallet-service
    npm install
    cd ../processing-service
    npm install
    cd ../mail-service
    npm install
    cd ../mail-service
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in each microservice directory and configure the following variables:

    ```env
    # Common variables
    DATABASE_URL=your_database_url
    JWT_SECRET=your_jwt_secret
    RABBITMQ_URL=your_rabbitmq_url
    REDIS_URL=your_redis_url
    DBUSER= ''
    DBPASSWORD= ''
    DBHOST= 'localhost'
    DBPORT= ''
    DATABASE= ''

    # Auth service
    The Auth service has a separate repository. Clone and set it up from https://github.com/DevHola/Authentication-Microservice-Boilerplate.

    PORT=3001
    PORTDEV=3000
    AUTH_REFRESH_TOKEN_SECRET=''
    AUTH_REFRESH_TOKEN_EXPIRY=3600s
    AUTH_ACCESS_TOKEN_SECRET=''
    AUTH_REFRESH_TOKEN_EXPIRY=1800s

    AUTH_ACCESS_TOKEN_EXPIRY=60s
    AUTH_RESET_TOKEN_SECRET=''
    RESET_PASSWORD_TOKEN_EXPIRY_MINS=5
    FRONTEND_URL= ''
    REDIS_URL=''
    MQCONNECTURL= ''



    # Gateway
    AVURL=''

    # Wallet service
    PORT=3001
    MQCONNECTURL=''
    AUTH_ACCESS_TOKEN_SECRET=''
    PAYSTACK_SECRET=''


    # Processing service
    PORT=3003
    MQCONNECTURL=''
    AUTH_ACCESS_TOKEN_SECRET=''
    PAYSTACK_SECRET=''


    # Mail service
    PORT=6000
    MAIL_HOST=''
    MAIL_USER=''
    MAIL_PASS=''
    MAIL_PORT=2525
    FROM=''
    FRONTEND_URL=''
    MQCONNECTURL=''

    ```

4. **Start the services using Docker**:
    ```bash
    docker-compose up --build
    ```

## Usage

The API Gateway routes requests to the appropriate microservice. Use Postman or any API client to interact with the endpoints. Ensure the services are running and accessible through their respective ports.

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature
    ```
3. Make your changes.
4. Commit your changes:
    ```bash
    git commit -m 'Add some feature'
    ```
5. Push to the branch:
    ```bash
    git push origin feature/your-feature
    ```
6. Open a Pull Request.
