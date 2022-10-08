var log = [];

// █ Change Size █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █

//  Window Ready
$(window).ready(function() {
    var windowWidth = parseInt( $( window ).width() );
    if (windowWidth >= 1400) {
        $(':root').css('--c-Pixel', 'var(--xxl-Pixel)');
    } else if (windowWidth >= 1200) {
        $(':root').css('--c-Pixel', 'var(--xl-Pixel)');
    } else if (windowWidth  >= 992 ) {
        $(':root').css('--c-Pixel', 'var(--lg-Pixel)');
    } else if (windowWidth  >= 768 ) {
        $(':root').css('--c-Pixel', 'var(--md-Pixel)');
    } else if (windowWidth  >= 576 ) {
        $(':root').css('--c-Pixel', 'var(--sm-Pixel)');
    } else if ( windowWidth < 576 ) {
        $(':root').css('--c-Pixel', 'var(--xs-Pixel)');
    };
});

// Window Resize
$( window ).resize(function() {
    var windowWidth = parseInt( $( window ).width() );
    if (windowWidth >= 1400) {
        $(':root').css('--c-Pixel', 'var(--xxl-Pixel)');
        console.log('xxl');
    } else if (windowWidth >= 1200) {
        $(':root').css('--c-Pixel', 'var(--xl-Pixel)');
        console.log('xl');
    } else if (windowWidth  >= 992 ) {
        $(':root').css('--c-Pixel', 'var(--lg-Pixel)');
        console.log('lg');
    } else if (windowWidth  >= 768 ) {
        $(':root').css('--c-Pixel', 'var(--md-Pixel)');
        console.log('md');
    } else if (windowWidth  >= 576 ) {
        $(':root').css('--c-Pixel', 'var(--sm-Pixel)');
        console.log('sm');
    } else if ( windowWidth < 576 ) {
        $(':root').css('--c-Pixel', 'var(--xs-Pixel)');
        console.log('xs');
    };
});

// █ Utility Functions █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █

// Loading Buttons
function loadButtons() {
    $('.inventory-item').unbind('click').click(function() {
        const itemType = $(this).attr('itemType')
        useItem(itemType);
        for (let i = 0; i < JSON.parse($(this).attr('extratraits')).length; i++) {
            const x = JSON.parse($(this).attr('extratraits'))[i];
            if (armour[itemType]) {
                EnchantArmour(x);
            };
            if (weapons[itemType]) {
                EnchantWeapon(x);
            };
        }
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
    if ( window.player != null || window.foes != null || window.armour != null || window.potions != null || window.weapons != null || window.rooms != null ) {
        sortInventory();
        loadButtons();
        addTips();
    } else {
        setTimeout(reload, 250);
    };
};

// Store the current log
function storeLog() {
    log.push( $('#infoLog').text() );
    $('#infoLog').text('');
    $('#log-store').children('p, hr').remove();
    log.slice(-20).forEach( element => {
        $('#log-store').prepend( $(`<p class="log-text">` + element + `</p>`) );
    });
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
        $('.up, .Up-East, .Up-West').addClass('active');
    } else {
        $('#button-up').prop('disabled', true);
        $('.up, .Up-East, .Up-West').removeClass('active');
    };
    if (rooms[room]['paths'].includes('down')) {
        $('#button-down').prop('disabled', false);
        $('.down, .Down-East, .Down-West').addClass('active');
    } else {
        $('#button-down').prop('disabled', true);
        $('.down, .Down-East, .Down-West').removeClass('active');
    };
    if (rooms[room]['paths'].includes('left')) {
        $('#button-left').prop('disabled', false);
        $('.left, .Left-North, .Left-South').addClass('active');
    } else {
        $('#button-left').prop('disabled', true);
        $('.left, .Left-North, .Left-South').removeClass('active');
    };
    if (rooms[room]['paths'].includes('right')) {
        $('#button-right').prop('disabled', false);
        $('.right, .Right-North, .Right-South').addClass('active');
    } else {
        $('#button-right').prop('disabled', true);
        $('.right, .Right-North, .Right-South').removeClass('active');
    };
};

// Check room for items, enemies, etc.
function checkRoom(room) {
    // Enemies
    if (rooms[room]['enemy'].length != 0) {
        $('#enemy').html(rooms[room]['enemy']);
        window.enemy = JSON.parse( JSON.stringify( foes[rooms[room]['enemy']] ) );
        $('#infoLog').append(`<span>Ambush! The ` + rooms[room]['enemy'] + ` attacks.</span> `);
    } else {
        $('#enemy').html('');
        window.enemy = null;
    };
};

// Move to another room
function go(room, direction) {
    if (rooms[room]['enemy'].length != 0) {
        storeLog();
        $('#infoLog').append(`<span>The ` + rooms[room]['enemy'] + ` blocks the player's path. You cannot escape.</span> `);
        return;
    }
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
    $('#infoLog').append(`<span>The player moved ` + direction + ` to ` + window.room + `.</span> `);
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
            $('#playerInventory').append(`<button class="inventory-item tip" itemCatagory="Armour" itemType="` + player.Armour.Type + `" extraTraits='[]'>` + player.Armour.Type + `</button>`);
        };
        player.Armour = JSON.parse(JSON.stringify( armour[itemType]));
        $('#playerArmour').children().remove();
        $('#playerArmour').append(`<button class="equipped-item tip" itemCatagory="Armour" itemType="` + armour[itemType].Type + `" extraTraits='[]'>` + armour[itemType].Type + `</button>`);
        $('#infoLog').append(`<span>The player equips a set of ` + armour[itemType].Type + ` armour.</span> `);
    };
    if (weapons[itemType]) {
        if (player.Weapon.Type != 'Unarmed') {
            $('#playerInventory').append(`<button class="inventory-item tip" itemCatagory="Weapon" itemType="` + player.Weapon.Type + `" extraTraits='[]'>` + player.Weapon.Type + `</button>`);
        };
        player.Weapon = JSON.parse(JSON.stringify( weapons[itemType] ));
        $('#playerWeapon').children().remove();
        $('#playerWeapon').append(`<button class="equipped-item tip" itemCatagory="Weapon" itemType="` + weapons[itemType].Type + `" extraTraits='[]'>` + weapons[itemType].Type + `</button>`);
        $('#infoLog').append(`<span>The player equips a ` + weapons[itemType].Type + `.</span> `);
    };
    if (potions[itemType]) {
        if (potions[itemType].Healing > 0) {
            Heal(player, potions[itemType].Healing);
            $('#playerHealth').html(player.Health);
        };
        if (potions[itemType].Power > 0) {
            player.Effects.Power = potions[itemType].Power;
        };
        $('#infoLog').append(`<span>The player drinks a ` + potions[itemType].Type + `.</span> `);
    };
    if (poisons[itemType]) {
        if (poisons[itemType].PoisonType == "Damage") {
            EnchantWeapon('Poisoned');
            player.Weapon.PoisonPower = poisons[itemType].PoisonPower;
        };
        $('#infoLog').append(`<span>The player applys a poison to their weapon.</span> `);
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
    $('.tip').each(function(){
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
                if (armour[itemType].Traits.length > 0 || JSON.parse(extraTraits).length > 0) {
                    innerHtml += '<br />Traits : ' + armour[itemType].Traits.concat(JSON.parse(extraTraits)).join(', ');
                };
            };
            if (weapons[itemType]) {
                innerHtml = 'Accuracy : ' + weapons[itemType].Accuracy + '<br />Power : ' + weapons[itemType].Power;
                if (weapons[itemType].Traits.length > 0 || JSON.parse(extraTraits).length > 0) {
                    innerHtml += '<br />Traits : ' + weapons[itemType].Traits.concat(JSON.parse(extraTraits)).join(', ');
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

        $(this).data('powertip', innerHtml);

        $(this).powerTip({
            placement: 'sw-alt'
        });
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
        $('#infoLog').append(`<span>The ` + Offence.Type + `'s attack hit the ` + Defence.Type + `.</span> `);

        Damage(Defence, Damage_roll);

        offenceTraits(Offence, Defence);

        defenceTraits(Offence, Defence);

    } else {
        $('#infoLog').append(`<span>The ` + Offence.Type + `'s attack missed the ` + Defence.Type + `.</span> `);
    };
};

// Heal
function Heal(Target, Healing) {
    Target.Health = Math.min(Target.Health + Healing, Target.HealthMax);
    $('#infoLog').append(`<span>The ` + Target.Type + ` was healed up to ` + Target.Health + `.</span> `);
};

// Damage
function Damage(Target, Damage) {
    Target.Health = Math.max(Target.Health - Damage, 0);
    if (Target.Health > 0) {
        $('#infoLog').append(`<span>The ` + Target.Type + ` was hit for ` + Damage + ` damage.</span> `);
    } else {
        $('#infoLog').append(`<span>The ` + Target.Type + ` died.</span> `);
        if (Target == window.enemy) {
            $('#enemy').html('');
            window.enemy = null;
        } else {
            GameOver();
        };
    };
};

// █ Start Up █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █

$(document).ready(function() {
    reload();
});

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
    addTips();
};

function UnenchantArmour(enchantment) {
    var x = $('#playerArmour').children().attr('extraTraits');
    y = JSON.parse(x);
    y.splice( y.findIndex((num) => num === enchantment) );
    player.Armour.Traits.splice( player.Armour.Traits.findIndex((num) => num === enchantment) );
    x = JSON.stringify(y);
    $('#playerArmour').children().attr('extraTraits', x);
    addTips();
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
    addTips();
};

function UnenchantWeapon(enchantment) {
    var x = $('#playerWeapon').children().attr('extraTraits');
    y = JSON.parse(x);
    y.splice( y.findIndex((num) => num === enchantment) );
    player.Weapon.Traits.splice( player.Weapon.Traits.findIndex((num) => num === enchantment) );
    x = JSON.stringify(y);
    $('#playerWeapon').children().attr('extraTraits', x);
    addTips();
};

function GameOver() {
    $('main > .row').html('').append( $(`<div class="col"><div class="container"><div class="item-modal border-shadow align-content-center text-center row"><h1>Game Over</h1><h3>This is a placeholder death screen</h3></div></div></div>`) );
};