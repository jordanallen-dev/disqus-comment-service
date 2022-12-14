import { DisqusData, generateSignature } from "./generateSignature";

describe("generateSignature", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2020, 3, 1));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const user: DisqusData = {
    id: "3380ec0f-cae9-4927-b8d4-fc5d0fa012fd",
    username: "Test User",
    email: "test@test.com",
  };

  it("generates a valid Disqus SSO signature", () => {
    process.env.DISQUS_SECRET = "SECRET_KEY";

    const signature = generateSignature(user);

    expect(signature).toBe(
      "eyJpZCI6IjMzODBlYzBmLWNhZTktNDkyNy1iOGQ0LWZjNWQwZmEwMTJmZCIsInVzZXJuYW1lIjoiVGVzdCBVc2VyIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIn0= 908c3102d3d6f17ed6e27598eff7f7fb1585fd08 1585699200"
    );
  });

  it("throws an error if the DISQUS_SECRET variable is missing", () => {
    process.env.DISQUS_SECRET = "";

    expect(() => generateSignature(user)).toThrowError(
      "Missing environment variable: DISQUS_SECRET"
    );
  });
});
