# Badges

[![Coverage Status](https://coveralls.io/repos/github/henperi/Fast-Food-Fast/badge.png)](https://coveralls.io/github/henperi/Fast-Food-Fast)
[![Build Status](https://travis-ci.com/henperi/Fast-Food-Fast.svg?branch=develop)](https://travis-ci.com/henperi/Fast-Food-Fast)
[![Maintainability](https://api.codeclimate.com/v1/badges/e45b0a788e054d2cea0b/maintainability)](https://codeclimate.com/github/henperi/Fast-Food-Fast/maintainability)

# Fast-Food-Fast

[Fast Food Fast](https://henperi.github.io/Fast-Food-Fast/UI/index.html) is a food ordering and delivery web application that lets users order for available food items. Admins will be able to manage and deliver requested/ordered items to it's users. The app is powered by a nodeJs API.

See the sample interface here- <a  href="https://henperi.github.io/Fast-Food-Fast/UI/index.html"> View Interface</a>

## Getting Started

### Server and Database Installation Guide

STEP 1: Install [`node`](https://nodejs.org/en/) version 8 or above
STEP 2: Install [`posgresql`](https://www.postgresql.org/) database version 9.2 or above.

> Check option to install pgAdmin while installing or manually install [`pgAdmin`](https://www.pgadmin.org/) version 4 or above.

Step 3: Open a terminal window and clone this repository

```
git clone https://github.com/Henperi/Fast-Food-Fast.git
```

STEP 5: Install all dependencies

> Open your terminal from the root directory of the cloned repository and run:

```
$ npm install
```

STEP 6: Create a database for the application

> PgAdmin is recommended for this. See [`how`](https://www.enterprisedb.com/resources/webinars/how-create-postgres-database-using-pgadmin).

STEP 7: Create a `.env` file in the project root directory and add the required environment variables as described in [`.env.example`]

STEP 8: Insert the Super Admin into the database

```
npm run insert-admin
```

STEP 9: Start the application `npm run dev-start`. The App server should be up and running at this point.

### Front End Setup (Optional)

STEP 1: Copy the UI directory within the repository and host it on GH pages or any prefeerred host of your choice.

## Key Features

Users can:

- Create a new user account
- Log in using existing account details
- Search for or scroll through available food Items they wish to order for.
- Add multiple food items to cart and place an order for all the items within the cart.
- Order a single food item.
- Edit an items quantity or Remove such an item from their recently placed orders when the order status of such an item is still pending.
- Cancel or delete an order that has not been processed.
- Update their delivery address.

Admin can:

- View all Users orders.
- Create and Add new food items to available menu
- Edit or delete existing food items
- Accept, Decline or Mark a user order as Completed

## Server Side Testing

This application uses `mocha` and `chai` for server side unit testing and Travis for CI tests.

> - `npm run test` - to run server side tests

## Limitations

- The front end has not been tied to the backend yet.
- The Super Admin must be inserted to the database by runing `npm run insert-admin`.
- There is no provision for signing up other admins or management staff.
- More features need to be integrated to complete and make the web application production ready
  > Some of which include using Fetch API to connect the backend.

## Suggestions and Contributions

- While trying to tie the front end to the backend, I recommend ussing fetch API.
- When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the author of this repository before making a change.

## Author

- [`Henry Izontimi`](https://github.com/henperi)

## License

This project is licensed under the MIT License - see the [`LICENSE.md`](https://github.com/henperi/Fast-Food-Fast/blob/feature/%23158056774/readme/LICENSE.md) file for details

## Built With

- [`Node`](https://www.nodejs.org) - A JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.

- [`Express`](https://www.expressjs.com) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

- [`PosgreSQL`](https://www.postgresql.org/) - A powerful, open source object-relational database system.

## Acknowledgment

- Learning resources used to create this web application where gathered from the internet
- Andela Nigeria was my main inspiration for coding this app from start to finish(current level)
