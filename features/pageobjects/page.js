import { browser } from "@wdio/globals";

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class Page {
  /**
   * get paths:
   * maps human-friendly names to actual page URLs for navigation
   */
  get paths() {
    return {
      "Basic Auth": "basic_auth",
      Checkboxes: "checkboxes",
      Dropdown: "dropdown",
      Inputs: "inputs",

      "A/B Testing": "abtest",
      "Add/Remove Elements": "add_remove_elements/",
      "Broken Images": "broken_images",
      "Challenging DOM": "challenging_dom",
      "Context Menu": "context_menu",
      "Digest Authentication": "digest_auth",
      "Disappearing Elements": "disappearing_elements",
      "Drag and Drop": "drag_and_drop",
      "Dynamic Content": "dynamic_content",
      "Dynamic Controls": "dynamic_controls",
      "Dynamic Loading": "dynamic_loading",
      "Entry Ad": "entry_ad",
      "Exit Intent": "exit_intent",
      "File Download": "download",
      "File Upload": "upload",
      "Floating Menu": "floating_menu",
      "Forgot Password": "forgot_password",
      "Form Authentication": "login",
      Frames: "frames",
      Geolocation: "geolocation",
      "Horizontal Slider": "horizontal_slider",
      Hovers: "hovers",
      "Infinite Scroll": "infinite_scroll",
      "JQuery UI Menus": "jqueryui/menu",
      "JavaScript Alerts": "javascript_alerts",
      "JavaScript onload event error": "javascript_error",
      "Key Presses": "key_presses",
      "Large & Deep DOM": "large",
      "Multiple Windows": "windows",
      "Nested Frames": "nested_frames",
      "Notification Messages": "notification_message",
      "Redirect Link": "redirector",
      "Secure File Download": "download_secure",
      "Shadow DOM": "shadowdom",
      "Shifting Content": "shifting_content",
      "Slow Resources": "slow",
      "Sortable Data Tables": "tables",
      "Status Codes": "status_codes",
      Typos: "typos",
      "WYSIWYG Editor": "tinymce",
    };
  }

  /**
   * get headings:
   * maps human-friendly names to expected page headings for validation
   */
  get headings() {
    return {
      "A/B Testing": ["A/B Test Control", "A/B Test Variation 1"],
      "Add/Remove Elements": "Add/Remove Elements",
      "Basic Auth": "Basic Auth",
      "Broken Images": "Broken Images",
      "Challenging DOM": "Challenging DOM",
      Checkboxes: "Checkboxes",
      "Context Menu": "Context Menu",
      "Digest Authentication": "Digest Auth",
      "Disappearing Elements": "Disappearing Elements",
      "Drag and Drop": "Drag and Drop",
      Dropdown: "Dropdown List",
      "Dynamic Content": "Dynamic Content",
      "Dynamic Controls": "Dynamic Controls",
      "Dynamic Loading": "Dynamically Loaded Page Elements",
      "Entry Ad": "Entry Ad",
      "Exit Intent": "Exit Intent",
      "File Download": "File Downloader",
      "File Upload": "File Uploader",
      "Floating Menu": "Floating Menu",
      "Forgot Password": "Forgot Password",
      "Form Authentication": "Login Page",
      Frames: "Frames",
      Geolocation: "Geolocation",
      "Horizontal Slider": "Horizontal Slider",
      Hovers: "Hovers",
      "Infinite Scroll": "Infinite Scroll",
      Inputs: "Inputs",
      "JQuery UI Menus": "JQueryUI - Menu",
      "JavaScript Alerts": "JavaScript Alerts",
      "JavaScript onload event error": "JavaScript Error",
      "Key Presses": "Key Presses",
      "Large & Deep DOM": "Large & Deep DOM",
      "Multiple Windows": "Opening a new window",
      "Nested Frames": "Nested Frames",
      "Notification Messages": "Notification Message",
      "Redirect Link": "Redirection",
      "Secure File Download": "Secure File Downloader",
      "Shadow DOM": "Simple Template",
      "Shifting Content": "Shifting Content",
      "Slow Resources": "Slow Resources",
      "Sortable Data Tables": "Data Tables",
      "Status Codes": "Status Codes",
      Typos: "Typos",
      "WYSIWYG Editor": "An iFrame containing the TinyMCE WYSIWYG Editor",
    };
  }

  get base() {
    return `https://the-internet.herokuapp.com`;
  }

  async click(name) {
    const pathKey = Object.keys(this.paths).find(
      (k) => k.toLowerCase() === name.toLowerCase()
    );
    if (!pathKey) throw new Error(`No path mapping found for ${name}`);
    const href = this.paths[pathKey];
    const anchor = await $(`a[href="/${href}"]`);
    await anchor.click();
  }

  /**
   * Opens a sub page of the page
   * @param path path of the sub page (e.g. /path/to/page.html)
   */
  open(path = "") {
    if (path in this.paths) return this.open(this.paths[path]);
    return browser.url(`${this.base}/${path}`);
  }
}
