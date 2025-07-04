import { $ } from "@wdio/globals";
import Page from "./page.js";

class SecurePage extends Page {
    get flashAlert() {
        return $("#flash");
    }

    /**
     * wait for the flash message to be present
     */
    async waitForFlash() {
        await this.flashAlert.waitForExist({
            timeout: 10000,
            timeoutMsg: "Flash message did not appear in time",
        });
    }
}

export default new SecurePage();
