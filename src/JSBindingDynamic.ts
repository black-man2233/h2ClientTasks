//Comments are generated by Co-Pilot

let buttonCounter = 0; // Counter to keep track of the number of buttons added
let textBoxElement: HTMLInputElement | null; // Reference to the text box element
let documentButton: HTMLInputElement | null; // Reference to the button element

function SetupDOMElements() {
    textBoxElement = document.getElementById("txtButtonContext") as HTMLInputElement; // Get the text box element by its ID and cast it to HTMLInputElement type
}


function AddNewButton() {
    const pre = document.createElement("pre");
    const buttonsAdded = document.getElementsByClassName("ButtonsAdded")[0] as HTMLElement;
    buttonsAdded.appendChild(pre);

    const button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.setAttribute('id', `btn${buttonCounter}`);
    button.setAttribute('value', `btnShow${buttonCounter}`);
    button.setAttribute('onclick', `AddedButtonClicked(${buttonCounter})`);
    button.style.backgroundColor = "blue";
    button.style.color = "white";
    button.style.height = "40px";

    buttonsAdded.appendChild(button);

    // Create and append the delete button
    const deleteButton = document.createElement('input');
    deleteButton.setAttribute('type', 'button');
    deleteButton.setAttribute('value', 'Delete');
    deleteButton.setAttribute('onclick', `DeleteButton(${buttonCounter})`);
    buttonsAdded.appendChild(deleteButton);

    buttonCounter++;
}

function DeleteButton(buttonCounter: number) {
    let buttonContainer = document.getElementsByClassName("ButtonsAdded")[0] as HTMLElement | null;
    const button = document.getElementById(`btn${buttonCounter}`);
    const pre = document.getElementsByTagName("pre")[buttonCounter - 1];
    const deleteButton = document.querySelector(`input[value="Delete"][onclick="DeleteButton(${buttonCounter})"]`);

    if (button != null && buttonContainer != null) {
        if (deleteButton != null) {
            buttonContainer.removeChild(button);
            buttonContainer.removeChild(pre);
            buttonContainer.removeChild(deleteButton);
        }
    }
    buttonContainer = null;
    buttonCounter--; // Decrement the buttonCounter since a button is deleted
}


function AddedButtonClicked(buttonCounter: number) {
    documentButton = document.getElementById(`btn${buttonCounter}`) as HTMLInputElement; // Get the button element by its ID and cast it to HTMLInputElement type using the buttonCounter variable
    if (textBoxElement) {
        textBoxElement.value = documentButton.value; // Set the value of the text box to the value of the clicked button
        textBoxElement.style.width = CalculateWidthOnControl(textBoxElement); // Call the CalculateWidthOnControl function to calculate and set the width of the text box based on its value
        console.log(textBoxElement.style.width); // Print the width of the text box to the console
    }
}

function TextboxValueChanged() {
    if (documentButton && textBoxElement) {
        documentButton.value = textBoxElement.value; // Set the value of the button to the value of the text box
        textBoxElement.style.width = CalculateWidthOnControl(textBoxElement); // Call the CalculateWidthOnControl function to calculate and set the width of the text box based on its value
        console.log(textBoxElement.style.width); // Print the width of the text box to the console
    }
}

function CalculateWidthOnControl(controlObject: HTMLInputElement) {
    const controlWidth = controlObject.value.length; // Get the length of the value in the controlObject
    console.log(controlWidth); // Print the length of the value to the console
    return `${controlWidth * 9 + 25}px`; // Calculate and return the width of the control as a string with "px" unit
}

// Call the SetupDOMElements function when the page is loaded
// window.onload = function () {
//   SetupDOMElements();
// };
