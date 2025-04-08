import { DisplayModule } from "./displayModule.mjs";

export const ControlModule = {
  sequence1Input: document.getElementById("sequence1"),
  sequence2Input: document.getElementById("sequence2"),
  nextStepButton: document.getElementById("next-step"),

  left: 0, // Left boundary of the search range
  right: 0, // Right boundary of the search range
  mid: -1, // Middle index
  state: [], // State array to track the color of each element
  targetFound: false, // Flag to indicate if the target is found
  hasStarted: false, // Flag to track if the algorithm has started
  iteration: 0, // Add an iteration counter

  /**
   * Fetches the ordered list and target value from the input fields.
   * @returns {Object} An object containing the ordered list and target value.
   */
  getInputs() {
    return {
      orderedList: this.sequence1Input.value.split(" ").map(Number), // Convert to an array of numbers
      targetValue: Number(this.sequence2Input.value), // Convert to a number
    };
  },

  /**
   * Resets the visualization and all variables to their initial state.
   */
  resetVisualization() {
    const { orderedList } = this.getInputs();
    this.left = 0; // Start at the first index
    this.right = orderedList.length - 1; // End at the last index
    this.mid = -1; // Reset the middle index
    this.state = new Array(orderedList.length).fill("black"); // Initialize all elements as black
    this.targetFound = false; // Reset the target found flag
    this.hasStarted = false; // Reset the algorithm state
    this.iteration = 0; // Reset the iteration counter
    this.nextStepButton.textContent = "Run"; // Reset the button text
    DisplayModule.clearDisplays(); // Clear all displays, including history
  },

  /**
   * Updates the visualization for the ordered list.
   */
  updateVisualization() {
    const { orderedList, targetValue } = this.getInputs();

    console.log("Updating visualization...");
    console.log(`Left=${this.left}, Mid=${this.mid}, Right=${this.right}`);
    console.log("Ordered List:", orderedList);

    // Update the state array
    for (let i = 0; i < orderedList.length; i++) {
      if (i === this.mid) {
        this.state[i] = "middle"; // Highlight the middle element
        console.log(`Index=${i}, Value=${orderedList[i]}, State=middle`);
      } else if (i >= this.left && i < this.mid) {
        // Left to mid-1: orange if value > middle value
        if (targetValue > orderedList[this.mid]) {
          this.state[i] = "black"; // Neutral part
          console.log(`Index=${i}, Value=${orderedList[i]}, State=black`);
        } else {
          this.state[i] = "orange"; // Neutral part
          console.log(`Index=${i}, Value=${orderedList[i]}, State=orange`);
        }
      } else if (i > this.mid && i <= this.right) {
        // Mid+1 to right: orange if value < middle value
        if (targetValue > orderedList[this.mid]) {
          this.state[i] = "orange";
          console.log(`Index=${i}, Value=${orderedList[i]}, State=orange`);
        } else {
          this.state[i] = "black"; // Neutral part
          console.log(`Index=${i}, Value=${orderedList[i]}, State=black`);
        }
      } else if (this.state[i] === "black") {
        this.state[i] = "red"; // Transition previous orange to red
        console.log(`Index=${i}, Value=${orderedList[i]}, State=red`);
      }
      // } else {
      //   this.state[i] = "black"; // Neutral part
      //   console.log(`Index=${i}, Value=${orderedList[i]}, State=black`);
      // }
    }

    // Generate the highlighted content based on the state array
    const highlighted = orderedList.map((value, index) => {
      switch (this.state[index]) {
        case "middle":
          return DisplayModule.underlineMiddle(value);
        case "orange":
          return DisplayModule.underlineOrange(value);
        case "red":
          return DisplayModule.underlineRed(value);
        default:
          return DisplayModule.underlineBlack(value);
      }
    });

    const highlightedContent = highlighted.join(" ");
    DisplayModule.updateSequence1Display(highlightedContent);

    // Append to history only if the algorithm has started
    if (this.hasStarted) {
      const historyContent = highlighted.join(" "); // Use the same highlighted array
      DisplayModule.appendToHistory(historyContent);
    }
  },

  /**
   * Handles the binary search process step by step.
   */
  handleNextStep() {
    if (this.targetFound || this.left > this.right) {
      return; // Stop if the target is found or the search range is invalid
    }

    this.hasStarted = true; // Mark that the algorithm has started
    this.iteration++; // Increment the iteration counter

    const { orderedList, targetValue } = this.getInputs();

    // Calculate the middle index
    this.mid = Math.floor((this.left + this.right) / 2);

    console.log(`Left=${this.left}, Mid=${this.mid}, Right=${this.right}`);
    console.log("Ordered List:", orderedList);

    // Visualize the current state BEFORE updating the search range
    this.updateVisualization();

    // Update the button text with the current iteration
    this.nextStepButton.textContent = `Iteration = ${this.iteration}`;

    // Check if the target is found
    if (orderedList[this.mid] === targetValue) {
      this.targetFound = true;
      DisplayModule.updateResultMessage(`Target found at index ${this.mid}!`);

      // Change the button color to green
      this.nextStepButton.classList.remove("btn-primary");
      this.nextStepButton.classList.add("btn-success");
      return; // Stop further processing
    }

    // Update the search range AFTER visualizing the current state
    if (orderedList[this.mid] < targetValue) {
      this.left = this.mid + 1; // Search the right half
    } else {
      this.right = this.mid - 1; // Search the left half
    }

    // If the search range becomes invalid, the target is not found
    if (this.left > this.right) {
      DisplayModule.updateResultMessage("Search complete! Target not found.");

      // Change the button color to green
      this.nextStepButton.classList.remove("btn-primary");
      this.nextStepButton.classList.add("btn-success");
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
    this.resetVisualization(); // Only reset, do not run the algorithm
  },
};
