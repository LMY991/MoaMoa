function BuyProc(){
	this.country_weight = 30000; 
	this.basket_idxs_obj = '.basket_idxs_obj'; 
	this.member_point_obj = '.member_point_obj'; 
	this.member_deposit_obj = '.member_deposit_obj'; 
	this.coupon_obj = '.coupon_obj'; 
	this.sub_coupon_obj = '.sub_coupon_obj';
	this.zip_obj = '.zip_obj'; 
	this.del_loc_obj = '.del_loc_obj'; 
	this.area_code_obj = '.area_code_obj'; 
	this.use_account_obj = '.use_account_obj'; 
	this.buymethod_obj = '.buymethod_obj'; 
	this.form_obj = '.form_obj'; 
	this.bank_obj = '.bank_obj'; 
	this.inname_obj = '.inname_obj'; 
	this.indate_obj = '.indate_obj'; 

	this.point1_discount_obj = '.point1_discount_obj';
	this.total_discount_obj = '.total_discount_obj'; 
	this.is_th_del_obj = '.is_th_del_obj'; 
	this.total_delaccount_obj = '.total_delaccount_obj'; 
	this.delaccount_obj = '.delaccount_obj';
	this.delaccount_th_obj = '.delaccount_th_obj'; 
	this.delaccount_out_obj = '.delaccount_out_obj'; 
	this.coupon1_discount_obj = '.coupon2_discount_obj'; 
	this.coupon2_discount_obj = '.coupon1_discount_obj'; 
	this.isplus_discount_obj = '.isplus_discount_obj'; 
	this.memberDelZone_obj = '.memberDelZone_obj'; 
	this.save_point_obj = '.save_point_obj'; 
	this.coupon_name_obj = '.coupon_name_obj'; 
	this.sub_coupon_name_obj = '.sub_coupon_name_obj'; 
	this.mileage_obj = '.mileage_obj'; 
	this.period_sale_total = '.period_sale_total_obj';

	this.totalGoods = '.total_goods_price_obj'; 

	this.classFileAddr = '/class/buy_ajax.php'; 

	this.ajax = function(SendData){
		SendData = JSON.parse(SendData);

		var data = $.ajax({
						url:this.classFileAddr,
						type:'post',
						data:SendData,
						async:false,
						success:function(data){}
					}).responseText;
		if( data ){
			data = JSON.parse(data);
			return data;
		}
	}

	this.calcul = function(){
		if( $('.th_del_type').val() == 'PART' ){
			if( $('.is_th_del_obj:checked').data('isdawn') == 'Y' ){
				$('#is_dawn').prop('checked',true);
			}else{
				$('#is_dawn').prop('checked',false);
			}

			if( $('.is_th_del_obj:checked').data('istoday') == 'Y' ){
				$('#is_today').prop('checked',true);
			}else{
				$('#is_today').prop('checked',false);
			}
		}

		if( $('input[name="is_dawn"]:checked').val() == 'A') {
			$('#dawnDeliBox').css('display','table-row');
		}else{
			$('#dawnDeliBox').css('display','none');
		}

			if( $(this.is_th_del_obj).filter(':checked').val() == 'Y' && $(this.del_loc_obj).filter(':checked').val() == '2' ){
				alert('');
				$(this.is_th_del_obj).eq(1).prop('checked',true);
				this.calcul();
				return false;
			}

		// }

			var max_member_point = $.trim($(this.member_point_obj).data('max'))-0;
			var member_point = $.trim($(this.member_point_obj).val())-0;
			if( !member_point ){
				member_point = 0;
				$(this.member_point_obj).val(0);
			}

			if( !$.isNumeric(member_point) ){
				alert('');
				$(this.member_point_obj).val(0).focus();
				BuyProc.calcul();
				return false;
			}

			if( member_point > max_member_point && member_point > 0){
				alert(''+this.number_format(max_member_point)+'');
				$(this.member_point_obj).val(0).focus();
				BuyProc.calcul();
				return false;
			}

			$(this.member_point_obj).val($(this.member_point_obj).val()-0);
		// }


			var max_member_deposit = $.trim($(this.member_deposit_obj).data('max'))-0;
			var member_deposit = $.trim($(this.member_deposit_obj).val())-0;
			if( !member_deposit ){
				member_deposit = 0;
				$(this.member_deposit_obj).val(0);
			}

			if( !$.isNumeric(member_deposit) ){
				alert('');
				$(this.member_deposit_obj).val(0).focus();
				return false;
			}

			if( member_deposit > max_member_deposit ){
				alert(''+this.number_format(max_member_deposit)+'');
				$(this.member_deposit_obj).val(0).focus();
				return false;
			}

			$(this.member_deposit_obj).val($(this.member_deposit_obj).val()-0);
		// }

			var max_member_coin = $.trim($('.member_coin_obj').data('max'))-0;
			var member_coin = $.trim($('.member_coin_obj').val())-0;
			if( !member_coin ){
				member_coin = 0;
				$('.member_coin_obj').val(0);
			}

			if( !$.isNumeric(member_coin) ){
				alert('');
				$('.member_coin_obj').val(0).focus();
				return false;
			}

			if( member_coin > max_member_coin ){
				alert(''+this.number_format(max_member_coin)+'');
				$('.member_coin_obj').val(0).focus();
				return false;
			}

			$('.member_coin_obj').val($('.member_coin_obj').val()-0);


		if( $(this.del_loc_obj).filter(':checked').val() == 2 ){
			var data = new Object();
			data.method = 'getTotalWeight';
			data.string = $(this.basket_idxs_obj).val();
			data = JSON.stringify(data);

			var returnData = this.ajax(data);
			if( returnData.total_weight > this.country_weight ){
				$(this.del_loc_obj).filter(':first').prop('checked',true);
				$('.delTypeBox').hide().eq(0).show();

				this.calcul();

				alert("");
				return false;
			}
		}

		var data = new Object();
		data.method = 'getSellPrice';

		var stringData = {};
		stringData['basket_idxs'] = $(this.basket_idxs_obj).val(); // tmp_basket.index_no
		stringData['coupon1'] = $(this.coupon_obj).filter(':checked').val(); // shop_coupon_mem.index_no 
		stringData['coupon2'] = $(this.sub_coupon_obj).filter(':checked').val(); // shop_coupon_mem.index_no 
        		stringData['point1'] = member_point; // shop_member.mempoints 
		stringData['point2'] = member_deposit; // shop_member.memaccounts 
		stringData['thDel'] = $(this.is_th_del_obj).filter(':checked').val(); 
		stringData['zip'] = $(this.zip_obj).val();
		stringData['del_loc'] = $(this.del_loc_obj).filter(':checked').val();
		stringData['area_code'] = $(this.area_code_obj).val();
		stringData['dawn'] = $('input[name="is_dawn"]:checked').val();
		stringData['allToday'] = $('#allToday').val();
 		stringData['coin'] = $('.member_coin_obj').val();
		data.string = stringData;

		data = JSON.stringify(data);

		var returnData = this.ajax(data);

		if( !returnData ){
			location.reload();
			return false;
		}

		if( $('input[name="is_dawn"]:checked').val() == 'A' && returnData.del_account_dawn == -1 ){
			alert('');
			$(this.is_th_del_obj).eq(1).prop('checked',true);
			$('input[name="is_dawn"]:first').prop('checked',true);
			$('input[name="is_th_del"]:first').prop('checked',true);
			this.calcul();
			return false;
		}


		if( $('input[name="is_dawn"]:checked').val() == 'T' && ($('#del_addr1').val().substring(0,2) != '�쒖슱' && $('#del_addr1').val() != '') ){
			alert('');
			$('input[name="is_dawn"]:first').prop('checked',true);
			$('input[name="is_th_del"]:first').prop('checked',true);
			this.calcul();
			return false;
		}

		if( returnData.use_account < 0 ){
			alert('');
			$(this.member_point_obj).val(0);
			$(this.member_deposit_obj).val(0);
			$(this.coupon_obj).filter(':first').prop('checked',true).focus();
			this.calcul();
			return false;
		}

		if( stringData['coupon1'] > 0 && (Number(returnData.coupon1_discount)+Number(returnData.coupon2_discount)) <= 0 ){
			if( returnData.buy_limit_error == 'Y' ){
				alert('');
			}else{
				alert('');
			}
			$(this.coupon_obj).filter(':first').prop('checked',true).focus();
			this.calcul();
			return false;
		}

		if( stringData['coupon2'] > 0 && (Number(returnData.sub_coupon1_discount)+Number(returnData.sub_coupon2_discount)) <= 0 ){
			alert('');
			$(this.sub_coupon_obj).filter(':first').prop('checked',true).focus(); // 荑좏룿 珥덇린��
			this.calcul();
			return false;
		}

		$(this.save_point_obj).text(this.number_format(returnData.save_point));

		$(this.use_account_obj).text(this.number_format(returnData.use_account)).data('account',returnData.use_account); // �꾩븸 �ъ슜�뚮Ц�� data�� �꾩떆����

		$(this.coupon1_discount_obj).text(this.number_format(returnData.coupon1_discount));

		$(this.coupon2_discount_obj).text(this.number_format(returnData.coupon2_discount));

		$(this.point1_discount_obj).text(this.number_format(returnData.point1_discount));
		if( returnData.point1_discount > 0 ){
			$(this.point1_discount_obj).closest('tr').show();
		}else{
			$(this.point1_discount_obj).closest('tr').hide();
		}

		$(this.point2_discount_obj).text(this.number_format(returnData.point2_discount));
		if( returnData.point2_discount > 0 ){
			$(this.point2_discount_obj).closest('tr').show();
		}else{
			$(this.point2_discount_obj).closest('tr').hide();
		}

		$('.coin_discount_obj').text(this.number_format(returnData.coin_discount));
		if( returnData.coin_discount > 0 ){
			$('.coin_discount_obj').closest('tr').show();
		}else{
			$('.coin_discount_obj').closest('tr').hide();
		}

		$(this.isplus_discount_obj).text(this.number_format(returnData.isplus_discount));

		$(this.total_delaccount_obj).text(this.number_format(returnData.del_account));

		var del_account_ori = returnData.del_account-returnData.del_account_th-returnData.del_account_out; // 諛곗넚猷�-�ㅻ뒛異쒕컻諛곗넚鍮�-�곌컙鍮�
		if( del_account_ori < 0 ){
			del_account_ori = 0;
		}
		$(this.delaccount_obj).text(this.number_format(del_account_ori));

		$(this.delaccount_th_obj).text(this.number_format(returnData.del_account_th));

		$(this.delaccount_out_obj).text(this.number_format(returnData.del_account_out));

		$(this.total_discount_obj).text(this.number_format(returnData.total_discount2+returnData.period_sale_total));

		/*
		if( returnData.total_discount2 > 0 ){
			$(this.total_discount_obj).closest('tr').show();
		}else{
			$(this.total_discount_obj).closest('tr').hide();
		}
		*/


		if( returnData.use_account == 0 ){
			if( $(this.buymethod_obj).val() != 'B' && CookieProc.getCookie('buymethod') != 'K'){
				this.chooseMethod('B');
			}
		}

		$(this.coupon_name_obj).text(returnData.coupon_name);

		$(this.sub_coupon_name_obj).text(returnData.sub_coupon_name);


		if( (returnData.total_discount) > 0 ){
			$(this.mileage_obj).each(function(){
				$(this).data('default',$(this).text());
				$(this).text(0);
			});
		}else{
			$(this.mileage_obj).each(function(){
				$(this).text($(this).data('default'));
			});
		}

		$(this.totalGoods).text(this.number_format(returnData.total_goods+returnData.period_sale_total+returnData.addac));

		$(this.period_sale_total).text(this.number_format(returnData.period_sale_total));

		var addPrice = returnData.delaccount_member_std - (returnData.use_account-returnData.del_account);
		var minPrice = 50000;

		if( (returnData.use_account >= minPrice && returnData.del_account > 0) && $('input[name="is_dawn"]:checked').val() == '' ) {
			if( addPrice > 0 ){
				$('.add_price').text(this.number_format(addPrice)).closest('div').show();
			}else{
				$('.add_price').closest('div').hide();
			}
			$('.delfree').show();
			sessionStorage.setItem('delFreeShow','Y')
		}
	}

	this.pointCheck = function(obj){
		var obj = $(obj);
		var num = obj.val();

		if( num < 1000 && num != 0 ){
			obj.focus();
			obj.val(0);
			alert('');
		}

		/*
		if( num%100 > 0 ){
			obj.val( obj.val()-num%100 );
			alert('');
			obj.focus();
		}
		*/

		this.calcul();
	}

	this.depositCheck = function(obj){
		var obj = $(obj);
		var num = obj.val();

		/*
		if( num%100 > 0 ){
			obj.val( obj.val()-num%100 );
			alert('');
			obj.focus();
		}
		*/

		this.calcul();
	}

	this.coinCheck = function(obj){
		var obj = $(obj);
		var num = obj.val();

		/*
		if( num%100 > 0 ){
			obj.val( obj.val()-num%100 );
			alert('');
			obj.focus();
		}
		*/

		this.calcul();
	}

	this.onlyNum = function(){
		var obj = $(event.target||event.srcElement);
		var num = $.trim($(obj).val())-0;
		if( !$.isNumeric(num) ){
			alert('�レ옄留� �낅젰�댁＜�몄슂');
			obj.val('');
			$(obj).focus();
		}
	}

	// �レ옄 �쇳몴 �щĸ蹂�寃�
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

		// Fix for IE parseFloat(0.55).toFixed(0) = 0;
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

	this.delZoneSelect = function(){ 
		var obj = $(event.target||event.srcElement).find('option:selected');

		var zip1 = obj.data('zip1');
		var addr1 = obj.data('addr1');
		var addr2 = obj.data('addr2');
		var del_cp = obj.data('del_cp').split('-');
		var del_phone = obj.data('del_phone').split('-');
		var del_name = obj.data('del_name');
		if( del_name ){
			$('[name="del_name"]').val(del_name);
		}

		$('[name="del_zip"]').val(zip1);
		$('[name="del_addr1"]').val(addr1);
		$('[name="del_addr2"]').val(addr2);

		for(i=0; i<del_cp.length; i++){
			$('[name="del_cp[]"]').eq(i).val($.trim(del_cp[i]));
		}

		for(i=0; i<del_phone.length; i++){
			$('[name="del_phone[]"]').eq(i).val($.trim(del_phone[i]));
		}

		$(this.del_loc_obj).eq(0).prop('checked',true);
		$('.delTypeBox').hide().eq(0).show();

		this.calcul();

		$(this.memberDelZone_obj).find('option:first').prop('selected',true);
	}

	this.deliOptCopy = function(){
		var obj = $(event.target||event.srcElement);
		if( !obj.prop('checked') ){
			return false;
		}
		var name = $('[name="name"]').val();
		$('[name="del_name"]').val(name);

		var idx = 0;
		$('[name="phone[]"]').each(function(){
			$('[name="del_phone[]"]').eq(idx).val($(this).val());
			idx++;
		});

		var idx = 0;
		$('[name="cp[]"]').each(function(){
			$('[name="del_cp[]"]').eq(idx).val($(this).val());
			idx++;
		});
	}

	this.deliChange = function(){ 
		var obj = $(event.target||event.srcElement);
		$('.delTypeBox').hide().eq(obj.val()-1).show();

		$('[name="del_addr2"]').prop('readonly',false);

		if( obj.val() == 1 ){
			$('#del_zip').val('');
			$('#del_addr1').val('');
			$('#del_addr2').val('');
		}

		if( obj.val() == 2 ){
			alert('');
		}

		this.calcul();
	}


	this.setAllPoint = function(){ 
		var use_account = $(this.use_account_obj).data('account')-0;
		var member_point = $(this.member_point_obj).data('max')-0;

		var point = $(this.member_point_obj).val()-0;
		use_account += point;
		$(this.member_point_obj).val(0);

		if( use_account <= 0 ){
			alert('');
			return false;
		}

		if( member_point >= use_account ){
			$(this.member_point_obj).val(use_account);
		}else{
			$(this.member_point_obj).val(member_point);
		}

		this.pointCheck($(this.member_point_obj));
	}

	this.setAllAccount = function(){
		var use_account = $(this.use_account_obj).data('account')-0;
		var member_account = $(this.member_deposit_obj).data('max')-0;

		var point = $(this.member_deposit_obj).val()-0;
		use_account += point;
		$(this.member_deposit_obj).val(0);

		if( use_account <= 0 ){
			alert('');
			return false;
		}

		if( member_account >= use_account ){
			$(this.member_deposit_obj).val(use_account);
		}else{
			$(this.member_deposit_obj).val(member_account);
		}

		this.depositCheck($(this.member_deposit_obj));
	}

	this.setAllCoin = function(){
		var use_account = $(this.use_account_obj).data('account')-0;
		var member_coin = $('.member_coin_obj').data('max')-0;

		var coin = $('.member_coin_obj').val()-0;
		use_account += coin;
		$('.member_coin_obj').val(0);

		if( use_account <= 0 ){
			alert('');
			return false;
		}

		if( member_coin >= use_account ){
			$('.member_coin_obj').val(use_account);
		}else{
			$('.member_coin_obj').val(member_coin);
		}

		this.coinCheck($('.member_coin_obj'));
	}

		this.chooseMethod = function(method,restrict){
			var cookieMethod = CookieProc.getCookie('buymethod');
			if( cookieMethod && method != cookieMethod ){
				alert("");
				return false;
			}

			var obj = $('[onclick="BuyProc.chooseMethod(\''+method+'\')"]');

			$('[onclick^="BuyProc.chooseMethod"]').removeClass('active');
			obj.addClass('active');

			$('input[name="buymethod"]').val(method);
			$('.choice strong').text("'"+obj.text()+"'");

			if( method == 'B' ){
				$('.tabcnt_method0').show();
			}else{
				$('.tabcnt_method0').hide();
			}
			scroll_page();
		}

		this.deli_check = function(zip){
			var data = $.ajax({
				url:'/ajax_proc/deli_check.php',
				type:'post',
				async:false,
				data:{'zip':$('#del_zip').val()},
				success:function(code){
				}
			}).responseText;

			return data;
		}

		this.buy = function(){
			sessionStorage.setItem('delFreeShow','N');


			if( $('#is_dawn').prop('checked') ){
				var obj = $('input[name="dawnMemo"]:checked');
				if( obj.length < 1 ){
					alert('');
					$(window).scrollTop( $('.tbl_order').offset().top -200);
					return false;
				}

				var passObj = obj.closest('div').find('.dawnMemoPasswd');

				if( passObj.length > 0 && passObj.val() == '' ){
					alert('');
					passObj.focus();
					return false;
				}
			}

			if($("input[name=nm_agreement]").filter(':checked').val()=='F'){
				alert('');
				return false;
			}

			var use_account = $(this.use_account_obj).data('account')-0;
			if( $(this.buymethod_obj).val() == 'B' && use_account > 0  ){
				if( $(this.bank_obj).find('option:selected').val() == '' ){
					alert('');
					$(this.bank_obj).focus();
					return false;
				}

				if( $.trim($(this.inname_obj).val()) == ''){
					alert('');
					$(this.inname_obj).focus();
					return false;
				}
			}

			if( $(this.buymethod_obj).val() == 'W' && use_account < 1000  ){ 
				alert('');
				return false;
			}

			// 湲곕낯 �꾩닔媛� 寃�利�
			var error = false;
			$('.required').each(function(){
				if( !$(this).val()){
					alert($(this).data('require_msg')+'');
					$(this).focus();
					error = true;
					return false;
				}
			});

			if( error ){
				return false;
			}


			if( $(this.del_loc_obj).filter(':checked').val() == '1' || $(this.del_loc_obj).length <	1 ){
				if( !$('#del_zip').val() && $('#del_zip').length > 0 ){
					alert('');
					$('#del_zip').focus();
					return false;
				}

				if( !$('#del_addr1').val() && $('#del_addr1').length > 0 ){
					alert('');
					$('#del_addr1').focus();
					return false;
				}

				if( !$('#del_addr2').val() && $('#del_addr2').length > 0 ){
					alert('');
					$('#del_addr2').focus();
					return false;
				}
			}else{ 
				if( !$(this.area_code_obj).val() ){
					$(this.area_code_obj).focus();
					alert('');
					return false;
				}

				if( !$('#ozip1').val() && $('#ozip1').length > 0 ){
					alert('');
					$('#ozip1').focus();
					return false;
				}

				if( !$('#oaddr1').val() &&	$('#oaddr1').length > 0 ){
					alert('');
					$('#oaddr1').focus();
					return false;
				}

				if( !$('#oaddr2').val() &&	$('#oaddr2').length > 0 ){
					alert('');
					$('#oaddr2').focus();
					return false;
				}

				if( !$('#delivery_memo').val() && $('#delivery_memo').length > 0 ){
					alert('');
					$('#delivery_memo').focus();
					return false;
				}
			}

			$('#country').val($('#area_code option:selected').text());

			if( this.deli_check($('#del_zip').val()) == 1 && $('#th_del_type').val() != '' && $('input[name="is_dawn"]:checked').val() == '' ){
				if(confirm("")){
					$('#is_dawn').prop('checked',true);
					$(window).scrollTop( $('.tbl_order').offset().top -200);
					$('#dawnboxLayout').focus();
					BuyProc.calcul();
					return false;
				}
			}

			/*
			if( this.deli_check($('#del_zip').val()) == 1 && $('#th_del_type').val() != '' && $('input[name="is_dawn"]:checked').val() == '' ){
				alert("");
			}
			*/

			if( !confirm("") ){
				return false;
			}

			$(this.form_obj).submit();
		}

		this.setShowRoom = function(){ 
			$('.delTypeBox').hide().eq(0).show();

			$('[name="del_zip"]').val('04072');
			$('[name="del_addr1"]').val('');
			$('[name="del_addr2"]').val('').prop('readonly',true);

			this.calcul();
		}

		this.testSetting = function(){
			$('input[name="name"]').val('');
			$('input[name="passwds"]').val('1234');
			$('input[name="phone[]"]').val('123');
			$('input[name="cp[]"]').eq(0).val('8501');
			$('input[name="cp[]"]').eq(1).val('3073');
			$('input[name="email"]').val('tfed1214@naver.com');

			$('#name_same').trigger('click');

			$('input[name="del_zip"]').val('04702');
			$('input[name="del_addr1"]').val('');
			$('input[name="del_addr2"]').val('');
		}

		this.testSetting2 = function(){
			$('input[name="name"]').val('');
			$('input[name="passwds"]').val('1234');
			$('input[name="phone[]"]').val('123');
			$('input[name="cp[]"]').eq(0).val('3737');
			$('input[name="cp[]"]').eq(1).val('4385');
			$('input[name="email"]').val('attrangs@naver.com');

			$('#name_same').trigger('click');

			$('input[name="del_zip"]').val('04702');
			$('input[name="del_addr1"]').val('');
			$('input[name="del_addr2"]').val('');
		}
}

var BuyProc = new BuyProc();