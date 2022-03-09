function OrderProc(){
	this.form_obj = '#orderForm';

	this.ordername_obj = '#ordername_obj';
	this.orderno_obj = '#orderno_obj';
	this.passwd_obj = '#passwd_obj';

	this.classFileAddr = '/class/order_ajax.php'; // �대떦�뚯씪 �꾩튂

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

	this.getTradeReceipt = function(){
		var data = new Object();
		data.method = 'getTradeReceipt';
		data.string = '';
		data.orderno = $(this.orderno_obj).val();
		data.ordername = $(this.ordername_obj).val();
		data.passwd = $(this.passwd_obj).val();

		data = JSON.stringify(data);

		var returnData = this.ajax(data);
		eval(returnData.js_code);
	}

	this.getReceiptSubmit = function(){
		window.open('','receipt_frame','width=970,height=800');

		$(this.form_obj).attr('action','/member/receipt.php');
		$(this.form_obj).attr('target','receipt_frame');
		$(this.form_obj).submit();

		$(this.form_obj).attr('action','');
		$(this.form_obj).attr('target','');
	}

	this.pay = function(selector){
		$('.payForm').remove();

		if( !selector ){
			var obj = $(event.target||event.srcElement);
		}else{
			var obj = $(selector);
		}

		var target_obj = obj.closest('#pgDiv');
		var buymethod = target_obj.find('[name="buymethod"]').val();
		var idx = target_obj.find('#pgId').val();

		if( buymethod == 'B'){
			if( $('.bank_obj').val() == '' ){
				$('.bank_obj').focus();
				alert('');
				return false;
			}

			if( $('.inname_obj').val() == '' ){
				$('.inname_obj').focus();
				alert('');
				return false;
			}

			if( $('.indate_obj').val() == '' ){
				$('.indate_obj').focus();
				alert('');
				return false;
			}

			if( !confirm('') ){
				return false;
			}

			var data = new Object();
			data.method = 'updateAccountInfo';
			data.string = '';
			data.orderno = $(this.orderno_obj).val();
			data.ordername = $(this.ordername_obj).val();
			data.passwd = $(this.passwd_obj).val();
			data.bank = $('.bank_obj').val();
			data.inname = $('.inname_obj').val();
			data.indate = $('.indate_obj').val();
			data.idx = idx;
			data = JSON.stringify(data);

			var returnData = this.ajax(data);
			eval(returnData.js_code);

			return false;
		}else if( buymethod == 'K'){
			$.ajax({
				url:'/pg/kakaopay/pay.php',
				type:'get',
				async:false,
				data:{'mode':'ready_part','market_idx':$(this.orderno_obj).val(),'account_idx':idx},
				success:function(code){
					eval(code);
				}
			});
			return false;
		}

		$.ajax({
			url:'/pg/inipay/sample/payForm.php',
			type:'post',
			async:false,
			data:{'index_no':idx,'buymethod':buymethod},
			success:function(payForm){
				target_obj.append(payForm);
			}
		});

		var payFormId = target_obj.find('form').attr('id');
		INIStdPay.pay(payFormId);

		$('#pgDiv').hide();
	}


	this.orderFix = function(ordername,orderno,passwd){
		if( !confirm("援щℓ�뺤젙�섏떆寃좎뒿�덇퉴? 援щℓ�뺤젙�섏떆硫� 諛섑뭹/援먰솚�� 遺덇��ν빀�덈떎.") ){
			return false;
		}
		var data = new Object();
		data.method = 'orderFix';
		data.string = '';
		if( !orderno ){
			data.orderno = $(this.orderno_obj).val();
		}else{
			data.orderno = orderno;
		}

		if( !ordername ){
			data.ordername = $(this.ordername_obj).val();
		}else{
			data.ordername = ordername;
		}
		console.log(data.ordername);
		if( !passwd ){
			data.passwd = $(this.passwd_obj).val();
		}else{
			data.passwd = passwd;
		}

		data = JSON.stringify(data);


		var returnData = this.ajax(data);
		eval(returnData.js_code);
	}

	this.orderItemChange = function(ordername,orderno,passwd){
		var form = $(this.form_obj);

		if( ordername ){
			form.find('[name="ordername"]').val(ordername);
		}

		if( orderno ){
			form.find('[name="orderno"]').val(orderno);
		}

		if( passwd ){
			form.find('[name="passwd"]').val(passwd);
		}

		$(this.form_obj).attr('action','/member/order_change.php');
		$(this.form_obj).submit();

		$(this.form_obj).attr('action','');
	}

	this.orderItemReturn = function(ordername,orderno,passwd){
		if( !confirm("援먰솚,諛섑뭹�좎껌�� 二쇱떆硫� ���� �꾨쑉�묒뒪�먯꽌 CJ���쒗깮諛곕줈\n�먮룞�뚯닔�묒닔 �섎�濡� 怨좉컼�섍퍡�쒕뒗 CJ���쒗깮諛곕줈 �곕줈\n�뚯닔�묒닔 �덊빐二쇱뀛�� �⑸땲��.\n\n諛섑뭹�� 諛쏆쑝�� �ъ��덉� 瑗�! 媛숈씠 �숇큺�댁＜�몄슂:)\n�꾨씫�섎뒗 寃쎌슦, �ъ��� 湲덉븸留뚰겮 李④컧�섏뼱 �섎텋泥섎━ �⑸땲��.\n\n*�좊같�� 諛쏆븘蹂댁떆怨� �꾨같�≪긽�덉씠 �⑥븘�덉쓣寃쎌슦 �꾨같�≪긽��\n留덉� 諛쏆븘蹂댁떊�� �좎껌 遺��곷뱶由щŉ, �곕줈 諛쏆쑝�⑥뼱��\n�낃서! �쒖긽�먯뿉 �댁븘�쒕낫�댁＜�붿빞 �앸같鍮�\n怨쇱쨷遺��댁씠 �놁쑝��땲��.\n\n�끸쁾遺덈웾 援먰솚/諛섑뭹�� 瑗� 遺덈웾�ъ쑀(遺덈웾�� 遺덈웾�꾩튂 ��)\n硫붾え �숇큺�섏뿬 蹂대궡二쇱꽭��\n�붿슧 �좎냽�섍쾶 泥섎━ 諛쏆쑝�� �� �덉뒿�덈떎�끸쁾") ){
			return false;
		}

		var form = $(this.form_obj);

		if( ordername ){
			form.find('[name="ordername"]').val(ordername);
		}

		if( orderno ){
			form.find('[name="orderno"]').val(orderno);
		}

		if( passwd ){
			form.find('[name="passwd"]').val(passwd);
		}

		$(this.form_obj).attr('action','/member/order_return.php');
		$(this.form_obj).submit();

		$(this.form_obj).attr('action','');
	}

	this.returnErrorCheck = function(stop){
		var error = false;

		var i = 0;
		$('[name="claim_type[]"]').each(function(){
			if( !$(this).val() ){
				return true;
			}

			i++;

			var reason_obj = $(this).closest('tr').find('select[name="claim_reason[]"]');
			if( reason_obj.val() == '' && $(this).closest('tr').find('select[name="claim_type[]"]').val() != 4 ){
				if( stop ){
					alert('');
					reason_obj.focus();
				}
				error = true;
				return false;
			}

			if( $(this).val() == '2' || $(this).val() == '3' ){ 
				return true;
			}

			var op1_obj = $(this).closest('tr').find('select[name="op1[]"]');
			var op2_obj = $(this).closest('tr').find('select[name="op2[]"]');

			if( op1_obj.length > 0 && op1_obj.val() == '' ){
				if( stop ){
					alert('');
					op1_obj.focus();
				}
				error = true;
				return false;
			}

			if( op2_obj.length > 0 && op2_obj.val() == '' ){
				if( stop ){
					alert('');
					op2_obj.focus();
				}
				error = true;
				return false;
			}
		});

		if( i == 0 ){
			if( stop ){
				alert('');
			}
			error = true;
		}

		return error;
	}

	this.getReturnDelAccount = function(){
		if( this.returnErrorCheck(true) ){
			return false;
		}

		var data = $.ajax({
						url:'/class/returnDelAccountApi.php',
						type:'post',
						data:$('#exchange_form').serialize(),
						async:false,
						success:function(data){
						}
					}).responseText;

		return JSON.parse(data);
	}

	this.getReturnDelAccountLive = function(){
		if( this.returnErrorCheck(false) ){
			$('.calcul_delAccount').text(0);
			return false;
		}

		var data = $.ajax({
						url:'/class/returnDelAccountApi.php',
						type:'post',
						data:$('#exchange_form').serialize(),
						async:false,
						success:function(data){
						}
					}).responseText;

		var returnData =  JSON.parse(data);
		$('.calcul_delAccount').text(this.number_format(Number(returnData.del_account)+Number(returnData.add_del_account)));
	}

	this.sameDelInfo = function(){
		var obj = $(event.target||event.srcElement);
		if( obj.prop('checked') ){
			$('#receive_zip').val($('#del_zip').val());
			$('#receive_addr1').val($('#del_addr1').val());
			$('#receive_addr2').val($('#del_addr2').val());
		}
	}

	this.returnOK = function(){
		if( this.returnErrorCheck(true) ){
			$('.calcul_delAccount').text(0);
			return false;
		}

		if( $('[name="payment_type"]:checked').val() == 2 ){
			if( $.trim($('[name="payment_inname"]').val()) == '' ){
				alert('');
				$('[name="payment_inname"]').focus();
				return false;
			}
		}

		var error = false;
		$('#exchange_form .required:visible').each(function(){
			if( $.trim($(this).val()) == '' ){
				alert($(this).data('required_msg')+'');
				$(this).focus();
				error = true;
				return false;
			}
		});

		var imgError = false;
		var simpleReason = false;
		$('[name="claim_type[]"]').each(function(){
			if( $(this).val() ){
				var tr = $(this).closest('tr');
				if( tr.find('[name="claim_reason[]"]').val() == '�곹뭹遺덈웾' || tr.find('[name="claim_reason[]"]').val() == '�ㅻ같��' ){
					imgError = true;
				}else if( tr.find('[name="claim_reason[]"]').val() == '�⑥닚蹂���' ){
					simpleReason = true;
				}
			}
		});

		$('[name="file[]"]').each(function(){
			if($(this).val()){
				imgError = false;
			}
		});

		if( $('input[name="admin_idx"]').val() ){
			imgError = false;
		}

		if( imgError ){
			alert('�곹뭹遺덈웾�� �대�吏�瑜� 泥⑤��댁＜�몄슂');
			return false;
		}

		if( simpleReason && $('#memo').val() == '' ){
			alert('�⑥닚蹂��ъ떆 �곸꽭�ъ쑀瑜� �낅젰�댁＜�몄슂');
			$('#memo').focus();
			return false;
		}

		if( error ){
			return false;
		}

		var memgrade = $('#vip_obj').data('memgrade');
		var memgradename = "";
		if( memgrade == 1 ){
			memgradename = "VVIP";
		}else if( memgrade == 93 ){
			memgradename = "VVIP";
		}else if( memgrade == 94 ){
			memgradename = "VIP";
		}
		if( $('#vip_obj').val() != 1 ){
			if(!confirm('援먰솚/諛섑뭹�� �묒닔�섏떆寃좎뒿�덇퉴?')){
				return false;
			}
		}else{
			if(!confirm("�대㉧! "+memgradename+" �쒓뎔��\n�대뼸寃� �곕━媛� 援먰솚/諛섑뭹鍮꾨� 諛쏄쿋�댁슂 >.< \n臾대즺濡� 援먰솚/諛섑뭹 �꾩��쒕┫猿섏슂 �명븯寃� 諛섑뭹�섏꽭��!!\n\n遺�遺� 諛섑뭹 1�뚯뿉 �쒗빐�쒕쭔  諛섑뭹鍮� 臾대즺�낅땲��.\n\n(�꾩껜諛섑뭹�� 諛섑뭹鍮�(珥덈룄諛곗넚鍮꾪룷��) 怨좉컼遺��댁엯�덈떎)")){
				return false;
			}
		}

        $('#exchange_form').ajaxForm({
            url:"/class/returnProcess.php",
            enctype : "multipart/form-data",
			async:false,
            success : function(jsonData){
				alert('�묒닔�섏뿀�듬땲��.');
				var data = JSON.parse(jsonData);
				eval(data.js_code);
            }
        });

        $('#exchange_form').submit() ;
	}

	this.changeOK = function(){
		if( this.returnErrorCheck(true) ){
			return false;
		}

		if( $('[name="payment_type"]:checked').val() == 2 ){
			if( $.trim($('[name="payment_inname"]').val()) == '' ){
				alert('�낃툑�먮챸�� �낅젰�댁＜�몄슂');
				$('[name="payment_inname"]').focus();
				return false;
			}
		}

		var error = false;
		$('#exchange_form .required:visible').each(function(){
			if( $.trim($(this).val()) == '' ){
				alert($(this).data('required_msg')+' �낅젰�댁＜�몄슂');
				$(this).focus();
				error = true;
				return false;
			}
		});

		if( error ){
			return false;
		}

		if(!confirm('二쇰Ц�� 蹂�寃쎌쓣 �묒닔�섏떆寃좎뒿�덇퉴?')){
			return false;
		}

		var data = $.ajax({
						url:'/class/changeProcess.php',
						type:'post',
						data:$('#exchange_form').serialize(),
						async:false,
						success:function(data){
						}
					}).responseText;
		var returnData =  JSON.parse(data);
		eval(returnData.js_code);
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

	this.refundChange = function(){
		var obj = $(event.target||event.srcElement).find('option:selected');

		var bank = obj.data('bank');
		var banknum = obj.data('banknum');
		var name = obj.data('name');

		$('input[name="bank"]').val(bank);
		$('input[name="bank_num"]').val(banknum);
		$('input[name="bank_name"]').val(name);
	}

	this.deliChange = function(){
		if( !confirm('�섏랬�� �뺣낫瑜� �섏젙�섏떆寃좎뒿�덇퉴?') ){
			return false;
		}

		var obj = $(event.target||event.srcElement);
		var form = obj.closest('form');

		var error = false;

		form.find('.required').each(function(){
			if( $.trim($(this).val()) == '' ){
				alert( $(this).data('msg')+'瑜� �낅젰�댁＜�몄슂');
				$(this).focus();
				error = true;
				return false;
			}
		});

		if( error ){
			return false;
		}

		var data = new Object();
		data.method = 'deliChange';
		data.string = '';
		data.ordername = form.find('[name="ordername"]').val();
		data.orderno = form.find('[name="orderno"]').val();
		data.passwd = form.find('[name="passwd"]').val();

		data.del_name = form.find('[name="del_name"]').val();
		data.del_cp = form.find('[name="del_cp"]').val();
		data.del_zip = form.find('[name="del_zip"]').val();
		data.del_addr1 = form.find('[name="del_addr1"]').val();
		data.del_addr2 = form.find('[name="del_addr2"]').val();
		data.memo = form.find('[name="memo"]').val();
		data = JSON.stringify(data);

		var returnData = this.ajax(data);
		eval(returnData.js_code);
	}

	this.searchPost = function(tno){
		tno = tno.toString();

		var findStr = "FB";

		if( tno.length == 22 ){
			var url = "https://www.freshsolutions.co.kr/main/delivery_check.php?invoice_no="+tno;
		}else if (tno.indexOf(findStr) != -1) {
			var url = "http://www.fastbox.co.kr/DHUB/tracking.php?fb_invoice_no="+tno+"&lang=US";
		}else if (tno.substr(0,2) == 'MR' || tno.substr(0,2) == 'mr') {
			var url = "https://system.mirglobal.co.kr/Track/Result?mode=0&ids="+tno;
		}else{
			var url = "https://www.cjlogistics.com/ko/tool/parcel/tracking?gnbInvcNo="+tno;
		}
		window1 = window.open(url,'','width=1300,height=800,status=0,scrollbars=1');
	}

	this.orderCancel = function(ordername,orderno,passwd){
		if( !confirm('二쇰Ц�� 痍⑥냼�섏떆寃좎뒿�덇퉴?') ){
			return false;
		}

		var returnBasket = confirm('援щℓ 痍⑥냼 �� �곹뭹紐⑸줉�� �λ컮援щ땲濡� �댁쑝�쒓쿋�듬땲源�?');
		var form = $(this.form_obj);
		var data = new Object();
		data.method = 'orderCancel';

		data.string = returnBasket;

		if( !ordername ){
			data.ordername = form.find('[name="ordername"]').val();
		}else{
			data.ordername = ordername;
		}

		if( !orderno ){
			data.orderno = form.find('[name="orderno"]').val();
		}else{
			data.orderno = orderno;
		}

		if( !passwd ){
			data.passwd = form.find('[name="passwd"]').val();
		}else{
			data.passwd = passwd;
		}

		data.return_type = form.find('[name="return_type"]:checked').val();
		data.bank = form.find('[name="bank"]').val();
		data.bank_name = form.find('[name="bank_name"]').val();
		data.bank_num = form.find('[name="bank_num"]').val();

		data.refund_ins = form.find('[name="refund_ins"]').val();

		data.khash = form.find('[name="khash"]').val();

		data = JSON.stringify(data);

		var returnData = this.ajax(data);
		eval(returnData.js_code);
	}

	this.cancelMerge = function(orderno){
		var data = new Object();
		data.method = 'orderCancel';
		data.orderno = orderno;
		data = JSON.stringify(data);
		data.string = false; 

		var returnData = this.ajax(data);
	}

	this.copyBasket = function(market_idx){
		var data = new Object();
		data.method = 'copyBasket';
		data.market_idx = market_idx;
		data = JSON.stringify(data);

		return this.ajax(data);
	}


	this.orderCancelProc = function(){
		var error = false;

		if( $('input[name="return_type"]:checked').val() == '2' ){
			$('#orderForm .required').each(function(){
				if( $.trim($(this).val()) == '' ){
					alert($(this).data('required_msg')+' �낅젰�댁＜�몄슂');
					$(this).focus();
					error = true;
					return false;
				}
			});
		}

		if( error ){
			return false;
		}

		this.orderCancel();
	}

	this.orderCancelPage = function(ordername,orderno,passwd){
		var form = $(this.form_obj);

		if( ordername ){
			form.find('[name="ordername"]').val(ordername);
		}

		if( orderno ){
			form.find('[name="orderno"]').val(orderno);
		}

		if( passwd ){
			form.find('[name="passwd"]').val(passwd);
		}


		$(this.form_obj).attr('action','/member/order_cancel.php');
		$(this.form_obj).submit();

		$(this.form_obj).attr('action','');
	}

	this.cashReceipt = function(){
		window.open('','cashReceipt','width=650,height=450');

		$(this.form_obj).attr('action','/pg/inipay/receipt/sample/INIreceipt_view.php').attr('target','cashReceipt');
		$(this.form_obj).submit();

		$(this.form_obj).attr('action','').attr('target','');
	}

	this.leftsPgShow = function(index_no){
		CookieProc.delCookie('buymethod');

		$('#pgDiv #pgId').val(index_no);
		$('#pgDiv').show();
	}

	this.cartChange = function(){
		var obj = $(event.target||event.srcElement);
		var form = obj.closest('form');

		if( form.find('[name="change_op1"]').length <= 0 ){
			alert('');
			return false;
		}

		if( form.find('[name="change_op1"]').length > 0 ){
			if( !form.find('[name="change_op1"] option:selected').val()){
				alert('');
				form.find('[name="change_op1"]').focus();
				return false;
			}
		}

		if( form.find('[name="change_op2"]').length > 0 ){
			if( !form.find('[name="change_op2"] option:selected').val()){
				alert('');
				form.find('[name="change_op2"]').focus();
				return false;
			}
		}

		if( !confirm('' )){
			return false;
		}

		var idx = form.find('[name="cart_idx"]').val();
		var op1 = form.find('[name="op1"]').val();
		var op2 = form.find('[name="op2"]').val();
		var change_op1 = form.find('[name="change_op1"]').val();
		var change_op2 = form.find('[name="change_op2"]').val();

		var data = new Object();
		data.method = 'cartChange';
		data.string = '';
		data.idx = idx;
		data.op1 = op1;
		data.op2 = op2;

		data.change_op1 = change_op1;
		data.change_op2 = change_op2;

		data = JSON.stringify(data);

		var returnData = this.ajax(data);
		eval(returnData.js_code);
	}

	this.changeType = function(obj){
		if( $(obj).val() == 4 || $(obj).val() == 1 ){ 
			$(obj).closest('tr').find('[name="op1[]"],[name="op2[]"]').show();
		}else{
			$(obj).closest('tr').find('[name="op1[]"],[name="op2[]"]').val('').hide();
		}

		if( $(obj).val() != '' ){
			$(obj).closest('tr').find('[name="claim_reason[]"]').show();
		}else{
			$(obj).closest('tr').find('[name="claim_reason[]"]').val('').hide();
		}
	}

	this.basketExplode = function(basket_idx){
		if( !confirm('�깃컻 �좎껌�쇰줈 蹂�寃쏀븯�쒓쿋�듬땲源�?')){
			return false;
		}

		var data = $(this.form_obj).serializeArray();

		var datas = new Array();
		$.each(data,function(idx,item){
			datas.push('"'+item.name+'":'+'"'+item.value+'"');
		});

		datas.push('"basket_idx":"'+basket_idx+'"');
		datas.push('"method":"basketExplode"');

		datas = '{'+datas.join(',')+'}';

		var returnData = this.ajax(datas);
		eval(returnData.js_code);
	}

	this.changeAddGoods = function(){
		var code = prompt("�먰븯�쒕뒗 �곹뭹�� �곹뭹肄붾뱶瑜� �낅젰�댁＜�몄슂.\n�곹뭹紐낆쓽 留⑥븵 �곷Ц+�レ옄議고빀�� 肄붾뱶 �낅땲��.\nex)cd1162,sk2900");

		if( code ){
			var data = GoodsProc.getGoods(code);

			if( !data ){
				alert('�곹뭹肄붾뱶瑜� �뺤씤�댁＜�몄슂');
				return false;
			}

			var html = $('.ord_list tbody tr:first').clone();
				html.find('input,select').remove();

				html.find('td:first').text("�곹뭹異붽�");

				html.find('img').attr('src','https://atimg.sonyunara.com/files/attrangs/goods/'+data.index_no+'/'+data.simg14);

				html.find('.name').text(data.gname);

				html.find('.price').text(this.number_format(data.real_account));

				html.find('.price').next('td').html("<select><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option></select>");

			$('.ord_list tbody').append(html);
		}
	}

	this.returnIgnoreMsg = function(){
		alert("");
	}
}

var OrderProc = new OrderProc();