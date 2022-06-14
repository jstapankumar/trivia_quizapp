let body = document.querySelector("body");
let form = document.querySelector("form");
let span = document.querySelector("h1 span");
let submit=document.createElement("button");
submit.className="submit";
submit.innerHTML='Submit';
var nqc=0;
let que= document.createElement("div");

// some variables
let numQues = 0;
let level = 0;
let category = parseInt(span.innerText);
//  console.log(category); 

let idx = 0;
//question array
let questions = [];

let StartQuiz = ()=>{
    body.innerHTML = "";
    let div = document.createElement("div");
    let div1 = document.createElement("div");
    const random=Math.floor(Math.random()*3)+1;
    if(random==1) {
    div.innerHTML =` <label for="agree" id="agree">${questions[idx].text}</label>
<p class="option">
    <input type="radio" name="option"  value="1">
    <label for="option" id="i1">${questions[idx].correct}</label> <br>
    <input type="radio" name="option" value="2">
    <label for="option" id="i2">${questions[idx].incorrect[0]}</label><br>
    <input type="radio" name="option" value="3">
    <label for="option"id="i3" >${questions[idx].incorrect[1]}</label><br>
    <input type="radio" name="option" value="4">
    <label for="option" id="i4">${questions[idx].incorrect[2]}</label><br>
</p>
<button id="btn_two">Previous</button>
<button id="btn_one">Next</button>
`
    }
    else if (random==2) {
        div.innerHTML =` <label for="agree" id="agree">${questions[idx].text}</label>
    <p class="option">
        <input type="radio" name="option"  value="2">
        <label for="option" id="i2">${questions[idx].incorrect[0]}</label> <br>
        <input type="radio" name="option" value="1">
        <label for="option" id="i1">${questions[idx].correct}</label><br>
        <input type="radio" name="option" value="3">
        <label for="option"id="i3" >${questions[idx].incorrect[1]}</label><br>
        <input type="radio" name="option" value="4">
        <label for="option" id="i4">${questions[idx].incorrect[2]}</label><br>
    </p>
    <button id="btn_two">Previous</button>
    <button id="btn_one">Next</button>
    `
        }
        else if (random==3) {
            div.innerHTML =` <label for="agree" id="agree">${questions[idx].text}</label>
        <p class="option">
            <input type="radio" name="option"  value="3">
            <label for="option" id="i3">${questions[idx].incorrect[0]}</label> <br>
            <input type="radio" name="option" value="2">
            <label for="option" id="i2">${questions[idx].incorrect[1]}</label><br>
            <input type="radio" name="option" value="1">
            <label for="option"id="i1" >${questions[idx].correct}</label><br>
            <input type="radio" name="option" value="4">
            <label for="option" id="i4">${questions[idx].incorrect[2]}</label><br>
        </p>
        <button id="btn_two">Previous</button>
        <button id="btn_one">Next</button>
        `
            }
            else if (random==4) {
                div.innerHTML =` <label for="agree" id="agree">${questions[idx].text}</label>
            <p class="option">
                <input type="radio" name="option"  value="4">
                <label for="option" id="i4">${questions[idx].incorrect[0]}</label> <br>
                <input type="radio" name="option" value="2">
                <label for="option" id="i2">${questions[idx].incorrect[2]}</label><br>
                <input type="radio" name="option" value="3">
                <label for="option"id="i3" >${questions[idx].incorrect[1]}</label><br>
                <input type="radio" name="option" value="1">
                <label for="option" id="i1">${questions[idx].correct}</label><br>
            </p>
            <button id="btn_two">Previous</button>
            <button id="btn_one">Next</button>
            `
                }
body.append(div);
let nxtbtn= document.getElementById("btn_one");
let prevbtn= document.getElementById("btn_two");
var days = document.getElementsByName('option');

    console.log(random)


// var checked =document.querySelector('input[name="agree"]:checked').value;
//if(checked==1)nqc++;

nxtbtn.addEventListener("click",()=>{
    idx++;
    for (let i of days) {
if (i.checked) {
    if(i.value=='1'){
        nqc++;
    }
  }
    if(idx<questions.length)
    StartQuiz();
    else{
        body.append(submit);
    }
}
})
prevbtn.addEventListener("click",()=>{
    idx--;
    if(idx>=0)
    StartQuiz();
    else
    alert("No previous questions");
})
submit.addEventListener("click",()=>{
    div1.innerHTML=`<h2>your questions are submitted and you have done ${nqc} correct questions answers are shown below</h2>`;
    body.innerText="";
    body.append(div1);
    for(var idx=0; idx<questions.length;idx++) {
        que.innerHTML=que.innerHTML+ ` <div id="agree">${questions[idx].text}</div>
        <p class="option">${questions[idx].correct}</p>`;
    }
        body.append(que);
})

}


let fetchData = async () => {
    let response = await axios.get(`https://opentdb.com/api.php?amount=${numQues}&category=${category}&difficulty=${level}&type=multiple`);
    let data = response.data.results;
    for(let q of data){
        questions.push({text:q.question,correct:q.correct_answer,incorrect:q.incorrect_answers});
    }
    StartQuiz();
};

//taking the difficulty and the number of question from the form
let fillData = (e) => {
  e.preventDefault(); //to stop the refreshing of the page on submitting the form
  let numQ = document.querySelector("#num_ques");
  let diffi = document.querySelector("#diff_level");
  numQues = numQ.value;
  level = diffi.value;
//   console.log(numQues, level);
    fetchData();
};
form.addEventListener("submit", fillData);