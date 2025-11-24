const playerName = "Gunnar"
let playerHp = 100

let currentEnemy
class Enemy {
    constructor(name, hp) {
        this.name = name
        this.hp = hp
        this.maxHp = hp
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

function highHealth(id1, id2)
{
    document.getElementById(id1).src="sprites/healthbar/brawl_health.png";
    document.getElementById(id2).src="sprites/healthbar/brawl_health_bar.png";
}

function lowHealth(id1, id2)
{
    document.getElementById(id1).src="sprites/healthbar/brawl_health_damaged.png";
    document.getElementById(id2).src="sprites/healthbar/brawl_health_bar_low.png";
}

function updateHealth()
{
    const percentRoof = 51
    const percentPlayer = playerHp / 100
    const percentEnemy = currentEnemy.hp / currentEnemy.maxHp
    const valPlayer = (percentRoof * percentPlayer).toString()
    const valEnemy = (percentRoof * percentEnemy).toString()
    if (valPlayer < 15.5)
    {
        lowHealth("player-health-bar", "player-health-bar-bar")
    }
    else
    {
        highHealth("player-health-bar", "player-health-bar-bar")
    }

    if (valEnemy < 15.5)
    {
        lowHealth("enemy-health-bar", "enemy-health-bar-bar")
    }
    else
    {
        highHealth("enemy-health-bar", "enemy-health-bar-bar")
    }
    console.log(valPlayer)
    console.log(valEnemy)
    document.getElementById("player-health-bar").style.width = valPlayer + "%";
    document.getElementById("enemy-health-bar").style.width = valEnemy + "%";
}

function takeDamage(attacker, target, hp, highest_value, lowest_value)
{
    let new_hp = hp - (highest_value - lowest_value)
    if (new_hp < 0)
    {
        new_hp = 0
    }
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
        updateHealth()
        window.cancelAnimationFrame(round)
        //lägg till eventuell restart knapp/function här
    } else {
        startButton.disabled = true
        round = window.requestAnimationFrame(gameLoop)
    }

    if (currentEnemy.hp <= 0)
    {
        startButton.disabled = true
        currentEnemy.hp = 0
        updateHealth()
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

const combatLog = document.querySelector("#combat-log")