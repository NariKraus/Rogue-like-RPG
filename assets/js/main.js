function dice(size) {
    return Math.floor( Math.random() * size + 1 );
};

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
    $('#title').html(window.room);
    canGo(window.room);
    checkRoom(window.room);
};

// Use Item
function useItem(itemType) {
    if (armour[itemType]) {
        if (player.Armour.Type != 'Unarmoured') {
            $('#playerInventory').append(`<button class="inventory-item tip" itemCatagory="Armour" itemType="` + player.Armour.Type + `">` + player.Armour.Type + `</button>`);
        };
        player.Armour = armour[itemType];
        $('#playerArmour').children().remove();
        $('#playerArmour').append(`<button class="equipped-item tip" itemCatagory="Armour" itemType="` + armour[itemType].Type + `">` + armour[itemType].Type + `</button>`);
    };
    if (weapons[itemType]) {
        if (player.Weapon.Type != 'Unarmed') {
            $('#playerInventory').append(`<button class="inventory-item tip" itemCatagory="Weapon" itemType="` + player.Weapon.Type + `">` + player.Weapon.Type + `</button>`);
        };
        player.Weapon = weapons[itemType];
        $('#playerWeapon').children().remove();
        $('#playerWeapon').append(`<button class="equipped-item tip" itemCatagory="Weapon" itemType="` + weapons[itemType].Type + `">` + weapons[itemType].Type + `</button>`);
    };
    reload();
};

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

// Doffing
function doffItem(item, type, element) {
    if (type == 'Armour' && player.Armour.Type != 'Unarmoured') {
        $('#playerInventory').append(`<button class="inventory-item tip" itemCatagory="Armour" itemType="` + item + `">` + item + `</button>`);
        $('#playerArmour').children().remove();
        $('#playerArmour').append(`<button class="equipped-item tip" itemCatagory="Armour" itemType="Unarmoured">Unarmoured</button>`);
        player.Armour = armour.Unarmoured;
        $(element).remove();
    };
    if (type == 'Weapon' && player.Weapon.Type != 'Unarmed') {
        $('#playerInventory').append(`<button class="inventory-item tip" itemCatagory="Weapon" itemType="` + item + `">` + item + `</button>`);
        $('#playerWeapon').children().remove();
        $('#playerWeapon').append(`<button class="equipped-item tip" itemCatagory="Weapon" itemType="Unarmed">Unarmed</button>`);
        player.Weapon = weapons.Unarmed;
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
        var innerHtml = '';

        if (armour[itemType]) {
            innerHtml = 'Defence : ' + armour[itemType].Defence + ' | Dodge : ' + armour[itemType].Dodge;
            if (!armour[itemType].Traits) {
                innerHtml += ' | Traits : ' + armour[itemType].Traits;
            };
        };
        if (weapons[itemType]) {
            innerHtml = 'Accuracy : ' + weapons[itemType].Accuracy + ' | Power : ' + weapons[itemType].Power;
            if (!weapons[itemType].Traits) {
                innerHtml += ' | Traits : ' + weapons[itemType].Traits;
            };
        };

        $(element).css({top: position.top + $(this).height() + 'px', left: position.left + 'px', position: 'fixed'}).text(innerHtml).appendTo( $('body') );
    }, function(){
        $('.tip-info').remove();
    });
};

// Reload functions
function reload() {
    sortInventory();
    loadButtons();
    $('.tip-info').remove();
    addTips();
};

reload()

// █ Combat █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █

// Attack Button
$('.attack-button').click(function() {
    if (enemy) {
        Attack(player, enemy);
        try {    
            if (enemy.Health > 0) {
                Attack(enemy, player);
            };
            $('#playerHealth').html(player.Health);
        } catch (error) {
            console.log('Congratulations!');
            rooms[room].enemy = [];
        };
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
    Damage_roll = Math.max(Attack_Power - Defence_Power, 1);

    if (Attack_roll >= Dodge_roll) {
        $('#infoLog').append(`<span>The ` + Offence.Type + `'s attack hit the ` + Defence.Type + `.</span>`);
        Damage(Defence, Damage_roll)

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