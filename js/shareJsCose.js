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