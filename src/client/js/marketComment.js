const marketContainer = document.getElementById("marketContainer");
const form = document.getElementById("commentForm");
const deleteBtn = document.querySelectorAll("#deleteCommentBtn");
const sendBtn = form.querySelector("button");

const addComment = (text, commentId) => {
  const marketComments = document.querySelector(".market__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "market__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");

  span2.dataset.id = commentId;
  span2.dataset.marketid = marketContainer.dataset.id;
  span2.id = "newDeleteCommentBtn";
  span2.className = "market__comment-delete";

  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  marketComments.prepend(newComment);

  const newDeleteCommentBtn = document.querySelector("#newDeleteCommentBtn");
  newDeleteCommentBtn.addEventListener("click", handleClick);
};
const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const marketId = marketContainer.dataset.id;
  const response = await fetch(`/api/markets/${marketId}/comment`, {
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
    // console.log(newCommentId);
  }

  // 댓글을 실시간처럼 보이도록하나 댓글을 작성할때마다 비디오에 작성된
  // 모든 댓글을 새로고침 하기때문에 서버에 부하가 걸릴수있음
};

const handleEnter = (event) => {
  if (event.keyCode == 13) {
    event.preventDefault();
    sendBtn.click();
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
  form.addEventListener("keydown", handleEnter);
}

const handleClick = async (event) => {
  const { id, marketid } = event.target.dataset;
  const response = await fetch(
    `/api/markets/${marketid}/comments/${id}/delete`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, marketid }),
    }
  );
  if (response.status === 200) {
    event.target.parentNode.remove();
  }
};

if (deleteBtn)
  deleteBtn.forEach((btn) => btn.addEventListener("click", handleClick));
