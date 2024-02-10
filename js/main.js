
// const { default: axios } = require("axios");
let currentPage = 1;
let lastPage = 34;
//Variabels
let postsContainer = document.getElementById("post");


//events
//for pagenation
// window.addEventListener("scroll", handleInfiniteScroll);

//functions
window.onscroll= function()   {
  // const endOfPage = window.innerHeight + Math.ceil(window.pageYOffset) >=  document.body.offsetHeight;
  //   if (endOfPage && currentPage < lastPage) {
  //  getAllPosts(currentPage+=1,false);
  // }
}



function fillTags(postID){
  let tags ='';
  for( tag in post.tags){
    tags +=  `<button class="btn btn-sm rounded-5" style="background-color: gray; color: white;">${tag}</button>`

  }
  console.log(tags);
}

function postClick(postID){
  window.location=`postdetails.html?postId=${postID}`;
}

function createNewComment(postID){
  
  let txtComment = getAnyElementById('comment-input').value;
  let myToken = getTokenFromLocalStorage();
  let commentUrll = `${baseUerl}/posts/${postID}/comments`;
  let param = {
    "body" : txtComment,
  }
  axios.post(commentUrll,param,{
    headers:{
              "Authorization":`Bearer ${myToken}`, 
            }
     })
     .then((response) => {
      showSuccessAlertUsingBootstrap("Your comment Added Successfilly(~.~)",'success');
      closeSuccessAlert();
      refrshPage();

     })
     .catch((error) =>{
      showSuccessAlertUsingBootstrap(error.message,'danger');

     })
}

function editCurrentPost(comingPost){
  let post = JSON.parse(decodeURIComponent(comingPost));

  getAnyElementById("intitle").value = post.title;
  getAnyElementById("txtbodypost").value = post.body;
  getAnyElementById("post-model-title").innerHTML = "Edit Post";
  getAnyElementById("postid-input").value = "edit";

  getAnyElementById("editid-input").value = post.id;
  let addPostModel = getAnyElementById("addpost-model");
  let postModel = new bootstrap.Modal(addPostModel, {});
  getAnyElementById("btncreatepost").innerHTML="Update";
  postModel.toggle();
}

function getCUrrentUserDetailes(){
  return JSON.parse(localStorage.getItem("Socialcurrentuser"));
}

function isOnwrPost(authorid){
  let currentUser = getCUrrentUserDetailes();
  return currentUser != null && currentUser.id == authorid;

}

function getButton(post,text,type="btn-secondary",evntFunctionName="editCurrentPost"){
  return `<button class="btn ${type}"
  onclick="${evntFunctionName}('${encodeURIComponent(JSON.stringify(post))}')" 
  style="float: right; margin-left: 5px;" >${text} </button> `

}


function setCreatePostModal(){
 
  getAnyElementById("intitle").value = "";
  getAnyElementById("txtbodypost").value = "";
  getAnyElementById("post-model-title").innerHTML = "Create A New Post";
  getAnyElementById("postid-input").value = "add";
  getAnyElementById("btncreatepost").innerHTML="Create";
  let addposi = getAnyElementById("addpost-model");
  let postModel = new bootstrap.Modal("addpost-model", {});
  postModel.toggle();



}

function fillDataToPostElement(post) {
  let postElement = `

  <div class="card shadow"  style="cursor:pointer;">
    <div class="card-header" >
      <img
        src="${
          post.author.profile_image != " "
            ? post.author.profile_image
            : "image/placeholders/تنزيل.png"
        }"
        class="profile-image rounded-circle border border-2"
        alt=""
      />
      <b>@${post.author.username}</b>
      
      ${isOnwrPost(post.author.id) 
        ?
        getButton(post,"Delete","btn-danger","deletePost")
        
          : ""}
      ${isOnwrPost(post.author.id) 
        ?
        getButton(post,"Edit","btn-secondary","editCurrentPost")
          : ""}
    </div>
    <div class="card-body">
      <img
        onclick="postClick(${post.id})"
        src="${post.image}"
        class="w-100"
        alt=""
      />
      <h6 style="color: #777" class="mt-1">${post.created_at}</h6>
      <h5>${post.title != null ? post.title : ""}</h5>
      <p>
            ${post.body}
      </p>
      <hr />
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-pen"
          viewBox="0 0 16 16"
        >
          <path
            d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"
          />
        </svg>

        <span>(${post.comments_count}) Comments
          <span id="post-tags"> 
            <button class="btn btn-sm rounded-5" style="background-color: gray; color: white;">Policy</button>
            ${fillTags(post)};
          </span>
        </span>

      </div>

    </div>
        <div class="input-group mb-3" id="add-comment-div">
          <input id="comment-input" type="text" placeholder="Add youer comment here..." class="form-control" />
          <button class="btn btn-outline-primary" type="button" onclick="createNewComment(${post.id})" >Send</button>
         </div>
  </div>


    `;

  return postElement;
}

function areYouShure(message){
  return window.confirm(message);
}

function deletePost(comingPost){
  getAnyElementById("postid-input").value = "delete";
  let post = JSON.parse(decodeURIComponent(comingPost));
  // if(areYouShure(""));
  getAnyElementById("delete-post-id-input").value = post.id;
  getAnyElementById("delete-post-body").innerHTML =post.body;
  let deletPostModel = getAnyElementById("deletePost-model")
  let postModel = new bootstrap.Modal(deletPostModel, {});
  postModel.toggle();
}

// function confirmPostDelete(){
//   let postId = getAnyElementById("delete-post-id-input").value;
 
//   let deletUrlPost = `${baseUerl}/posts/${postId}`

//   const headers ={
//     "content-Type": "multipart/form-data",
//     "authorization": `Bearer ${getTokenFromLocalStorage()}`
//   }

//   axios.delete(deletUrlPost,{headers:headers})
//   .then((response) =>{
//       console.log(response);
      
//       showSuccessAlertUsingBootstrap("The Post hase been deleted Successfully","success") ;

//       setTimeout(()=>{
//         setupUI();
//         refrsh();
//     },500)
      
//   }).catch((error) =>{
//       showSuccessAlertUsingBootstrap(Error(error.message),"danger") ;

//   });

// }
function getAllPosts(pageNumber = currentPage, firstTime=true) {
  // console.log(currentPage);
 // https://tarmeezacademy.com/api/v1/posts/1?limit=5&page=1
  let urlPosts = `https://tarmeezacademy.com/api/v1/posts?limit=2&page=${pageNumber}`;
  axios.get(urlPosts).then((response) => {
    // lastPage = response.data.meta.last_page;
   
    showpostsInPage(response.data.data, firstTime);
  });
}

function showpostsInPage(posts, firstTime) {
  if(firstTime){

    // posts.reverse();
    postsContainer.innerHTML = "";
    firstTime=false;
  }
  for (post of posts) {
    postsContainer.innerHTML += fillDataToPostElement(post);
  }
}
getAllPosts(currentPage);
