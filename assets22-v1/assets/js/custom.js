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
        open_menu($(this).find(".dropdown_menu"))
    });
    $(".nav_item.has_dropdown > a").focus(function(){
        open_menu($(this).parent().find(".dropdown_menu"))
    });

    $(".nav_item.has_dropdown").mouseleave(function(){
        menu_close_timer()
    });
    $(".nav_item.has_dropdown > a").blur(function(){
        menu_close_timer()
    });

    // EVENTS ON DROPDOWN
    $(".dropdown_menu").mouseenter(function() {
        cancel_menu_close_timer();
    });
    $(".dropdown_menu").focus(function() {
        cancel_menu_close_timer();
    });
    $(".dropdown_menu").mouseleave(function(){
        menu_close_timer()
    });
    $(".dropdown_menu").blur(function(){
        menu_close_timer()
    });

    // EVENTS ON DROPDOWN LINKS
    $(".dropdown_menu a").mouseenter(function() {
        cancel_menu_close_timer();
    });
    $(".dropdown_menu a").focus(function() {
        cancel_menu_close_timer();
    });
    $(".dropdown_menu a").mouseleave(function(){
        menu_close_timer()
    });
    $(".dropdown_menu a").blur(function(){
        menu_close_timer()
    });

    // close layer when click-out
    document.onclick = close_menu; 

    $("#menu_button").click(function() {
        if ($("#menu_items").css("display") == "none") {
            $("#menu_items").css("display", "block")
        }
        else if ($("#menu_items").css("display") == "block") {
            $("#menu_items").css("display", "none")
        }
    })

});