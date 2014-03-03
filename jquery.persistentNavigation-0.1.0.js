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
			navId = 'nav_' + Math.floor( Math.random() * (new Date()).getTime() ),
			topOffset = $menu.offset().top,
			scrollHeight = $window.height() - topOffset;

		// wrap in fixed div, offset to starting position
		var $wrapper = $('<div id="' + navId + '"></div>').css({'position': 'fixed', 'top': topOffset});
		$menu.wrap($wrapper).css({'position': 'absolute', 'top': 0}).data('persistentNavigation', {navId: navId});

		var lastScroll = 0;
		// emulate natural scrolling until menu is fully revealed, then stop
		$window.on('scroll.' + navId, function() {
			if ($window.scrollTop() < lastScroll) { // going up
				if ( $menu.position().top < 0 ) {
					$menu.css('top', Math.min( $menu.position().top + lastScroll - $window.scrollTop(), 0) );
				}
			}
			else { // going down
				if ( $menu.height() + $menu.position().top > scrollHeight ) { // scroll
					$menu.css('top', Math.max( $menu.position().top + lastScroll - $window.scrollTop(), scrollHeight - $menu.height() ) );
				}
			}
			lastScroll = $window.scrollTop();
		}).trigger('scroll');

	}

	function destroy(element) {
		var settings = element.data('persistentNavigation');
		if (settings && settings.navId) {
			$(window).off('scroll.' + settings.navId);
			element.css({'position': '', 'top': ''});
			$('#' + settings.navId).replaceWith(element.remove());
		}
	}
})(jQuery);