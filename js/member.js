function MemberProc(){
	this.goods_form_obj = '.goods-form';

	this.classFileAddr = '/class/member_ajax.php';

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

	this.str_enc = function(type){
		var string = new Array();
		var obj = $(this.goods_form_obj).filter(":gt(0)");

		obj.each(function(e){
			if( $(this).find('input[name="cart_idxs[]"]').length > 0 && !$(this).find('input[name="cart_idxs[]"]').prop('checked') ){
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

	this.cart_del = function(index_no){
		if( !confirm('��젣�섏떆寃좎뒿�덇퉴?')){
			return false;
		}

		var data = {};
		data.method = 'cartDel';
		data.string = index_no;
		data = JSON.stringify(data);

		var returnData = this.ajax(data);
		eval( returnData.js_code );
	}

	this.choose_buy = function(){
		if ( $('[name="cart_idxs[]"]:checked').length <= 0 ){
			alert('�좏깮�� �곹뭹�� �놁뒿�덈떎.');
			return false;
		}

		var string = this.str_enc();
		var thCheck = GoodsProc.ajax('thCheck',string);
		if( thCheck ){
			if(thCheck.sojin_msg){
				alert(thCheck.sojin_msg);
				return false;
			}

			if( !confirm(thCheck.msg) ){
				return false;
			}
		}

		CookieProc.delCookie('buymethod');
		var idxs = new Array();
		$('[name="cart_idxs[]"]:checked').each(function(){
			idxs.push($(this).val());
		});

		sessionStorage.setItem('delFreeShow','N');
		location.href = "/order/buy.php?basketindex="+idxs.join('-');
	}

	this.all_buy = function(){
		$('#allCheck').prop('checked',true);
		$('input[name="cart_idxs[]"]').prop('checked',true);

		this.choose_buy();
	}

	this.choose_del = function(){
		var obj = $(this.goods_form_obj).filter(":gt(0)");

		var data = new Array();
		obj.each(function(){
			var checkObj = $(this).find('input[name="cart_idxs[]"]');
			if( !checkObj.prop('checked') ){
				return true;
			}

			data.push(checkObj.val());
		});

		if( data.length <= 0 ){
			alert('');
			return false;
		}

		if( !confirm('')){
			return false;
		}
		var idxs = data.join(',');
		var data = {};
		data.method = 'cartDel';
		data.string = idxs;
		data = JSON.stringify(data);

		var returnData = this.ajax(data);
		eval( returnData.js_code );
	}

	this.cart_all_like = function(){
		var data = {};
		data.method = 'cart_all_like';
		data.string = '';
		data = JSON.stringify(data);

		var returnData = this.ajax(data);
		eval( returnData.js_code );
	}

	this.cart_all_del = function(){
		$('#allCheck').prop('checked',true);
		$('input[name="cart_idxs[]"]').prop('checked',true);

		this.choose_del();
	}

	this.change_ea = function(num){
		var obj = $(event.target||event.srcElement);
		var form = obj.closest('form');
		var cartIdx = form.find('input[name="cart_idx"]').val();
		var ea = form.find('input[name="ea"]').val();
		var newEA = Number(ea)+Number(num);

		if( newEA <= 0 ){
			this.cart_del(cartIdx); 
			return false;
		}

		var data = {};
		data.method = 'cartChangeEA';

		var stringData = {};
		stringData.index_no = cartIdx;
		stringData.ea = newEA;
		data.string = stringData;
		data = JSON.stringify(data);

		this.ajax(data);
		form.find('input[name="ea"]').val(newEA);

		var data = GoodsProc.get_price();
		// cartCalcul();
		$('#total_price').text(BuyProc.number_format(data.total_price));
		$('#del_account').text(BuyProc.number_format(data.del_account));
		$('#use_account').text(BuyProc.number_format(data.use_account));
	}

	this.with_check = function(selector){
		var obj = $(event.target||event.srcElement);
		var checked = obj.prop('checked');
		$(selector).prop('checked',checked);
	}


	this.loginDataCheck = function(){
		var obj = $(event.target||event.srcElement);
		var form = obj.closest('form');

		if( $.trim(form.find('[name="id"]').val()) == '' ){
			form.find('[name="id"]').focus();
			alert('�꾩씠�붾� �낅젰�댁＜�몄슂');
			return false;
		}

		if( $.trim(form.find('[name="passwd"]').val()) == '' ){
			form.find('[name="passwd"]').focus();
			alert('鍮꾨�踰덊샇瑜� �낅젰�댁＜�몄슂');
			return false;
		}

	}

	this.addFavor = function(){
		var data = {};
		data.method = 'addFavor';
		data.string = '';
		data = JSON.stringify(data);

		var returnData = this.ajax(data);

		if( returnData ){
			if( returnData.js_code ){
				eval( returnData.js_code );
				return false;
			}
		}

        var bookmarkURL = "https://attrangs.co.kr";
        var bookmarkTitle = "�꾨쑉�묒뒪";
        var triggerDefault = false;

        if (window.sidebar && window.sidebar.addPanel) {
            // Firefox version < 23
            window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
        } else if ((window.sidebar && (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)) || (window.opera && window.print)) {
            // Firefox version >= 23 and Opera Hotlist
            var $this = $(this);
            $this.attr('href', bookmarkURL);
            $this.attr('title', bookmarkTitle);
            $this.attr('rel', 'sidebar');
            $this.off(e);
            triggerDefault = true;
        } else if (window.external && ('AddFavorite' in window.external)) {
            // IE Favorite
            window.external.AddFavorite(bookmarkURL, bookmarkTitle);
        } else {
            // WebKit - Safari/Chrome
            alert(returnData.msg+"\n"+(navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D �ㅻ� �뚮윭 利먭꺼李얘린�� �깅줉�섏떎 �� �덉뒿�덈떎.');
        }

		location.reload();

        return triggerDefault;
	}

	this.getGradeCoupon = function(){
		var data = {};
		data.method = 'getGradeCoupon';
		data.string = '';
		data = JSON.stringify(data);

		var returnData = this.ajax(data);
		eval( returnData.js_code );
	}

	this.getTypeCoupon = function(type){
		var data = {};
		data.method = 'getTypeCoupon';
		data.string = type;
		data = JSON.stringify(data);

		var returnData = this.ajax(data);
		eval( returnData.js_code );
	}

	this.delUserKeyword = function(){
		if( !confirm('' )){
			return false;
		}

		CookieProc.delCookie('user_keyword');
		if( $('.ticker_user_search_keyword .delKeyword').length <= 0){
			alert('');
			return false;
		}else{
			$('.ticker_user_search_keyword .delKeyword').remove();
			$('.noKeyword').show();
		}
	}

	this.getGradeCoupons = function() { // �대떖�� 荑좏룿諛쏄린
		var data = {};
		data.method = 'getGradeCoupons';
		data.string = '';
		data = JSON.stringify(data);

		var returnData = this.ajax(data);
		eval( returnData.js_code );
	}
	//利먭꺼李얘린
	this.wishSet = function(num_idx,type){
		event.preventDefault();
		event.stopPropagation();
		if(!num_idx){ return false;}
		var obj = $(event.target);
		$.ajax({
			url:this.classFileAddr,
			type:'post',
			async:false,
			data:{'method':'wishSet','num_idx':num_idx,'type':type},
			success:function(code){
				if(code) eval(code);
			}
		});
	}
}

var MemberProc = new MemberProc();