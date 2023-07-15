const noticeView = document.querySelector("#noticeView");
const noticeClick = () => {
  //조회수
  const { id } = noticeView.dataset;
  fetch(`/api/notices/${id}/view`, {
    method: "POST",
  });
};
noticeView.addEventListener("click", noticeClick); //notice 조회수
