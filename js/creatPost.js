
function creatNewPostClicked()
{

    let url = "https:tarmeezacademy.com/api/v1";
    const token = localStorage.getItem("token")
    const imgeprofile = localStorage.getItem("imgprofile")
     // Get the title and body and image input values from the HTML form
     let title = document.getElementById("post-title-input").value;
     let body = document.getElementById("post-body-input").value;
     let image = document.getElementById("imgepost-input").files[0];


     // Create a FormData object to send the data as multipart/form-data
    let formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("image", image);
      let headers = {
        "Content-Type": "multipart/form-data",
        "authorization" : `Bearer ${token}`
      };
      axios.post(`${url}/posts`,formData, {headers: headers}).then((resspo) => {

            const modal = document.getElementById("creat-post-modal");
            const modalinstance = bootstrap.Modal.getInstance(modal);
            modalinstance.hide()
          // Redirect to the  page after add  new post
          getPosts();

        //   window.location.href = "home.html";
          showAlert("New Post Has Been Created","success");

      }).catch((error) => {
        console.log(error.response.data.message)
        const massage = error.response.data.message;
        showAlert(massage,"danger");
      });

}