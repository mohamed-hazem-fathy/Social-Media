
 // This function retrieves parameters from the URL.
 const urlParams = new URLSearchParams(window.location.search);
 const id = urlParams.get("postId");
 const profileId = urlParams.get("profileId");

// Call the function to get posts
getPosts();

function getPosts(relod = true, page = 1)
{
  const url = 'https://tarmeezacademy.com/api/v1';
// API call to fetch posts
 axios.get(`${url}/posts?limit=100&page=${page}`)
 .then(respons => {

   let postsContainer = document.getElementById('posts'); // Get the container to display posts
   let posts = respons.data.data;  // Extract the posts data from the response
    lastPage = respons.data.meta.last_page; // Store the last page number


   if(relod  == true) {
      postsContainer.innerHTML = "";

   }


   for(post of posts)
   {
     const author = post.author
     let postTitle = "";


     //Show Or Hide (EDIT) BUTTON
     let user = getCurrentUser()
     let ismypost = user != null && post.author.id == user.id
     let editBtnContent = ``

     if(ismypost) {
      editBtnContent = `<button class="btn btn-secondary" style="float: right" onclick="editPostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')">Edit</button>`
     }

     if(post.title != null) {
      postTitle= post.title
     }
     const content = `<div class="card shadow my-2">
                   <div class="card-header">
                       <img class="border border-2" src="${author.profile_image}" alt="" style="width:40px; height:40px; border-radius:50%">
                       <b>${author.username}</b>
                       ${editBtnContent}

                   </div>
                   <div class="card-body" onclick="postClicked(${post.id})" style="cursor: pointer;">
                       <img class="w-100" src="${post.image}" alt="">
                       <h6 class="mt-1" style="color: gray;">${post.created_at}</h6>
                       <h5>${postTitle}</h5>
                       <p>${post.body}</p>
                       <hr>
                       <div >
                       <div class="d-flex justify-content-start">
                           <div>
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                               <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                             </svg>
                           <span style = font-size:21px;">(${post.comments_count}) Comment
                            <span id="post-tags-${post.id}">

                            </span>
                           </span>
                       </div>

                       </div>
                       </div>
                   </div>
                 </div>`;

                 postsContainer.innerHTML += content;  // Clear the container if reload is true
                 const cuurentposttagsid = `post-tags-${post.id}`;
                 document.getElementById(cuurentposttagsid).innerHTML = "";
                 for(tag of post.tags)
                 {
                  let tagscontent =
                  `
                       <button class="btn btn-sm rounded-5" style="background-color:gray; color: white">polcy${tag.name}</button>
                  `
                   document.getElementById(cuurentposttagsid).innerHTML += tagscontent;
                 }

   }

 })

}



function postClicked(postId) {

  window.location = `postdetals.html?postId=${postId}`;
  setupUI();



}

getPost();

function getPost()
{

  const url = 'https://tarmeezacademy.com/api/v1';
// API call to fetch posts
 axios.get(`${url}/posts/${id}`)
 .then(respons => {

    const post = respons.data.data;
    const author = post.author;
    let comments = post.comments;



    document.getElementById("user-name-span").innerHTML = author.username
    if(post.title != null) {
      postTitle= post.title
     }
     let commentsContent = ``;
     for (comment of comments)
     {
      commentsContent += ` <!-- comments -->
                            <div id="comments">
                                        <div class="p-3" style="background-color: rgb(235, 235, 235);">
                                          <div>
                                                <img style="width:40px; height:40px;" src="${comment.author.profile_image}" class="rounded-circle" alt="">
                                                <b>${comment.author.username}</b>
                                          </div>
                                              <!--comment Body-->
                                                   <div><p style="margin-left: 45px;">${comment.body}</p></div>
                                              <!--comment Body-->
                                          </div>
                            </div>
                             <!-- comments -->`
     }
    const postContent = `<div class="card shadow my-2">
                    <div class="card-header">
                        <img class="border border-2" src=${author.profile_image} Image 2024-03-29 at 00.36.31_28757c79.jpg" alt="" style="width:40px; height:40px; border-radius:50%">

                        <b>@${author.username}</b>
                    </div>
                    <div class="card-body">
                        <img class="w-100" src="${post.image}" alt="">
                        <h6 class="mt-1" style="color: gray;">${post.created_at}</h6>
                        <h5>${postTitle}</h5>
                        <p>${post.body}</p>
                        <hr>
                        <div >
                        <div class="d-flex justify-content-start">
                            <div>
                                  <span style = font-size:21px;">(${post.comments_count}) Comment</span>
                            </div>
                        </div>
                        </div>
                               <!-- comments -->
                            <div id="comments">
                                        ${commentsContent}
                            </div>
                             <!-- comments -->

                          <!--add new comment -->

                          <div class="input-group mb-3" id="add-comment-div">
                            <input id="comment-input" type="text" placeholder="add your comment here..." class="form-control">
                            <button onclick="creatpostClick()" class="btn btn-outline-primary" type="button">send</button>

                          </div>

                           <!--add new comment -->
                        </div>
                  </div>`;


                  document.getElementById("post").innerHTML = postContent;
                  console.log(post)
                  setupUI();


 })


};
function creatpostClick() {
  let commentbody = document.getElementById("comment-input").value
  let prams = {
    "body": commentbody
  }
  let token = localStorage.getItem("token")
  let url = `https://tarmeezacademy.com/api/v1/posts/${id}/comments`

  axios.post(url,prams, {
    headers: {
      "authorization" : `Bearer ${token}`
    }
  }).then((response) => {
    console.log(response.data)
    showAlert("The comment Has Been Creat Successfly", "success");
    getPost();
  }).catch((erorr) => {
    const errormassage = erorr.response.data.message;
    showAlert(errormassage, "danger");

  }
  )

}

function editPostBtnClicked(postobject) {
  let post = JSON.parse(decodeURIComponent(postobject))
  console.log(post)
  document.getElementById("post-id-input").value = post.id
  document.getElementById("post-modal-title").innerHTML = "Edit Post"
  document.getElementById("post-title-input").value = post.title
  document.getElementById("post-body-input").innerHTML = post.body
  document.getElementById("post-modal-submit-btn").innerHTML = "Update"
  let postmodal = new bootstrap.Modal(document.getElementById("creat-post-modal"), {})
  postmodal.toggle()
}

function addBtnClicked () {
  document.getElementById("post-id-input").value = ""
  document.getElementById("post-modal-title").innerHTML = "Creat A New Post"
  document.getElementById("post-title-input").value =""
  document.getElementById("post-body-input").innerHTML = ""
  document.getElementById("post-modal-submit-btn").innerHTML = "Creat"
  let postmodal = new bootstrap.Modal(document.getElementById("creat-post-modal"), {})
  postmodal.toggle()
}

 function getCurrentUser() {
  let user = null
const stronguser = localStorage.getitem("user")
  if(stronguser != null) {
    user = JSON.parse(stronguser)
  }

  return user

 }



