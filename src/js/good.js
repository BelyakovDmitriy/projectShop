class Good {
    constructor(index, goodName, price, img, description, male, fetured) {
        this.index = index;
        this.goodName = goodName;
        this.price = price;
        this.img = '../images/desktop\+/'+img;
        this.description = description;
        this.male = male;
        this.fetured = fetured;

        this.goodsClass = 'goodsItem '+index;
        this.goodsItemName = 'goodsItem__name '+index;
        this.goodsItemPrice = 'goodsItem__price '+index;

        this.classButtonBuy = 'addToCart '+index;
        this.textButtonBuy = 'В корзину';
    }
    render(containerGoods) {
        let good = this;
        $('<a>', {
            class: this.goodsClass
        })
            .append($('<img>', {
                src: this.img
            }))
            .append($('<div>', {
                class: this.goodsItemName,
                text: this.goodName
            }))
            .append($('<div>', {
                class: this.goodsItemPrice,
                text: this.price+' p'
            }))
            .append($('<a>',{
                    class: this.classButtonBuy,
                    text: this.textButtonBuy,
                })
                    .click(function() {
                        let quantity = 1;
                        let addToBasket = $('#buyAnimate');
                        basket.addGood(good.index, good.goodName, good.price, quantity);
                        addToBasket.addClass('visible');
                        addToBasket.animate({
                            opacity: 1
                        }, 100, function () {
                            setTimeout(function () {
                                addToBasket.animate({
                                    opacity: 0
                                }, 400, function () {
                                    addToBasket.removeClass('visible')
                                })
                            }, 1000)
                        })
                    })

            )
            .appendTo($(containerGoods))
    }
}