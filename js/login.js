
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


        console.log(resp.data.user); // Log the response data (optional)
        localStorage.setItem("token",resp.data.token);
        localStorage.setItem("imgprofile",resp.data.user.profile_image)
        localStorage.setItem("user" ,JSON.stringify(resp.data.user));


          // Redirect to the home.html page after successful login
          const modal = document.getElementById("loginModal");
          const modalinstance = bootstrap.Modal.getInstance(modal);
          modalinstance.hide();
          // window.location.href = "home.html";
          showAlert("logged in successfly","success");

          setupUI ();




        })


}



function showAlert(custommassage , type) {
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


            appendAlert(custommassage, type);

            // setTimeout(() => {

            //   const alert = bootstrap.Alert.getOrCreateInstance('#success-alert');
            //   // alert.close()
            //   }, 4000);


}
// Function to setup the user interface based on authentication token
function setupUI () {
     // Retrieve the token from local storage
    const token = localStorage.getItem("token");
    const imgeprofile = localStorage.getItem("imgprofile");
    const addpost = document.getElementById("add-btn");


      // Get references to the HTML elements
    let logindiv  = document.getElementById("logged-in-dev");
    let logoutdiv = document.getElementById("logout-dev");


      // Check if the token is null (user is not logged in)
    if (token == null) {
        // Show the login div and hide the logout div
        logindiv.style.display = "block";
        logoutdiv.style.display = "none";
        if(addpost != null) {
          addpost.style.display = "none";
        }



    }else {
        // Show the logout div and hide the login div
        logindiv.style.display = "none";
        logoutdiv.style.display = "inline-block";
        if(addpost != null) {
          addpost.style.display = "block";
        }
        const user = getCurrentUser();
        document.getElementById("nav-user-name").innerHTML = user.username;
        document.getElementById("photp-nav").src = imgeprofile;
    }
}

function getCurrentUser() {

  let user = null;
  const storageUser = localStorage.getItem("user")

  if(storageUser != null) {
    user = JSON.parse(storageUser)
  }
  return user;


}
