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