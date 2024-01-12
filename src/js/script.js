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
    // ページ固有の操作を実行
    const modalImage = modal.querySelector(".js-modal-img");
    if (modalImage) {
      // modalImageが存在する場合の処理
    }
  }

  if (modal) {
    // モーダルコンテンツのクリックイベントが外側に伝播しないようにする
    const modalInner = modal.querySelector(".modal__inner");
    if (modalInner) {
      modal.addEventListener("click", function (event) {
        event.stopPropagation();
      });
    }
    if (modalInner) {
      modalInner.addEventListener("click", function (event) {
        event.stopPropagation();
      });

      // モーダルを表示する関数
      function openModal(imageSrc, caption) {
        const modalImage = modal.querySelector(".js-modal-img");
        const modalWebpImage = modal.querySelector(".js-modal-webp-img");

        // 画像を読み込んだ後に実行されるコールバック関数
        const adjustModalSize = function () {
          modal.classList.add("show");

          // 背景ページのスクロールを無効にする
          document.body.style.overflow = "hidden";

          // 画像の幅を取得して、modal__innerの横幅を調整
          const imageWidth = modalImage.width;
          modalInner.style.maxWidth = imageWidth + "px"; // 最大幅を設定
        };

        modalImage.onload = adjustModalSize; // 画像の読み込みが完了したらコールバックを実行
        modalImage.src = imageSrc;
        modalWebpImage.srcset = imageSrc.replace(".jpg", ".webp");
      }

      // モーダルを閉じる関数
      function closeModal() {
        modal.classList.remove("show");

        // 背景ページのスクロールを有効にする
        document.body.style.overflow = "";
      }

      // モーダルトリガーのイベントリスナーを設定
      const modalTriggerElements = document.querySelectorAll(".js-modal-trigger");
      modalTriggerElements.forEach(function (element) {
        element.addEventListener("click", function () {
          const imageSrc = element.getAttribute("data-src");
          const caption = element.getAttribute("data-caption");
          openModal(imageSrc, caption);
        });
      });

      // モーダルの外側をクリックした際に閉じるイベントリスナーを設定
      modal.addEventListener("click", function (event) {
        if (event.target === modal) {
          closeModal();
        }
      });
    }
  }


  // ------------------
  // タブメニュー
  // ------------------
  // 別ページからのダイレクトリンク用関数
  function activateTabFromHash() {
    var hash = window.location.hash;

    if (!hash) {
      hash = '#tab01'; // デフォルトのタブ
    }

    $('.js-tab, .js-info-card').removeClass('active');
    $('.js-tab a[href="' + hash + '"]').parent().addClass('active');
    $(hash).addClass('active');

    // タブまでスクロール
    if ($(hash).offset()) {
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 500); // 500ミリ秒でスクロール
    }
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
  // DOMが完全に読み込まれた後に実行
  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("form");

    // formが存在する場合のみ、以下のコードを実行
    if (form) {
      var submitButton = document.querySelector(".js-submit");
      var errorText = document.querySelector(".contact__error-message");
      var requiredFields = form.querySelectorAll("input[required], textarea[required], select[required]");

      submitButton.addEventListener("click", function (event) {
        var isAnyFieldEmpty = false;
        errorText.classList.remove("empty");

        requiredFields.forEach(function (field) {
          if (field.value.trim() === "") {
            field.classList.add("empty");
            isAnyFieldEmpty = true;
          } else {
            field.classList.remove("empty");
          }
        });

        if (isAnyFieldEmpty) {
          event.preventDefault();
          errorText.classList.add("empty");
        }
      });
    } else {
      console.log("The form element with id 'form' was not found.");
    }
  });
});
