const playerName = "Gunnar"
const enemyName = "Bertil"
let playerHp = 100
let enemyHp = 100

function rollDice()
{
    return Math.ceil(Math.random() * 6)
}

function takeDamage(attacker, target, hp, highest_value, lowest_value)
{
    new_hp = hp - (highest_value - lowest_value)
    console.log(attacker + " slog " + target + " och tog " + (hp - new_hp) + " skada.")
    console.log(target + " har nu " + new_hp + "hp kvar.")
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
        console.log("Alla missade sina attacker.")
    }

}

startRound()