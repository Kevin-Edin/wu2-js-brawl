const playerName = "Gunnar"
let playerHp = 100

let currentEnemy
class Enemy {
    constructor(name, hp) {
        this.name = name
        this.hp = hp
    }
}

function log(msg) {
    const li = document.createElement("li")
    li.textContent = msg
    combatLog.appendChild(li)
    if (combatLog.childNodes.length > 10) {
        combatLog.removeChild(combatLog.firstChild)
    }
}

function rollDice()
{
    return Math.ceil(Math.random() * 6)
}

function seconds(number)
{
    newNumber = number * 1000
    return newNumber
}

function updateHealth()
{
    playerHpText.textContent = playerHp
    enemyHpText.textContent = currentEnemy.hp
}

function takeDamage(attacker, target, hp, highest_value, lowest_value)
{
    new_hp = hp - (highest_value - lowest_value)
    log(attacker + " slog " + target + " och tog " + (hp - new_hp) + " skada.")
    return new_hp
}

const enemy = new Enemy("corn", 30)
currentEnemy = enemy

function startRound()
{
    const playerRoll = rollDice()
    const enemyRoll = rollDice()

    if (playerRoll > enemyRoll)
    {
       currentEnemy.hp = takeDamage(playerName, currentEnemy.name, currentEnemy.hp, playerRoll, enemyRoll)
    }
    else if (playerRoll < enemyRoll)
    {
        playerHp = takeDamage(currentEnemy.name, playerName, playerHp, enemyRoll, playerRoll)
    }
    else
    {
        log("Alla missade sina attacker.")
    }
    updateHealth()
}

let round
let last = 0

function gameLoop(timestamp)
{
    if (timestamp >= last + seconds(1))
    {
        startRound()
        last = timestamp
    }

    if (playerHp <= 0)
    {
        stopButton.disabled = true
        startButton.disabled = true
        playerHp = 0
        window.cancelAnimationFrame(round)
        //lägg till eventuell restart knapp/function här
    } else {
        startButton.disabled = true
        round = window.requestAnimationFrame(gameLoop)
    }

    if (currentEnemy.hp <= 0)
    {
        startButton.disabled = true
        last += seconds(2)
        currentEnemy = new Enemy("Förtrollad Toalett", 45)
        startButton.disabled = false
    }
}

function stopGame() 
{
    window.cancelAnimationFrame(round)
    startButton.disabled = false
}

const startButton = document.querySelector("#start-button")
startButton.addEventListener("click", gameLoop)

const stopButton = document.querySelector("#stop-button")
stopButton.addEventListener("click", stopGame)

const playerHpText = document.querySelector("#player-hp")
playerHpText.textContent = playerHp

const enemyHpText = document.querySelector("#enemy-hp")
enemyHpText.textContent = currentEnemy.hp

const combatLog = document.querySelector("#combat-log")