import session from "supertest-session";

import { User } from "../mongo.js";
import app from "../server.js";

let testSession = null;

describe("Users Router GET /", () => {
  beforeAll(async () => {
    await User.findOneAndDelete({ email: "soufian.oualla@supinfo.com" });
    await User.findOneAndDelete({ email: "test3.user@gmail.com" });
    testSession = session(app);

    await testSession.post("/authentification/inscription").send({
      email: "soufian.oualla@supinfo.com",
      username: "soufian",
      password: "a",
      role: "admin",
    });
  });

  it("should get the list of users", async () => {
    await testSession.get("/authentification/login").send({
      email: "soufian.oualla@supinfo.com",
      password: "a",
    });

    const response = await testSession.get("/users").expect(200);
    expect(response.body.length).not.toEqual(0);
  });
});

describe("Users Router GET /", () => {

  let id;
  beforeAll(async () => {
    const user = await testSession.post("/authentification/inscription").send({
      email: "test3.user@gmail.com",
      username: "tester3",
      password: "test123",
    });
    id = user.body.id;
  });

  it("should get a user by id", async () => {
    await testSession.get("/authentification/login").send({
      email: "soufian.oualla@supinfo.com",
      password: "a",
    });

    const response = await testSession.get(`/users/${id}`).expect(200);
    expect(response.body["username"]).toEqual("tester3");
  });
});

describe("Users Router DELETE /", () => {
  let id;
  beforeAll(async () => {
    await User.findOneAndDelete({ email: "test3.user@gmail.com" });
    const user = await testSession.post("/authentification/inscription").send({
      email: "test3.user@gmail.com",
      username: "tester3",
      password: "test123",
    });
    id = user.body.id;
  });

  it("should delete the user", async () => {
    await testSession.get("/authentification/login").send({
      email: "soufian.oualla@supinfo.com",
      password: "a",
    });

    const response = await testSession.delete(`/users/${id}`).expect(200);

    expect(response.body).toMatchObject({});
  });
});

describe("Users Router PUT /", () => {
let id;
beforeAll(async () => {
    testSession = session(app);
    const user = await testSession.post("/authentification/inscription").send({
    email: "test3.user@gmail.com",
    username: "tester3",
    password: "test123",
    });
    id = user.body.id;
});

it("should update the user", async () => {
    await testSession.get("/authentification/login").send({
    email: "soufian.oualla@supinfo.com",
    password: "a",
    });

    const response = await testSession
    .put(`/users/${id}`)
    .send({
        email: "test3.user@gmail.com",
        username: "tesmaa",
        password: "test123"
    })
    .expect(200);

    expect(response.body.user).toMatchObject({ username: "tesmaa" });
});
});