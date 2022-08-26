$( document ).ready(function() {

    /* SIDEBAR */
    function place_sidebar() {
        var target = $(".col-lg-8").first().offset().left - 275;
        if (target < 0) {
            $(".toc-div").css({
                "display": "none"
            });
        }
        else {
            $(".toc-div").css({
                "display": "block"
            });
        }
        $(".toc-div").css({
            "left": target + "px"
        });
    }

    $(function () {
        var offsetPixels = 277; // navbar height
        place_sidebar();

        $(window).scroll(function () {
            if ($(window).scrollTop() > offsetPixels) {
                $(".toc-div").css({
                    "position": "fixed",
                    "top": "0px"
                });
            } else {
                $(".toc-div").css({
                    "position": "absolute",
                    "top": "277px"
                });
            }
        });
        $(window).on('resize', function () {
            place_sidebar();
        });
    });

});