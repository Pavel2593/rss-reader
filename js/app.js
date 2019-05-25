$(document).ready(function () {
    $('.sidebar__btn').on('click', function () {
        $('.wrapper__form_adding_new_feed').addClass('visibility');
        $('.form_adding_new_feed').addClass('visibility');
    });

    $('.wrapper__form_adding_new_feed').on('click',function () {
        $('.wrapper__form_adding_new_feed').removeClass('visibility');
        $('.form_adding_new_feed').removeClass('visibility');
        $('.form_editing_feed').removeClass('visibility');
    });

    $('.form_adding_new_feed__cancel').on('click',function () {
        $('.wrapper__form_adding_new_feed').removeClass('visibility');
        $('.form_adding_new_feed').removeClass('visibility');
        $('.form_editing_feed').removeClass('visibility');
    });

    $('.form_adding_new_feed__add').on('click',function () {
        $('.wrapper__form_adding_new_feed').removeClass('visibility');
        $('.form_adding_new_feed').removeClass('visibility');
    });

    $('.form_editing_feed__edit').on('click',function () {
        $('.wrapper__form_adding_new_feed').removeClass('visibility');
        $('.form_editing_feed').removeClass('visibility');
    });
});
