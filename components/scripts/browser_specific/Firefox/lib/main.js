var pageMod = require("sdk/page-mod");
var simpleStorage = require('sdk/simple-storage');
var data = require('sdk/self').data;

var workers = [];

if(!simpleStorage.storage.settings) {
    simpleStorage.storage.settings = {
        categories : {
            vidskipti: {
                            name: "Viðskipti",
                            category: "vidskipti",
                            isBlocked: false
            },
            sport: {
                            name: "Íþróttir",
                            category: "sport",
                            isBlocked: false
            },
            folk: {
                            name: "Fólk",
                            category: "folk",
                            isBlocked: false
            },
            smartland: {
                            name: "Smartland",
                            category: "smartland",
                            isBlocked: false
            },
            bill: {
                            name: "Bílar",
                            category: "bill",
                            isBlocked: false
            }
        },
        keywords : []
    }
}

function detachWorker(worker, workerArray) {
    var index = workerArray.indexOf(worker);
    if(index != -1) {
        workerArray.splice(index, 1);
    }
}

pageMod.PageMod({
    include: ["*.mbl.is"],
    contentScriptWhen: 'ready',
    contentScriptFile: [
        data.url('thirdparty/routie.js'),
        data.url('extension.js')
    ],
    contentScriptOptions: {
        "pngUrl_settings": data.url("graphics/ic_settings_applications_black_18dp.png"),
        "pngUrl_delete": data.url("graphics/ic_delete_black_18dp.png"),
        "pngUrl_checkBoxBlank": data.url("graphics/ic_check_box_outline_blank_black_18dp.png"),
        "pngUrl_checkBoxChecked": data.url("graphics/ic_check_box_black_18dp.png"),
        "pngUrl_addCircle": data.url("graphics/ic_add_circle_black_24dp.png"),
        "pngUrl_save": data.url("graphics/ic_save_black_24dp.png"),
        "pngUrl_cancel": data.url("graphics/ic_cancel_black_24dp.png")
    },
    onAttach: function(worker) {
        workers.push(worker);
        
        worker.port.on('get', function() {
            worker.postMessage(simpleStorage.storage.settings);
        });

        worker.port.on('save', function(data) {
            simpleStorage.storage.settings = data;
        });
        
        worker.on('detach', function () {
            detachWorker(this, workers);
        });
    }
});

simpleStorage.on("OverQuota", function () {
    notifications.notify({
        title: 'Storage space exceeded',
        text: 'Removing recent annotations'});
    while (simpleStorage.quotaUsage > 1)
        simpleStorage.storage.annotations.pop();
});