# Todo Backend API


## About the project
### This is a backend API using express.js, having the features of the user's signup and sign in and once the user login then the user can perform CRUD operations on tasks like Read, Update, Delete, and Create.

Base URL : 
```bash
    https://todobackend-rful.onrender.com
```

`If you want to check the functionality of this API just copy the above URL and perform the given below operations. The operations are available in API References and use those commands with this URL.`
## Features

- Having Signup and Singin Features.
- Crud Operation Feature.
- Error Handling using middleware.
- Authentication using JWT.

## Build with

- Node.js
- Express.js
- MongoDB
- JWT


## Getting Started

To use this api follow these steps, which are given below:

### 1. Installation

a. Clone the repo using cmd:
```bash
  git clone https://github.com/SumitM28/todo_api.git
```
b. Go Inside the Folder:
```bash
  cd todo_api
```
c. Install all dependencies using the command: 
```bash
  yarn add  
```
Or
```bash
  npm install  
```


### 2. Configure the .env file
```bash
  PORT = 
  MONGO_URL =  
  JWT_SECRET_KEY = 
```

`Note: Use your environment variables `


## 3. Start 
To start the project use cmd:
```bash
  npm start
```
`Server listening on port XXXX`


## How to use
To use this project install Postman or use an alternative.

### ***Here, I have used additional security for tasks CRUD operation. So only the login user can perform CRUD operation on tasks.*** 

### ***After Login you will get a token in response. So copy that token and use that token in headers like the given cmd. Otherwise you can't use the CRUD operation for the tasks.*** 
    `Authorization : token_get_from_login_response`


## API References
#### 1. Register or Signup

```https://todobackend-rful.onrender.com
  POST /api/auth/register
```
`Required these parameters pass in the body (JSON) `
| Parameter | Type     |
| :-------- | :------- |
| `name` | `string` |  
| `email` | `string` |  
| `password` | `string` |  


#### 2. Login or Sign in

```https://todobackend-rful.onrender.com
  POST /api/auth/login
```
`Required these parameters pass in the body (JSON) `
| Parameter | Type     |
| :-------- | :------- |
| `email` | `string` |  
| `password` | `string` |  

#### 3. Create Tasks

```https://todobackend-rful.onrender.com
  POST /api/task/create
```
`Required these parameters pass in the body (JSON) `
| Parameter | Type     |
| :-------- | :------- |
| `title` | `string` |  
| `description` | `string` |  
| `dueDate` | `string` |  
| `status` | `string` |  

`status can be processing or pending or completed `

#### 4. Update Tasks

```https://todobackend-rful.onrender.com
  PUT /api/task/update/:{$taskId}
```
`taskId is required`
`Pass those parameters in the body (JSON) which you want to update or change. these parameters can be just single or all of the given below`
| Parameter | Type     |
| :-------- | :------- |
| `title` | `string` |  
| `description` | `string` |  
| `dueDate` | `string` |  
| `status` | `string` |  

`status can be processing or pending or completed `

#### 5. Delete Tasks

```https://todobackend-rful.onrender.com
  DELETE /api/task/delete/:{$taskId}
```
`Just a taskId is required`

#### 6. Get Single Task

```https://todobackend-rful.onrender.com
  GET /api/task/get-single/:{$taskId}
```
`Just a taskId is required`

#### 6. Get All Task

```https://todobackend-rful.onrender.com
  GET /api/task/get-all
```
#### 7. Filter task by status

```https://todobackend-rful.onrender.com
  GET /api/task/filter?status={$status}
```
`status can be processing or pending or completed `

#### 8. Search Task using title or description

```https://todobackend-rful.onrender.com
  POST /api/task/search
```
`Pass those parameters in the body (JSON). The parameter can be title or description or both `
| Parameter | Type     |
| :-------- | :------- |
| `title` | `string` |  
| `description` | `string` |  

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please create an issue or a pull request.


## License

Distributed under the MIT License. See [LICENSE](https://github.com//E-Commerce-App/blob/main/LICENSE.md) for more information.

## Authors

* **Sumit Mahour** - *Fullstack (MERN) Developer* - [Sumit Mahour](https://github.com/SumitM28) - **

