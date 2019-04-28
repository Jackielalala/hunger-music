    isToStart = true;
    isToEnd = false;

    function render(){
        $.ajax({
            url:'http://api.jirengu.com/fm/getChannels.php',
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

            var count = Math.floor($('.box').outerWidth(true)/$('.song').outerWidth(true));

            if(!isToEnd){
                $('.rightBtn').on('click',function(){
                    $('.album').animate({
                        left:'-='+ count*$('.song').outerWidth(true)
                    },400)
                    isToStart = false;
                })
            }

            if(!isToStart){
                $('.leftBtn').on('click',function(){
                    $('.album').animate({
                        left:'+='+ count*$('.song').outerWidth(true)
                    },400)
                })                
            }


        }).fail(function(){
            console.log('error')
        }).always(function(){
            console.log('ok')
        })
    }

    render();