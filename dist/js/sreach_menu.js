"use strict";!function(i){function n(n){var i=decodeURIComponent(document.cookie).split("; "),o=!0,t=!1,l=void 0;try{for(var e,a=i[Symbol.iterator]();!(o=(e=a.next()).done);o=!0){var h=e.value.split("=");if(n===h[0])return h[1]}}catch(n){t=!0,l=n}finally{try{!o&&a.return&&a.return()}finally{if(t)throw l}}}i("#sreach_input").on("focus",function(){i(".sreach_hide").show(),i(".sreach_hint").hide(),i(this).on("input",function(){""==i(this).val()?i(".sreach_hide").show():i(".sreach_hide").hide()})}),i("#sreach_input").on("blur",function(){i(".sreach_hide").hide(),i(".sreach_hint").show()}),i(".nav_car").on("click",function(){window.location.href="http://localhost/August/project/dist/shoppingCar.html"}),i(".login_btn").on("click",function(){i.ajax({url:"http://localhost/August/project/dist/login.html"}).done(function(n){i(".login_html").html(n).show(),i(".login_html").find("header span").on("click",function(){i(".login_html").hide()}),i(".login_html").find("#login_name").on("focus",function(){i(".login_html").find("label.name").hide()}),i(".login_html").find("#login_name").on("blur",function(){""==i(".login_html").find("#login_name").val()&&i(".login_html").find("label.name").show()}),i(".login_html").find("#login_pass").on("focus",function(){i(".login_html").find("label.pass").hide()}),i(".login_html").find("#login_pass").on("blur",function(){""==i(".login_html").find("#login_pass").val()&&i(".login_html").find("label.pass").show()}),i(".login_html").find(".submit").on("click",function(){i.ajax({type:"post",url:"http://localhost/August/project/php/login.php",data:{username:i(".login_html").find("#login_name").val(),password:i(".login_html").find("#login_pass").val()},dataType:"json"}).done(function(n){n?(function(n,i,o){var t=new Date;t.setDate(t.getDate()+o),document.cookie=n+"="+encodeURIComponent(i)+";expires="+t}("username",n.username),i(".if_login").hide(),alert("登录成功"),i(".login_html").hide()):alert("您输入的账号密码不正确")})})})});var o=[],t=[];if(n("commoditytype")&&(o=n("commoditytype").split(","),t=n("commoditynum").split(",")),o){var l=t.reduce(function(n,i){return+n+ +i});i(".car_num").html("("+l+")")}}(jQuery);