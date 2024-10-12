//Profile info
const bioOverview = document.querySelector(".overview");
//Github username
const username = "dandyjohns";
//Unordered list to display repos
const repoList = document.querySelector(".repo-list");
//Selects where all repo info appears
const allRepos = document.querySelector(".repos");
//Selects setion where individual repos data appears
const indRepoData = document.querySelector(".repo-data");
//Repo gallery button
const viewReposButton = document.querySelector(".view-repos");
//Search by name input
const filterInput = document.querySelector(".filter-repos");

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
    fetchRepos(username);
};

//Fetch Repos
const fetchRepos = async function (username) {
    const grabRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await grabRepos.json();
    displayRepoInfo(repoData);   
};

//Display Repo Info
const displayRepoInfo = function (repos) {
  filterInput.classList.remove("hide");
  for (const repo of repos) {
    const repoName = document.createElement("li");
    repoName.classList.add("repo");
    repoName.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoName);
  }  
};

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
     const repoItem = e.target.innerText;
     getRepoInfo(repoItem);
}
});

const getRepoInfo = async function (repoItem) {
  const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoItem}`);
  const repoInfo = await fetchInfo.json();
  console.log(repoInfo);
  //Grab languages
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();

 //Create list of languages
 const languages = [];
for (const language in languageData) {
  languages.push(language);
}

displaySpecificRepoInfo(repoInfo, languages); 
};

//Create a Function to Display Specific Repo Info
const displaySpecificRepoInfo = function (repoInfo, languages) {
  viewReposButton.classList.remove("hide");
  indRepoData.innerHTML = "";
  indRepoData.classList.remove("hide");
  allRepos.classList.add("hide");
  const divTwo = document.createElement("div-two");
  divTwo.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a> `;
    
    indRepoData.append(divTwo);
};

viewReposButton.addEventListener("click", function () {
  allRepos.classList.remove("hide");
  indRepoData.classList.add("hide");
  viewReposButton.classList.add("hide");
});

// Dynamic search
filterInput.addEventListener("input", function (e) {
   const searchText = e.target.value;
   const repos = document.querySelectorAll(".repo");
   const searchLowerCase = searchText.toLowerCase();

   for (const repo of repos) {
    const repoLowerText = repo.innerText.toLowerCase(); 
    if (repoLowerText.includes(searchLowerCase)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});