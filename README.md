# e-commerce app
E-Commerse built with Express and TDD

Tes memastikan produk telah berhasil dibuat
Memastikan produk sudah disimpan muncul dalam daftar produk
Memastikan berhasil menghapus sebuah produk
Memastikan user berhasil login
Memastikan orang yang login bisa memasukkan sesuatu ke dalam cart

CRUD Produk
Create dan delete Cart
Customer Authentication

| Route              | HTTP   | Description                                          |
|--------------------|--------|------------------------------------------------------|
| /user/products     | POST   | Create a product (authenticated and authorized user) |
| /products          | GET    | Get all products list                                |
| /user/products/:id | DELETE | Delete a product (authenticated and authorized user) |
| /login             | POST   | Login to be authenticated user                       |
| /user/carts        | POST   | Add product to authenticated user                    |

## Usage
Make sure you have Node.js and npm installed in your computer and then run these commands:
```console
$ npm install
$ npm start
```
Make sure you have set all required your .env parameters
<br>(key reference: .env.example)

Access the REST API via `http://localhost:3000`