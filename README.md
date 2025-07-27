# vue-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# 後端API規格

---

## API 文件（Swagger 樣式）

---

### 1. Line Webhook

#### POST `/line/webhook`

- **說明**：Line Bot Webhook 入口
- **授權**：不需
- **Request Body**（Line 官方格式，範例）：
  ```json
  {
    "events": [
      {
        "type": "message",
        "source": { "userId": "string" },
        "message": { "type": "text", "text": "string" }
      }
    ]
  }
  ```
- **Response**：
  - 200 OK
  - 400 Bad Request

---

### 2. 用戶註冊

#### POST `/auth/register`

- **說明**：註冊新用戶
- **授權**：不需
- **Request Body**：
  ```json
  {
    "username": "string",
    "password": "string",
    "email": "string"
  }
  ```
- **Response**：
  - 200 OK
    ```json
    {
      "user": {
        "id": 1,
        "username": "string",
        "email": "string"
      }
    }
    ```
  - 400/409/500 錯誤訊息

---

### 3. 用戶登入

#### POST `/auth/login`

- **說明**：用戶登入
- **授權**：不需
- **Request Body**：
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response**：
  - 200 OK
    ```json
    {
      "token": "jwt_token"
    }
    ```
  - 400/401/500 錯誤訊息

---

### 4. 取得所有用戶

#### GET `/api/users`

- **說明**：取得所有用戶
- **授權**：需要 JWT
- **Header**：
  ```
  Authorization: Bearer <token>
  ```
- **Query**（可選）：
  - `keyword`：模糊搜尋用戶名或 email
- **Response**：
  - 200 OK
    ```json
    {
      "users": [
        {
          "id": 1,
          "username": "string",
          "email": "string"
        }
      ]
    }
    ```
  - 401/500 錯誤訊息

---

### 5. 取得單一用戶

#### GET `/api/users/{id}`

- **說明**：依 ID 取得用戶
- **授權**：需要 JWT
- **Header**：
  ```
  Authorization: Bearer <token>
  ```
- **Path Param**：
  - `id`：用戶 ID
- **Response**：
  - 200 OK
    ```json
    {
      "user": {
        "id": 1,
        "username": "string",
        "email": "string"
      }
    }
    ```
  - 404/401 錯誤訊息

---

### 6. 刪除用戶

#### DELETE `/api/users/{id}`

- **說明**：依 ID 刪除用戶
- **授權**：需要 JWT
- **Header**：
  ```
  Authorization: Bearer <token>
  ```
- **Path Param**：
  - `id`：用戶 ID
- **Response**：
  - 200 OK
    ```json
    {
      "message": "成功刪除用戶"
    }
    ```
  - 404/401/500 錯誤訊息

---

### 7. 更改密碼

#### POST `/api/change-password`

- **說明**：更改密碼
- **授權**：需要 JWT
- **Header**：
  ```
  Authorization: Bearer <token>
  ```
- **Request Body**：
  ```json
  {
    "old_password": "string",
    "new_password": "string"
  }
  ```
- **Response**：
  - 200 OK
    ```json
    {
      "message": "密碼更改成功"
    }
    ```
  - 400/401/500 錯誤訊息

---

### 8. 新增商品

#### POST `/api/products`

- **說明**：新增商品
- **授權**：需要 JWT
- **Header**：
  ```
  Authorization: Bearer <token>
  ```
- **Request Body**（依 models.Product 結構）：
  ```json
  {
    "name": "string",
    "price": 100,
    "category_id": 1,
    "description": "string"
  }
  ```
- **Response**：
  - 200 OK
    ```json
    {
      "message": "成功新增商品",
      "product": { ... }
    }
    ```
  - 400/401/500 錯誤訊息

---

### 9. 新增分類

#### POST `/api/categories`

- **說明**：新增分類
- **授權**：需要 JWT
- **Header**：
  ```
  Authorization: Bearer <token>
  ```
- **Request Body**（依 models.Category 結構）：
  ```json
  {
    "name": "string",
    "description": "string"
  }
  ```
- **Response**：
  - 200 OK
    ```json
    {
      "message": "成功新增分類",
      "category": { ... }
    }
    ```
  - 400/401/500 錯誤訊息

---

如果你需要更細的 models 結構（如 Product、Category 欄位），或要轉成 Swagger YAML/JSON 檔案格式，請告訴我！
