//Basic Frontend Validation scripts
function validateEmail() {
  const domain = "mail.uc.edu";
  let email = document.getElementById('email').value;
    var parts = email.split('@');
    if (parts.length === 2) {
        if (parts[parts.length-1] === domain) {
          alert("yay!");
            return true;
        }
    }else {
      alert("nay"); 
    }
    return false;
}
function validatePassword() {
  let pwd = document.getElementById('password').value;
  if (!(pwd.length >= 8)) {
    alert("Password length should be more than eight characters");
  }
  else { 
    alert("nay!");}

}

function confirmPassword() {
  pwd = document.getElementById('password').value;
  confirmPwd = document.getElementById('confirmPwd').value;
  if ( pwd !== confirmPwd ) {
    alert ("Password not matching");
  }
}
