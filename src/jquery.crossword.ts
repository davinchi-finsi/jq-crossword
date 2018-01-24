import {CrosswordDefinition} from "crossword-definition";

$.widget("ui.crossword",{
    NAMESPACE: "jq-crossword",
    options: {
        classes: {//css classes for elements
            root:"crossword"
        }
    },
    /**
     * @constructor
     * @private
     */
    _create: function () {
        this.element.addClass(this.options.classes.root);
        console.log(CrosswordDefinition);
        //use or create model
        //create markup from model
        //assign events
    }
});