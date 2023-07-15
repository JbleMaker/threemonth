const communityView = document.querySelector("#communityView");
const communityClick = () => {
  //조회수
  const { id } = communityView.dataset;
  fetch(`/api/community/${id}/view`, {
    method: "POST",
  });
};
communityView.addEventListener("click", communityClick); //community 조회수
