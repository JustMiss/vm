"use strict";var _createClass=function(){function e(i,t){for(var n=0;n<t.length;n++){var e=t[n];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(i,e.key,e)}}return function(i,t,n){return t&&e(i.prototype,t),n&&e(i,n),i}}();function _classCallCheck(i,t){if(!(i instanceof t))throw new TypeError("Cannot call a class as a function")}!function(a){function i(i,t,n){var e=new Date;e.setDate(e.getDate()+n),document.cookie=i+"="+encodeURIComponent(t)+";expires="+e}function t(i){var t=decodeURIComponent(document.cookie).split("; "),n=!0,e=!1,s=void 0;try{for(var a,l=t[Symbol.iterator]();!(n=(a=l.next()).done);n=!0){var o=a.value.split("=");if(i===o[0])return o[1]}}catch(i){e=!0,s=i}finally{try{!n&&l.return&&l.return()}finally{if(e)throw s}}}var s=(_createClass(n,[{key:"init",value:function(){var i=this;this.li.on("mouseover",function(){i.index=a(this).index(),i.imgTurn()}),a(".dlist_reduce").on("click",function(){i.reduce()}),a(".dlist_add").on("click",function(){i.add()})}},{key:"imgTurn",value:function(){a(".mini_img img").attr("src",this.urlarr[this.index]),a(".large_glass img").attr("src",this.urlarr[this.index])}},{key:"reduce",value:function(){this.position--,this.position<=0&&(this.position=0),this.ulMove()}},{key:"add",value:function(){this.position++,this.position>=this.li.length-5&&(this.position=this.li.length-5),this.ulMove()}},{key:"ulMove",value:function(){a(".detail_ul ul").animate({left:-this.li.width()*this.position+"px"})}}]),n);function n(i,t){_classCallCheck(this,n),this.li=i,this.urlarr=t,this.index=0,this.position=0}var e=location.search.substring(1).split("=")[1];function l(){_classCallCheck(this,l),this.l_img=a(".large_glass img")}function o(){_classCallCheck(this,o),this.typearr=[],this.numarr=[]}a.ajax({type:"get",url:"http://localhost/August/project/php/getDetail.php",data:{sid:e},dataType:"json"}).done(function(i){console.log(i),a(".massage_introduce h4").html(i.title),a(".detail_massage i").html("￥"+i.price+".00"),a(".detail_massage em").html(i.detail);var t=i.urls.split("?"),n=i.srcs.split("，");a(".mini_img img").attr("src",t[0]),a(".large_glass img").attr("src",t[0]);var e="";a.each(n,function(i,t){e+='\n                <li><img src="'+t+'" alt=""></li> \n            '}),a(".detail_ul ul").html(e),new s(a(".detail_ul li"),t).init()}),(new(_createClass(l,[{key:"init",value:function(){var t=this;a(".mini_img").hover(function(){a(".mini_glass").show(),a(".large_glass").show(),a(this).on("mousemove",function(i){t.mag_effect(i.pageX,i.pageY)})},function(){a(".mini_glass").hide(),a(".large_glass").hide()})}},{key:"mag_effect",value:function(i,t){var n=i-a(".mini_img").offset().left-a(".mini_glass").width()/2,e=t-a(".mini_img").offset().top-a(".mini_glass").height()/2,s=a(".large_glass").width()/a(".mini_glass").width();n<=0?n=0:n>=a(".mini_img").width()-a(".mini_glass").width()&&(n=a(".mini_img").width()-a(".mini_glass").width()),e<=0?e=0:e>=a(".mini_img").height()-a(".mini_glass").height()&&(e=a(".mini_img").height()-a(".mini_glass").height()),a(".mini_glass").css("left",n),a(".mini_glass").css("top",e),a(".large_glass img").css("left",-n*s),a(".large_glass img").css("top",-e*s)}}]),l)).init(),(new(_createClass(o,[{key:"init",value:function(){var i=this;a(".addtocar").on("click",function(){i.addCookie(),alert("商品添加成功"),a(".cm_num").val(1)})}},{key:"addCookie",value:function(){t("commoditytype")?(this.typearr=t("commoditytype").split(","),this.numarr=t("commoditynum").split(","),"-1"==this.typearr.indexOf(e)?(this.typearr.push(e),this.numarr.push(a(".cm_num").val())):(this.numarr[this.typearr.indexOf(e)]-=-a(".cm_num").val(),console.log(this.numarr))):(this.typearr.push(e),this.numarr.push(a(".cm_num").val())),i("commoditytype",this.typearr,300),i("commoditynum",this.numarr,300)}}]),o)).init();var r=a(".cm_num").val();a(".num_add").on("click",function(){a(".cm_num").val(++r)}),a(".num_reduce").on("click",function(){--r<=1&&(r=1),a(".cm_num").val(r)}),a(".cm_num").on("input",function(){r=a(".cm_num").val()})}(jQuery);