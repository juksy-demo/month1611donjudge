(function($) {

    window.JUKSY = {
        apiUri: 'https://www.juksy.com/api'
    };

    var init = function() {
        // android version under 4.4 FB APP can't use css fadeout
        function getAndroidVersion(ua) {
            ua = (ua || navigator.userAgent).toLowerCase();
            var match = ua.match(/android\s([0-9\.]*)/);
            return match ? match[1] : false;
        };
        var $android = parseFloat(getAndroidVersion());
        if ($android < 4.4) {
            alert('Android 4.3 以下手機，請使用Chrome瀏覽器閱讀');
        }

        // Configure webfont
        window.WebFontConfig = {
            google: {
                families: ['Roboto+Condensed:400,400italic,700,700italic:latin']
            }
        };

        // Init Facebook
        window.fbAsyncInit = function() {
            FB.init({
                appId: '608477045879026',
                cookie: true, // enable cookies to allow the server to access 
                // the session
                xfbml: true, // parse social plugins on this page
                version: 'v2.6' // use version 2.6
            });
        };
    }

    // header_03
    var header_03_slider = function() {
        if(!$('#header_03_banner').length) return;
        /*---------------------
        輪播 Slider
        -----------------------*/
        var jssor_1_options = {
            $AutoPlay: true,
            $SlideDuration: 800,
            $Idle: 2500,
            $PauseOnHover: 0,
            $SlideEasing: $Jease$.$OutQuint,
            $BulletNavigatorOptions: {
                $Class: $JssorBulletNavigator$
            }
        };

        var jssor_1_slider = new $JssorSlider$("header_03_banner", jssor_1_options);

        //responsive code begin
        //you can remove responsive code if you don't want the slider scales while window resizing
        function ScaleSlider() {
            var refSize = jssor_1_slider.$Elmt.parentNode.clientWidth;
            if (refSize) {
                jssor_1_slider.$ScaleWidth(refSize);
            } else {
                window.setTimeout(ScaleSlider, 30);
            }
        }
        ScaleSlider();
        $(window).bind("load", ScaleSlider);
        $(window).bind("resize", ScaleSlider);
        $(window).bind("orientationchange", ScaleSlider);
        //responsive code end
    }
    var header_03 = function() {
        /*---------------------
        文字三角形凹槽高度
        -----------------------*/
        var $headerWrap = $('.header_03 .headerWrap'),
            $visualBg = $headerWrap.find('.visualBg'),
            $txtBg = $headerWrap.find('.detail .detailWrap .txtBg'),
            $txtWrap = $headerWrap.find('.detail .detailWrap');
        $txtBg.height($txtWrap.height());
        $headerWrap.height($txtBg.height() + $visualBg.height() - 31);
    }


    // layout_03
    var layout_03 = function() {
        // Count img height
        var $layout03 = $('.layout_03');
        $layout03.each(function() {
            var $img = $(this).find('.article li:nth-child(even) a.img'),
                $imgBig = $(this).find('.article li:nth-child(odd) a.img');
            $img.each(function() {
                $(this).height($(this).width());
            });
            $imgBig.each(function() {
                $(this).height($(this).width() / 1.9);
            });
        });
    }

    // layout_04
    var layout_04 = function() {
        // Slider
        var $layout04 = $('.layout_04');
        $layout04.each(function() {
            var $this = $(this),
                $slideW = $this.find('ul.slides li:first').width(),
                $gap = 20,
                $number = $this.find('ul.slides li').length,
                $windowW = $(window).width(),
                $setWidth = $windowW < 1024 ? (($slideW + $gap) * $number) : (($slideW + $gap) * $number - $gap),
                $container = $this.find('.slidesWrap'),
                containW = $container.width();
            // Set slides width
            $this.find('ul.slides').width($setWidth);
            // Mobile and tablet move to second slide
            if ($windowW < 1024) {
                var $center = $slideW - (($windowW - $slideW) / 2 - $gap);
                $this.find('.slidesWrap').scrollLeft($center);
            }
        });
    }

    // fixedBtn
    var fixedBtn_01 = function() {
        // Back to top
        $('ul.fixedBtn_01 li.top').click(function() {
            $('html,body').animate({ scrollTop: 0 }, 1000);
        });
        // Open share menu
        $('ul.fixedBtn_01 li.share').mousedown(function(){
            $('.fixedBtnCover_01').addClass('show');
        });
        // Close share menu
        $('.fixedBtnCover_01 .coverWrap .backCover, .fixedBtnCover_01 .item .arrow').bind('mousedown touchstart', function () {
            $('.fixedBtnCover_01').removeClass('show');
        });
        // Share with LINE
        $('.fixedBtnCover_01 ul.share li.line .material_btn').click(function(e) {
            e.preventDefault();
            window.location.href = 'http://line.naver.jp/R/msg/text/?' + document.title + '%0A' + document.URL;
        });
        // Share with FB
        $('.fixedBtnCover_01 ul.share li.fb .material_btn').click(function(e) {
            e.preventDefault();
            FB.ui({
                method: 'share',
                href: document.URL
            }, function(response) {});
        });
        // Copy link
        var clipboard = new Clipboard('.fixedBtnCover_01 ul.share li.copy .material_btn', {
            text: function(trigger) {
                return document.URL;
            }
        });
        // Copy tip
        clipboard.on('success', function(e) {
            var tipTime;
            clearTimeout(tipTime);
            $('.fixedBtnCover_01 .coverWrap .copytip').addClass('show');
            tipTime = setTimeout(hide, 2000);
            function hide() {
                 $('.fixedBtnCover_01 .coverWrap .copytip').removeClass('show');
            }
        });
        /*
        -------------------------------------
        nav move out while scrolling
        -------------------------------------
        */
        var $window = $(window);

        function fixedBtnShow() {
            var st = $(this).scrollTop(),
                ft = $('#footer').offset().top - $window.height() - 300,
                $fixedBtn = $('.fixedBtn_01');
            if (st > ft) {
                $fixedBtn.addClass('show');
            } else if (st == 0) {
                $fixedBtn.removeClass('show');
            }
        }
        $window.scroll($.throttle(500, fixedBtnShow));
    }

    // render content first
    init();
    header_03_slider();
    header_03();
    layout_03();
    layout_04();
    fixedBtn_01();


    // plugin fadeOut
    $(function() {
        $(document).on('fadeOut', function() {
            var $window = $(window),
                target = $('.fadeOut');

            function addAction() {
                var length = target.length;
                for (var i = 0; i < length; i++) {
                    if (target.eq(i).hasClass('action')) continue;
                    var in_position = target.eq(i).offset().top + 100;
                    var window_bottom_position = $window.scrollTop() + $window.height();
                    if (in_position < window_bottom_position) {
                        target.eq(i).addClass('action');
                    }
                }
            }
            addAction();
            $window.scroll($.throttle(250, addAction));
        });
        $(document).trigger('fadeOut');
    });

    // plugin img_lazyLoad
    $(function() {
        $(document).on('img_lazyLoad', function() {
            var $window = $(window),
                target = $('.imgLoading'),
                complete = 'complete';

            function addComplete() {
                var length = target.length;
                for (var i = 0; i < length; i++) {
                    if (target.eq(i).hasClass(complete)) continue;
                    var in_position = target.eq(i).offset().top + 100;
                    var window_bottom_position = $window.scrollTop() + $window.height() + 150;
                    if (in_position < window_bottom_position) {
                        var targeturl = target.eq(i).data('imgload');
                        target.eq(i).css('background-image', 'url(' + targeturl + ')');
                        target.eq(i).addClass(complete);
                    }
                }
            }
            addComplete();
            $window.scroll($.throttle(250, addComplete));
        });
        $(document).trigger('img_lazyLoad');
    });

    // plugin dotdotdot
    $(function() {
        $(document).on('dotdotdot', function() {
            $('[data-dotdotdot="true"]').dotdotdot({
                wrap: 'letter'
            });
        });
        $(document).trigger('dotdotdot');
    });

    // plugin layout_03 infinite scroll
    $(function() {
        var $layout03infinit = $('.layout_03_infinit');
        $layout03infinit.each(function(){
            var $layout = $(this).find('.layoutWrap'),
                moreBtn = '.moreBtn',
                countFrom = 0,
                countSize = 6,
                source,
                template,
                article;

            // add btn click listener
            var btnClick = function() {
                $layout.find(moreBtn).one('click', function() {
                    $(this).remove();
                    // get new data
                    countFrom += countSize;
                    layout_03_ajax(countFrom, countSize);
                    // append article
                    addArticle();
                });
            };

            // add article
            var addArticle = function() {
                $layout.append('<div class="articleWrap">' + article + '</div>');
                layout_03();
                $(document).trigger('fadeOut');
                $(document).trigger('img_lazyLoad');
                $(document).trigger('dotdotdot');
                btnClick();
            }

            // ajax
            var layout_03_ajax = function(ifrom, isize) {
                // clear article content
                article = '';
                var items = {
                    from: ifrom,
                    size: isize,
                    tags: $layout.data('tags'),
                    filter: $layout.data('filter')
                };
                $.ajax({
                    url: JUKSY.apiUri + '/v1.0/search/articles',
                    data: { tags: items.tags, filter: items.filter, from: items.from, size: items.size },
                    type: 'GET',
                    dataType: 'json',
                    success: function(Jdata) {
                        console.log('AJAX layout_03 SUCCESS!!!');
    
                        // no data
                        if (!Jdata.length) return;
    
                        // has data
                        source = $("#entry-template-start").html();
                        template = Handlebars.compile(source);
                        article += template();
                        for (var n = 0; n < Jdata.length; n++) {
                            source = $("#entry-template" + n % 2).html();
                            template = Handlebars.compile(source);
                            article += template(Jdata[n]);
                        }
                        if (Jdata.length < items.size) {
                            article += "</ul>";
                        } else {
                            source = $("#entry-template-end").html();
                            template = Handlebars.compile(source);
                            article += template();
                        }
                        addArticle();
                    },
                    error: function() {
                        console.log('AJAX layout_03 ERROR!!!');
                    }
                });
            }

            //init loading ajax
            layout_03_ajax(countFrom, countSize);
        });
    });

    // window resizing
    $(function() {
        var resizeId;
        $(window).resize(function() {
            clearTimeout(resizeId);
            resizeId = setTimeout(doneResizing, 500);
        });

        function doneResizing() {
            header_03();
            layout_03();
            layout_04();
            $(document).trigger('dotdotdot');
        }
    });

})(jQuery);