# Strateg In - API Documentation

This is a simple Node.js Express API that allows users to register, login and see the list of users

## Installation

1. Make sure to be in `./server` directory:

    ```bash
    cd ./server
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the tests:

    ```bash
    npm test
    ```

4. Start the server:

    ```bash
    npm start
    ```

## Base URL

<http://localhost:8080>

## Endpoints

### Register

**Endpoint:** `POST /register`

Registers a new user with the given email and password.

```bash
# Register

# Unix
curl \
    --request POST \
    --url http://localhost:8080/register \
    --header 'Content-Type: application/json' \
    --data '{ "email": "your@email.com", "password": "yourPassword" }'

# Windows Powershell
Invoke-WebRequest `
  -Uri http://localhost:8080/register `
  -Method POST `
  -ContentType 'application/json' `
  -Body '{ "email": "your@email.com", "password": "yourPassword" }'
```

**Responses:**

- `201 Created`: User registered successfully.
- `400 Bad Request`: Invalid request body.
- `409 Conflict`: Email is already used.

### Login

**Endpoint:** `POST /login`

Logs in a user with the given email and password and returns a `JWT token`.

```bash
# Login

# Unix
curl \
    --request POST \
    --url http://localhost:8080/login \
    --header 'Content-Type: application/json' \
    --data '{ "email": "your@email.com", "password": "yourPassword" }'

# Windows Powershell
Invoke-WebRequest `
    -Method POST `
    -Uri 'http://localhost:8080/login' `
    -Headers @{'Content-Type' = 'application/json'} `
    -Body '{"email": "your@email.com", "password": "yourPassword"}'
```

**Responses:**

- `200 OK`: User logged in and JWT token returned successfully.
- `400 Bad Request`: Invalid request body.
- `401 Unauthorized`: Incorrect email or password.
- `404 Not Found`: Email not Found.

### Update user

**Endpoint:** `POST /update`

Updates user's data with the given email.

```bash
# Login

# Unix
curl \
    --request POST \
    --url http://localhost:8080/update \
    --header 'Content-Type: application/json' \
    --data ' "email": "your@email.com", "newEmail": "your.new@email.com", "newPassword": "yourNewPassword" }'

# Windows Powershell
Invoke-WebRequest `
    -Method POST `
    -Uri 'http://localhost:8080/update' `
    -Headers @{'Content-Type' = 'application/json'} `
    -Body '{ "email": "your@email.com", "newEmail": "your.new@email.com", "newPassword": "yourNewPassword" }'
```

**Responses:**

- `200 OK`: User's data updated successfully.
- `400 Bad Request`: Invalid request body.
- `404 Not Found`: Email not Found.

### Delete user

**Endpoint:** `POST /delete`

Deletes a user with the given email.

```bash
# Delete user

# Unix
curl \
    --request POST \
    --url http://localhost:8080/delete \
    --header 'Content-Type: application/json' \
    --data '{ "email": "your@email.com" }'

# Windows Powershell
Invoke-WebRequest `
    -Method POST `
    -Uri 'http://localhost:8080/delete' `
    -Headers @{'Content-Type' = 'application/json'} `
    -Body '{"email": "your@email.com"}'
```

**Responses:**

- `200 OK`: User deleted successfully.
- `400 Bad Request`: Invalid request body / email is missing.
- `404 Not Found`: Email not Found.

### Get all users

**Endpoint:** `GET /users`

Insert that `JWT token` in the next command to access **/users** route and get the list of users

```bash
# Gets a list of all users

# Unix
curl \
    --request GET \
    --url http://localhost:8080/users \
    --header "Authorization: Bearer <jwtToken>"

# Windows Powershell
Invoke-WebRequest `
    -Method GET `
    -Uri 'http://localhost:8080/users' `
    -Headers @{ 'Authorization' = 'Bearer <jwtToken>' }
```

**Responses:**

- `200 OK`: List of all users returned.
- `401 Unauthorized`: JWT token missing or invalid.