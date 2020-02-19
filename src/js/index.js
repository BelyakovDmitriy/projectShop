let allProducts = {},           //  Объект со всеми продуктами
    basket = new Basket;        //  Создаем объект корзины

ajax();                         //  Запрашивавем товары
basket.createBasket('body');          //  Создаем корзину товаров
basket.createPopUp('body'); //  Создаем Всплывающее окно при покупке
renderFeturedProducts();        //  Отрисовываем популярные товары
openBasket();                   //  Навешиваем показать/скрыть корзину

//  Навешиваем события показать корзину на #basket
function openBasket(){
    $('#basketButton').click(function () {
        basket.open();
    })
}

//getLocalProducts();             //  Выгружаем товары из локал в корзину

//  Ajax запрос. Получаем все товары
function ajax() {
    $.ajax({
        async: false,
        url: '../goods.json',
        type: 'get',
        dataType: 'json',
        beforeSend: function(){
          //    Вставим знак загрузки
        },
        success: function (data) {
            allProducts = data;
        },
        complete: function () {

        }
    });
}

function renderFeturedProducts() {
    for(let index in allProducts) {
        if (allProducts[index]['fetured']) {
            let good = new Good(
                index,
                allProducts[index]['goodName'],
                allProducts[index]['price'],
                allProducts[index]['img'],
                );
            good.render('.featured__items')
        }
    }
}

function getLocalProducts() {
    for(let key in localStorage) {
        if (!localStorage.hasOwnProperty(key)) {
            continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
        }
        basket.refresh(key, allProducts[key]['goodName'], allProducts[key]['price'], localStorage.getItem(key));
    }
}