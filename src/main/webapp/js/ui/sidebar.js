$(function() {

    // 메뉴 클릭 이벤트
    $(document)
        .off('click', '.menu-btn')
        .on('click', '.menu-btn', function () {
            if($(this).hasClass('menu-btn-active')) return;

            $('.menu-btn').removeClass('menu-btn-active');
            $(this).addClass('menu-btn-active');

        });

    $(document)
        .off('click', '#menu-layer')
        .on('click', '#menu-layer', function () {
            initLayer();
        });

});