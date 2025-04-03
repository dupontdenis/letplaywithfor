import { DisplayModule } from "./displayModule.mjs";

export const ControlModule = {
  sequence1Input: document.getElementById("sequence1"),
  sequence2Input: document.getElementById("sequence2"),
  nextStepButton: document.getElementById("next-step"),

  sequence1Index: 0,
  sequence2Index: 0,
  isSequenceFound: false,

  /**
   * Fetches the sequences from the input fields.
   * @returns {Object} An object containing sequence1 and sequence2.
   */
  getSequences() {
    return {
      sequence1: this.sequence1Input.value,
      sequence2: this.sequence2Input.value,
    };
  },

  /**
   * Resets the visualization and all variables to their initial state.
   */
  resetVisualization() {
    this.sequence1Index = 0;
    this.sequence2Index = 0;
    this.isSequenceFound = false;
    DisplayModule.clearDisplays();
    this.updateVisualization(); // Reinitialize the visualization
  },

  /**
   * Updates the visualization for both sequences.
   */
  updateVisualization() {
    const { sequence1, sequence2 } = this.getSequences();
    DisplayModule.updateSequence1Display(
      sequence1,
      this.sequence1Index,
      this.sequence2Index,
      this.isSequenceFound,
      sequence2
    );
    DisplayModule.updateSequence2Display(sequence2, this.sequence2Index);
  },

  /**
   * Handles the next step in the sequence matching process.
   */
  handleNextStep() {
    if (this.isSequenceFound) {
      return; // Stop the process if the sequence is already found
    }

    const { sequence1, sequence2 } = this.getSequences();

    // Use Intl.Segmenter to split both sequences into graphemes
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    const graphemes1 = Array.from(
      segmenter.segment(sequence1),
      (segment) => segment.segment
    );
    const graphemes2 = Array.from(
      segmenter.segment(sequence2),
      (segment) => segment.segment
    );

    if (this.sequence1Index < graphemes1.length - graphemes2.length + 1) {
      console.log(
        "sequence1 : ",
        this.sequence1Index + this.sequence2Index,
        graphemes1[this.sequence1Index + this.sequence2Index]
      );
      console.log(
        "sequence2 : ",
        this.sequence2Index,
        graphemes2[this.sequence2Index]
      );

      if (
        graphemes1[this.sequence1Index + this.sequence2Index] ===
        graphemes2[this.sequence2Index]
      ) {
        // Characters match, move to the next character in both sequences
        console.log("******* Characters match *******");
        this.sequence2Index++; // Move to the next character in sequence2
        if (this.sequence2Index === graphemes2.length) {
          this.isSequenceFound = true; // Mark the sequence as found
          DisplayModule.updateResultMessage(
            `Sequence found at index ${this.sequence1Index}!`
          );
          this.updateVisualization();
          return;
        }
      } else {
        console.log("Characters do not match. Resetting sequence2.");
        // Characters do not match
        this.sequence1Index++; // Move to the next character in sequence1
        this.sequence2Index = 0; // Reset sequence2 to the beginning
      }

      this.updateVisualization();
    } else {
      DisplayModule.updateResultMessage("Search complete! Sequence not found.");
    }
  },

  /**
   * Initializes the control module.
   */
  initialize() {
    this.sequence1Input.addEventListener("input", () =>
      this.resetVisualization()
    );
    this.sequence2Input.addEventListener("input", () =>
      this.resetVisualization()
    );
    this.nextStepButton.addEventListener("click", () => this.handleNextStep());
    this.resetVisualization();
    this.updateVisualization();
  },
};
