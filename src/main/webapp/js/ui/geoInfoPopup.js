$(function () {

    const $popup = $('#geo-info-popup');
    const $popupBack = $('#geo-info-popup-back');
    const $connBtn = $('#geoserver-conn');
    const $inputs = $('#geoserver-ip, #geoserver-port, #geoserver-context, #geoserver-id, #geoserver-pw');

    // 페이지 로드 시 연결 상태 확인
    $.ajax({
        type: 'GET',
        url: '/api/geo/connection.proc.json',
        contentType: 'application/json',
        async: false,
        success: function(data){
            if (!data || Object.keys(data).length === 0 || !data.connected) { // 연결 상태가 아님
                setTimeout(() => $('#menu-info').trigger('click'), 0);  // GeoServer 정보 버튼 클릭
                changeConnPopup(false);
                // $connBtn.text('연결');
                // $inputs.prop('disabled', false);
            } else {
                changeConnPopup(true);
                // $connBtn.text('연결 해제');
                // $inputs.prop('disabled', true);
                initLayer();
            }
        }
    });



    // popup show 감지 → 버튼 상태 갱신
    // const observer = new MutationObserver(mutations => {
    //     mutations.forEach(m => {
    //         if (m.type === 'attributes' && m.attributeName === 'class') {
    //             if (!$popup.hasClass('hidden')) {
    //                 const geoInfo = JSON.parse(sessionStorage.getItem("geoserverInfo"));
    //                 const isConn = geoInfo && geoInfo.state;
    //                 $connBtn.text(isConn ? '연결 해제' : '연결');
    //                 $inputs.prop('disabled', isConn);
    //             }
    //         }
    //     });
    // });
    // if ($popup.length) observer.observe($popup[0], { attributes: true });

    // 팝업 열기/닫기
    $(document)
        .off('click', '#menu-info, #geo-info-popup-back, #geo-info-popup-close')
        .on('click', '#menu-info, #geo-info-popup-back, #geo-info-popup-close', () => {
            $popup.toggleClass('hidden');
            $popupBack.toggleClass('hidden');
        });

    // GeoServer 연결 버튼 클릭
    $(document)
        .off('click', '#geoserver-conn')
        .on('click', '#geoserver-conn', () => {


            // geoserver 연결 상태 조회
            var geoInfo = {};
            $.ajax({
                type: 'GET',
                url: '/api/geo/connection.proc.json',
                contentType: 'application/json',
                async: false,
                success: data => geoInfo = data
            });

            // 이미 연결된 상태면 해제
            if (geoInfo && Object.keys(geoInfo).length > 0 && geoInfo.connected) {


                var disconnect = false;
                $.ajax({
                    type: 'GET',
                    url: '/api/geo/disconnect.proc.json',
                    contentType: 'application/json',
                    async: false,
                    success: data => disconnect = data
                });

                if(disconnect) {
                    showToast('success', 'GeoServer 연결이 해제되었습니다.');
                    changeConnPopup(false);
                    // $connBtn.text('연결');
                    // $inputs.prop('disabled', false);
                    initLayer();
                } else{
                    showToast('error', 'GeoServer 연결 해제에 실패하였습니다.');
                }
                return;
            }

            // 필드 검증
            const fields = [
                {id: 'geoserver-ip', name: 'IP'},
                {id: 'geoserver-port', name: 'PORT'},
                // {id: 'geoserver-context', name: 'Context Path'},
                {id: 'geoserver-id', name: '아이디'},
                {id: 'geoserver-pw', name: '비밀번호'}
            ];
            if (!validation(fields)) return;

            const ip = $('#geoserver-ip').val();
            const port = $('#geoserver-port').val();
            const context = $('#geoserver-context').val();
            const id = $('#geoserver-id').val();
            const pw = $('#geoserver-pw').val();
            const url = `http://${ip}:${port}/${context}`;

            // 연결
            let isConnected = false;
            $.ajax({
                type: 'POST',
                url: '/api/geo/connection.proc.json',
                contentType: 'application/json',
                async: false,
                data: JSON.stringify({ url, username: id, password: pw }),
                success: data => isConnected = data,
                error: () => isConnected = false
            });

            // 결과
            if (!isConnected) {
                showToast('error', 'GeoServer 연결에 실패하였습니다.');
                // $inputs.prop('disabled', false);
                return;
            }

            // 연결 성공
            showToast('success', 'GeoServer 연결에 성공하였습니다.');
            changeConnPopup(true);
            // $connBtn.text('연결 해제');
            // $inputs.prop('disabled', true);
            $('#geo-info-popup-close').trigger('click');
            $('#menu-layer').trigger('click');

        });


    function changeConnPopup(currentConn){
        $connBtn.text(currentConn?'연결 해제':'연결');
        $inputs.prop('disabled', currentConn);
    }

});


