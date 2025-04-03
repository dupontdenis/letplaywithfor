import { DisplayModule } from "./displayModule.mjs";
import { emojiProperties } from "./emojiProperties.mjs";

export const ControlModule = {
  sequence1Input: document.getElementById("sequence1"),
  sequence2Input: document.getElementById("sequence2"),
  nextStepButton: document.getElementById("next-step"),

  sequence1Index: 0,
  foundIndices: [],

  /**
   * Fetches the sequences and selected properties from the input fields.
   * @returns {Object} An object containing sequence1 and selectedProperties.
   */
  getSequences() {
    const sequence1 = this.sequence1Input.value;

    // Get all selected properties from the multi-select dropdown
    const selectedProperties = Array.from(
      this.sequence2Input.selectedOptions
    ).map((option) => option.value);

    return { sequence1, selectedProperties };
  },

  /**
   * Resets the visualization and all variables to their initial state.
   */
  resetVisualization() {
    this.sequence1Index = 0;
    this.foundIndices = [];
    DisplayModule.clearDisplays();

    // Fetch the updated sequences
    const { sequence1 } = this.getSequences();

    // Update the visualization with no current index highlighted
    DisplayModule.updateSequence1Display(sequence1, this.foundIndices, null); // Pass null for currentIndex

    // Re-enable the "Next Step" button
    this.nextStepButton.disabled = false;
  },

  /**
   * Handles the next step in the sequence matching process.
   */
  handleNextStep() {
    const { sequence1, selectedProperties } = this.getSequences();

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

      // Check if the current emoji matches any of the selected properties
      if (
        properties &&
        selectedProperties.some((property) =>
          Object.values(properties).includes(property)
        )
      ) {
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
    this.sequence2Input.addEventListener("change", () =>
      this.resetVisualization()
    );

    // Handle the "Next Step" button click
    this.nextStepButton.addEventListener("click", () => this.handleNextStep());

    // Ensure everything is reset at the start
    this.resetVisualization();
  },
};
