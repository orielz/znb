$(document).ready(function() { 
	$('ul.menu').superfish({ 
		delay:       1000,                            // one second delay on mouseout 
		animation:   {opacity:'show',height:'show'},  // fade-in and slide-down animation 
		speed:       'normal',                          // faster animation speed 
		autoArrows:  false,                           // disable generation of arrow mark-up 
		dropShadows: false                            // disable drop shadows 
	}); 
	$('.list-1 li').hover(function(){th=$(this).find('a'); th.stop().animate({textIndent:'7px'},250) },
								function(){th.stop().animate({textIndent:'0px'},250)});
	
	$('.link-2').hover(function(){th=$(this).find('a'); th.stop().animate({textIndent:'7px'},250) },
								function(){th.stop().animate({textIndent:'0px'},250)});
}); 