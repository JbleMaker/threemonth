const communityContainer = document.getElementById("communityContainer");
const form = document.getElementById("commentForm");
const deleteBtn = document.querySelectorAll("#deleteCommentBtn");

const addComment = (text, commentId) => {
  const communityComments = document.querySelector(".community__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "community__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");

  span2.dataset.id = commentId;
  span2.dataset.communityid = communityContainer.dataset.id;
  span2.id = "newDeleteCommentBtn";
  span2.className = "community__comment-delete";

  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  communityComments.prepend(newComment);

  const newDeleteCommentBtn = document.querySelector("#newDeleteCommentBtn");
  newDeleteCommentBtn.addEventListener("click", handleClick);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const communityId = communityContainer.dataset.id;

  if (text === "") {
    return;
  }
  const response = await fetch(`/api/community/${communityId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
  window.location.reload();
  if (response.status === 201) {
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

const handleClick = async (event) => {
  const { id, communityid } = event.target.dataset;
  const response = await fetch(
    `/api/community/${communityid}/comments/${id}/delete`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, communityid }),
    }
  );
  if (response.status === 200) {
    event.target.parentNode.remove();
  }
};

if (deleteBtn)
  deleteBtn.forEach((btn) => btn.addEventListener("click", handleClick));
