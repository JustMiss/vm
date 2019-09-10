!function ($) {
    // cookie's function
    function addcookie(key, value, times) {//encodeURICompontent,对字符进行编码;decodeURICompotent,解码
        let d = new Date();
        d.setDate(d.getDate() + times);
        document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + d;
    }
    function getcookie(key) {//适用性更好
        let arr = decodeURIComponent(document.cookie).split('; ');
        for (let value of arr) {
            let newarr = value.split('=');
            if (key === newarr[0]) {
                return newarr[1];
            }
        }
    }
    function delcookie(key) {
        let d = new Date();
        d.setDate(d.getDate() - 1);
        document.cookie = key + '=100;expires=' + d;
    }

    // 放大镜下图片列表移动
    class detailList {
        constructor($li, $urlarr) {
            this.li = $li
            this.urlarr = $urlarr;
            this.index = 0;
            this.position = 0;
        }
        init() {
            let _this = this;
            this.li.on('mouseover', function () {
                _this.index = $(this).index();
                _this.imgTurn();
            });
            $('.dlist_reduce').on('click', function () {
                _this.reduce();
            });
            $('.dlist_add').on('click', function () {
                _this.add();
            });
        }
        imgTurn() {
            $('.mini_img img').attr('src', this.urlarr[this.index]);
            $('.large_glass img').attr('src', this.urlarr[this.index]);
        }
        reduce() {
            this.position--;
            if (this.position <= 0) {
                this.position = 0;
            }
            this.ulMove();
        }
        add() {
            this.position++;
            if (this.position >= this.li.length - 5) {
                this.position = this.li.length - 5;
            }
            this.ulMove();
        }
        ulMove() {
            $('.detail_ul ul').animate({ left: -(this.li.width() * this.position) + 'px' })
        }
    }

    // 渲染当前详情页
    let imgid = location.search.substring(1).split('=')[1];
    $.ajax({
        type: "get",
        url: "http://localhost/August/project/php/getDetail.php",
        data: { sid: imgid },
        dataType: "json",
    }).done(function (result) {
        console.log(result);
        $('.massage_introduce h4').html(result.title);
        $('.detail_massage i').html('￥' + result.price + '.00');
        $('.detail_massage em').html(result.detail);
        var urlarr = result.urls.split('?');
        var srcarr = result.srcs.split('，');
        $('.mini_img img').attr('src', urlarr[0]);
        $('.large_glass img').attr('src', urlarr[0]);
        var str = '';
        $.each(srcarr, function (index, value) {
            str += `
                <li><img src="${value}" alt=""></li> 
            `;
        });
        $('.detail_ul ul').html(str);
        new detailList($('.detail_ul li'), urlarr).init();
    });

    //放大镜效果
    class Magnifying {
        constructor() {
            this.l_img = $('.large_glass img');
        }
        init() {
            let _this = this;
            $('.mini_img').hover(function () {
                $('.mini_glass').show();
                $('.large_glass').show();
                $(this).on('mousemove', function (ev) {
                    _this.mag_effect(ev.pageX, ev.pageY);
                })
            }, function () {
                $('.mini_glass').hide();
                $('.large_glass').hide();
            });
        }
        mag_effect(x, y) {
            let $left = x - $('.mini_img').offset().left - $('.mini_glass').width() / 2;
            let $top = y - $('.mini_img').offset().top - $('.mini_glass').height() / 2;
            let bili = $('.large_glass').width() / $('.mini_glass').width();
            if ($left <= 0) {
                $left = 0;
            } else if ($left >= $('.mini_img').width() - $('.mini_glass').width()) {
                $left = $('.mini_img').width() - $('.mini_glass').width();
            }
            if ($top <= 0) {
                $top = 0;
            } else if ($top >= $('.mini_img').height() - $('.mini_glass').height()) {
                $top = $('.mini_img').height() - $('.mini_glass').height();
            }
            $('.mini_glass').css('left', $left);
            $('.mini_glass').css('top', $top);
            $('.large_glass img').css('left', -$left * bili);
            $('.large_glass img').css('top', -$top * bili);
        }
    }
    new Magnifying().init();

    // 添加购物车
    class cmAdd {
        constructor() {
            this.typearr = [];
            this.numarr = [];
        }
        init() {
            let _this = this;
            $('.addtocar').on('click', function () {
                _this.addCookie();
                alert('商品添加成功');
                $('.cm_num').val(1);
            })
        }
        addCookie() {
            if(getcookie('commoditytype')){
                this.typearr=getcookie('commoditytype').split(',');
                this.numarr=getcookie('commoditynum').split(',');
                if(this.typearr.indexOf(imgid) == '-1'){
                    this.typearr.push(imgid);
                    this.numarr.push($('.cm_num').val());
                }else{
                    this.numarr[this.typearr.indexOf(imgid)] -= -$('.cm_num').val();
                    console.log(this.numarr);
                }
            }else{
                this.typearr.push(imgid);
                this.numarr.push($('.cm_num').val());
            }
            addcookie('commoditytype', this.typearr, 300);
            addcookie('commoditynum', this.numarr, 300);
        }
    }
    new cmAdd().init();
    
    let cnValue=$('.cm_num').val();
    $('.num_add').on('click',function(){
        $('.cm_num').val(++cnValue);
    });
    $('.num_reduce').on('click',function(){
        if(--cnValue <= 1){
            cnValue=1; 
        }
        $('.cm_num').val(cnValue);
    });
    $('.cm_num').on('input',function(){
        cnValue=$('.cm_num').val();
    });
}(jQuery);