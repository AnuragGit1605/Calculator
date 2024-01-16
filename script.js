let display = document.getElementById("display");
let cursorPosition = 0;

function appendValue(value) {
    // Get current value
    let currentValue = display.value;

    // Insert the new value at the cursor position
    display.value = currentValue.substring(0, cursorPosition) + value + currentValue.substring(cursorPosition);

    // Move the cursor after the inserted value
    cursorPosition += value.length;

    // Update the display with the cursor
    updateDisplayWithCursor();
}
function clearDisplay() {
    display.value = "";
    cursorPosition = 0;
    updateDisplayWithCursor();
}

function calculate() {
    try {
        // Remove "|" before evaluating
        let expression = display.value.replace("|", "");

        // Check if "sin", "cos", "tan", or "√" is present in the expression
        if (expression.includes("sin")) {
            expression = expression.replace("sin", "");
            const inputValue = parseFloat(expression);
            const sinValue = Math.sin(inputValue * (Math.PI / 180)); // Convert degrees to radians
            display.value = sinValue;
        } else if (expression.includes("cos")) {
            expression = expression.replace("cos", "");
            const inputValue = parseFloat(expression);
            const cosValue = Math.cos(inputValue * (Math.PI / 180)); // Convert degrees to radians
            display.value = cosValue;
        } else if (expression.includes("tan")) {
            expression = expression.replace("tan", "");
            const inputValue = parseFloat(expression);
            const tanValue = Math.tan(inputValue * (Math.PI / 180)); // Convert degrees to radians
            display.value = tanValue;
        } else if (expression.includes("√")) {
            expression = expression.replace("√", "");
            const sqrtValue = Math.sqrt(eval(expression));
            display.value = sqrtValue;
        } else {
            // Handle percentage calculation
            expression = expression.replace(/%/g, '/100');
            
            // Loop to handle right associativity of '^'
            let indexOfExponent = expression.indexOf('^');
            
            while (indexOfExponent !== -1) {
                const baseValue = parseFloat(expression.substring(0, indexOfExponent));
                const exponentValue = parseFloat(expression.substring(indexOfExponent + 1));
                const result = Math.pow(baseValue, exponentValue);

                // Replace the current '^' expression with the result
                expression = expression.substring(0, indexOfExponent - baseValue.toString().length) + result + expression.substring(indexOfExponent + exponentValue.toString().length + 1);

                indexOfExponent = expression.indexOf('^');
            }

            // After handling all '^', evaluate the modified expression
            display.value = eval(expression);
        }

        cursorPosition = display.value.length;
        updateDisplayWithCursor();
    } catch (error) {
        display.value = "Error";
        cursorPosition = display.value.length;
        updateDisplayWithCursor();
    }
}
function backspace() {
    // Check if there is something before the cursor
    if (cursorPosition > 0) {
        // Delete the character before the cursor
        let currentValue = display.value;
        display.value = currentValue.substring(0, cursorPosition - 1) + currentValue.substring(cursorPosition);

        // Move the cursor one position back
        cursorPosition--;

        // Update the display with the cursor
        updateDisplayWithCursor();
    }
}

function updateDisplayWithCursor() {
    // Remove existing "|" before updating
    let currentValue = display.value.replace("|", "");
    
    // Display the cursor "|"
    display.value = currentValue.substring(0, cursorPosition) + "|" + currentValue.substring(cursorPosition);

    // Set the selection range to the cursor position
    display.setSelectionRange(cursorPosition, cursorPosition);
}

    

