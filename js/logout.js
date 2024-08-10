// Function to handle user logout
function logout() {
    localStorage.removeItem("token ")
    localStorage.removeItem("user")
     // Display a message to the user indicating successful logout
    alert("loged out successfully")

    // Update the user interface to reflect the logged-out state
    setupUI ()
}