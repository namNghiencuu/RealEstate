const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});
signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});
$(document).ready(function() {
  const changeText = function(el, text, color) {
    el.text(text).css("color", color);
  };
  $(".input-4").keyup(function() {
    let len = this.value.length;
    const pbText = $(".form-4 .progress-bar_text");
    if (len === 0) {
      $(this).css("border-color", "#2F96EF");
      changeText(pbText, "Password must be at least 6 character", "#aaa");
    } else if (len > 0 && len <= 4) {
      $(this).css("border-color", "#FF4B47");
      changeText(pbText, "Too weak", "#FF4B47");
    } else if (len > 4 && len <= 8) {
      $(this).css("border-color", "#F9AE35");
      changeText(pbText, "Could be stronger", "#F9AE35");
    } else {
      $(this).css("border-color", "#2DAF7D");
      changeText(pbText, "Strong password", "#2DAF7D");
    }
  });
});
