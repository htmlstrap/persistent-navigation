Persistent Navigation
=====================

jQuery plugin that scrolls a navigation or menu div until it is revealed, and keeps it visible while the main content scrolls normally

It's best used on a page with a large set of quick links, next to a long area of content. Visitors are able to scroll up or down the links without needing to travel back up to the top of the page. It also eliminates the need for a separate scroll bar on the menu.

	$('#menu').persistentNavigation();

The plugin wraps the selected element in a fixed-position div, maintaining its original position. When the window is scrolled, natural scrolling is emulated on the menu by shifting its absolute position. Once the menu reaches its bottom or its top, it remains fixed until the scroll direction changes.