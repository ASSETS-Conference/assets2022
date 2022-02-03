$( document ).ready(function() {
    
    var timeout = 300; //500
    var close_timer = 0;
    var current_dropdown = null;

    function open_menu(dropdown_element) {

        // cancel close timer
        cancel_menu_close_timer();

        // close old menu
        if (current_dropdown) {
            close_menu();
        }

        // open new menu
        current_dropdown = dropdown_element
        $(dropdown_element).css("display", "block")
    }
    function close_menu() {
        if (current_dropdown) {
            $(current_dropdown).css("display", "none")
            current_dropdown = null
        }
    }
    function menu_close_timer() {

        console.log("start close timer");
        if (!close_timer) {
            close_timer = setTimeout(close_menu, timeout)
        }
    }
    function cancel_menu_close_timer() {
        if(close_timer)
        {
            clearTimeout(close_timer);
            close_timer = null;
        }
    }

    // EVENTS ON MAIN MENU ITEMS
    $(".nav_item.has_dropdown").mouseenter(function(){
        if (event.cancelable) event.preventDefault();
        if ($(window).width() > 991) {
            open_menu($(this).find(".dropdown_menu"))
        }
    });
    $(".nav_item.has_dropdown > a").focus(function(){
        if (event.cancelable) event.preventDefault();
        if ($(window).width() > 991) {
            open_menu($(this).parent().find(".dropdown_menu"))
        }
    });
    $(".nav_item.has_dropdown > a").on('click touchstart', function( event ) {
        if (event.cancelable) event.preventDefault();
        console.log("click");
        if ($(this).parent().find(".dropdown_menu").css("display") == "none") {
            open_menu($(this).parent().find(".dropdown_menu"))
            cancel_menu_close_timer();
        }
        else if ($(this).parent().find(".dropdown_menu").css("display") == "block") {
            close_menu();
        }
        /*
        open_menu($(this).find(".dropdown_menu"))
        cancel_menu_close_timer();
        */
    });

    $(".nav_item.has_dropdown").mouseleave(function(){
        if (event.cancelable) event.preventDefault();
        if ($(window).width() > 991) {
            console.log("mouseleave");
            menu_close_timer();
        }
    });
    $(".nav_item.has_dropdown > a").blur(function(){
        if (event.cancelable) event.preventDefault();
        if ($(window).width() > 991) {
            console.log("blur");
            menu_close_timer();
        }
    });
    $(".nav_item.has_dropdown").on('click touchend', function() {
        if (event.cancelable) event.preventDefault();
        /*
        console.log("touchend");
        console.log(close_timer);
        cancel_menu_close_timer(); */
    });

    // EVENTS ON DROPDOWN
    $(".dropdown_menu").mouseenter(function() {
        if ($(window).width() > 991) {
            cancel_menu_close_timer();
        }
    });
    $(".dropdown_menu").focus(function() {
        if ($(window).width() > 991) {
            cancel_menu_close_timer();
        }
    });

    $(".dropdown_menu").mouseleave(function(){
        if ($(window).width() > 991) {
            menu_close_timer();
        }
    });
    $(".dropdown_menu").blur(function(){
        if ($(window).width() > 991) {
            menu_close_timer();
        }
    });

    // EVENTS ON DROPDOWN LINKS
    $(".dropdown_menu a").mouseenter(function() {
        if ($(window).width() > 991) {
            cancel_menu_close_timer();
        }
    });
    $(".dropdown_menu a").focus(function() {
        if ($(window).width() > 991) {
            cancel_menu_close_timer();
        }
    });
    $(".dropdown_menu a").mouseleave(function(){
        if ($(window).width() > 991) {
            menu_close_timer();
        }
    });
    $(".dropdown_menu a").blur(function(){
        if ($(window).width() > 991) {
            menu_close_timer();
        }
    });

    // close layer when click-out
    /*document.onclick = close_menu; */

    $("#menu_button").click(function() {
        if ($("#menu_items").css("display") == "none") {
            $("#menu_items").css("display", "block")
        }
        else if ($("#menu_items").css("display") == "block") {
            $("#menu_items").css("display", "none")
        }
    });

    $("#menu_button").keydown(function( e ) {
        if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
            if ($("#menu_items").css("display") == "none") {
                $("#menu_items").css("display", "block")
            }
            else if ($("#menu_items").css("display") == "block") {
                $("#menu_items").css("display", "none")
            }
        }
    });

});