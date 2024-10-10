//Profile info
const bioOverview = document.querySelector(".overview");
//Github username
const username = "dandyjohns";
//Unordered list to display repos
const ulRepos = document.querySelector(".repo-list")

const getData = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    displayUserInfo(data);
};
getData();

//Fetch & Display GitHub User Information
const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> `;
    bioOverview.append(div);
    fetchRepos();
};

//Fetch Repos
const fetchRepos = async function () {
    const grabRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await grabRepos.json();
    displayRepoInfo(repoData);   
};

//Display Repo Info
const displayRepoInfo = function (repos) {
  for (const repo of repos) {
    const repoName = document.createElement("li");
    repoName.classList.add("repo");
    repoName.innerHTML = `<h3>${repo.name}</h3>`;
    ulRepos.append(repoName);
  }  
};

