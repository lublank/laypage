/**
 
 laytpl demo

 */

;!function(){

var win = $(window), demo = {
    win: win,
    hosts: 'http://' + location.host + '/',
    stop: function(e){
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
    }
};

demo.post = function(){
    var downs = $('#downs'), liuyan = $('#liuyan');
    
    //记录下载数
    $('#layDowns').on('click',function(){
        $.ajax({
            url: demo.hosts + '/item/filedown.asp?id=4823',
            method : 'GET'
        });
    });
    
    //获取下载数
    if(downs[0]){
        $.get('http://sentsin.com/item/filedown.asp?action=hits&id=4823', function(datas){
            var downloads = datas.match(/\d+/)[0];
            downs.html(downloads);
        });
    }
    
    //获取关注次数
    $.post('http://sentsin.com/item/GetHits.asp?Action=Count&GetFlag=0&m=119&ID=5', function(datas){
        var downloads = datas.match(/\d+/)[0];
        $('#sees').html(downloads);
    });
};

//窗口scroll
demo.scroll = function(){
    var conf = {
        log: [0, $('.laynav')],
        gotop: $('#laygotop'),
        htbo: $('html, body'),
        fnDemo: $('#fnDemo')
    };
    demo.win.on('scroll', function(){
        var stop = demo.win.scrollTop();
        if(stop >= 300){
            if(!conf.log[0]){
                conf.log[0] = 1;
                conf.log[1].addClass('fixnav');
                conf.gotop.show();
            }
        } else {
            if(conf.log[0]){
                conf.log[0] = 0;
                conf.log[1].removeClass('fixnav');
                conf.gotop.hide();
            }
        }
        stop = null;
    });
    
    //返回顶部
    conf.gotop.on('click',function(){
        conf.htbo.animate({scrollTop : 0},$(this).offset().top/7);
    });
    
};



demo.run = (function(){
    var log = {
        getdate: $('#getdate'),
        tpl: $('#tpl')
    }, thiskin = 'thiskin';
    if(location.host === 'sentsin.com'){
        demo.post();
    }
    demo.scroll();
    
    window.appendimg = function(page){
        return '<img src="http://sentsin.qiniudn.com/laypage_'+ (page-1) +'.png"><br>'
    };

    //修饰代码
    $('pre').each(function(){
        var othis = $(this), code = othis.text();
        
        if(!othis.attr('run')){
            new Function(code)();
        }
       
        othis.laycode({
            title: othis.attr('title') || '对应代码说明',
            height: othis.attr('heg') || 'auto',
            skin: othis.attr('skin') || 0
        });
    });
    
}());

}();