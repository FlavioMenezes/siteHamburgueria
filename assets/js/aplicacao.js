
const menuItens = document.querySelectorAll('.menu a[href^="#"]');

menuItens.forEach(item => {
    item.addEventListener('click', scrollComClique);
});

function pegarScrollDoHref(elemento){
    const id = elemento.getAttribute('href');
    const secao = document.querySelector(id).offsetTop;
    
    return secao;
}

function scrollComClique(){
    event.preventDefault();
    const secao = pegarScrollDoHref(event.target) - 80;

    scrollParaPosicao(secao);

}

function scrollParaPosicao(secao){
/*  FUNCIONA NATIVO - MAS NAO EM TODOS OS NAVEGADORES   
    window.scroll({
        top: secao,
        behavior: "smooth"
    }); */

    smoothScrollTo(0, secao); // INDO PARA FUNCAO em TODOS 

}

// Caso deseje suporte a browsers antigos / que não suportam scroll smooth nativo
/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int) endY: destination y coordinate
 * @param {int} duration: animation duration in ms
*/
   function smoothScrollTo(endX, endY, duration) {
     const startX = window.scrollX || window.pageXOffset;
     const startY = window.scrollY || window.pageYOffset;
     const distanceX = endX - startX;
     const distanceY = endY - startY;
     const startTime = new Date().getTime();
   
     duration = typeof duration !== 'undefined' ? duration : 600;
   
     // Easing function
     const easeInOutQuart = (time, from, distance, duration) => {
       if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
       return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
     };
   
     const timer = setInterval(() => {
       const time = new Date().getTime() - startTime;
       const newX = easeInOutQuart(time, startX, distanceX, duration);
       const newY = easeInOutQuart(time, startY, distanceY, duration);
       if (time >= duration) {
         clearInterval(timer);
       }
       window.scroll(newX, newY);
     }, 1000 / 60); // 60 fps
   };