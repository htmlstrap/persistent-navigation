/*! jQuery Persistent Navigation 0.1.0
 *  Copyright (c) 2014 Jody Zeitler
 *  Licensed under the MIT license.
 *  http://en.wikipedia.org/wiki/MIT_License
 */
(function($) {
	$.fn.persistentNavigation = function() {
		this.each(function() {
			var $window = $(window),
				$menu = $('#menu'),
				topOffset = $menu.offset().top;

			// wrap in fixed div, offset to starting position
			$menu.wrap('<div style="position:fixed"></div>').css({'position': 'absolute', 'top': topOffset});

			var lastScroll = 0;
			// emulate natural scrolling until menu is fully revealed, then stop
			$window.scroll(function() {
				if ($window.scrollTop() < lastScroll) { // going up
					if ( $menu.position().top < topOffset ) {
						$menu.css('top', Math.min( $menu.position().top + lastScroll - $window.scrollTop(), topOffset) );
					}
				}
				else { // going down
					if ( $menu.height() + $menu.position().top > $window.height() ) { // scroll
						$menu.css('top', Math.max( $menu.position().top + lastScroll - $window.scrollTop(), $window.height() - $menu.height() ) );
					}
				}
				lastScroll = $window.scrollTop();
			}).trigger('scroll');
		});
	}
})(jQuery);