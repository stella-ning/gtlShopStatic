//首页
$(function(){
    //手机端导航
    $('.openNav').on('click',function(){
        $('.topNw').toggle(500);
    });
    $('.topNw .topN li a').on('click',function(){
        $(this).parents('.topNw').hide();
    });
})
