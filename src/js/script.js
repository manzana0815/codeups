jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる
  // ------------------
  // HAMBURGER & DRAWER
  // ------------------
  // ハンバーガーメニュー ＆ ドロワーメニュー
  $(".js-hamburger").on("click", function () {
    $(".header").toggleClass("is-open")
    $(".hamburger").toggleClass("is-open");
    $(".header__drawer").toggleClass("is-open");
    $("body").toggleClass("is-open")
  });

  $(document).ready(function () {
    // ドロワーメニュー内のリンクがクリックされたときの処理
    $('.header__drawer .nav__sub-item a').on('click', function () {
      // ドロワーメニューとヘッダーのクラスを削除
      $('.header__drawer, .header').removeClass('is-open');
      $('.hamburger').removeClass('is-open'); // ハンバーガーメニューアイコンの状態も変更する場合
      $('body').removeClass('is-open'); // ボディのスクロールを制御している場合
    });
  });



  // ドロワーメニューを開いた状態で画面幅を拡大したらドロワーメニューを閉じる
  $(window).resize(function () {
    if ($(window).width() >= 768) {
      $(".header").removeClass("is-open");
      $(".hamburger").removeClass("is-open");
      $(".header__drawer").removeClass("is-open");
      $("body").removeClass("is-open");
    }
  });


  // ------------------
  // SWIPER
  // ------------------
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




  // ------------------
  // COLOR-BOX
  // ------------------
  //カラーボックス＋画像
  //要素の取得とスピードの設定
  var box = $(".js-color-box"),
    speed = 700;

  //.js-color-boxの付いた全ての要素に対して下記の処理を行う
  box.each(function () {
    $(this).append("<div class='color'></div>")
    var color = $(this).find($(".color")),
      image = $(this).find("img");
    var counter = 0;

    image.css("opacity", "0");
    color.css("width", "0%");
    //inviewを使って背景色が画面に現れたら処理をする
    color.on("inview", function () {
      if (counter == 0) {
        $(this).delay(200).animate({ "width": "100%" }, speed, function () {
          image.css("opacity", "1");
          $(this).css({ "left": "0", "right": "auto" });
          $(this).animate({ "width": "0%" }, speed);
        })
        counter = 1;
      }
    });
  });


  // ------------------
  // TO-TOP
  // ------------------
  $(function () {
    var $toTop = $(".to-top");
    var fvHeight = $(window).width() > 767 ? 548 : 460; // PCは548px、SPは460px

    $(window).scroll(function () {
      var scrollPos = $(this).scrollTop();
      var windowHeight = $(window).height();
      var documentHeight = $(document).height();
      var footerHeight = $("footer").innerHeight();

      var isPastFV = scrollPos > fvHeight;
      var isAboveFooter = (documentHeight - scrollPos - windowHeight) > footerHeight;

      if (isPastFV && isAboveFooter) {
        $toTop.fadeIn();
      } else {
        $toTop.fadeOut();
      }
    });

    $toTop.click(function () {
      $("body, html").animate({ scrollTop: 0 }, 300);
      return false;
    });
  });

  // ------------------
  // MODAL
  // ------------------
  // モーダル要素を取得
  const modal = document.querySelector(".js-modal");
  if (modal) {
    // モーダルを表示する関数
    function openModal(imageSrc, caption) {
      const modalImage = modal.querySelector(".modal__img");
      if (modalImage) {
        modalImage.innerHTML = ""; // 既存の画像をクリア

        // 画像を生成してモーダル内に表示
        modalImage.innerHTML = `<img src="${imageSrc}" alt="${caption}" />`;

        modal.classList.add("show");
        document.body.style.overflow = "hidden"; // スクロールバーを非表示
      }
    }

    // モーダルトリガーのイベントリスナーを設定
    const modalTriggerElements = document.querySelectorAll(".js-modal-trigger");
    modalTriggerElements.forEach(function (element) {
      element.addEventListener("click", function (event) {
        event.stopPropagation(); // クリックイベントの伝播を停止
        const imageSrc = element.getAttribute("data-src");
        const caption = element.getAttribute("data-caption");
        openModal(imageSrc, caption);
      });
    });

    // モーダル外部をクリックして閉じるイベントリスナーを設定
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.classList.remove("show");
        document.body.style.overflow = ""; // スクロールバーを表示
        modal.querySelector(".modal__img").innerHTML = ""; // モーダル内の画像をクリア
      }
    });
  }




  // ------------------
  // タブメニュー
  // ------------------
  // 別ページからのダイレクトリンク用関数
  function activateTabFromHash() {
    // URLからhashを取得
    var hash = window.location.hash;
    // hashが存在しない場合は
    if (!hash) {
      // 変数hashに"#tab01"を代入してデフォルトのタブとする
      hash = '#tab01';
    }

    // ハッシュがページ上に存在したら
    if ($(hash).offset()) {
      // FVの高さを取得
      var fvHeight = $('.sub-mv').height(); // 仮にFVのIDが"fv"と仮定
      // タブの高さを取得
      var tabHeight = $('.info__tabs').height();
      // スクロール位置の計算を変更
      var scrollTop = $(hash).offset().top - fvHeight - tabHeight;
    }

    // デフォルトのタブまたは現在アクティブのタブを無効にして
    $('.js-tab, .js-info-card').removeClass('active');
    // 該当するタブに新たにアクティブクラスを付与
    $('.js-tab a[href="' + hash + '"]').parent().addClass('active');

    $(hash).addClass('active');

    // タブまでスクロール
    $('html, body').animate({
      scrollTop: scrollTop
    }, 500); // 500ミリ秒でスクロール
  }

  // ページ読み込みとハッシュ変更時にタブをアクティブにする
  $(document).ready(activateTabFromHash);
  $(window).on('hashchange', activateTabFromHash);

  // タブクリック時の処理
  $(".js-tab").on("click", function () {
    // タブのIDをハッシュに設定
    window.location.hash = $(this).find("a").attr("href");
  });



  // ------------------
  // BLOG-CARD:HOVER
  // ------------------
  // .blog-card要素をすべて取得
  const blogCards = document.querySelectorAll(".js-hover-scale");

  // 各.blog-card要素に対してループ処理
  blogCards.forEach(blogCard => {
    // img要素を取得
    const imgElement = blogCard.querySelector("img");

    // マウスが要素に乗ったときの処理
    blogCard.addEventListener("mouseenter", () => {
      // img要素を1.1倍に拡大するアニメーションを設定
      imgElement.style.transition = "transform 0.3s";
      imgElement.style.transform = "scale(1.1)";
    });

    // マウスが要素から離れたときの処理
    blogCard.addEventListener("mouseleave", () => {
      // img要素を元のサイズに戻すアニメーションを設定
      imgElement.style.transition = "transform 0.3s";
      imgElement.style.transform = "scale(1)";
    });
  });


  document.querySelectorAll(".js-collapse").forEach(button => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      button.classList.toggle("active");
      content.classList.toggle("show");
    });
  });
  // ------------------
  // ACCORDION
  // ------------------
  $(function () {
    // タイトルをクリックすると
    $(".js-accordion-title").on("click", function () {
      // クリックした次の要素を開閉
      $(this).next().slideToggle(300);
      // タイトルにopenクラスを付け外しして矢印の向きを変更
      $(this).toggleClass("active", 300);
    });
  });


  // ------------------
  // ADDRESS BAR
  // ------------------
  $(window).on("load resize", function () {
    let window_height = window.innerHeight
      ? window.innerHeight
      : $(window).innerHeight();
    $(".wrap").css("min-height", window_height + "px");
  });

  // ------------------
  // CONTACT FORM
  // ------------------
  var formBtn = document.querySelector('.form__btn');

  if (formBtn) {
    formBtn.addEventListener('click', function (event) {
      event.preventDefault(); // 通常のフォーム送信を防止

      var form = document.getElementById('form');
      var isValid = true; // フォームの有効性を追跡
      var requiredFields = form.querySelectorAll('[required]'); // 必須フィールドを取得
      var errorMessage = document.getElementsByClassName('contact__error-message')[0]; // エラーメッセージ要素を取得

      // エラーメッセージとエラークラスを初期化
      if (errorMessage) {
        errorMessage.style.display = 'none';
        errorMessage.classList.remove('is-error'); // 以前のエラークラスを削除
      }
      requiredFields.forEach(function (field) {
        field.classList.remove('is-error'); // 以前のエラークラスを削除
      });

      // テキスト入力およびテキストエリアの検証
      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('is-error'); // エラークラスを追加
        }
      });

      // すべてのチェックボックスグループの検証
      var checkboxGroups = form.querySelectorAll('.form__checkbox-items, .form__privacy');
      checkboxGroups.forEach(function (group) {
        var checkboxes = group.querySelectorAll('input[type="checkbox"]');
        var isCheckboxChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
        if (!isCheckboxChecked) {
          isValid = false;
          // すべてのチェックボックス項目にエラークラスを追加
          group.querySelectorAll('.form__checkbox-item').forEach(function (item) {
            item.classList.add('is-error');
          });
        } else {
          // すべてのチェックボックス項目からエラークラスを削除
          group.querySelectorAll('.form__checkbox-item').forEach(function (item) {
            item.classList.remove('is-error');
          });
        }
      });

      // フォームが有効な場合、サンクスページに遷移
      if (isValid) {
        form.submit(); // フォームを送信
        window.location.href = 'page-contact-thanks.html'; // リダイレクト
      } else {
        // フォームが無効な場合、エラーメッセージを表示
        if (errorMessage) {
          errorMessage.style.display = 'block';
          errorMessage.classList.add('is-error'); // エラークラスを追加
        }
      }
    });
  }

});
