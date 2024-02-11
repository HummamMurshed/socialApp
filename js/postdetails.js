
//variaviels
const slashPost = "/posts/"

setupUI();


class clsPostDetails {
    #fillTags(postID){
        let tags ='';
        for(let tag in this.post.tags){
          tags +=  `<button class="btn btn-sm rounded-5" style="background-color: gray; color: white;">${tag.name}</button>`
      
        }
        return tags;
      }
    #fillPostDetails(){
        this.postDetails = {
            username : this.post.username,
            comment :this.post.comment,
            author : this.post.author.username,
            postImage: this.post.image,
        }
    }
    constructor(ID){
        this.postDetails ={};
        this.postId = ID;
        this.urlGetPostRequest = `${baseUerl}${slashPost} ${ID}`;
    }

    sendAPIRequestToGetPost(){
        toggelLoader(true);

        axios.get(this.urlGetPostRequest)
        .then((response) =>{
            this.post = response.data.data;
            this.#fillPostDetails();
        })
        .catch((error) =>{
            showSuccessAlertUsingBootstrap(error.message);
        })
        .finally(() =>{
          toggelLoader(false);
      });
    }
    static getQueryParms(){

        const urlPrams = new URLSearchParams(window.location.search);
        let param = urlPrams.get("postId");
        return param;
    }

     showUserNameInPage(){
        let eleName = document.getElementById('post');
        eleName.innerHTML = this.postElement;
        this.showAutorNameInPage();
    }
    showAutorNameInPage(){
        let eleName = document.getElementById('author');
        eleName.innerHTML = this.post.author.username;
    }
    fillDataToPostElement() {
      // console.log(this.commentBody)
         this.postElement = `
      
        <div class="card shadow" style="cursor:pointer;">
          <div class="card-header" >
            <img
              src="${
                this.post.author.profile_image != " "
                  ? this.post.author.profile_image
                  : "image/placeholders/تنزيل.png"
              }"
              class="profile-image rounded-circle border border-2"
              alt=""
            />
            <b>@${this.post.author.username}</b>
          </div>
          <div class="card-body">
            <img
              src="${this.post.image}"
              class="w-100"
              alt=""
            />
            <h6 style="color: #777" class="mt-1">${this.post.created_at}</h6>
            <h5>${this.post.title != null ? this.post.title : ""}</h5>
            <p>
                  ${this.post.body}
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
      
              <span>(${this.commentCount}) Comments
                <span id="post-tags"> 
                  <button class="btn btn-sm rounded-5" style="background-color: gray; color: white;">Policy</button>
                 ${this.#fillTags(this.postId)}
                </span>
              </span>
      
            </div>
            <!-- <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to
                additional content.
              </p>
              <a href="#" class="btn btn-primary">Go somewhere</a> -->
          </div>
          <div id=comments> 
          ${this.commentBody}
      </div>
        </div>
      
      
          `;
         this.showUserNameInPage();
        
      }
       getCommentsContent(){
        let comments = ``
        let commentBody =``;
        // alert(comments);

        let urlcomments = `https://tarmeezacademy.com/api/v1/posts/${this.postId}`;
      
        axios.get(urlcomments)
        .then((response) =>{
          this.commentCount = response.data.data.comments_count;
          let comments = response.data.data.comments;
          comments.reverse();
          let comment;      
        for( comment of comments){
          // console.log(coment.author);
          commentBody += `
            <div class="p-3" style="bakcground-color: rgb(187,187, 187);">
            <div>
              <img src="${comment.author.profile_image}" class="rounded-circle" style="width: 40px; height: 40px;" alt="">
              <b>${comment.author.name}</b>
      
              <div class="p-3comment-body" style="background-color: rgb(235 235 235);">
                ${comment.body}
              </div>
            </div>
          </div>
          `;
        }
        this.commentBody = commentBody;
        // this.commentCount = comment.author.commentCount; 
        this.fillDataToPostElement();
        })


      }
}
// alert(clsPostDetails.getQueryParms());



let obj = new clsPostDetails(clsPostDetails.getQueryParms());

let post = obj.sendAPIRequestToGetPost();
setTimeout(() =>{
obj.getCommentsContent();
// obj.fillDataToPostElement();
setTimeout(() =>{
  obj.showUserNameInPage();

},100)
},1000);

