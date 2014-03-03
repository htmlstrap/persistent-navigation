/*! jQuery Persistent Navigation 0.1.0
 *  Copyright (c) 2014 Jody Zeitler
 *  Licensed under the MIT license.
 *  http://en.wikipedia.org/wiki/MIT_License
 */
(function($) {
	$.fn.persistentNavigation = function(method) {
		return this.each(function() {
			switch (method) {
				case 'update':
					update($(this));
					break;
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
			settings = {
				navId: 'nav_' + Math.floor( Math.random() * (new Date()).getTime() ),
				topOffset: $menu.offset().top,
				scrollHeight: $window.height() - $menu.offset().top
			}

		// wrap in fixed div, offset to starting position
		var $wrapper = $('<div id="' + settings.navId + '"></div>').css({'position': 'fixed', 'top': settings.topOffset});
		$menu.wrap($wrapper).css({'position': 'absolute', 'top': 0}).data('persistentNavigation', settings);

		var lastScroll = 0;
		// emulate natural scrolling until menu is fully revealed, then stop
		$window.on('scroll.' + settings.navId, function() {
			if ($window.scrollTop() < lastScroll) { // going up
				if ( $menu.position().top < 0 ) {
					$menu.css('top', Math.min( $menu.position().top + lastScroll - $window.scrollTop(), 0) );
				}
			}
			else { // going down
				if ( $menu.height() + $menu.position().top > settings.scrollHeight ) { // scroll
					$menu.css('top', Math.max( $menu.position().top + lastScroll - $window.scrollTop(), settings.scrollHeight - $menu.height() ) );
				}
			}
			lastScroll = $window.scrollTop();
		}).trigger('scroll');

		$window.on('resize.' + settings.navId, function() { update(element) });
	}

	function update(element) {
		var settings = element.data('persistentNavigation');
		settings.scrollHeight = $(window).height() - settings.topOffset;
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