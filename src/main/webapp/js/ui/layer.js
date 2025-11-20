let targetUrl = '';

$(function () {

    $(document)
        .off('change', '#layer-workspace')
        .on('change', '#layer-workspace', (e) => {
            changeLayerList($(e.target).val()); // 레이어 목록 초기화

            var layers = olMap.getLayers().getArray();
            for (let i = layers.length - 1; i >= 0; i--) {
                if (layers[i].get('name')) {
                    olMap.removeLayer(layers[i]);
                }
            }

        });

    $(document)
        .off('click', '.layer-checkbox')
        .on('click', '.layer-checkbox', function() {

            const isChecked = $(this).is(':checked');
            var workspace = $(this).data('workspace');
            var layerName = $(this).data('layername');
            var newLayerName = workspace +":"+layerName;
            var defaultStyle = $(this).data('defaultstyle');

            var wmsUrl = (targetUrl.endsWith('/') ? targetUrl : targetUrl + '/') + workspace + '/wms';

            if(isChecked){

                var wmsLayer = new ol.layer.Tile({
                    source: new ol.source.TileWMS({
                        url: wmsUrl,
                        serverType: 'geoserver',
                        crossOrigin: 'anonymous',
                        params: {
                            // SERVICE: 'WMS',
                            // REQUEST: 'GetMap',
                            LAYERS: newLayerName,
                            TILED: true,
                            FORMAT: 'image/png',
                            SRS: 'EPSG:4326',
                            VERSION: '1.1.1',
                            STYLES: defaultStyle
                        }
                    }),
                    name: layerName
                });
                olMap.addLayer(wmsLayer);
            } else{

                olMap.getLayers().getArray().forEach(layer => {
                    if (layer.get('name') === layerName) {
                        olMap.removeLayer(layer);
                    }
                });

            }
        });
});

// 레이어 탭 초기화
function initLayer(){

    $('#layer-workspace').empty();
    $('#layer-count').text('(0)');

    var isConn = false;
    $.ajax({
        type: 'GET',
        url: '/api/geo/connection.proc.json',
        contentType: 'application/json',
        async: false,
        success: function(data) {
            targetUrl = data.url;
            isConn = data.connected;
        },
        error: function() {
        }
    });

    if(!isConn){
        $('#layer-workspace').append(`<option value="" selected>GeoServer 정보를 연결하세요.</option>`);
        $('#layer-list').empty();
        return;
    }

    var wsList;
    $.ajax({
        type: 'GET',
        url: '/api/geo/workspaces.proc.json',
        contentType: 'application/json',
        async: false,
        success: function(data) {
            wsList = data;
        },
        error: () => {
        }
    });

    if(!wsList || wsList.size < 1){
        $('#layer-workspace').append(`<option value="" selected>Workspace 선택</option>`);
    }

    // SELECT 구성
    var selectWs = '';
    wsList.forEach((ws,index) =>{
        if(index == 0 ) selectWs = ws.workspaceName;
        var optionTag =`<option value="${ws.workspaceName}" data-uri="${ws.namespaceURI}" ${index == 0 ? 'SELECTED' : ''}>${ws.workspaceName}</option>`;
        $('#layer-workspace').append(optionTag);
    });

    if(!selectWs) return;

    // 레이어 조회
    changeLayerList(selectWs);
}


// 레이어 목록 변경
function changeLayerList(targetWorkspace){

    $('#layer-list').empty();
    $.ajax({
        type: 'GET',
        url: `/api/geo/workspaces/${targetWorkspace}/layers.proc.json`,
        contentType: 'application/json',
        async: false,
        success: function(data) {

            $('#layer-count').text(`(${data.length})`);

            data.forEach((layerList,index) => {
                var layerTag = `
                <div class="flex gap-x-4 sm:col-span-6 px-4 justify-between">
                    <label for="${layerList.layerName}" class="text-sm truncate">
                        ${layerList.layerName}
                    </label>
                    <div class="flex h-6 items-center">
                        <div class="group relative inline-flex w-8 shrink-0 rounded-full bg-gray-200 p-px inset-ring inset-ring-gray-900/5 outline-offset-2 outline-cyan-600 transition-colors duration-200 ease-in-out has-checked:bg-cyan-600 has-focus-visible:outline-2">
                            <span class="size-4 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-3.5"></span>
                            <input id="${layerList.layerName}"
                                data-workspace="${layerList.workspace}"
                                data-layername="${layerList.layerName}" 
                                data-layertype="${layerList.layerType}" 
                                data-defaultstyle="${layerList.defaultStyle}" 
                                type="checkbox" name="agree-to-policies" aria-label="Agree to policies" class="layer-checkbox absolute inset-0 appearance-none focus:outline-hidden" />
                        </div>
                    </div>
                </div>
                `;

                $('#layer-list').append(layerTag);
            });
        },
        error: () => {
        }
    });
}