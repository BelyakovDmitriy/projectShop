class Basket {
    constructor() {
        this.products={};                   //  Объект с товарами
        this.srcImgDel='../images/other/_ionicons_svg_md-trash.svg';    //  Адрес картинки удаления товара в корзине
        this.buyAnimate='buyAnimate';       //  Class, Id всплывающего при покупке окна
        this.quantityBasketItem = $('.quantityBasketItem');    //  Class отображение кол-ва товаров в корзине

        this.basket = 'basket';             //  Class, Id корзины
        this.closeBasket = 'closeBasket';
        this.basketContent = 'basketContent';   //  Class, Id области с товарами
        this.basketTotal = 'basketTotal';  //   Class, Id total корзины
        this.basketItem = 'basketItem';     //  Class, Id строки товара корзины
        this.basketTotalContent = 'basketTotalContent';

        this.basketTotalQuantity = 'basketTotalQuantity';    //  Class, Id общего количества товара в корзине
        this.basketTotalPrice = 'basketTotalPrice'; //   Class, Id общей цены корзины
        this.buttonOrder = 'buttonOrder';   //  Class, Id кнопки оформления заказа

        this.basketItemName = 'basketItemName'; //  Class, Id названия товара в корзине
        this.basketItemPrice = 'basketItemPrice';   //  Class, Id цены товара в корзине
        this.basketItemQuantity = 'basketItemQuantity'; //  Class, Id количества товара в корзине
        this.basketItemTotalPrice = 'basketItemTotalPrice'; //  Class, Id total price товара в корзине
        this.basketItemDel = 'basketItemDel';   //  Class, Id ячейки с удалением товара

        this.quantityMinus = 'quantityMinus';   //  Class, Id кнопки -
        this.quantityPlus = 'quantityPlus';     //  Class, Id кнопки +
        this.quantity = 'quantity';             //  Class, Id инпута с количеством товара
    }

//  Создание подложки корзины
    createBasket(containerBasket) {
    //  Занавес
        $('<div>', {
            class: 'cover'
        })
            .click(function () {
                basket.close();
            })
            .appendTo('body')
    //  Корзина
        $('<div>', {
            class: this.basket,
            id: this.basket
        })
            .append($('<div>', {
                class: this.closeBasket,
                id: this.closeBasket,
                text: 'X'
            })
            .click(function () {
                basket.close();
            }))
            .append($('<div>', {
                class: this.basketItem
            })
                .append($('<div>', {
                    class: this.basketItemName,
                    text: 'Наименование товаров'
                }))
                .append($('<div>', {
                    class: this.basketItemPrice,
                    text: 'Цена за шт.'
                }))
                .append($('<div>', {
                    class: this.basketItemQuantity,
                    text: 'Количество'
                }))
                .append($('<div>', {
                    class: this.basketItemTotalPrice,
                    text: 'Общая цена'
                }))
                .append($('<iv>', {
                    class: this.basketItemDel,
                    text: ''
                }))
            )
            .append($('<div>', {
                class: this.basketContent,
                id: this.basketContent
            }))
            .append($('<div>', {
                class: this.basketTotal,
                id: this.basketTotal
            })
                .append($('<div>', {
                    class: this.basketTotalContent,
                    text: 'Итого:'
                }))
                .append($('<div>', {
                    class: this.basketTotalQuantity,
                    id: this.basketTotalQuantity,
                }))
                .append($('<div>', {
                    class: this.basketTotalPrice,
                    id: this.basketTotalPrice,
                })))
            .append($('<div>', {
                class: this.buttonOrder,
                id: this.buttonOrder,
                text: 'Оформить заказ'
            }))
            .appendTo(containerBasket);
        this.basket = $('#'+this.basket);
        this.cover = $('.cover');
    }

    open(){
        this.cover.addClass('visible')
            .animate({
                opacity: 0.9
            }, 200);
        this.basket.addClass('visible')
            .animate({
                opacity: 1
            }, 200);
    }

    close() {
        let buf = this;

        buf.cover.animate({
            opacity: 0
        }, 400, function () {
            buf.cover.removeClass('visible')
        });
        buf.basket.animate({
            opacity: 0
        }, 400, function () {
            buf.basket.removeClass('visible')
        })
    }

//  Добавление товара в корзину
    addGood(index, name, price, quantity) {
    //  Смотрим есть ли товар с таким индексом в корзине
        if(index in this.products) {
            this.products[index]['name']=name;
            this.products[index]['price']=price;
            this.refresh(index, 1);
        } else {
            this.products[index] = {
                'name': name,
                'price': price,
                'quantity': quantity,
                'totalPrice': quantity*price
            };
            this.create(index);
        }
    }

//  Обновление товара в корзине
    refresh(index, quantity) {
        this.products[index]['quantity'] = +$('#'+index+this.quantity).val() + quantity;
        if(this.products[index]['quantity'] <= 0) {
            $('#'+index+this.quantity).val(this.products[index]['quantity']);
            this.delete(index);
        } else {
            this.products[index]['totalPrice'] = this.products[index]['quantity'] * this.products[index]['price'];

            $('#'+index+this.basketItemName).text(this.products[index]['name']);
            $('#'+index+this.basketItemPrice).text(this.products[index]['price']+' p');
            $('#'+index+this.quantity).val(this.products[index]['quantity']);
            $('#'+index+this.basketItemTotalPrice).text(this.products[index]['totalPrice']+' p');
        }
        this.calcTotal();
    }
    calcTotal() {
        let buf = this;
        this.products['totalQuantity'] = 0;
        this.products['totalPrice'] = 0;
        for (let index in this.products) {
            if(!isNaN(index)) {
                this.products['totalQuantity'] += +this.products[index]['quantity'];
                this.products['totalPrice'] += +this.products[index]['totalPrice'];
            }
        }
        $('#'+this.basketTotalQuantity).text(this.products['totalQuantity']+' шт');
        $('#'+this.basketTotalPrice).text(this.products['totalPrice']+' р');
        //  Количество товаров в корзине рядом со значком корзины
        buf.quantityBasketItem.text(this.products['totalQuantity']);
        buf.quantityBasketItem.animate({
            'font-size': '2.5vw'
        }, 70, function () {
            buf.quantityBasketItem.animate({
                'font-size': '1.5vw'
            }, 70)
        })
    }

//  Создание строки с товаром
    create(index) {
        let buf=this;
        this.calcTotal();

         $('<div>', {
            class: this.basketItem+' '+index+this.basketItem,
            id: index+this.basketItem
        })
    //  Название товара
            .append($('<a>', {
                class: this.basketItemName+' '+index+this.basketItemName,
                id: index+this.basketItemName,
                text:  this.products[index]['name']
            }))
    //  Цена товара
            .append($('<div>', {
                class: this.basketItemPrice+' '+index+this.basketItemPrice,
                id: index+this.basketItemPrice,
                text: this.products[index]['price']+' p'
            }))
    //  Количество товара
            .append($('<div>', {
                class: this.basketItemQuantity+' '+index+this.basketItemQuantity,
                id: index+this.basketItemQuantity,
            })
        // Кнопка -
                .append(
                    $('<div>', {
                        class: this.quantityMinus+' '+index+this.quantityMinus,
                        id: index+this.quantityMinus,
                        text: '-'
                    })
                        .click(function () {
                            basket.refresh(index, -1);
                        }))
        // Инпут
                .append(
                    $('<input>', {
                        class: this.quantity+' '+index+this.quantity,
                        id: index+this.quantity,
                        value: this.products[index]['quantity']
                    })
                        .change(function () {
                            basket.refresh(index, 0);
                        }))
            // Кнопка +
                .append(
                    $('<div>', {
                        class: this.quantityPlus+' '+index+this.quantityPlus,
                        id: index+this.quantityPlus,
                        text: '+'
                    })
                        .click(function () {
                            basket.refresh(index, 1);
                        }))
    //  Проявка кнопок + и -
                .hover(function () {

                    $('#'+index+buf.quantityMinus+', #'+index+buf.quantityPlus).animate({
                            opacity: 1
                        }, 150)
                    }, function () {
                    $('#'+index+buf.quantityMinus+', #'+index+buf.quantityPlus).animate({
                        opacity: 0
                    }, 150)}))
    //  Общая стоимость товара
            .append($('<div>', {
                class: this.basketItemTotalPrice+' '+index+this.basketItemTotalPrice,
                id: index+this.basketItemTotalPrice,
                text: this.products[index]['totalPrice']+' p'
            }))
    //  Удаление строки товара
            .append($('<div>', {
                class: this.basketItemDel+' '+index+this.basketItemDel,
                id: index+this.basketItemDel
            })
                .append($('<img>', {
                    src: this.srcImgDel
                }))
                .click(function () {
                    basket.delete(index);
                    basket.calcTotal();
                }))

            .appendTo('.'+this.basketContent)
    }

//  Удаление товара из корзины
    delete(index) {
        let basketItemDel = $('#'+index+this.basketItem);
        basketItemDel.animate({
            opacity: 0
        }, 400, function () {
            basketItemDel.remove();
        });
        delete this.products[index];
    }

//  Всплывающее окно при ппокупке товара
    createPopUp(container) {
        $('<div>', {
            class: this.buyAnimate,
            id: this.buyAnimate,
            text: 'Товар добавлен в корзину'
        })
            .appendTo(container)
    }
}