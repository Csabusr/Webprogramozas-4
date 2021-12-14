Name: **Fügedi Csaba**

Neptun: **OFQ8AE**

<hr>

## Introduction
The API was delveloped to handle the backend side of a instrument e-commerce web application. 
It implements CRUD methods for a database, with address, student and neptun tables.

## API
The API is using JSON as its data transferring format.

# **Address**
<hr>

### **GET** /address
Returns all records in the address database table

### **GET** /address/{id}
Returns the address with id = {id}

### **POST** /address
Inserts a new record to the address database table with the post data.

### **PUT** /address
Updates a record in the address table with the post data

### **DELETE** /address/{id}
Removes a record from the address table with the id of {id}

# **Neptun**
<hr>

### **GET** /neptun
Returns all records in the neptun table

### **GET** /neptun/{id}
Returns the neptun with id = {id}

### **POST** /neptun
Inserts a new record to the neptun table with the post data.

### **PUT** /neptun
Updates a record in the neptun table with the post data

### **DELETE** /neptun/{id}
Removes a record from the neptun table with the id of {id}

# **Student**
<hr>

### **GET** /student
Returns all records in the student table

### **GET** /student/{id}
Returns the student with id = {id}

### **POST** /student
Inserts a new record to the student table with the post data.

### **PUT** /student
Updates a record in the student table with the post data

### **DELETE** /student/{id}
Removes a record from the student table with the id of {id}