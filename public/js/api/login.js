
let role;
const form = document.getElementById("form-login")
form.addEventListener('submit', (e) => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    e.preventDefault();
    axios
        .post("http://localhost:3001/api/v1/users/login", {
            email,
            password
        })
        .then(function (response) {
            role = response.data.role
            if (role == "Ban điều hành") {
                window.location.assign("../admin.html");
                alert("Chào ban quản lý")
            }
            console.log(response.data);
            console.log(role);
        })
        .catch(function (error) {
            console.log(error);
        });
})


