document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('tax-form');
    const ageSelect = document.getElementById('age');
    const resultModal = document.getElementById('resultModal');
    const taxResult = document.getElementById('tax-result');


    const inputFields = document.querySelectorAll('#tax-form input[type="text"]');
    const ageGroup = document.getElementById('age');
    const submitButton = document.getElementById('submit-button');
    
    inputFields.forEach(function(field) {
        field.addEventListener('input', function() {
            let allValid = true;
            let tooltipText = '';
            if (field.value.trim() === '') {
                 allValid = false;
                tooltipText = "Input field is required!";
            } else if (isNaN(field.value)) {
                 allValid = false;

                tooltipText = "Please enter only numerical characters!";
            }
            const exclamationIcon = field.nextElementSibling.firstElementChild;
            if (exclamationIcon && !allValid) {
                exclamationIcon.style.visibility = 'visible'; // Show the icon
                exclamationIcon.style.opacity = 1; // Show the icon
                new bootstrap.Tooltip(exclamationIcon, {
                    title: tooltipText,
                    placement: "top"
                });
            }
            else{
                exclamationIcon.style.visibility = 'hidden'; // Show the icon
                exclamationIcon.style.opacity = 0;
            }
        })
})

    // Attach event listener to the submit button
    // submitButton.addEventListener('click', function(e) {
    //     e.preventDefault(); // Prevent form submission
        

    // });
    

    // Ensure the form's submit event listener is set up to validate the form
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate and calculate tax
        const grossIncome = parseFloat(document.getElementById('annual-income').value) || 0;
        const extraIncome = parseFloat(document.getElementById('extra-income').value) || 0;
        const deductions = parseFloat(document.getElementById('total-ded').value) || 0;
        const ageGroup = document.getElementById('age').value;

        let hasError = false;

        inputFields.forEach(function(field) {
            if (field.value.trim() === '') {
                hasError = true;
                // Display the error icon for empty fields
                const exclamationIcon = field.nextElementSibling.firstElementChild;
                if (exclamationIcon) {
                    exclamationIcon.style.visibility = 'visible'; // Show the icon
                    exclamationIcon.style.opacity = 1; // Show the icon
                    new bootstrap.Tooltip(exclamationIcon, {
                        title: "Input field is required",
                        placement: "top"
                    });
                }
            }
        });

    if (!ageGroup) {
        showError(document.getElementById('age'));
        hasError = true;
    }
    if (!grossIncome) {
        showError(document.getElementById('annual-income'));
        hasError = true;
    }
    if (!extraIncome) {
        showError(document.getElementById('extra-income'));
        hasError = true;
    }
    if (!deductions) {
        showError(document.getElementById('total-ded'));
        hasError = true;
    }

    if (hasError) {
        return; // Prevent further execution if there's an error
    }

        const totalIncome = grossIncome + extraIncome - deductions;
        let tax = 0;

        if (totalIncome > 800000) {
            const taxableIncome = totalIncome - 800000;
            if (ageGroup === '<40') {
                tax = taxableIncome * 0.3;
            } else if (ageGroup === '>=40&<60') {
                tax = taxableIncome * 0.4;
            } else if (ageGroup === '>=60') {
                tax = taxableIncome * 0.1;
            }
        }
        console.log(hasError)
        if (hasError) {
            alert('Form is invalid. Please correct the errors.');
        } 
        else{
            taxResult.textContent = 'Your tax is: ' + tax.toFixed(2) + ' Lakhs';
            resultModal.classList.add('show'); // Add 'show' class to display the modal
            resultModal.style.display = 'block';
        }
        // Show result in modal
       
    });

     // Function to close the modal
    function closeModal() {
        resultModal.classList.remove('show'); // Remove 'show' class to hide the modal
        resultModal.style.display = 'none'; // Ensure the modal is hidden
    }

    // Attach event listener to the close button with text
    const closeButton = document.getElementById('close'); // Adjust this selector if necessary
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    function showError(input) {
        const errorFeedback = input.nextElementSibling;
        errorFeedback.style.display = 'block';
    }
    inputFields.forEach(function(inputField) {
        inputField.value = '';
    });
    ageGroup.value = '';
});
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
