document.getElementById('alumni-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('batch_year', document.getElementById('batch_year').value);
    formData.append('current_position', document.getElementById('current_position').value);
    formData.append('company', document.getElementById('company').value);
    formData.append('linkedin_url', document.getElementById('linkedin_url').value);
    formData.append('github', document.getElementById('github').value);
    formData.append('email', document.getElementById('email').value);

    // Append profile image if selected
    let profileImage = document.getElementById('profile_image').files[0];
    if (profileImage) {
        formData.append('profile_image', profileImage);
    }

    fetch('/api/register-alumni/', {
        method: 'POST',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',  // Needed for identifying AJAX requests
            'X-CSRFToken': document.getElementById('csrf_token').value
        },
        body: formData  // FormData handles multipart/form-data automatically
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = data.message;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerText = "Something went wrong!";
    });
});
