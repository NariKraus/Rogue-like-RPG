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

function blink() {
    switch (window.fade) {
        case 1:
            $('body').addClass('black');
            setTimeout(() => {
                $('body').removeClass('black');
            }, 250);
            break;
        case 2:
            $('body').addClass('black');
            setTimeout(() => {
                $('body').removeClass('black');
            }, 500);
            break;
    };
};

function checkRoom(room) {
    // Shops
    if (rooms[room]['shop'].length != 0) {
        $('#shop').prop('disabled', false);
        $('#shop-item').html(rooms[room]['shop'].join(''));
        $('#shop-price').html(rooms[room]['shop price'].join('') + 'g');
    } else {
        $('#shop').prop('disabled', true);
        $('#shop-item').html('');
        $('#shop-price').html('');
    };
    // Items
    if (rooms[room]['item'].length != 0) {
        $('#item').prop('disabled', false);
        $('#item').html(rooms[room]['item'].join(''));
    } else {
        $('#item').prop('disabled', true);
        $('#item').html('');
    };
    // Enemies
    if (rooms[room]['enemy'].length != 0) {
        $('#enemy').prop('disabled', false).html(rooms[room]['enemy'].join(''));
        $('#attack-l').prop('disabled', false).html('Light Attack');
        $('#attack-m').prop('disabled', false).html('Medium Attack');
        $('#attack-h').prop('disabled', false).html('Heavy Attack');
    } else {
        $('#enemy').prop('disabled', true).html('');
        $('#attack-l').prop('disabled', true).html('');
        $('#attack-m').prop('disabled', true).html('');
        $('#attack-h').prop('disabled', true).html('');
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
    switch (window.fade) {
        case 0:
            $('.title').html(window.room);
            canGo(window.room);
            checkRoom(window.room);
            break;
        case 1:
            blink();
            setTimeout(() => {
                $('.title').html(window.room);
                canGo(window.room);
                checkRoom(window.room);
            }, 250);
            break;
        case 2:
            blink();
            setTimeout(() => {
                $('.title').html(window.room);
                canGo(window.room);
                checkRoom(window.room);
            }, 500);
            break;
    };
};