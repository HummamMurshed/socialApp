



const slashUsres ="/users";
const id = 8001;
class clsProfile{
    //Private functions
    #showUserInfoInPage(){
        document.getElementById("user-email").innerHTML = this.user.email;
        document.getElementById("user-name").innerHTML = this.user.name;
        document.getElementById("user-username").innerHTML = this.user.username;
        document.getElementById("header-image").setAttribute('src',this.user.profile_image);
    }
    #showPostAndComentsCountINpage(){
        document.getElementById("posts-count").innerHTML = this.user.posts_count;
        document.getElementById("coments-count").innerHTML = this.user.comments_count;
        document.getElementById("user-name").innerHTML = this.user.name;

    }
    #getElement(post){

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
                  ${fillTags(post.tags)}
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

    #showUserPostsInPage(){
        
        for(let post of this.userPosts){
           this.userPostContainer.innerHTML += this.#getElement(post);
        }
    }   
    
    #setName(){
        document.getElementById("h1name").innerHTML = `${this.user.name}'s Posts`  ;
    }

    constructor(){
        this.ID = id;
        this.url = `${baseUerl}${slashUsres}/${this.ID}`;
        this.userPostContainer = document.getElementById('user-posts-container');
        this.userPostContainer.innerHTML = "";
    }

    sendAPIRequest(){
        axios.get(this.url)
        .then((response) =>{
            console.log(response.data.data);
            this.user = response.data.data;
            this.#showUserInfoInPage();
            this.#showPostAndComentsCountINpage();
            this.#setName();

        })
        .catch((error) =>{
            console.log(Erorr(error.message));

        })
    }

     getUserPost(){
        this.url = `${baseUerl}/users/${this.ID}/posts`;
        axios.get(this.url)
        .then((response) =>{
            console.log( response.data.data);
            this.userPosts = response.data.data;
            this.#showUserPostsInPage();

        }).catch((error) =>{
            console.log(Error(error.message));

            showSuccessAlertUsingBootstrap(Error(error.message),"danger") ;
        })
      }

}

let objProfile = new clsProfile();
objProfile.sendAPIRequest();
objProfile.getUserPost();
setupUI();
// objProfile.showInfoInPage();