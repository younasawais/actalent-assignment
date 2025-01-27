// Type definitions
type State = 'S0' | 'S1' | 'S2';
type StateTransitions = Record<State, [State, State]>;
type StateOutputs = Record<State, number>;
type TestCaseAssignment1 = {
    input: string;
    expected: number;
    comment: string;
};

// Constants
const errMessageOneAndZeros = "Please enter a valid binary number (only 1s and 0s).";
const errIdNotFound = "Element with ID 'result' not found in the DOM.";

/**
 * Calculates the mod-3 value of a binary string using FSM approach
 * @param binaryString - Input binary string (e.g., "110")
 * @returns Remainder when divided by 3 (0, 1, or 2)
 */
function calculateMod3(binaryString: string): number {
    // Define state transition table
    // Format: [nextStateFor0, nextStateFor1]
    const stateTransitions: StateTransitions = {
        'S0': ['S0', 'S1'],
        'S1': ['S2', 'S0'],
        'S2': ['S1', 'S2']
    };

    // Define output values for final states
    const stateOutputs: StateOutputs = {
        'S0': 0,
        'S1': 1,
        'S2': 2
    };

    // Initialize current state
    let currentState: State = 'S0';

    // Process each bit in the input string
    for (const bit of binaryString) {
        // Get next state based on current state and input bit
        currentState = stateTransitions[currentState][parseInt(bit)];
    }

    // Return output value for final state
    return stateOutputs[currentState];
}

// Event handler function
const binaryFSMInputChanged = (e: Event): string | void => {
    const target = e.target as HTMLInputElement;
    const binaryString: string = target.value;
    
    const binaryRegex: RegExp = /^[01]+$/;
    
    if (!binaryRegex.test(target.value)) {
        alert(errMessageOneAndZeros);
        console.log(errMessageOneAndZeros);
        return 'Error -> Invalid input';
    }
    
    const result: number = calculateMod3(binaryString);
    
    const resultElement: HTMLElement | null = document.getElementById('exResult2');
    if (resultElement) {
        resultElement.textContent = `Result: ${result}`;
    } else {
        console.error(errIdNotFound);
    }
};

// Test cases function
const runTests = (): void => {
    console.log("***** Running tests assignment 2... ******");
    const testCases: TestCaseAssignment1[] = [
        { input: "110", expected: 0, comment: 'Test case 1: 1101' },
        { input: "1010", expected: 1, comment: 'Test case 2: 1010' },
        { input: "1011", expected: 2, comment: 'Test case 3: 1011' },
        { input: "1111", expected: 0, comment: 'Test case 4: 1111' }
    ];

    testCases.forEach((test: TestCaseAssignment1) => {
        const result: number = calculateMod3(test.input);
        console.log(
            `Input: ${test.input}, Result: ${result}, ` +
            `Expected: ${test.expected}, ` +
            `Test ${result === test.expected ? 'PASSED' : 'FAILED'}`
        );
    });
    console.log("***** END tests assignment 2... ******\n\n");
}

// Set up event listener when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.getElementById('binaryInputFSM');
    if (inputElement) {
        inputElement.addEventListener('change', binaryFSMInputChanged);
    }
    
    // Run the tests
    runTests();
});
