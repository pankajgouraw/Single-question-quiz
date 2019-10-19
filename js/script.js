$(function() {
    let index = 0;
    let quest = 1;

    $("#headerText").text(headerText);
    // $("#instruction").text(InstructionText);
    $("#instruction").css({color:headerInstructionColor});


    // url value
    let url = window.location.href;
    if (url.indexOf('?') > 0) {
        let params = new URLSearchParams(url.substring(1));
        index = parseInt(params.get('qno'));
        // console.log("url variable available....");
        quest += index;
    } else {
        // console.log("url variable not available...");
    }


    function loadData(){
        $("#questNo").text(quest);
        $('.question').text(data[index].question);
        let html = `<p class="correctAns animated zoomIn">${data[index].ans[0]}</p>
                    <p class='animated zoomIn'>${data[index].ans[1]}</p>
                    <p class='animated zoomIn'>${data[index].ans[2]}</p>
                    <p class='animated zoomIn'>${data[index].ans[3]}</p>`;

        $('.optContainer').html(html);
        $('.imgContainer').html(`<img class='animated zoomIn' src='${data[index].img}' />`);
    }

    loadData();

    function generateRandOpt(){
      $.each($('.optContainer p'), function(i, value){
        $(value).css({order: Math.floor(Math.random() * 4) +1});
      })
    }

    generateRandOpt();

    $('.optContainer p').click(function(){
        if($(this).hasClass('correctAns')){
          // console.log('correct ans');
          playAudio('audio/welldone.mp3');
          $(this).append("<img src='img/right.png' />");
        }else{
          console.log('incorrect Ans');
          $(this).append("<img src='img/wrong.png' />");
          playAudio('audio/tryAgain.mp3');
        }
    });




    $('#next').click(function() {
        index++;
        let url2 = window.location.pathname;
        var newurl = url2 + `?data=all&qno=${index}`;
        console.log(newurl);
        window.location.href = newurl;
    }); // for next


    $('#prev').click(function() {
        index--;
        let url2 = window.location.pathname;
        var newurl = url2 + `?data=all&qno=${index}`;
        window.location.href = newurl;
    }); // for prev

    if (index > 0) {
        $('#prev').fadeIn();
        $('#next').fadeIn();
    } else {
        $('#prev').hide();
    }

    if (index == data.length - 1) {
        $('#next').hide();
    }

   // playAudio

   function playAudio(music){
    let audio = new Audio(music);
    audio.play();
   }


});   // end document function 
