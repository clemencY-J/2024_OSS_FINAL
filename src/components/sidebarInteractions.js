document.addEventListener("DOMContentLoaded", function () {
    // 사이드바 요소
    const sidebar = document.querySelector(".rightside-menu");
    const playlistMenuItem = document.querySelector(".menu li:nth-child(2)"); // My Playlist 메뉴 항목
    const playlistFolder = document.getElementById("playlist-folder");
    const playlistItems = document.querySelectorAll("#playlist-folder li");
    const addPlaylistMenuItem = document.querySelector("#add-playlist");
  
    // 사이드바 토글 버튼 (숨기기/보이기)
    const toggleSidebar = document.createElement("button");
    toggleSidebar.textContent = "☰"; // 메뉴 아이콘
    toggleSidebar.style.position = "absolute";
    toggleSidebar.style.left = "10px";
    toggleSidebar.style.top = "10px";
    toggleSidebar.style.zIndex = "11";
    toggleSidebar.style.fontSize = "1.5rem";
    toggleSidebar.style.cursor = "pointer";
    document.body.appendChild(toggleSidebar);
  
    toggleSidebar.addEventListener("click", () => {
      sidebar.classList.toggle("hidden");
    });
  
    // My Playlist 클릭 시 폴더 열림/닫힘
    playlistMenuItem.addEventListener("click", () => {
      playlistFolder.classList.toggle("open");
    });
  
    // PlayList 아이템 클릭 시 효과
    playlistItems.forEach((item) => {
      item.addEventListener("click", () => {
        playlistItems.forEach((el) => el.classList.remove("active")); // 이전 선택 항목 비활성화
        item.classList.add("active"); // 현재 선택 항목 활성화
      });
    });
  
    // ADD PLAYLIST 클릭 시 (새 페이지 이동 또는 기능 실행)
    if (addPlaylistMenuItem) {
      addPlaylistMenuItem.addEventListener("click", () => {
        alert("Add Playlist 버튼 클릭!"); // 필요한 작업 추가
      });
    }
  });
  