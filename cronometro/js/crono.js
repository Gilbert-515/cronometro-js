$(document).ready(function(){

   $('#horas').val(0);
   $('#minuts').val(0);
   $('#segs').val(0);

    let min, hrs, seg, cont;
    // valores iniciais
    let min_inc, hrs_inc, seg_inc;
    // variaveis moments
    let min_moment, hrs_moment, seg_moment;

    $('#contador-area').hide();
    $('.inic-btn').hide();

    $('.start-btn').click(function(){

        if( $('#horas').val() == 0 && $('#minuts').val() == 0 && $('#segs').val() == 0){
            alert('O cronometro está Zerado!');

        }else if( $('#horas').val() == '' && $('#minuts').val() == '' && $('#segs').val() == '' ){
            alert('O cronometro está Zerado!');
        
        }else if($('#minuts').val() > 59 || $('#segs').val() > 59 ){
            alert('O maximo de segundos e minutos é 59!');

        }else{
            hrs = $('#horas').val();
            min = $('#minuts').val();
            seg =  $('#segs').val();  

            hrs_inc = $('#horas').val();
            min_inc = $('#minuts').val();
            seg_inc =  $('#segs').val();  

            Cronos(hrs,min,seg);

            $('#crono-area').hide();
            $('#contador-area').show();   
            $('#ampulheta').addClass('animation');
        }

  });

    function Cronos(hrs,min,seg){

        cont = setInterval(function(){

            if(hrs != 0 || (min != 0 && seg >= 0) || seg != 0){
                seg = seg - 1;
            
                if((seg <= 0 && min > 0) || (hrs > 0 && seg <= 0)){
                    seg = 60;
                    min = min - 1;               
        
                    if(min < 0 && hrs > 0){
                        min = 59;          
                        hrs = hrs - 1;       
                    }
                }
            }else{
                clearInterval(cont);
                $('#ampulheta').removeClass('animation');
            }
            
            Ampulheta(hrs, min, seg);

        }, 1000);
    }

    function Ampulheta(hrs, min, seg){
    
        hrs = hrs < 10 ? '0' + hrs : hrs;
        min = min < 10 ? '0' + min : min;
        seg = seg < 10 ? '0' + seg : seg;
        
        hrs_moment = hrs;
        min_moment = min;
        seg_moment = seg;

        $('#hrs').html(` <span> ${hrs} </span> `);
        $('#mins').html(` <span> ${min} </span> `);
        $('#seg').html(` <span> ${seg} </span> `);

    }

     $('.pause-btn').click(function pause(){
        clearInterval(cont);

        $('.inic-btn').show();
        $('.pause-btn').hide();
        $('#ampulheta').removeClass('animation');
    });

    $('.inic-btn').click(function(){

        $('.inic-btn').hide();
        $('.pause-btn').show();
        $('#ampulheta').addClass('animation');
        setInterval(cont);

        hrs_moment = Math.round(hrs_moment);
        min_moment = Math.round(min_moment);
        seg_moment = Math.round(seg_moment);

        Cronos(hrs_moment, min_moment, seg_moment);
    });

    $('.reset-btn').click(function reset(){

        clearInterval(cont);
        $('.inic-btn').hide();
        $('.pause-btn').show();
        $('#crono-area').show();
        $('#contador-area').hide();
        $('#ampulheta').removeClass('animation');
        $('#horas').val(hrs_inc);
        $('#minuts').val(min_inc);
        $('#segs').val(seg_inc);
    });

});