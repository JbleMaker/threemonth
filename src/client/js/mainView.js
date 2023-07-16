const noticeView = document.querySelector("#noticeView");
const marketView = document.querySelector("#marketView");
const communityView = document.querySelector("#communityView");

const communityClick = () => {
  //조회수
  const { id } = communityView.dataset;
  fetch(`/api/community/${id}/view`, {
    method: "POST",
  });
};

const noticeClick = () => {
  const { id } = noticeView.dataset;
  fetch(`/api/notices/${id}/view`, {
    method: "POST",
  });
};

const marketClick = () => {
  const { id } = marketView.dataset;
  fetch(`/api/markets/${id}/view`, {
    method: "POST",
  });
};

if (noticeView) {
  noticeView.addEventListener("click", noticeClick);
}

if (marketView) {
  marketView.addEventListener("click", marketClick);
}

if (communityView) {
  communityView.addEventListener("click", communityClick); //community 조회수
}
