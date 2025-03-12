const { greet } = require("../src/index");

test("greet returns the correct greeting", () => {
  expect(greet("World")).toBe("Hello, World!");
});
const { Lamatic, greet } = require("../src/index");

describe("Lamatic", () => {
  it("should be a class", () => {
    expect(typeof Lamatic).toBe("function");
  });

  it("should have a name property set to 'Lamatic'", () => {
    const lamatic = new Lamatic();
    expect(lamatic.name).toBe("Lamatic");
  });

  it("should have a getName method that returns 'Lamatic'", () => {
    const lamatic = new Lamatic();
    expect(lamatic.getName()).toBe("Lamatic");
  });
});

describe("greet", () => {
  it("should be a function", () => {
    expect(typeof greet).toBe("function");
  });

  it("should return the correct greeting", () => {
    expect(greet("World")).toBe("Hello, World!");
  });

  it("should return a greeting with a different name",()=>{
    expect(greet("Vrijraj")).toBe("Hello, Vrijraj!");
  })
});
