function dice(size) {
    return Math.floor( Math.random() * size + 1 );
};

// Attack
function Attack(Offence, Defence) {

    // Offence Roll
    switch (Offence.Type) {
        case "player":
        case "Special":
            Attack_roll = Math.floor( dice(20) + Offence.Weapon.Accuracy );
            Attack_Power = Offence.Weapon.Power;
            break;
        default:
            Attack_roll = Math.floor( dice(20) + Offence.Accuracy );
            Attack_Power = Offence.Power;
    };

    // Defence Roll
    switch (Defence.Type) {
        case "player":
        case "Special":
            Dodge_roll = Math.floor( dice(20) + Defence.Armour.Dodge );
            Defence_Power = Defence.Armour.Defence;
            break;
        default:
            Dodge_roll = Math.floor( dice(20) + Defence.Dodge );
            Defence_Power = Defence.Defence;
    };

    // Damage Roll
    Damage_roll = Math.max(Attack_Power - Defence_Power, 1);

    if (Attack_roll >= Dodge_roll) {
        $('#infoLog').append(`<span>The ` + Offence.Type + `'s attack hit the ` + Defence.Type + `.</span><br/>`);
        Damage(Defence, Damage_roll)

        // Offence Traits
        if (Offence.Type == "player") {
            switch (Offence.Weapon.Traits) {
                case "Vampiric":
                    Heal(Offence, Damage_roll/2);
                    break;
            };
        } else {
            switch (Offence.Traits) {
                case "Vampiric":
                    Heal(Offence, Damage_roll/2);
                    break;
            };
        };

        // Defence Traits
        if (Defence.Type == "player") {
            switch (Defence.Armour.Traits) {
                case "Spiky":
                    Damage(Offence, 1);
                    break;
            };
        } else {
            switch (Defence.Traits) {
                case "Spiky":
                    Damage(Offence, 1);
                    break;
            };
        };

    } else {
        $('#infoLog').append(`<span>The ` + Offence.Type + `'s attack missed the ` + Defence.Type + `.</span><br/>`);
    };
};

// Heal
function Heal(Target, Healing) {
    Target.Health = Math.min(Target.Health + Healing, Target.HealthMax);
    $('#infoLog').append(`<span>The ` + Target.Type + ` was healed up to ` + Target.Health + `.</span><br/>`);
};

// Damage
function Damage(Target, Damage) {
    Target.Health = Math.max(Target.Health - Damage, 0);
    if (Target.Health > 0) {
        $('#infoLog').append(`<span>The ` + Target.Type + ` was hit for ` + Damage + ` damage.</span><br/>`);
    } else {
        $('#infoLog').append(`<span>The ` + Target.Type + ` died.</span><br/>`);
        $('#enemy').html('');
        window.enemy = null;
    }
};