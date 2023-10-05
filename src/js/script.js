
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる
  // ハンバーガーメニュー ＆ ドロワーメニュー
  $(".js-hamburger").on("click", function () {
    $(".header").toggleClass("is-open")
    $(".hamburger").toggleClass("is-open");
    $(".header__drawer").toggleClass("is-open");
    $("body").toggleClass("is-open")
  });

  // ドロワーメニューを開いた状態で画面幅を拡大したらドロワーメニューを閉じる
  $(window).resize(function () {
    if ($(window).width() >= 768) {
      $(".header").removeClass("is-open");
      $(".hamburger").removeClass("is-open");
      $(".header__drawer").removeClass("is-open");
      $("body").css("overflow", "auto");
    }
  });

  //メインビュースワイパー
  var mvSwiper = new Swiper(".js-top-mv-swiper", {
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    allowTouchMove: false, // マウスでのスワイプを禁止
    effect: "fade",
    loop: true,
    speed: 2000, // ２秒かけながら次の画像へ移動
  });

  // キャンペーンスワイパー
  var windowSize = $(window).width();
  var space = 24;
  if (windowSize < 376) {
    space = 12;
  } else {
    space = 40;
  }
  var swiper = new Swiper(".js-top-campaign-swiper", {
    autoplay: {
      delay: 5000, // 5秒後にスライド
      disableOnInteraction: false, // 手動スライド後も自動再生を止めない
    },
    loop: true, // ループ有効
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    slidesPerView: "auto",
    spaceBetween: space,
  });

  //カラーボックス＋画像
  //要素の取得とスピードの設定
  var box = $('.js-color-box'),
    speed = 700;

  //.js-color-boxの付いた全ての要素に対して下記の処理を行う
  box.each(function () {
    $(this).append('<div class="color"></div>')
    var color = $(this).find($('.color')),
      image = $(this).find('img');
    var counter = 0;

    image.css('opacity', '0');
    color.css('width', '0%');
    //inviewを使って背景色が画面に現れたら処理をする
    color.on('inview', function () {
      if (counter == 0) {
        $(this).delay(200).animate({ 'width': '100%' }, speed, function () {
          image.css('opacity', '1');
          $(this).css({ 'left': '0', 'right': 'auto' });
          $(this).animate({ 'width': '0%' }, speed);
        })
        counter = 1;
      }
    });
  });

  // トップへ戻るボタン
  document.querySelector('.js-to-top').addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  var topBtn = $('.js-to-top');
  topBtn.hide();
  //スクロールが100に達したらボタン表示
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      //ボタンの表示方法
      topBtn.fadeIn();
    } else {
      //ボタンの非表示方法
      topBtn.fadeOut();
    }
  });

  // フッター手前でストップ
  $(window).on("scroll", function () {
    var scrollHeight = $(document).height();
    var scrollPosition = $(window).height() + $(window).scrollTop();
    var footHeight = $("footer").innerHeight();
    var bottomOffset = "16px"; // ボタンのデフォルト位置
    if (scrollHeight - scrollPosition <= footHeight) {
      // ページトップボタンがフッター手前に来たらpositionをfixedからabsoluteに変更
      $(".to-top").css({
        position: "absolute",
        bottom: footHeight - bottomOffset, // フッターの上に配置
      });
    } else {
      $(".to-top").css({
        position: "fixed",
        bottom: bottomOffset, // 画面下に固定
      });
    }
  });
});
