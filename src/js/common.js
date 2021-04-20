(function (factory, jQuery, Zepto) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object' && typeof Meteor === 'undefined') {
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery || Zepto);
	}
}(function ($) {
	'use strict';

	$.fn.exists = function () {
		return this.length !== 0;
	};

	$(function () {
		var $milScrollBar = $('.mil-scroll-bar');
		var $offCanvas = $('.off-canvas');

		if ($offCanvas.exists()) {
			$offCanvas.css('visibility', 'visible')
		}

		if ($milScrollBar.exists()) {
			$milScrollBar.each(function () {
				new PerfectScrollbar(this, {
					wheelPropagation: false
				});
			});
		}
	});

	$(document).on('click', '.nav-sub-item > .nav-link', function (e) {
		var $this = $(this);
		var $navSubItem = $this.closest('.nav-sub-item');
		$navSubItem.toggleClass('active');

		e.preventDefault();
		e.stopPropagation();
		return false;
	});

	$(document).on('click', '.mil-offcanvas-btn', function (e) {
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

		e.preventDefault();
		e.stopPropagation();
		return false;
	});

	$(window).on('resize', function () {
		var $body = $(document.body);
		var $milOffCanvasBtn = $('.mil-offcanvas-btn');
		var $dataTarget = $($milOffCanvasBtn.attr('data-target') || null);

		if ($dataTarget.exists()) {
			if (window.outerWidth > 1200) {
				$dataTarget.addClass('show').css('visibility', 'visible');
			} else {
				$dataTarget.removeClass('show').css('visibility', 'hidden');
			}
			$body.removeClass('off-canvas-backdrop').css('overflow', 'auto');
		}

	});

}, window.jQuery, window.Zepto));
