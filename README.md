# Coupon Book Service

## Description

The service allows businesses to create, distribute, and manage coupons. This service supports operations such as creating coupon books, assigning coupons to users, locking coupons temporarily during redemption attempts, and redeeming coupons.

System also include the capability to upload a list of codes to a given coupon book or have the API generate codes following a pattern up to a total amount provided.

I created an endpoint to create users with the same password for testing purpose only

The following endpoints are avaiable:

| Endpoint | Body | Description |
| --- | --- | --- |
| POST /auth/login | `{"email": "", "password": ""}` | Log in into the system, the request return a token to be used in the header |
| POST /users | `{"email": ""}` | Create a new user with the same password (12345678) |
| GET /users/:id | - | Get the user information with the user codes |
| POST /coupons | `{"name": "New Cuopon", redeemedAmount: 1}` | Create new cuopon |
| GET /coupons | - | Get all coupons with its code |
| GET /coupons/:id | - | Get coupon with its code |
| POST /coupons/:id/codes| {"amount": 5, codes: []} | If you send only amount, it would create random codes, instead you can send the codes
| POST /coupons/assign | {"email": ""} | Assign a random code to the user
| POST /coupons/assign/:code | {"email": ""} | Assign a code to the user
| POST /lock/:code | {"email": ""} | Lock code. The code should be assigned to the user before
| POST /redeem/:code | {"email": ""} | Redeem code. The code should be locked and the code belongs to the user


### Authorization

The protected endpoints you need to include in the header the token getting from the login endpoint

`Authorazation: Bearer {authToken}`

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## TODO List

- [ ] Missing tests
- [ ] Fix [nestjs-simple-redis-lock](https://github.com/hanFengSan/nestjs-simple-redis-lock). I have an error that appears to be from the package [Issue](https://github.com/hanFengSan/nestjs-simple-redis-lock/issues/6)
- [ ] Remove some params on the user response, for example, password. I tried to use `class-transformer`but I got an error that it's supposed to be fixed
- [ ] Add pagination to GET /coupons
- [ ] I am getting the user twice in some endpoints, probably it can be resolved with a `decorator` or `interceptor` to validate if the user exists and return an error or continue and add the user to the request object

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
