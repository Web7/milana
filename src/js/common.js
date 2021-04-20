(function (factory, jQuery, Zepto) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object' && typeof Meteor === 'undefined') {
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery || Zepto);
	}
}(function($){
	'use strict';

	$.fn.exists = function () {
		return this.length !== 0;
	};

	$(function(){
		var $milScrollBar = $('.mil-scroll-bar');
		var $offCanvas = $('.off-canvas');

		if ($offCanvas.exists()) {
			$offCanvas.css('visibility', 'visible')
		}

		if ($milScrollBar.exists()) {
			$milScrollBar.each(function(){
				new PerfectScrollbar(this);
			});
		}

		new bootstrap.Offcanvas()._getConfig({});
	});

	$(document).on('click', '.mil-offcanvas-btn', function() {
		var $this = $(this);
		var $dataTarget = $($this.attr('data-target') || null);
		if (!$dataTarget.exists()) {
			return;
		}
		if (window.outerWidth > 1200) {
			return;
		}
		$dataTarget.toggleClass('show').css('visibility', $dataTarget[0].style.visibility === 'hidden' ? 'visible' : 'hidden');
		$(document.body).toggleClass('off-canvas-backdrop').css('overflow', $dataTarget[0].style.visibility === 'hidden' ? 'auto' : 'hidden');
	});

}, window.jQuery, window.Zepto));
