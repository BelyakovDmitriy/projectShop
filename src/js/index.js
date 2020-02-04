//  Ajax запрос. Получаем все товары

$.get({
    url: '../goods.json',
    dataType: 'json',
    success: function (data) {
        createProducts(data);
    }
});

//  Создаем и отрисовываем продукты с отметкой fetured на странице

function createProducts(allProducts) {
    for(var product in allProducts){
        if(allProducts[product]['fetured']){
            $('<a>', {
                href: '#',
                class: 'goodsItem'
            })
                .append($('<img>', {
                    src: '../images/desktop\+/'+allProducts[product]['img']
                }))
                .append($('<div>', {
                    class: 'goodsItem__name',
                    text: allProducts[product]['goodName']
                }))
                .append($('<div>', {
                    class: 'goodsItem__price',
                    text: allProducts[product]['price']+' p.'
                }))

                .appendTo($('.featured__items'))
        }
    }

}

//

