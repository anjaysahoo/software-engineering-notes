const formEl = document.querySelector('form');

async function submitForm(username, email, password, confirmPassword) {
    console.log("username : ", username);
    console.log("email : ", email);
    console.log("password : ", password);

    try{
        const response = fetch("https://www.greatfrontend.com/api/questions/sign-up", {
            method: "POST",
            headers: {
                contentType: "application/json",
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                password_confirm: confirmPassword
            })
        })

        const { message } = await response.json();
        console.log("message : ", message);

    }
    catch(_e){
        console.log("Error : ", _e);
    }

}

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("submit event : ", event);

    const formData = new FormData(formEl);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');

    console.log("username : ", username);
    console.log("email : ", email);
    console.log("password : ", password);
    console.log("confirmPassword : ", confirmPassword);

    const confirmPasswordErrorEl = document.getElementById("confirm-password-error");
    if(password !== confirmPassword){
        confirmPasswordErrorEl.classList.remove("hidden");
        return;
    }
    else{
        confirmPasswordErrorEl.classList.add("hidden");
    }

    submitForm(username, email, password, confirmPassword)
})
