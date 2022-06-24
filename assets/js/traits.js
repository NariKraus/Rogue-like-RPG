function modifierTraits(Offence, Defence) {
    if (Offence.Type == "player") {
        // 

        if (Offence.Weapon.Traits.includes('Piercing')) {
            Defence_Power = Math.round(Defence_Power/2);
        };
        if (Offence.Weapon.Traits.includes('Basic')) {
            window.Attack_roll = 100;
        };

        // 
    } else {
        // 

        if (Offence.Traits.includes('Piercing')) {
            Defence_Power = Math.round(Defence_Power/2); 
        };
        if (Offence.Traits.includes('Basic')) {
            window.Attack_roll = 100; 
        };

        // 
    };
}


// █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █
// █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █
// █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █


function offenceTraits(Offence, Defence) {
    if (Offence.Type == "player") {
        // 

        if (Offence.Weapon.Traits.includes('Vampiric')) {
            if (Defence.Traits.includes('Undead')) {} else {
                Heal(Offence, Math.round(Damage_roll/2));
            };
        };

        // 
    } else {
        // 

        if (Offence.Traits.includes('Vampiric')) {
            if (Defence.Armour.Traits.includes('Undead')) {} else {
                Heal(Offence, Math.round(Damage_roll/2));
            };
        };

        // 
    };
}


// █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █
// █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █
// █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █


function defenceTraits(Offence, Defence) {
    if (Defence.Type == "player") {
        // 

        if (Defence.Armour.Traits.includes('Spiky')) {
            Damage(Offence, 1);
        };

        // 
    } else {
        // 

        if (Defence.Traits.includes('Spiky')) {
            Damage(Offence, 1);
        };

        // 
    };
}
