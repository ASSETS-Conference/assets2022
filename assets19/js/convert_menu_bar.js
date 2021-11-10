/* 
by Lourdes Morales-Villaverde
October 12, 2015

Convert Menu Bar into a Drop-Down Menu (i.e., into a Select element) 
for smaller screens:

1 - The Select element is created.
2 - The first option is inserted: "Go to..."
3 - An option is created for each link in the menu bar (including 
	the drop-down menu links). 
4 - Each option is placed in the select.

Note: If the link is a drop-down menu link, it adds a "-" 
in front of the link title to distinguish it from 
the title bar links.

Source: http://webdesign.tutsplus.com/tutorials/building-a-responsive-layout-with-skeleton-navigation--webdesign-6385

*/

// Create select
$("<select />").appendTo("#drop_down_menu nav");

// Insert first option "Go to..." (non-selectable)
$("<option />" , {
	"selected" : "selected",
	"value" : "",
	"text" : "Go to..."}).appendTo("#drop_down_menu nav select");
	
// Insert links from original title bar
$("#menu_bar li a").each(function(){
    var el = $(this);	    
	if(el.attr("class") == "mb_link")
	{
		$("<option />",{
		    "value": el.attr("href"),
		"text" : el.text()}).appendTo("#drop_down_menu nav select");
	}
	else{
		$("<option />",{
		"value" : el.attr("href"), 
		"text" : "-" + el.text()}).appendTo("#drop_down_menu nav select");
	}
	
});

// The following ensures that the links in the select work
$("#drop_down_menu nav select").change(function(){
	window.location = $(this).find("option:selected").val();
});