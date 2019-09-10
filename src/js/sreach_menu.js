(function($){
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

    // 搜索框菜单浮现和隐藏
    $('#sreach_input').on('focus',function(){
        $('.sreach_hide').show();
        $('.sreach_hint').hide();
        $(this).on('input',function(){
            if ($(this).val() == ''){
                $('.sreach_hide').show();
            }else{
                $('.sreach_hide').hide(); 
            }
        })
    });
    $('#sreach_input').on('blur',function(){
        $('.sreach_hide').hide();
        $('.sreach_hint').show();
    });
    
    // 购物车点击事件及购物车计数
    $('.nav_car').on('click',function(){
        window.location.href='http://localhost/August/project/dist/shoppingCar.html';
    });

    // 弹出登录框
    $('.login_btn').on('click',function(){
        $.ajax({
            url: "http://localhost/August/project/dist/login.html" 
        }).done(function (data) {
            $('.login_html').html(data).show();
            $('.login_html').find('header span').on('click',function(){
                $('.login_html').hide();
            });
            $('.login_html').find('#login_name').on('focus',function(){
                $('.login_html').find('label.name').hide();
            });
            $('.login_html').find('#login_name').on('blur',function(){
                if($('.login_html').find('#login_name').val() == ''){
                    $('.login_html').find('label.name').show();
                }
            });
            $('.login_html').find('#login_pass').on('focus',function(){
                $('.login_html').find('label.pass').hide();
            });
            $('.login_html').find('#login_pass').on('blur',function(){
                if($('.login_html').find('#login_pass').val() == ''){
                    $('.login_html').find('label.pass').show();
                }
            });
            $('.login_html').find('.submit').on('click',function(){
                $.ajax({
                    type: "post",
                    url: "http://localhost/August/project/php/login.php",
                    data: {
                        username: $('.login_html').find('#login_name').val(),
                        password: $('.login_html').find('#login_pass').val()
                    },
                    dataType: "json"
                }).done(function(data){
                    if(data){
                        addcookie('username',data.username);
                        $('.if_login').hide();
                        alert('登录成功');
                        $('.login_html').hide(); 
                    }else{
                        alert('您输入的账号密码不正确');
                    }
                });
            });
        });
    });


    let typearr=[];
    let numarr=[];
    if (getcookie('commoditytype')){
        typearr = getcookie('commoditytype').split(',');
        numarr = getcookie('commoditynum').split(',');
    }

    if (typearr) {
        let allnum=numarr.reduce(function(p,i){
            return +p + +i;
        });
        $('.car_num').html('('+allnum+')');
    }
})(jQuery);