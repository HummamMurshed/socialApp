//varibelas
let btnCreatePost = document.getElementById('btncreatepost');

//Events

//Classes
const slashPost='/posts';

class clsPost {
    #refrsh(){
        window.location = "home.html";
    }
    #setMode(){
        let postid =  document.getElementById("postid-input").value;
        // let isAddMode = postid == null || postid == "add";
        if(postid == "add"){
         this.url=`${baseUerl}${slashPost}` ;
         this.Mode="add";

        }
        else if(postid == "edit") {
         this.postId = document.getElementById("editid-input").value;
         this.url=`${baseUerl}${slashPost}/${this.postId}`;
         this.Mode="edit";

        }
        else if(postid == "delete"){
            this.Mode = "delete";
            this.postId = getAnyElementById("delete-post-id-input").value;
            this.url=`${baseUerl}${slashPost}/${this.postId}`;
        


        }
     }
    #printaltConsole(item){
        console.log(item);
    }
    #headers= {
        "Content-Type":"multipart/form-data",
        "authorization":"Bearer ",
    };
    #postParamAsForm ; 
    
    #fillPostParam(){
        this.#postParamAsForm.append("body",this.body);
        this.#postParamAsForm.append("title",this.title);
        this.#postParamAsForm.append("image",this.image);

    }

    constructor(){
        this.#postParamAsForm = new FormData();
        this.#setMode();
        this.title = document.getElementById('intitle').value;
        this.body = document.getElementById('txtbodypost').value;
        this.image = document.getElementById('imagepost').files[0];
        this.#fillPostParam();
        this.#headers.authorization += localStorage.getItem("token");
    }
    addPost(){
        axios.post(this.url, this.#postParamAsForm, { headers:this.#headers})
        .then((response) =>{
            showSuccessAlertUsingBootstrap("Post has been Added Successfully","success") ;
            setTimeout(()=>{

                setupUI();
                this.#refrsh();
            },500)
            
        }).catch((error) =>{
            showSuccessAlertUsingBootstrap(Error(error.message),"danger") ;
        });
    }
    sendRequestApi(){
        if(this.Mode =="add"){
            this.addPost();

        }else if(this.Mode == "edit"){
            this.editPost();
            
            // is the same thing 
            // this.addPost();
        }
        else if(this.Mode == "delete"){
            this.delete();
        }

       
    }
    printPostItem(){
       
        this.#printaltConsole(this.title);
        this.#printaltConsole(this.body);
    }

    editPost(){
        this.#postParamAsForm.append("_method","put");
        axios.post(this.url, this.#postParamAsForm, { headers:this.#headers})
        .then((response) =>{

            showSuccessAlertUsingBootstrap("Update Successfully","success") ;
            setTimeout(()=>{

                setupUI();
                this.#refrsh();
            },500)
            
        }).catch((error) =>{
            showSuccessAlertUsingBootstrap(Error(error.message),"danger") ;

        });
    }

    delete(){
        
       
        
      

      
        axios.delete(this.url,{headers:this.#headers})
        .then((response) =>{
            console.log(response);
            
            showSuccessAlertUsingBootstrap("The Post hase been deleted Successfully","success") ;
      
            setTimeout(()=>{
              setupUI();
              this.#refrsh();
          },500)
            
        }).catch((error) =>{
            showSuccessAlertUsingBootstrap(Error(error.message),"danger") ;
      
        });
      
      }
}



//Functins
function createNewPost(){

    // let urlPost = getUrlMode();
    let newPost = new clsPost();
    newPost.sendRequestApi()
    newPost.printPostItem();
}