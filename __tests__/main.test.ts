describe('nothing', () => {
  beforeAll(async () => {
    // Don't do anything
  });

  // Teardown (cleanup) after assertions
  afterAll(() => {
    // Don't do anything now either
  });

  it("doesn't do anything in particular", () => {
    expect(1 + 2).toEqual(3);
  });
});
