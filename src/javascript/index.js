/**
 @module index
*/

document.addEventListener("DOMContentLoaded", function(){
    var video = document.getElementById("spaceVideo");
    var fallbackImage = document.getElementById("fallback-image");

    // Check is the video can play
    video.oncanplay = function(){
        fallbackImage.style.display = "none"; // Hide fallback image
        video.style.display = "block"; // Show video
    };

    // Fallback if video fails to load
    video.onerror = function() {
        fallbackImage.style.display = "block"; // Show fallback image
        video.style.display = "none"; // Hide video
    };
});