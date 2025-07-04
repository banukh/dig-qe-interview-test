import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";
import Page from "../pageobjects/page.js";
const index = new Page();

Given("I am at the index page", async function () {
  await index.open();
});

When(/^I click the (.+) link$/, async function (page) {
  this.page = page;
  await index.click(page);
});

Given(
  /^I authenticate on "([^"]+)" with username "([^"]+)" and password "([^"]+)"$/,
  async function (page, username, password) {
    const path = index.paths[page];
    await browser.url(
      `https://${username}:${password}@the-internet.herokuapp.com/${path}`
    );
    this.page = page;
  }
);

Then("I should see the page header", async function () {
  let header = null;

  const selectors = ["h3", "h2", "h4", "h1", "p"];
  for (const sel of selectors) {
    const el = await $(sel);
    if (await el.isExisting()) {
      header = await el.getText();
      break;
    }
  }

  if (!header) {
    header = await browser.getTitle();
    console.warn(`Falling back to page title: ${header}`);
  }

  const expectedHeading = index.headings[this.page] || this.page;

  if (Array.isArray(expectedHeading)) {
    const pass = expectedHeading.some((expected) =>
      header.toLowerCase().includes(expected.toLowerCase())
    );
    expect(pass).toBe(true);
  } else {
    expect(header.toLowerCase()).toContain(expectedHeading.toLowerCase());
  }
});

Then("I should be directed to the selected page", async function () {
  if (this.page === "Nested Frames") {
    const frames = await $$("frame");
    expect(frames.length).toBeGreaterThan(0);

    // switch to top frame first
    await browser.switchToFrame(await $('frame[name="frame-top"]'));

    // within top, switch to left
    await browser.switchToFrame(await $('frame[name="frame-left"]'));
    let leftText = await $("body").getText();
    expect(leftText).toContain("LEFT");
    await browser.switchToParentFrame();

    // within top, switch to middle
    await browser.switchToFrame(await $('frame[name="frame-middle"]'));
    let middleText = await $("#content").getText();
    expect(middleText).toContain("MIDDLE");
    await browser.switchToParentFrame();

    // within top, switch to right
    await browser.switchToFrame(await $('frame[name="frame-right"]'));
    let rightText = await $("body").getText();
    expect(rightText).toContain("RIGHT");
    await browser.switchToParentFrame();

    // back to main and switch to bottom
    await browser.switchToParentFrame();
    await browser.switchToFrame(await $('frame[name="frame-bottom"]'));
    let bottomText = await $("body").getText();
    expect(bottomText).toContain("BOTTOM");

    // return to main page
    await browser.switchToParentFrame();
    console.log("Verified all Nested Frames contents.");
    return;
  }

  // standard heading check for all other pages
  let header = null;
  const selectors = ["h3", "h2", "h4", "h1", "p"];
  for (const sel of selectors) {
    const el = await $(sel);
    if (await el.isExisting()) {
      header = await el.getText();
      break;
    }
  }
  if (!header) {
    header = await browser.getTitle();
    console.warn(`Falling back to page title: ${header}`);
  }

  const expectedHeading = index.headings[this.page] || this.page;

  if (typeof expectedHeading === "string") {
    expect(header.toLowerCase()).toContain(expectedHeading.toLowerCase());
  } else if (Array.isArray(expectedHeading)) {
    const pass = expectedHeading.some((expected) =>
      header.toLowerCase().includes(expected.toLowerCase())
    );
    expect(pass).toBe(true);
  } else {
    throw new Error(
      `Expected heading for ${this.page
      } is neither string nor array: ${typeof expectedHeading}`
    );
  }
});
