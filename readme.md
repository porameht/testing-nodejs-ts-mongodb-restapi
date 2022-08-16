## Testing

- Testing a REST API end-to-end with Supertest & mongodb-memory-server
- Mocking services
- Testing from the controller to the service

1. install dependencies `yarn add supertest jest ts-jest @types/jest @types/supertest mongo-memory-server -D`

2. create config file `yarn ts-jest config:init`

   - add test match verbose and forceExit `testMatch: ["**/**/*.test.ts"], verbose: true, forceExit: true,`

3. come in to `package.json` for add `"script" : {"test":"jest"}` can use run test `yarn test` or set auto test by `yarn test --watchAll` or `yarn test --detectOpenHandles`

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
     - test first that fail by `expect(body).toEqual({})` then copy fail result pass to `.toEqual({})`
     - change key that from fail to `expect.any(String)`
