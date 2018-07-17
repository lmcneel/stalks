const expect = require("chai").expect;

const multiply = function(x, y) {
  // if (typeof x !== "number" || typeof y !== "number") {
  //   throw new Error("x or y is not a number.");
  // }
  // else 
  return x * y;
};

describe("Multiply", function() {
  it("should multiply properly when passed numbers", function() {
    expect(multiply(3, 6)).to.equal(18);
  });

  it("should throw when not passed numbers", function() {
    expect(multiply(2, "4")).to.throw(Error);
  });
});
