//Profile info
const bioOverview = document.querySelector(".overview");
//Github username
const username = "dandyjohns";

const getData = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    console.log(data);
};
getData();

//Fetch & Display User Information
const displayUserInfo = function (data) {
    //Inside the function, create a new div and give it a class of “user-info”.
}




