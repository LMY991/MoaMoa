function SCM(){
	this.classFileAddr = '/class/scm_ajax.php'; // �대떦�뚯씪 �꾩튂

    this.setAlramModel = function(model_idx){
        var obj = $(event.target);

        $.ajax({
            url:this.classFileAddr,
            type:'post',
            async:false,
            data:{'method':'setAlramModel','model_idx':model_idx},
            success:function(code){
                if(code) eval(code);
                console.log(code)
                if( obj.hasClass('on') ){
                    var parent_obj = obj.closest('.alram-box');
                    parent_obj.find('.alram-cate').addClass('on');
                    parent_obj.find('.alram-cate-cnt').text(parent_obj.find('.alram-cate').length);
                    parent_obj.find('.alram-cycle').removeClass('on').eq(0).addClass('on');
                }else{
                    var parent_obj = obj.closest('.alram-box');
                    parent_obj.find('.alram-cate').removeClass('on');
                    parent_obj.find('.alram-cate-cnt').text(0);
                    parent_obj.find('.alram-cycle').removeClass('on');
                }
            }
        });
    }

    this.setAlramModelCate = function(model_idx,cate){
        var obj = $(event.target);

        $.ajax({
            url:this.classFileAddr,
            type:'post',
            async:false,
            data:{'method':'setAlramModelCate','model_idx':model_idx,'cate':cate},
            success:function(code){
                if(code) eval(code);

                var parent_obj = obj.closest('.alram-box');
                if( parent_obj ){
                    var len = parent_obj.find('.alram-cate.on').length;
                    parent_obj.find('.alram-cate-cnt').text(len);
                }
            }
        });
    }

    this.setAlramModelCycle = function(model_idx,cycle){
        var obj = $(event.target);
        $.ajax({
            url:this.classFileAddr,
            type:'post',
            async:false,
            data:{'method':'setAlramModelCycle','model_idx':model_idx,'cycle':cycle},
            success:function(code){
                if(code) eval(code);
            }
        });
    }
    // function showmenu(){
    this.showmenu = function(){

        var obj = $(event.target||event.srcElement);
        var li = obj.closest('li');
        var select = obj.closest('.select');
        var menu = select.find(".topalram-menu");
    
        select.siblings(".select").find(".topalram").removeClass("on");
        select.siblings(".select").find(".topalram-menu").hide();
        obj.toggleClass("on");
        menu.toggle();
        if( obj.hasClass("on") && select.index() == 0){
            obj.text("")
        }else if(!obj.hasClass("on") && select.index() == 0 ){
            if( select.find(".alram-cate.on").length > 0){
                select.find(".topalram").text( select.find(".alram-cate.on").length+"");
                select.find(".topalram").data('select','Y');
            }else{
                select.find(".topalram").text("");
            }
        }
    }

    //�뚮엺 ����
    // function alramsetting(model_idx){
    this.alramsetting = function(model_idx){
        var obj = $(event.target||event.srcElement);
        var pop = obj.closest('.alram-pop');
        var cates = Array();
        var cycle = pop.find(".alram-cycle.on").data("cycle");
        pop.find(".alram-cate.on").each(function(){
            cates.push($(this).data('cate'));
        });
        if(!cates.length > 0){
            alert('');
            return;
        }
    
        if(!cycle){
            alert('');
            return;
        }
        var catesarr = cates.join("|");
        $.ajax({
            url:this.classFileAddr,
            type:'post',
            async:false,
            data:{'method':'alramsetting','model_idx':model_idx,"cates":catesarr,"cycle":cycle},
            success:function(code){
                console.log(code);
                if(code) eval(code);
            }
        });
    }
    // function toggleonoff(all,ud){
    this.toggleonoff = function(all,ud){

        var obj = $(event.target||event.srcElement);
        var li = obj.closest('li');
        var select = obj.closest('.select');
        var menu = select.find(".topalram-menu");
    
        if(ud){
            obj.addClass("on");
            obj.siblings().removeClass("on");
            select.find(".topalram-menu").hide();
            select.find('.topalram').removeClass("on").text(obj.text());
            return;
        }
        if(all == "all"){
            if(obj.hasClass('on')){
                menu.find(".alram-cate").removeClass('on');
            }else{
                menu.find(".alram-cate").addClass('on');
            }
            obj.toggleClass('on');
        }else if(all == 'ok'){
            select.find(".topalram").removeClass("on");
            select.find(".topalram-menu").toggle();
            if(select.find(".alram-cate.on").length > 0){
                select.find(".topalram").text(select.find(".alram-cate.on").length+"媛� �좏깮");
            }else{
                select.find(".topalram").text("�뚮┝諛쏆쓣 移댄뀒怨좊━ �ㅼ젙");
            }
        }else{
            var cate = obj.find("a").text();
            obj.toggleClass("on");
            if(select.find(".alram-cate.on").length == 6){
                select.find(".alram-all").addClass('on')
            }else{
                select.find(".alram-all").removeClass('on')
            }
        }
    
    }
    // function settingpop(){
    this.settingpop = function(model_idx,noscm){
        var obj = $(event.target||event.srcElement);
        obj.closest(".btnbox");

        if( obj.closest(".btnbox").hasClass("on")  && !noscm){
            SCM.setAlramModel(model_idx);
            return;
        }
        $(".alram-pop").hide();
        var li = obj.closest('li');
        li.find(".alram-pop").show();
    }

    this.setAlramMarket = function(inpm_mem_idx){
        var obj = $(event.target);

        $.ajax({
            url:this.classFileAddr,
            type:'post',
            async:false,
            data:{'method':'setAlramMarket','inpm_mem_idx':inpm_mem_idx},
            success:function(code){
                if(code) eval(code);

                if( obj.hasClass('on') ){
                    var parent_obj = obj.closest('.alram-box');
                    parent_obj.find('.alram-cate').addClass('on');
                    parent_obj.find('.alram-cate-cnt').text(parent_obj.find('.alram-cate').length);
                    parent_obj.find('.alram-cycle').removeClass('on').eq(0).addClass('on');
                    obj.find('span').text('�뚮┝諛쏅뒗以�');
                }else{
                    var parent_obj = obj.closest('.alram-box');
                    parent_obj.find('.alram-cate').removeClass('on');
                    parent_obj.find('.alram-cate-cnt').text(0);
                    parent_obj.find('.alram-cycle').removeClass('on');
                    obj.find('span').text('�뚮┝諛쏄린');
                }
            }
        });
    }

    this.setAlramMarketCate = function(inpm_mem_idx,cate){
        var obj = $(event.target);

        $.ajax({
            url:this.classFileAddr,
            type:'post',
            async:false,
            data:{'method':'setAlramMarketCate','inpm_mem_idx':inpm_mem_idx,'cate':cate},
            success:function(code){
                if(code) eval(code);

                var parent_obj = obj.closest('.alram-box');
                if( parent_obj ){
                    var len = parent_obj.find('.alram-cate.on').length;
                    parent_obj.find('.alram-cate-cnt').text(len);
                }
            }
        });
    }

    this.setAlramMarketCycle = function(inpm_mem_idx,cycle){
        var obj = $(event.target);
        $.ajax({
            url:this.classFileAddr,
            type:'post',
            async:false,
            data:{'method':'setAlramMarketCycle','inpm_mem_idx':inpm_mem_idx,'cycle':cycle},
            success:function(code){
                if(code) eval(code);
            }
        });
    }

    this.setWish = function(inpm_mem_idx){
        var obj = $(event.target);

        $.ajax({
            url:this.classFileAddr,
            type:'post',
            async:false,
            data:{'method':'setWish','inpm_mem_idx':inpm_mem_idx,},
            success:function(code){
                if(code) eval(code);
            }
        });
    }
}

var SCM = new SCM();