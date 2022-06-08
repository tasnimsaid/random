function download(e, t, i) {
	var n = document.createElement("a");
	i = i || "application/octet-stream", navigator.msSaveBlob ? navigator.msSaveBlob(new Blob([e], {
		type: i
	}), t) : URL && "download" in n ? (n.href = URL.createObjectURL(new Blob([e], {
		type: i
	})), n.setAttribute("download", t), document.body.appendChild(n), n.click(), document.body.removeChild(n)) : location.href = "data:application/octet-stream," + encodeURIComponent(e)
}

function copyToClipboard(e) {
	var t = $("<textarea>");
	$("body").append(t), t.val(e).select(), document.execCommand("copy"), t.remove()
}

function zoomImg(e) {
	$("#md-zom-img").show(), $("#md-zom-img img").attr("src", e.src), $("#md-zom-img img").attr("alt", e.alt), $("#md-zom-img #caption").html(e.alt)
}! function(e, t) {
	"object" == typeof exports && "undefined" != typeof module ? t(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], t) : t((e = e || self).bootstrap = {}, e.jQuery, e.Popper)
}(this, function(e, t, i) {
	"use strict";

	function n(e, t) {
		for(var i = 0; i < t.length; i++) {
			var n = t[i];
			n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
		}
	}

	function s(e, t, i) {
		return t && n(e.prototype, t), i && n(e, i), e
	}

	function r(e) {
		for(var t = 1; t < arguments.length; t++) {
			var i = null != arguments[t] ? arguments[t] : {},
				n = Object.keys(i);
			"function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(i).filter(function(e) {
				return Object.getOwnPropertyDescriptor(i, e).enumerable
			}))), n.forEach(function(t) {
				var n, s, r;
				n = e, r = i[s = t], s in n ? Object.defineProperty(n, s, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : n[s] = r
			})
		}
		return e
	}
	t = t && t.hasOwnProperty("default") ? t.default : t, i = i && i.hasOwnProperty("default") ? i.default : i;
	var o = "transitionend";
	var a = {
		TRANSITION_END: "bsTransitionEnd",
		getUID: function(e) {
			for(; e += ~~(1e6 * Math.random()), document.getElementById(e););
			return e
		},
		getSelectorFromElement: function(e) {
			var t = e.getAttribute("data-target");
			if(!t || "#" === t) {
				var i = e.getAttribute("href");
				t = i && "#" !== i ? i.trim() : ""
			}
			try {
				return document.querySelector(t) ? t : null
			} catch(e) {
				return null
			}
		},
		getTransitionDurationFromElement: function(e) {
			if(!e) return 0;
			var i = t(e).css("transition-duration"),
				n = t(e).css("transition-delay"),
				s = parseFloat(i),
				r = parseFloat(n);
			return s || r ? (i = i.split(",")[0], n = n.split(",")[0], 1e3 * (parseFloat(i) + parseFloat(n))) : 0
		},
		reflow: function(e) {
			return e.offsetHeight
		},
		triggerTransitionEnd: function(e) {
			t(e).trigger(o)
		},
		supportsTransitionEnd: function() {
			return Boolean(o)
		},
		isElement: function(e) {
			return(e[0] || e).nodeType
		},
		typeCheckConfig: function(e, t, i) {
			for(var n in i)
				if(Object.prototype.hasOwnProperty.call(i, n)) {
					var s = i[n],
						r = t[n],
						o = r && a.isElement(r) ? "element" : (l = r, {}.toString.call(l).match(/\s([a-z]+)/i)[1].toLowerCase());
					if(!new RegExp(s).test(o)) throw new Error(e.toUpperCase() + ': Option "' + n + '" provided type "' + o + '" but expected type "' + s + '".')
				}
			var l
		},
		findShadowRoot: function(e) {
			if(!document.documentElement.attachShadow) return null;
			if("function" != typeof e.getRootNode) return e instanceof ShadowRoot ? e : e.parentNode ? a.findShadowRoot(e.parentNode) : null;
			var t = e.getRootNode();
			return t instanceof ShadowRoot ? t : null
		}
	};
	t.fn.emulateTransitionEnd = function(e) {
		var i = this,
			n = !1;
		return t(this).one(a.TRANSITION_END, function() {
			n = !0
		}), setTimeout(function() {
			n || a.triggerTransitionEnd(i)
		}, e), this
	}, t.event.special[a.TRANSITION_END] = {
		bindType: o,
		delegateType: o,
		handle: function(e) {
			if(t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
		}
	};
	var l = "alert",
		c = "bs.alert",
		u = "." + c,
		h = t.fn[l],
		d = {
			CLOSE: "close" + u,
			CLOSED: "closed" + u,
			CLICK_DATA_API: "click" + u + ".data-api"
		},
		f = function() {
			function e(e) {
				this._element = e
			}
			var i = e.prototype;
			return i.close = function(e) {
				var t = this._element;
				e && (t = this._getRootElement(e)), this._triggerCloseEvent(t).isDefaultPrevented() || this._removeElement(t)
			}, i.dispose = function() {
				t.removeData(this._element, c), this._element = null
			}, i._getRootElement = function(e) {
				var i = a.getSelectorFromElement(e),
					n = !1;
				return i && (n = document.querySelector(i)), n || (n = t(e).closest(".alert")[0]), n
			}, i._triggerCloseEvent = function(e) {
				var i = t.Event(d.CLOSE);
				return t(e).trigger(i), i
			}, i._removeElement = function(e) {
				var i = this;
				if(t(e).removeClass("show"), t(e).hasClass("fade")) {
					var n = a.getTransitionDurationFromElement(e);
					t(e).one(a.TRANSITION_END, function(t) {
						return i._destroyElement(e, t)
					}).emulateTransitionEnd(n)
				} else this._destroyElement(e)
			}, i._destroyElement = function(e) {
				t(e).detach().trigger(d.CLOSED).remove()
			}, e._jQueryInterface = function(i) {
				return this.each(function() {
					var n = t(this),
						s = n.data(c);
					s || (s = new e(this), n.data(c, s)), "close" === i && s[i](this)
				})
			}, e._handleDismiss = function(e) {
				return function(t) {
					t && t.preventDefault(), e.close(this)
				}
			}, s(e, null, [{
				key: "VERSION",
				get: function() {
					return "4.3.1"
				}
			}]), e
		}();
	t(document).on(d.CLICK_DATA_API, '[data-dismiss="alert"]', f._handleDismiss(new f)), t.fn[l] = f._jQueryInterface, t.fn[l].Constructor = f, t.fn[l].noConflict = function() {
		return t.fn[l] = h, f._jQueryInterface
	};
	var p = "button",
		m = "bs.button",
		g = "." + m,
		_ = ".data-api",
		v = t.fn[p],
		b = "active",
		E = '[data-toggle^="button"]',
		y = ".btn",
		S = {
			CLICK_DATA_API: "click" + g + _,
			FOCUS_BLUR_DATA_API: "focus" + g + _ + " blur" + g + _
		},
		T = function() {
			function e(e) {
				this._element = e
			}
			var i = e.prototype;
			return i.toggle = function() {
				var e = !0,
					i = !0,
					n = t(this._element).closest('[data-toggle="buttons"]')[0];
				if(n) {
					var s = this._element.querySelector('input:not([type="hidden"])');
					if(s) {
						if("radio" === s.type)
							if(s.checked && this._element.classList.contains(b)) e = !1;
							else {
								var r = n.querySelector(".active");
								r && t(r).removeClass(b)
							}
						if(e) {
							if(s.hasAttribute("disabled") || n.hasAttribute("disabled") || s.classList.contains("disabled") || n.classList.contains("disabled")) return;
							s.checked = !this._element.classList.contains(b), t(s).trigger("change")
						}
						s.focus(), i = !1
					}
				}
				i && this._element.setAttribute("aria-pressed", !this._element.classList.contains(b)), e && t(this._element).toggleClass(b)
			}, i.dispose = function() {
				t.removeData(this._element, m), this._element = null
			}, e._jQueryInterface = function(i) {
				return this.each(function() {
					var n = t(this).data(m);
					n || (n = new e(this), t(this).data(m, n)), "toggle" === i && n[i]()
				})
			}, s(e, null, [{
				key: "VERSION",
				get: function() {
					return "4.3.1"
				}
			}]), e
		}();
	t(document).on(S.CLICK_DATA_API, E, function(e) {
		e.preventDefault();
		var i = e.target;
		t(i).hasClass("btn") || (i = t(i).closest(y)), T._jQueryInterface.call(t(i), "toggle")
	}).on(S.FOCUS_BLUR_DATA_API, E, function(e) {
		var i = t(e.target).closest(y)[0];
		t(i).toggleClass("focus", /^focus(in)?$/.test(e.type))
	}), t.fn[p] = T._jQueryInterface, t.fn[p].Constructor = T, t.fn[p].noConflict = function() {
		return t.fn[p] = v, T._jQueryInterface
	};
	var A = "carousel",
		w = "bs.carousel",
		I = "." + w,
		C = ".data-api",
		N = t.fn[A],
		O = {
			interval: 5e3,
			keyboard: !0,
			slide: !1,
			pause: "hover",
			wrap: !0,
			touch: !0
		},
		D = {
			interval: "(number|boolean)",
			keyboard: "boolean",
			slide: "(boolean|string)",
			pause: "(string|boolean)",
			wrap: "boolean",
			touch: "boolean"
		},
		k = "next",
		P = "prev",
		R = {
			SLIDE: "slide" + I,
			SLID: "slid" + I,
			KEYDOWN: "keydown" + I,
			MOUSEENTER: "mouseenter" + I,
			MOUSELEAVE: "mouseleave" + I,
			TOUCHSTART: "touchstart" + I,
			TOUCHMOVE: "touchmove" + I,
			TOUCHEND: "touchend" + I,
			POINTERDOWN: "pointerdown" + I,
			POINTERUP: "pointerup" + I,
			DRAG_START: "dragstart" + I,
			LOAD_DATA_API: "load" + I + C,
			CLICK_DATA_API: "click" + I + C
		},
		x = "active",
		L = ".active.carousel-item",
		M = ".carousel-indicators",
		F = {
			TOUCH: "touch",
			PEN: "pen"
		},
		$ = function() {
			function e(e, t) {
				this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(t), this._element = e, this._indicatorsElement = this._element.querySelector(M), this._touchSupported = "ontouchstart" in document.documentElement || 0 < navigator.maxTouchPoints, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners()
			}
			var i = e.prototype;
			return i.next = function() {
				this._isSliding || this._slide(k)
			}, i.nextWhenVisible = function() {
				!document.hidden && t(this._element).is(":visible") && "hidden" !== t(this._element).css("visibility") && this.next()
			}, i.prev = function() {
				this._isSliding || this._slide(P)
			}, i.pause = function(e) {
				e || (this._isPaused = !0), this._element.querySelector(".carousel-item-next, .carousel-item-prev") && (a.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
			}, i.cycle = function(e) {
				e || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
			}, i.to = function(e) {
				var i = this;
				this._activeElement = this._element.querySelector(L);
				var n = this._getItemIndex(this._activeElement);
				if(!(e > this._items.length - 1 || e < 0))
					if(this._isSliding) t(this._element).one(R.SLID, function() {
						return i.to(e)
					});
					else {
						if(n === e) return this.pause(), void this.cycle();
						var s = n < e ? k : P;
						this._slide(s, this._items[e])
					}
			}, i.dispose = function() {
				t(this._element).off(I), t.removeData(this._element, w), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
			}, i._getConfig = function(e) {
				return e = r({}, O, e), a.typeCheckConfig(A, e, D), e
			}, i._handleSwipe = function() {
				var e = Math.abs(this.touchDeltaX);
				if(!(e <= 40)) {
					var t = e / this.touchDeltaX;
					0 < t && this.prev(), t < 0 && this.next()
				}
			}, i._addEventListeners = function() {
				var e = this;
				this._config.keyboard && t(this._element).on(R.KEYDOWN, function(t) {
					return e._keydown(t)
				}), "hover" === this._config.pause && t(this._element).on(R.MOUSEENTER, function(t) {
					return e.pause(t)
				}).on(R.MOUSELEAVE, function(t) {
					return e.cycle(t)
				}), this._config.touch && this._addTouchEventListeners()
			}, i._addTouchEventListeners = function() {
				var e = this;
				if(this._touchSupported) {
					var i = function(t) {
							e._pointerEvent && F[t.originalEvent.pointerType.toUpperCase()] ? e.touchStartX = t.originalEvent.clientX : e._pointerEvent || (e.touchStartX = t.originalEvent.touches[0].clientX)
						},
						n = function(t) {
							e._pointerEvent && F[t.originalEvent.pointerType.toUpperCase()] && (e.touchDeltaX = t.originalEvent.clientX - e.touchStartX), e._handleSwipe(), "hover" === e._config.pause && (e.pause(), e.touchTimeout && clearTimeout(e.touchTimeout), e.touchTimeout = setTimeout(function(t) {
								return e.cycle(t)
							}, 500 + e._config.interval))
						};
					t(this._element.querySelectorAll(".carousel-item img")).on(R.DRAG_START, function(e) {
						return e.preventDefault()
					}), this._pointerEvent ? (t(this._element).on(R.POINTERDOWN, function(e) {
						return i(e)
					}), t(this._element).on(R.POINTERUP, function(e) {
						return n(e)
					}), this._element.classList.add("pointer-event")) : (t(this._element).on(R.TOUCHSTART, function(e) {
						return i(e)
					}), t(this._element).on(R.TOUCHMOVE, function(t) {
						var i;
						(i = t).originalEvent.touches && 1 < i.originalEvent.touches.length ? e.touchDeltaX = 0 : e.touchDeltaX = i.originalEvent.touches[0].clientX - e.touchStartX
					}), t(this._element).on(R.TOUCHEND, function(e) {
						return n(e)
					}))
				}
			}, i._keydown = function(e) {
				if(!/input|textarea/i.test(e.target.tagName)) switch(e.which) {
					case 37:
						e.preventDefault(), this.prev();
						break;
					case 39:
						e.preventDefault(), this.next()
				}
			}, i._getItemIndex = function(e) {
				return this._items = e && e.parentNode ? [].slice.call(e.parentNode.querySelectorAll(".carousel-item")) : [], this._items.indexOf(e)
			}, i._getItemByDirection = function(e, t) {
				var i = e === k,
					n = e === P,
					s = this._getItemIndex(t),
					r = this._items.length - 1;
				if((n && 0 === s || i && s === r) && !this._config.wrap) return t;
				var o = (s + (e === P ? -1 : 1)) % this._items.length;
				return -1 === o ? this._items[this._items.length - 1] : this._items[o]
			}, i._triggerSlideEvent = function(e, i) {
				var n = this._getItemIndex(e),
					s = this._getItemIndex(this._element.querySelector(L)),
					r = t.Event(R.SLIDE, {
						relatedTarget: e,
						direction: i,
						from: s,
						to: n
					});
				return t(this._element).trigger(r), r
			}, i._setActiveIndicatorElement = function(e) {
				if(this._indicatorsElement) {
					var i = [].slice.call(this._indicatorsElement.querySelectorAll(".active"));
					t(i).removeClass(x);
					var n = this._indicatorsElement.children[this._getItemIndex(e)];
					n && t(n).addClass(x)
				}
			}, i._slide = function(e, i) {
				var n, s, r, o = this,
					l = this._element.querySelector(L),
					c = this._getItemIndex(l),
					u = i || l && this._getItemByDirection(e, l),
					h = this._getItemIndex(u),
					d = Boolean(this._interval);
				if(r = e === k ? (n = "carousel-item-left", s = "carousel-item-next", "left") : (n = "carousel-item-right", s = "carousel-item-prev", "right"), u && t(u).hasClass(x)) this._isSliding = !1;
				else if(!this._triggerSlideEvent(u, r).isDefaultPrevented() && l && u) {
					this._isSliding = !0, d && this.pause(), this._setActiveIndicatorElement(u);
					var f = t.Event(R.SLID, {
						relatedTarget: u,
						direction: r,
						from: c,
						to: h
					});
					if(t(this._element).hasClass("slide")) {
						t(u).addClass(s), a.reflow(u), t(l).addClass(n), t(u).addClass(n);
						var p = parseInt(u.getAttribute("data-interval"), 10);
						this._config.interval = p ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, p) : this._config.defaultInterval || this._config.interval;
						var m = a.getTransitionDurationFromElement(l);
						t(l).one(a.TRANSITION_END, function() {
							t(u).removeClass(n + " " + s).addClass(x), t(l).removeClass(x + " " + s + " " + n), o._isSliding = !1, setTimeout(function() {
								return t(o._element).trigger(f)
							}, 0)
						}).emulateTransitionEnd(m)
					} else t(l).removeClass(x), t(u).addClass(x), this._isSliding = !1, t(this._element).trigger(f);
					d && this.cycle()
				}
			}, e._jQueryInterface = function(i) {
				return this.each(function() {
					var n = t(this).data(w),
						s = r({}, O, t(this).data());
					"object" == typeof i && (s = r({}, s, i));
					var o = "string" == typeof i ? i : s.slide;
					if(n || (n = new e(this, s), t(this).data(w, n)), "number" == typeof i) n.to(i);
					else if("string" == typeof o) {
						if(void 0 === n[o]) throw new TypeError('No method named "' + o + '"');
						n[o]()
					} else s.interval && s.ride && (n.pause(), n.cycle())
				})
			}, e._dataApiClickHandler = function(i) {
				var n = a.getSelectorFromElement(this);
				if(n) {
					var s = t(n)[0];
					if(s && t(s).hasClass("carousel")) {
						var o = r({}, t(s).data(), t(this).data()),
							l = this.getAttribute("data-slide-to");
						l && (o.interval = !1), e._jQueryInterface.call(t(s), o), l && t(s).data(w).to(l), i.preventDefault()
					}
				}
			}, s(e, null, [{
				key: "VERSION",
				get: function() {
					return "4.3.1"
				}
			}, {
				key: "Default",
				get: function() {
					return O
				}
			}]), e
		}();
	t(document).on(R.CLICK_DATA_API, "[data-slide], [data-slide-to]", $._dataApiClickHandler), t(window).on(R.LOAD_DATA_API, function() {
		for(var e = [].slice.call(document.querySelectorAll('[data-ride="carousel"]')), i = 0, n = e.length; i < n; i++) {
			var s = t(e[i]);
			$._jQueryInterface.call(s, s.data())
		}
	}), t.fn[A] = $._jQueryInterface, t.fn[A].Constructor = $, t.fn[A].noConflict = function() {
		return t.fn[A] = N, $._jQueryInterface
	};
	var U = "collapse",
		H = "bs.collapse",
		B = "." + H,
		j = t.fn[U],
		z = {
			toggle: !0,
			parent: ""
		},
		W = {
			toggle: "boolean",
			parent: "(string|element)"
		},
		q = {
			SHOW: "show" + B,
			SHOWN: "shown" + B,
			HIDE: "hide" + B,
			HIDDEN: "hidden" + B,
			CLICK_DATA_API: "click" + B + ".data-api"
		},
		Y = "show",
		G = "collapse",
		K = "collapsing",
		V = "collapsed",
		Q = '[data-toggle="collapse"]',
		X = function() {
			function e(e, t) {
				this._isTransitioning = !1, this._element = e, this._config = this._getConfig(t), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
				for(var i = [].slice.call(document.querySelectorAll(Q)), n = 0, s = i.length; n < s; n++) {
					var r = i[n],
						o = a.getSelectorFromElement(r),
						l = [].slice.call(document.querySelectorAll(o)).filter(function(t) {
							return t === e
						});
					null !== o && 0 < l.length && (this._selector = o, this._triggerArray.push(r))
				}
				this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
			}
			var i = e.prototype;
			return i.toggle = function() {
				t(this._element).hasClass(Y) ? this.hide() : this.show()
			}, i.show = function() {
				var i, n, s = this;
				if(!(this._isTransitioning || t(this._element).hasClass(Y) || (this._parent && 0 === (i = [].slice.call(this._parent.querySelectorAll(".show, .collapsing")).filter(function(e) {
						return "string" == typeof s._config.parent ? e.getAttribute("data-parent") === s._config.parent : e.classList.contains(G)
					})).length && (i = null), i && (n = t(i).not(this._selector).data(H)) && n._isTransitioning))) {
					var r = t.Event(q.SHOW);
					if(t(this._element).trigger(r), !r.isDefaultPrevented()) {
						i && (e._jQueryInterface.call(t(i).not(this._selector), "hide"), n || t(i).data(H, null));
						var o = this._getDimension();
						t(this._element).removeClass(G).addClass(K), this._element.style[o] = 0, this._triggerArray.length && t(this._triggerArray).removeClass(V).attr("aria-expanded", !0), this.setTransitioning(!0);
						var l = "scroll" + (o[0].toUpperCase() + o.slice(1)),
							c = a.getTransitionDurationFromElement(this._element);
						t(this._element).one(a.TRANSITION_END, function() {
							t(s._element).removeClass(K).addClass(G).addClass(Y), s._element.style[o] = "", s.setTransitioning(!1), t(s._element).trigger(q.SHOWN)
						}).emulateTransitionEnd(c), this._element.style[o] = this._element[l] + "px"
					}
				}
			}, i.hide = function() {
				var e = this;
				if(!this._isTransitioning && t(this._element).hasClass(Y)) {
					var i = t.Event(q.HIDE);
					if(t(this._element).trigger(i), !i.isDefaultPrevented()) {
						var n = this._getDimension();
						this._element.style[n] = this._element.getBoundingClientRect()[n] + "px", a.reflow(this._element), t(this._element).addClass(K).removeClass(G).removeClass(Y);
						var s = this._triggerArray.length;
						if(0 < s)
							for(var r = 0; r < s; r++) {
								var o = this._triggerArray[r],
									l = a.getSelectorFromElement(o);
								null !== l && (t([].slice.call(document.querySelectorAll(l))).hasClass(Y) || t(o).addClass(V).attr("aria-expanded", !1))
							}
						this.setTransitioning(!0), this._element.style[n] = "";
						var c = a.getTransitionDurationFromElement(this._element);
						t(this._element).one(a.TRANSITION_END, function() {
							e.setTransitioning(!1), t(e._element).removeClass(K).addClass(G).trigger(q.HIDDEN)
						}).emulateTransitionEnd(c)
					}
				}
			}, i.setTransitioning = function(e) {
				this._isTransitioning = e
			}, i.dispose = function() {
				t.removeData(this._element, H), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
			}, i._getConfig = function(e) {
				return(e = r({}, z, e)).toggle = Boolean(e.toggle), a.typeCheckConfig(U, e, W), e
			}, i._getDimension = function() {
				return t(this._element).hasClass("width") ? "width" : "height"
			}, i._getParent = function() {
				var i, n = this;
				a.isElement(this._config.parent) ? (i = this._config.parent, void 0 !== this._config.parent.jquery && (i = this._config.parent[0])) : i = document.querySelector(this._config.parent);
				var s = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
					r = [].slice.call(i.querySelectorAll(s));
				return t(r).each(function(t, i) {
					n._addAriaAndCollapsedClass(e._getTargetFromElement(i), [i])
				}), i
			}, i._addAriaAndCollapsedClass = function(e, i) {
				var n = t(e).hasClass(Y);
				i.length && t(i).toggleClass(V, !n).attr("aria-expanded", n)
			}, e._getTargetFromElement = function(e) {
				var t = a.getSelectorFromElement(e);
				return t ? document.querySelector(t) : null
			}, e._jQueryInterface = function(i) {
				return this.each(function() {
					var n = t(this),
						s = n.data(H),
						o = r({}, z, n.data(), "object" == typeof i && i ? i : {});
					if(!s && o.toggle && /show|hide/.test(i) && (o.toggle = !1), s || (s = new e(this, o), n.data(H, s)), "string" == typeof i) {
						if(void 0 === s[i]) throw new TypeError('No method named "' + i + '"');
						s[i]()
					}
				})
			}, s(e, null, [{
				key: "VERSION",
				get: function() {
					return "4.3.1"
				}
			}, {
				key: "Default",
				get: function() {
					return z
				}
			}]), e
		}();
	t(document).on(q.CLICK_DATA_API, Q, function(e) {
		"A" === e.currentTarget.tagName && e.preventDefault();
		var i = t(this),
			n = a.getSelectorFromElement(this),
			s = [].slice.call(document.querySelectorAll(n));
		t(s).each(function() {
			var e = t(this),
				n = e.data(H) ? "toggle" : i.data();
			X._jQueryInterface.call(e, n)
		})
	}), t.fn[U] = X._jQueryInterface, t.fn[U].Constructor = X, t.fn[U].noConflict = function() {
		return t.fn[U] = j, X._jQueryInterface
	};
	var Z = "dropdown",
		J = "bs.dropdown",
		ee = "." + J,
		te = ".data-api",
		ie = t.fn[Z],
		ne = new RegExp("38|40|27"),
		se = {
			HIDE: "hide" + ee,
			HIDDEN: "hidden" + ee,
			SHOW: "show" + ee,
			SHOWN: "shown" + ee,
			CLICK: "click" + ee,
			CLICK_DATA_API: "click" + ee + te,
			KEYDOWN_DATA_API: "keydown" + ee + te,
			KEYUP_DATA_API: "keyup" + ee + te
		},
		re = "disabled",
		oe = "show",
		ae = "dropdown-menu-right",
		le = '[data-toggle="dropdown"]',
		ce = ".dropdown-menu",
		ue = {
			offset: 0,
			flip: !0,
			boundary: "scrollParent",
			reference: "toggle",
			display: "dynamic"
		},
		he = {
			offset: "(number|string|function)",
			flip: "boolean",
			boundary: "(string|element)",
			reference: "(string|element)",
			display: "string"
		},
		de = function() {
			function e(e, t) {
				this._element = e, this._popper = null, this._config = this._getConfig(t), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
			}
			var n = e.prototype;
			return n.toggle = function() {
				if(!this._element.disabled && !t(this._element).hasClass(re)) {
					var n = e._getParentFromElement(this._element),
						s = t(this._menu).hasClass(oe);
					if(e._clearMenus(), !s) {
						var r = {
								relatedTarget: this._element
							},
							o = t.Event(se.SHOW, r);
						if(t(n).trigger(o), !o.isDefaultPrevented()) {
							if(!this._inNavbar) {
								if(void 0 === i) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
								var l = this._element;
								"parent" === this._config.reference ? l = n : a.isElement(this._config.reference) && (l = this._config.reference, void 0 !== this._config.reference.jquery && (l = this._config.reference[0])), "scrollParent" !== this._config.boundary && t(n).addClass("position-static"), this._popper = new i(l, this._menu, this._getPopperConfig())
							}
							"ontouchstart" in document.documentElement && 0 === t(n).closest(".navbar-nav").length && t(document.body).children().on("mouseover", null, t.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), t(this._menu).toggleClass(oe), t(n).toggleClass(oe).trigger(t.Event(se.SHOWN, r))
						}
					}
				}
			}, n.show = function() {
				if(!(this._element.disabled || t(this._element).hasClass(re) || t(this._menu).hasClass(oe))) {
					var i = {
							relatedTarget: this._element
						},
						n = t.Event(se.SHOW, i),
						s = e._getParentFromElement(this._element);
					t(s).trigger(n), n.isDefaultPrevented() || (t(this._menu).toggleClass(oe), t(s).toggleClass(oe).trigger(t.Event(se.SHOWN, i)))
				}
			}, n.hide = function() {
				if(!this._element.disabled && !t(this._element).hasClass(re) && t(this._menu).hasClass(oe)) {
					var i = {
							relatedTarget: this._element
						},
						n = t.Event(se.HIDE, i),
						s = e._getParentFromElement(this._element);
					t(s).trigger(n), n.isDefaultPrevented() || (t(this._menu).toggleClass(oe), t(s).toggleClass(oe).trigger(t.Event(se.HIDDEN, i)))
				}
			}, n.dispose = function() {
				t.removeData(this._element, J), t(this._element).off(ee), this._element = null, (this._menu = null) !== this._popper && (this._popper.destroy(), this._popper = null)
			}, n.update = function() {
				this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
			}, n._addEventListeners = function() {
				var e = this;
				t(this._element).on(se.CLICK, function(t) {
					t.preventDefault(), t.stopPropagation(), e.toggle()
				})
			}, n._getConfig = function(e) {
				return e = r({}, this.constructor.Default, t(this._element).data(), e), a.typeCheckConfig(Z, e, this.constructor.DefaultType), e
			}, n._getMenuElement = function() {
				if(!this._menu) {
					var t = e._getParentFromElement(this._element);
					t && (this._menu = t.querySelector(ce))
				}
				return this._menu
			}, n._getPlacement = function() {
				var e = t(this._element.parentNode),
					i = "bottom-start";
				return e.hasClass("dropup") ? (i = "top-start", t(this._menu).hasClass(ae) && (i = "top-end")) : e.hasClass("dropright") ? i = "right-start" : e.hasClass("dropleft") ? i = "left-start" : t(this._menu).hasClass(ae) && (i = "bottom-end"), i
			}, n._detectNavbar = function() {
				return 0 < t(this._element).closest(".navbar").length
			}, n._getOffset = function() {
				var e = this,
					t = {};
				return "function" == typeof this._config.offset ? t.fn = function(t) {
					return t.offsets = r({}, t.offsets, e._config.offset(t.offsets, e._element) || {}), t
				} : t.offset = this._config.offset, t
			}, n._getPopperConfig = function() {
				var e = {
					placement: this._getPlacement(),
					modifiers: {
						offset: this._getOffset(),
						flip: {
							enabled: this._config.flip
						},
						preventOverflow: {
							boundariesElement: this._config.boundary
						}
					}
				};
				return "static" === this._config.display && (e.modifiers.applyStyle = {
					enabled: !1
				}), e
			}, e._jQueryInterface = function(i) {
				return this.each(function() {
					var n = t(this).data(J);
					if(n || (n = new e(this, "object" == typeof i ? i : null), t(this).data(J, n)), "string" == typeof i) {
						if(void 0 === n[i]) throw new TypeError('No method named "' + i + '"');
						n[i]()
					}
				})
			}, e._clearMenus = function(i) {
				if(!i || 3 !== i.which && ("keyup" !== i.type || 9 === i.which))
					for(var n = [].slice.call(document.querySelectorAll(le)), s = 0, r = n.length; s < r; s++) {
						var o = e._getParentFromElement(n[s]),
							a = t(n[s]).data(J),
							l = {
								relatedTarget: n[s]
							};
						if(i && "click" === i.type && (l.clickEvent = i), a) {
							var c = a._menu;
							if(t(o).hasClass(oe) && !(i && ("click" === i.type && /input|textarea/i.test(i.target.tagName) || "keyup" === i.type && 9 === i.which) && t.contains(o, i.target))) {
								var u = t.Event(se.HIDE, l);
								t(o).trigger(u), u.isDefaultPrevented() || ("ontouchstart" in document.documentElement && t(document.body).children().off("mouseover", null, t.noop), n[s].setAttribute("aria-expanded", "false"), t(c).removeClass(oe), t(o).removeClass(oe).trigger(t.Event(se.HIDDEN, l)))
							}
						}
					}
			}, e._getParentFromElement = function(e) {
				var t, i = a.getSelectorFromElement(e);
				return i && (t = document.querySelector(i)), t || e.parentNode
			}, e._dataApiKeydownHandler = function(i) {
				if((/input|textarea/i.test(i.target.tagName) ? !(32 === i.which || 27 !== i.which && (40 !== i.which && 38 !== i.which || t(i.target).closest(ce).length)) : ne.test(i.which)) && (i.preventDefault(), i.stopPropagation(), !this.disabled && !t(this).hasClass(re))) {
					var n = e._getParentFromElement(this),
						s = t(n).hasClass(oe);
					if(s && (!s || 27 !== i.which && 32 !== i.which)) {
						var r = [].slice.call(n.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"));
						if(0 !== r.length) {
							var o = r.indexOf(i.target);
							38 === i.which && 0 < o && o--, 40 === i.which && o < r.length - 1 && o++, o < 0 && (o = 0), r[o].focus()
						}
					} else {
						if(27 === i.which) {
							var a = n.querySelector(le);
							t(a).trigger("focus")
						}
						t(this).trigger("click")
					}
				}
			}, s(e, null, [{
				key: "VERSION",
				get: function() {
					return "4.3.1"
				}
			}, {
				key: "Default",
				get: function() {
					return ue
				}
			}, {
				key: "DefaultType",
				get: function() {
					return he
				}
			}]), e
		}();
	t(document).on(se.KEYDOWN_DATA_API, le, de._dataApiKeydownHandler).on(se.KEYDOWN_DATA_API, ce, de._dataApiKeydownHandler).on(se.CLICK_DATA_API + " " + se.KEYUP_DATA_API, de._clearMenus).on(se.CLICK_DATA_API, le, function(e) {
		e.preventDefault(), e.stopPropagation(), de._jQueryInterface.call(t(this), "toggle")
	}).on(se.CLICK_DATA_API, ".dropdown form", function(e) {
		e.stopPropagation()
	}), t.fn[Z] = de._jQueryInterface, t.fn[Z].Constructor = de, t.fn[Z].noConflict = function() {
		return t.fn[Z] = ie, de._jQueryInterface
	};
	var fe = "modal",
		pe = "bs.modal",
		me = "." + pe,
		ge = t.fn[fe],
		_e = {
			backdrop: !0,
			keyboard: !0,
			focus: !0,
			show: !0
		},
		ve = {
			backdrop: "(boolean|string)",
			keyboard: "boolean",
			focus: "boolean",
			show: "boolean"
		},
		be = {
			HIDE: "hide" + me,
			HIDDEN: "hidden" + me,
			SHOW: "show" + me,
			SHOWN: "shown" + me,
			FOCUSIN: "focusin" + me,
			RESIZE: "resize" + me,
			CLICK_DISMISS: "click.dismiss" + me,
			KEYDOWN_DISMISS: "keydown.dismiss" + me,
			MOUSEUP_DISMISS: "mouseup.dismiss" + me,
			MOUSEDOWN_DISMISS: "mousedown.dismiss" + me,
			CLICK_DATA_API: "click" + me + ".data-api"
		},
		Ee = "modal-open",
		ye = "fade",
		Se = "show",
		Te = ".modal-dialog",
		Ae = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
		we = ".sticky-top",
		Ie = function() {
			function e(e, t) {
				this._config = this._getConfig(t), this._element = e, this._dialog = e.querySelector(Te), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0
			}
			var i = e.prototype;
			return i.toggle = function(e) {
				return this._isShown ? this.hide() : this.show(e)
			}, i.show = function(e) {
				var i = this;
				if(!this._isShown && !this._isTransitioning) {
					t(this._element).hasClass(ye) && (this._isTransitioning = !0);
					var n = t.Event(be.SHOW, {
						relatedTarget: e
					});
					t(this._element).trigger(n), this._isShown || n.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), t(this._element).on(be.CLICK_DISMISS, '[data-dismiss="modal"]', function(e) {
						return i.hide(e)
					}), t(this._dialog).on(be.MOUSEDOWN_DISMISS, function() {
						t(i._element).one(be.MOUSEUP_DISMISS, function(e) {
							t(e.target).is(i._element) && (i._ignoreBackdropClick = !0)
						})
					}), this._showBackdrop(function() {
						return i._showElement(e)
					}))
				}
			}, i.hide = function(e) {
				var i = this;
				if(e && e.preventDefault(), this._isShown && !this._isTransitioning) {
					var n = t.Event(be.HIDE);
					if(t(this._element).trigger(n), this._isShown && !n.isDefaultPrevented()) {
						this._isShown = !1;
						var s = t(this._element).hasClass(ye);
						if(s && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), t(document).off(be.FOCUSIN), t(this._element).removeClass(Se), t(this._element).off(be.CLICK_DISMISS), t(this._dialog).off(be.MOUSEDOWN_DISMISS), s) {
							var r = a.getTransitionDurationFromElement(this._element);
							t(this._element).one(a.TRANSITION_END, function(e) {
								return i._hideModal(e)
							}).emulateTransitionEnd(r)
						} else this._hideModal()
					}
				}
			}, i.dispose = function() {
				[window, this._element, this._dialog].forEach(function(e) {
					return t(e).off(me)
				}), t(document).off(be.FOCUSIN), t.removeData(this._element, pe), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null
			}, i.handleUpdate = function() {
				this._adjustDialog()
			}, i._getConfig = function(e) {
				return e = r({}, _e, e), a.typeCheckConfig(fe, e, ve), e
			}, i._showElement = function(e) {
				var i = this,
					n = t(this._element).hasClass(ye);
				this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), t(this._dialog).hasClass("modal-dialog-scrollable") ? this._dialog.querySelector(".modal-body").scrollTop = 0 : this._element.scrollTop = 0, n && a.reflow(this._element), t(this._element).addClass(Se), this._config.focus && this._enforceFocus();
				var s = t.Event(be.SHOWN, {
						relatedTarget: e
					}),
					r = function() {
						i._config.focus && i._element.focus(), i._isTransitioning = !1, t(i._element).trigger(s)
					};
				if(n) {
					var o = a.getTransitionDurationFromElement(this._dialog);
					t(this._dialog).one(a.TRANSITION_END, r).emulateTransitionEnd(o)
				} else r()
			}, i._enforceFocus = function() {
				var e = this;
				t(document).off(be.FOCUSIN).on(be.FOCUSIN, function(i) {
					document !== i.target && e._element !== i.target && 0 === t(e._element).has(i.target).length && e._element.focus()
				})
			}, i._setEscapeEvent = function() {
				var e = this;
				this._isShown && this._config.keyboard ? t(this._element).on(be.KEYDOWN_DISMISS, function(t) {
					27 === t.which && (t.preventDefault(), e.hide())
				}) : this._isShown || t(this._element).off(be.KEYDOWN_DISMISS)
			}, i._setResizeEvent = function() {
				var e = this;
				this._isShown ? t(window).on(be.RESIZE, function(t) {
					return e.handleUpdate(t)
				}) : t(window).off(be.RESIZE)
			}, i._hideModal = function() {
				var e = this;
				this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._isTransitioning = !1, this._showBackdrop(function() {
					t(document.body).removeClass(Ee), e._resetAdjustments(), e._resetScrollbar(), t(e._element).trigger(be.HIDDEN)
				})
			}, i._removeBackdrop = function() {
				this._backdrop && (t(this._backdrop).remove(), this._backdrop = null)
			}, i._showBackdrop = function(e) {
				var i = this,
					n = t(this._element).hasClass(ye) ? ye : "";
				if(this._isShown && this._config.backdrop) {
					if(this._backdrop = document.createElement("div"), this._backdrop.className = "modal-backdrop", n && this._backdrop.classList.add(n), t(this._backdrop).appendTo(document.body), t(this._element).on(be.CLICK_DISMISS, function(e) {
							i._ignoreBackdropClick ? i._ignoreBackdropClick = !1 : e.target === e.currentTarget && ("static" === i._config.backdrop ? i._element.focus() : i.hide())
						}), n && a.reflow(this._backdrop), t(this._backdrop).addClass(Se), !e) return;
					if(!n) return void e();
					var s = a.getTransitionDurationFromElement(this._backdrop);
					t(this._backdrop).one(a.TRANSITION_END, e).emulateTransitionEnd(s)
				} else if(!this._isShown && this._backdrop) {
					t(this._backdrop).removeClass(Se);
					var r = function() {
						i._removeBackdrop(), e && e()
					};
					if(t(this._element).hasClass(ye)) {
						var o = a.getTransitionDurationFromElement(this._backdrop);
						t(this._backdrop).one(a.TRANSITION_END, r).emulateTransitionEnd(o)
					} else r()
				} else e && e()
			}, i._adjustDialog = function() {
				var e = this._element.scrollHeight > document.documentElement.clientHeight;
				!this._isBodyOverflowing && e && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !e && (this._element.style.paddingRight = this._scrollbarWidth + "px")
			}, i._resetAdjustments = function() {
				this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
			}, i._checkScrollbar = function() {
				var e = document.body.getBoundingClientRect();
				this._isBodyOverflowing = e.left + e.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
			}, i._setScrollbar = function() {
				var e = this;
				if(this._isBodyOverflowing) {
					var i = [].slice.call(document.querySelectorAll(Ae)),
						n = [].slice.call(document.querySelectorAll(we));
					t(i).each(function(i, n) {
						var s = n.style.paddingRight,
							r = t(n).css("padding-right");
						t(n).data("padding-right", s).css("padding-right", parseFloat(r) + e._scrollbarWidth + "px")
					}), t(n).each(function(i, n) {
						var s = n.style.marginRight,
							r = t(n).css("margin-right");
						t(n).data("margin-right", s).css("margin-right", parseFloat(r) - e._scrollbarWidth + "px")
					});
					var s = document.body.style.paddingRight,
						r = t(document.body).css("padding-right");
					t(document.body).data("padding-right", s).css("padding-right", parseFloat(r) + this._scrollbarWidth + "px")
				}
				t(document.body).addClass(Ee)
			}, i._resetScrollbar = function() {
				var e = [].slice.call(document.querySelectorAll(Ae));
				t(e).each(function(e, i) {
					var n = t(i).data("padding-right");
					t(i).removeData("padding-right"), i.style.paddingRight = n || ""
				});
				var i = [].slice.call(document.querySelectorAll("" + we));
				t(i).each(function(e, i) {
					var n = t(i).data("margin-right");
					void 0 !== n && t(i).css("margin-right", n).removeData("margin-right")
				});
				var n = t(document.body).data("padding-right");
				t(document.body).removeData("padding-right"), document.body.style.paddingRight = n || ""
			}, i._getScrollbarWidth = function() {
				var e = document.createElement("div");
				e.className = "modal-scrollbar-measure", document.body.appendChild(e);
				var t = e.getBoundingClientRect().width - e.clientWidth;
				return document.body.removeChild(e), t
			}, e._jQueryInterface = function(i, n) {
				return this.each(function() {
					var s = t(this).data(pe),
						o = r({}, _e, t(this).data(), "object" == typeof i && i ? i : {});
					if(s || (s = new e(this, o), t(this).data(pe, s)), "string" == typeof i) {
						if(void 0 === s[i]) throw new TypeError('No method named "' + i + '"');
						s[i](n)
					} else o.show && s.show(n)
				})
			}, s(e, null, [{
				key: "VERSION",
				get: function() {
					return "4.3.1"
				}
			}, {
				key: "Default",
				get: function() {
					return _e
				}
			}]), e
		}();
	t(document).on(be.CLICK_DATA_API, '[data-toggle="modal"]', function(e) {
		var i, n = this,
			s = a.getSelectorFromElement(this);
		s && (i = document.querySelector(s));
		var o = t(i).data(pe) ? "toggle" : r({}, t(i).data(), t(this).data());
		"A" !== this.tagName && "AREA" !== this.tagName || e.preventDefault();
		var l = t(i).one(be.SHOW, function(e) {
			e.isDefaultPrevented() || l.one(be.HIDDEN, function() {
				t(n).is(":visible") && n.focus()
			})
		});
		Ie._jQueryInterface.call(t(i), o, this)
	}), t.fn[fe] = Ie._jQueryInterface, t.fn[fe].Constructor = Ie, t.fn[fe].noConflict = function() {
		return t.fn[fe] = ge, Ie._jQueryInterface
	};
	var Ce = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
		Ne = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
		Oe = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

	function De(e, t, i) {
		if(0 === e.length) return e;
		if(i && "function" == typeof i) return i(e);
		for(var n = (new window.DOMParser).parseFromString(e, "text/html"), s = Object.keys(t), r = [].slice.call(n.body.querySelectorAll("*")), o = function(e, i) {
				var n = r[e],
					o = n.nodeName.toLowerCase();
				if(-1 === s.indexOf(n.nodeName.toLowerCase())) return n.parentNode.removeChild(n), "continue";
				var a = [].slice.call(n.attributes),
					l = [].concat(t["*"] || [], t[o] || []);
				a.forEach(function(e) {
					(function(e, t) {
						var i = e.nodeName.toLowerCase();
						if(-1 !== t.indexOf(i)) return -1 === Ce.indexOf(i) || Boolean(e.nodeValue.match(Ne) || e.nodeValue.match(Oe));
						for(var n = t.filter(function(e) {
								return e instanceof RegExp
							}), s = 0, r = n.length; s < r; s++)
							if(i.match(n[s])) return !0;
						return !1
					})(e, l) || n.removeAttribute(e.nodeName)
				})
			}, a = 0, l = r.length; a < l; a++) o(a);
		return n.body.innerHTML
	}
	var ke = "tooltip",
		Pe = "bs.tooltip",
		Re = "." + Pe,
		xe = t.fn[ke],
		Le = "bs-tooltip",
		Me = new RegExp("(^|\\s)" + Le + "\\S+", "g"),
		Fe = ["sanitize", "whiteList", "sanitizeFn"],
		$e = {
			animation: "boolean",
			template: "string",
			title: "(string|element|function)",
			trigger: "string",
			delay: "(number|object)",
			html: "boolean",
			selector: "(string|boolean)",
			placement: "(string|function)",
			offset: "(number|string|function)",
			container: "(string|element|boolean)",
			fallbackPlacement: "(string|array)",
			boundary: "(string|element)",
			sanitize: "boolean",
			sanitizeFn: "(null|function)",
			whiteList: "object"
		},
		Ue = {
			AUTO: "auto",
			TOP: "top",
			RIGHT: "right",
			BOTTOM: "bottom",
			LEFT: "left"
		},
		He = {
			animation: !0,
			template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
			trigger: "hover focus",
			title: "",
			delay: 0,
			html: !1,
			selector: !1,
			placement: "top",
			offset: 0,
			container: !1,
			fallbackPlacement: "flip",
			boundary: "scrollParent",
			sanitize: !0,
			sanitizeFn: null,
			whiteList: {
				"*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
				a: ["target", "href", "title", "rel"],
				area: [],
				b: [],
				br: [],
				col: [],
				code: [],
				div: [],
				em: [],
				hr: [],
				h1: [],
				h2: [],
				h3: [],
				h4: [],
				h5: [],
				h6: [],
				i: [],
				img: ["src", "alt", "title", "width", "height"],
				li: [],
				ol: [],
				p: [],
				pre: [],
				s: [],
				small: [],
				span: [],
				sub: [],
				sup: [],
				strong: [],
				u: [],
				ul: []
			}
		},
		Be = "show",
		je = {
			HIDE: "hide" + Re,
			HIDDEN: "hidden" + Re,
			SHOW: "show" + Re,
			SHOWN: "shown" + Re,
			INSERTED: "inserted" + Re,
			CLICK: "click" + Re,
			FOCUSIN: "focusin" + Re,
			FOCUSOUT: "focusout" + Re,
			MOUSEENTER: "mouseenter" + Re,
			MOUSELEAVE: "mouseleave" + Re
		},
		ze = "fade",
		We = "show",
		qe = "hover",
		Ye = "focus",
		Ge = function() {
			function e(e, t) {
				if(void 0 === i) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
				this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = e, this.config = this._getConfig(t), this.tip = null, this._setListeners()
			}
			var n = e.prototype;
			return n.enable = function() {
				this._isEnabled = !0
			}, n.disable = function() {
				this._isEnabled = !1
			}, n.toggleEnabled = function() {
				this._isEnabled = !this._isEnabled
			}, n.toggle = function(e) {
				if(this._isEnabled)
					if(e) {
						var i = this.constructor.DATA_KEY,
							n = t(e.currentTarget).data(i);
						n || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)
					} else {
						if(t(this.getTipElement()).hasClass(We)) return void this._leave(null, this);
						this._enter(null, this)
					}
			}, n.dispose = function() {
				clearTimeout(this._timeout), t.removeData(this.element, this.constructor.DATA_KEY), t(this.element).off(this.constructor.EVENT_KEY), t(this.element).closest(".modal").off("hide.bs.modal"), this.tip && t(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, (this._activeTrigger = null) !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
			}, n.show = function() {
				var e = this;
				if("none" === t(this.element).css("display")) throw new Error("Please use show on visible elements");
				var n = t.Event(this.constructor.Event.SHOW);
				if(this.isWithContent() && this._isEnabled) {
					t(this.element).trigger(n);
					var s = a.findShadowRoot(this.element),
						r = t.contains(null !== s ? s : this.element.ownerDocument.documentElement, this.element);
					if(n.isDefaultPrevented() || !r) return;
					var o = this.getTipElement(),
						l = a.getUID(this.constructor.NAME);
					o.setAttribute("id", l), this.element.setAttribute("aria-describedby", l), this.setContent(), this.config.animation && t(o).addClass(ze);
					var c = "function" == typeof this.config.placement ? this.config.placement.call(this, o, this.element) : this.config.placement,
						u = this._getAttachment(c);
					this.addAttachmentClass(u);
					var h = this._getContainer();
					t(o).data(this.constructor.DATA_KEY, this), t.contains(this.element.ownerDocument.documentElement, this.tip) || t(o).appendTo(h), t(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new i(this.element, o, {
						placement: u,
						modifiers: {
							offset: this._getOffset(),
							flip: {
								behavior: this.config.fallbackPlacement
							},
							arrow: {
								element: ".arrow"
							},
							preventOverflow: {
								boundariesElement: this.config.boundary
							}
						},
						onCreate: function(t) {
							t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
						},
						onUpdate: function(t) {
							return e._handlePopperPlacementChange(t)
						}
					}), t(o).addClass(We), "ontouchstart" in document.documentElement && t(document.body).children().on("mouseover", null, t.noop);
					var d = function() {
						e.config.animation && e._fixTransition();
						var i = e._hoverState;
						e._hoverState = null, t(e.element).trigger(e.constructor.Event.SHOWN), "out" === i && e._leave(null, e)
					};
					if(t(this.tip).hasClass(ze)) {
						var f = a.getTransitionDurationFromElement(this.tip);
						t(this.tip).one(a.TRANSITION_END, d).emulateTransitionEnd(f)
					} else d()
				}
			}, n.hide = function(e) {
				var i = this,
					n = this.getTipElement(),
					s = t.Event(this.constructor.Event.HIDE),
					r = function() {
						i._hoverState !== Be && n.parentNode && n.parentNode.removeChild(n), i._cleanTipClass(), i.element.removeAttribute("aria-describedby"), t(i.element).trigger(i.constructor.Event.HIDDEN), null !== i._popper && i._popper.destroy(), e && e()
					};
				if(t(this.element).trigger(s), !s.isDefaultPrevented()) {
					if(t(n).removeClass(We), "ontouchstart" in document.documentElement && t(document.body).children().off("mouseover", null, t.noop), this._activeTrigger.click = !1, this._activeTrigger[Ye] = !1, this._activeTrigger[qe] = !1, t(this.tip).hasClass(ze)) {
						var o = a.getTransitionDurationFromElement(n);
						t(n).one(a.TRANSITION_END, r).emulateTransitionEnd(o)
					} else r();
					this._hoverState = ""
				}
			}, n.update = function() {
				null !== this._popper && this._popper.scheduleUpdate()
			}, n.isWithContent = function() {
				return Boolean(this.getTitle())
			}, n.addAttachmentClass = function(e) {
				t(this.getTipElement()).addClass(Le + "-" + e)
			}, n.getTipElement = function() {
				return this.tip = this.tip || t(this.config.template)[0], this.tip
			}, n.setContent = function() {
				var e = this.getTipElement();
				this.setElementContent(t(e.querySelectorAll(".tooltip-inner")), this.getTitle()), t(e).removeClass(ze + " " + We)
			}, n.setElementContent = function(e, i) {
				"object" != typeof i || !i.nodeType && !i.jquery ? this.config.html ? (this.config.sanitize && (i = De(i, this.config.whiteList, this.config.sanitizeFn)), e.html(i)) : e.text(i) : this.config.html ? t(i).parent().is(e) || e.empty().append(i) : e.text(t(i).text())
			}, n.getTitle = function() {
				var e = this.element.getAttribute("data-original-title");
				return e || (e = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), e
			}, n._getOffset = function() {
				var e = this,
					t = {};
				return "function" == typeof this.config.offset ? t.fn = function(t) {
					return t.offsets = r({}, t.offsets, e.config.offset(t.offsets, e.element) || {}), t
				} : t.offset = this.config.offset, t
			}, n._getContainer = function() {
				return !1 === this.config.container ? document.body : a.isElement(this.config.container) ? t(this.config.container) : t(document).find(this.config.container)
			}, n._getAttachment = function(e) {
				return Ue[e.toUpperCase()]
			}, n._setListeners = function() {
				var e = this;
				this.config.trigger.split(" ").forEach(function(i) {
					if("click" === i) t(e.element).on(e.constructor.Event.CLICK, e.config.selector, function(t) {
						return e.toggle(t)
					});
					else if("manual" !== i) {
						var n = i === qe ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN,
							s = i === qe ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT;
						t(e.element).on(n, e.config.selector, function(t) {
							return e._enter(t)
						}).on(s, e.config.selector, function(t) {
							return e._leave(t)
						})
					}
				}), t(this.element).closest(".modal").on("hide.bs.modal", function() {
					e.element && e.hide()
				}), this.config.selector ? this.config = r({}, this.config, {
					trigger: "manual",
					selector: ""
				}) : this._fixTitle()
			}, n._fixTitle = function() {
				var e = typeof this.element.getAttribute("data-original-title");
				(this.element.getAttribute("title") || "string" !== e) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
			}, n._enter = function(e, i) {
				var n = this.constructor.DATA_KEY;
				(i = i || t(e.currentTarget).data(n)) || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(n, i)), e && (i._activeTrigger["focusin" === e.type ? Ye : qe] = !0), t(i.getTipElement()).hasClass(We) || i._hoverState === Be ? i._hoverState = Be : (clearTimeout(i._timeout), i._hoverState = Be, i.config.delay && i.config.delay.show ? i._timeout = setTimeout(function() {
					i._hoverState === Be && i.show()
				}, i.config.delay.show) : i.show())
			}, n._leave = function(e, i) {
				var n = this.constructor.DATA_KEY;
				(i = i || t(e.currentTarget).data(n)) || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(n, i)), e && (i._activeTrigger["focusout" === e.type ? Ye : qe] = !1), i._isWithActiveTrigger() || (clearTimeout(i._timeout), i._hoverState = "out", i.config.delay && i.config.delay.hide ? i._timeout = setTimeout(function() {
					"out" === i._hoverState && i.hide()
				}, i.config.delay.hide) : i.hide())
			}, n._isWithActiveTrigger = function() {
				for(var e in this._activeTrigger)
					if(this._activeTrigger[e]) return !0;
				return !1
			}, n._getConfig = function(e) {
				var i = t(this.element).data();
				return Object.keys(i).forEach(function(e) {
					-1 !== Fe.indexOf(e) && delete i[e]
				}), "number" == typeof(e = r({}, this.constructor.Default, i, "object" == typeof e && e ? e : {})).delay && (e.delay = {
					show: e.delay,
					hide: e.delay
				}), "number" == typeof e.title && (e.title = e.title.toString()), "number" == typeof e.content && (e.content = e.content.toString()), a.typeCheckConfig(ke, e, this.constructor.DefaultType), e.sanitize && (e.template = De(e.template, e.whiteList, e.sanitizeFn)), e
			}, n._getDelegateConfig = function() {
				var e = {};
				if(this.config)
					for(var t in this.config) this.constructor.Default[t] !== this.config[t] && (e[t] = this.config[t]);
				return e
			}, n._cleanTipClass = function() {
				var e = t(this.getTipElement()),
					i = e.attr("class").match(Me);
				null !== i && i.length && e.removeClass(i.join(""))
			}, n._handlePopperPlacementChange = function(e) {
				var t = e.instance;
				this.tip = t.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(e.placement))
			}, n._fixTransition = function() {
				var e = this.getTipElement(),
					i = this.config.animation;
				null === e.getAttribute("x-placement") && (t(e).removeClass(ze), this.config.animation = !1, this.hide(), this.show(), this.config.animation = i)
			}, e._jQueryInterface = function(i) {
				return this.each(function() {
					var n = t(this).data(Pe),
						s = "object" == typeof i && i;
					if((n || !/dispose|hide/.test(i)) && (n || (n = new e(this, s), t(this).data(Pe, n)), "string" == typeof i)) {
						if(void 0 === n[i]) throw new TypeError('No method named "' + i + '"');
						n[i]()
					}
				})
			}, s(e, null, [{
				key: "VERSION",
				get: function() {
					return "4.3.1"
				}
			}, {
				key: "Default",
				get: function() {
					return He
				}
			}, {
				key: "NAME",
				get: function() {
					return ke
				}
			}, {
				key: "DATA_KEY",
				get: function() {
					return Pe
				}
			}, {
				key: "Event",
				get: function() {
					return je
				}
			}, {
				key: "EVENT_KEY",
				get: function() {
					return Re
				}
			}, {
				key: "DefaultType",
				get: function() {
					return $e
				}
			}]), e
		}();
	t.fn[ke] = Ge._jQueryInterface, t.fn[ke].Constructor = Ge, t.fn[ke].noConflict = function() {
		return t.fn[ke] = xe, Ge._jQueryInterface
	};
	var Ke = "popover",
		Ve = "bs.popover",
		Qe = "." + Ve,
		Xe = t.fn[Ke],
		Ze = "bs-popover",
		Je = new RegExp("(^|\\s)" + Ze + "\\S+", "g"),
		et = r({}, Ge.Default, {
			placement: "right",
			trigger: "click",
			content: "",
			template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
		}),
		tt = r({}, Ge.DefaultType, {
			content: "(string|element|function)"
		}),
		it = {
			HIDE: "hide" + Qe,
			HIDDEN: "hidden" + Qe,
			SHOW: "show" + Qe,
			SHOWN: "shown" + Qe,
			INSERTED: "inserted" + Qe,
			CLICK: "click" + Qe,
			FOCUSIN: "focusin" + Qe,
			FOCUSOUT: "focusout" + Qe,
			MOUSEENTER: "mouseenter" + Qe,
			MOUSELEAVE: "mouseleave" + Qe
		},
		nt = function(e) {
			var i, n;

			function r() {
				return e.apply(this, arguments) || this
			}
			n = e, (i = r).prototype = Object.create(n.prototype), (i.prototype.constructor = i).__proto__ = n;
			var o = r.prototype;
			return o.isWithContent = function() {
				return this.getTitle() || this._getContent()
			}, o.addAttachmentClass = function(e) {
				t(this.getTipElement()).addClass(Ze + "-" + e)
			}, o.getTipElement = function() {
				return this.tip = this.tip || t(this.config.template)[0], this.tip
			}, o.setContent = function() {
				var e = t(this.getTipElement());
				this.setElementContent(e.find(".popover-header"), this.getTitle());
				var i = this._getContent();
				"function" == typeof i && (i = i.call(this.element)), this.setElementContent(e.find(".popover-body"), i), e.removeClass("fade show")
			}, o._getContent = function() {
				return this.element.getAttribute("data-content") || this.config.content
			}, o._cleanTipClass = function() {
				var e = t(this.getTipElement()),
					i = e.attr("class").match(Je);
				null !== i && 0 < i.length && e.removeClass(i.join(""))
			}, r._jQueryInterface = function(e) {
				return this.each(function() {
					var i = t(this).data(Ve),
						n = "object" == typeof e ? e : null;
					if((i || !/dispose|hide/.test(e)) && (i || (i = new r(this, n), t(this).data(Ve, i)), "string" == typeof e)) {
						if(void 0 === i[e]) throw new TypeError('No method named "' + e + '"');
						i[e]()
					}
				})
			}, s(r, null, [{
				key: "VERSION",
				get: function() {
					return "4.3.1"
				}
			}, {
				key: "Default",
				get: function() {
					return et
				}
			}, {
				key: "NAME",
				get: function() {
					return Ke
				}
			}, {
				key: "DATA_KEY",
				get: function() {
					return Ve
				}
			}, {
				key: "Event",
				get: function() {
					return it
				}
			}, {
				key: "EVENT_KEY",
				get: function() {
					return Qe
				}
			}, {
				key: "DefaultType",
				get: function() {
					return tt
				}
			}]), r
		}(Ge);
	t.fn[Ke] = nt._jQueryInterface, t.fn[Ke].Constructor = nt, t.fn[Ke].noConflict = function() {
		return t.fn[Ke] = Xe, nt._jQueryInterface
	};
	var st = "scrollspy",
		rt = "bs.scrollspy",
		ot = "." + rt,
		at = t.fn[st],
		lt = {
			offset: 10,
			method: "auto",
			target: ""
		},
		ct = {
			offset: "number",
			method: "string",
			target: "(string|element)"
		},
		ut = {
			ACTIVATE: "activate" + ot,
			SCROLL: "scroll" + ot,
			LOAD_DATA_API: "load" + ot + ".data-api"
		},
		ht = "active",
		dt = ".nav, .list-group",
		ft = ".nav-link",
		pt = ".list-group-item",
		mt = ".dropdown-item",
		gt = "position",
		_t = function() {
			function e(e, i) {
				var n = this;
				this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(i), this._selector = this._config.target + " " + ft + "," + this._config.target + " " + pt + "," + this._config.target + " " + mt, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, t(this._scrollElement).on(ut.SCROLL, function(e) {
					return n._process(e)
				}), this.refresh(), this._process()
			}
			var i = e.prototype;
			return i.refresh = function() {
				var e = this,
					i = this._scrollElement === this._scrollElement.window ? "offset" : gt,
					n = "auto" === this._config.method ? i : this._config.method,
					s = n === gt ? this._getScrollTop() : 0;
				this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function(e) {
					var i, r = a.getSelectorFromElement(e);
					if(r && (i = document.querySelector(r)), i) {
						var o = i.getBoundingClientRect();
						if(o.width || o.height) return [t(i)[n]().top + s, r]
					}
					return null
				}).filter(function(e) {
					return e
				}).sort(function(e, t) {
					return e[0] - t[0]
				}).forEach(function(t) {
					e._offsets.push(t[0]), e._targets.push(t[1])
				})
			}, i.dispose = function() {
				t.removeData(this._element, rt), t(this._scrollElement).off(ot), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
			}, i._getConfig = function(e) {
				if("string" != typeof(e = r({}, lt, "object" == typeof e && e ? e : {})).target) {
					var i = t(e.target).attr("id");
					i || (i = a.getUID(st), t(e.target).attr("id", i)), e.target = "#" + i
				}
				return a.typeCheckConfig(st, e, ct), e
			}, i._getScrollTop = function() {
				return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
			}, i._getScrollHeight = function() {
				return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
			}, i._getOffsetHeight = function() {
				return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
			}, i._process = function() {
				var e = this._getScrollTop() + this._config.offset,
					t = this._getScrollHeight(),
					i = this._config.offset + t - this._getOffsetHeight();
				if(this._scrollHeight !== t && this.refresh(), i <= e) {
					var n = this._targets[this._targets.length - 1];
					this._activeTarget !== n && this._activate(n)
				} else {
					if(this._activeTarget && e < this._offsets[0] && 0 < this._offsets[0]) return this._activeTarget = null, void this._clear();
					for(var s = this._offsets.length; s--;) this._activeTarget !== this._targets[s] && e >= this._offsets[s] && (void 0 === this._offsets[s + 1] || e < this._offsets[s + 1]) && this._activate(this._targets[s])
				}
			}, i._activate = function(e) {
				this._activeTarget = e, this._clear();
				var i = this._selector.split(",").map(function(t) {
						return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
					}),
					n = t([].slice.call(document.querySelectorAll(i.join(","))));
				n.hasClass("dropdown-item") ? (n.closest(".dropdown").find(".dropdown-toggle").addClass(ht), n.addClass(ht)) : (n.addClass(ht), n.parents(dt).prev(ft + ", " + pt).addClass(ht), n.parents(dt).prev(".nav-item").children(ft).addClass(ht)), t(this._scrollElement).trigger(ut.ACTIVATE, {
					relatedTarget: e
				})
			}, i._clear = function() {
				[].slice.call(document.querySelectorAll(this._selector)).filter(function(e) {
					return e.classList.contains(ht)
				}).forEach(function(e) {
					return e.classList.remove(ht)
				})
			}, e._jQueryInterface = function(i) {
				return this.each(function() {
					var n = t(this).data(rt);
					if(n || (n = new e(this, "object" == typeof i && i), t(this).data(rt, n)), "string" == typeof i) {
						if(void 0 === n[i]) throw new TypeError('No method named "' + i + '"');
						n[i]()
					}
				})
			}, s(e, null, [{
				key: "VERSION",
				get: function() {
					return "4.3.1"
				}
			}, {
				key: "Default",
				get: function() {
					return lt
				}
			}]), e
		}();
	t(window).on(ut.LOAD_DATA_API, function() {
		for(var e = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')), i = e.length; i--;) {
			var n = t(e[i]);
			_t._jQueryInterface.call(n, n.data())
		}
	}), t.fn[st] = _t._jQueryInterface, t.fn[st].Constructor = _t, t.fn[st].noConflict = function() {
		return t.fn[st] = at, _t._jQueryInterface
	};
	var vt = "bs.tab",
		bt = "." + vt,
		Et = t.fn.tab,
		yt = {
			HIDE: "hide" + bt,
			HIDDEN: "hidden" + bt,
			SHOW: "show" + bt,
			SHOWN: "shown" + bt,
			CLICK_DATA_API: "click" + bt + ".data-api"
		},
		St = "active",
		Tt = ".active",
		At = "> li > .active",
		wt = function() {
			function e(e) {
				this._element = e
			}
			var i = e.prototype;
			return i.show = function() {
				var e = this;
				if(!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && t(this._element).hasClass(St) || t(this._element).hasClass("disabled"))) {
					var i, n, s = t(this._element).closest(".nav, .list-group")[0],
						r = a.getSelectorFromElement(this._element);
					if(s) {
						var o = "UL" === s.nodeName || "OL" === s.nodeName ? At : Tt;
						n = (n = t.makeArray(t(s).find(o)))[n.length - 1]
					}
					var l = t.Event(yt.HIDE, {
							relatedTarget: this._element
						}),
						c = t.Event(yt.SHOW, {
							relatedTarget: n
						});
					if(n && t(n).trigger(l), t(this._element).trigger(c), !c.isDefaultPrevented() && !l.isDefaultPrevented()) {
						r && (i = document.querySelector(r)), this._activate(this._element, s);
						var u = function() {
							var i = t.Event(yt.HIDDEN, {
									relatedTarget: e._element
								}),
								s = t.Event(yt.SHOWN, {
									relatedTarget: n
								});
							t(n).trigger(i), t(e._element).trigger(s)
						};
						i ? this._activate(i, i.parentNode, u) : u()
					}
				}
			}, i.dispose = function() {
				t.removeData(this._element, vt), this._element = null
			}, i._activate = function(e, i, n) {
				var s = this,
					r = (!i || "UL" !== i.nodeName && "OL" !== i.nodeName ? t(i).children(Tt) : t(i).find(At))[0],
					o = n && r && t(r).hasClass("fade"),
					l = function() {
						return s._transitionComplete(e, r, n)
					};
				if(r && o) {
					var c = a.getTransitionDurationFromElement(r);
					t(r).removeClass("show").one(a.TRANSITION_END, l).emulateTransitionEnd(c)
				} else l()
			}, i._transitionComplete = function(e, i, n) {
				if(i) {
					t(i).removeClass(St);
					var s = t(i.parentNode).find("> .dropdown-menu .active")[0];
					s && t(s).removeClass(St), "tab" === i.getAttribute("role") && i.setAttribute("aria-selected", !1)
				}
				if(t(e).addClass(St), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0), a.reflow(e), e.classList.contains("fade") && e.classList.add("show"), e.parentNode && t(e.parentNode).hasClass("dropdown-menu")) {
					var r = t(e).closest(".dropdown")[0];
					if(r) {
						var o = [].slice.call(r.querySelectorAll(".dropdown-toggle"));
						t(o).addClass(St)
					}
					e.setAttribute("aria-expanded", !0)
				}
				n && n()
			}, e._jQueryInterface = function(i) {
				return this.each(function() {
					var n = t(this),
						s = n.data(vt);
					if(s || (s = new e(this), n.data(vt, s)), "string" == typeof i) {
						if(void 0 === s[i]) throw new TypeError('No method named "' + i + '"');
						s[i]()
					}
				})
			}, s(e, null, [{
				key: "VERSION",
				get: function() {
					return "4.3.1"
				}
			}]), e
		}();
	t(document).on(yt.CLICK_DATA_API, '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', function(e) {
		e.preventDefault(), wt._jQueryInterface.call(t(this), "show")
	}), t.fn.tab = wt._jQueryInterface, t.fn.tab.Constructor = wt, t.fn.tab.noConflict = function() {
		return t.fn.tab = Et, wt._jQueryInterface
	};
	var It = "toast",
		Ct = "bs.toast",
		Nt = "." + Ct,
		Ot = t.fn[It],
		Dt = {
			CLICK_DISMISS: "click.dismiss" + Nt,
			HIDE: "hide" + Nt,
			HIDDEN: "hidden" + Nt,
			SHOW: "show" + Nt,
			SHOWN: "shown" + Nt
		},
		kt = "show",
		Pt = "showing",
		Rt = {
			animation: "boolean",
			autohide: "boolean",
			delay: "number"
		},
		xt = {
			animation: !0,
			autohide: !0,
			delay: 500
		},
		Lt = function() {
			function e(e, t) {
				this._element = e, this._config = this._getConfig(t), this._timeout = null, this._setListeners()
			}
			var i = e.prototype;
			return i.show = function() {
				var e = this;
				t(this._element).trigger(Dt.SHOW), this._config.animation && this._element.classList.add("fade");
				var i = function() {
					e._element.classList.remove(Pt), e._element.classList.add(kt), t(e._element).trigger(Dt.SHOWN), e._config.autohide && e.hide()
				};
				if(this._element.classList.remove("hide"), this._element.classList.add(Pt), this._config.animation) {
					var n = a.getTransitionDurationFromElement(this._element);
					t(this._element).one(a.TRANSITION_END, i).emulateTransitionEnd(n)
				} else i()
			}, i.hide = function(e) {
				var i = this;
				this._element.classList.contains(kt) && (t(this._element).trigger(Dt.HIDE), e ? this._close() : this._timeout = setTimeout(function() {
					i._close()
				}, this._config.delay))
			}, i.dispose = function() {
				clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains(kt) && this._element.classList.remove(kt), t(this._element).off(Dt.CLICK_DISMISS), t.removeData(this._element, Ct), this._element = null, this._config = null
			}, i._getConfig = function(e) {
				return e = r({}, xt, t(this._element).data(), "object" == typeof e && e ? e : {}), a.typeCheckConfig(It, e, this.constructor.DefaultType), e
			}, i._setListeners = function() {
				var e = this;
				t(this._element).on(Dt.CLICK_DISMISS, '[data-dismiss="toast"]', function() {
					return e.hide(!0)
				})
			}, i._close = function() {
				var e = this,
					i = function() {
						e._element.classList.add("hide"), t(e._element).trigger(Dt.HIDDEN)
					};
				if(this._element.classList.remove(kt), this._config.animation) {
					var n = a.getTransitionDurationFromElement(this._element);
					t(this._element).one(a.TRANSITION_END, i).emulateTransitionEnd(n)
				} else i()
			}, e._jQueryInterface = function(i) {
				return this.each(function() {
					var n = t(this),
						s = n.data(Ct);
					if(s || (s = new e(this, "object" == typeof i && i), n.data(Ct, s)), "string" == typeof i) {
						if(void 0 === s[i]) throw new TypeError('No method named "' + i + '"');
						s[i](this)
					}
				})
			}, s(e, null, [{
				key: "VERSION",
				get: function() {
					return "4.3.1"
				}
			}, {
				key: "DefaultType",
				get: function() {
					return Rt
				}
			}, {
				key: "Default",
				get: function() {
					return xt
				}
			}]), e
		}();
	t.fn[It] = Lt._jQueryInterface, t.fn[It].Constructor = Lt, t.fn[It].noConflict = function() {
			return t.fn[It] = Ot, Lt._jQueryInterface
		},
		function() {
			if(void 0 === t) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
			var e = t.fn.jquery.split(" ")[0].split(".");
			if(e[0] < 2 && e[1] < 9 || 1 === e[0] && 9 === e[1] && e[2] < 1 || 4 <= e[0]) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
		}(), e.Util = a, e.Alert = f, e.Button = T, e.Carousel = $, e.Collapse = X, e.Dropdown = de, e.Modal = Ie, e.Popover = nt, e.Scrollspy = _t, e.Tab = wt, e.Toast = Lt, e.Tooltip = Ge, Object.defineProperty(e, "__esModule", {
			value: !0
		})
}),
function(e) {
	"function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && "object" == typeof module.exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function($) {
	function initMouseDetection(e) {
		var t = ".smartmenus_mouse";
		if(mouseDetectionEnabled || e) mouseDetectionEnabled && e && ($(document).off(t), mouseDetectionEnabled = !1);
		else {
			var i = !0,
				n = null,
				s = {
					mousemove: function(e) {
						var t = {
							x: e.pageX,
							y: e.pageY,
							timeStamp: (new Date).getTime()
						};
						if(n) {
							var s = Math.abs(n.x - t.x),
								r = Math.abs(n.y - t.y);
							if((s > 0 || r > 0) && 2 >= s && 2 >= r && 300 >= t.timeStamp - n.timeStamp && (mouse = !0, i)) {
								var o = $(e.target).closest("a");
								o.is("a") && $.each(menuTrees, function() {
									return $.contains(this.$root[0], o[0]) ? (this.itemEnter({
										currentTarget: o[0]
									}), !1) : void 0
								}), i = !1
							}
						}
						n = t
					}
				};
			s[touchEvents ? "touchstart" : "pointerover pointermove pointerout MSPointerOver MSPointerMove MSPointerOut"] = function(e) {
				isTouchEvent(e.originalEvent) && (mouse = !1)
			}, $(document).on(getEventsNS(s, t)), mouseDetectionEnabled = !0
		}
	}

	function isTouchEvent(e) {
		return !/^(4|mouse)$/.test(e.pointerType)
	}

	function getEventsNS(e, t) {
		t || (t = "");
		var i = {};
		for(var n in e) i[n.split(" ").join(t + " ") + t] = e[n];
		return i
	}
	var menuTrees = [],
		mouse = !1,
		touchEvents = "ontouchstart" in window,
		mouseDetectionEnabled = !1,
		requestAnimationFrame = window.requestAnimationFrame || function(e) {
			return setTimeout(e, 1e3 / 60)
		},
		cancelAnimationFrame = window.cancelAnimationFrame || function(e) {
			clearTimeout(e)
		},
		canAnimate = !!$.fn.animate;
	return $.SmartMenus = function(e, t) {
		this.$root = $(e), this.opts = t, this.rootId = "", this.accessIdPrefix = "", this.$subArrow = null, this.activatedItems = [], this.visibleSubMenus = [], this.showTimeout = 0, this.hideTimeout = 0, this.scrollTimeout = 0, this.clickActivated = !1, this.focusActivated = !1, this.zIndexInc = 0, this.idInc = 0, this.$firstLink = null, this.$firstSub = null, this.disabled = !1, this.$disableOverlay = null, this.$touchScrollingSub = null, this.cssTransforms3d = "perspective" in e.style || "webkitPerspective" in e.style, this.wasCollapsible = !1, this.init()
	}, $.extend($.SmartMenus, {
		hideAll: function() {
			$.each(menuTrees, function() {
				this.menuHideAll()
			})
		},
		destroy: function() {
			for(; menuTrees.length;) menuTrees[0].destroy();
			initMouseDetection(!0)
		},
		prototype: {
			init: function(e) {
				var t = this;
				if(!e) {
					menuTrees.push(this), this.rootId = ((new Date).getTime() + Math.random() + "").replace(/\D/g, ""), this.accessIdPrefix = "sm-" + this.rootId + "-", this.$root.hasClass("sm-rtl") && (this.opts.rightToLeftSubMenus = !0);
					var i = ".smartmenus";
					this.$root.data("smartmenus", this).attr("data-smartmenus-id", this.rootId).dataSM("level", 1).on(getEventsNS({
						"mouseover focusin": $.proxy(this.rootOver, this),
						"mouseout focusout": $.proxy(this.rootOut, this),
						keydown: $.proxy(this.rootKeyDown, this)
					}, i)).on(getEventsNS({
						mouseenter: $.proxy(this.itemEnter, this),
						mouseleave: $.proxy(this.itemLeave, this),
						mousedown: $.proxy(this.itemDown, this),
						focus: $.proxy(this.itemFocus, this),
						blur: $.proxy(this.itemBlur, this),
						click: $.proxy(this.itemClick, this)
					}, i), "a"), i += this.rootId, this.opts.hideOnClick && $(document).on(getEventsNS({
						touchstart: $.proxy(this.docTouchStart, this),
						touchmove: $.proxy(this.docTouchMove, this),
						touchend: $.proxy(this.docTouchEnd, this),
						click: $.proxy(this.docClick, this)
					}, i)), $(window).on(getEventsNS({
						"resize orientationchange": $.proxy(this.winResize, this)
					}, i)), this.opts.subIndicators && (this.$subArrow = $("<span/>").addClass("sub-arrow"), this.opts.subIndicatorsText && this.$subArrow.html(this.opts.subIndicatorsText)), initMouseDetection()
				}
				if(this.$firstSub = this.$root.find("ul").each(function() {
						t.menuInit($(this))
					}).eq(0), this.$firstLink = this.$root.find("a").eq(0), this.opts.markCurrentItem) {
					var n = /(index|default)\.[^#\?\/]*/i,
						s = window.location.href.replace(n, ""),
						r = s.replace(/#.*/, "");
					this.$root.find("a").each(function() {
						var e = this.href.replace(n, ""),
							i = $(this);
						(e == s || e == r) && (i.addClass("current"), t.opts.markCurrentTree && i.parentsUntil("[data-smartmenus-id]", "ul").each(function() {
							$(this).dataSM("parent-a").addClass("current")
						}))
					})
				}
				this.wasCollapsible = this.isCollapsible()
			},
			destroy: function(e) {
				if(!e) {
					var t = ".smartmenus";
					this.$root.removeData("smartmenus").removeAttr("data-smartmenus-id").removeDataSM("level").off(t), t += this.rootId, $(document).off(t), $(window).off(t), this.opts.subIndicators && (this.$subArrow = null)
				}
				this.menuHideAll();
				var i = this;
				this.$root.find("ul").each(function() {
					var e = $(this);
					e.dataSM("scroll-arrows") && e.dataSM("scroll-arrows").remove(), e.dataSM("shown-before") && ((i.opts.subMenusMinWidth || i.opts.subMenusMaxWidth) && e.css({
						width: "",
						minWidth: "",
						maxWidth: ""
					}).removeClass("sm-nowrap"), e.dataSM("scroll-arrows") && e.dataSM("scroll-arrows").remove(), e.css({
						zIndex: "",
						top: "",
						left: "",
						marginLeft: "",
						marginTop: "",
						display: ""
					})), 0 == (e.attr("id") || "").indexOf(i.accessIdPrefix) && e.removeAttr("id")
				}).removeDataSM("in-mega").removeDataSM("shown-before").removeDataSM("scroll-arrows").removeDataSM("parent-a").removeDataSM("level").removeDataSM("beforefirstshowfired").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeAttr("aria-expanded"), this.$root.find("a.has-submenu").each(function() {
					var e = $(this);
					0 == e.attr("id").indexOf(i.accessIdPrefix) && e.removeAttr("id")
				}).removeClass("has-submenu").removeDataSM("sub").removeAttr("aria-haspopup").removeAttr("aria-controls").removeAttr("aria-expanded").closest("li").removeDataSM("sub"), this.opts.subIndicators && this.$root.find("span.sub-arrow").remove(), this.opts.markCurrentItem && this.$root.find("a.current").removeClass("current"), e || (this.$root = null, this.$firstLink = null, this.$firstSub = null, this.$disableOverlay && (this.$disableOverlay.remove(), this.$disableOverlay = null), menuTrees.splice($.inArray(this, menuTrees), 1))
			},
			disable: function(e) {
				if(!this.disabled) {
					if(this.menuHideAll(), !e && !this.opts.isPopup && this.$root.is(":visible")) {
						var t = this.$root.offset();
						this.$disableOverlay = $('<div class="sm-jquery-disable-overlay"/>').css({
							position: "absolute",
							top: t.top,
							left: t.left,
							width: this.$root.outerWidth(),
							height: this.$root.outerHeight(),
							zIndex: this.getStartZIndex(!0),
							opacity: 0
						}).appendTo(document.body)
					}
					this.disabled = !0
				}
			},
			docClick: function(e) {
				return this.$touchScrollingSub ? void(this.$touchScrollingSub = null) : void((this.visibleSubMenus.length && !$.contains(this.$root[0], e.target) || $(e.target).closest("a").length) && this.menuHideAll())
			},
			docTouchEnd: function() {
				if(this.lastTouch) {
					if(!(!this.visibleSubMenus.length || void 0 !== this.lastTouch.x2 && this.lastTouch.x1 != this.lastTouch.x2 || void 0 !== this.lastTouch.y2 && this.lastTouch.y1 != this.lastTouch.y2 || this.lastTouch.target && $.contains(this.$root[0], this.lastTouch.target))) {
						this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0);
						var e = this;
						this.hideTimeout = setTimeout(function() {
							e.menuHideAll()
						}, 350)
					}
					this.lastTouch = null
				}
			},
			docTouchMove: function(e) {
				if(this.lastTouch) {
					var t = e.originalEvent.touches[0];
					this.lastTouch.x2 = t.pageX, this.lastTouch.y2 = t.pageY
				}
			},
			docTouchStart: function(e) {
				var t = e.originalEvent.touches[0];
				this.lastTouch = {
					x1: t.pageX,
					y1: t.pageY,
					target: t.target
				}
			},
			enable: function() {
				this.disabled && (this.$disableOverlay && (this.$disableOverlay.remove(), this.$disableOverlay = null), this.disabled = !1)
			},
			getClosestMenu: function(e) {
				for(var t = $(e).closest("ul"); t.dataSM("in-mega");) t = t.parent().closest("ul");
				return t[0] || null
			},
			getHeight: function(e) {
				return this.getOffset(e, !0)
			},
			getOffset: function(e, t) {
				var i;
				"none" == e.css("display") && (i = {
					position: e[0].style.position,
					visibility: e[0].style.visibility
				}, e.css({
					position: "absolute",
					visibility: "hidden"
				}).show());
				var n = e[0].getBoundingClientRect && e[0].getBoundingClientRect(),
					s = n && (t ? n.height || n.bottom - n.top : n.width || n.right - n.left);
				return s || 0 === s || (s = t ? e[0].offsetHeight : e[0].offsetWidth), i && e.hide().css(i), s
			},
			getStartZIndex: function(e) {
				var t = parseInt(this[e ? "$root" : "$firstSub"].css("z-index"));
				return !e && isNaN(t) && (t = parseInt(this.$root.css("z-index"))), isNaN(t) ? 1 : t
			},
			getTouchPoint: function(e) {
				return e.touches && e.touches[0] || e.changedTouches && e.changedTouches[0] || e
			},
			getViewport: function(e) {
				var t = e ? "Height" : "Width",
					i = document.documentElement["client" + t],
					n = window["inner" + t];
				return n && (i = Math.min(i, n)), i
			},
			getViewportHeight: function() {
				return this.getViewport(!0)
			},
			getViewportWidth: function() {
				return this.getViewport()
			},
			getWidth: function(e) {
				return this.getOffset(e)
			},
			handleEvents: function() {
				return !this.disabled && this.isCSSOn()
			},
			handleItemEvents: function(e) {
				return this.handleEvents() && !this.isLinkInMegaMenu(e)
			},
			isCollapsible: function() {
				return "static" == this.$firstSub.css("position")
			},
			isCSSOn: function() {
				return "inline" != this.$firstLink.css("display")
			},
			isFixed: function() {
				var e = "fixed" == this.$root.css("position");
				return e || this.$root.parentsUntil("body").each(function() {
					return "fixed" == $(this).css("position") ? (e = !0, !1) : void 0
				}), e
			},
			isLinkInMegaMenu: function(e) {
				return $(this.getClosestMenu(e[0])).hasClass("mega-menu")
			},
			isTouchMode: function() {
				return !mouse || this.opts.noMouseOver || this.isCollapsible()
			},
			itemActivate: function(e, t) {
				var i = e.closest("ul"),
					n = i.dataSM("level");
				if(n > 1 && (!this.activatedItems[n - 2] || this.activatedItems[n - 2][0] != i.dataSM("parent-a")[0])) {
					var s = this;
					$(i.parentsUntil("[data-smartmenus-id]", "ul").get().reverse()).add(i).each(function() {
						s.itemActivate($(this).dataSM("parent-a"))
					})
				}
				if((!this.isCollapsible() || t) && this.menuHideSubMenus(this.activatedItems[n - 1] && this.activatedItems[n - 1][0] == e[0] ? n : n - 1), this.activatedItems[n - 1] = e, !1 !== this.$root.triggerHandler("activate.smapi", e[0])) {
					var r = e.dataSM("sub");
					r && (this.isTouchMode() || !this.opts.showOnClick || this.clickActivated) && this.menuShow(r)
				}
			},
			itemBlur: function(e) {
				var t = $(e.currentTarget);
				this.handleItemEvents(t) && this.$root.triggerHandler("blur.smapi", t[0])
			},
			itemClick: function(e) {
				var t = $(e.currentTarget);
				if(this.handleItemEvents(t)) {
					if(this.$touchScrollingSub && this.$touchScrollingSub[0] == t.closest("ul")[0]) return this.$touchScrollingSub = null, e.stopPropagation(), !1;
					if(!1 === this.$root.triggerHandler("click.smapi", t[0])) return !1;
					var i = $(e.target).is(".sub-arrow"),
						n = t.dataSM("sub"),
						s = !!n && 2 == n.dataSM("level"),
						r = this.isCollapsible(),
						o = /toggle$/.test(this.opts.collapsibleBehavior),
						a = /link$/.test(this.opts.collapsibleBehavior),
						l = /^accordion/.test(this.opts.collapsibleBehavior);
					if(n && !n.is(":visible")) {
						if((!a || !r || i) && (this.opts.showOnClick && s && (this.clickActivated = !0), this.itemActivate(t, l), n.is(":visible"))) return this.focusActivated = !0, !1
					} else if(r && (o || i)) return this.itemActivate(t, l), this.menuHide(n), o && (this.focusActivated = !1), !1;
					return !(this.opts.showOnClick && s || t.hasClass("disabled") || !1 === this.$root.triggerHandler("select.smapi", t[0])) && void 0
				}
			},
			itemDown: function(e) {
				var t = $(e.currentTarget);
				this.handleItemEvents(t) && t.dataSM("mousedown", !0)
			},
			itemEnter: function(e) {
				var t = $(e.currentTarget);
				if(this.handleItemEvents(t)) {
					if(!this.isTouchMode()) {
						this.showTimeout && (clearTimeout(this.showTimeout), this.showTimeout = 0);
						var i = this;
						this.showTimeout = setTimeout(function() {
							i.itemActivate(t)
						}, this.opts.showOnClick && 1 == t.closest("ul").dataSM("level") ? 1 : this.opts.showTimeout)
					}
					this.$root.triggerHandler("mouseenter.smapi", t[0])
				}
			},
			itemFocus: function(e) {
				var t = $(e.currentTarget);
				this.handleItemEvents(t) && (!this.focusActivated || this.isTouchMode() && t.dataSM("mousedown") || this.activatedItems.length && this.activatedItems[this.activatedItems.length - 1][0] == t[0] || this.itemActivate(t, !0), this.$root.triggerHandler("focus.smapi", t[0]))
			},
			itemLeave: function(e) {
				var t = $(e.currentTarget);
				this.handleItemEvents(t) && (this.isTouchMode() || (t[0].blur(), this.showTimeout && (clearTimeout(this.showTimeout), this.showTimeout = 0)), t.removeDataSM("mousedown"), this.$root.triggerHandler("mouseleave.smapi", t[0]))
			},
			menuHide: function(e) {
				if(!1 !== this.$root.triggerHandler("beforehide.smapi", e[0]) && (canAnimate && e.stop(!0, !0), "none" != e.css("display"))) {
					var t = function() {
						e.css("z-index", "")
					};
					this.isCollapsible() ? canAnimate && this.opts.collapsibleHideFunction ? this.opts.collapsibleHideFunction.call(this, e, t) : e.hide(this.opts.collapsibleHideDuration, t) : canAnimate && this.opts.hideFunction ? this.opts.hideFunction.call(this, e, t) : e.hide(this.opts.hideDuration, t), e.dataSM("scroll") && (this.menuScrollStop(e), e.css({
						"touch-action": "",
						"-ms-touch-action": "",
						"-webkit-transform": "",
						transform: ""
					}).off(".smartmenus_scroll").removeDataSM("scroll").dataSM("scroll-arrows").hide()), e.dataSM("parent-a").removeClass("highlighted").attr("aria-expanded", "false"), e.attr({
						"aria-expanded": "false",
						"aria-hidden": "true"
					});
					var i = e.dataSM("level");
					this.activatedItems.splice(i - 1, 1), this.visibleSubMenus.splice($.inArray(e, this.visibleSubMenus), 1), this.$root.triggerHandler("hide.smapi", e[0])
				}
			},
			menuHideAll: function() {
				this.showTimeout && (clearTimeout(this.showTimeout), this.showTimeout = 0);
				for(var e = this.opts.isPopup ? 1 : 0, t = this.visibleSubMenus.length - 1; t >= e; t--) this.menuHide(this.visibleSubMenus[t]);
				this.opts.isPopup && (canAnimate && this.$root.stop(!0, !0), this.$root.is(":visible") && (canAnimate && this.opts.hideFunction ? this.opts.hideFunction.call(this, this.$root) : this.$root.hide(this.opts.hideDuration))), this.activatedItems = [], this.visibleSubMenus = [], this.clickActivated = !1, this.focusActivated = !1, this.zIndexInc = 0, this.$root.triggerHandler("hideAll.smapi")
			},
			menuHideSubMenus: function(e) {
				for(var t = this.activatedItems.length - 1; t >= e; t--) {
					var i = this.activatedItems[t].dataSM("sub");
					i && this.menuHide(i)
				}
			},
			menuInit: function(e) {
				if(!e.dataSM("in-mega")) {
					e.hasClass("mega-menu") && e.find("ul").dataSM("in-mega", !0);
					for(var t = 2, i = e[0];
						(i = i.parentNode.parentNode) != this.$root[0];) t++;
					var n = e.prevAll("a").eq(-1);
					n.length || (n = e.prevAll().find("a").eq(-1)), n.addClass("has-submenu").dataSM("sub", e), e.dataSM("parent-a", n).dataSM("level", t).parent().dataSM("sub", e);
					var s = n.attr("id") || this.accessIdPrefix + ++this.idInc,
						r = e.attr("id") || this.accessIdPrefix + ++this.idInc;
					n.attr({
						id: s,
						"aria-haspopup": "true",
						"aria-controls": r,
						"aria-expanded": "false"
					}), e.attr({
						id: r,
						role: "group",
						"aria-hidden": "true",
						"aria-labelledby": s,
						"aria-expanded": "false"
					}), this.opts.subIndicators && n[this.opts.subIndicatorsPos](this.$subArrow.clone())
				}
			},
			menuPosition: function(e) {
				var t, i, n = e.dataSM("parent-a"),
					s = n.closest("li"),
					r = s.parent(),
					o = e.dataSM("level"),
					a = this.getWidth(e),
					l = this.getHeight(e),
					c = n.offset(),
					u = c.left,
					h = c.top,
					d = this.getWidth(n),
					f = this.getHeight(n),
					p = $(window),
					m = p.scrollLeft(),
					g = p.scrollTop(),
					_ = this.getViewportWidth(),
					v = this.getViewportHeight(),
					b = r.parent().is("[data-sm-horizontal-sub]") || 2 == o && !r.hasClass("sm-vertical"),
					E = this.opts.rightToLeftSubMenus && !s.is("[data-sm-reverse]") || !this.opts.rightToLeftSubMenus && s.is("[data-sm-reverse]"),
					y = 2 == o ? this.opts.mainMenuSubOffsetX : this.opts.subMenusSubOffsetX,
					S = 2 == o ? this.opts.mainMenuSubOffsetY : this.opts.subMenusSubOffsetY;
				if(b ? (t = E ? d - a - y : y, i = this.opts.bottomToTopSubMenus ? -l - S : f + S) : (t = E ? y - a : d - y, i = this.opts.bottomToTopSubMenus ? f - S - l : S), this.opts.keepInViewport) {
					var T = u + t,
						A = h + i;
					if(E && m > T ? t = b ? m - T + t : d - y : !E && T + a > m + _ && (t = b ? m + _ - a - T + t : y - a), b || (v > l && A + l > g + v ? i += g + v - l - A : (l >= v || g > A) && (i += g - A)), b && (A + l > g + v + .49 || g > A) || !b && l > v + .49) {
						var w = this;
						e.dataSM("scroll-arrows") || e.dataSM("scroll-arrows", $([$('<span class="scroll-up"><span class="scroll-up-arrow"></span></span>')[0], $('<span class="scroll-down"><span class="scroll-down-arrow"></span></span>')[0]]).on({
							mouseenter: function() {
								e.dataSM("scroll").up = $(this).hasClass("scroll-up"), w.menuScroll(e)
							},
							mouseleave: function(t) {
								w.menuScrollStop(e), w.menuScrollOut(e, t)
							},
							"mousewheel DOMMouseScroll": function(e) {
								e.preventDefault()
							}
						}).insertAfter(e));
						var I = ".smartmenus_scroll";
						if(e.dataSM("scroll", {
								y: this.cssTransforms3d ? 0 : i - f,
								step: 1,
								itemH: f,
								subH: l,
								arrowDownH: this.getHeight(e.dataSM("scroll-arrows").eq(1))
							}).on(getEventsNS({
								mouseover: function(t) {
									w.menuScrollOver(e, t)
								},
								mouseout: function(t) {
									w.menuScrollOut(e, t)
								},
								"mousewheel DOMMouseScroll": function(t) {
									w.menuScrollMousewheel(e, t)
								}
							}, I)).dataSM("scroll-arrows").css({
								top: "auto",
								left: "0",
								marginLeft: t + (parseInt(e.css("border-left-width")) || 0),
								width: a - (parseInt(e.css("border-left-width")) || 0) - (parseInt(e.css("border-right-width")) || 0),
								zIndex: e.css("z-index")
							}).eq(b && this.opts.bottomToTopSubMenus ? 0 : 1).show(), this.isFixed()) {
							var C = {};
							C[touchEvents ? "touchstart touchmove touchend" : "pointerdown pointermove pointerup MSPointerDown MSPointerMove MSPointerUp"] = function(t) {
								w.menuScrollTouch(e, t)
							}, e.css({
								"touch-action": "none",
								"-ms-touch-action": "none"
							}).on(getEventsNS(C, I))
						}
					}
				}
				e.css({
					top: "auto",
					left: "0",
					marginLeft: t,
					marginTop: i - f
				})
			},
			menuScroll: function(e, t, i) {
				var n, s = e.dataSM("scroll"),
					r = e.dataSM("scroll-arrows"),
					o = s.up ? s.upEnd : s.downEnd;
				if(!t && s.momentum) {
					if(s.momentum *= .92, .5 > (n = s.momentum)) return void this.menuScrollStop(e)
				} else n = i || (t || !this.opts.scrollAccelerate ? this.opts.scrollStep : Math.floor(s.step));
				var a = e.dataSM("level");
				if(this.activatedItems[a - 1] && this.activatedItems[a - 1].dataSM("sub") && this.activatedItems[a - 1].dataSM("sub").is(":visible") && this.menuHideSubMenus(a - 1), s.y = s.up && s.y >= o || !s.up && o >= s.y ? s.y : Math.abs(o - s.y) > n ? s.y + (s.up ? n : -n) : o, e.css(this.cssTransforms3d ? {
						"-webkit-transform": "translate3d(0, " + s.y + "px, 0)",
						transform: "translate3d(0, " + s.y + "px, 0)"
					} : {
						marginTop: s.y
					}), mouse && (s.up && s.y > s.downEnd || !s.up && s.y < s.upEnd) && r.eq(s.up ? 1 : 0).show(), s.y == o) mouse && r.eq(s.up ? 0 : 1).hide(), this.menuScrollStop(e);
				else if(!t) {
					this.opts.scrollAccelerate && s.step < this.opts.scrollStep && (s.step += .2);
					var l = this;
					this.scrollTimeout = requestAnimationFrame(function() {
						l.menuScroll(e)
					})
				}
			},
			menuScrollMousewheel: function(e, t) {
				if(this.getClosestMenu(t.target) == e[0]) {
					var i = ((t = t.originalEvent).wheelDelta || -t.detail) > 0;
					e.dataSM("scroll-arrows").eq(i ? 0 : 1).is(":visible") && (e.dataSM("scroll").up = i, this.menuScroll(e, !0))
				}
				t.preventDefault()
			},
			menuScrollOut: function(e, t) {
				mouse && (/^scroll-(up|down)/.test((t.relatedTarget || "").className) || (e[0] == t.relatedTarget || $.contains(e[0], t.relatedTarget)) && this.getClosestMenu(t.relatedTarget) == e[0] || e.dataSM("scroll-arrows").css("visibility", "hidden"))
			},
			menuScrollOver: function(e, t) {
				if(mouse && !/^scroll-(up|down)/.test(t.target.className) && this.getClosestMenu(t.target) == e[0]) {
					this.menuScrollRefreshData(e);
					var i = e.dataSM("scroll"),
						n = $(window).scrollTop() - e.dataSM("parent-a").offset().top - i.itemH;
					e.dataSM("scroll-arrows").eq(0).css("margin-top", n).end().eq(1).css("margin-top", n + this.getViewportHeight() - i.arrowDownH).end().css("visibility", "visible")
				}
			},
			menuScrollRefreshData: function(e) {
				var t = e.dataSM("scroll"),
					i = $(window).scrollTop() - e.dataSM("parent-a").offset().top - t.itemH;
				this.cssTransforms3d && (i = -(parseFloat(e.css("margin-top")) - i)), $.extend(t, {
					upEnd: i,
					downEnd: i + this.getViewportHeight() - t.subH
				})
			},
			menuScrollStop: function(e) {
				return this.scrollTimeout ? (cancelAnimationFrame(this.scrollTimeout), this.scrollTimeout = 0, e.dataSM("scroll").step = 1, !0) : void 0
			},
			menuScrollTouch: function(e, t) {
				if(isTouchEvent(t = t.originalEvent)) {
					var i = this.getTouchPoint(t);
					if(this.getClosestMenu(i.target) == e[0]) {
						var n = e.dataSM("scroll");
						if(/(start|down)$/i.test(t.type)) this.menuScrollStop(e) ? (t.preventDefault(), this.$touchScrollingSub = e) : this.$touchScrollingSub = null, this.menuScrollRefreshData(e), $.extend(n, {
							touchStartY: i.pageY,
							touchStartTime: t.timeStamp
						});
						else if(/move$/i.test(t.type)) {
							var s = void 0 !== n.touchY ? n.touchY : n.touchStartY;
							if(void 0 !== s && s != i.pageY) {
								this.$touchScrollingSub = e;
								var r = i.pageY > s;
								void 0 !== n.up && n.up != r && $.extend(n, {
									touchStartY: i.pageY,
									touchStartTime: t.timeStamp
								}), $.extend(n, {
									up: r,
									touchY: i.pageY
								}), this.menuScroll(e, !0, Math.abs(i.pageY - s))
							}
							t.preventDefault()
						} else void 0 !== n.touchY && ((n.momentum = 15 * Math.pow(Math.abs(i.pageY - n.touchStartY) / (t.timeStamp - n.touchStartTime), 2)) && (this.menuScrollStop(e), this.menuScroll(e), t.preventDefault()), delete n.touchY)
					}
				}
			},
			menuShow: function(e) {
				if((e.dataSM("beforefirstshowfired") || (e.dataSM("beforefirstshowfired", !0), !1 !== this.$root.triggerHandler("beforefirstshow.smapi", e[0]))) && !1 !== this.$root.triggerHandler("beforeshow.smapi", e[0]) && (e.dataSM("shown-before", !0), canAnimate && e.stop(!0, !0), !e.is(":visible"))) {
					var t = e.dataSM("parent-a"),
						i = this.isCollapsible();
					if((this.opts.keepHighlighted || i) && t.addClass("highlighted"), i) e.removeClass("sm-nowrap").css({
						zIndex: "",
						width: "auto",
						minWidth: "",
						maxWidth: "",
						top: "",
						left: "",
						marginLeft: "",
						marginTop: ""
					});
					else {
						if(e.css("z-index", this.zIndexInc = (this.zIndexInc || this.getStartZIndex()) + 1), (this.opts.subMenusMinWidth || this.opts.subMenusMaxWidth) && (e.css({
								width: "auto",
								minWidth: "",
								maxWidth: ""
							}).addClass("sm-nowrap"), this.opts.subMenusMinWidth && e.css("min-width", this.opts.subMenusMinWidth), this.opts.subMenusMaxWidth)) {
							var n = this.getWidth(e);
							e.css("max-width", this.opts.subMenusMaxWidth), n > this.getWidth(e) && e.removeClass("sm-nowrap").css("width", this.opts.subMenusMaxWidth)
						}
						this.menuPosition(e)
					}
					var s = function() {
						e.css("overflow", "")
					};
					i ? canAnimate && this.opts.collapsibleShowFunction ? this.opts.collapsibleShowFunction.call(this, e, s) : e.show(this.opts.collapsibleShowDuration, s) : canAnimate && this.opts.showFunction ? this.opts.showFunction.call(this, e, s) : e.show(this.opts.showDuration, s), t.attr("aria-expanded", "true"), e.attr({
						"aria-expanded": "true",
						"aria-hidden": "false"
					}), this.visibleSubMenus.push(e), this.$root.triggerHandler("show.smapi", e[0])
				}
			},
			popupHide: function(e) {
				this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0);
				var t = this;
				this.hideTimeout = setTimeout(function() {
					t.menuHideAll()
				}, e ? 1 : this.opts.hideTimeout)
			},
			popupShow: function(e, t) {
				if(this.opts.isPopup) {
					if(this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0), this.$root.dataSM("shown-before", !0), canAnimate && this.$root.stop(!0, !0), !this.$root.is(":visible")) {
						this.$root.css({
							left: e,
							top: t
						});
						var i = this,
							n = function() {
								i.$root.css("overflow", "")
							};
						canAnimate && this.opts.showFunction ? this.opts.showFunction.call(this, this.$root, n) : this.$root.show(this.opts.showDuration, n), this.visibleSubMenus[0] = this.$root
					}
				} else alert('SmartMenus jQuery Error:\n\nIf you want to show this menu via the "popupShow" method, set the isPopup:true option.')
			},
			refresh: function() {
				this.destroy(!0), this.init(!0)
			},
			rootKeyDown: function(e) {
				if(this.handleEvents()) switch(e.keyCode) {
					case 27:
						var t = this.activatedItems[0];
						if(t) this.menuHideAll(), t[0].focus(), (i = t.dataSM("sub")) && this.menuHide(i);
						break;
					case 32:
						var i, n = $(e.target);
						if(n.is("a") && this.handleItemEvents(n))(i = n.dataSM("sub")) && !i.is(":visible") && (this.itemClick({
							currentTarget: e.target
						}), e.preventDefault())
				}
			},
			rootOut: function(e) {
				if(this.handleEvents() && !this.isTouchMode() && e.target != this.$root[0] && (this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0), !this.opts.showOnClick || !this.opts.hideOnClick)) {
					var t = this;
					this.hideTimeout = setTimeout(function() {
						t.menuHideAll()
					}, this.opts.hideTimeout)
				}
			},
			rootOver: function(e) {
				this.handleEvents() && !this.isTouchMode() && e.target != this.$root[0] && this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0)
			},
			winResize: function(e) {
				if(this.handleEvents()) {
					if(!("onorientationchange" in window) || "orientationchange" == e.type) {
						var t = this.isCollapsible();
						this.wasCollapsible && t || (this.activatedItems.length && this.activatedItems[this.activatedItems.length - 1][0].blur(), this.menuHideAll()), this.wasCollapsible = t
					}
				} else if(this.$disableOverlay) {
					var i = this.$root.offset();
					this.$disableOverlay.css({
						top: i.top,
						left: i.left,
						width: this.$root.outerWidth(),
						height: this.$root.outerHeight()
					})
				}
			}
		}
	}), $.fn.dataSM = function(e, t) {
		return t ? this.data(e + "_smartmenus", t) : this.data(e + "_smartmenus")
	}, $.fn.removeDataSM = function(e) {
		return this.removeData(e + "_smartmenus")
	}, $.fn.smartmenus = function(options) {
		if("string" == typeof options) {
			var args = arguments,
				method = options;
			return Array.prototype.shift.call(args), this.each(function() {
				var e = $(this).data("smartmenus");
				e && e[method] && e[method].apply(e, args)
			})
		}
		return this.each(function() {
			var dataOpts = $(this).data("sm-options") || null;
			if(dataOpts) try {
				dataOpts = eval("(" + dataOpts + ")")
			} catch(e) {
				dataOpts = null, alert('ERROR\n\nSmartMenus jQuery init:\nInvalid "data-sm-options" attribute value syntax.')
			}
			new $.SmartMenus(this, $.extend({}, $.fn.smartmenus.defaults, options, dataOpts))
		})
	}, $.fn.smartmenus.defaults = {
		isPopup: !1,
		mainMenuSubOffsetX: 0,
		mainMenuSubOffsetY: 0,
		subMenusSubOffsetX: 0,
		subMenusSubOffsetY: 0,
		subMenusMinWidth: "10em",
		subMenusMaxWidth: "20em",
		subIndicators: !0,
		subIndicatorsPos: "append",
		subIndicatorsText: "",
		scrollStep: 30,
		scrollAccelerate: !0,
		showTimeout: 250,
		hideTimeout: 500,
		showDuration: 0,
		showFunction: null,
		hideDuration: 0,
		hideFunction: function(e, t) {
			e.fadeOut(200, t)
		},
		collapsibleShowDuration: 0,
		collapsibleShowFunction: function(e, t) {
			e.slideDown(200, t)
		},
		collapsibleHideDuration: 0,
		collapsibleHideFunction: function(e, t) {
			e.slideUp(200, t)
		},
		showOnClick: !1,
		hideOnClick: !0,
		noMouseOver: !1,
		keepInViewport: !0,
		keepHighlighted: !0,
		markCurrentItem: !1,
		markCurrentTree: !0,
		rightToLeftSubMenus: !1,
		bottomToTopSubMenus: !1,
		collapsibleBehavior: "default"
	}, $
}),
function(e, t) {
	"use strict";

	function i(i, n, r, a, l) {
		function c() {
			T = e.devicePixelRatio > 1, r = u(r), n.delay >= 0 && setTimeout(function() {
				h(!0)
			}, n.delay), (n.delay < 0 || n.combined) && (a.e = function(e, t) {
				var s, r = 0;
				return function(o, a) {
					function l() {
						r = +new Date, t.call(i, o)
					}
					var c = +new Date - r;
					s && clearTimeout(s), c > e || !n.enableThrottle || a ? l() : s = setTimeout(l, e - c)
				}
			}(n.throttle, function(e) {
				"resize" === e.type && (y = S = -1), h(e.all)
			}), a.a = function(e) {
				e = u(e), r.push.apply(r, e)
			}, a.g = function() {
				return r = s(r).filter(function() {
					return !s(this).data(n.loadedName)
				})
			}, a.f = function(e) {
				for(var t = 0; t < e.length; t++) {
					var i = r.filter(function() {
						return this === e[t]
					});
					i.length && h(!1, i)
				}
			}, h(), s(n.appendScroll).on("scroll." + l + " resize." + l, a.e))
		}

		function u(e) {
			for(var r = n.defaultImage, o = n.placeholder, a = n.imageBase, l = n.srcsetAttribute, c = n.loaderAttribute, u = n._f || {}, h = 0, d = (e = s(e).filter(function() {
					var e = s(this),
						i = g(this);
					return !e.data(n.handledName) && (e.attr(n.attribute) || e.attr(l) || e.attr(c) || u[i] !== t)
				}).data("plugin_" + n.name, i)).length; h < d; h++) {
				var f = s(e[h]),
					p = g(e[h]),
					m = f.attr(n.imageBaseAttribute) || a;
				p === C && m && f.attr(l) && f.attr(l, _(f.attr(l), m)), u[p] === t || f.attr(c) || f.attr(c, u[p]), p === C && r && !f.attr(N) ? f.attr(N, r) : p === C || !o || f.css(k) && "none" !== f.css(k) || f.css(k, "url('" + o + "')")
			}
			return e
		}

		function h(e, t) {
			if(r.length) {
				for(var o = t || r, a = !1, l = n.imageBase || "", c = n.srcsetAttribute, u = n.handledName, h = 0; h < o.length; h++)
					if(e || t || f(o[h])) {
						var p = s(o[h]),
							m = g(o[h]),
							_ = p.attr(n.attribute),
							v = p.attr(n.imageBaseAttribute) || l,
							b = p.attr(n.loaderAttribute);
						p.data(u) || n.visibleOnly && !p.is(":visible") || !((_ || p.attr(c)) && (m === C && (v + _ !== p.attr(N) || p.attr(c) !== p.attr(O)) || m !== C && v + _ !== p.css(k)) || b) || (a = !0, p.data(u, !0), d(p, m, v, b))
					}
				a && (r = s(r).filter(function() {
					return !s(this).data(u)
				}))
			} else n.autoDestroy && i.destroy()
		}

		function d(e, t, i, r) {
			++E;
			var o = function() {
				b("onError", e), v(), o = s.noop
			};
			b("beforeLoad", e);
			var a = n.attribute,
				l = n.srcsetAttribute,
				c = n.sizesAttribute,
				u = n.retinaAttribute,
				h = n.removeAttribute,
				d = n.loadedName,
				f = e.attr(u);
			if(r) {
				var p = function() {
					h && e.removeAttr(n.loaderAttribute), e.data(d, !0), b(A, e), setTimeout(v, 1), p = s.noop
				};
				e.off(I).one(I, o).one(w, p), b(r, e, function(t) {
					t ? (e.off(w), p()) : (e.off(I), o())
				}) || e.trigger(I)
			} else {
				var m = s(new Image);
				m.one(I, o).one(w, function() {
					e.hide(), t === C ? e.attr(D, m.attr(D)).attr(O, m.attr(O)).attr(N, m.attr(N)) : e.css(k, "url('" + m.attr(N) + "')"), e[n.effect](n.effectTime), h && (e.removeAttr(a + " " + l + " " + u + " " + n.imageBaseAttribute), c !== D && e.removeAttr(c)), e.data(d, !0), b(A, e), m.remove(), v()
				});
				var g = (T && f ? f : e.attr(a)) || "";
				m.attr(D, e.attr(c)).attr(O, e.attr(l)).attr(N, g ? i + g : null), m.complete && m.trigger(w)
			}
		}

		function f(e) {
			var t = e.getBoundingClientRect(),
				i = n.scrollDirection,
				s = n.threshold,
				r = m() + s > t.top && -s < t.bottom,
				o = p() + s > t.left && -s < t.right;
			return "vertical" === i ? r : "horizontal" === i ? o : r && o
		}

		function p() {
			return y >= 0 ? y : y = s(e).width()
		}

		function m() {
			return S >= 0 ? S : S = s(e).height()
		}

		function g(e) {
			return e.tagName.toLowerCase()
		}

		function _(e, t) {
			if(t) {
				var i = e.split(",");
				e = "";
				for(var n = 0, s = i.length; n < s; n++) e += t + i[n].trim() + (n !== s - 1 ? "," : "")
			}
			return e
		}

		function v() {
			--E, r.length || E || b("onFinishedAll")
		}

		function b(e, t, s) {
			return !!(e = n[e]) && (e.apply(i, [].slice.call(arguments, 1)), !0)
		}
		var E = 0,
			y = -1,
			S = -1,
			T = !1,
			A = "afterLoad",
			w = "load",
			I = "error",
			C = "img",
			N = "src",
			O = "srcset",
			D = "sizes",
			k = "background-image";
		"event" === n.bind || o ? c() : s(e).on(w + "." + l, c)
	}

	function n(n, o) {
		var a = this,
			l = s.extend({}, a.config, o),
			c = {},
			u = l.name + "-" + ++r;
		return a.config = function(e, i) {
			return i === t ? l[e] : (l[e] = i, a)
		}, a.addItems = function(e) {
			return c.a && c.a("string" === s.type(e) ? s(e) : e), a
		}, a.getItems = function() {
			return c.g ? c.g() : {}
		}, a.update = function(e) {
			return c.e && c.e({}, !e), a
		}, a.force = function(e) {
			return c.f && c.f("string" === s.type(e) ? s(e) : e), a
		}, a.loadAll = function() {
			return c.e && c.e({
				all: !0
			}, !0), a
		}, a.destroy = function() {
			return s(l.appendScroll).off("." + u, c.e), s(e).off("." + u), c = {}, t
		}, i(a, l, n, c, u), l.chainable ? n : a
	}
	var s = e.jQuery || e.Zepto,
		r = 0,
		o = !1;
	s.fn.Lazy = s.fn.lazy = function(e) {
		return new n(this, e)
	}, s.Lazy = s.lazy = function(e, i, r) {
		if(s.isFunction(i) && (r = i, i = []), s.isFunction(r)) {
			e = s.isArray(e) ? e : [e], i = s.isArray(i) ? i : [i];
			for(var o = n.prototype.config, a = o._f || (o._f = {}), l = 0, c = e.length; l < c; l++)(o[e[l]] === t || s.isFunction(o[e[l]])) && (o[e[l]] = r);
			for(var u = 0, h = i.length; u < h; u++) a[i[u]] = e[0]
		}
	}, n.prototype.config = {
		name: "lazy",
		chainable: !0,
		autoDestroy: !0,
		bind: "load",
		threshold: 500,
		visibleOnly: !1,
		appendScroll: e,
		scrollDirection: "both",
		imageBase: null,
		defaultImage: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
		placeholder: null,
		delay: -1,
		combined: !1,
		attribute: "data-src",
		srcsetAttribute: "data-srcset",
		sizesAttribute: "data-sizes",
		retinaAttribute: "data-retina",
		loaderAttribute: "data-loader",
		imageBaseAttribute: "data-imagebase",
		removeAttribute: !0,
		handledName: "handled",
		loadedName: "loaded",
		effect: "show",
		effectTime: 0,
		enableThrottle: !0,
		throttle: 250,
		beforeLoad: t,
		afterLoad: t,
		onError: t,
		onFinishedAll: t
	}, s(e).on("load", function() {
		o = !0
	})
}(window), $(function() {
	$("#main-menu").smartmenus({
		mainMenuSubOffsetX: -1,
		mainMenuSubOffsetY: 4,
		subMenusSubOffsetX: 6,
		subMenusSubOffsetY: -6
	})
}), $(function() {
	var e = $("#main-menu-state");
	e.length && (e.change(function(e) {
		var t = $("#main-menu");
		this.checked ? t.hide().slideDown(250, function() {
			t.css("display", "")
		}) : t.show().slideUp(250, function() {
			t.css("display", "")
		})
	}), $(window).bind("beforeunload unload", function() {
		e[0].checked && e[0].click()
	}))
}), $(".lazy").lazy(), $("#md-zom-img").click(function() {
	$("#md-zom-img img").addClass("out"), setTimeout(function() {
		$("#md-zom-img").hide(), $("#md-zom-img img").removeClass("out")
	}, 400), $("#md-zom-img #caption").html("")
});
var mybutton = document.getElementById("go_to_top");

function scrollFunction() {
	document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ? mybutton.style.display = "block" : mybutton.style.display = "none"
}

function goToTop() {
	$("html, body").animate({
		scrollTop: 0
	}, 600)
}

function isNumberKey(e) {
	var t = e.which ? e.which : e.keyCode;
	return !(t > 31 && (t < 48 || t > 57))
}

function isBinaryKey(e) {
	var t = e.which ? e.which : e.keyCode;
	return 48 == t || 49 == t
}
window.onscroll = function() {
	scrollFunction()
};
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
	Prism = function() {
		var e = /\blang(?:uage)?-([\w-]+)\b/i,
			t = 0,
			i = _self.Prism = {
				manual: _self.Prism && _self.Prism.manual,
				disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
				util: {
					encode: function(e) {
						return e instanceof n ? new n(e.type, i.util.encode(e.content), e.alias) : "Array" === i.util.type(e) ? e.map(i.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
					},
					type: function(e) {
						return Object.prototype.toString.call(e).slice(8, -1)
					},
					objId: function(e) {
						return e.__id || Object.defineProperty(e, "__id", {
							value: ++t
						}), e.__id
					},
					clone: function(e, t) {
						var n = i.util.type(e);
						switch(t = t || {}, n) {
							case "Object":
								if(t[i.util.objId(e)]) return t[i.util.objId(e)];
								var s = {};
								for(var r in t[i.util.objId(e)] = s, e) e.hasOwnProperty(r) && (s[r] = i.util.clone(e[r], t));
								return s;
							case "Array":
								if(t[i.util.objId(e)]) return t[i.util.objId(e)];
								s = [];
								return t[i.util.objId(e)] = s, e.forEach(function(e, n) {
									s[n] = i.util.clone(e, t)
								}), s
						}
						return e
					}
				},
				languages: {
					extend: function(e, t) {
						var n = i.util.clone(i.languages[e]);
						for(var s in t) n[s] = t[s];
						return n
					},
					insertBefore: function(e, t, n, s) {
						var r = (s = s || i.languages)[e],
							o = {};
						for(var a in r)
							if(r.hasOwnProperty(a)) {
								if(a == t)
									for(var l in n) n.hasOwnProperty(l) && (o[l] = n[l]);
								n.hasOwnProperty(a) || (o[a] = r[a])
							}
						var c = s[e];
						return s[e] = o, i.languages.DFS(i.languages, function(t, i) {
							i === c && t != e && (this[t] = o)
						}), o
					},
					DFS: function(e, t, n, s) {
						for(var r in s = s || {}, e) e.hasOwnProperty(r) && (t.call(e, r, e[r], n || r), "Object" !== i.util.type(e[r]) || s[i.util.objId(e[r])] ? "Array" !== i.util.type(e[r]) || s[i.util.objId(e[r])] || (s[i.util.objId(e[r])] = !0, i.languages.DFS(e[r], t, r, s)) : (s[i.util.objId(e[r])] = !0, i.languages.DFS(e[r], t, null, s)))
					}
				},
				plugins: {},
				highlightAll: function(e, t) {
					i.highlightAllUnder(document, e, t)
				},
				highlightAllUnder: function(e, t, n) {
					var s = {
						callback: n,
						selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
					};
					i.hooks.run("before-highlightall", s);
					for(var r, o = s.elements || e.querySelectorAll(s.selector), a = 0; r = o[a++];) i.highlightElement(r, !0 === t, s.callback)
				},
				highlightElement: function(t, n, s) {
					for(var r, o, a = t; a && !e.test(a.className);) a = a.parentNode;
					a && (r = (a.className.match(e) || [, ""])[1].toLowerCase(), o = i.languages[r]), t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + r, t.parentNode && (a = t.parentNode, /pre/i.test(a.nodeName) && (a.className = a.className.replace(e, "").replace(/\s+/g, " ") + " language-" + r));
					var l = {
						element: t,
						language: r,
						grammar: o,
						code: t.textContent
					};
					if(i.hooks.run("before-sanity-check", l), !l.code || !l.grammar) return l.code && (i.hooks.run("before-highlight", l), l.element.textContent = l.code, i.hooks.run("after-highlight", l)), void i.hooks.run("complete", l);
					if(i.hooks.run("before-highlight", l), n && _self.Worker) {
						var c = new Worker(i.filename);
						c.onmessage = function(e) {
							l.highlightedCode = e.data, i.hooks.run("before-insert", l), l.element.innerHTML = l.highlightedCode, i.hooks.run("after-highlight", l), i.hooks.run("complete", l), s && s.call(l.element)
						}, c.postMessage(JSON.stringify({
							language: l.language,
							code: l.code,
							immediateClose: !0
						}))
					} else l.highlightedCode = i.highlight(l.code, l.grammar, l.language), i.hooks.run("before-insert", l), l.element.innerHTML = l.highlightedCode, i.hooks.run("after-highlight", l), i.hooks.run("complete", l), s && s.call(t)
				},
				highlight: function(e, t, s) {
					var r = {
						code: e,
						grammar: t,
						language: s
					};
					return i.hooks.run("before-tokenize", r), r.tokens = i.tokenize(r.code, r.grammar), i.hooks.run("after-tokenize", r), n.stringify(i.util.encode(r.tokens), r.language)
				},
				matchGrammar: function(e, t, n, s, r, o, a) {
					var l = i.Token;
					for(var c in n)
						if(n.hasOwnProperty(c) && n[c]) {
							if(c == a) return;
							var u = n[c];
							u = "Array" === i.util.type(u) ? u : [u];
							for(var h = 0; h < u.length; ++h) {
								var d = u[h],
									f = d.inside,
									p = !!d.lookbehind,
									m = !!d.greedy,
									g = 0,
									_ = d.alias;
								if(m && !d.pattern.global) {
									var v = d.pattern.toString().match(/[imuy]*$/)[0];
									d.pattern = RegExp(d.pattern.source, v + "g")
								}
								d = d.pattern || d;
								for(var b = s, E = r; b < t.length; E += t[b].length, ++b) {
									var y = t[b];
									if(t.length > e.length) return;
									if(!(y instanceof l)) {
										if(m && b != t.length - 1) {
											if(d.lastIndex = E, !(C = d.exec(e))) break;
											for(var S = C.index + (p ? C[1].length : 0), T = C.index + C[0].length, A = b, w = E, I = t.length; A < I && (w < T || !t[A].type && !t[A - 1].greedy); ++A) S >= (w += t[A].length) && (++b, E = w);
											if(t[b] instanceof l) continue;
											N = A - b, y = e.slice(E, w), C.index -= E
										} else {
											d.lastIndex = 0;
											var C = d.exec(y),
												N = 1
										}
										if(C) {
											p && (g = C[1] ? C[1].length : 0);
											T = (S = C.index + g) + (C = C[0].slice(g)).length;
											var O = y.slice(0, S),
												D = y.slice(T),
												k = [b, N];
											O && (++b, E += O.length, k.push(O));
											var P = new l(c, f ? i.tokenize(C, f) : C, _, C, m);
											if(k.push(P), D && k.push(D), Array.prototype.splice.apply(t, k), 1 != N && i.matchGrammar(e, t, n, b, E, !0, c), o) break
										} else if(o) break
									}
								}
							}
						}
				},
				tokenize: function(e, t, n) {
					var s = [e],
						r = t.rest;
					if(r) {
						for(var o in r) t[o] = r[o];
						delete t.rest
					}
					return i.matchGrammar(e, s, t, 0, 0, !1), s
				},
				hooks: {
					all: {},
					add: function(e, t) {
						var n = i.hooks.all;
						n[e] = n[e] || [], n[e].push(t)
					},
					run: function(e, t) {
						var n = i.hooks.all[e];
						if(n && n.length)
							for(var s, r = 0; s = n[r++];) s(t)
					}
				}
			},
			n = i.Token = function(e, t, i, n, s) {
				this.type = e, this.content = t, this.alias = i, this.length = 0 | (n || "").length, this.greedy = !!s
			};
		if(n.stringify = function(e, t, s) {
				if("string" == typeof e) return e;
				if("Array" === i.util.type(e)) return e.map(function(i) {
					return n.stringify(i, t, e)
				}).join("");
				var r = {
					type: e.type,
					content: n.stringify(e.content, t, s),
					tag: "span",
					classes: ["token", e.type],
					attributes: {},
					language: t,
					parent: s
				};
				if(e.alias) {
					var o = "Array" === i.util.type(e.alias) ? e.alias : [e.alias];
					Array.prototype.push.apply(r.classes, o)
				}
				i.hooks.run("wrap", r);
				var a = Object.keys(r.attributes).map(function(e) {
					return e + '="' + (r.attributes[e] || "").replace(/"/g, "&quot;") + '"'
				}).join(" ");
				return "<" + r.tag + ' class="' + r.classes.join(" ") + '"' + (a ? " " + a : "") + ">" + r.content + "</" + r.tag + ">"
			}, !_self.document) return _self.addEventListener ? (i.disableWorkerMessageHandler || _self.addEventListener("message", function(e) {
			var t = JSON.parse(e.data),
				n = t.language,
				s = t.code,
				r = t.immediateClose;
			_self.postMessage(i.highlight(s, i.languages[n], n)), r && _self.close()
		}, !1), _self.Prism) : _self.Prism;
		var s = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();
		return s && (i.filename = s.src, i.manual || s.hasAttribute("data-manual") || ("loading" !== document.readyState ? window.requestAnimationFrame ? window.requestAnimationFrame(i.highlightAll) : window.setTimeout(i.highlightAll, 16) : document.addEventListener("DOMContentLoaded", i.highlightAll))), _self.Prism
	}();
"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism), Prism.languages.markup = {
		comment: /<!--[\s\S]*?-->/,
		prolog: /<\?[\s\S]+?\?>/,
		doctype: /<!DOCTYPE[\s\S]+?>/i,
		cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
		tag: {
			pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
			greedy: !0,
			inside: {
				tag: {
					pattern: /^<\/?[^\s>\/]+/i,
					inside: {
						punctuation: /^<\/?/,
						namespace: /^[^\s>\/:]+:/
					}
				},
				"attr-value": {
					pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
					inside: {
						punctuation: [/^=/, {
							pattern: /(^|[^\\])["']/,
							lookbehind: !0
						}]
					}
				},
				punctuation: /\/?>/,
				"attr-name": {
					pattern: /[^\s>\/]+/,
					inside: {
						namespace: /^[^\s>\/:]+:/
					}
				}
			}
		},
		entity: /&#?[\da-z]{1,8};/i
	}, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.hooks.add("wrap", function(e) {
		"entity" === e.type && (e.attributes.title = e.content.replace(/&amp;/, "&"))
	}), Prism.languages.xml = Prism.languages.markup, Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup, Prism.languages.css = {
		comment: /\/\*[\s\S]*?\*\//,
		atrule: {
			pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
			inside: {
				rule: /@[\w-]+/
			}
		},
		url: /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
		selector: /[^{}\s][^{};]*?(?=\s*\{)/,
		string: {
			pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
			greedy: !0
		},
		property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
		important: /!important\b/i,
		function: /[-a-z0-9]+(?=\()/i,
		punctuation: /[(){};:,]/
	}, Prism.languages.css.atrule.inside.rest = Prism.languages.css, Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
		style: {
			pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
			lookbehind: !0,
			inside: Prism.languages.css,
			alias: "language-css",
			greedy: !0
		}
	}), Prism.languages.insertBefore("inside", "attr-value", {
		"style-attr": {
			pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
			inside: {
				"attr-name": {
					pattern: /^\s*style/i,
					inside: Prism.languages.markup.tag.inside
				},
				punctuation: /^\s*=\s*['"]|['"]\s*$/,
				"attr-value": {
					pattern: /.+/i,
					inside: Prism.languages.css
				}
			},
			alias: "language-css"
		}
	}, Prism.languages.markup.tag)), Prism.languages.clike = {
		comment: [{
			pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
			lookbehind: !0
		}, {
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: !0,
			greedy: !0
		}],
		string: {
			pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
			greedy: !0
		},
		"class-name": {
			pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
			lookbehind: !0,
			inside: {
				punctuation: /[.\\]/
			}
		},
		keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
		boolean: /\b(?:true|false)\b/,
		function: /\w+(?=\()/,
		number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
		operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
		punctuation: /[{}[\];(),.:]/
	}, Prism.languages.javascript = Prism.languages.extend("clike", {
		"class-name": [Prism.languages.clike["class-name"], {
			pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
			lookbehind: !0
		}],
		keyword: [{
			pattern: /((?:^|})\s*)(?:catch|finally)\b/,
			lookbehind: !0
		}, /\b(?:as|async|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/],
		number: /\b(?:(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+)n?|\d+n|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
		function: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\(|\.(?:apply|bind|call)\()/,
		operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
	}), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/, Prism.languages.insertBefore("javascript", "keyword", {
		regex: {
			pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,
			lookbehind: !0,
			greedy: !0
		},
		"function-variable": {
			pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
			alias: "function"
		},
		parameter: [{
			pattern: /(function(?:\s+[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)[^\s()][^()]*?(?=\s*\))/,
			lookbehind: !0,
			inside: Prism.languages.javascript
		}, {
			pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/,
			inside: Prism.languages.javascript
		}, {
			pattern: /(\(\s*)[^\s()][^()]*?(?=\s*\)\s*=>)/,
			lookbehind: !0,
			inside: Prism.languages.javascript
		}, {
			pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)[^\s()][^()]*?(?=\s*\)\s*\{)/,
			lookbehind: !0,
			inside: Prism.languages.javascript
		}],
		constant: /\b[A-Z][A-Z\d_]*\b/
	}), Prism.languages.insertBefore("javascript", "string", {
		"template-string": {
			pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
			greedy: !0,
			inside: {
				interpolation: {
					pattern: /\${[^}]+}/,
					inside: {
						"interpolation-punctuation": {
							pattern: /^\${|}$/,
							alias: "punctuation"
						},
						rest: Prism.languages.javascript
					}
				},
				string: /[\s\S]+/
			}
		}
	}), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
		script: {
			pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
			lookbehind: !0,
			inside: Prism.languages.javascript,
			alias: "language-javascript",
			greedy: !0
		}
	}), Prism.languages.js = Prism.languages.javascript, Prism.languages.c = Prism.languages.extend("clike", {
		keyword: /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
		operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
		number: /(?:\b0x[\da-f]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ful]*/i
	}), Prism.languages.insertBefore("c", "string", {
		macro: {
			pattern: /(^\s*)#\s*[a-z]+(?:[^\r\n\\]|\\(?:\r\n|[\s\S]))*/im,
			lookbehind: !0,
			alias: "property",
			inside: {
				string: {
					pattern: /(#\s*include\s*)(?:<.+?>|("|')(?:\\?.)+?\2)/,
					lookbehind: !0
				},
				directive: {
					pattern: /(#\s*)\b(?:define|defined|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/,
					lookbehind: !0,
					alias: "keyword"
				}
			}
		},
		constant: /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/
	}), delete Prism.languages.c["class-name"], delete Prism.languages.c.boolean, Prism.languages.csharp = Prism.languages.extend("clike", {
		keyword: /\b(?:abstract|add|alias|as|ascending|async|await|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|descending|do|double|dynamic|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|from|get|global|goto|group|if|implicit|in|int|interface|internal|into|is|join|let|lock|long|namespace|new|null|object|operator|orderby|out|override|params|partial|private|protected|public|readonly|ref|remove|return|sbyte|sealed|select|set|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|value|var|virtual|void|volatile|where|while|yield)\b/,
		string: [{
			pattern: /@("|')(?:\1\1|\\[\s\S]|(?!\1)[^\\])*\1/,
			greedy: !0
		}, {
			pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*?\1/,
			greedy: !0
		}],
		"class-name": [{
			pattern: /\b[A-Z]\w*(?:\.\w+)*\b(?=\s+\w+)/,
			inside: {
				punctuation: /\./
			}
		}, {
			pattern: /(\[)[A-Z]\w*(?:\.\w+)*\b/,
			lookbehind: !0,
			inside: {
				punctuation: /\./
			}
		}, {
			pattern: /(\b(?:class|interface)\s+[A-Z]\w*(?:\.\w+)*\s*:\s*)[A-Z]\w*(?:\.\w+)*\b/,
			lookbehind: !0,
			inside: {
				punctuation: /\./
			}
		}, {
			pattern: /((?:\b(?:class|interface|new)\s+)|(?:catch\s+\())[A-Z]\w*(?:\.\w+)*\b/,
			lookbehind: !0,
			inside: {
				punctuation: /\./
			}
		}],
		number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)f?/i,
		operator: />>=?|<<=?|[-=]>|([-+&|?])\1|~|[-+*/%&|^!=<>]=?/,
		punctuation: /\?\.?|::|[{}[\];(),.:]/
	}), Prism.languages.insertBefore("csharp", "class-name", {
		"generic-method": {
			pattern: /\w+\s*<[^>\r\n]+?>\s*(?=\()/,
			inside: {
				function: /^\w+/,
				"class-name": {
					pattern: /\b[A-Z]\w*(?:\.\w+)*\b/,
					inside: {
						punctuation: /\./
					}
				},
				keyword: Prism.languages.csharp.keyword,
				punctuation: /[<>(),.:]/
			}
		},
		preprocessor: {
			pattern: /(^\s*)#.*/m,
			lookbehind: !0,
			alias: "property",
			inside: {
				directive: {
					pattern: /(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,
					lookbehind: !0,
					alias: "keyword"
				}
			}
		}
	}), Prism.languages.dotnet = Prism.languages.csharp, Prism.languages.cpp = Prism.languages.extend("c", {
		keyword: /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
		boolean: /\b(?:true|false)\b/,
		operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/
	}), Prism.languages.insertBefore("cpp", "keyword", {
		"class-name": {
			pattern: /(class\s+)\w+/i,
			lookbehind: !0
		}
	}), Prism.languages.insertBefore("cpp", "string", {
		"raw-string": {
			pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
			alias: "string",
			greedy: !0
		}
	}),
	function(e) {
		e.languages.ruby = e.languages.extend("clike", {
			comment: [/#.*/, {
				pattern: /^=begin(?:\r?\n|\r)(?:.*(?:\r?\n|\r))*?=end/m,
				greedy: !0
			}],
			keyword: /\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|protected|private|public|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/
		});
		var t = {
			pattern: /#\{[^}]+\}/,
			inside: {
				delimiter: {
					pattern: /^#\{|\}$/,
					alias: "tag"
				},
				rest: e.languages.ruby
			}
		};
		delete e.languages.ruby.function, e.languages.insertBefore("ruby", "keyword", {
			regex: [{
				pattern: /%r([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[gim]{0,3}/,
				greedy: !0,
				inside: {
					interpolation: t
				}
			}, {
				pattern: /%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,
				greedy: !0,
				inside: {
					interpolation: t
				}
			}, {
				pattern: /%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,
				greedy: !0,
				inside: {
					interpolation: t
				}
			}, {
				pattern: /%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,
				greedy: !0,
				inside: {
					interpolation: t
				}
			}, {
				pattern: /%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,
				greedy: !0,
				inside: {
					interpolation: t
				}
			}, {
				pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,
				lookbehind: !0,
				greedy: !0
			}],
			variable: /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
			symbol: {
				pattern: /(^|[^:]):[a-zA-Z_]\w*(?:[?!]|\b)/,
				lookbehind: !0
			},
			"method-definition": {
				pattern: /(\bdef\s+)[\w.]+/,
				lookbehind: !0,
				inside: {
					function: /\w+$/,
					rest: e.languages.ruby
				}
			}
		}), e.languages.insertBefore("ruby", "number", {
			builtin: /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
			constant: /\b[A-Z]\w*(?:[?!]|\b)/
		}), e.languages.ruby.string = [{
			pattern: /%[qQiIwWxs]?([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
			greedy: !0,
			inside: {
				interpolation: t
			}
		}, {
			pattern: /%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,
			greedy: !0,
			inside: {
				interpolation: t
			}
		}, {
			pattern: /%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,
			greedy: !0,
			inside: {
				interpolation: t
			}
		}, {
			pattern: /%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,
			greedy: !0,
			inside: {
				interpolation: t
			}
		}, {
			pattern: /%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,
			greedy: !0,
			inside: {
				interpolation: t
			}
		}, {
			pattern: /("|')(?:#\{[^}]+\}|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
			greedy: !0,
			inside: {
				interpolation: t
			}
		}], e.languages.rb = e.languages.ruby
	}(Prism), Prism.languages.css.selector = {
		pattern: Prism.languages.css.selector,
		inside: {
			"pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
			"pseudo-class": /:[-\w]+(?:\(.*\))?/,
			class: /\.[-:.\w]+/,
			id: /#[-:.\w]+/,
			attribute: /\[[^\]]+\]/
		}
	}, Prism.languages.insertBefore("css", "property", {
		variable: {
			pattern: /(^|[^-\w\xA0-\uFFFF])--[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*/i,
			lookbehind: !0
		}
	}), Prism.languages.insertBefore("css", "function", {
		operator: {
			pattern: /(\s)[+\-*\/](?=\s)/,
			lookbehind: !0
		},
		hexcode: /#[\da-f]{3,8}/i,
		entity: /\\[\da-f]{1,8}/i,
		unit: {
			pattern: /(\d)(?:%|[a-z]+)/,
			lookbehind: !0
		},
		number: /-?[\d.]+/
	}), Prism.languages.docker = {
		keyword: {
			pattern: /(^\s*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)/im,
			lookbehind: !0
		},
		string: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
		comment: /#.*/,
		punctuation: /---|\.\.\.|[:[\]{}\-,|>?]/
	}, Prism.languages.dockerfile = Prism.languages.docker, Prism.languages["markup-templating"] = {}, Object.defineProperties(Prism.languages["markup-templating"], {
		buildPlaceholders: {
			value: function(e, t, i, n) {
				e.language === t && (e.tokenStack = [], e.code = e.code.replace(i, function(i) {
					if("function" == typeof n && !n(i)) return i;
					for(var s = e.tokenStack.length; - 1 !== e.code.indexOf("___" + t.toUpperCase() + s + "___");) ++s;
					return e.tokenStack[s] = i, "___" + t.toUpperCase() + s + "___"
				}), e.grammar = Prism.languages.markup)
			}
		},
		tokenizePlaceholders: {
			value: function(e, t) {
				if(e.language === t && e.tokenStack) {
					e.grammar = Prism.languages[t];
					var i = 0,
						n = Object.keys(e.tokenStack),
						s = function(r) {
							if(!(i >= n.length))
								for(var o = 0; o < r.length; o++) {
									var a = r[o];
									if("string" == typeof a || a.content && "string" == typeof a.content) {
										var l = n[i],
											c = e.tokenStack[l],
											u = "string" == typeof a ? a : a.content,
											h = u.indexOf("___" + t.toUpperCase() + l + "___");
										if(h > -1) {
											++i;
											var d, f = u.substring(0, h),
												p = new Prism.Token(t, Prism.tokenize(c, e.grammar, t), "language-" + t, c),
												m = u.substring(h + ("___" + t.toUpperCase() + l + "___").length);
											if(f || m ? (d = [f, p, m].filter(function(e) {
													return !!e
												}), s(d)) : d = p, "string" == typeof a ? Array.prototype.splice.apply(r, [o, 1].concat(d)) : a.content = d, i >= n.length) break
										}
									} else a.content && "string" != typeof a.content && s(a.content)
								}
						};
					s(e.tokens)
				}
			}
		}
	}), Prism.languages.git = {
		comment: /^#.*/m,
		deleted: /^[-–].*/m,
		inserted: /^\+.*/m,
		string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,
		command: {
			pattern: /^.*\$ git .*$/m,
			inside: {
				parameter: /\s--?\w+/m
			}
		},
		coord: /^@@.*@@$/m,
		commit_sha1: /^commit \w{40}$/m
	},
	function(e) {
		e.languages.http = {
			"request-line": {
				pattern: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\s(?:https?:\/\/|\/)\S+\sHTTP\/[0-9.]+/m,
				inside: {
					property: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,
					"attr-name": /:\w+/
				}
			},
			"response-status": {
				pattern: /^HTTP\/1.[01] \d+.*/m,
				inside: {
					property: {
						pattern: /(^HTTP\/1.[01] )\d+.*/i,
						lookbehind: !0
					}
				}
			},
			"header-name": {
				pattern: /^[\w-]+:(?=.)/m,
				alias: "keyword"
			}
		};
		var t, i = e.languages,
			n = {
				"application/javascript": i.javascript,
				"application/json": i.json || i.javascript,
				"application/xml": i.xml,
				"text/xml": i.xml,
				"text/html": i.html,
				"text/css": i.css
			},
			s = {
				"application/json": !0,
				"application/xml": !0
			};

		function r(e) {
			var t = e.replace(/^[a-z]+\//, "");
			return "(?:" + e + "|" + ("\\w+/(?:[\\w.-]+\\+)+" + t + "(?![+\\w.-])") + ")"
		}
		for(var o in n)
			if(n[o]) {
				t = t || {};
				var a = s[o] ? r(o) : o;
				t[o] = {
					pattern: RegExp("(content-type:\\s*" + a + "[\\s\\S]*?)(?:\\r?\\n|\\r){2}[\\s\\S]*", "i"),
					lookbehind: !0,
					inside: {
						rest: n[o]
					}
				}
			}
		t && e.languages.insertBefore("http", "header-name", t)
	}(Prism), Prism.languages.hpkp = {
		directive: {
			pattern: /\b(?:(?:includeSubDomains|preload|strict)(?: |;)|pin-sha256="[a-zA-Z\d+=/]+"|(?:max-age|report-uri)=|report-to )/,
			alias: "keyword"
		},
		safe: {
			pattern: /\d{7,}/,
			alias: "selector"
		},
		unsafe: {
			pattern: /\d{0,6}/,
			alias: "function"
		}
	}, Prism.languages.icon = {
		comment: /#.*/,
		string: {
			pattern: /(["'])(?:(?!\1)[^\\\r\n_]|\\.|_(?!\1)(?:\r\n|[\s\S]))*\1/,
			greedy: !0
		},
		number: /\b(?:\d+r[a-z\d]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b|\.\d+\b/i,
		"builtin-keyword": {
			pattern: /&(?:allocated|ascii|clock|collections|cset|current|date|dateline|digits|dump|e|error(?:number|text|value)?|errout|fail|features|file|host|input|lcase|letters|level|line|main|null|output|phi|pi|pos|progname|random|regions|source|storage|subject|time|trace|ucase|version)\b/,
			alias: "variable"
		},
		directive: {
			pattern: /\$\w+/,
			alias: "builtin"
		},
		keyword: /\b(?:break|by|case|create|default|do|else|end|every|fail|global|if|initial|invocable|link|local|next|not|of|procedure|record|repeat|return|static|suspend|then|to|until|while)\b/,
		function: /(?!\d)\w+(?=\s*[({]|\s*!\s*\[)/,
		operator: /[+-]:(?!=)|(?:[\/?@^%&]|\+\+?|--?|==?=?|~==?=?|\*\*?|\|\|\|?|<(?:->?|<?=?)|>>?=?)(?::=)?|:(?:=:?)?|[!.\\|~]/,
		punctuation: /[\[\](){},;]/
	},
	function(e) {
		var t = /\b(?:abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while|var|null|exports|module|open|opens|provides|requires|to|transitive|uses|with)\b/,
			i = /\b[A-Z](?:\w*[a-z]\w*)?\b/;
		e.languages.java = e.languages.extend("clike", {
			"class-name": [i, /\b[A-Z]\w*(?=\s+\w+\s*[;,=())])/],
			keyword: t,
			function: [e.languages.clike.function, {
				pattern: /(\:\:)[a-z_]\w*/,
				lookbehind: !0
			}],
			number: /\b0b[01][01_]*L?\b|\b0x[\da-f_]*\.?[\da-f_p+-]+\b|(?:\b\d[\d_]*\.?[\d_]*|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
			operator: {
				pattern: /(^|[^.])(?:<<=?|>>>?=?|->|([-+&|])\2|[?:~]|[-+*/%&|^!=<>]=?)/m,
				lookbehind: !0
			}
		}), e.languages.insertBefore("java", "class-name", {
			annotation: {
				alias: "punctuation",
				pattern: /(^|[^.])@\w+/,
				lookbehind: !0
			},
			namespace: {
				pattern: /(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)[a-z]\w*(\.[a-z]\w*)+/,
				lookbehind: !0,
				inside: {
					punctuation: /\./
				}
			},
			generics: {
				pattern: /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
				inside: {
					"class-name": i,
					keyword: t,
					punctuation: /[<>(),.:]/,
					operator: /[?&|]/
				}
			}
		})
	}(Prism), Prism.languages.json = {
		comment: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
		property: {
			pattern: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
			greedy: !0
		},
		string: {
			pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
			greedy: !0
		},
		number: /-?\d+\.?\d*(e[+-]?\d+)?/i,
		punctuation: /[{}[\],]/,
		operator: /:/,
		boolean: /\b(?:true|false)\b/,
		null: /\bnull\b/
	}, Prism.languages.jsonp = Prism.languages.json, Prism.languages.nginx = Prism.languages.extend("clike", {
		comment: {
			pattern: /(^|[^"{\\])#.*/,
			lookbehind: !0
		},
		keyword: /\b(?:CONTENT_|DOCUMENT_|GATEWAY_|HTTP_|HTTPS|if_not_empty|PATH_|QUERY_|REDIRECT_|REMOTE_|REQUEST_|SCGI|SCRIPT_|SERVER_|http|events|accept_mutex|accept_mutex_delay|access_log|add_after_body|add_before_body|add_header|addition_types|aio|alias|allow|ancient_browser|ancient_browser_value|auth|auth_basic|auth_basic_user_file|auth_http|auth_http_header|auth_http_timeout|autoindex|autoindex_exact_size|autoindex_localtime|break|charset|charset_map|charset_types|chunked_transfer_encoding|client_body_buffer_size|client_body_in_file_only|client_body_in_single_buffer|client_body_temp_path|client_body_timeout|client_header_buffer_size|client_header_timeout|client_max_body_size|connection_pool_size|create_full_put_path|daemon|dav_access|dav_methods|debug_connection|debug_points|default_type|deny|devpoll_changes|devpoll_events|directio|directio_alignment|disable_symlinks|empty_gif|env|epoll_events|error_log|error_page|expires|fastcgi_buffer_size|fastcgi_buffers|fastcgi_busy_buffers_size|fastcgi_cache|fastcgi_cache_bypass|fastcgi_cache_key|fastcgi_cache_lock|fastcgi_cache_lock_timeout|fastcgi_cache_methods|fastcgi_cache_min_uses|fastcgi_cache_path|fastcgi_cache_purge|fastcgi_cache_use_stale|fastcgi_cache_valid|fastcgi_connect_timeout|fastcgi_hide_header|fastcgi_ignore_client_abort|fastcgi_ignore_headers|fastcgi_index|fastcgi_intercept_errors|fastcgi_keep_conn|fastcgi_max_temp_file_size|fastcgi_next_upstream|fastcgi_no_cache|fastcgi_param|fastcgi_pass|fastcgi_pass_header|fastcgi_read_timeout|fastcgi_redirect_errors|fastcgi_send_timeout|fastcgi_split_path_info|fastcgi_store|fastcgi_store_access|fastcgi_temp_file_write_size|fastcgi_temp_path|flv|geo|geoip_city|geoip_country|google_perftools_profiles|gzip|gzip_buffers|gzip_comp_level|gzip_disable|gzip_http_version|gzip_min_length|gzip_proxied|gzip_static|gzip_types|gzip_vary|if|if_modified_since|ignore_invalid_headers|image_filter|image_filter_buffer|image_filter_jpeg_quality|image_filter_sharpen|image_filter_transparency|imap_capabilities|imap_client_buffer|include|index|internal|ip_hash|keepalive|keepalive_disable|keepalive_requests|keepalive_timeout|kqueue_changes|kqueue_events|large_client_header_buffers|limit_conn|limit_conn_log_level|limit_conn_zone|limit_except|limit_rate|limit_rate_after|limit_req|limit_req_log_level|limit_req_zone|limit_zone|lingering_close|lingering_time|lingering_timeout|listen|location|lock_file|log_format|log_format_combined|log_not_found|log_subrequest|map|map_hash_bucket_size|map_hash_max_size|master_process|max_ranges|memcached_buffer_size|memcached_connect_timeout|memcached_next_upstream|memcached_pass|memcached_read_timeout|memcached_send_timeout|merge_slashes|min_delete_depth|modern_browser|modern_browser_value|mp4|mp4_buffer_size|mp4_max_buffer_size|msie_padding|msie_refresh|multi_accept|open_file_cache|open_file_cache_errors|open_file_cache_min_uses|open_file_cache_valid|open_log_file_cache|optimize_server_names|override_charset|pcre_jit|perl|perl_modules|perl_require|perl_set|pid|pop3_auth|pop3_capabilities|port_in_redirect|post_action|postpone_output|protocol|proxy|proxy_buffer|proxy_buffer_size|proxy_buffering|proxy_buffers|proxy_busy_buffers_size|proxy_cache|proxy_cache_bypass|proxy_cache_key|proxy_cache_lock|proxy_cache_lock_timeout|proxy_cache_methods|proxy_cache_min_uses|proxy_cache_path|proxy_cache_use_stale|proxy_cache_valid|proxy_connect_timeout|proxy_cookie_domain|proxy_cookie_path|proxy_headers_hash_bucket_size|proxy_headers_hash_max_size|proxy_hide_header|proxy_http_version|proxy_ignore_client_abort|proxy_ignore_headers|proxy_intercept_errors|proxy_max_temp_file_size|proxy_method|proxy_next_upstream|proxy_no_cache|proxy_pass|proxy_pass_error_message|proxy_pass_header|proxy_pass_request_body|proxy_pass_request_headers|proxy_read_timeout|proxy_redirect|proxy_redirect_errors|proxy_send_lowat|proxy_send_timeout|proxy_set_body|proxy_set_header|proxy_ssl_session_reuse|proxy_store|proxy_store_access|proxy_temp_file_write_size|proxy_temp_path|proxy_timeout|proxy_upstream_fail_timeout|proxy_upstream_max_fails|random_index|read_ahead|real_ip_header|recursive_error_pages|request_pool_size|reset_timedout_connection|resolver|resolver_timeout|return|rewrite|root|rtsig_overflow_events|rtsig_overflow_test|rtsig_overflow_threshold|rtsig_signo|satisfy|satisfy_any|secure_link_secret|send_lowat|send_timeout|sendfile|sendfile_max_chunk|server|server_name|server_name_in_redirect|server_names_hash_bucket_size|server_names_hash_max_size|server_tokens|set|set_real_ip_from|smtp_auth|smtp_capabilities|so_keepalive|source_charset|split_clients|ssi|ssi_silent_errors|ssi_types|ssi_value_length|ssl|ssl_certificate|ssl_certificate_key|ssl_ciphers|ssl_client_certificate|ssl_crl|ssl_dhparam|ssl_engine|ssl_prefer_server_ciphers|ssl_protocols|ssl_session_cache|ssl_session_timeout|ssl_verify_client|ssl_verify_depth|starttls|stub_status|sub_filter|sub_filter_once|sub_filter_types|tcp_nodelay|tcp_nopush|timeout|timer_resolution|try_files|types|types_hash_bucket_size|types_hash_max_size|underscores_in_headers|uninitialized_variable_warn|upstream|use|user|userid|userid_domain|userid_expires|userid_name|userid_p3p|userid_path|userid_service|valid_referers|variables_hash_bucket_size|variables_hash_max_size|worker_connections|worker_cpu_affinity|worker_priority|worker_processes|worker_rlimit_core|worker_rlimit_nofile|worker_rlimit_sigpending|working_directory|xclient|xml_entities|xslt_entities|xslt_stylesheet|xslt_types|ssl_session_tickets|ssl_stapling|ssl_stapling_verify|ssl_ecdh_curve|ssl_trusted_certificate|more_set_headers|ssl_early_data)\b/i
	}), Prism.languages.insertBefore("nginx", "keyword", {
		variable: /\$[a-z_]+/i
	}),
	function(e) {
		e.languages.php = e.languages.extend("clike", {
			keyword: /\b(?:and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
			constant: /\b[A-Z0-9_]{2,}\b/,
			comment: {
				pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
				lookbehind: !0
			}
		}), e.languages.insertBefore("php", "string", {
			"shell-comment": {
				pattern: /(^|[^\\])#.*/,
				lookbehind: !0,
				alias: "comment"
			}
		}), e.languages.insertBefore("php", "keyword", {
			delimiter: {
				pattern: /\?>|<\?(?:php|=)?/i,
				alias: "important"
			},
			variable: /\$+(?:\w+\b|(?={))/i,
			package: {
				pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
				lookbehind: !0,
				inside: {
					punctuation: /\\/
				}
			}
		}), e.languages.insertBefore("php", "operator", {
			property: {
				pattern: /(->)[\w]+/,
				lookbehind: !0
			}
		});
		var t = {
			pattern: /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[.+?]|->\w+)*)/,
			lookbehind: !0,
			inside: {
				rest: e.languages.php
			}
		};
		e.languages.insertBefore("php", "string", {
			"nowdoc-string": {
				pattern: /<<<'([^']+)'(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;/,
				greedy: !0,
				alias: "string",
				inside: {
					delimiter: {
						pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
						alias: "symbol",
						inside: {
							punctuation: /^<<<'?|[';]$/
						}
					}
				}
			},
			"heredoc-string": {
				pattern: /<<<(?:"([^"]+)"(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;|([a-z_]\w*)(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\2;)/i,
				greedy: !0,
				alias: "string",
				inside: {
					delimiter: {
						pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
						alias: "symbol",
						inside: {
							punctuation: /^<<<"?|[";]$/
						}
					},
					interpolation: t
				}
			},
			"single-quoted-string": {
				pattern: /'(?:\\[\s\S]|[^\\'])*'/,
				greedy: !0,
				alias: "string"
			},
			"double-quoted-string": {
				pattern: /"(?:\\[\s\S]|[^\\"])*"/,
				greedy: !0,
				alias: "string",
				inside: {
					interpolation: t
				}
			}
		}), delete e.languages.php.string, e.hooks.add("before-tokenize", function(t) {
			if(/(?:<\?php|<\?)/gi.test(t.code)) {
				e.languages["markup-templating"].buildPlaceholders(t, "php", /(?:<\?php|<\?)[\s\S]*?(?:\?>|$)/gi)
			}
		}), e.hooks.add("after-tokenize", function(t) {
			e.languages["markup-templating"].tokenizePlaceholders(t, "php")
		})
	}(Prism), Prism.languages.insertBefore("php", "variable", {
		this: /\$this\b/,
		global: /\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)\b/,
		scope: {
			pattern: /\b[\w\\]+::/,
			inside: {
				keyword: /static|self|parent/,
				punctuation: /::|\\/
			}
		}
	}), Prism.languages.sql = {
		comment: {
			pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
			lookbehind: !0
		},
		variable: [{
			pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
			greedy: !0
		}, /@[\w.$]+/],
		string: {
			pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
			greedy: !0,
			lookbehind: !0
		},
		function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
		keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
		boolean: /\b(?:TRUE|FALSE|NULL)\b/i,
		number: /\b0x[\da-f]+\b|\b\d+\.?\d*|\B\.\d+\b/i,
		operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
		punctuation: /[;[\]()`,.]/
	}, Prism.languages.scss = Prism.languages.extend("css", {
		comment: {
			pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
			lookbehind: !0
		},
		atrule: {
			pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
			inside: {
				rule: /@[\w-]+/
			}
		},
		url: /(?:[-a-z]+-)*url(?=\()/i,
		selector: {
			pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()]|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}]+[:{][^}]+))/m,
			inside: {
				parent: {
					pattern: /&/,
					alias: "important"
				},
				placeholder: /%[-\w]+/,
				variable: /\$[-\w]+|#\{\$[-\w]+\}/
			}
		},
		property: {
			pattern: /(?:[\w-]|\$[-\w]+|#\{\$[-\w]+\})+(?=\s*:)/,
			inside: {
				variable: /\$[-\w]+|#\{\$[-\w]+\}/
			}
		}
	}), Prism.languages.insertBefore("scss", "atrule", {
		keyword: [/@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i, {
			pattern: /( +)(?:from|through)(?= )/,
			lookbehind: !0
		}]
	}), Prism.languages.insertBefore("scss", "important", {
		variable: /\$[-\w]+|#\{\$[-\w]+\}/
	}), Prism.languages.insertBefore("scss", "function", {
		placeholder: {
			pattern: /%[-\w]+/,
			alias: "selector"
		},
		statement: {
			pattern: /\B!(?:default|optional)\b/i,
			alias: "keyword"
		},
		boolean: /\b(?:true|false)\b/,
		null: /\bnull\b/,
		operator: {
			pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
			lookbehind: !0
		}
	}), Prism.languages.scss.atrule.inside.rest = Prism.languages.scss, Prism.languages.python = {
		comment: {
			pattern: /(^|[^\\])#.*/,
			lookbehind: !0
		},
		"string-interpolation": {
			pattern: /(?:f|rf|fr)(?:("""|''')[\s\S]+?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
			greedy: !0,
			inside: {
				interpolation: {
					pattern: /((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,
					lookbehind: !0,
					inside: {
						"format-spec": {
							pattern: /(:)[^:(){}]+(?=}$)/,
							lookbehind: !0
						},
						"conversion-option": {
							pattern: /![sra](?=[:}]$)/,
							alias: "punctuation"
						},
						rest: null
					}
				},
				string: /[\s\S]+/
			}
		},
		"triple-quoted-string": {
			pattern: /(?:[rub]|rb|br)?("""|''')[\s\S]+?\1/i,
			greedy: !0,
			alias: "string"
		},
		string: {
			pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
			greedy: !0
		},
		function: {
			pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
			lookbehind: !0
		},
		"class-name": {
			pattern: /(\bclass\s+)\w+/i,
			lookbehind: !0
		},
		decorator: {
			pattern: /(^\s*)@\w+(?:\.\w+)*/i,
			lookbehind: !0,
			alias: ["annotation", "punctuation"],
			inside: {
				punctuation: /\./
			}
		},
		keyword: /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
		builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
		boolean: /\b(?:True|False|None)\b/,
		number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
		operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
		punctuation: /[{}[\];(),.:]/
	}, Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest = Prism.languages.python, Prism.languages.py = Prism.languages.python, Prism.languages.sas = {
		datalines: {
			pattern: /^\s*(?:(?:data)?lines|cards);[\s\S]+?(?:\r?\n|\r);/im,
			alias: "string",
			inside: {
				keyword: {
					pattern: /^(\s*)(?:(?:data)?lines|cards)/i,
					lookbehind: !0
				},
				punctuation: /;/
			}
		},
		comment: [{
			pattern: /(^\s*|;\s*)\*.*;/m,
			lookbehind: !0
		}, /\/\*[\s\S]+?\*\//],
		datetime: {
			pattern: /'[^']+'(?:dt?|t)\b/i,
			alias: "number"
		},
		string: {
			pattern: /(["'])(?:\1\1|(?!\1)[\s\S])*\1/,
			greedy: !0
		},
		keyword: /\b(?:data|else|format|if|input|proc\s\w+|quit|run|then)\b/i,
		number: /\b(?:[\da-f]+x|\d+(?:\.\d+)?(?:e[+-]?\d+)?)/i,
		operator: /\*\*?|\|\|?|!!?|¦¦?|<[>=]?|>[<=]?|[-+\/=&]|[~¬^]=?|\b(?:eq|ne|gt|lt|ge|le|in|not)\b/i,
		punctuation: /[$%@.(){}\[\];,\\]/
	},
	function(e) {
		e.languages.sass = e.languages.extend("css", {
			comment: {
				pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m,
				lookbehind: !0
			}
		}), e.languages.insertBefore("sass", "atrule", {
			"atrule-line": {
				pattern: /^(?:[ \t]*)[@+=].+/m,
				inside: {
					atrule: /(?:@[\w-]+|[+=])/m
				}
			}
		}), delete e.languages.sass.atrule;
		var t = /\$[-\w]+|#\{\$[-\w]+\}/,
			i = [/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/, {
				pattern: /(\s+)-(?=\s)/,
				lookbehind: !0
			}];
		e.languages.insertBefore("sass", "property", {
			"variable-line": {
				pattern: /^[ \t]*\$.+/m,
				inside: {
					punctuation: /:/,
					variable: t,
					operator: i
				}
			},
			"property-line": {
				pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,
				inside: {
					property: [/[^:\s]+(?=\s*:)/, {
						pattern: /(:)[^:\s]+/,
						lookbehind: !0
					}],
					punctuation: /:/,
					variable: t,
					operator: i,
					important: e.languages.sass.important
				}
			}
		}), delete e.languages.sass.property, delete e.languages.sass.important, e.languages.insertBefore("sass", "punctuation", {
			selector: {
				pattern: /([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,
				lookbehind: !0
			}
		})
	}(Prism), Prism.languages.scheme = {
		comment: /;.*/,
		string: {
			pattern: /"(?:[^"\\\r\n]|\\.)*"|'[^()#'\s]+/,
			greedy: !0
		},
		character: {
			pattern: /#\\(?:u[a-fA-F\d]{4}|[a-zA-Z]+|\S)/,
			alias: "string"
		},
		keyword: {
			pattern: /(\()(?:define(?:-syntax|-library|-values)?|(?:case-)?lambda|let(?:\*|rec)?(?:-values)?|else|if|cond|begin|delay(?:-force)?|parameterize|guard|set!|(?:quasi-)?quote|syntax-rules)(?=[()\s])/,
			lookbehind: !0
		},
		builtin: {
			pattern: /(\()(?:(?:cons|car|cdr|list|call-with-current-continuation|call\/cc|append|abs|apply|eval)\b|null\?|pair\?|boolean\?|eof-object\?|char\?|procedure\?|number\?|port\?|string\?|vector\?|symbol\?|bytevector\?)(?=[()\s])/,
			lookbehind: !0
		},
		number: {
			pattern: /(\s|[()])[-+]?\d*\.?\d+(?:\s*[-+]\s*\d*\.?\d+i)?\b/,
			lookbehind: !0
		},
		boolean: /#[tf]/,
		operator: {
			pattern: /(\()(?:[-+*%\/]|[<>]=?|=>?)/,
			lookbehind: !0
		},
		function: {
			pattern: /(\()[^()#'\s]+(?=[()\s)])/,
			lookbehind: !0
		},
		punctuation: /[()']/
	}, Prism.languages.plsql = Prism.languages.extend("sql", {
		comment: [/\/\*[\s\S]*?\*\//, /--.*/]
	}), "Array" !== Prism.util.type(Prism.languages.plsql.keyword) && (Prism.languages.plsql.keyword = [Prism.languages.plsql.keyword]), Prism.languages.plsql.keyword.unshift(/\b(?:ACCESS|AGENT|AGGREGATE|ARRAY|ARROW|AT|ATTRIBUTE|AUDIT|AUTHID|BFILE_BASE|BLOB_BASE|BLOCK|BODY|BOTH|BOUND|BYTE|CALLING|CHAR_BASE|CHARSET(?:FORM|ID)|CLOB_BASE|COLAUTH|COLLECT|CLUSTERS?|COMPILED|COMPRESS|CONSTANT|CONSTRUCTOR|CONTEXT|CRASH|CUSTOMDATUM|DANGLING|DATE_BASE|DEFINE|DETERMINISTIC|DURATION|ELEMENT|EMPTY|EXCEPTIONS?|EXCLUSIVE|EXTERNAL|FINAL|FORALL|FORM|FOUND|GENERAL|HEAP|HIDDEN|IDENTIFIED|IMMEDIATE|INCLUDING|INCREMENT|INDICATOR|INDEXES|INDICES|INFINITE|INITIAL|ISOPEN|INSTANTIABLE|INTERFACE|INVALIDATE|JAVA|LARGE|LEADING|LENGTH|LIBRARY|LIKE[24C]|LIMITED|LONG|LOOP|MAP|MAXEXTENTS|MAXLEN|MEMBER|MINUS|MLSLABEL|MULTISET|NAME|NAN|NATIVE|NEW|NOAUDIT|NOCOMPRESS|NOCOPY|NOTFOUND|NOWAIT|NUMBER(?:_BASE)?|OBJECT|OCI(?:COLL|DATE|DATETIME|DURATION|INTERVAL|LOBLOCATOR|NUMBER|RAW|REF|REFCURSOR|ROWID|STRING|TYPE)|OFFLINE|ONLINE|ONLY|OPAQUE|OPERATOR|ORACLE|ORADATA|ORGANIZATION|ORL(?:ANY|VARY)|OTHERS|OVERLAPS|OVERRIDING|PACKAGE|PARALLEL_ENABLE|PARAMETERS?|PASCAL|PCTFREE|PIPE(?:LINED)?|PRAGMA|PRIOR|PRIVATE|RAISE|RANGE|RAW|RECORD|REF|REFERENCE|REM|REMAINDER|RESULT|RESOURCE|RETURNING|REVERSE|ROW(?:ID|NUM|TYPE)|SAMPLE|SB[124]|SEGMENT|SELF|SEPARATE|SEQUENCE|SHORT|SIZE(?:_T)?|SPARSE|SQL(?:CODE|DATA|NAME|STATE)|STANDARD|STATIC|STDDEV|STORED|STRING|STRUCT|STYLE|SUBMULTISET|SUBPARTITION|SUBSTITUTABLE|SUBTYPE|SUCCESSFUL|SYNONYM|SYSDATE|TABAUTH|TDO|THE|TIMEZONE_(?:ABBR|HOUR|MINUTE|REGION)|TRAILING|TRANSAC(?:TIONAL)?|TRUSTED|UB[124]|UID|UNDER|UNTRUSTED|VALIDATE|VALIST|VARCHAR2|VARIABLE|VARIANCE|VARRAY|VIEWS|VOID|WHENEVER|WRAPPED|ZONE)\b/i), "Array" !== Prism.util.type(Prism.languages.plsql.operator) && (Prism.languages.plsql.operator = [Prism.languages.plsql.operator]), Prism.languages.plsql.operator.unshift(/:=/),
	function() {
		if("undefined" != typeof self && self.Prism && self.document) {
			var e = [],
				t = {},
				i = function() {};
			Prism.plugins.toolbar = {};
			var n = Prism.plugins.toolbar.registerButton = function(i, n) {
					var s;
					s = "function" == typeof n ? n : function(e) {
						var t;
						return "function" == typeof n.onClick ? ((t = document.createElement("button")).type = "button", t.addEventListener("click", function() {
							n.onClick.call(this, e)
						})) : "string" == typeof n.url ? (t = document.createElement("a")).href = n.url : t = document.createElement("span"), t.textContent = n.text, t
					}, e.push(t[i] = s)
				},
				s = Prism.plugins.toolbar.hook = function(n) {
					var s = n.element.parentNode;
					if(s && /pre/i.test(s.nodeName) && !s.parentNode.classList.contains("code-toolbar")) {
						var r = document.createElement("div");
						r.classList.add("code-toolbar"), s.parentNode.insertBefore(r, s), r.appendChild(s);
						var o = document.createElement("div");
						o.classList.add("toolbar"), document.body.hasAttribute("data-toolbar-order") && (e = document.body.getAttribute("data-toolbar-order").split(",").map(function(e) {
							return t[e] || i
						})), e.forEach(function(e) {
							var t = e(n);
							if(t) {
								var i = document.createElement("div");
								i.classList.add("toolbar-item"), i.appendChild(t), o.appendChild(i)
							}
						}), r.appendChild(o)
					}
				};
			n("label", function(e) {
				var t = e.element.parentNode;
				if(t && /pre/i.test(t.nodeName) && t.hasAttribute("data-label")) {
					var i, n, s = t.getAttribute("data-label");
					try {
						n = document.querySelector("template#" + s)
					} catch(e) {}
					return n ? i = n.content : (t.hasAttribute("data-url") ? (i = document.createElement("a")).href = t.getAttribute("data-url") : i = document.createElement("span"), i.textContent = s), i
				}
			}), Prism.hooks.add("complete", s)
		}
	}(),
	function() {
		if("undefined" != typeof self && self.Prism && self.document)
			if(Prism.plugins.toolbar) {
				var e = window.ClipboardJS || void 0;
				e || "function" != typeof require || (e = require("clipboard"));
				var t = [];
				if(!e) {
					var i = document.createElement("script"),
						n = document.querySelector("head");
					i.onload = function() {
						if(e = window.ClipboardJS)
							for(; t.length;) t.pop()()
					}, i.src = "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js", n.appendChild(i)
				}
				Prism.plugins.toolbar.registerButton("copy-to-clipboard", function(i) {
					var n = document.createElement("a");
					return n.textContent = "Copy", e ? s() : t.push(s), n;

					function s() {
						var t = new e(n, {
							text: function() {
								return i.code
							}
						});
						t.on("success", function() {
							n.textContent = "Copied!", r()
						}), t.on("error", function() {
							n.textContent = "Press Ctrl+C to copy", r()
						})
					}

					function r() {
						setTimeout(function() {
							n.textContent = "Copy"
						}, 5e3)
					}
				})
			} else console.warn("Copy to Clipboard plugin loaded before Toolbar plugin.")
	}();