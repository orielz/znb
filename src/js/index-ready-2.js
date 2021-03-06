﻿$(function () {
    var a = $(".slider");
    a._TMS({
        items: ".items li",
        pagination: true,
        duration: 500,
        easing: "easeOutQuad",
        playBlock: true,
        slideShow: 5000,
        progressBar: false,
        banners: true,
        playBu: ".play",
        prevBu: ".prev",
        nextBu: ".next",
        preset: "blind",
        pauseOnHover: true,
        numStatus: false,
        bannerMeth: "custom",
        beforeAnimation: function (b) {
            if (b) {
                b.stop().animate({right: -b.width()}, 800, "easeInBack")
            }
        },
        afterAnimation: function (b) {
            b.css({top: "20px", right: -b.width()}).stop().animate({right: "30px"}, 800, "easeOutBack")
        }
    })
});