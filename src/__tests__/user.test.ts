import mongoose from "mongoose";
import * as UserService from "../service/user.service";
import * as SessionService from "../service/session.service";
import supertest from "supertest";
import createServer from "../utils/server";
import { createUserSessionHandler } from "../controller/session.controller";

const userId = new mongoose.Types.ObjectId().toString();
const app = createServer();

const userPayload = {
  _id: userId,
  email: "frank.d@example.com",
  name: "frank",
};
const userInput = {
  email: "test@example.com",
  name: "porameht",
  password: "Password123",
  passwordConfirmation: "Password123",
};
const sessionPayload = {
  _id: new mongoose.Types.ObjectId().toString(),
  user: userId,
  valid: true,
  userAgent: "PostmanRuntime/7.28.4",
  createdAt: new Date("2021-09-30T13:31:07.674Z"),
  updatedAt: new Date("2021-09-30T13:31:07.674Z"),
};

describe("user", () => {
  // user registration
  describe("user registration", () => {
    // the username and password get validation
    describe("givan the username and password are valid", () => {
      it("should return the user payload", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode, body } = await supertest(app)
          .post("/api/users")
          .send(userInput);

        expect(statusCode).toBe(200);
        expect(body).toEqual(userPayload);
        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });
    // verify that the password must match
    describe("givan the passwords do not match", () => {
      it("should return a 400", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode } = await supertest(app)
          .post("/api/users")
          .send({ ...userInput, passwordConfirmation: "doesnotmatch" });

        expect(statusCode).toBe(400);
        expect(createUserServiceMock).not.toHaveBeenCalled();
      });
    });

    // verify that the handler any errors
    describe("given the user service throws", () => {
      it("should return a 409 error", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          .mockRejectedValue("oh no :(");

        const { statusCode } = await supertest(app)
          .post("/api/users")
          .send(userInput);

        expect(statusCode).toBe(409);
        expect(createUserServiceMock).toHaveBeenCalled();
      });
    });
  });
  // creating a user session
  describe("create user session", () => {
    // a user can login with a valid email and password
    describe("given the username and password are valid", () => {
      it("should return a signed accessToken & refresh token", async () => {
        jest
          .spyOn(UserService, "validatePassword")
          //   @ts-ignore
          .mockReturnValue(userPayload);

        jest
          .spyOn(SessionService, "createSession")
          //   @ts-ignore
          .mockReturnValue(sessionPayload);

        const req = {
          get: () => {
            return "a user agent";
          },
          body: {
            email: "test@example.com",
            password: "Password123",
          },
        };

        const send = jest.fn();
        const res = {
          send,
        };
        // @ts-ignore
        await createUserSessionHandler(req, res);

        expect(send).toHaveBeenCalledWith({
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        });
      });
    });
  });
});
