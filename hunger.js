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

            var audio = new Audio();
            $('.song').on('click',function(){
                audio.pause();

                var _this = this;
                console.log(this);

                var channelId = $('.song').attr('data-id');
                console.log(channelId);
                $.ajax({
                    url:'http://api.jirengu.com/fm/getSong.php',
                    channel:channelId,
                    type:'GET',
                    dataType:'json'
                }).done(function(ret){
                    audio.src = ret.song[0].url;
                    audio.autoplay = true;
                    console.log(audio.ended)
                    audio.onplaying = function (){
                        $('.button .btn-play').removeClass('icon-play').addClass('icon-pause');
                    }
                    audio.onended = function(){
                        $('.button .btn-play').removeClass('icon-pause').addClass('icon-play');
                    }   
                    $('.button .btn-play').on('click',function(){
                        if($('.button .btn-play').hasClass('icon-pause')){
                            $('.button .btn-play').toggleClass('icon-pause').toggleClass('icon-play');
                            audio.pause();                        
                        }else if($('.button .btn-play').hasClass('icon-play')){
                            $('.button .btn-play').toggleClass('icon-pause').toggleClass('icon-play');
                            audio.play();   
                        }
                    })



 
                    console.log(ret);
                    var _title = ret.song[0].title;
                    $('.right .title').text(_title);
                    $('.left .pic').css('background',`url(${ret.song[0].picture}) no-repeat center center`);
                    $('.lyrics .singer').text(`${ret.song[0].artist}`);

                    $('.icon-lovecopy').on('click',function(){
                        $(".icon-lovecopy").toggleClass('star');
                    
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
        })
    })
  }
}

Footer.init();
