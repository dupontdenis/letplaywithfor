import { DisplayModule } from "./displayModule.mjs";
import { emojiProperties } from "./emojiProperties.mjs";

export const ControlModule = {
  sequence1Input: document.getElementById("sequence1"),
  sequence2Input: document.getElementById("sequence2"),
  nextStepButton: document.getElementById("next-step"),

  sequence1Index: 0,
  sequence2Index: 0,
  isSequenceFound: false,
  foundIndices: [],

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
    this.foundIndices = [];
    DisplayModule.clearDisplays();

    // Fetch the updated sequences
    const { sequence1, sequence2 } = this.getSequences();

    // Update the visualization with no current index highlighted
    DisplayModule.updateSequence1Display(sequence1, this.foundIndices, null); // Pass null for currentIndex
    DisplayModule.updateSequence2Display(sequence2, -1); // No specific index to highlight

    // Re-enable the "Next Step" button
    this.nextStepButton.disabled = false;
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
    const { sequence1, sequence2 } = this.getSequences();

    // Use Intl.Segmenter to split sequence1 into graphemes
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    const graphemes1 = Array.from(
      segmenter.segment(sequence1),
      (segment) => segment.segment
    );

    // Check the current character in sequence1
    if (this.sequence1Index < graphemes1.length) {
      const currentChar = graphemes1[this.sequence1Index];
      console.log(
        `Checking character: ${currentChar} at index ${this.sequence1Index}`
      );

      // Get the properties of the current emoji
      const properties = emojiProperties.get(currentChar);

      // Check if the current emoji matches the selected property
      if (properties && Object.values(properties).includes(sequence2)) {
        console.log(
          `Match found: ${currentChar} at index ${this.sequence1Index}`
        );
        this.foundIndices.push(this.sequence1Index); // Store the index of the match
      }

      // Update the visualization with all found indices and the current index
      DisplayModule.updateSequence1Display(
        sequence1,
        this.foundIndices, // Pass the array of found indices
        this.sequence1Index // Pass the current index
      );

      // Move to the next character in sequence1
      this.sequence1Index++;
    } else {
      // If the iteration is complete, display the result
      if (this.foundIndices.length > 0) {
        DisplayModule.updateResultMessage(
          `Matches found at indices: ${this.foundIndices.join(", ")}`
        );
      } else {
        DisplayModule.updateResultMessage("No matches found.");
      }

      // Final update to display only the correct indices in green
      DisplayModule.updateSequence1Display(
        sequence1,
        this.foundIndices, // Pass only the array of found indices
        null // No current index to highlight
      );

      // Disable the button to prevent further clicks
      this.nextStepButton.disabled = true;
    }
  },

  /**
   * Initializes the control module.
   */
  initialize() {
    // Reset the visualization when the user changes the sequence1 input
    this.sequence1Input.addEventListener("input", () =>
      this.resetVisualization()
    );

    // Reset the visualization when the user changes the sequence2 input
    this.sequence2Input.addEventListener("input", () =>
      this.resetVisualization()
    );

    // Handle the "Next Step" button click
    this.nextStepButton.addEventListener("click", () => this.handleNextStep());

    // Ensure everything is reset at the start
    this.resetVisualization();
  },
};
