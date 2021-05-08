# Description

A simple Api for CRUD User functionalities

## Installation
1) Git Clone/Download the project

2) Install Packages
```bash
npm install
```

3) Setup MongoDB
    1) Go to mongodb website then create a project and a cluster

    2) When the cluster creation is complete Setup the Network and Database Access

    3) Click on connect, select `Connect your application`

    4) Copy the connection string

    5) In the path */config* create a `config.env` file.

    6) MONGO_URI=**Paste the copied string**

4) Run the project
```bash
npm start
```

## Usage

>1) List all users

    Method - GET

    Route - `http://localhost:5000/api/v1/users/`

>2) Get specific user

    Method - GET

    Route - `http://localhost:5000/api/v1/users/:id`

>3) Create user

    Method - POST

    Route - `http://localhost:5000/api/v1/users/`

>4) Update specific user

    Method - PUT

    Route - `http://localhost:5000/api/v1/users/:id`

>5) Delete specific user

    Method - DELETE

    Route - `http://localhost:5000/api/v1/users/:id`
