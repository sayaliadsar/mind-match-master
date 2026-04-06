// LOGIN
function login(){
    document.getElementById("loginPage").style.display="none";
    document.getElementById("gamePage").style.display="block";
    startGame();
}

// SOUND
const clickSound=new Audio("sounds/click.mp3");
const matchSound=new Audio("sounds/match.mp3");
const wrongSound=new Audio("sounds/wrong.mp3");
const winSound=new Audio("sounds/win.mp3");

function play(s){
    s.currentTime=0;
    s.play();
}

// IMAGES
let images=[
"images/img1.jpg","images/img2.jpg","images/img3.jpg",
"images/img4.jpg","images/img5.jpg","images/img6.jpg"
];

// GAME
let first,second,lock=false,matches=0;
let time=90,timer;

function startGame(){
    document.getElementById("resultPage").style.display="none";
    document.getElementById("gamePage").style.display="block";

    let board=document.getElementById("board");
    board.innerHTML="";

    matches=0;
    first=null;
    second=null;
    lock=false;

    let cards=[...images,...images].sort(()=>0.5-Math.random());

    cards.forEach(src=>{
        let c=document.createElement("div");
        c.className="card-box";

        let img=document.createElement("img");
        img.src=src;

        c.appendChild(img);
        c.onclick=()=>flip(c);

        board.appendChild(c);
    });

    time=90;
    clearInterval(timer);

    timer=setInterval(()=>{
        time--;
        document.getElementById("timer").innerText="⏱ "+time;

        if(time<=0){
            clearInterval(timer);
            play(wrongSound);
            showResult("❌ FAILED");
        }
    },1000);
}

// FLIP
function flip(card){
    if(lock || card.classList.contains("show")) return;

    play(clickSound);
    card.classList.add("show");

    if(!first){
        first=card;
        return;
    }

    second=card;
    lock=true;

    let a=first.querySelector("img").src;
    let b=second.querySelector("img").src;

    if(a===b){
        play(matchSound);
        matches++;
        reset();

        if(matches===6){
            clearInterval(timer);
            play(winSound);
            showResult("🏆 WINNER!");
        }
    }else{
        play(wrongSound);
        setTimeout(()=>{
            first.classList.remove("show");
            second.classList.remove("show");
            reset();
        },800);
    }
}

function reset(){
    first=null;
    second=null;
    lock=false;
}

// RESULT
function showResult(msg){
    document.getElementById("gamePage").style.display="none";
    document.getElementById("resultPage").style.display="flex";

    let thoughts=[
        "🔥 Keep pushing your limits!",
        "💪 You are improving!",
        "🚀 Success needs consistency!",
        "🌟 Believe in yourself!"
    ];

    document.getElementById("resultMsg").innerText=msg;
    document.getElementById("thought").innerText=
        thoughts[Math.floor(Math.random()*thoughts.length)];
}