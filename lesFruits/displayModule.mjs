export const DisplayModule = {
  sequence1Display: document.getElementById("highlighted-sequence1"),
  sequence2Display: document.getElementById("highlighted-sequence2"),
  resultMessage: document.getElementById("result-message"),

  /**
   * Creates a styled span element for a character.
   * @param {string} char - The character to display.
   * @param {Array<string>} classes - The CSS classes to apply.
   * @returns {string} The HTML string for the styled span element.
   */
  createStyledSpan(char, classes = []) {
    const span = document.createElement("span");
    span.textContent = char;
    span.classList.add(...classes); // Spread the classes array directly
    return span.outerHTML;
  },

  /**
   * Determines the appropriate CSS classes for a character in sequence1.
   * @param {number} i - The current index in sequence1.
   * @param {string} char - The character in sequence1.
   * @param {number} sequence1Index - The current index in sequence1.
   * @param {number} sequence2Index - The current index in sequence2.
   * @param {boolean} isSequenceFound - Whether the sequence has been found.
   * @param {Array<string>} graphemes2 - The graphemes of sequence2.
   * @returns {Array<string>} The CSS classes to apply.
   */
  getSequence1Classes(
    i,
    char,
    sequence1Index,
    sequence2Index,
    isSequenceFound,
    graphemes2
  ) {
    if (
      isSequenceFound &&
      i >= sequence1Index &&
      i < sequence1Index + graphemes2.length
    ) {
      return ["highlight-orange", "underline"]; // Matching sequence
    }
    if (!isSequenceFound && i < sequence1Index) {
      return ["highlight-red", "underline"]; // Characters before mismatch
    }
    if (!isSequenceFound && i === sequence1Index) {
      return ["underline"]; // Current character being checked
    }
    if (!isSequenceFound && i === sequence1Index + sequence2Index) {
      return char === graphemes2[sequence2Index]
        ? ["highlight-green", "underline"] // Current correct character
        : ["highlight-red", "underline"]; // Current incorrect character
    }
    if (
      !isSequenceFound &&
      i > sequence1Index &&
      i < sequence1Index + sequence2Index
    ) {
      return ["highlight-green", "underline"]; // Previously matched characters
    }

    return []; // Default for other characters
  },

  /**
   * Updates the visualization for sequence1.
   * @param {string} sequence1 - The first sequence.
   * @param {Array<number>} foundIndices - Array of indices that have already been found.
   * @param {number} currentIndex - The current index being processed.
   */
  updateSequence1Display(sequence1, foundIndices, currentIndex) {
    console.log("updateSequence1Display called");
    console.log("Current index: ", currentIndex);
    console.log("Found indices: ", foundIndices);

    // Use Intl.Segmenter to split sequence1 into graphemes
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    const graphemes1 = Array.from(
      segmenter.segment(sequence1),
      (segment) => segment.segment
    );

    // Map graphemes1 to styled spans
    this.sequence1Display.innerHTML = graphemes1
      .map((char, i) => {
        let classes = [];

        // Check if the index is in the foundIndices array
        if (foundIndices.includes(i)) {
          classes.push("highlight-green", "underline"); // Style for already found indices
        }

        // Highlight the current index being processed
        if (i === currentIndex) {
          classes.push("highlight-blue", "underline"); // Style for the current index
        }

        return this.createStyledSpan(char, classes);
      })
      .join("");

    console.log(this.sequence1Display.innerHTML);
  },

  /**
   * Updates the visualization for sequence2.
   * @param {string} sequence2 - The second sequence.
   * @param {number} sequence2Index - The current index in sequence2.
   */
  updateSequence2Display(sequence2, sequence2Index) {
    // Use Intl.Segmenter to split sequence2 into graphemes
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    const graphemes2 = Array.from(
      segmenter.segment(sequence2),
      (segment) => segment.segment
    );

    // Map graphemes2 to styled spans
    this.sequence2Display.innerHTML = graphemes2
      .map((char, i) => {
        const classes =
          i === sequence2Index ? ["highlight-blue", "underline"] : [];
        return this.createStyledSpan(char, classes);
      })
      .join("");

    // console.log(this.sequence2Display.innerHTML);
  },

  /**
   * Updates the result message.
   * @param {string} message - The message to display.
   */
  updateResultMessage(message) {
    this.resultMessage.textContent = message;
  },

  /**
   * Clears the displays and resets the result message.
   */
  clearDisplays() {
    this.sequence1Display.innerHTML = "";
    this.sequence2Display.innerHTML = "";
    this.resultMessage.textContent = "";
  },
};
