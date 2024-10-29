import { axe, toHaveNoViolations, toHaveLessThanXViolations } from '../src/index';
import { JSDOM } from 'jsdom';

// Set up JSDOM environment
beforeAll(() => {
  const dom = new JSDOM('<!doctype html><html><body></body></html>');
  global.document = dom.window.document;
});

// Register the custom matchers for Jasmine
beforeEach(() => {
  jasmine.addMatchers(toHaveNoViolations);
  jasmine.addMatchers(toHaveLessThanXViolations);
});

describe("Accessibility tests with axe-core", () => {
  it("should have no accessibility violations for valid HTML", async () => {
    global.document.body.innerHTML = `<main><button>Click me</button></main>`;
    const results = await axe(global.document.body);

    expect(results).toHaveNoViolations();
  });

  it("should detect accessibility violations in invalid HTML", async () => {
    // "image-alt" violation
    global.document.body.innerHTML = `<main><img src=""></main>`;
    const results = await axe(global.document.body);

    expect(results).not.toHaveNoViolations();
    expect(results).toHaveLessThanXViolations(2);
  });
});
