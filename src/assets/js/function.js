var $body = $('body'), $html = $("html");
function resize() {
    if (document.createEvent) {
        var ev = document.createEvent("Event");
        ev.initEvent("resize", !0, !0), window.dispatchEvent(ev);
    } else {
        element = document.documentElement;
        var event = document.createEventObject();
        element.fireEvent("onresize", event);
    }
}
var menubar = {
    opened: null,
    folded: null,
    disableHover: null,
    $instance: null,
    init: function () {
        if ($html.removeClass("css-menubar").addClass("js-menubar"), this.$instance = $(".site-menubar"), 0 !== this.$instance.length) {
            var self = this;
            $body
                .hasClass("site-menubar-open")
                ? this.opened = !0
                : this.opened = !1, $body.hasClass("site-menubar-fold")
                ? this.folded = !0
                : (this.folded = !1, this.scrollable
                    .enable()), $body.hasClass("site-menubar-disable-hover") || this.folded
                ? this.disableHover = !0
                : (this.disableHover = !1, this.hover()), this.$instance.on("changed.site.menubar",
                function() {
                    self.update();
                });
        }
    },
    animate: function (doing, callback) {
        var self = this;
        $body.addClass("site-menubar-changing"), setTimeout(function() {
                doing.call(self), self.$instance.trigger("changing.site.menubar");
            },
            10), setTimeout(function() {
                callback.call(self), $body.removeClass("site-menubar-changing"), self.$instance
                    .trigger("changed.site.menubar");
            },
            250);
    },
    reset: function () {
        this.opened = null, $body.removeClass("site-menubar-open");
    },
    open: function () {
        this.opened !== !0 &&
            this.animate(function() {
                    $body.addClass("site-menubar-open"), this
                        .disableHover &&
                        $body.addClass("site-menubar-fixed"), this.opened = !0;
                },
                function() {
                    this.scrollable.enable(), null !== this.opened && resize();
                });
    },
    hide: function () {
        this.folded && this.scrollable.disable(), this.opened !== !1 &&
            this.animate(function() {
                    $body.removeClass("site-menubar-open site-menubar-fixed"), this.opened = !1;
                },
                function() {
                    null !== this.opened && resize();
                });
    },
    hover: function () {
        var self = this;
        this.$instance.on("mouseenter",
                function() {
                    $body.hasClass("site-menubar-fixed") || $body.hasClass("site-menubar-changing") || self.open();
                })
            .on("mouseleave",
                function() {
                    $body.hasClass("site-menubar-fixed") || self.hide();
                });
    },
    toggle: function () {
        var opened = (Breakpoints.current(), this.opened);
        null === opened || opened === !1 ? (this.disableHover = !0, this.open()) : (this.disableHover = !1, this.hide())
    },
    update: function () {
        this.scrollable.update();
    },
    scrollable: {
        api: null,
        "native": !1,
        init: function () {
            return $body.is(".site-menubar-native")
                ? void (this["native"] = !0)
                : void (this.api = menubar.$instance.children(".site-menubar-body")
                    .asScrollable({
                        namespace: "scrollable",
                        skin: "scrollable-inverse",
                        direction: "vertical",
                        contentSelector: ">",
                        containerSelector: ">"
                    })
                    .data("asScrollable"));
        },
        update: function () {
            this.api && this.api.update();
        },
        enable: function () {
            this["native"] || (this.api || this.init(), this.api && this.api.enable());
        },
        disable: function () {
            this.api && this.api.disable();
        }
    }
}
var menu = {
    speed: 250,
    accordion: !0,
    init: function () {
        this.$instance = $(".site-menu"), 0 !== this.$instance.length && this.bind();
    },
    bind: function () {
        var self = this;
        this.$instance.on("mouseenter.site.menu",
                ".site-menu-item",
                function() {
                    if (menu.folded === !0 && $(this).is(".has-sub") && $(this).parent(".site-menu").length > 0) {
                        var $sub = $(this).children(".site-menu-sub");
                        self.position($(this), $sub);
                    }
                    $(this).addClass("hover");
                })
            .on("mouseleave.site.menu",
                ".site-menu-item",
                function() {
                    menu.folded === !0 &&
                        $(this).is(".has-sub") &&
                        $(this).parent(".site-menu").length > 0 &&
                        $(this).children(".site-menu-sub").css("max-height", ""), $(this).removeClass("hover");
                })
            .on("deactive.site.menu",
                ".site-menu-item.active",
                function(e) {
                    var $item = $(this);
                    $item.removeClass("active"), e.stopPropagation();
                })
            .on("active.site.menu",
                ".site-menu-item",
                function(e) {
                    var $item = $(this);
                    $item.addClass("active"), e.stopPropagation();
                })
            .on("open.site.menu",
                ".site-menu-item",
                function(e) {
                    var $item = $(this);
                    self.expand($item,
                        function() {
                            $item.addClass("open");
                        }), self.accordion && $item.siblings(".open").trigger("close.site.menu"), e.stopPropagation()
                })
            .on("close.site.menu",
                ".site-menu-item.open",
                function(e) {
                    var $item = $(this);
                    self.collapse($item,
                        function() {
                            $item.removeClass("open");
                        }), e.stopPropagation();
                })
            .on("click.site.menu",
                ".site-menu-item",
                function(e) {
                    $(this).is(".has-sub") && $(e.target).closest(".site-menu-item").is(this)
                        ? $(this).is(".open") ? $(this).trigger("close.site.menu") : $(this).trigger("open.site.menu")
                        : $(this).is(".active") ||
                        ($(this).siblings(".active").trigger("deactive.site.menu"), $(this).trigger("active.site.menu")
                        ), e
                        .stopPropagation();
                })
            .on("scroll.site.menu",
                ".site-menu-sub",
                function(e) {
                    e.stopPropagation();
                });
    },
    collapse: function ($item, callback) {
        var self = this,
            $sub = $item.children(".site-menu-sub");
        $sub.show()
            .slideUp(this.speed,
                function() {
                    $(this).css("display", ""), $(this).find("> .site-menu-item").removeClass("is-shown"),
                        callback && callback(), self.$instance.trigger("collapsed.site.menu")
                });
    },
    expand: function ($item, callback) {
        var self = this,
            $sub = $item.children(".site-menu-sub"),
            $children = $sub.children(".site-menu-item").addClass("is-hidden");
        $sub.hide()
            .slideDown(this.speed,
                function() {
                    $(this).css("display", ""), callback && callback(), self.$instance.trigger("expanded.site.menu")
                }), setTimeout(function() {
                $children.addClass("is-shown"), $children.removeClass("is-hidden");
            },
            0);
    },
    refresh: function () {
        this.$instance.find(".open").filter(":not(.active)").removeClass("open");
    },
    position: function ($item, $dropdown) {
        var offsetTop = $item.position().top,
            menubarHeight = ($dropdown.outerHeight(), menubar.$instance.outerHeight()),
            itemHeight = $item.find("> a").outerHeight();
        $dropdown
            .removeClass("site-menu-sub-up")
            .css("max-height", ""), offsetTop > menubarHeight / 2
            ? ($dropdown.addClass("site-menu-sub-up"), menubar.foldAlt && (offsetTop -= itemHeight), $dropdown
                .css("max-height", offsetTop + itemHeight))
            : ($.site.menubar.foldAlt && (offsetTop += itemHeight), $dropdown.removeClass("site-menu-sub-up"), $dropdown
                .css("max-height", menubarHeight - offsetTop));
    }
}
$(function () {
    Breakpoints();
    $(document)
        .on('click',
            '.navbar-mega .dropdown-menu',
            function(e) {
                e.stopPropagation();
            });

    //#region Boostrap Dropdown Animation
    $(document)
        .on('show.bs.dropdown',
            function(e) {
                var $target = $(e.target);
                var $trigger = e.relatedTarget ? $(e.relatedTarget) : $target.children('[data-toggle="dropdown"]');

                var animation = $trigger.data('animation');
                if (animation) {
                    var $menu = $target.children('.dropdown-menu');
                    $menu.addClass('animation-' + animation);

                    $menu.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
                        function() {
                            $menu.removeClass('animation-' + animation);
                        });
                }
            });
    //#endregion

    //#region FullScreen
    $(document)
        .on('click',
            '[data-toggle="fullscreen"]',
            function() {
                toggleFullScreen(this);
            });
    //#endregion

    //#region MenuBar
    $(".site-menu").on('changing.site.menubar', function () {
        $('[data-toggle="menubar"]')
            .each(function() {
                var $this = $(this);
                var $hamburger = $(this).find('.hamburger');

                function toggle($el) {
                    $el.toggleClass('hided', !menubar.opened);
                    $el.toggleClass('unfolded', !menubar.folded);
                }
                if ($hamburger.length > 0) {
                    toggle($hamburger);
                } else {
                    toggle($this);
                }
            });
    });

    $(document).on('click','[data-toggle="menubar"]',function() {
        menubar.toggle();
    });
    //#endregion
});

function toggleFullScreen(elem) {
    var fullScreenDoc = document.documentElement;
    if (!document.mozFullScreen && !document.webkitFullScreen) {
        if (fullScreenDoc.mozRequestFullScreen) {
            fullScreenDoc.mozRequestFullScreen();
        } else {
            fullScreenDoc.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
        document.mozFullScreen = true;
        document.webkitFullScreen = true;
        $(elem).addClass('active');
    } else {
        if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else {
            document.webkitCancelFullScreen();
        }
        document.mozFullScreen = false;
        document.webkitFullScreen = false;
        $(elem).removeClass('active');
    }
}

