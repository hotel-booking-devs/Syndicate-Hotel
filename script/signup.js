const passwordInput = document.getElementById("password");
const passwordInput1 = document.getElementById("password1");
const checkb= document.getElementById("check_b");
checkb.addEventListener("change", function () {
  if (this.checked) {
    passwordInput.type = "text"; 
    passwordInput1.type = "text";
  } else {
    passwordInput.type = "password";
    passwordInput1.type = "password";
  }
});
function signup(){
  let username=document.getElementById("user_name").value;
  let phone_no=document.getElementById("phone_no").value;
  let names=document.getElementById("names").value;
  let password=document.getElementById("password").value;
  let password1=document.getElementById("password1").value;
  let email=document.getElementById("email").value;
    if(password1!=password){
      alert("Password do not match");
      return;
    }
    let  userdata={
      "username":username,
      "names":names,
      "email":email,
      "phonenumber":phone_no,
      "password":password 
    };
    checkuser(username)
    .then(useraname_availble=>{
      if(useraname_availble){
      alert("username is not available, use a different username")
      return;
      }
    fetch("http://localhost:3000/api/signup", {
        method:"POST",
        headers:{
          "Content-type": "application/json"
        },
        body:JSON.stringify(userdata)
      })
      .then(res=>res.json())
      .then(ans=>{
        alert("Account created successfully, proceed to log in");
        window.location.href = "login.html"; 
      })
      .catch(error=>
        console.log("error creating an account, please try again later",error)
      ); 

    })    
}
function checkuser(username){
  return fetch("http://localhost:3000/api/checkuser", {
    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({
      "username":username
    })
  })
  .then(res=>res.json())
  .then(data=>{
    return data.exist;
  }
  )
}