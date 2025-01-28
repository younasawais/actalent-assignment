// Type definitions for FSM configuration
interface FSMConfig {
    states: string[];
    alphabet: string[];
    initialState: string;
    finalStates: string[];
    transitions: TransitionMap;
    outputMap: OutputMap;
}

// Type for transition map structure
interface TransitionMap {
    [state: string]: {
        [input: string]: string;
    };
}

// Type for output map structure
interface OutputMap {
    [state: string]: number;
}


// Constants
const errOneAndZeros = "Please enter a valid binary number (only 1s and 0s).";

class FiniteStateMachine {
    private alphabet: string[]; // Σ is a finite input alphabet;
    private initialState: string; // q0 ∈ Q is the initial state;
    private transitions: TransitionMap; // δ:Q×Σ→Q is the transition function.
    private outputMap: OutputMap; 

    constructor(config: FSMConfig) {
        this.alphabet = config.alphabet;
        this.initialState = config.initialState;
        this.transitions = config.transitions;
        this.outputMap = config.outputMap;
    }

    public process(inputString: string): number {
        let currentState: string = this.initialState;
        
        const inputs: string[] = inputString.split('');
        
        for (const input of inputs) {
            if (!this.alphabet.includes(input)) {
                throw new Error(`Invalid input symbol: ${input}`);
            }
            
            const nextState = this.transitions[currentState]?.[input];
            if (!nextState) {
                throw new Error(`No transition defined for state ${currentState} with input ${input}`);
            }
            
            currentState = nextState;
        }
        
        return this.outputMap[currentState];
    }
}

// ModThree FSM Configuration with type annotation
const modThreeConfig: FSMConfig = {
    states: ['S0', 'S1', 'S2'],  // Q is a finite set of states;
    alphabet: ['0', '1'],  // Σ is a finite input alphabet;
    initialState: 'S0', // q0 ∈ Q is the initial state;
    finalStates: ['S0', 'S1', 'S2'], // F ⊆ Q is the set of accepting/final states;
    transitions: {
        'S0': { '0': 'S0', '1': 'S1' },
        'S1': { '0': 'S2', '1': 'S0' },
        'S2': { '0': 'S1', '1': 'S2' }
    },
    outputMap: {
        'S0': 0,
        'S1': 1,
        'S2': 2
    }
};

// Event handler function
const binaryFSMAdvancedInputChanged = (e: Event): string | void => {
    const target = e.target as HTMLInputElement;
    const binaryString: string = target.value;
    
    const binaryRegex: RegExp = /^[01]+$/;
    
    // If no value has been entered in the input field, return error massage
    if (!binaryRegex.test(target.value)) {
        alert(errOneAndZeros);
        console.log(errOneAndZeros);
        return 'Error -> Invalid input';
    }
    
    const calculateMod3 = new FiniteStateMachine(modThreeConfig);
    const result: number | string = calculateMod3.process(binaryString);
    
    const resultElement: HTMLElement | null = document.getElementById('resultAdvanced');
    if (resultElement) {
        resultElement.textContent = `Result: ${result}`;
    } else {
        console.error(errIdNotFound);
    }
};

// Test cases function
const runTestsAdvanced = (): void => {
    const calculateMod3 = new FiniteStateMachine(modThreeConfig);
    console.log("***** Running tests assignment 2 Advanced... ******");
    const testCases: TestCaseAssignment1[] = [
        { input: "110", expected: 0, comment: 'Test case 1: 1101' },
        { input: "1010", expected: 1, comment: 'Test case 2: 1010' },
        { input: "1011", expected: 2, comment: 'Test case 3: 1011' },
        { input: "1111", expected: 0, comment: 'Test case 4: 1111' },
        { input: "1", expected: 1, comment: 'Test case 5: Single bit' },
        { input: "10", expected: 2, comment: 'Test case 6: Multiple bits' },
        { input: "1011011", expected: 1, comment: 'Test case 7: Larger number of bits' },
    ];

    testCases.forEach((test: TestCaseAssignment1) => {
        const result: number | string = calculateMod3.process(test.input);
        console.log(
            `Input: ${test.input}, Result: ${result}, ` +
            `Expected: ${test.expected}, ` +
            `Test ${result === test.expected ? 'PASSED' : 'FAILED'}`
        );
    });
    console.log("***** END tests assignment 2 Advanced... ******\n\n");
}

// Set up event listener when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // Run the tests
    runTestsAdvanced();
});
