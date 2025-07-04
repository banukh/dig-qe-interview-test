import { When, Then } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";
import inputsPage from "../pageobjects/inputs.page.js";

When(/^I enter "(\d+)"$/, async function (num) {
  this.input = await inputsPage.elements.input(num);
  await inputsPage.set(num);
});

Then(/^The input value should be the number I entered$/, async function () {
  expect(await inputsPage.elements.input()).toHaveValue(this.num);
});
