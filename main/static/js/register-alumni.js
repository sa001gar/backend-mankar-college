document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const submitButton = document.querySelector("button[type='submit']");
    const modal = document.getElementById("successModal");
    const modalTitle = document.getElementById("modalTitle"); // Modal title (Success/Error)
    const modalMessage = document.getElementById("modalMessage"); // Modal message (JSON response)
    const modalErrors = document.getElementById("modalErrors"); // Form validation errors list
    const closeModalBtn = document.getElementById("closeModalBtn");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);

        submitButton.disabled = true;
        submitButton.textContent = "Processing...";

        fetch(form.action, {
            method: "POST",
            body: formData,
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            },
        })
        .then(response => response.json())
        .then(data => {
            modalErrors.innerHTML = ""; // Clear previous errors

            if (data.success) {
                modalTitle.textContent = "Success!";
                modalTitle.style.color = "#22c55e"; // Green color
                modalMessage.textContent = data.message || "Your request was successful.";

                form.reset(); // Reset form after success

                modal.classList.add("show"); // Show modal
                
                // Hide modal and redirect after 3 seconds
                setTimeout(() => {
                    modal.classList.remove("show");
                    window.location.href = "/alumni"; // Redirect to alumni page
                }, 3000);
            } else {
                modalTitle.textContent = "Error!";
                modalTitle.style.color = "#dc3545"; // Red color
                modalMessage.textContent = data.error || "Something went wrong. Please try again.";

                // Display form validation errors
                if (data.errors) {
                    Object.entries(data.errors).forEach(([field, messages]) => {
                        messages.forEach(msg => {
                            const errorItem = document.createElement("li");
                            errorItem.textContent = msg;
                            modalErrors.appendChild(errorItem);
                        });
                    });
                }

                modal.classList.add("show"); // Show modal
            }
        })
        .catch(error => {
            console.error("Error:", error);
            modalTitle.textContent = "Error!";
            modalTitle.style.color = "#dc3545";
            modalMessage.textContent = "Something went wrong. Please try again.";

            modal.classList.add("show"); // Show modal
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = "Register";
        });
    });

    // Close modal when close button is clicked
    closeModalBtn.addEventListener("click", function () {
        modal.classList.remove("show");
    });

    // Close modal when clicking outside the content
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });
});
