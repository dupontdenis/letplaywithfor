export const DisplayModule = {
  sequence1Display: document.getElementById("highlighted-sequence1"),
  resultMessage: document.getElementById("result-message"),
  historyContainer: document.getElementById("history-container"),

  updateSequence1Display(content) {
    if (this.sequence1Display) {
      this.sequence1Display.innerHTML = content;
    }
  },

  updateResultMessage(message) {
    if (this.resultMessage) {
      this.resultMessage.textContent = message;
    }
  },

  clearDisplays() {
    if (this.sequence1Display) {
      this.sequence1Display.innerHTML = "";
    }
    if (this.resultMessage) {
      this.resultMessage.textContent = "";
    }
    if (this.historyContainer) {
      this.historyContainer.innerHTML = "";
    }
  },

  appendToHistory(content) {
    if (this.historyContainer) {
      const stepElement = document.createElement("p");
      stepElement.innerHTML = content;
      this.historyContainer.appendChild(stepElement);
    }
  },

  underlineGreen(value) {
    return `<u class="highlight-green">${value}</u>`;
  },

  underlineOrange(value) {
    return `<u class="highlight-orange">${value}</u>`;
  },

  underlineRed(value) {
    return `<u class="highlight-red">${value}</u>`;
  },

  underlineBlack(value) {
    return `<u class="highlight-black">${value}</u>`;
  },

  underlineMiddle(value) {
    return `<u class="highlight-middle">${value}</u>`;
  },
};
