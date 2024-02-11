function fillTags(comingTags){
    if(comingTags.length == 0){
      return "";
    }
    console.log(comingTags)
    let tags ='';
    for( tag of comingTags){
      tags +=  `<button class="btn btn-sm rounded-5" style="background-color: gray; color: white;">${tag.name}</button>`
  
    }
    return tags;
  }
  function postClick(postID){
    window.location=`postdetails.html?postId=${postID}`;
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

  

  function createNewComment(postID){
  
    let txtComment = getAnyElementById('comment-input').value;
    let myToken = localStorage.getItem('token');
    let commentUrll = `${baseUerl}/posts/${postID}/comments`;
    let param = {
      "body" : txtComment
    }
    toggelLoader(true);
    axios.post(commentUrll,param,{
      headers:{
                "Authorization":`Bearer ${myToken}` 
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
       .finally(() =>{
        toggelLoader(false);
    });
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
  function createNewPost(){

    // let urlPost = getUrlMode();
    let newPost = new clsPost();
    newPost.sendRequestApi()
    newPost.printPostItem();
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
 function  profileClick(){
    window.location = `profile.html?userId=${getCUrrentUserDetailes().id}`;
 }
 
 function homeCilck(){
  window.location="index.html";
 }