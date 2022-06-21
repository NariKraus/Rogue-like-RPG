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
            $('#playerInventory').append(`<button class="inventory-item" itemCatagory="Armour" itemType="` + player.Armour.Type + `">` + player.Armour.Type + `</button>`);
        };
        player.Armour = armour[itemType];
        $('#playerArmour').html(itemType);
    };
    if (weapons[itemType]) {
        if (player.Weapon.Type != 'Unarmed') {
            $('#playerInventory').append(`<button class="inventory-item" itemCatagory="Weapon" itemType="` + player.Weapon.Type + `">` + player.Weapon.Type + `</button>`);
        };
        player.Weapon = weapons[itemType];
        $('#playerWeapon').html(itemType);
    };
    sortInventory();
    loadButtons();
    addTips();
    $('#tip-info').remove();
};

// Loading Buttons
function loadButtons() {
    $('.inventory-item').unbind('click').click(function () {
        useItem($(this).attr('itemType'));
        $(this).remove();
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
function doffItem(item, type) {
    if (type == 'Armour') {
        $('#playerInventory').append(`<button class="inventory-item tip" itemCatagory="Armour" itemType="` + item + `">` + item + `</button>`);
        $('#playerArmour').html('Unarmoured');
        player.Armour = armour.Unarmoured;
    };
    if (type == 'Weapon') {
        $('#playerInventory').append(`<button class="inventory-item tip" itemCatagory="Weapon" itemType="` + item + `">` + item + `</button>`);
        $('#playerWeapon').html('Unarmed');
        player.Weapon = weapons.Unarmed;
    };
};

// Equipment Buttons
$('#playerArmour').click(function() {
    if (player.Armour.Type != 'Unarmoured') {
        doffItem(player.Armour.Type, 'Armour');
    };
    sortInventory();
    loadButtons();
    addTips();
    $('#tip-info').remove();
});
$('#playerWeapon').click(function() {
    if (player.Weapon.Type != 'Unarmed') {
        doffItem(player.Weapon.Type, 'Weapon');
    };
    sortInventory();
    loadButtons();
    addTips();
    $('#tip-info').remove();
});

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
        };
    };
});

// Item Tips
function addTips() {
    $('.tip').hover(function(){
        const position = $(this).position();
        const element = $(`<span id='tip-info'></span>`);
        const itemType = $(this).text();
        var innerHtml = '';

        if (armour[itemType]) {
            innerHtml = 'Defence : ' + armour[itemType].Defence + ' | Dodge : ' + armour[itemType].Dodge;
        };
        if (weapons[itemType]) {
            innerHtml = 'Accuracy : ' + weapons[itemType].Accuracy + ' | Power : ' + weapons[itemType].Power;
        };

        $(element).css({top: position.top + $(this).height() + 'px', left: position.left + 'px', position: 'fixed'}).text(innerHtml).appendTo( $('body') );
    }, function(){
        $('#tip-info').remove();
    });
};

sortInventory();
loadButtons();
addTips();
$('#tip-info').remove();

function giveAll() {
    Object.keys(armour).forEach(function(k) {
        $('#playerInventory').append(`<button class="inventory-item tip" itemCatagory="Armour" itemType="` + k + `">` + k + `</button>`);
    });
    Object.keys(weapons).forEach(function(k) {
        $('#playerInventory').append(`<button class="inventory-item tip" itemCatagory="Weapon" itemType="` + k + `">` + k + `</button>`);
    });
    sortInventory();
    loadButtons();
    addTips();
    $('#tip-info').remove();
}