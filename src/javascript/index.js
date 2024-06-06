document.addEventListener("DOMContentLoaded", function(){
    var video = document.getElementById("spaceVideo");
    var fallbackImage = document.getElementById("fallback-image");

    video.oncanplay = function(){
        fallbackImage.style.display = "none";
        video.style.display = "block";
    };

    video.onerror = function() {
        fallbackImage.style.display = "block";
        video.style.display = "none";
    };
});