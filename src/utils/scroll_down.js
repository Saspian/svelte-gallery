export function scrollDown(node) {
  const handleScroll = (event) => {
    console.log(mainEl.scrollTop, "@@scrollTop");
    console.log(mainEl.clientHeight, "@@clientHeight");
    console.log(mainEl.scrollHeight, "@@scrollHeight");
    // if (!node.contains(event.target)) {
    //   node.dispatchEvent(new CustomEvent("outclick"))
    // }
  }
  const mainEl = document.querySelector('.gallery');
  console.log(mainEl, "@@mainEl");
  document.addEventListener("scroll", handleScroll)

  return {
    destroy() {
      document.removeEventListener("scroll", handleScroll)
    }
  }
}
