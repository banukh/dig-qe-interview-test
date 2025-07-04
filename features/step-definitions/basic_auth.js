import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";
import fetch from "node-fetch";
import Page from "../pageobjects/page.js";

const index = new Page();

Given(
  /^I use basic auth to login with "([^"]+)" and "([^"]+)"$/,
  async (username, password) => {
    await browser.url(
      `https://${username}:${password}@the-internet.herokuapp.com/basic_auth`
    );
  }
);

Then(/^I should see a paragraph saying "([^"]+)"$/, async (message) => {
  const content = await $("p");
  await expect(content).toBeExisting();
  await expect(content).toHaveTextContaining(message);
});

When(
  /^I send invalid basic auth with "([^"]+)" and "([^"]+)"$/,
  async (username, password) => {
    const basicAuth = Buffer.from(`${username}:${password}`).toString("base64");
    global.invalidAuthResponse = await fetch(
      "https://the-internet.herokuapp.com/basic_auth",
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
        },
      }
    );
  }
);

Then(/^I should get a 401 unauthorized response$/, async () => {
  expect(global.invalidAuthResponse.status).toBe(401);
});
