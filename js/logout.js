// Function to handle user logout
function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("imgprofile")
     // Display a message to the user indicating successful logout
    showAlert("Logged out successfully" , "success");
    // Update the user interface to reflect the logged-out state
    setupUI ()
}