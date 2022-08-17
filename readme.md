## Testing

- Testing a REST API end-to-end with Supertest & mongodb-memory-server
- Mocking services
- Testing from the controller to the service

1. install dependencies `yarn add supertest jest ts-jest @types/jest @types/supertest mongo-memory-server -D`

2. create config file `yarn ts-jest config:init`

   - add test match verbose and forceExit `testMatch: ["**/**/*.test.ts"], verbose: true, forceExit: true,`

3. come in to `package.json` for add `"script" : {"test":"jest"}` can use run test `yarn test` or set auto test by `yarn test --watchAll` or `yarn test --detectOpenHandles`

:shipit: **_product test_**

4. let's go to folder `src` then ceate folder `__test__` then create file

   - create file test `product.test.ts` and implement test case of route `"/api/products/:productId"`

   - import `supertest from 'supertest'`

   - import `app from app.ts` before go to file `app.ts` for export `app`

5. let's go to `utils` for ceate file `server.ts` then create function `createServer`

6. for mocking inside file `product.test.ts` import mongo memory server `import {MongoMemoryServer} from "mongodb-memory-server"`

   - create mongo server by `beforeAll` and `afterAll`

7. define `productPayload` and define `userId` for test status 200 `should return a 200 status and the product`

   - let's go to `product.model.ts` and add `productId: string;` to interface `ProductDocument`

   - let's go to `product.service.model` and add `"productId"` to `DocumentDefinition` of function `createProduct`

8. create describe `"create product route"`

   - create test case `given the user is not logged in` middlewate is require `requireUser`

   - create test case `given the user is logged in` define `jwt` then create user payload `userPayload`

     1. test first that fail by `expect(body).toEqual({})` then copy fail result pass to `.toEqual({})`
     2. change key that from fail to `expect.any(String)`

:+1: can use `skip` and `only` for `describe`! :shipit:

:shipit: **_user test_**

9. let's go to folder `__test__` then create file `user.test.ts`

   - implement describe `"user registration"`

     1. create test case `givan the username and password are valid`
     2. create test case `givan the passwords do not match`
        return status 400 from `validateResourec.ts`
     3. create test case `given the user service throws` return status 409 from `user.controller.ts`

   - implement `"create user session"`

:+1: can use `yarn test user.test --watch` for run test suite 1 only ! :shipit:

     1. create test case `given the username and password are valid`

- create constant `userInput`

- mocking app and use `spyOn` by import `import * as UserService from '../service/user.service'`

  1.  use spyOn `spyOn(object, "methodName")` for mock implementation

- create constant `userPayload` then create define constant `userId` for implementation mocking

  1.  let's go to `jest.config.js` and add `clearMocks: true`

- that test case `"given the user service throws"` change mock from `.mockReturnValueOnce(userPayload);` to `.mockRejectedValue("oh no :(");`

  1. let's go to `jest.config.ts` and add `resetMocks: true` & `restoreMocks: true`

- that test case `given the username and password are valid`

  1. create mock for `validatePassword` from `user.service.ts`

     - create constant `req` for `validatePassword`

  2. import session service `import * as SessionService from ../service/session.service` for mock `createSession`
  3. create constant session payload `sessionPayload`

- add `@ts-ignore` both `"validatePassword"` and `"createSession"`

- create constant `send` for `res` then create await `createUserSessionHandler` and pass parameter `req, res`
  1. add `@ts-ignore` because acturl parameter have interface
