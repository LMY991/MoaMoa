$(function(){
	$('.orderDatepicker').datepicker({
		dateFormat: "yy-mm-dd",
		closeText: '',
		prevText: '',
		nextText: '',
		currentText: '',
		monthNames: ['1','2','3','4','5','6','7','8','9','10','11','12'],
		monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
		dayNames: [''],
		dayNamesShort: [''],
		dayNamesMin: [''],
		showMonthAfterYear: true,
		changeYear:false,
		changeMonth:false,
		//showButtonPanel:true,
		minDate:'0D',
		maxDate:'7D'
	});

	$('.datepicker').datepicker({
		dateFormat: "yy-mm-dd",
		closeText: '',
		prevText: '',
		nextText: '',
		currentText: '',
		monthNames: ['.01','.02','.03','.04','.05','.06','.07','.08','.09','.10','.11','.12'],
		monthNamesShort: ['.01','.02','.03','.04','.05','.06','.07','.08','.09','10','.11','.12'],
		dayNames: [''],
		dayNamesShort: [''],
		dayNamesMin: [''],
		showMonthAfterYear: true,
		//showButtonPanel:true
	});

	var btns = document.querySelectorAll('.clipboard');
	var clipboard = new Clipboard(btns);

	clipboard.on('success', function(e) {
		alert('');
	});

	// $('.traceLink').click(function(e){
		
	// });
	$(document).on('click','.traceLink',function(){
		if($(this).hasClass('off')){
			return;
		}

		var name = $(this).data('name');
		console.log(name)
		var url = $(this).attr('href');
		var src = $(this).find('img').attr('src');

		if( name ){
			SiteProc.traceLink(name,src);
		}
	})
});

function rightOptClear(){
	$('input[name="search_color"]').val('');
	$('input[name="search_size"]').val('');
	$('input[name="search_neck"]').val('');
	$('input[name="search_model"]').val('');
	$('input[name="search_season"]').val('');
	$('input[name="search_angam"]').val('');

	$('input[name="search_price"]').val('');
	$('input[name="search_sale"]').val('');

	$('.sizeList .on').removeClass('on');
	$('.colors .on').removeClass('on');

	$('.rangeSlide').each(function(){
		var to = $(this).data('max');
		var slider = $(this).data("ionRangeSlider");
		slider.update({
			from: 0,
			to: to
		});
	});

	$('.eleVal').val('');
}

function cateOptClear(){
	$('input[name="cate"]').val('');
}


$(function(){
	$(document).on('mouseleave','.goods-form, .best-from-list li, .brand-atti-wrap .best li,.goods-form-list',function() {
		if( $(this).parent().hasClass('wish-list-goodslist-ul') ){
			$(this).find('.list-hover').hide();
			return;
		}
		$(this).find('.list-hover,.opt_layer').hide();
	});

	$(document).on('mouseover','.prd_basic .box .img .prdimg a img',function() {
		var img = $(this).data('img');
		var toggle_img = $(this).data('toggle_img');
		var src = $(this).attr('src');
		if( toggle_img ){
			$(this).closest(".prdimg").addClass('toggleimg');
			$(this).attr('src', src.replace(img, toggle_img));
			return;
		}
		$(this).closest('.goods-form-list').find('.list-hover').show();
	})
	$(document).on('mouseout','.prd_basic .box .img .prdimg a img',function() {
		var img = $(this).data('img');
		var toggle_img = $(this).data('toggle_img');
		var src = $(this).attr('src');
		$(this).closest(".prdimg").removeClass('toggleimg');

		if( toggle_img ){
			$(this).attr('src', src.replace(toggle_img, img));
		}
	})


	// $('.prd_basic .box .img .prdimg img').mouseover(function() {
	// 	var img = $(this).data('img');
	// 	var toggle_img = $(this).data('toggle_img');
	// 	var src = $(this).attr('src');

	// 	if( toggle_img ){
	// 		$(this).attr('src', src.replace(img, toggle_img));
	// 	}
	// 	$(this).closest('.goods-form').find('.list-hover').show();
	// }).mouseout(function() {
	// 	var img = $(this).data('img');
	// 	var toggle_img = $(this).data('toggle_img');
	// 	var src = $(this).attr('src');

	// 	if( toggle_img ){
	// 		$(this).attr('src', src.replace(toggle_img, img));
	// 	}
	// });

	$('.prd_basic .box .img .list-hover.renewal .hover-box .img-link, .prd_basic .box .img .list-hover.renewal .hover-box ul').mouseover(function(){
		var obj = $(this).closest('.img').find('.prdimg img');
		var img = obj.data('img');
		var toggle_img = obj.data('toggle_img');
		var src = obj.attr('src');

		if( toggle_img ){
			obj.attr('src', src.replace(img, toggle_img));
		}
	}).mouseout(function() {
		var obj = $(this).closest('.img').find('.prdimg img');
		var img = obj.data('img');
		var toggle_img = obj.data('toggle_img');
		var src = obj.attr('src');

		if( toggle_img ){
			obj.attr('src', src.replace(toggle_img, img));
		}
	});
});

function scroll_page(){
	if( $('#detail .tab_area').length <= 0 ){
		return false;
	}

	var body_h = $(this).scrollTop();
	var tab_s = $('#detail .tab_area').offset().top;
	var tab_h = $('#detail .tab_area').height();

	var section_top = new Array();
	$('.tabcnt_detail').each(function(idx){
		section_top[idx] = Math.floor($(this).offset().top - tab_h);
	});

	$('.tab_detail li a').removeClass('active');

	if(body_h >= section_top[0] && body_h < section_top[1]) {
		$('.tab_detail li:nth-child(1) a').addClass('active');
	} else if(body_h >= section_top[1] && body_h < section_top[2]) {
		$('.tab_detail li:nth-child(2) a').addClass('active');
	} else if(body_h >= section_top[2] && body_h < section_top[3]) {
		$('.tab_detail li:nth-child(3) a').addClass('active');
	} else if(body_h >= section_top[3]) {
		$('.tab_detail li:nth-child(4) a').addClass('active');
	}
}

function give_coupon(coupon_code, member_index,apps,event_idx){
	if( !coupon_code ){
		alert('');
		return;
	}

	$.ajax({
		url:'/ajax_proc/coupon.php',
		type:'POST',
		data:{'coupon_code':coupon_code,'member_index':member_index,'apps':apps,'event_idx':event_idx},
		async:false,
		success:function(msg){
			var data = JSON.parse(msg);

			if( data.code ){
				eval(data.code);
				return false;
			}

			alert(data.msg);
		}
	});
}

function searchCheck(frm)
{
	var keyword = frm.keyword.value.trim();
	var cateChange = $('input[name="cateChange"]').val();

	if(keyword == '')
	{
		if(cateChange != 1){
			alert('');
			return false;
		}
	}

	frm.keyword.value = keyword;
}

function resize_iframe(obj){
	setTimeout(function(){
		var height = $(obj).contents().find('html').height();

		$(obj).css('height', height);
		$(obj).css('height', height).css('visibility','visible');
	},500);
}
function insert_buyloc(url){
	var href = '';
	href = url ? url : location.href;
	if( href.indexOf('/member/') < 0 && href.indexOf('/order/') < 0 ){
		try{
			var data = JSON.parse(CookieProc.getCookie('buyLoc'));
			if( !data ){
				var data = [{'url':href}];
				CookieProc.setCookie('buyLoc',JSON.stringify(data));
			}else{
				var duple = false;
				for(i in data){
					if( href == data[i].url ){
						duple = true;
					}
				}
				if( !duple ){
					data.push({'url':href});
				}
				data = JSON.stringify(data.slice(-10,data.length));
				CookieProc.setCookie('buyLoc',data);
			}
		}catch(e){
			var data = [{'url':href}];
			CookieProc.setCookie('buyLoc',JSON.stringify(data));
		}
	}
}