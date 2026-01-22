class ModalWindow {
  constructor(id, w, h) {
    this.id = id;
    this.width = w;
    this.height = h;
    this.top = $("<div/>", { class: "top" });
    this.close = $("<a/>", { class: "close", text: "Закрыть" });
    this.top.append(this.close);
    // содержимое окна
    this.content = $("<div/>", { id: id, class: "content" });
    // окно
    this.modalWin = $("<div/>", { class: "window" });
    this.modalWin.append(this.top);
    this.modalWin.append(this.content);
    // добавим окно в конец тела документа
    $(document.body).append(this.modalWin);
    // маска
    this.mask = $("<div/>", { class: "mask" });
    $(document.body).append(this.mask);
    // предусмотрим закрытие окна
    this.close.on("click", this.closeWin);
  }
  showMask() {
    let maskHeight = $(document).height(),
      maskWidth = $(window).width();
    // Развернём маску на весь экран
    this.mask.css({
      width: maskWidth,
      height: maskHeight,
      // в текущем слое
      zIndex: ModalWindow.zndx++,
    });
    this.mask.fadeTo("fast", 0.7);
  }

  showWin() {
    // маскируем
    this.showMask();
    // окно в центре
    let W = $(window).width(),
      H = $(window).height(),
      Yoffset = window.pageYOffset;
    this.modalWin.css({
      left: (W - this.width) / 2,
      top: Yoffset + 10,
      width: this.width,
      height: this.height,
      zIndex: ModalWindow.zndx++,
    });
    this.modalWin.fadeIn(1000);
    this.top.on("mousedown", this.MouseDownHandler);
    $(document.body).on("mouseup", this.MouseUpHandler);
  }
  closeWin() {
    $(".mask").remove();
    $(".window").remove();
    ModalWindow.zndx -= 2;
  }

  MouseDownHandler(e) {
    let modalWin = $(this).offsetParent();
    let box = modalWin.offset();
    ModalWindow.dx = e.pageX - box.left;
    ModalWindow.dy = e.pageY - box.top;
    document.addEventListener("mousemove", onMouseMoveHandler, false);
  }

  MouseUpHandler() {
    document.removeEventListener("mousemove", onMouseMoveHandler, false);
  }
}

function onMouseMoveHandler(e) {
  if (e.target.className != "top") return;
  var modalWin = $(e.target).offsetParent();
  modalWin.offset({
    left: e.pageX - ModalWindow.dx,
    top: e.pageY - ModalWindow.dy,
  });
}

ModalWindow.dx = 0;
ModalWindow.dy = 0;
ModalWindow.windows = [];
ModalWindow.zndx = 9000;
