function offenceTraits(Offence, Defence) {
    if (Offence.Type == "player") {
        // 

        switch (Offence.Weapon.Traits) {
            case "Vampiric":
                Heal(Offence, Damage_roll/2);
                break;
        };

        // 
    } else {
        // 

        switch (Offence.Traits) {
            case "Vampiric":
                Heal(Offence, Damage_roll/2);
                break;
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

        switch (Defence.Armour.Traits) {
            case "Spiky":
                Damage(Offence, 1);
                break;
        };

        // 
    } else {
        // 

        switch (Defence.Traits) {
            case "Spiky":
                Damage(Offence, 1);
                break;
        };

        // 
    };
}
