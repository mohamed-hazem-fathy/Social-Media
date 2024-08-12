function registerbtnclicked()
 {
    let url = "https:tarmeezacademy.com/api/v1";
    let name = document.getElementById("register-name-input").value;
    let username = document.getElementById("register-username-input").value;
    let password = document.getElementById("register-password-input").value;
    let email = document.getElementById("email-regester-input").value;
    let imge = document.getElementById("register-image-input").files[0];

      // Create a FormData object to send the data as multipart/form-data
      let formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("image", imge);
        let headers = {
          "Content-Type": "multipart/form-data",

        };

    axios.post(`${url}/register`,formData, {headers: headers})
    .then((resp) => {
        console.log(resp.data.user.profile_image)

         // Save the user token and information to localStorage.
            localStorage.setItem("token", resp.data.token);
            localStorage.setItem("user", JSON.stringify(resp.data.user));
             localStorage.setItem("imgprofile",resp.data.user.profile_image)
         // Redirect to the home.html page after successful login
          const modal = document.getElementById("registermodal");
          const modalinstance = bootstrap.Modal.getInstance(modal);
          modalinstance.hide();
          showAlert("Acount Created By  successfly","success");
          getPosts();
          setupUI ();
    }).catch((error) => {
        console.log(error)
        const massage = error.response.data.message

        showAlert(massage , "danger")
    })
 }