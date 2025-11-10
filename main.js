const playerName = "Gunnar"
const enemyName = "Bertil"
let playerHp = 100
let enemyHp = 100

const startButton = document.querySelector("#start-button")
startButton.addEventListener("click", startRound)

const playerHpText = document.querySelector("#player-hp")
playerHpText.textContent = playerHp

const enemyHpText = document.querySelector("#enemy-hp")
enemyHpText.textContent = enemyHp

const combatLog = document.querySelector("#combat-log")

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

function updateHealth()
{
    playerHpText.textContent = playerHp
    enemyHpText.textContent = enemyHp
}

function takeDamage(attacker, target, hp, highest_value, lowest_value)
{
    new_hp = hp - (highest_value - lowest_value)
    log(attacker + " slog " + target + " och tog " + (hp - new_hp) + " skada.")
    return new_hp
}

function startRound()
{
    const playerRoll = rollDice()
    const enemyRoll = rollDice()

    if (playerRoll > enemyRoll)
    {
       enemyHp = takeDamage(playerName, enemyName, enemyHp, playerRoll, enemyRoll)
    }
    else if (playerRoll < enemyRoll)
    {
        playerHp = takeDamage(enemyName, playerName, playerHp, enemyRoll, playerRoll)
    }
    else
    {
        log("Alla missade sina attacker.")
    }
    if (playerHp < 1 || enemyHp < 1)
    {
        if (playerHp < 1)
        {
            playerHp = 0
        }
        elseif (enemyHp < 1)
        {
            enemyHp = 0
        }
        startButton.disabled = true
    }
    updateHealth()
}