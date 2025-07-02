const square = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('#time-left')
const socre = document.querySelector('#score')


let result = 0
let hitPosition
let currentTime = 30
let timerId = null;

function randomSquare(){
    square.forEach(square => {
        square.classList.remove('mole')
    })

    let randomSquare = square[Math.floor(Math.random() * 15)]
    randomSquare.classList.add('mole')

    hitPosition = randomSquare.id
}

square.forEach(square =>{
    square.addEventListener('mousedown',() =>{
        if(square.id == hitPosition){
            result ++
            socre.textContent = result
            hitPosition = null
        }
    })
})

function moveMole(){
    timerId = setInterval(randomSquare , 500)
}
moveMole()

function countDown(){
    currentTime--
    timeLeft.textContent = currentTime
    if(currentTime == 0){
        clearInterval(countDownTimerId)
        clearInterval(timerId)
        alert(' Game Over !! Your Final Score is ' + result)
    }
}
let countDownTimerId = setInterval(countDown , 1000)