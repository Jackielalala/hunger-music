
var Footer = {
    init:function(){
        this.bind();
        this.isToStart = true;
        this.isToStart = false;
    },
    bind:function(){
        this.render();
    },
    render:function(){
        $.ajax({
            url:'./hunger.json',
            type:'get',
            dataType:'json'
        }).done(function(data){
            data.channels.forEach(function(item){
                var $html = `<div class='song'>
                <div class='cover' style="background:url('${item.cover_small}') no-repeat center center"></div>
                <p>${item.name}</p>
                </div>`
                $('.album').append($html);
            })
            var _this = this;
            var count = Math.floor($('.box').outerWidth(true)/$('.song').outerWidth(true));

                $('.rightBtn').on('click',function(){
                    console.log($('.album').css('left'))
                    if(!_this.isToEnd){
                        $('.album').animate({
                            left:'-='+ count*$('.song').outerWidth(true)
                        },400,function(){
                            if((parseFloat($('.box').width())-parseFloat($('.album').css('left'))) >= $('.album').outerWidth(true)){
                                console.log('over');
                                _this.isToEnd = true;
                            }
                        })
                        _this.isToStart = false;  
                    }

                })

                $('.leftBtn').on('click',function(){
                    console.log($('.album').css('left'));
                    if(!_this.isToStart){
                        $('.album').animate({
                            left:'+='+ count*$('.song').outerWidth(true)
                        },400,function(){
                        _this.isToEnd = false;
                        if(parseFloat($('.album').css('left')) >= 0){
                            _this.isToStart = true;
                        }
                        })
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