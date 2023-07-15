const marketView = document.querySelector("#marketView");
const marketClick = () => {
  //조회수
  const { id } = marketView.dataset;
  fetch(`/api/markets/${id}/view`, {
    method: "POST",
  });
};
marketView.addEventListener("click", marketClick); //market 조회수
