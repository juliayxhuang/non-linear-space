document.addEventListener("DOMContentLoaded", function () {

    const favicon = document.getElementById("favicon");

    const originalTitle = document.title;
    const originalFavicon = favicon.href;

    const newTitle = "choo chooooo";
    const newFavicon = "media/watermelon.png";

    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            document.title = newTitle;
            favicon.href = newFavicon;
        } else {
            document.title = originalTitle;
            favicon.href = originalFavicon;
        }
    });

});