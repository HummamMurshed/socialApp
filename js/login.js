// const { default: axios } = require("axios");

let btnLogIn = document.getElementById("btnlogin");
let mode = 'noneLogin';

//Events

// btnLogIn.addEventListener("click", login);

const  baseUerl = "https://tarmeezacademy.com/api/v1";
const loginModal = 'login-model';

class clsLoginScreen {

  constructor() {
    this.passsword = document.getElementById("inpassword").value;
    this.userName = document.getElementById("inusername").value;
  }

  static createClsLoginScreen() {
    return new clsLoginScreen();
  }
}

class clsLogin {
  constructor(url, param) {
    this.url = url;
    this.param = param;
 
  
  }

  sendApiRequest(){
    toggelLoader(true);
    axios.post(this.url,this.param)
    .then((respons) => {

      this.token = respons.data.token;
      this.user= respons.data.user;
      toggelLoader(false);
      
    }).catch((error) =>{
      this.token ="error";
      toggelLoader(false);

      this.erro = error.message;
    });
  }
  getLoginModel(){
    return document.getElementById(loginModal);
  }
  closeLoginModal(){
      // using BootStarp Librrary, we can use this tow lines of code to hide login modal after done
    const model = this.getLoginModel();
    const modalInstance =  bootstrap.Modal.getInstance(model);
    modalInstance.hide();
  }
}



function login() {
  let userInfo = clsLoginScreen.createClsLoginScreen();

  let param = {
    "username": userInfo.userName,
    "password": userInfo.passsword,
  };
  const url = `${baseUerl}/login`;
  let loginObj = new clsLogin(url, param);
//   console.log(loginObj);
   
  let myPromise  = new Promise((rsolve, reject) =>{
    loginObj.sendApiRequest();
    setTimeout(()=>{
        if(loginObj.token !='error')
        rsolve(loginObj.token);
        else{
            reject(loginObj.erro);
        }
    }, 1000)
   });
   myPromise.then((token)=>{
        localStorage.setItem ("token", token);
        localStorage.setItem ('Socialcurrentuser', JSON.stringify( loginObj.user));
        loginObj.closeLoginModal();
        // refrshPage();
        setupUI();
        showSuccessAlertUsingBootstrap(" you Login Successfully(~ - ~)");
        closeSuccessAlert();

    }).catch((error) =>{
      // setupUI();
      showSuccessAlertUsingBootstrap(error,"danger");
      closeSuccessAlert();



    });

}

function closeSuccessAlert(){
  setTimeout(()=>{
    const bootStrapalert = bootstrap.Alert.getOrCreateInstance('#successalert');
    bootStrapalert.close();

  },3000);
}

function showSuccessAlertUsingBootstrap(text, type='success'){
    const alertPlaceholder = document.getElementById('successalert');
    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
              ` <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`,
            '</div>'
        ].join('');

        alertPlaceholder.append(wrapper);
    }
    // alert();
    appendAlert(`Nice, ${text}`, type);
    

}
// showSuccessAlertUsingBootstrap();

function getAnyElementById(element){
return document.getElementById(element);
}




function getTokenFromLocalStorage(){
    return localStorage.getItem('token');
}

function changeButtonVisibility(button,state,periorty= null){

    button.style.setProperty("display", state, periorty);
   
}

function getUserNameFromLocalStorage(){
  return JSON.parse(localStorage.getItem("Socialcurrentuser")).username;
}

function getNaveUser(){
  return  navuserName = getAnyElementById("navusername");
}

function showUserNameInNavPar(){
  const navuserName = getNaveUser();
  let currentUser = getUserNameFromLocalStorage();
  navuserName.innerHTML = `<p>${currentUser} </p>`;
  
}
function setProfileImage(){
  const profileImage = JSON.parse(localStorage.getItem('Socialcurrentuser')).profile_image;
  let currentImageProgile = getAnyElementById('registerprofileimage');
  currentImageProgile.setAttribute('src', profileImage);
}

function setupUI(){
    let divLogin = getAnyElementById('divlogin');
    let divLogout = getAnyElementById('divlogout');
    let btnAddNewPost = getAnyElementById('btnaddpost');
    const token = getTokenFromLocalStorage();
    if(token == null){
        changeButtonVisibility(divLogin,'flex','important');
        changeButtonVisibility(btnAddNewPost,'none','important');
        changeButtonVisibility(divLogout,'none',"important");
        
        
      } else{
        changeButtonVisibility(divLogin,'none',"important");
        changeButtonVisibility(btnAddNewPost,'flex','important');
        changeButtonVisibility(divLogout,'flex',"important");
        showUserNameInNavPar();
        setProfileImage();
        

    }
}

function refrshPage(){
  setTimeout(() =>{
    window.location = 'home.html';
  },500)
}



setupUI();


 function logout(){
   
   localStorage.removeItem('token');
   localStorage.removeItem('Socialcurrentuser');
   window.location = 'home.html';
  //  setupUI();
   showSuccessAlertUsingBootstrap('Logout Seccessfully');
  //  setupUI();
  //  setupUI();
  // setupUI();

}