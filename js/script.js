//Profile info
const bioOverview = document.querySelector(".overview");
//Github username
const username = "dandyjohns";

const getData = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    displayUserInfo(data);
};
getData();

//Fetch & Display User Information
const displayUserInfo = function (data) {
    //Inside the function, create a new div and give it a class of “user-info”.
    const div = document.createElement("div");
    div.innerHTML = `
        <figure>
      <img alt="user avatar" src=${`https://avatars.githubusercontent.com/u/142632717?v=4`} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${`dandyjs`}</p>
      <p><strong>Bio:</strong> ${`Aspiring developer diving into JavaScript and React, eager to build dynamic web applications, and excited to explore AI through innovative projects.`}</p>
      <p><strong>Location:</strong> ${`Portland, Oregon`}</p>
      <p><strong>Number of public repos:</strong> ${`29`}</p>
    </div> `;
    bioOverview.append(div);
}