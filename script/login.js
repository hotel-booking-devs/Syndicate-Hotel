const passwordInput = document.getElementById("password");
const checkb= document.getElementById("check_b");
checkb.addEventListener("change", function () {
  if (this.checked) {
    passwordInput.type = "text"; 
  } else {
    passwordInput.type = "password";
  }
});
function login(){
  verify_details()
  .then(verify_user=>{
    if(verify_user){
      window.location.href="dashboard.html";
    }
    else{
      alert("incorrect login details");
    }
  })
  .catch(error=>{
    console.log("error has occured, try again later",error);
  });
  
}
function verify_details(){
  return fetch("url", {
    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({
    "username":document.getElementById("user_name").value,
    "password":document.getElementById("password").value
    })
  })
  .then(res=>res.json())
  .then(data=>{
    return data.correct;
  })
  .catch(error=>{
    console.log("error occurred, try agin later",error);
     return false;
  });
}