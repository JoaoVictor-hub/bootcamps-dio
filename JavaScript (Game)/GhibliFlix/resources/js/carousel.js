/**Carossel principal**/
var mainCarousel = document.getElementById('main-carousel');
/*Botões do carossel principal*/
var mainBtn = document.getElementsByClassName('main-carousel-button');
mainBtn[0].onclick = () => calcMargin(mainCarousel, true);
mainBtn[1].onclick = () => calcMargin(mainCarousel);

/**Carossel de personagens**/
var charactersCarousel = document.getElementById('characters-carousel');
/*Botões do carossel de personagens*/
var charactersBtn = document.getElementsByClassName('characters-carousel-button');
charactersBtn[0].onclick = () => calcMargin(charactersCarousel, true);
charactersBtn[1].onclick = () => calcMargin(charactersCarousel);

/**Carossel de localizações**/
var locationsCarousel = document.getElementById('locations-carousel');
/*Botões do carossel de localizações*/
var locationsBtn = document.getElementsByClassName('locations-carousel-button');
locationsBtn[0].onclick = () => calcMargin(locationsCarousel, true);
locationsBtn[1].onclick = () => calcMargin(locationsCarousel);

/**
    Função para verificar o tamanho do display e verificar a margem máxima
    para um slider a partir da quantidade de elementos dispostos.
**/
function verifyMaxWidth(carousel, contentWidth, prev = false) {
    let margin = carousel.style.marginLeft;
    let pos = margin.length == 0 ? 0 : Math.trunc((parseInt(margin)) / contentWidth);

    pos = prev ? pos + 1 : pos - 1;
    if (pos == 0 && prev)
        return false;
    else if (!prev) {
        let total = carousel.clientWidth;
        let max = contentWidth * (carousel.children.length);
        if (Math.abs(pos) >= carousel.children.length)
            return false;
        else if (total > max)
            return false;
    }
    return pos;
}

/**
    Calcula e altera o valor da margin (muda a posição do slider).
**/
function calcMargin(carousel, prev = false) {
    let contentWidth = (carousel.children[0].offsetWidth + 10);

    let pos = verifyMaxWidth(carousel, contentWidth, prev);
    if (pos <= 0)
        carousel.style.marginLeft = pos * contentWidth + "px";
}