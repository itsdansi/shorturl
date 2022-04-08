// const request = require("supertest");
// const app = require("./../server/app");
// describe("Homepage Endpoints", () => {
//   it("should create a new post", async () => {
//     const res = await request(app).post("/shortUrl").send({
//       fullUrl: "www.facebook.com/groups",
//     });
//     expect(res.statusCode).toEqual(201);
//     expect(res.body).toHaveProperty("post");
//   });
// });

/* Didn't try to test api endpoints as it require database connection(I guess).
 You told us not to use/manipulate direct database for testing.
I didn't opt for creating a mock database for testing purpose only.*/
