/*
    * Sidebar
    */
(function () {
    //Toggle
    $('body').on('click', '#menu-trigger, #chat-trigger,#noteClose-trigger,#noteSave-trigger', function (e) {
        e.preventDefault();
        var x = $(this).data('trigger');

        $(x).toggleClass('toggled');
        $(this).toggleClass('open');
        $('body').toggleClass('modal-open');

        //Close opened sub-menus
        $('.sub-menu.toggled').not('.active').each(function () {
            $(this).removeClass('toggled');
            $(this).find('ul').hide();
        });



        $('.profile-menu .main-menu').show();

        if (x == '#sidebar') {

            $elem = '#sidebar';
            $elem2 = '#menu-trigger';

            $('#chat-trigger').removeClass('open');

            if (!$('#chat').hasClass('toggled')) {
                $('#header').toggleClass('sidebar-toggled');
            }
            else {
                $('#chat').removeClass('toggled');
            }
        }

        if (x == '#chat') {
            $elem = '#chat';
            $elem2 = '#chat-trigger';

            $('#menu-trigger').removeClass('open');

            if (!$('#sidebar').hasClass('toggled')) {
                $('#header').toggleClass('sidebar-toggled');
            }
            else {
                $('#sidebar').removeClass('toggled');
            }
        }

        //When clicking outside
        if ($('#header').hasClass('sidebar-toggled')) {
            $(document).on('click', function (e) {
                if (($(e.target).closest($elem).length === 0) && ($(e.target).closest($elem2).length === 0)) {
                    setTimeout(function () {
                        $('body').removeClass('modal-open');
                        $($elem).removeClass('toggled');
                        $('#header').removeClass('sidebar-toggled');
                        $($elem2).removeClass('open');
                    });
                }
            });
        }
    })

    //Submenu
    $('body').on('click', '.sub-menu > a', function (e) {
        e.preventDefault();
        $(this).next().slideToggle(200);
        $(this).parent().toggleClass('toggled');
    });
})();
