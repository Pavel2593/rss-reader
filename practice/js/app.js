$(document).ready(function () {
    $('.widget__btn').on('click', function () {
        $('.wrapper__form_adding_new_feed').addClass('visibility');
        $('.form_adding_new_feed').addClass('visibility');
    });


    $('.wrapper__form_adding_new_feed').on('click',function () {
        $('.wrapper__form_adding_new_feed').removeClass('visibility');
        $('.form_adding_new_feed').removeClass('visibility');
    });

    $('.form_adding_new_feed__cancel').on('click',function () {
        $('.wrapper__form_adding_new_feed').removeClass('visibility');
        $('.form_adding_new_feed').removeClass('visibility');
    });

    $('.form_adding_new_feed__add').on('click',function () {
        $('.wrapper__form_adding_new_feed').removeClass('visibility');
        $('.form_adding_new_feed').removeClass('visibility');
    });
});
