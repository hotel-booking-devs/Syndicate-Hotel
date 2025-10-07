const passwordInput = document.getElementById("password");
const checkb= document.getElementById("check_b");
checkb.addEventListener("change", function () {
  if (this.checked) {
    passwordInput.type = "text"; 
  } else {
    passwordInput.type = "password";
  }
});