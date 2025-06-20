// Wait for the entire HTML document to be fully loaded and parsed before running the script
document.addEventListener('DOMContentLoaded', function() {
    // --- Smooth Scrolling for Navigation Links ---
    // Select all anchor links within the navigation list that have an href starting with '#'
    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Prevent the default anchor click behavior (which is to jump to the section)
            event.preventDefault();
            const targetId = this.getAttribute('href'); // Get the href attribute value (e.g., "#home")
            const targetSection = document.getElementById(targetId.substring(1)); // Remove '#' to get the actual ID

            if (targetSection) {
                // Smoothly scroll to the target section
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Booking Form Validation ---
    // Select the booking form using its ID
    const bookingForm = document.querySelector('#booking-form'); // Corrected selector to match HTML

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
            // Prevent the default form submission behavior (which would reload the page)
            event.preventDefault();

            // Get form field values, trim whitespace, and check if elements exist
            const nameElement = document.getElementById('name');
            const name = nameElement ? nameElement.value.trim() : '';

            const emailElement = document.getElementById('email');
            const email = emailElement ? emailElement.value.trim() : '';
            const phoneElement = document.getElementById('phone');
            const phone = phoneElement ? phoneElement.value.trim() : '';

            const dateElement = document.getElementById('date');
            const date = dateElement ? dateElement.value : '';

            const serviceElement = document.getElementById('service');
            const service = serviceElement ? serviceElement.value : '';

            const messageElement = document.getElementById('message'); // Optional field
            const message = messageElement ? messageElement.value.trim() : '';

            // --- Basic Validation Logic ---
            let isValid = true; // Flag to track overall validity
            let errorMessages = []; // Array to store specific error messages

            // Validate Name
            if (!name) {
                isValid = false;
                errorMessages.push('Name is required.');
            }

            // Validate Email
            if (!email) {
                isValid = false;
                errorMessages.push('Email is required.');
            } else if (!email.includes('@') || !email.includes('.')) { // Simple check for email format
                isValid = false;
                errorMessages.push('Please enter a valid email address (e.g., user@example.com).');
            }

            // Validate Phone
            if (!phone) {
                isValid = false;
                errorMessages.push('Phone number is required.');
            }
            // Add more specific phone validation if needed (e.g., regex for format)

            // Validate Date
            if (!date) {
                isValid = false;
                errorMessages.push('Date is required.');
            } else {
                // Additional validation: Ensure selected date is not in the past
                const currentDate = new Date();
                const selectedDate = new Date(date);

                // Normalize dates to compare only the day, month, and year (ignore time)
                currentDate.setHours(0, 0, 0, 0);
                selectedDate.setHours(0, 0, 0, 0);

                if (selectedDate < currentDate) {
                    isValid = false;
                    errorMessages.push('Please select a date from today or later.');
                }
            }

            // Validate Service
            if (!service) {
                isValid = false;
                errorMessages.push('Service selection is required.');
            }

            // --- Display Validation Results ---
            const formMessageElement = document.getElementById('form-message');

            if (!formMessageElement) {
                console.error("Error: The 'form-message' element was not found in the HTML.");
                // Optionally, create it dynamically if it's critical, though it's expected to be in index.html
                // For now, we rely on the alert for user feedback if this element is missing.
            }

            if (!isValid) {
                // Display errors to the user
                if (formMessageElement) {
                    formMessageElement.textContent = 'Validation failed: ' + errorMessages.join(' ');
                    formMessageElement.style.color = 'red';
                }
                // Alert is a fallback or an additional notification
                alert('Please correct the following errors:\n- ' + errorMessages.join('\n- '));
            } else {
                // If the form is valid, display a success message and "submit" (simulate)
                const successMessage = "Booking request simulated! This is a demo and no data has been sent. Thank you for trying our form.";
                if (formMessageElement) {
                    formMessageElement.textContent = successMessage;
                    formMessageElement.style.color = 'green';
                }
                alert(successMessage);
                bookingForm.reset(); // Clear the form fields after successful "submission"

                // Here you would typically send the data to a server, e.g., using fetch()
                // console.log('Form data:', { name, email, phone, date, service, message });
            }
        });
    } else {
        console.warn("Booking form with ID 'booking-form' not found.");
    }

    // Note: The helper function comment at the end of the original script about checking
    // if form fields exist before getting their value is good practice.
    // The updated code above incorporates this by checking element existence before accessing .value.
});
