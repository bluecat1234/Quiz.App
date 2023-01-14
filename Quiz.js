const Quiz = [{
    question : '渡辺壮太さんが手がける仮想通貨プロジェクト名は何ネットワーク？',
    answer : ['Astar','Aptos','Near','Solana'],
    correct : 'Astar'
},{
    question : '2023年1月時点で、アダム・グラントさんの直近の最新刊の本のタイトルは？',
    answer : ['Listen','MIND SET','Think Again','Psychogy of Money'],
    correct : 'Think Again'    
},{
    question : '替えが効かない画像等の取引のサイトである『OpenSea』は、どのような分野のブロックチェーン技術？',
    answer : ['DeFi','bridge','MetaVerse','NFT'],
    correct : 'NFT'    
},{
    question : '元プロ野球選手である王貞治氏の生涯ホームラン数は？',
    answer : ['865本','866本','867本','868本'],
    correct : '868本'    
},{
    question : '孫悟空がスーパーサイヤ人になったキッカケの敵の名は？',
    answer : ['ベジータ','フリーザ','セル','魔人ブウ'],
    correct : 'フリーザ'    
}];



const $question = document.getElementById("js-question");
const $button = document.getElementsByClassName("js-button");
const $reset = document.getElementById("js-reset");
const $time = document.getElementById("js-time");
const buttonLength = $button.length;
let QuizIndex = 0;
const QuizLength = Quiz.length;
let score = 0;
let timeLeft = 15000;



const LastField = () =>{
    window.alert("終了！お疲れ様でした(^^♪");
    $question.textContent = "あなたの正解率は【" + Math.round(score/QuizLength*100) + "％】でした（" + QuizLength + "問中" + score + "問正解）";
    clearInterval(countDown);
    $time.textContent = "残り時間 : 0秒";
    let btnIndex = 0;
    while(btnIndex < buttonLength){
        $button[btnIndex].style.display = "none";
        btnIndex++;
    };
    $reset.style.display = "block";
    $reset.addEventListener("click" , () => {
        location.reload();
    });
};



const timeUp = () => {
    window.alert("時間切れです。不正解...");
    QuizIndex++;
    if(QuizIndex === QuizLength){
        LastField();
    } else {
        QuizSetUp();
    };
};



let countDown = 0;
const QuizSetUp = () => {
    clearInterval(countDown);
    $question.textContent = Quiz[QuizIndex].question;
    let btnIndex = 0;
    while(btnIndex < buttonLength){
        $button[btnIndex].textContent = Quiz[QuizIndex].answer[btnIndex];
        btnIndex++;
    };
    timeLeft = 15000;
    $time.textContent = "残り時間 : " + (timeLeft / 1000) + "秒";
    countDown = setInterval(() => {
        timeLeft -= 1000;
        $time.textContent = "残り時間 : " + (timeLeft / 1000) + "秒";
        if(timeLeft === 0){
            clearInterval(countDown);
            timeUp();
        };
    }, 1000);
};



QuizSetUp();



const ClickReactor = (e) => {
    clearInterval(countDown);
    if(e.target.textContent === Quiz[QuizIndex].correct){
        window.alert("正解☆");
        score++;
    } else {
        window.alert("不正解...");
    };

    QuizIndex++;

    if(QuizIndex < QuizLength){
        QuizSetUp();
    } else {
        LastField();
    };
};
   


let buttonIndex = 0;
while(buttonIndex < buttonLength){
$button[buttonIndex].addEventListener("click" , (e) => {
    ClickReactor(e);
  });
    buttonIndex++;
};
