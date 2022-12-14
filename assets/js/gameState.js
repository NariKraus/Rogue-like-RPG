$('#file-input').on('change', () => {
    loadGame();
});

function loadGame() {
    let files = $('#file-input')[0].files;
    if (files.length <= 0) {
        return false;
    }

    var fr = new FileReader();

    fr.onload = (e) => {
        var result = JSON.parse(e.target.result);
        // var formatted = JSON.stringify(result, null, 2);

        $('button.pixel.middle').trigger('click');

        window.player = result.player;
        window.rooms = result.rooms;
        go(window.room, result.room, true);
        hearts();
        reload();
        storeLog();
    };

    fr.readAsText(files.item(0));
}

function saveGame() {
    var saveData = JSON.parse(
        `{
        "player" : ` +
            JSON.stringify(player) +
            `,
        "room" : ` +
            JSON.stringify(room) +
            `,
        "rooms" : ` +
            JSON.stringify(rooms) +
            `
    }`
    );
    var dataStr =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(saveData));
    $('#saveDownload')
        .attr('href', dataStr)
        .attr('download', 'saveGame.narsav');
    document.getElementById('saveDownload').click();
}

$('#aside-toggle').click(function () {
    $('aside').attr('active', function (_, attr) {
        return attr == 'false' ? 'true' : 'false';
    });
});
