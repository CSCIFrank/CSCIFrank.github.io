/*
	Massively by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$intro = $('intro'),
		// $header = $('#header'),
		$footer = $('#footer'),
		// $nav = $('#nav'),
		$main = $('#main'),
		$code = $('#codePost'),
		$code_articles = $code.children('article');

		// $navPanelToggle, $navPanel, $navPanelInner;

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				$bg = $('<div class="bg"></div>').appendTo($t),
				on, off;

			on = function() {

				$bg
					.removeClass('fixed')
					.css('transform', 'matrix(1,0,0,1,0,0)');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$bg.css('transform', 'matrix(1,0,0,1,0,' + (pos * intensity) + ')');

					});

			};

			off = function() {

				$bg
					.addClass('fixed')
					.css('transform', 'none');

				$window
					.off('scroll._parallax');

			};

			// Disable parallax on ..
				if (browser.name == 'ie'			// IE
				||	browser.name == 'edge'			// Edge
				||	window.devicePixelRatio > 1		// Retina/HiDPI (= poor performance)
				||	browser.mobile)					// Mobile devices
					off();

			// Enable everywhere else.
				else {

					breakpoints.on('>large', on);
					breakpoints.on('<=large', off);

				}

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	// Play initial animations on page load.
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Scrolly.
	$('.scrolly').scrolly();

	// Background.
	$wrapper._parallax(0.925);

	// Intro.
	var $intro = $('#intro');

	if ($intro.length > 0) {

		// Hack: Fix flex min-height on IE.
			if (browser.name == 'ie') {
				$window.on('resize.ie-intro-fix', function() {

					var h = $intro.height();

					if (h > $window.height())
						$intro.css('height', 'auto');
					else
						$intro.css('height', h);

				}).trigger('resize.ie-intro-fix');
			}

		// Hide intro on scroll (> small).
			breakpoints.on('>small', function() {

				$main.unscrollex();

				$main.scrollex({
					mode: 'bottom',
					top: '25vh',
					bottom: '-50vh',
					enter: function() {
						$intro.addClass('hidden');
					},
					leave: function() {
						$intro.removeClass('hidden');
					}
				});

			});

		// Hide intro on scroll (<= small).
			breakpoints.on('<=small', function() {

				$main.unscrollex();

				$main.scrollex({
					mode: 'middle',
					top: '15vh',
					bottom: '-15vh',
					enter: function() {
						$intro.addClass('hidden');
					},
					leave: function() {
						$intro.removeClass('hidden');
					}
				});

		});

	}

	// main.
		var	delay = 325,
		locked = false;
		var currentScroll = $window.scrollTop();
		// Methods.
			$code._show = function(id, initial) {
				var $article = $code_articles.filter('#' + id);
				// No such article? Bail.
					if ($article.length == 0)
						return;
					currentScroll = $window.scrollTop()
				// Handle lock.
					// Already locked? Speed through "show" steps w/o delays.
						if (locked || (typeof initial != 'undefined' && initial === true)) {
							// Mark as switching.
								$body.addClass('is-switching');
							// Mark as visible.
								$body.addClass('is-article-visible');
							// Deactivate all articles (just in case one's already active).
								$code_articles.removeClass('active');
							// Hide header, footer.
								$main.hide();
								$footer.hide();
								$intro.hide();
							// Show code, article.
								$code.show();
								$article.show();
							// Activate article.
								$article.addClass('active');
							// Unlock.
								locked = false;
							// Unmark as switching.
								setTimeout(function() {
									$body.removeClass('is-switching');
									//$window.scrollTop(scrollPosition);
									$window.scrollTop(0);
								}, (initial ? 1000 : 0));
							return;
						}
					// Lock.
						locked = true;
				// Article already visible? Just swap articles.
					if ($body.hasClass('is-article-visible')) {
						// Deactivate current article.
							var $currentArticle = $code_articles.filter('.active');
							$currentArticle.removeClass('active');
						// Show article.
							setTimeout(function() {
								// Hide current article.
									$currentArticle.hide();
								// Show article.
									$article.show();
								// Activate article.
									setTimeout(function() {
										$article.addClass('active');
										// Window stuff.
											$window
												.scrollTop(0)
												.triggerHandler('resize.flexbox-fix');
										// Unlock.
											setTimeout(function() {
												locked = false;
											}, delay);
									}, 25);
							}, delay);
					}
				// Otherwise, handle as normal.
					else {
						// Mark as visible.
						$body.addClass('is-article-visible');
						// Show article.
						setTimeout(function() {
							// Hide header, footer.
							$main.hide();
							// $header.hide();
							$footer.hide();
							$intro.hide();
							// Show code, article.
							$code.show();
							$article.show();
							// Activate article.
							setTimeout(function() {
								$article.addClass('active');
								// Window stuff.
									$window
										.scrollTop(0)
										.triggerHandler('resize.flexbox-fix');
								// Unlock.
								setTimeout(function() {
									locked = false;
								}, delay);
							}, 25);
						}, delay);
					}
			};

			$code._hide = function(addState) {
				var $article = $code_articles.filter('.active');
				// Article not visible? Bail.
					if (!$body.hasClass('is-article-visible'))
						return;
					// $scrollLoc = $window.scrollTop();
				// Add state?
					if (typeof addState != 'undefined'
					&&	addState === true)
						history.pushState(null, null, '#');
				// Handle lock.
					// Already locked? Speed through "hide" steps w/o delays.
						if (locked) {
							// Mark as switching.
								$body.addClass('is-switching');
							// Deactivate article.
								$article.removeClass('active');
							// Hide article, code.
								$article.hide();
								$code.hide();
							// Show footer, header.
								$main.show();
								$footer.show();
								$intro.show();
								// $header.show();
							// Unmark as visible.
								$body.removeClass('is-article-visible');
							// Unlock.
								locked = false;
							// Unmark as switching.
								$body.removeClass('is-switching');
							// Window stuff.
								$window
									.scrollTop(currentScroll)
									.triggerHandler('resize.flexbox-fix');
							return;
						}
					// Lock.
						locked = true;
				// Deactivate article.
					$article.removeClass('active');
				// Hide article.
					setTimeout(function() {
						// Hide article, code.
							$article.hide();
							$code.hide();
						// Show footer, header.
							$main.show();
							$footer.show();
							$intro.show();
							// $header.show();
						// Unmark as visible.
							setTimeout(function() {
								$body.removeClass('is-article-visible');
								// Window stuff.
									$window
										.scrollTop(currentScroll)
										.triggerHandler('resize.flexbox-fix');
								// Unlock.
									setTimeout(function() {
										locked = false;
									}, delay);
							}, 25);
					}, delay);
			};

		// Articles.
			$code_articles.each(function() {
				var $this = $(this);
				// Close.
					$('<div class="close">Close</div>')
						.appendTo($this)
						.on('click', function() {
							location.hash = '';
						});
				// Prevent clicks from inside article from bubbling.
					$this.on('click', function(event) {
						event.stopPropagation();
					});
			});

		// Events.
			$body.on('click', function(event) {
				// Article visible? Hide.
					if ($body.hasClass('is-article-visible'))
						$code._hide(true);
			});

			$window.on('keyup', function(event) {
				switch (event.keyCode) {
					case 27:
						// Article visible? Hide.
							if ($body.hasClass('is-article-visible'))
								$code._hide(true);
						break;
					default:
						break;
				}
			});

			$window.on('hashchange', function(event) {
				// Empty hash?
					if (location.hash == ''
					||	location.hash == '#') {
						// Prevent default.
							event.preventDefault();
							event.stopPropagation();
						// Hide.
							$code._hide();
					}

				// Otherwise, check for a matching article.
					else if ($code_articles.filter(location.hash).length > 0) {
						// Prevent default.
							event.preventDefault();
							event.stopPropagation();
						// Show article.
							$code._show(location.hash.substr(1));
					}
			});

		// Scroll restoration.
		// This prevents the page from scrolling back to the top on a hashchange.
			if ('scrollRestoration' in history)
				history.scrollRestoration = 'manual';
			else {
				var	oldScrollPos = 0,
					scrollPos = 0,
					$htmlbody = $('html,body');
				$window
					.on('scroll', function() {
						oldScrollPos = scrollPos;
						scrollPos = $htmlbody.scrollTop();
					})
					.on('hashchange', function() {
						$window.scrollTop(oldScrollPos);
					});
			}

		// Initialize.

			// Hide code, articles.
				$code.hide();
				$code_articles.hide();
				

			// Initial article.
				if (location.hash != ''
				&&	location.hash != '#')
					$window.on('load', function() {
						$code._show(location.hash.substr(1), true);
					});

})(jQuery);