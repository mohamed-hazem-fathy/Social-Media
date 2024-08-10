// Function for user login
function logbtnclicked() {


    // Get the username and password input values from the HTML form
    let user = document.getElementById("username-input").value;

    let pass = document.getElementById("password-input").value;

     // Create a parameter object with the username and password
     const params = {
    "username" : user,
    "password" : pass
     };

     // API URL for login
     const url = 'https://tarmeezacademy.com/api/v1';


     axios.post(`${url}/login`,params).then((resp) => {
        console.log(resp.data.token); // Log the response data (optional)
        localStorage.setItem("token ",resp.data.token);
        localStorage.setItem("user" ,JSON.stringify( resp.data.user));


          // Redirect to the home.html page after successful login
          window.location.href = "home.html";

          alert("user logged in successfully")
          setupUI ();




        })


}


showSuccesAlert()

function showSuccesAlert() {
        const alertPlaceholder = document.getElementById('success-alert')
        const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
         `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
         '</div>'
         ].join('')

        alertPlaceholder.append(wrapper)
        }

        const alertTrigger = document.getElementById('liveAlertBtn')
        if (alertTrigger) {
        alertTrigger.addEventListener('click', () => {
            appendAlert('Nice, you triggered this alert message!', 'success')
         })
        }
}
// Function to setup the user interface based on authentication token
function setupUI () {
     // Retrieve the token from local storage
    console.log(localStorage.getItem("token "))
    const token = localStorage.getItem("token ")

      // Get references to the HTML elements
    const logindiv  = document.getElementById("logged-in-dev")
    let logoutdiv = document.getElementById("logout-dev")

      // Check if the token is null (user is not logged in)
    if (token == null) {
        // Show the login div and hide the logout div
        logindiv.style.display = "block";
        logoutdiv.style.display = "none";

    }else {
        // Show the logout div and hide the login div
        logindiv.style.display = "none";
        logoutdiv.style.display = "inline-block";
    }
}
