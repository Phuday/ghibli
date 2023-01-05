document.addEventListener("DOMContentLoaded", function () {
  $(document).ready(function () {
    $(".hero").slick({
      arrows: false,
      autoplay: true,
      autoplaySpeed: 5000,
      cssEase: "linear",
      pauseOnHover: false,
    });
  });

  const images = document.querySelectorAll(".movie-img-container img");
  images.forEach((item) => item.addEventListener("click", handleZoomImage));
  function handleZoomImage(event) {
    const image = event.target.getAttribute("src");
    const template = `
    <div class="lightbox">
      <div class="lightbox-content">
        <button id="lightbox-fullscreen"><i class="fa-solid fa-expand"></i></button>
        <i class="fa fa-angle-left lightbox-prev"></i>
        <img
          src="${image}"
          alt=""
          class="lightbox-image"
        />
        <i class="fa fa-angle-right lightbox-next"></i>
      </div>
    </div>`;
    document.body.insertAdjacentHTML("beforeend", template);
  }
  let index = 0;
  document.addEventListener("click", function (e) {
    let myDocument = document.documentElement;
    let btn = document.getElementById("lightbox-fullscreen");
    btn.addEventListener("click", () => {
      if (myDocument.requestFullscreen) {
        document.querySelector(".lightbox-content").style.width = "90%";
        myDocument.requestFullscreen();
      } else if (myDocument.msRequestFullscreen) {
        myDocument.msRequestFullscreen();
      } else if (myDocument.mozRequestFullScreen) {
        myDocument.mozRequestFullScreen();
      } else if (myDocument.webkitRequestFullscreen) {
        myDocument.webkitRequestFullscreen();
      }
    });
    const lightImage = document.querySelector(".lightbox-image");
    if (!lightImage) return;
    let lightSrc = lightImage.getAttribute("src");
    index = [...images].findIndex(
      (item) => item.getAttribute("src") === lightSrc
    );
    if (e.target.matches(".lightbox")) {
      e.target.parentNode.removeChild(e.target);
    } else if (e.target.matches(".lightbox-next")) {
      index = index + 1;
      if (index > images.length - 1) {
        index = 0;
      }
      displayLightImage(lightImage, index);
    } else if (e.target.matches(".lightbox-prev")) {
      index = index - 1;
      if (index < 0) {
        index = images.length - 1;
      }
      displayLightImage(lightImage, index);
    }
  });

  function displayLightImage(lightImage, index) {
    const newSrc = [...images][index].getAttribute("src");
    lightImage.setAttribute("src", newSrc);
  }

  const moreBtn = document.querySelector(".more-btn");
  const text = document.querySelector(".history");
  moreBtn.addEventListener("click", function () {
    text.classList.toggle("active");
    if (moreBtn.innerText === "もっと読む") {
      moreBtn.innerText = "閉める";
    } else {
      moreBtn.innerText = "もっと読む";
    }
  });
});
