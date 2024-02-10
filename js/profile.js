

setupUI();

const slashUsres ="/users";
const id = 1;
class clsProfile{
    //Private functions
    #showUserInfoInPage(){
        document.getElementById("user-email").innerHTML = this.user.email;
        document.getElementById("user-name").innerHTML = this.user.name;
        document.getElementById("user-username").innerHTML = this.user.username;
        document.getElementById("header-image").setAttribute('src',this.user.profile_image);
    }
    #showPostAndComentsCount(){
        document.getElementById("posts-count").innerHTML = this.user.posts_count;
        document.getElementById("coments-count").innerHTML = this.user.comments_count;
        document.getElementById("user-name").innerHTML = this.user.name;

    }   


    constructor(){
        this.ID = id;
        this.url = `${baseUerl}${slashUsres}/${this.ID}`
    }

    sendAPIRequest(){
        axios.get(this.url)
        .then((response) =>{
            console.log(response.data.data);
            this.user = response.data.data;
            this.#showUserInfoInPage();
            this.#showPostAndComentsCount();

        })
        .catch((error) =>{
            console.log(Erorr(error.message));

        })
    }

}

let objProfile = new clsProfile();
objProfile.sendAPIRequest();
// objProfile.showInfoInPage();