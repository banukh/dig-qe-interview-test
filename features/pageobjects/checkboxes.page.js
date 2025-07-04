class CheckboxesPage {
  get elements() {
    return {
      header: () => $("h3"),
      checkbox: (num) => $(`input:nth-of-type(${num})`),
    };
  }

  async select(num) {
    const checkbox = await this.elements.checkbox(num);
    await checkbox.waitForExist({ timeout: 5000 });
    const isSelected = await checkbox.isSelected();
    if (!isSelected) {
      await checkbox.click();
    }
  }
}

export default new CheckboxesPage();
