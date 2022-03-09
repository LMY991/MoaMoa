function imgOver(imgEl,opt) {
	if(imgEl.getAttribute('checked')) return;
	var src = imgEl.getAttribute('src');
	var ftype = src.substring(src.lastIndexOf('.'), src.length);
	if (opt == 'out') imgEl.src = imgEl.src.replace("_over"+ftype, ftype);
	else imgEl.src = imgEl.src.replace(ftype, "_over"+ftype);
}

$(document).on('click','.trace_link', function(e) {
	e.preventDefault();
	e.stopPropagation();
	var name = $(this).data('name');
	var url = $(this).attr('href');
	var src = $(this).find('img').attr('src');

	$.ajax({
		url:'/ajax_proc/trace_link.php',
		type:'post',
		data:{'name':name,'src':src},
		async:false,
		success:function(){
		}
	});


	if( $(this).prop('target') == '_blank' ){
		window.open(url,'','');
	}else{
		location.href = url;
	}
});

/* example
<input type="checkbox" onclick="cartCheckAll(this.checked)">
*/

function cartCheckAll(checked) {
	$(':checkbox[name^="cno["], :checkbox[name^="wno["]').attrprop('checked', checked);
}


function toggle_view(selector, obj){
	var search = $('#'+selector+'');
	var obj = $(obj);
	if (search.css('display') == 'none') {
		search.fadeIn();
		obj.addClass('active');
	} else {
		search.fadeOut();
		obj.removeClass('active');
	}

	// 留덉씠�섏씠吏� 諛곗넚吏�/�섎텋怨꾩쥖 愿�由� 諛곗넚吏� 異붽�
	if (selector == 'addr_layer' || selector == 'return_layer') {
		$('#dimmed').show();
		$('#dimmed').click(function(){
			search.hide();
			$(this).hide();
		});
	}
}


function tabover(name, no) {
	var tabs = $('.tab_'+name+'').find('li');
	tabs.each(function(idx) {
		var detail = $('.tabcnt_'+name+idx);
		var link = $(this).find('a');
		if(no == idx) {
			detail.show();

			// �대�吏� �녿뒗寃� �숆린��
			detail.find('img[data-src]').each(function(){
				if( $(this).attr('src') != $(this).data('src') ){
					$(this).attr('src',$(this).data('src'));
				}
			});

			link.addClass('active');
		} else {
			detail.hide();
			link.removeClass('active');
		}
	});

	if(event){
		var obj = $(event.target||event.srcElement);
		var eq = obj.closest('li').data('eq');
		if( eq < 4 ){
			$('.necklineBox').show();
		}else{
			$('.necklineBox').hide();
			$('.necklineBox li').removeClass('on');
			$('input[name="search_neck"]').val('');
		}
	}
}


$(function(){
	$(window).scroll(function(){
		var y = $(window).scrollTop();
		var hd_top = $('#header .hd_top').height();
		var lnb_menu = $('#header .lnb .menu');

		if(hd_top <= y) {
			lnb_menu.addClass('fixed');

			// header fixed custom start
			$('#header .lnb').addClass('fixed');
			$('#header .lnb .cate1 > ul > li > a').addClass('fixed');
			$('#header .lnb .cate0 > ul > li > a > span').addClass('fixed');
			$('#header .lnb .cate0 > ul > li > a .kor').addClass('fixed');
			$('#header .lnb .cate0 > ul > li > a').addClass('fixed');
			$('#header .lnb .cate > ul > li.view_sub > a > span').addClass('fixed');
			$('#header .lnb .cate0 > ul > li.allprd > a > span').addClass('fixed');
			$('#header .lnb .cate0 > ul > li.all').addClass('fixed');
			$('#header .lnb .cate0 > ul').addClass('fixed');
			// header fixed custom end
		} else {
			lnb_menu.removeClass('fixed');

			// header fixed custom start
			$('#header .lnb').removeClass('fixed');
			$('#header .lnb .cate1 > ul > li > a').removeClass('fixed');
			$('#header .lnb .cate0 > ul > li > a > span').removeClass('fixed');
			$('#header .lnb .cate0 > ul > li > a .kor').removeClass('fixed');
			$('#header .lnb .cate0 > ul > li > a').removeClass('fixed');
			$('#header .lnb .cate > ul > li.view_sub > a > span').removeClass('fixed');
			$('#header .lnb .cate0 > ul > li.allprd > a > span').removeClass('fixed');
			$('#header .lnb .cate0 > ul > li.all').removeClass('fixed');
			$('#header .lnb .cate0 > ul').removeClass('fixed');
			// header fixed custom end
		}

		if($("html , body").scrollTop() > hd_top){
			$("#header .lnb .menu").css({'z-index':'9999'});
		}else{
			$("#header .lnb .menu").css({'z-index':'9998'});
		}
	});
});


function bizopen() {
	var url = '//www.ftc.go.kr/info/bizinfo/communicationViewPopup.jsp?wrkr_no=2158738531';
	window.open(url, 'communicationViewPopup", "width=750, height=700;');
}

/* �ㅽ겕濡� �대룞 */
function scrollup(){
	$('html, body').animate({scrollTop:0}, 'slow');
}
function scrolldown(){
	$('html, body').animate({scrollTop:$(document).height()}, 'slow');
}

function notice_getCookie(name){
	var nameOfCookie = name + "=";
	var x = 0;
	while ( x <= document.cookie.length ){
		var y = (x+nameOfCookie.length);
		if ( document.cookie.substring( x, y ) == nameOfCookie ) {
			if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
				endOfCookie = document.cookie.length;
				return unescape( document.cookie.substring( y, endOfCookie ) );
		}
		x = document.cookie.indexOf( " ", x ) + 1;
		if ( x == 0 )
		break;
	}
	return "";
}
function notice_setCookie( name, value, expiredays ){
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays );
	document.cookie = name + "=" + escape( value ) + "; expires=" + todayDate.toGMTString() + "; path=/";
}
function notice_closeWin(ids){
	notice_setCookie(ids, "done1" , 1);
	document.getElementById(ids).style.display = 'none';
}

function setCookie(name,value,hour) {
	var date = new Date();
	if(hour==0){
		date.setTime(date.getTime() + 60*1000);
	}else if(hour == 30){
		date.setTime(date.getTime() + hour*60*1000);
	}else{
		date.setTime(date.getTime() + hour*60*60*1000);
	}

	document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
}


$(function(){
	$('.rightPanelClose').click(function(){
		if($(this).hasClass('on')){
			$('.rightPanel').css({'z-index': '30'});
			$('.rightPanel .innerPanel').stop().animate({'margin-right':'-647px'}, 500);
			$('.rightPanelClose').removeClass('on');
			$('.layer_dimmed').fadeOut('fast');
			notice_setCookie('panel', '1', 7);
		} else {
			$('.rightPanel').css({'z-index': '9999'});
			$('.rightPanel .innerPanel').stop().animate({'margin-right':'0'}, 500);
			$('.rightPanelClose').addClass('on');
			$('.layer_dimmed').fadeIn('fast');
			notice_setCookie('panel', '1', 0);
		}
		return false;
	});
	var wH = $(window).height()-120;
	var right_inner = $('#rightPanel .area .inner');
	right_inner.css({'height':wH + 'px'})
	window.onresize = function(){ //由ъ궗�댁쭠
		var right_inner = $('#rightPanel .area .inner');
		if(right_inner.is(':visible')) {
			var resize = $(window).height()-120;
			right_inner.css({'height':resize + 'px'});
		}
	}
	/*
	$('.box .title').click(function(e) {
		e.preventDefault();
		var target = $(this);
		var list = $(this).next('.list');
		if(list.is(':visible')) {
			list.slideUp('fast');
			target.removeClass('active');
		} else {
			list.slideDown('fast');
			target.addClass('active');
		}
	});
	*/

	$('.rangeSlide').ionRangeSlider({
		hide_min_max: false,
		keyboard: true,
		prettify_separator: ',',
		values_separator: ' - ',
		type: 'double',
		onChange: function(e) {
			var id = this.extra_classes;
			if( id ){
				var price = [e.from,e.to];
				$('#'+id).val(price);
			}
		}
	});
});

$('.popBtn').click(function(){
	$('#popBox').show();
	return false;
});

$('.closePop').click(function(){
	$('#popBox').hide();
	return false;
});

function open_layer(layer) {
	var content = $('#'+layer+'');
	if (content.css('display') == 'none') {
		content.show();
		$('#dimmed').show();
	} else {
		content.hide();
		$('#dimmed').hide();
	}
	$('#dimmed').click(function(){
		content.hide();
		$(this).hide();
	});
}

function open_layer_iframe(layer) {
	var content = $('#'+layer+'',parent.document);

	if (content.css('display') == 'none') {
		content.show();
		$('#dimmed',parent.document).show();
	} else {
		content.hide();
		$('#dimmed',parent.document).hide();
	}
	$('#dimmed',parent.document).click(function(){
		content.hide();
		$(this).hide();
	});
}

function close_layer(layer) {
	var content = $('#'+layer+'');
	content.hide();
	$('#dimmed').hide();
}