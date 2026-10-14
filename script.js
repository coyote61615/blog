// Número com código do país e DDD, só dígitos. Exemplo: 5561999999999
var WHATSAPP = "";
var MENSAGEM = "Olá! Vi seu site e gostaria de pedir um orçamento.";
if (WHATSAPP) {
  var link = "https://wa.me/+5597981132190" + WHATSAPP + "?text=" + encodeURIComponent(MENSAGEM);
  document.querySelectorAll(".js-wa").forEach(function (a) {
    a.href = link; a.target = "_blank"; a.rel = "noopener";
  });
}

(function () {
  var reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js");

  // aparece ao rolar
  var itens = document.querySelectorAll(".revela");
  if ("IntersectionObserver" in window && !reduz) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("entrou"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    itens.forEach(function (el) { io.observe(el); });
  } else {
    itens.forEach(function (el) { el.classList.add("entrou"); });
  }

  // menu marca a seção atual
  var links = document.querySelectorAll(".menu a");
  var secoes = document.querySelectorAll(".servico");
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) {
            var on = a.getAttribute("href") === "#" + e.target.id;
            a.classList.toggle("ativo", on);
            if (on) {
              var box = a.parentElement;
              box.scrollTo({ left: a.offsetLeft - 24, behavior: reduz ? "auto" : "smooth" });
            }
          });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    secoes.forEach(function (s) { spy.observe(s); });
  }

  // barra de progresso e botão fixo
  var barra = document.getElementById("progresso");
  var fixo = document.getElementById("fixo");
  var hero = document.querySelector(".hero");
  var contato = document.getElementById("contato");
  function aoRolar() {
    var h = document.documentElement;
    var total = h.scrollHeight - h.clientHeight;
    var p = total > 0 ? Math.min(1, window.scrollY / total) : 0;
    barra.style.transform = "scaleX(" + p + ")";
    var passouHero = window.scrollY > hero.offsetHeight - 80;
    var noContato = contato.getBoundingClientRect().top < window.innerHeight - 40;
    fixo.classList.toggle("visivel", passouHero && !noContato);
  }
  var tick = false;
  window.addEventListener("scroll", function () {
    if (!tick) { tick = true; requestAnimationFrame(function () { aoRolar(); tick = false; }); }
  }, { passive: true });
  aoRolar();

  // leve inclinação das ilustrações com o mouse (só no computador)
  if (!reduz && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".arte").forEach(function (a) {
      a.addEventListener("pointermove", function (e) {
        var r = a.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        a.style.setProperty("--ry", (x * 9) + "deg");
        a.style.setProperty("--rx", (-y * 9) + "deg");
      });
      a.addEventListener("pointerleave", function () {
        a.style.setProperty("--rx", "0deg");
        a.style.setProperty("--ry", "0deg");
      });
    });
  }
})();
