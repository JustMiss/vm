//首页商品列表渲染
!function ($) {
    $.ajax({
        type: "get",
        url: "http://localhost/August/project/php/commodity.php",
        dataType: "json",
        success: function (result) {
            var $html = '';
            $.each(result, function (index, value) {
                $html += `
                <li>
                    <a href="details.html?sid=${value.sid}">
                        <img src="${value.src}" alt="${value.title}">
                        <p class="commodity_name">${value.name}</p>
                        <p class="commodity_title">${value.detail}</p>
                        <p class="commodity_price">¥${value.price}</p>
                    </a>
                </li>
                `;
            });
            $('.sh_cm_list').html($html);
        }
    });

    // 首页广告关闭
    $('.close_ad').on('click', function () {
        $('.ad a').hide();
    });

    // banner
    let timer=null;
    let bIndex=0;
    timer = setInterval(function () {
        rightTurn();
    }, 3000);
    $('.b_index dd').on('click', function () {
        bIndex=$('.b_index dd').index($(this))
        bannerTurn();
    });
    $('.banner_left').on('click',function(){
        bIndex--;
        if(bIndex < 0){
            bIndex = 5;
        }
        bannerTurn();
    });
    $('.banner_right').on('click',function(){
        rightTurn();
    });
    $('.banner').hover(function(){
        clearInterval(timer);
    },function(){
        timer = setInterval(function () {
            rightTurn();
        }, 3000);
    });
    function bannerTurn () {
        $('.banner_img li').eq(bIndex).animate({ opacity: 1 }).siblings().animate({ opacity: 0 });
        $('.b_index dd').eq(bIndex).addClass('active').siblings().removeClass('active');
    }
    function rightTurn(){
        bIndex++;
        if(bIndex > 5){
            bIndex = 0;
        }
        bannerTurn();
    }
}(jQuery);