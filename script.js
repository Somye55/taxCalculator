document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('tax-form');
    const ageSelect = document.getElementById('age');
    const ageErrorFeedback = ageSelect.nextElementSibling;
    const resultModal = document.getElementById('resultModal');
    const taxResult = document.getElementById('tax-result');


    const numberFields = document.querySelectorAll('input[type="text"]');

    // Function to create a tooltip
    function createTooltip(element, message) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = message;
        element.appendChild(tooltip);
        return tooltip;
    }
    function showCustomError(input, message) {
        const errorFeedback = input.nextElementSibling;
        errorFeedback.nextElementSibling.textContent = message;
        errorFeedback.style.display = 'block';
        input.classList.add('is-invalid');
    }
    
    function isFieldValid(field) {
        const value = field.value;
        return !(isNaN(value) || value.trim() === '');
    }

    // Function to check if the selected age is valid
    function isAgeValid(select) {
        return select.value !== '';
    }

    // Event listener for the "Age" select element
    ageSelect.addEventListener('change', function() {
        if (isAgeValid(ageSelect)) {
            // If the selected age is valid, remove the invalid feedback
            ageErrorFeedback.style.display = 'none';
            ageSelect.classList.remove('is-invalid');
        } else {
            // If the selected age is not valid, show the invalid feedback
            ageErrorFeedback.style.display = 'block';
            ageSelect.classList.add('is-invalid');
        }
    });

    function validateForm() {
        let allValid = true;

        numberFields.forEach(function(field) {
            if (!isFieldValid(field)) {
                field.classList.add('is-invalid');
                allValid = false;
            } else {
                field.classList.remove('is-invalid');
            }
        });

        return allValid;
    }
    // Add input event listener to each number field
    numberFields.forEach(function(field) {
        const errorIcon = field.nextElementSibling.querySelector('.input-group-text');
        const tooltip = createTooltip(errorIcon, 'Please enter a valid number.');

        field.addEventListener('input', function() {
            const value = field.value;

            if (isNaN(value) || value.trim() === '') {
                showCustomError(field,'Please enter only numerical characters.');                              
                errorIcon.style.display = 'block';
                tooltip.style.display = 'block';
            } else {
                form.classList.add("is-validated");
                field.classList.remove('is-invalid');
                errorIcon.style.display = 'none';
                tooltip.style.display = 'none';
            }
        });
    });

    // Ensure the form's submit event listener is set up to validate the form
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate and calculate tax
        const grossIncome = parseFloat(document.getElementById('annual-income').value) || null;
        const extraIncome = parseFloat(document.getElementById('extra-income').value) || null;
        const deductions = parseFloat(document.getElementById('total-ded').value) || null;
        const ageGroup = document.getElementById('age').value;

        let hasError = false;

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
        if (!validateForm()) {
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
        input.classList.add('is-invalid');
    }
});
