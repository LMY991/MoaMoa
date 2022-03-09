function GoodsProc(){
	this.goods_form_obj = '.goods-form'; 
	this.goods_form_gname = '.gname'; 
	this.goods_form_opname = '.opname'; 
	this.goods_codi_form_obj = '.goods-codi-form';
	this.goods_ori_form = '.select-form'; 
	this.goods_form_info = '.goods-form-info'; 

	this.removeClassObj = '.optSelect a';
	this.removeClassName = 'active';

	this.total_price_obj = '#total-price'; 
	this.total_ea_obj = '#total-count'; 

	this.total_codi_price_obj = '#total-codi-price'; 
	this.total_codi_ea_obj = '#total-codi-count'; 
	this.total_codi_price_dis_obj = '#total-codi-price-dis'; 

	this.classFileAddr = '/class/goods_ajax.php'; 

	this.ajax = function(method,string){
		var data = $.ajax({
						url:this.classFileAddr,
						type:'post',
						data:{'method':method,'string':string},
						async:false,
						success:function(data){}
					}).responseText;
		if( data ){
			data = JSON.parse(data);
			return data;
		}
	}

	this.null_check = function(type){
		var nullCnt = 0;

		var obj = $(this.goods_form_obj).filter(':gt(0)');

		if( type == 'codi' ){
			obj = $(this.goods_codi_form_obj).filter(':visible');
		}

		if( obj.length <= 0 ){
			alert('');
			nullCnt++;
			return false;
		}

		if( type == 'codi' ){
			obj.each(function(e){
				if( $(this).find('.codiIsCheck').length > 0 && !$(this).find('.codiIsCheck').prop('checked') ){
					return true;
				}

				if( $(this).find('[name="op1"]').length && $(this).find('[name="op1"]').val() == '' ){
					alert('');
					nullCnt++;
					return false;
				}

				if( $(this).find('[name="op2"]').length && $(this).find('[name="op2"]').val() == '' ){
					alert('');
					nullCnt++;
					return false;
				}

				if( $(this).find('[name="ea"]').length && $(this).find('[name="op2"]').val() == '' ){
					alert('');
					nullCnt++;
					return false;
				}
			});
		}

		if( nullCnt > 0 ){
			return false;
		}else{
			return true;
		}
	}

	this.select_check = function(){
		var obj = $(event.target||event.srcElement).closest('form');

		if( !obj ){
			return true;
		}

		if( obj.find('[name="op1"]').length && obj.find('[name="op1"]').val() == '' ){
			return true;
		}

		if( obj.find('[name="op2"] option').length > 1 && obj.find('[name="op2"]').val() == '' ){
			return true;
		}

		if( obj.find('[name="ea"]').length && obj.find('[name="ea"]').val() == '' ){
			return true;
		}

		return false;
	}

	this.opt_already = function(string) {
		var cnt = $(this.goods_form_obj).filter("[string-code='"+string+"']").length
		if( cnt > 0 ){
			return true;
		}else{
			return false;
		}
	}

	this.opt_copy = function(string){
		var html = $(this.goods_form_obj).filter(':first').clone();

		var goods_obj = $(event.target||event.srcElement).closest('form').find('[name="goods_idx"]');
		var goods_idx = goods_obj.val();
		var gname = goods_obj.data('gname');
		var addGname = goods_obj.data('addgname');

		var op1_obj = $(event.target||event.srcElement).closest('form').find('[name="op1"] option:selected');
		var op2_obj = $(event.target||event.srcElement).closest('form').find('[name="op2"] option:selected');

		if(op1_obj.data('ispluslimit') > 0 && $(this.goods_form_obj).length == 1 ){ // 泥섏쓬 怨좊��뚮쭔 �뚮젮以�
			alert(op1_obj.data('opcode')+"");
		}

		var account = Number(op1_obj.data('account'));

		if( op2_obj.length > 0 ){
			account += Number(op2_obj.data('account'));
		}

		var op1 = op1_obj.val();
		var op2 = op2_obj.val();

		var op1name = op1_obj.data('opname');
		var op2name = op2_obj.data('opname');

		if( addGname ){
			op1name = addGname+' '+op1name;
		}

		var tmp_opname = new Array();

		if( $('select[name="gCode"]').length > 0 ){
			var tmp_code = gname.split(' ');
			tmp_opname.push(tmp_code[0]);
		}

		if( op1name ){
			tmp_opname.push(op1name);
		}
		if( op2name ){
			tmp_opname.push(op2name);
		}

		tmp_opname = tmp_opname.join(' / ');

		html.find(this.goods_form_gname).text(gname);
		html.find(this.goods_form_opname).html(tmp_opname);
		html.show();

		html.find('[name="goods_idx"]').val(goods_idx);
		html.find('[name="op1"]').val(op1);
		html.find('[name="op2"]').val(op2);

		if( account > 0 ){
			html.find('.account').text(this.number_format(account)+'��');
		}
		html.attr('string-code',string);
		$(this.goods_form_obj).filter(':last').after(html);

		this.get_price();

		if( this.removeClassObj != '' ){
			//$(this.removeClassObj).removeClass( this.removeClassName );
		}

		/*
		$(this.goods_ori_form).find('[name="op1"]').val('');
		$(this.goods_ori_form).find('[name="op2"] option:gt(0)').remove();
		$('.size.optSelect').empty().append("<li style='padding-top:10px'>�됱긽�� 癒쇱� �좏깮�� 二쇱꽭��</li>");
		*/
	}

	this.set_opt = function(){
		var obj = $(event.target||event.srcElement);
		var goods_idx = obj.data('goods_idx');
		var form = obj.closest(this.goods_ori_form)

		if( obj.attr('name') == 'op1' && form.find('[name="op2"]').length > 0 ){
			var string = goods_idx+'/'+obj.val();

			var data = this.ajax('getOp2List',string);

			form.find('[name="op2"]').find('option:gt(0)').remove();
			form.find('[name="op2"]').append(data.html);
		}

		if( this.select_check() ){
			return false;
		}

		var string = this.str_enc('select');
		if( this.get_soldout(string) ){
			return false;
		}
		if( this.opt_already(string) ){
			alert('');

			obj.removeClass( this.removeClassName );

			$(this.goods_ori_form).find('[name="op2"]').val('');

			$(event.target||event.srcElement).val('');
			return false;
		}

		$(this.goods_form_info).hide();

		this.opt_copy(string);
		//obj.removeClass( this.removeClassName );
		//$(this.goods_ori_form).find('[name="op2"]').val('');
	}

	this.set_opt_cart = function(){
		var obj = $(event.target||event.srcElement);
		var goods_idx = obj.data('goods_idx');
		var form = obj.closest('form');

		if( obj.attr('name') == 'change_op1' && form.find('[name="change_op2"]').length > 0 ){
			var string = goods_idx+'/'+obj.val();
			var data = this.ajax('getOp2List',string);
			form.find('[name="change_op2"]').find('option:gt(0)').remove();
			form.find('[name="change_op2"]').append(data.html);
		}
	}

	this.codi_set_opt = function(){
		var obj = $(event.target||event.srcElement);
		var goods_idx = obj.data('goods_idx');
		var form = obj.closest('.opt_layer');

		if( obj.attr('name') == 'op1' && form.find('[name="op2"]').length > 0 ){
			var string = goods_idx+'/'+obj.val();

			var data = this.ajax('getOp2List',string);

			form.find('[name="op2"]').find('option:gt(0)').remove();
			form.find('[name="op2"]').append(data.html);
		}

		if( this.select_check() ){
			return false;
		}

		var string = this.str_enc('select');

		var form = $(event.target||event.srcElement).closest('form');

		if( this.get_soldout(string) ){
			form.find('input[type="checkbox"]').prop('checked',false);
			return false;
		}else{
			form.find('input[type="checkbox"]').prop('checked',true);
		}
	}

	this.codi_confirm = function(){
		var obj = $(event.target||event.srcElement);

		var form = obj.closest('.goods-codi-form');

		var error = false;
		form.find('select').each(function(){
			if( $(this).val() == '' ){
				error = true;
			}
		});

		if( error ){
			alert('');
			return false;
		}

		form.find('input[type="checkbox"]').prop('checked',true);
		form.find('.opt_layer').hide();

		this.codi_get_price();
	}

	this.codi_set_cart = function(quickType){
		if( !this.null_check('codi') ){
			return false;
		}

		var string = this.str_enc('codi');

		if( string == '' ){
			alert('');
			return false;
		}

		this.ajax('set_cart',string);

		if( confirm("")){
			if( quickType != 'parent' ){
				location.href = '/member/cart.php';
			}else{
				parent.location.href = '/member/cart.php';
			}
		}
	}

	this.del_opt = function(){
		$(event.target||event.srcElement).closest(this.goods_form_obj).remove();

		if( $(this.goods_form_obj).length < 2 ){
			$(this.goods_form_info).show();
		}
		this.get_price();
	}

	this.str_enc = function(type){
		var string = new Array();

		var obj = $(this.goods_form_obj).filter(":gt(0)");
		if( type == 'select' ){
			obj = $(event.target||event.srcElement).closest('form');
		}else if( type == 'codi' ){
			obj = $(this.goods_codi_form_obj).filter(':visible');
		}

		obj.each(function(e){
			if( $(this).find('.codiIsCheck').length > 0 && !$(this).find('.codiIsCheck').prop('checked') ){
				return true;
			}

			var tmp = new Array();
			var goods_idx = $(this).find('[name="goods_idx"]').val();
			var op1 = $(this).find('[name="op1"]').val();
			var op2 = $(this).find('[name="op2"]').val();
			var ea = $(this).find('[name="ea"]').val();

			if( !ea ){
				ea = 1;
			}

			if( !goods_idx ){
				return true;
			}

			tmp.push( goods_idx );

			if( op1 ){
				tmp.push(op1);
			}

			if( op2 ){
				tmp.push(op2);
			}

			tmp = tmp.join('_')+'/'+ea;
			string.push(tmp);
		});

		return string;
	}

	this.get_soldout = function(string){
		var data = this.ajax('get_soldout',string);
		if(data){
			if( data.soldout == 'Y' ){
				$(event.target||event.srcElement).val('').removeClass('active');
				return true;
			}else{
				return false;
			}
		}
	}

	this.get_price = function(){
		var string = this.str_enc();

		if( string != '' ){
			var data = this.ajax('get_price',string);

			if( data.isplus_error != 'Y' ){
				$(this.total_price_obj).text( this.number_format(data.total_price) );
				$(this.total_price_obj).next('span').text('��');
			}else{
				$(this.total_price_obj).text( '-' );
				$(this.total_price_obj).next('span').text('');
			}
			$(this.total_ea_obj).text( this.number_format(data.total_ea) );
			return data;
		}else{
			$(this.total_price_obj).text( this.number_format($(this.total_price_obj).data('account')));
		}
	}

	this.codi_get_price = function(){
		var string = this.str_enc('codi');

		if( string != '' ){
			var data = this.ajax('get_price',string);
			$(this.total_codi_price_obj).text( this.number_format(data.total_price) );
			$(this.total_codi_ea_obj).text( this.number_format(data.total_ea) );

			if( data.period_sale_total > 0 ){
				$(this.total_codi_price_dis_obj).text(this.number_format(data.period_sale_total+data.total_price)).show();
			}else{
				$(this.total_codi_price_dis_obj).hide();
			}
		}else{
			$(this.total_codi_price_obj).text( '0' );
			$(this.total_codi_ea_obj).text( '0' );

			$(this.total_codi_price_dis_obj).hide();
		}
	}

	this.set_ea = function(num){
	var obj = $(event.target||event.srcElement);
	if(obj.closest('.goods-form-list').length){
		var ea_obj = obj.closest(".goods-form-list").find('[name="ea"]');
	}else{
	var ea_obj = obj.closest(this.goods_form_obj).find('[name="ea"]');
	}
	var ea = ea_obj.val()-0;
		ea += num-0;

		if( ea < 1 ){
			if( confirm('') ){
				this.del_opt();
			}else{
				ea = 1;
			}
		}

		ea_obj.val(ea);

		this.get_price();
	}

	this.codi_set_ea = function(num){
		var obj = $(event.target||event.srcElement);
		var ea_obj = obj.closest(this.goods_codi_form_obj).find('[name="ea"]');
		var ea = ea_obj.val()-0;
		ea += num-0;

		if( ea < 1 ){
			ea = 1;
		}

		ea_obj.val(ea);

		this.codi_get_price();
	}

	this.set_cart = function(quickType){
		if( !this.null_check() ){
			return false;
		}

		var string = this.str_enc();
		if( string == '' ){
			alert('');
			return false;
		}
		this.ajax('set_cart',string);
		// open_layer('cart_add_layer');   
		// $('#cart_add_layer .prd_basic.col4').get(0).slick.setPosition()

		if( confirm("")){
			if( quickType != 'parent'){
				location.href = '/member/cart.php';
			}else{
				parent.location.href = '/member/cart.php';
			}
		}
	}
	this.set_cart_dev = function(quickType){
		if( !this.null_check() ){
			return false;
		}

		var string = this.str_enc();
		if( string == '' ){
			alert('');
			return false;
		}
		this.ajax('set_cart',string);
		open_layer('cart_add_layer');   
		$('#cart_add_layer .prd_basic.col5').get(0).slick.setPosition()

		// if( confirm("")){
		// 	if( quickType != 'parent'){
		// 		location.href = '/member/cart.php';
		// 	}else{
		// 		parent.location.href = '/member/cart.php';
		// 	}
		// }
	}
	this.set_cart_list = function(className){
		var obj = $(event.target||eventSrcElement);
		var form = className ? obj.closest('.'+className) : obj.closest(this.goods_form_obj);
		var string = new Array();

		var goods_idx = form.find('[name="goods_idx"]').val();
		var op1 = form.find('[name="op1"]').val();
		var op2 = form.find('[name="op2"]').val();
		var ea = form.find('[name="ea"]').val();



		if( form.find('[name="op1"]').length > 0 && op1 == '' ){
			alert('');
			form.find('[name="op1"]').focus();
			return false;
		}

		if( form.find('[name="op2"]').length > 0 && op2 == '' ){
			alert('');
			form.find('[name="op2"]').focus();
			return false;
		}
		var pushstring = goods_idx+'_'+op1;
		if(op2){
			pushstring += '_'+op2;
		}
		pushstring += '/'+ea;
		string.push(pushstring);

		this.ajax('set_cart',string);

		if( confirm("")){
			location.href = '/member/cart.php';
		}
	}

	this.set_wish = function(){
		var string = this.str_enc();

		if( string == '' ){
			alert('');
			return false;
		}
		this.ajax('set_wish',string);
	}

	this.set_wish_single = function(goods_idx){
		var data = this.ajax('set_wish_single', goods_idx);
		eval( data.js_code );
	}

	this.buy = function(quickType){
		sessionStorage.setItem('delFreeShow','N');

		if( !this.null_check() ){
			return false;
		}

		CookieProc.delCookie('buymethod');

		var string = this.str_enc();
		if( string == '' ){
			alert('');
			return false;
		}

		var thCheck = this.ajax('thCheck',string);
		if( thCheck ){
			if( thCheck.sojin_msg ){
				alert(thCheck.sojin_msg);
				return false;
			}

			if( !confirm(thCheck.msg) ){
				return false;
			}
		}

		var data = this.ajax('buy',string);

		if( data.code ){
			eval( data.code );
			return false;
		}

		if( data.url != '' ){
			if( quickType != 'parent'){
				location.href = data.url;
			}else{
				parent.location.href = data.url;
			}
		}else{
			alert('');
		}
	}

	this.kakao_buy = function(quickType){
		CookieProc.setCookie('buymethod','W',24);

		var string = this.str_enc();

		if( string == '' ){
			alert('');
			return false;
		}

		var thCheck = this.ajax('thCheck',string);
		if( thCheck ){
			if( thCheck.sojin_msg ){
				alert(thCheck.sojin_msg);
				return false;
			}

			if( !confirm(thCheck.msg) ){
				return false;
			}
		}

		string.forEach(function(item){
			var data = GoodsProc.ajax('get_soldout',item);
			if( data.soldout == 'Y' ){
				var del_idx = string.indexOf(item);
				string.splice(del_idx,1);
			}
		});

		if( string == '' ){
			alert('');
			return false;
		}

		var data = GoodsProc.ajax('buy',string);

		if( data.url != '' ){
			if( quickType != 'parent'){
				location.href = data.url;
			}else{
				parent.location.href = data.url;
			}
		}else{
			alert('');
		}
	}

	this.get_default_coupon = function(){
		var data = this.ajax('get_default_coupon');
		eval( data.js_code );
	}

	this.codi_buy = function(quickType){
		if( !this.null_check('codi') ){
			return false;
		}

		var string = this.str_enc('codi');
		if( string == '' ){
			alert('');
			return false;
		}
		var data = this.ajax('buy',string);

		if( data.url != '' ){
			if( quickType != 'parent' ){
				location.href = data.url;
			}else{
				parent.location.href = data.url;
			}
		}else{
			alert('');
		}
	}

	this.naver_buy = function(){
		if( !this.null_check() ){
			return false;
		}

		var string = this.str_enc();
		if( string == '' ){
			alert('');
			return false;
		}

		var thCheck = this.ajax('thCheck',string);
		if( thCheck ){
			if( thCheck.sojin_msg ){
				alert(thCheck.sojin_msg);
				return false;
			}

			if( !confirm(thCheck.msg) ){
				return false;
			}
		}

		string.forEach(function(item){
			var data = GoodsProc.ajax('get_soldout',item);
			if( data.soldout == 'Y' ){
				var del_idx = string.indexOf(item);
				string.splice(del_idx,1);
			}
		});

		if( string == '' ){
			alert('');
			return false;
		}

		var data = this.ajax('naver_buy',string);

		if( data.code ){
			eval( data.code );
			return false;
		}

		if( data.url != '' ){
			window.open(data.url);
		}else{
			alert('');
		}
	}

	this.getGoods = function(code){
		var data = this.ajax('getGoods',code);
		return data;
	}

	this.number_format = function(number, decimals, dec_point, thousands_sep){
		number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
		var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		s = '',
		toFixedFix = function(n, prec) {
			var k = Math.pow(10, prec);
			return '' + (Math.round(n * k) / k)
				.toFixed(prec);
		};

		s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
		if (s[0].length > 3) {
			s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
		}

		if ((s[1] || '').length < prec) {
			s[1] = s[1] || '';
			s[1] += new Array(prec - s[1].length + 1).join('0');
		}
		return s.join(dec);
	}
	this.thOp2List = function(idx,type){
		if(type == 'view'){
			var obj = $(event.target||event.srcElement).closest(".select-form");
			var box = obj.find('.no-th').closest('.colorbox');
			$('.slide_color.optSelect .colorbox a.active').removeClass('active');
			$('.size.optSelect').empty().append(defaultSize);

			if(!$('.optSelect a').hasClass("active")){
				$(".sizecolorbox small").show();
				$(".sizecolorbox .scoptname").text('');
			}
		}else{
			var obj = $(event.target||event.srcElement).closest(".goods-form-list");
			var box = obj.find('option.no-th');
			
			obj.find('select[name=op2] option:gt(0)').remove();
			obj.find(".opt_layer select").each(function(){
				$(this).find('option').eq(0).prop("selected",true);
			})
		}
		obj.find('.thico').toggleClass('on');
		
		// if(!$('.optSelect a').hasClass("active")){
		// 	$(".sizecolorbox small").show();
		// 	$(".sizecolorbox .scoptname").text('');
		// }
		
		if( $('.thico').hasClass('on') ){
			if( $('.no-th').length > 0 ){

				box.hide();
				return false;
			}
			$.ajax({
				url:this.classFileAddr,
				type:'post',
				data:{'method':'thOp2List','string':idx},
				success:function(data){
					data = JSON.parse(data);
					for(i in data){
						if(type == 'view'){
							obj.find('a[data-ops_idx="'+data[i]+'"]').addClass('no-th').closest('.colorbox').hide();

						}else{
							obj.find('option[data-ops_idx="'+data[i]+'"]').addClass('no-th').hide();
						}
					}
				},
				beforeSend:function(){
					$('#dimmed').show();
				},
				complete:function(){
					$('#dimmed').hide();
				}
			});
		}else{
			box.show();
		}

	}
			this.colorchiponoff = function(){
				var obj = $(event.target||event.srcElement).closest('.colorchip');
				if(obj.css('overflow') == 'hidden'){
					obj.css('overflow',"visible");
					obj.find(".colorchipbox").show();
				}else{
					obj.css('overflow',"hidden");
					obj.find(".colorchipbox").hide();
				}
			}
			this.sizeChange = function(){
				var obj = $(event.target||event.srcElement);
				if( obj.hasClass('active') ){
					return false;
				}

				obj.closest('.size_opt').find('li a').removeClass('active');
				obj.addClass('active');

				var eq = obj.closest('li').index();
				obj.closest('.size_info').find('.eleNum').hide().eq(eq).fadeIn('fast');
			}

			this.toggleQna = function(){
				var obj = $(event.target||event.srcElement);
				obj.closest('tr').next('tr').toggle();
			}

			this.deleteQna = function(num){
				if(!confirm('')){
					return false;
				}

				var data = this.ajax('deleteQna',num);
				eval(data.code);
			}

			this.set_thumb_wish = function(goods_idx){
				var data = this.ajax('set_thumb_wish', goods_idx);
				eval( data.js_code );
			}

			this.cart_del = function(cart_idx,basket_str,delfree) {
				if(!confirm('')){
					return false;
				}

				var couponindex = $('input[name="coupon_idx"]:checked').val(); // �좏깮�� 荑좏룿
				var string = cart_idx+'/'+basket_str+'/'+couponindex+'/'+delfree;
				var data = this.ajax('cart_del',string);

				eval(data.code);
			}

			this.order_set_cart = function(basket_idx){
				var couponindex = $('input[name="coupon_idx"]:checked').val(); // �좏깮�� 荑좏룿
				var obj = $(event.target||eventSrcElement);
				var form = obj.closest(this.goods_form_obj);
				var string = new Array();

				var goods_idx = form.find('[name="goods_idx"]').val();
				var op1 = form.find('[name="op1"]').val();
				var op2 = form.find('[name="op2"]').val();
				var ea = form.find('[name="ea"]').val();
				string.push(goods_idx+'_'+op1+'_'+op2+'/'+ea);


				if( form.find('[name="op1"]').length > 0 && op1 == '' ){
					alert('');
					form.find('[name="op1"]').focus();
					return false;
				}

				if( form.find('[name="op2"]').length > 0 && op2 == '' ){
					alert('');
					form.find('[name="op2"]').focus();
					return false;
				}

				var returnIndex = this.ajax('order_set_cart',string);

				location.href = '/order/buy.php?basketindex='+basket_idx+'-'+returnIndex+'&couponindex='+couponindex;
			}

			this.quickView = function(goods_idx,op1,firstBuy){
				$('#quickViewFrame iframe').attr('src','/shop/view_quick.php?index_no='+goods_idx+'&op1='+op1+'&firstBuy='+firstBuy);
				$('#quickViewFrame').show();

				$('html,body').css('overflow','hidden');
			}

			this.quickViewVideo = function(goods_idx,op1,firstBuy){
				$('#quickViewVideoFrame iframe').attr('src','/shop/view_quick_video.php?index_no='+goods_idx+'&op1='+op1+'&firstBuy='+firstBuy);
				$('#quickViewVideoFrame').show();

				$('html,body').css('overflow','hidden');
			}

			this.quickViewVideo_dev = function(goods_idx,op1){
				$('#quickViewVideoFrame iframe').attr('src','/shop/view_quick_video_dev.php?index_no='+goods_idx+'&op1='+op1);
				$('#quickViewVideoFrame').show();

				$('html,body').css('overflow','hidden');
			}

			this.quickViewClose = function(){
				$('#quickViewFrame iframe, #quickViewVideoFrame iframe').attr('src','');
				$('#quickViewFrame, #quickViewVideoFrame').hide();
				$('html,body').css('overflow','auto');
			}

			this.getOp2 = function(){
				var obj = $(event.target||event.srcElement);
				var tr = obj.closest('tr');
				var goods_idx = tr.find('[name="goods_idx[]"]').val();

				var string = goods_idx+'/'+obj.val();
				var data = this.ajax('getOp2List2',string);

				tr.find('[name="op2[]"]').find('option:gt(0)').remove();
				tr.find('[name="op2[]"]').append(data.html);

			}
			this.review_detail_view_open = function(index_no,type,sort,op1,op2){
				var obj = $(event.srcElement||event.target);
				var idx = obj.closest('li').index();
				var op1 = op1;
				var op2 = op2;
				var sort = sort;

				$.ajax({
					url : '/review/review_view.php',
					type: 'post',
					data : {
						index_no : index_no,
						op1:op1,
						op2:op2,
						sort:sort,
					},
					async: false,
					success: function(data){
						
						$('#popView',document).html(data);
						$('#popView',document).show();
						$('#popView .popslide',document).slick({
							arrows: true,
							dots: true,
							infinite: true,
							slidesToShow: 1,
							slidesToScroll: 1
						});
						if(type =='view_page'){
							$('#popView .popslide',parent.document).slick('slickGoTo',idx);
						}
						try{
							insert_buyloc('review_idx='+index_no);
						}catch(e){}
					}
				});
			}
	// }
}

var GoodsProc = new GoodsProc();