let form = document.querySelector("form");
let span = document.querySelector("h1 span");

// some variables
let numQues = 0;
let level = 0;
let category = parseInt(span.innerText);
//  console.log(category); 

//question array
let questions = [];

let fetchData = async () => {
    let response = await axios.get(`https://opentdb.com/api.php?amount=${numQues}&category=${category}&difficulty=${level}`);
    let data = response.data.results;
    for(let q of data){
        questions.push({text:q.question,correct:q.correct_answer,incorrect:q.incorrect_answers})
    }
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









