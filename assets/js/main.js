// █ Utility Functions █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █

// Loading Buttons
function loadButtons() {
    $('.inventory-item').unbind('click').click(function() {
        useItem($(this).attr('itemType'));
        $(this).remove();
    });
    $('.equipped-item').unbind('click').click(function() {
        doffItem($(this).attr('itemType'), $(this).attr('itemCatagory'), $(this));
    });
};

// Sort Inventory
function sortInventory() {
    var alphabeticallyOrderedDivs = $('.inventory-item').sort(function(a, b) {
        return String.prototype.localeCompare.call($(a).attr('itemCatagory').toLowerCase() + $(a).attr('itemType').toLowerCase(), $(b).attr('itemCatagory').toLowerCase() + $(b).attr('itemType').toLowerCase());
    });
    
    var container = $("#playerInventory");
    container.empty().append(alphabeticallyOrderedDivs);
};

// Reload functions
function reload() {
    sortInventory();
    loadButtons();
    $('.tip-info').remove();
    addTips();
};

// Store the current log
function storeLog() {
    $('#log-store').append($('#infoLog').html()).append($('<br />'));
    $('#infoLog').html('');
};

// Roll a dice
function dice(size) {
    return Math.floor( Math.random() * size + 1 );
};

// █ Movement █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █

// Check available paths
function canGo(room) {
    if (rooms[room]['paths'].includes('up')) {
        $('#button-up').prop('disabled', false);
        $('.up').addClass('active');
    } else {
        $('#button-up').prop('disabled', true);
        $('.up').removeClass('active');
    };
    if (rooms[room]['paths'].includes('down')) {
        $('#button-down').prop('disabled', false);
        $('.down').addClass('active');
    } else {
        $('#button-down').prop('disabled', true);
        $('.down').removeClass('active');
    };
    if (rooms[room]['paths'].includes('left')) {
        $('#button-left').prop('disabled', false);
        $('.left').addClass('active');
    } else {
        $('#button-left').prop('disabled', true);
        $('.left').removeClass('active');
    };
    if (rooms[room]['paths'].includes('right')) {
        $('#button-right').prop('disabled', false);
        $('.right').addClass('active');
    } else {
        $('#button-right').prop('disabled', true);
        $('.right').removeClass('active');
    };
};

// Check room for items, enemies, etc.
function checkRoom(room) {
    // Enemies
    if (rooms[room]['enemy'].length != 0) {
        $('#enemy').html(rooms[room]['enemy']);
        window.enemy = foes[rooms[room]['enemy']];
    } else {
        $('#enemy').html('');
        window.enemy = null;
    };
};

// Move to another room
function go(room, direction) {
    if (rooms[room]['paths'].includes(direction)) {
        const splitroom = room.split("");
        switch (direction) {
            case "up":
                window.room = (parseInt(splitroom[0])+0)+"-"+(parseInt(splitroom[2])-1);
                break;
            case "down":
                window.room = (parseInt(splitroom[0])+0)+"-"+(parseInt(splitroom[2])+1);
                break;
            case "left":
                window.room = (parseInt(splitroom[0])-1)+"-"+(parseInt(splitroom[2])+0);
                break;
            case "right":
                window.room = (parseInt(splitroom[0])+1)+"-"+(parseInt(splitroom[2])+0);
                break;
        };
    };
    storeLog();
    $('#infoLog').append(`<span>The player moved ` + direction + ` to ` + window.room + `.</span>`);
    $('#title').html(window.room);
    canGo(window.room);
    checkRoom(window.room);
};

// █ Actions █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █

// Use Item
function useItem(itemType) {
    storeLog();
    if (armour[itemType]) {
        if (player.Armour.Type != 'Unarmoured') {
            $('#playerInventory').append(`<button class="inventory-item tip" itemCatagory="Armour" itemType="` + player.Armour.Type + `">` + player.Armour.Type + `</button>`);
        };
        player.Armour = JSON.parse(JSON.stringify( armour[itemType]));
        $('#playerArmour').children().remove();
        $('#playerArmour').append(`<button class="equipped-item tip" itemCatagory="Armour" itemType="` + armour[itemType].Type + `">` + armour[itemType].Type + `</button>`);
        $('#infoLog').append(`<span>The player equips a set of ` + armour[itemType].Type + ` armour.</span>`);
    };
    if (weapons[itemType]) {
        if (player.Weapon.Type != 'Unarmed') {
            $('#playerInventory').append(`<button class="inventory-item tip" itemCatagory="Weapon" itemType="` + player.Weapon.Type + `">` + player.Weapon.Type + `</button>`);
        };
        player.Weapon = JSON.parse(JSON.stringify( weapons[itemType] ));
        $('#playerWeapon').children().remove();
        $('#playerWeapon').append(`<button class="equipped-item tip" itemCatagory="Weapon" itemType="` + weapons[itemType].Type + `">` + weapons[itemType].Type + `</button>`);
        $('#infoLog').append(`<span>The player equips a ` + weapons[itemType].Type + `.</span>`);
    };
    if (potions[itemType]) {
        if (potions[itemType].Healing > 0) {
            Heal(player, potions[itemType].Healing);
        };
        if (potions[itemType].Power > 0) {
            player.Effects.Power = potions[itemType].Power;
        };
        $('#infoLog').append(`<span>The player drinks a ` + potions[itemType].Type + `.</span>`);
    };
    if (poisons[itemType]) {
        if (potions[itemType].Healing > 0) {
            Heal(player, potions[itemType].Healing);
        };
        $('#infoLog').append(`<span>The player drinks a ` + potions[itemType].Type + `.</span>`);
    };
    reload();
};

// Doffing
function doffItem(item, type, element) {
    if (type == 'Armour' && player.Armour.Type != 'Unarmoured') {
        if ( $(element).attr('extraTraits') ) {
            $('#playerInventory').append(`<button class="inventory-item tip" itemCatagory="Armour" itemType="` + item + `" extraTraits='` + $(element).attr('extraTraits') + `'>` + item + `</button>`);
        } else {
            $('#playerInventory').append(`<button class="inventory-item tip" itemCatagory="Armour" itemType="` + item + `">` + item + `</button>`);
        };
        $('#playerArmour').children().remove();
        $('#playerArmour').append(`<button class="equipped-item tip" itemCatagory="Armour" itemType="Unarmoured">Unarmoured</button>`);
        player.Armour = JSON.parse(JSON.stringify( armour.Unarmoured ));
        $(element).remove();
    };
    if (type == 'Weapon' && player.Weapon.Type != 'Unarmed') {
        if ( $(element).attr('extraTraits') ) {
            $('#playerInventory').append(`<button class="inventory-item tip" itemCatagory="Weapon" itemType="` + item + `" extraTraits='` + $(element).attr('extraTraits') + `'>` + item + `</button>`);
        } else {
            $('#playerInventory').append(`<button class="inventory-item tip" itemCatagory="Weapon" itemType="` + item + `">` + item + `</button>`);
        };
        $('#playerWeapon').children().remove();
        $('#playerWeapon').append(`<button class="equipped-item tip" itemCatagory="Weapon" itemType="Unarmed">Unarmed</button>`);
        player.Weapon = JSON.parse(JSON.stringify( weapons.Unarmed ));
        $(element).remove();
    };
    reload();
};

// Item Tips
function addTips() {
    $('.tip').unbind('mouseenter mouseleave').hover(function(){
        const position = $(this).position();
        const element = $(`<span class='tip-info'></span>`);
        const itemType = $(this).attr('itemtype');
        const extraTraits = $(this).attr('extraTraits');
        var innerHtml = '';

        if ($(this).hasClass('equipped-item')) {
            if (armour[itemType]) {
                innerHtml = 'Defence : ' + player.Armour.Defence + '<br />Dodge : ' + player.Armour.Dodge;
                if (player.Armour.Traits.length > 0) {
                    innerHtml += '<br />Traits : ' + player.Armour.Traits.join(', ');
                };
            };
            if (weapons[itemType]) {
                innerHtml = 'Accuracy : ' + player.Weapon.Accuracy + '<br />Power : ' + player.Weapon.Power;
                if (player.Weapon.Traits.length > 0) {
                    innerHtml += '<br />Traits : ' + player.Weapon.Traits.join(', ');
                };
            };            
        } else {
            if (armour[itemType]) {
                innerHtml = 'Defence : ' + armour[itemType].Defence + '<br />Dodge : ' + armour[itemType].Dodge;
                if (armour[itemType].Traits.length > 0) {
                    innerHtml += '<br />Traits : ' + armour[itemType].Traits.concat(JSON.parse('extraTraits')).join(', ');
                };
            };
            if (weapons[itemType]) {
                innerHtml = 'Accuracy : ' + weapons[itemType].Accuracy + '<br />Power : ' + weapons[itemType].Power;
                if (weapons[itemType].Traits.length > 0) {
                    innerHtml += '<br />Traits : ' + weapons[itemType].Traits.concat(JSON.parse('extraTraits')).join(', ');
                };
            };
            if (potions[itemType]) {
                if (potions[itemType].Healing > 0) {
                    innerHtml += '<br />Healing : ' + potions[itemType].Healing;
                };
                if (potions[itemType].Power > 0) {
                    innerHtml += '<br />Power : ' + potions[itemType].Power;
                };
                innerHtml = innerHtml.substring(6)
            };
            if (poisons[itemType]) {
                innerHtml += 'Type : ' + poisons[itemType].PoisonType;
                innerHtml += '<br />Power : ' + poisons[itemType].PoisonPower;
            };
        }

        $(element).css({top: position.top + $(this).height() + 'px', left: position.left + 'px', position: 'fixed'}).html(innerHtml).appendTo( $('body') );
    }, function(){
        $('.tip-info').remove();
    });
};

// █ Combat █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █

// Attack Button
$('.attack-button').click(function() {
    if (enemy) {
        storeLog();
        Attack(player, enemy);
        try {    
            if (enemy.Health > 0) {
                Attack(enemy, player);
            };
        } catch (error) {
            rooms[room].enemy = [];
        };
        $('#playerHealth').html(player.Health);
    };
});

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
    modifierTraits(Offence, Defence);
    Damage_roll = Math.max(Attack_Power - Defence_Power, 1);
    if (Offence.Effects.Power > 0) {
        Damage_roll += Offence.Effects.Power;
        Offence.Effects.Power = 0;
    };

    if (Attack_roll >= Dodge_roll) {
        $('#infoLog').append(`<span>The ` + Offence.Type + `'s attack hit the ` + Defence.Type + `.</span>`);

        Damage(Defence, Damage_roll);

        offenceTraits(Offence, Defence);

        defenceTraits(Offence, Defence);

    } else {
        $('#infoLog').append(`<span>The ` + Offence.Type + `'s attack missed the ` + Defence.Type + `.</span>`);
    };
};

// Heal
function Heal(Target, Healing) {
    Target.Health = Math.min(Target.Health + Healing, Target.HealthMax);
    $('#infoLog').append(`<span>The ` + Target.Type + ` was healed up to ` + Target.Health + `.</span>`);
};

// Damage
function Damage(Target, Damage) {
    Target.Health = Math.max(Target.Health - Damage, 0);
    if (Target.Health > 0) {
        $('#infoLog').append(`<span>The ` + Target.Type + ` was hit for ` + Damage + ` damage.</span>`);
    } else {
        $('#infoLog').append(`<span>The ` + Target.Type + ` died.</span>`);
        $('#enemy').html('');
        window.enemy = null;
    }
};

// █ Start Up █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █

reload()

// █ Dev Commands █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █

// Give All Items
function giveAll() {
    Object.keys(armour).forEach(function(k) {
        $('#playerInventory').append(`<button class="inventory-item tip" itemCatagory="Armour" itemType="` + k + `">` + k + `</button>`);
    });
    Object.keys(weapons).forEach(function(k) {
        $('#playerInventory').append(`<button class="inventory-item tip" itemCatagory="Weapon" itemType="` + k + `">` + k + `</button>`);
    });
    reload();
}



// █ WIP █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ 

function EnchantArmour(enchantment) {
    var x = $('#playerArmour').children().attr('extraTraits');
    if (x) {
        if (!player.Armour.Traits.includes(enchantment)) {
            y = JSON.parse(x);
            if (!y.includes(enchantment)) {
                y.push(enchantment);
                player.Armour.Traits.push(enchantment);
            };
        };
    } else {
        if (!player.Armour.Traits.includes(enchantment)) {
            y = [enchantment];
            player.Armour.Traits.push(enchantment);
        };
    };
    x = JSON.stringify(y);
    $('#playerArmour').children().attr('extraTraits', x);
};

function EnchantWeapon(enchantment) {
    var x = $('#playerWeapon').children().attr('extraTraits');
    if (x) {
        if (!player.Weapon.Traits.includes(enchantment)) {
            y = JSON.parse(x);
            if (!y.includes(enchantment)) {
                y.push(enchantment);
                player.Weapon.Traits.push(enchantment);
            };
        };
    } else {
        if (!player.Weapon.Traits.includes(enchantment)) {
            y = [enchantment];
            player.Weapon.Traits.push(enchantment);
        };
    };
    x = JSON.stringify(y);
    $('#playerWeapon').children().attr('extraTraits', x);
};