
# Actalent Assignment

This repository contains the solution for Actalent's assignments.

## Getting Started

To run the code:

1. Clone this repository
2. Enter following command: `npm install`
3. Second command: `npm run build`
4. Open `index.html` in your web browser (located in root)
5. Open the browser's developer tools (F12 or right-click -> Inspect)
6. Navigate to the Console tab to view all test results

## Structure

- `index.html` - Main entry point that runs all tests
- `src/assignements/assignment(1/2).js` - Contains the assignements

## Test Results

All test results will be displayed in the browser's console, showing:
- Passed
- Failed

## Running Locally

Simply double-click the `index.html` file or open it with your preferred web browser to execute all tests.
make sure to enter the commands `npm install` and `npm run build` before opening the  index.html file.

## Process and learning points
While working on my coding assignments, I delved into understanding what a Finite State Machine (FSM) is by reading various online documents. I invested significant time in writing the logic. After installing TypeScript, I encountered errors due to duplicate variable assignments across separate files. To streamline my workflow, I wanted to auto-run the index.html file using an npm run start command, so I installed Webpack. This allowed me to export variables, reducing redundant code and types while bundling files in the dist folder. I spent a considerable amount of time configuring everything to work smoothly. Additionally, I installed Jest for testing purposes. However, as the codebase expanded significantly for just two assignments, I decided to restart the project, opting to use TypeScript with simple testing  (non jest) instead, I didnt had enough time for the last assignment.