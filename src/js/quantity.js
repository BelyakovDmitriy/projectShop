class Quantity {
    constructor(index, quantity) {
        this.index = index;
        this.quantity = quantity;
        
        this.classQantityMinus = index+'quantityMinus';
        this.classQantityPlus = index+'quantityPlus';
        this.classQuantity = index+'quantity';
        this.idQuantity = index+'idQuantity';
    }
    create(container) {
        let buf = this;
        $('#'+container)
            .append(
                $('<div>', {
                    class: this.classQantityMinus,
                    text: '-'
                })
                    .click(function () {
                        buf.minus();
                    }))
            .append(
                $('<input>', {
                    class: this.classQuantity,
                    id: this.index+this.idQuantity,
                    value: this.quantity
                })
                    .change(function () {
                        basket.refresh(buf.index, 0);
                    }))
            .append(
                $('<div>', {
                    class: this.classQantityPlus,
                    text: '+'
                })
                    .click(function () {
                        buf.plus();
                    }))
    }
    plus() {
        this.quantity=+$('#'+this.idQuantity).val()+1;
        basket.refresh(this.index, 1)
    }
    minus() {
        if(this.quantity<=1) {
            basket.delete(this.index);
        } else {
            this.quantity=+$('#'+this.idQuantity).val()-1;
            basket.refresh(this.index, -1)
        }
    }
}