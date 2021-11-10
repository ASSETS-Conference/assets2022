// JavaScript code for the drop-down menus
	
var timeout	= 300; //500
var closetimer	= 0;
var ddmenuitem	= 0;

// open hidden layer
function mopen(id)
{	
    // cancel close timer
    mcancelclosetime();

    // close old layer
    if (ddmenuitem) 
    {
        ddmenuitem.style.visibility = 'hidden';
        ddmenuitem.style.opacity = 0;
        ddmenuitem.style.filter = 'alpha(opacity=0)';
    }


    // get new layer and show it
    ddmenuitem = document.getElementById(id);
    ddmenuitem.style.visibility = 'visible';
    ddmenuitem.style.opacity = 10;
    ddmenuitem.style.filter = 'alpha(opacity=100)';

}
// close showed layer
function mclose()
{
    if (ddmenuitem) {
        ddmenuitem.style.visibility = 'hidden';
        ddmenuitem.style.opacity = 0;
        ddmenuitem.style.filter = 'alpha(opacity=0)';
    }

}

// go close timer
function mclosetime()
{
    closetimer = window.setTimeout(mclose, timeout);
}

// cancel close timer
function mcancelclosetime()
{
    if(closetimer)
    {
        window.clearTimeout(closetimer);
        closetimer = null;
    }
}

// close layer when click-out
document.onclick = mclose; 

