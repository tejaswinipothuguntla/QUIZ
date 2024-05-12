const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .continue");
const quiz_box = document.querySelector(".quiz_box");
const next_btn=quiz_box.querySelector(".next_ques");
const optionlist=document.querySelector(".options_list");
const timecnt=document.querySelector(".timer_set .timer_sec");
const timeline=document.querySelector(".time_line");
const resultbox=document.querySelector(".result");
const restart=resultbox.querySelector(".buttn .restart");
const quit=resultbox.querySelector(".buttn .quit");
const timeoff=quiz_box.querySelector(".timer_text");

let quescount=0;
let quesnum=1;
let counter;
let counterline;
let timevalue=15;
let widthvalue=0;
let score=0;

restart.onclick=()=>{
    quiz_box.classList.add("activatequiz");
    resultbox.classList.remove("showres");
    quescount=0;
    quesnum=1;
    timevalue=15;
    widthvalue=0;
    score=0;
    showquestions(quescount);
    quescounter(quesnum);
    clearInterval(counter);
    clearInterval(counterline);
    starttimer(timevalue);
    starttimerline(widthvalue);
    next_btn.style.display="block";
    timeoff.textContent="Time Left";
}
quit.onclick=()=>{
    window.location.reload();
}
start_btn.onclick = ()=>{
    info_box.classList.add("activateinfo");
}

exit_btn.onclick = ()=>{
    info_box.classList.remove("activateinfo");
}


continue_btn.onclick = ()=>{
    info_box.classList.remove("activateinfo"); 
    quiz_box.classList.add("activatequiz");
    showquestions(0);
    quescounter(1);
    starttimer(15);
    starttimerline(0);
}


next_btn.onclick = ()=>{
    if(quescount<questions.length -1){
        quescount++;
        quesnum++;
        showquestions(quescount);
        quescounter(quesnum);
        clearInterval(counter);
        clearInterval(counterline);
        starttimer(timevalue);
        starttimerline(widthvalue);
        
        timeoff.textContent="Time Left";
    }
    else{
        clearInterval(counter);
        clearInterval(counterline);
        showresult();
    }
}

function showquestions(index){
const que_text=document.querySelector(".ques");
let que_tag='<span>'+questions[index].numb+". "+questions[index].question+'</span>';
que_text.innerHTML=que_tag;

let opt_tag='<div class="option"><span>'+questions[index].options[0]+'</span></div>'
              + '<div class="option"><span>'+questions[index].options[1]+'</span></div>'
              + '<div class="option"><span>'+questions[index].options[2]+'</span></div>'
              + '<div class="option"><span>'+questions[index].options[3]+'</span></div>';
optionlist.innerHTML=opt_tag;
const option=optionlist.querySelectorAll(".option");
for(let i=0;i<option.length;i++){
    option[i].setAttribute("onclick", "optionSelected(this)");
}
}


function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterline);
    let correctans=questions[quescount].answer;
    let userans=answer.textContent;
    const alloptions=optionlist.children.length;
    if(userans==correctans){
        score+=1;
        console.log(score);
        answer.classList.add("correct");
    }
    else{
        answer.classList.add("incorrect");
        for(let i=0;i<alloptions;i++){
            if(optionlist.children[i].textContent==correctans){
                optionlist.children[i].setAttribute("class","option correct");
            }
        }
    }
    for(let i=0;i<alloptions;i++){
        optionlist.children[i].classList.add("disabled");
    }
    next_btn.style.display="block";

}

function quescounter(index){
const bottom_cnt=document.querySelector(".end");
let bottom_tag='<span class="text"><p>'+quesnum+'</p>Of<p>'+questions.length+'</p>Questions</span>';
bottom_cnt.innerHTML=bottom_tag;
}

function showresult(){
    info_box.classList.remove("activateinfo"); 
    quiz_box.classList.remove("activatequiz");
    resultbox.classList.add("showres");
    const scoretext=resultbox.querySelector(".score_text");
    if(score>3){
        let scoretag='<span>and congrats, you got <p>'+score+'</p> out of <p>'+questions.length+'</p></span>';
        scoretext.innerHTML=scoretag;
    }
    else if(score>1){
        let scoretag='<span>and nice, you got <p>'+score+'</p> out of <p>'+questions.length+'</p></span>';
        scoretext.innerHTML=scoretag;
    }
    else{
        let scoretag='<span>and sorry, you got only <p>'+score+'</p> out of <p>'+questions.length+'</p></span>';
        scoretext.innerHTML=scoretag;
    }
}

function starttimer(time){
      counter=setInterval(timer,1000);
      function timer(){
        timecnt.textContent=time;
        time--;
        if(time<9){
            let addzero=timecnt.textContent;
            timecnt.textContent="0"+addzero;
        }
        if(time<0){
            clearInterval(counter);
            timecnt.textContent="00";
            timeoff.textContent="Time Off";
            const allOptions = optionlist.children.length;
            let correcAns = questions[quescount].answer; 
            for(i=0; i < allOptions; i++){
                if(optionlist.children[i].textContent == correcAns){ 
                    optionlist.children[i].setAttribute("class", "option correct"); 
                }
            }
            for(i=0; i < allOptions; i++){
                optionlist.children[i].classList.add("disabled"); 
            }
            
        }
      }
}

function starttimerline(time){
    counterline=setInterval(timer,29);
    function timer(){
      time+=1;
      timeline.style.width=time+"px";
      if(time>549){
          clearInterval(counterline);
      }
    }
}