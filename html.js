//EventCenter = {
//    on:function(type,handler){
//        $(document).addEventListener(type,handler);
//    },
//    fire:function(type,data){
//        $(document).trigger(type,data);
//    }
//}

var Footer = {
    init:function(){
        this.isToStart = true;
        this.isToStart = false;
        this.isAnimate = false;/*防止点击过快出现bug*/
        this.render();
    },
    render:function(){
        $.ajax({
            url:'./hunger.json',
            type:'get',
            dataType:'json'
        }).done(function(data){
            data.channels.forEach(function(item){
                var $html = `<div class='song' data-id=${item.channel_id}>
                <div class='cover' style="background:url('${item.cover_small}') no-repeat center center"></div>
                <p>${item.name}</p>
                </div>`
                $('.album').append($html);
            })

            $('.song').on('click',function(){
                var channelId = $('.song').attr('data-id');
                console.log(channelId);
                $.ajax({
                    url:'http://api.jirengu.com/fm/getSong.php',
                    channel:channelId,
                    type:'GET',
                    dataType:'json'
                }).done(function(ret){
                    var audio = new Audio();
                    audio.src = ret.song[0].url;
                    audio.autoplay = true;
                    console.log(ret);
                    var _title = ret.song[0].title;
                    $('.right .title').text(_title);
                    $('.left .pic').css('background',`url(${ret.song[0].picture}) no-repeat center center`);
                })
            })
            


            var _this = this;
            var count = Math.floor($('.box').outerWidth(true)/$('.song').outerWidth(true));
  
                $('.rightBtn').on('click',function(){ 
         
                    if(!_this.isAnimate){

                        if(!_this.isToEnd){
                            _this.isAnimate = true;
                            $('.album').animate({
                                left:'-='+ count*$('.song').outerWidth(true)
                            },400,function(){
                                _this.isToStart = false; 
                                _this.isAnimate = false;
                                if((parseFloat($('.box').width())-parseFloat($('.album').css('left'))) >= $('.album').outerWidth(true)){
                                    console.log('over');
                                    _this.isAnimate = false;
                                    _this.isToEnd = true;

                                }
                            })
 
                        }
                    }
                })

                $('.leftBtn').on('click',function(){
    
                    if(!_this.isAnimate){

                        if(!_this.isToStart){
                            _this.isAnimate = true;
                            $('.album').animate({
                                left:'+='+ count*$('.song').outerWidth(true)
                            },400,function(){
                                _this.isAnimate = false;
                                _this.isToEnd = false;
                                if(parseFloat($('.album').css('left')) >= 0){
                                    _this.isAnimate = false;
                                    _this.isToStart = true;

                                }
                            })

                        }
                    }
                })
        }).fail(function(){
            console.log('error')
        }).always(function(){
            console.log('ok')
        })
    }
}


Footer.init();

