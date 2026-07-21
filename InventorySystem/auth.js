let loginStatus = localStorage.getItem("isLoggedIn");

if(loginStatus !== "true"){
    window.location.href = "access.html";
}