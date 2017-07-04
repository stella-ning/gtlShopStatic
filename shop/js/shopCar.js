//购物车的数量
var num = Number($(".shopCarIcon sup").text());
// 购物车增减
function IncreaseD(_this){
    var count = $(_this).parent().find("input")[0];
    //用来判断当前代理对象是否包含add
    if($(_this).hasClass("add")){
        count.value++;
    }else{
        count.value=(count.value==1?1:count.value-1);
    }
    $.ajax({
        url:'data.json',
        type:'post',
        data:count.value,
        success:function(){
            //alert(12);
        }
    })
    //改变总价格
    var $row = $(_this).parents(".shopCarListCon");
    var total = Number($row.find('.shopPrice .unitprice').text()*count.value);
    total = total.toFixed(2);
    $row.find(".priceTotal span").text(total);
    countTotal()
}

//删除商品
function DeleteBtn(_this){
    $.ajax({
        url:'data.json',
        type:'post',
        data:[],
        success:function(){

        }
    })
    $(_this).parents("dl").remove();//remove就是移除dom
    num = Number($(".shopCarIcon sup").text());
    //改变购物车的数量
    num -= 1;
    $(".shopCarIcon sup").text(num);
    countTotal();
}

$(".last .shopCarList dl.shopCarListCon input[type=checkbox]").on("change",function(){
    countTotal();
});

//就是根据当前被选中了的商品，动态的累加所有的值
function countTotal(){
    var total = 0;
    var count = $(".last .shopCarList dl.shopCarListCon input:checked").each(function(){
        total+=Number($(this).parents("dl.shopCarListCon").find(".priceTotal span").text());
    }).size();
    $(".shopTotal").text(count);
    $(".sumLeft .shopTprice ").text(total.toFixed(2));
}
countTotal();

//加入购物车抛物线形式
$('.itemCon').on('click','.btnCart',function(ev){
    var txt = $(this).parents('.itemCon').find(".produceInfo .produceName").text(),
	    bSrc = $(this).parents('.itemCon').find(".produceImg img").attr("src"),
        count = $(this).parents('.itemCon').find(".count input").val(),
        bPrice = Number($(this).parents('.itemCon').find('.producePrice .price').text()).toFixed(2),
        priceTotal = count * bPrice;

    // $.ajax({
    //     url : '../data.json',
    //     type : 'post',
    //     data : {txt:txt,bSrc:bSrc,bPrice:bPrice},
    //     success : function(){
    //         alert('加入购物车成功');
    //     },
    //     error : function(){
    //         alert('操作失败');
    //     }
    // });
    $('<dl class="shopCarListCon clearfix">'+
        '<input type="checkbox" class="checkbox" checked>'+
        '<dt class="shopImg fl">'+
            '<img src="'+bSrc+'" alt="">'+
        '</dt>'+
        '<dd class="shopDisc fl">'+
            '<a href="produceDetail.html" class="shopName">'+txt+'</a>'+
            '<div class="count" style="display:none;">'+
                '<span>数量*'+count+'</span>'+
                '<a href="javascript:;" class="sub" onclick="IncreaseD(this)">-</a>'+
                '<input name="count[0]" value="'+count+'" readonly>'+
                '<a href="javascript:;" class="add" onclick="IncreaseD(this)">+</a>'+
            '</div>'+
        '</dd>'+
        '<dd class="shopPrice fl">'+
            '￥<span class="unitprice amount" contenteditable="true">'+bPrice+'</span>'+
            '<a href="javascript:;" class="delete" onclick="DeleteBtn(this)">删除</a>'+
        '</dd>'+
        '<dd class="priceTotal">'+
            '￥'+
            '<span>'+priceTotal+'</span>'+
        '</dd>'+
    '</dl>').appendTo('.shopCarList .carList-box');
    addProduct(ev)
});
// 添加抛物线
function addProduct(event){
    // 设置落脚点
    var offsetL = $(".shopCarIcon").offset().left,
        offsetT = $(".shopCarIcon").offset().top-$(window).scrollTop();
    // 获取当前点击的js对象
    var _this = $(event.target);
    var src = _this.parents().find(".produceImg img").attr("src");
    var flyer = $("<img src='"+src+"' class='fly' width='20px' height='20px' position='relative' z-index='99999'/>");
    flyer.fly({
        start:{
            left:event.clientX, // 获取点击购物车按钮的X,Y坐标
            top:event.clientY
        },
        end:{
            left: offsetL,
            top: offsetT,
            width:20,
            height:20
        },
        onEnd:function(ev){
            flyer.fadeOut("slow",function(){
                $(this).remove();
            });
            num += 1;
            countTotal();
            //改变购物车的数量
            $(".shopCarIcon sup").text(num);
        }
    });
}
