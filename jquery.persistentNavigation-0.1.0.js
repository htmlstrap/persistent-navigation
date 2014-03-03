/*! jQuery Persistent Navigation 0.1.0
 *  Copyright (c) 2014 Jody Zeitler
 *  Licensed under the MIT license.
 *  http://en.wikipedia.org/wiki/MIT_License
 */
(function($) {
	$.fn.persistentNavigation = function(method) {
		return this.each(function() {
			switch (method) {
				case 'destroy':
					destroy($(this));
					break;
				default:
					init($(this));
			}
		});
	}

	function init(element) {
		var $window = $(window),
			$menu = element,
			$container = element.parent(),
			topOffset = $menu.offset().top,
			settings = {
				navId: 'nav_' + Math.floor( Math.random() * (new Date()).getTime() )
			}

		// wrap in fixed div, offset to starting position
		var $wrapper = $('<div id="' + settings.navId + '"></div>').css({'position': 'fixed'});
		$menu.wrap($wrapper).css({'position': 'absolute', 'top': 0});

		// store settings
		$menu.data('persistentNavigation', settings);

		// emulate natural scrolling until menu is fully revealed, then stop
		var lastScroll = 0;
		$window.on('scroll.' + settings.navId, function() {
			if ($window.scrollTop() < lastScroll) { // going up
				if ( $menu.position().top < 0 ) {
					$menu.css('top', Math.min( $menu.position().top + lastScroll - $window.scrollTop(), 0) );
				}
			}
			else { // going down
				var scrollHeight = $window.height() - topOffset;
				if ( $menu.height() + $menu.position().top > scrollHeight ) { // scroll
					var newTop = Math.max( $menu.position().top + lastScroll - $window.scrollTop(), scrollHeight - $menu.height() );
					if (newTop + $menu.height() > $container.height() - $window.scrollTop()) {
						newTop = $container.height() - $window.scrollTop() - $menu.height();
					}
					$menu.css('top', newTop);
				}
				else if ($window.scrollTop() + $window.height() > $container.offset().top + $container.height()) { // stop at container edge
					var newTop = Math.min( $menu.position().top + lastScroll - $window.scrollTop(), $container.height() - $window.scrollTop() - $menu.height() );
					if (newTop + $menu.height() >= $container.height() - $window.scrollTop()) {
						$menu.css('top', newTop);
					}	
				}
			}
			lastScroll = $window.scrollTop();
		}).trigger('scroll');
	}

	function destroy(element) {
		var settings = element.data('persistentNavigation');
		if (settings && settings.navId) {
			$(window).off('.' + settings.navId);
			element.css({'position': '', 'top': ''});
			$('#' + settings.navId).replaceWith(element.remove());
		}
	}
})(jQuery);