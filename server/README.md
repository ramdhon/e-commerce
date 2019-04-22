# e-commerce app
E-Commerse built with Express, Mongoose, and TDD

| Route              | HTTP   | Description                    | Authen | Authorz |
|--------------------|--------|--------------------------------|--------|---------|
| /register          | POST   | Register new user              | no     | no      |
| /login             | POST   | Login user                     | no     | no      |
| /glogin            | POST   | Login user by google account   | no     | no      |
| /products          | GET    | Get all product documents      | no     | no      |
| /products          | POST   | Create a product document      | yes    | admin   |
| /products/:id      | GET    | Get a product document         | no     | no      |
| /products/:id      | PUT    | Update all product doc fields  | yes    | admin   |
| /products/:id      | PATCH  | Update some product doc fields | yes    | admin   |
| /products/:id      | DELETE | Delete a product document      | yes    | admin   |
| /carts             | GET    | Get all carts documents        | yes    | admin   |
| /carts             | POST   | Create a cart document         | yes    | admin   |
| /carts/:id         | GET    | Get a cart document            | yes    | admin   |
| /carts/:id         | PUT    | Update all cart doc fields     | yes    | admin   |
| /carts/:id         | PATCH  | Update some cart doc fields    | yes    | admin   |
| /carts/:id         | DELETE | Delete a cart document         | yes    | admin   |
| /user/carts        | GET    | Get authenticated user cart    | yes    | no      |
| /user/carts        | POST   | Create authenticated user cart | yes    | no      |
| /user/carts        | PATCH  | Update products in cart        | yes    | no      |
| /user/carts        | DELETE | Delete authenticated user cart | yes    | no      |


## Usage
Make sure you have Node.js and npm installed in your computer and then run these commands:
```console
$ npm install
$ npm start
```
Make sure you have set all required your .env parameters
<br>(key reference: .env.example)

Access the REST API via `http://localhost:3000`