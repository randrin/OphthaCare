$(document).ready(function () {
  $('body').append('<a id="toTop" class="btn btn-default btn-md" href="#" title="Go to Top Page"><i class="material-icons">arrow_upward</i></a>');
  $(window).scroll(function () {
    if ($(this).scrollTop() != 0) {
      $('#toTop').fadeIn();
    } else {
      $('#toTop').fadeOut();
    }
  });
  $('#toTop').click(function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });
});