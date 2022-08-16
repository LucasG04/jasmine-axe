# jasmine-axe
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![npm version](https://img.shields.io/npm/v/jasmine-axe.svg)](https://www.npmjs.com/package/jasmine-axe)

[![aXe version](https://img.shields.io/npm/v/axe-core.svg)](https://www.npmjs.com/package/axe-core)

Fork for custom [Jasmine](https://jasmine.github.io/) matcher for [aXe](https://github.com/dequelabs/axe-core) for testing accessibility with an up-to-date version of axe-core

## Installation:

```bash
npm install --save-dev jasmine-axe
```

## Usage:

### Check that there are no violations

```javascript
import { TestBed } from "@angular/core/testing";
import { axe, toHaveNoViolations } from "jasmine-axe";
import TestComponent from "./TestComponent.component";

describe("TestComponent", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
    });
    TestBed.compileComponents();
    jasmine.addMatchers(toHaveNoViolations);
  });

  it("should pass accessibility test", async () => {
    const fixture = TestBed.createComponent(TestComponent);
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});
```

### Allow some violations (for a temporary period)

If you want to add an accessibility check on an existing project, you will probably find many accessibility issues, and you may not have time to fix them right away.
Instead of skipping the test until you have time to fix the issues, you can use another matcher `toHaveLessThanXViolations`. You will be able to prevent new accessibility issues to appear.
This matcher should be use as a temporary fix, the objective is of course to have no violations at all.

```javascript
import { TestBed } from "@angular/core/testing";
import { axe, toHaveLessThanXViolations } from "jasmine-axe";
import TestComponent from "./TestComponent.component";

describe("TestComponent", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
    });
    TestBed.compileComponents();
    jasmine.addMatchers(toHaveLessThanXViolations);
  });

  it("should have less than 2 accessibility issues", async () => {
    const fixture = TestBed.createComponent(TestComponent);
    expect(await axe(fixture.nativeElement)).toHaveLessThanXViolations(2);
  });
});
```

### Axe configuration

The `axe` function allows options to be set with the [same options as documented in axe-core](https://github.com/dequelabs/axe-core/blob/master/doc/API.md#options-parameter):

```javascript
import { axe, toHaveNoViolations } from "jasmine-axe";

describe("TestComponent", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
    });
    TestBed.compileComponents();
    jasmine.addMatchers(toHaveNoViolations);
  });

  it("should demonstrate this matcher`s usage with a custom config", async () => {
    const render = () => `
        <div>
            <img src="#"/>
        </div>
    `;
    const html = render();

    const results = await axe(html, {
      rules: {
        // for demonstration only, don't disable rules that need fixing.
        "image-alt": { enabled: false },
      },
    });
    expect(results).toHaveNoViolations();
  });
});
```

## Setting global configuration

If you find yourself repeating the same options multiple times, you can export a version of the `axe` function with defaults set.

Note: You can still pass additional options to this new instance; they will be merged with the defaults.

The configuration object passed to `configureAxe` also accepts a `globalOptions` property to configure the format of the data used by axe and to add custom checks and rules. The property value is the same as the parameter passed to [axe.configure](https://github.com/dequelabs/axe-core/blob/master/doc/API.md#parameters-1).

```javascript
// Global helper file (axe-helper.js)
import { configureAxe } from "jasmine-axe";

const axe = configureAxe({
  rules: {
    // for demonstration only, don't disable rules that need fixing.
    "image-alt": { enabled: false },
  },
  globalOptions: {
    checks: [
      /* custom checks definitions */
    ],
  },
});

export default axe;
```

## How does it work

We export 2 custom matchers for Jasmine.  
The goal is to make it super easy for developers to add automatic accessibility checks, even if they're not really familiar with accessibility, and aXe.  

The matchers are just a way to encapsulate what we're testing: use the comparison we want and add a specific error message in case the check fails.
- `toHaveNoViolations`: check that there are no violations at all, and if that check fails, display the results from aXe.
- `toHaveLessThanXViolations`: check that there are less than allowed violations. Always display the result from aXe.

## Thanks
- [jest-axe](https://github.com/nickcolley/jest-axe) for the original idea and all the helpers that make testing with aXe super easy.
- [axe](https://www.deque.com/axe/) for the incredible axe-core that makes accessibility testing easy for everyone

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/MathildeDuboille"><img src="https://avatars.githubusercontent.com/u/35567446?v=4?s=100" width="100px;" alt=""/><br /><sub><b>MathildeDuboille</b></sub></a><br /><a href="#a11y-MathildeDuboille" title="Accessibility">️️️️♿️</a> <a href="https://github.com/theodo/jasmine-axe/commits?author=MathildeDuboille" title="Code">💻</a></td>
    <td align="center"><a href="http://alberic.trancart.net/"><img src="https://avatars.githubusercontent.com/u/6317823?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Albéric Trancart</b></sub></a><br /><a href="#a11y-AlbericTrancart" title="Accessibility">️️️️♿️</a> <a href="https://github.com/theodo/jasmine-axe/commits?author=AlbericTrancart" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!