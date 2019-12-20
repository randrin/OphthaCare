// Go to Top Page Clic Button
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

// Effet Scroll Page
$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 260) {
      $('#ophthacare-navbar').removeClass('fix-navbar').addClass('scroll-navbar');
      $('#ophthacare-navbar').fadeIn();
    } else {
      $('#ophthacare-navbar').removeClass('scroll-navbar').addClass('fix-navbar');
      $('#ophthacare-navbar').fadeIn();
    }
  });
});