
/**
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @param {string} passwordConfirm
 */
async function submitForm(
    username,
    email,
    password,
    passwordConfirm,
) {

    console.log("username : " + username);
    console.log("email : " + email);
    console.log("password : " + password);
    console.log("passwordConfirm : " + passwordConfirm);
    try {
        const response = await fetch(
            'https://www.greatfrontend.com/api/questions/sign-up',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    password_confirm: passwordConfirm,
                }),
            },
        );

        const { message } = await response.json();
        alert(message);
    } catch (_) {
        alert('Error submitting form!');
    }
}

// Write any JavaScript here.
const submitEl = document.getElementById("submit");
const usernameEl = document.getElementById("username");
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const confirmPasswordEl = document.getElementById("confirmPassword");
const formEl = document.querySelector("FORM");

let isUsernameValid = false;
let isEmailValid = false;
let isPasswordValid = false;
let isConfirmPasswordValid = false;

formEl.addEventListener("keyup", () => {
    if(
        isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid){
        submitEl.removeAttribute("disabled")
    }
})

submitEl.addEventListener("click", () => {

    submitForm(
        usernameEl.value,
        emailEl.value,
        passwordEl.value,
        confirmPasswordEl.value
    )
})

usernameEl.addEventListener("keyup", () => {
    console.log("fdfsd");
    const usernameErrorEl = document.getElementById("usernameError");
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;

    const usernameVal = usernameEl.value;
    if(usernameVal.length < 4){
        usernameErrorEl.innerText = "Username cannot be less than 4";
        submitEl.setAttribute("disabled", true);
        isUsernameValid = false;
    }
    else if(!alphanumericRegex.test(usernameVal)){
        usernameErrorEl.innerText = "Username should only be alphanumeric";
        submitEl.setAttribute("disabled", true);
        isUsernameValid = false;
    }
    else{
        usernameErrorEl.innerText = "";
        isUsernameValid = true;
    }
})

emailEl.addEventListener("keyup", () => {
    const emailErrorEl = document.getElementById("emailError");
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emailVal = emailEl.value;
    if(!emailRegex.test(emailVal)){
        emailErrorEl.innerText = "Not a valid email";
        submitEl.setAttribute("disabled", true);
        isEmailValid = false;
    }
    else{
        emailErrorEl.innerText = "";
        isEmailValid = true;
    }
})

passwordEl.addEventListener("keyup", () => {
    confirmPasswordEl.innerText = "";
    const passwordErrorEl = document.getElementById("passwordError");

    const passwordVal = passwordEl.value;
    if(passwordVal.length < 6){
        passwordErrorEl.innerText = "Not a valid password";
        submitEl.setAttribute("disabled", true);
        isPasswordValid = false;
    }
    else{
        passwordErrorEl.innerText = "";
        isPasswordValid = true;
    }
})

confirmPasswordEl.addEventListener("keyup", () => {
    const confirmPasswordErrorEl = document.getElementById("confirmPasswordError");

    if(confirmPasswordEl.value !== passwordEl.value){
        confirmPasswordErrorEl.innerText = "Password didn't match";
        submitEl.setAttribute("disabled", true);
        isConfirmPasswordValid = false;
    }
    else{
        confirmPasswordErrorEl.innerText = "";
        isConfirmPasswordValid = true;
    }
})

