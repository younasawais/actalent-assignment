// Define types
type ModResult = number | string;
type TestCase = {
    input: string;
    expected: ModResult;
    comment: string;
};

// Constants
const modValue: number = 3; // If in the future the mod value changes, we can change it here
const errMessageOnesAndZeros = "Please enter a valid binary number (only 1s and 0s).";


/**
 * Calculates the mod-3 value of a binary string
 * @param binary - Input binary string (e.g., "110")
 * @returns Remainder when divided by 3 (0, 1, or 2)
 */
const modulusCalc = (binary: string, mod: number): ModResult => {
    let remainder: number = 0;
    
    // Check if input is empty
    if(binary === "") return 'Error -> Empty input';

    // Iterate through each bit from left to right
    for (let i = 0; i < binary.length; i++) {
        // Shift current remainder left by 1 -> (multiply by 2)
        remainder = (remainder * 2) % mod;
        // Add current bit
        remainder = (remainder + (binary[i] === '1' ? 1 : 0)) % mod;
    }
    
    return remainder;
};

// Event handler function
const binaryInputChanged = (e: Event): ModResult => {
    console.log("Event:", e);
    
    // Type assertion to access target value
    const target = e.target as HTMLInputElement;
    console.log("Target value:", target.value);
    
    // Convert input to binary string
    const binaryString: string = target.value;
    
    const binaryRegex: RegExp = /^[01]+$/;
    
    if (!binaryRegex.test(target.value)) {
        alert(errMessageOnesAndZeros);
        console.log(errMessageOnesAndZeros);
        return 'Error -> Invalid input';
    }
    
    // Call the modulusCalc function with the binary string
    const result = modulusCalc(binaryString, modValue);
    
    // Update the result element
    const resultElement = document.getElementById('exResult1');
    if (resultElement) {
        resultElement.textContent = `Result: ${result}`;
    }
    
    return result;
};

// Test cases function
function runTests1(): void {
    const testCases: TestCase[] = [
        { input: "1101", expected: 1, comment: 'Test case 1: 1101' },
        { input: "1110", expected: 2, comment: 'Test case 2: 1110' },
        { input: "1111", expected: 0, comment: 'Test case 3: 1111' },
        { input: "1", expected: 1, comment: 'Test case 5: Single bit' },
        { input: "10", expected: 2, comment: 'Test case 6: Multiple bits' },
        { input: "1011011", expected: 1, comment: 'Test case 7: Larger number of bits' },
        { input: "", expected: 'Error -> Empty input', comment: 'Test case 8: Empty string' },
    ];

    console.log("***** Running tests assignment 1... ******");
    testCases.forEach(test => {
        const result = modulusCalc(test.input, modValue);
        console.log(
            `${test.comment}: `,
            `Input: ${test.input}, Result: ${result}, ` +
            `Expected: ${test.expected}, ` +
            `Test ${result === test.expected ? 'PASSED' : 'FAILED'}`
        );
    });
    console.log("***** END tests assignment 1... ******\n\n");
}

// Set up event listener when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.getElementById('binaryInputMod3');
    if (inputElement) {
        inputElement.addEventListener('change', binaryInputChanged);
    }
    
    // Run the tests
    runTests1();
});