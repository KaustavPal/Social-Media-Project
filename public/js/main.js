const postLinkInput = document.querySelector("#post-link");
const addBtn = document.querySelector("#add-post");
const postDescriptionInput = document.querySelector("#post-description");
const postList = document.querySelector("#post-list");

addBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const link = postLinkInput.value;
  const description = postDescriptionInput.value;
  try {
    if (link && description) {
      await axios.post("http://localhost:3000/socialmedia/add-posts", {
        link: link,
        description: description,
      });

      await getPosts();
    }
  } catch (err) {
    console.log(err);
  }
});

function showPosts(posts) {
  postList.innerHTML = "";
  posts.forEach((post) => {
    const li = document.createElement("li");
    li.id = post.id;
    li.innerHTML = `<div><img src = "${post.link}" width = "200" height = "200" alt="${post.link}" class="comment-div"/> <br> <p>User - ${post.description}</p> <br> <div id="comments-div-${post.id}"><button type="button", onclick="comments(${post.id})">Comments</button></div>`;

    postList.appendChild(li);
  });
}

function comments(id) {
  const postId = id;
  const commentDiv = document.querySelector(`#comments-div-${id}`);
  commentDiv.innerHTML = `<form><input type="text", name="comment" id="comment", class="comment"><button type="button" class="commentBtn" onclick=postComment(${postId})>Post</button><ul id="comment-list-${id}"></ul></div></form>`;
}

async function postComment(id) {
  const postId = id;
  const comment = document.querySelector("#comment").value;
  const ul = document.querySelector(`#comment-list-${id}`);
  try {
    console.log(comment);
    if (postId && comment) {
      await axios.post("http://localhost:3000/socialmedia/comments", {
        postId: postId,
        comment: comment,
      });

      await getComments(id);
    }
  } catch (err) {
    console.log(err);
  }
}

function showComments(comments, ulId) {
  const commentList = document.getElementById(`comment-list-${ulId}`);
  commentList.innerHTML = "";
  comments.forEach((comment) => {
    if (ulId == comment.id) {
      const li = document.createElement(li);
      li.innerHTML = `${comment.comment}`;
      commentList.appendChild(li);
    }
  });
}

async function getPosts() {
  try {
    const res = await axios.get("http://localhost:3000/socialmedia/posts");
    const posts = res.data;
    showPosts(posts);
  } catch (err) {
    console.log(err);
  }
}

async function getComments(ulId) {
  const commentUlId = ulId;
  try {
    console.log(commentUlId);
    const res = await axios.get("http://localhost:3000/socialmedia/comments");
    const comments = res.data;
    showComments(comments, commentUlId);
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener("DOMContentLoaded", getPosts);
//window.addEventListener("DOMContentLoaded", getComments);
