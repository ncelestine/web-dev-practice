// Load users into a list (click handler)
/*

document.getElementById("loadUsers").addEventListener("click", async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();

        const list = document.getElementById("userList");
        list.innerHTML = "";

        users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = user.name;
            list.appendChild(li);
        });

    } catch (error) {
        console.error(error);
    }
});
*/

// Reusable async function that fetches one post
/*
async function loadData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.title);
    } catch (error) {
        console.error(error);
    }
}

loadData("https://jsonplaceholder.typicode.com/posts/1");
*/

// Load users with error handling and clearing old results
/*
document.getElementById("loadUsers").addEventListener("click", async function () {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();

        const list = document.getElementById("userList");
        list.innerHTML = ""; // clear previous results

        users.forEach(function(user) {
            const li = document.createElement("li");
            li.textContent = user.name;
            list.appendChild(li);
        });

    } catch (error) {
        console.error(error);
    }
});
*/

// Bug fix: fetch() must be awaited
/*async function loadData() {
  const data = fetch(url);
  console.log(data);
}
  /*
/Because fetch() is async, you must await it (or use .then) to get the actual result. Otherwise you only get a Promise. */

// CORRECTION
/*async function loadData(url) {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
}

loadData("https://jsonplaceholder.typicode.com/posts/1");
*/

// Common mistake: forgetting to await response.json()
/*
async function test() {
  const response = await fetch(url);
  const data = response.json();
  console.log(data);
}
  */
//What will it output? A Promise, not JSON data
//The function runs, but it logs a Promise instead of the JSON because response.json() was not awaited.

// Event loop order: sync code, then microtasks, then timers
/*
console.log("Start");

setTimeout(() => console.log("Timeout"), 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("End");
*/

/*Start
End
Promise
Timeout

Javascript run in order of scynchronous code first starting from top to bottom. Promise.then() goes into the microtask queue.
Microtasks run before setTimeout, even though delay is 0, it still waits for the event loop.
*/

// Random joke loader with loading and error states

/*document.getElementById("loadJoke").addEventListener("click", async function () {

    const jokeElement = document.getElementById("joke");
    jokeElement.textContent = "Loading...";

    try {
        const response = await fetch("https://official-joke-api.appspot.com/random_joke");
        const data = await response.json();
        jokeElement.textContent = data.setup + " - " + data.punchline;
    } catch (error) {
        jokeElement.textContent = "Failed to load joke.";
        console.error(error);
    }

});
*/

// Multi-request loader: three API calls in parallel with Promise.all
document.getElementById("loadAll").addEventListener("click", async function () {
  const status = document.getElementById("status");
  const usersList = document.getElementById("usersList");
  const postsList = document.getElementById("postsList");
  const commentsList = document.getElementById("commentsList");

  // Loading indicator
  status.textContent = "Loading...";
  usersList.innerHTML = "";
  postsList.innerHTML = "";
  commentsList.innerHTML = "";

  try {
    // Fetch all 3 at the same time
    const [usersRes, postsRes, commentsRes] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users"),
      fetch("https://jsonplaceholder.typicode.com/posts"),
      fetch("https://jsonplaceholder.typicode.com/comments")
    ]);

    // Convert all to JSON (also in parallel)
    const [users, posts, comments] = await Promise.all([
      usersRes.json(),
      postsRes.json(),
      commentsRes.json()
    ]);

    // Display ONLY after all finish
    users.slice(0, 5).forEach(function (user) {
      const li = document.createElement("li");
      li.textContent = user.name;
      usersList.appendChild(li);
    });

    posts.slice(0, 5).forEach(function (post) {
      const li = document.createElement("li");
      li.textContent = post.title;
      postsList.appendChild(li);
    });

    comments.slice(0, 5).forEach(function (comment) {
      const li = document.createElement("li");
      li.textContent = comment.email;
      commentsList.appendChild(li);
    });

    status.textContent = "Done!";
  } catch (error) {
    status.textContent = "Error loading data.";
    console.error(error);
  }
});
