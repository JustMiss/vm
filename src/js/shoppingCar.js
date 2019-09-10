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

    let typearr=[];
    let numarr=[];
    if (getcookie('commoditytype')){
        typearr = getcookie('commoditytype').split(',');
        numarr = getcookie('commoditynum').split(',');
    }

    if(getcookie('username')){
        $('.if_login').hide();
    }else{
        $('.if_login').show(); 
    }
    

    // 渲染购物车列表
    $.each(typearr, function (index, value) {
        $.ajax({
            type: "get",
            url: "http://localhost/August/project/php/getDetail.php",
            data: { sid: value },
            dataType: "json",
        }).done(function (data) {
            var $clonebox = $('.check_single:hidden').clone(true, true);
            $clonebox.find('img').attr('src', data.src);
            $clonebox.find('img').attr('sid', data.sid);
            $clonebox.find('.c_d_first').html(data.titile);
            $clonebox.find('.s_price').find('span').html(data.price);
            $clonebox.find('.cm_num').find('input').val(numarr[index]);
            $clonebox.find('.a_price').find('em').html((data.price * numarr[index]).toFixed(2));
            $clonebox.css('display', 'block');
            $('.c_detaillist').append($clonebox);
            priceall();
        });
    });

    // 计算商品总价
    function priceall() {
        var $sum = 0;
        var $count = 0;
        $('.check_single:visible').each(function (index, value) {
            if ($(value).find('.checked').hasClass('checked_ed')) {
                $sum += parseInt($(value).find('.cm_num').find('input').val());
                $count += parseFloat($(value).find('.a_price').find('em').html());
            }
        });
        $('.all_price').find('em').html($sum);
        $('.all_price').find('span').html('￥' + $count.toFixed(2));
    }


    // 改变商品数量
    $('.cm_num .cm_reduce').on('click', function () {
        var value = $(this).parent().find('input').val();
        value--;
        if (value <= 1) {
            value = 1;
        }
        $(this).parent().find('input').val(value);
        var id = $(this).parents('.single_detail').find('img').attr('sid');
        var index = typearr.indexOf(id);
        numarr[index]=value;
        addcookie('commoditynum',numarr);
        var sPrice=parseInt($(this).parents('.single_detail').find('.s_price span').html());
        $(this).parents('.single_detail').find('.a_price').find('em').html((sPrice * value).toFixed(2));
        priceall();
    });
    $('.cm_num .cm_add').on('click', function () {
        var value = $(this).parent().find('input').val();
        value++;
        $(this).parent().find('input').val(value);
        var id = $(this).parents('.single_detail').find('img').attr('sid');
        var index = typearr.indexOf(id);
        numarr[index]=value;
        addcookie('commoditynum',numarr);
        var sPrice=parseInt($(this).parents('.single_detail').find('.s_price span').html());
        $(this).parents('.single_detail').find('.a_price').find('em').html((sPrice * value).toFixed(2));
        priceall();
    });
    $('.check_single .cm_num').find('input').on('input',function(){
        var value = $(this).parent().find('input').val();
        var id = $(this).parents('.single_detail').find('img').attr('sid');
        var index = typearr.indexOf(id);
        numarr[index]=value;
        addcookie('commoditynum',numarr);
        var sPrice=parseInt($(this).parents('.single_detail').find('.s_price span').html());
        $(this).parents('.single_detail').find('.a_price').find('em').html((sPrice * value).toFixed(2));
        priceall();
    });


    // 点击选中状态
    $('.all_check .checked').on('click', function () {
        $(this).toggleClass('checked_ed');
        if ($(this).hasClass('checked_ed')) {
            $('.checkbox .checked').each(function (index, value) {
                $(value).addClass('checked_ed');
            });
        } else {
            $('.checkbox .checked').each(function (index, value) {
                $(value).removeClass('checked_ed');
            });
        }
        priceall();
    });
    $('.check_single .checked').on('click', function () {
        $(this).toggleClass('checked_ed');
        if ($('.check_single:visible').length === $('.check_single .checked_ed').length - 1) {
            $('.all_check .checked').each(function (index, value) {
                $(value).addClass('checked_ed');
            });
        } else {
            $('.all_check .checked').each(function (index, value) {
                $(value).removeClass('checked_ed');
            });
        }
        priceall();
    });

    // 删除商品
    $('.delcm i').on('click',function(){
        if (confirm('你确定要删除吗')){
            var id = $(this).parents('.single_detail').find('img').attr('sid');
            typearr.splice(id,1);
            numarr.splice(id,1);
            addcookie('commoditytype',typearr);
            addcookie('commoditynum',numarr);
            $(this).parents('.check_single').hide();
        } 
    });
    

}(jQuery);