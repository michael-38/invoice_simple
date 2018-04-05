# Invoice Simple Coding Challenge

## Getting Started

* Install all dependencies (using the `npm install` command).
* Run the web server (using the `npm start` command).
* Let me know what you think!

## Code/Design Justifications

* Did not use regex to verfify email format since kickbox.io will verify deliverability of the email address
* User email will be verified when the user moves away from the email field (onBlur)
* Reason: The user should not be distracted by other visual stimulus when he/she is entering into the input field
