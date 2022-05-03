var Attack_Bonus = 0;
var Attack_Modifier = 1;
var Dodge_Bonus = 0;
var Dodge_Modifier = 1;

function Attack(Attack_Bonus, Attack_Modifier, Dodge_Bonus, Dodge_Modifier) {
    Attack_roll = Math.floor( (Math.floor( Math.random() * 20 + 1 ) + Attack_Bonus) * Attack_Modifier );
    Dodge_roll = Math.floor( (Math.floor( Math.random( ) * 20 + 1 ) + Dodge_Bonus) * Dodge_Modifier );

    console.log('Attack : ' + Attack_roll);
    console.log('Dodge : ' + Dodge_roll);
};