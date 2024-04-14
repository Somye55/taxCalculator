document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('tax-form');
    const resultModal = document.getElementById('resultModal');
    const taxResult = document.getElementById('tax-result');
    const inputFields = document.querySelectorAll('#tax-form input[type="text"]');
    const ageGroup = document.getElementById('age');

    inputFields.forEach(function (field) {
        field.addEventListener('input', function () {
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
                exclamationIcon.style.visibility = 'visible';
                exclamationIcon.style.opacity = 1;
                new bootstrap.Tooltip(exclamationIcon, {
                    title: tooltipText,
                    placement: "top"
                });
            }
            else {
                exclamationIcon.style.visibility = 'hidden';
                exclamationIcon.style.opacity = 0;
            }
        })
    })

    form.addEventListener('submit', function (e) {
        const grossIncome = parseFloat(document.getElementById('annual-income').value) || 0;
        const extraIncome = parseFloat(document.getElementById('extra-income').value) || 0;
        const deductions = parseFloat(document.getElementById('total-ded').value) || 0;
        let hasError = false;
        e.preventDefault();

        inputFields.forEach(function (field) {
            if (field.value.trim() === '') {
                hasError = true;
                const exclamationIcon = field.nextElementSibling.firstElementChild;
                if (exclamationIcon) {
                    exclamationIcon.style.visibility = 'visible';
                    exclamationIcon.style.opacity = 1;
                    new bootstrap.Tooltip(exclamationIcon, {
                        title: "Input field is required!",
                        placement: "top"
                    });
                }
            }
            else if (isNaN(field.value)) {
                hasError = true;
                const exclamationIcon = field.nextElementSibling.firstElementChild;
                if (exclamationIcon) {
                    exclamationIcon.style.visibility = 'visible';
                    exclamationIcon.style.opacity = 1;
                    new bootstrap.Tooltip(exclamationIcon, {
                        title: "Please enter numerical characters only!",
                        placement: "top"
                    });
                }
            }
        });
        if (ageGroup.value == '') {
            const exclamationIcon = ageGroup.nextElementSibling.firstElementChild;
            exclamationIcon.style.visibility = 'visible';
            exclamationIcon.style.opacity = 1;
        }

        if (!ageGroup || !grossIncome || !extraIncome || !deductions) {
            hasError = true;
        }

        if (hasError) {
            return;
        }
        const totalIncome = grossIncome + extraIncome - deductions;
        let tax = 0;
        if (totalIncome > 800000) {
            const taxableIncome = totalIncome - 800000;
            console.log(ageGroup)
            if (ageGroup.value === '<40') {
                tax = taxableIncome * 0.3;
                console.log(tax)
            } else if (ageGroup.value === '>=40&<60') {
                tax = taxableIncome * 0.4;
            } else if (ageGroup.value === '>=60') {
                tax = taxableIncome * 0.1;
            }
        }
        if (hasError) {
            alert('Form is invalid. Please correct the errors.');
        }
        else {
            const incomeAfterTax = totalIncome - tax;
            taxResult.innerHTML = '';

            const taxAmount = document.createElement('p');
            taxAmount.textContent = 'Your tax is: ' + tax.toFixed(2);
            taxResult.appendChild(taxAmount);

            const afterTaxIncome = document.createElement('p');
            afterTaxIncome.textContent = 'Income after tax: ' + incomeAfterTax.toFixed(2);
            taxResult.appendChild(afterTaxIncome);

            resultModal.classList.add('show');
            resultModal.style.display = 'block';
        }
    });

    ageGroup.addEventListener('input', function (e) {
        e.preventDefault();
        const exclamationIcon = ageGroup.nextElementSibling.firstElementChild;
        if (ageGroup.value === '') {
            exclamationIcon.style.visibility = 'visible';
            exclamationIcon.style.opacity = 1;
        }
        else {
            exclamationIcon.style.visibility = 'hidden';
            exclamationIcon.style.opacity = 0;

        }
    })

    function closeModal() {
        resultModal.classList.remove('show');
        resultModal.style.display = 'none';
    }

    const closeButton = document.getElementById('close');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    inputFields.forEach(function (inputField) {
        inputField.value = '';
    });
    ageGroup.value = '';
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})
