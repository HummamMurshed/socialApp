
//variables

const registerModal = 'register-model';

let btnRegister = document.getElementById('btnregister');

//Events
btnRegister.addEventListener('click', register);
const slashRegister = '/register';

class clsRegister {
    #headers= {
        "Content-Type":"multipart/form-data",
       
    };
    #registerInfoAsForm;

    #fillRegisterInfo(){
        // this.#registerParam ={
        //     "username" : this.username,
        //     "password": this.password,
        //     "email": this.email,
        //     "name": this.name,
        // }
        this.#registerInfoAsForm.append("name",this.name);
        this.#registerInfoAsForm.append("username",this.username);
        this.#registerInfoAsForm.append("password",this.password);
        // this.#registerInfoAsForm.append("email",this.email);
        this.#registerInfoAsForm.append("image",this.profileImage);
    }
    #printaltConsole(item){
        console.log(item);
    }
    constructor(){
        this.#registerInfoAsForm = new FormData();
        this.username = document.getElementById("inregisterusername").value;
        // this.email = document.getElementById("inemail").value;
        this.name = document.getElementById("inname").value;
        this.password = document.getElementById("inregisterpassword").value;
        this.profileImage = document.getElementById("imageprofile").files[0];
        this.#fillRegisterInfo();
      
    
    }
    sendRequestApi(url){
        toggelLoader(true);
        axios.post(url, this.#registerInfoAsForm,{headers: this.#headers})
        .then((response) =>{
            localStorage.setItem('token', response.data.token);
            localStorage.setItem ('Socialcurrentuser', JSON.stringify( response.data.user));
            console.log(response);
            showSuccessAlertUsingBootstrap("Registr Successfully");
            setupUI();
            
        }).catch((error) =>{
            showSuccessAlertUsingBootstrap(error.message,"danger")  ;
        })
        .finally(() =>{
            toggelLoader(false);
        });
       
    }
    printRgisterInfo(){
        this.#printaltConsole(this.username);
        this.#printaltConsole(this.name);
        this.#printaltConsole(this.email);
        this.#printaltConsole(this.password);
        this.#printaltConsole(this.profileImage);

    }
    getRigsterModal(){
        return document.getElementById(registerModal);
      }
    closeRegisterModal(){
        // using BootStarp Librrary, we can use this tow lines of code to hide login modal after done
      const model = this.getRigsterModal();
      const modalInstance =  bootstrap.Modal.getInstance(model);
      modalInstance.hide();
    }
}


//functions



  function register(){
    const urlRegister = `${baseUerl}${slashRegister}`;
    let registerCard = new clsRegister();
    registerCard.printRgisterInfo();
    registerCard.sendRequestApi(urlRegister);
    registerCard.closeRegisterModal();
 
    

    //await even rgisrt done

}