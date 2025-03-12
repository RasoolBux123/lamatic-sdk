// Lamatic Class Tests
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



