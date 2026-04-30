document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailError = document.getElementById('emailError');
    const messageBox = document.getElementById('messageBox');

    // 1. Validation for @studentliberary.in
    if (!email.endsWith('@studentliberary.in')) {
        emailError.textContent = "Email must end with @studentliberary.in";
        emailError.style.display = "block";
        return;
    } else {
        emailError.style.display = "none";
    }

    // 2. Dummy API Call (Designed to fail)
    // We use a non-existent endpoint to trigger the .catch() block
    fetch('https://jsonplaceholder.typicode.com/invalid-endpoint-for-failure', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
        .then(response => {
            if (!response.ok) throw new Error("API Failed as requested");
            return response.json();
        })
        .catch(error => {
            console.log("Expected Error:", error);

            // 3. Show success message despite the failure
            messageBox.textContent = `Welcome, ${name}! Your details were processed successfully.`;
            messageBox.className = "success";
            messageBox.classList.remove('hidden');

            // Optionally clear the form
            document.getElementById('loginForm').reset();
        });
});