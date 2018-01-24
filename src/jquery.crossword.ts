import {CrosswordDefinition,CrosswordCell,CrosswordClueDefinition} from "crossword-definition";

/**
 * Parameters for the plugin
 */
export interface JqCrosswordOptions{
    /**
     * Definition to use
     */
    definition:CrosswordDefinition;
    /**
     * Css classes to use
     */
    classes?: {//css classes for elements
        /**
         * Root element
         * @default "c-crossword"
         */
        root?:string;
        /**
         * Class for the board
         * @default "c-crossword__board"
         */
        board?:string;
        /**
         * Class for each row
         * @default "c-crossword__row"
         */
        row?:string;
        /**
         * Class for each cell
         * @default "c-crossword__cell"
         */
        cell?:string;
        /**
         * Class for cells with clue
         * @default "c-crossword__clue"
         */
        clue?:string;
        /**
         * Class for cells with content or field
         * @default "c-crossword__clue--light"
         */
        light?:string;
        /**
         * Class for cells that are hints
         * @default "c-crossword__clue--hint"
         */
        hint?:string;
        /**
         * Class for cells fields
         * @default "c-crossword__clue__field"
         */
        field?:string;
    }
}
class CrosswordCellRegistry{
    definition:CrosswordCell;
    field:JQuery;
    element:JQuery;
    rowRegistry:CrosswordRowRegistry;
    isCorrect?:boolean;
}
class CrosswordRowRegistry{
    element:JQuery;
    cellsRegistry:CrosswordCellRegistry[];
    isCorrect?:boolean;
}
$.widget("ui.crossword",{
    NAMESPACE: "jq-crossword",
    options: {
        classes: {//css classes for elements
            root:"c-crossword",
            board:"c-crossword__board",
            row:"c-crossword__row",
            cell:"c-crossword__cell",
            clue:"c-crossword__clue",
            light:"c-crossword__clue--light",
            hint:"c-crossword__clue--hint",
            field:"c-crossword__clue__field"
        }
    },
    /**
     * @constructor
     * @private
     */
    _create: function () {
        this.element.addClass(this.options.classes.root);
        this._createDefinition();
        this._createDOMForDefinition();
        this._addEvents();
        //use or create model
        //create markup from model
        //assign events
    },
    _addEvents:function(){
        this.element.on(`focus.${this.NAMESPACE}`,"."+this.options.classes.field,{instance:this},this._onFieldFocus);
        this.element.on(`change.${this.NAMESPACE}`,"."+this.options.classes.field,{instance:this},this._onFieldChange);
        this.element.on(`keydown.${this.NAMESPACE}`,"."+this.options.classes.field,{instance:this},this._onFieldKey);
    },
    _onFieldFocus:function(e){
        let instance = e.data.instance;
    },
    _onFieldChange:function(e){
        let instance = e.data.instance;
        if(!instance.disabled){
            //if field is emt
        }else{
            e.preventDefault()
        }
    },
    /**
     * Get the next or prev clue related to a registry
     * @param {CrosswordCellRegistry} cellRegistry
     * @param {boolean} next    If true, will look for the next clue, otherwise will look for the prev clue
     * @returns {any}
     * @private
     */
    _getNextOrPrevClueFrom:function(cellRegistry:CrosswordCellRegistry,next:boolean){
        let cellDefinition:CrosswordCell = cellRegistry.definition,
            result;
        if(cellDefinition.acrossClue && cellDefinition.downClue){

        }else{
            //if in the cell there is only one clue
            let across = cellDefinition.acrossClue != undefined,
                //get the clue from across or down
                definition = across ? cellDefinition.acrossClue : cellDefinition.downClue,
                useClues = across ? cellDefinition.crossword.acrossClues : cellDefinition.crossword.downClues,
                alterClues = across ? cellDefinition.crossword.downClues : cellDefinition.crossword.acrossClues,
                //get the clue index
                index = useClues.findIndex((cell)=>cell.number === definition.number);
            if(index != -1){
                index+= next ? 1 : -1;
                let targetClue:CrosswordClueDefinition;
                //check if the target index is valid
                if((next && index < useClues.length) || (!next && index >= 0)){
                    targetClue = useClues[index];
                }else{
                    //otherwise, if next, get the first element from the alter list
                    //if prev, get the last element from the alter list
                    targetClue = next ? alterClues[0] : alterClues.slice(-1)[0];
                }
                result = targetClue;
            }
        }
        return result;
    },
    _goToNextWordFrom:function(cellRegistry:CrosswordCellRegistry){
        let target:CrosswordClueDefinition = this._getNextOrPrevClueFrom(cellRegistry,true),
            targetCell = target.cells[0];
        this.rowsRegistry[targetCell.y].cellsRegistry[targetCell.x].field.trigger("focus");
    },
    _goToPrevWordFrom:function(cellRegistry:CrosswordCellRegistry){
        let target:CrosswordClueDefinition = this._getNextOrPrevClueFrom(cellRegistry,false),
            targetCell = target.cells[0];
        this.rowsRegistry[targetCell.y].cellsRegistry[targetCell.x].field.trigger("focus");
    },
    _onFieldKey:function(e){
        let instance = e.data.instance;
        if(!instance.disabled){
            let $target = $(this),
                $cell = $target.parents("."+instance.options.classes.cell).first();
            let x = $cell.data("x"),
                y = $cell.data("y"),
                cell = instance.rowsRegistry[y].cellsRegistry[x];
            switch(e.which){
                case $.ui.keyCode.ENTER:
                case $.ui.keyCode.TAB:
                    e.preventDefault();
                    if(!e.shiftKey){
                        instance._goToNextWordFrom(cell);
                    }else{
                        instance._goToPrevWordFrom(cell);
                    }
                    break;
                case $.ui.keyCode.UP:

                    break;
                case $.ui.keyCode.RIGHT:

                    break;
                case $.ui.keyCode.DOWN:

                    break;
                case $.ui.keyCode.LEFT:

                    break;
                case $.ui.keyCode.BACKSPACE:

                    break;
            }
            //key tab
                //next word
            //key shift+tab
                //prev word
            //arrow left
                //if cell in left
                    //left cell
                        //if target cell hasn't the focus
                            //focus
            //arrow right
                //if cell in right
                    //right cell
                        //if target cell hasn't the focus
                            //focus
            //arrow top
                //if cell in top
                    //top cell
                        //if target cell hasn't the focus
                            //focus
            //arrow down
                //if cell in down
                    //down cell
                        //if target cell hasn't the focus
                            //focus
            //delete
                //if focused word is across
                    //cell left
                //if focused word is down
                    //cell up
        }else{
            e.preventDefault()
        }
    },
    /**
     * Create the main element for the board
     * By default is a table
     * If the option "createBoard" is provided, will be used instead
     * @returns {JQuery}
     * @private
     */
    _createBoard():JQuery{
        let result:JQuery;
        if((typeof this.options.createBoard).toLowerCase() == "function"){
            result = this.options.createBoard.apply(this,arguments);
        }else{
            result = $(`<table class="${this.options.classes.board}"></table>`);
        }
        return result;
    },
    /**
     * Create a row of the board.
     * By default is a tr
     * If the option "createRow" is provided, will be used instead.
     * The row is optional, if the function returns a null the cells will be attached to the board directly. Useful for use css grid
     * @param {number}  rowIndex    The index of the row
     * @returns {JQuery}
     * @private
     */
    _createRow(rowIndex:number):JQuery{
        let result:JQuery;
        if((typeof this.options.createRow).toLowerCase() == "function"){
            result = this.options.createRow.apply(this,arguments);
        }else{
            result = $(`<tr class="${this.options.classes.row}" data-row="${rowIndex}"></tr>`);
        }
        return result;
    },
    /**
     * Create a cell for the board
     * By default is a td
     * If the option "createCell" is provided, will be used instead
     * @param   {CrosswordCell} definition  The definition object for the cell
     * @returns {JQuery}
     * @private
     */
    _createCell(definition:CrosswordCell):JQuery{
        let result:JQuery;
        if((typeof this.options.createCell).toLowerCase() == "function"){
            result = this.options.createCell.apply(this,arguments);
        }else{
            result = $(`<td class="${this.options.classes.cell}"></td>`);
        }
        return result;
    },
    /**
     * Create a cell field for the board
     * By default is a input
     * If the option "createCellField" is provided, will be used instead
     * @param   {CrosswordCell} definition  The definition object for the cell
     * @returns {JQuery}
     * @private
     */
    _createCellField:function(definition:CrosswordCell){
        let result:JQuery;
        if((typeof this.options.createCellField).toLowerCase() == "function"){
            result = this.options.createCellField.apply(this,arguments);
        }else{
            result = $(`<input>`);
        }
        return result;
    },
    /**
     * Add info to the cell element like classes and attributes
     * @param {JQuery} cell
     * @param {CrosswordCell} cellDefinition
     * @private
     */
    _addInfoToCellElement:function(cell:JQuery,cellDefinition:CrosswordCell){
        //coordinates
        cell.attr({
            "data-x":cellDefinition.x,
            "data-y":cellDefinition.y
        });
        cell.addClass(this.options.classes.clue);
        //data for across
        if(cellDefinition.acrossClue){
            cell.addClass(this.options.classes.clue+"--"+cellDefinition.acrossClue.code);
            cell.attr("data-across",cellDefinition.acrossClue.number);
        }
        //data for down
        if(cellDefinition.downClue){
            cell.addClass(this.options.classes.clue+"--"+cellDefinition.downClue.code);
            cell.attr("data-down",cellDefinition.downClue.number);
        }
        if(cellDefinition.light){
            cell.addClass(this.options.classes.light);
            if(cellDefinition.hint){
                cell.addClass(this.options.classes.hint);
            }
        }
    },
    _createDOMForDefinition:function(){
        if(this.definition){
            let definition:CrosswordDefinition = this.definition,
                matrix:CrosswordCell[][] = definition.matrix,
                board:JQuery = this._createBoard(),
                rowsRegistry:CrosswordRowRegistry[] = [],
                cellsMap = {};
            //for each row of the matrix
            for (let rowIndex = 0, matrixLength = matrix.length; rowIndex < matrixLength; rowIndex++) {
                let definitions = matrix[rowIndex],
                    rowElement:JQuery,
                    //cells to create
                    cells = [],
                    cellsRegistry:CrosswordCellRegistry[] = [],
                    rowRegistry = new CrosswordRowRegistry();
                rowRegistry.cellsRegistry = cellsRegistry;
                //for each cell
                for (let columnIndex = 0, columnsLength = definitions.length; columnIndex < columnsLength; columnIndex++) {
                    //get the definition and create the base element
                    let cellDefinition:CrosswordCell = definitions[columnIndex],
                        //create the cell element
                        cellElement = this._createCell(cellDefinition),
                        //create the registry
                        cellRegistry:CrosswordCellRegistry = new CrosswordCellRegistry(),
                        fieldElement:JQuery;
                    cellRegistry.rowRegistry = rowRegistry;
                    //add the info to the dom
                    this._addInfoToCellElement(cellElement,cellDefinition);
                    //store definition in the cell
                    cellRegistry.definition = cellDefinition;
                    //store cell
                    cellRegistry.element = cellElement;
                    if(cellDefinition.light){
                        if(!cellDefinition.hint){
                            fieldElement = this._createCellField(cellDefinition);
                            fieldElement.addClass(this.options.classes.field);
                            cellRegistry.field = fieldElement;
                            cellElement.append(fieldElement);
                        }else{
                            cellElement.text(cellDefinition.answer);
                        }
                    }
                    cells.push(cellElement);
                    cellsRegistry[columnIndex] = cellRegistry;
                }
                rowElement = this._createRow(rowIndex);
                //rowElement is optional
                if(rowElement){
                    rowRegistry.element = rowElement;
                    rowElement.append(cells);
                    board.append(rowElement);
                }else{
                    board.append(cells);
                }
                rowsRegistry.push(rowRegistry);
            }
            this.rowsRegistry = rowsRegistry;
            this.cellsMap = cellsMap;
            this.element.append(board);
        }
    },
    _createDefinition:function(){
        let definition = this.options.definition;
        if(definition){
            if(definition instanceof CrosswordDefinition !== true){
                definition = new CrosswordDefinition(definition);
            }
            this.definition = definition;
        }
    },
    disable:function(){
        this.element.addClass(this.options.classes.disabled);
        let rowsRegistry = this.rowsRegistry;
        for (let rowIndex = 0, rowsRegistryLength = rowsRegistry.length; rowIndex < rowsRegistryLength; rowIndex++) {
            let currentRow = rowsRegistry[rowIndex],
                cellsRegistry = currentRow.cellsRegistry;
            for (let cellIndex = 0, cellsRegistryLength = cellsRegistry.length; cellIndex < cellsRegistryLength; cellIndex++) {
                let currentCell = cellsRegistry[cellIndex];
                currentCell.element.prop("disabled",true);
                currentCell.element.addClass(this.options.classes.disabled);
            }

        }
    },
    enable:function(){
        this.element.removeClass(this.options.classes.disabled);
        let rowsRegistry = this.rowsRegistry;
        for (let rowIndex = 0, rowsRegistryLength = rowsRegistry.length; rowIndex < rowsRegistryLength; rowIndex++) {
            let currentRow = rowsRegistry[rowIndex],
                cellsRegistry = currentRow.cellsRegistry;
            for (let cellIndex = 0, cellsRegistryLength = cellsRegistry.length; cellIndex < cellsRegistryLength; cellIndex++) {
                let currentCell = cellsRegistry[cellIndex];
                currentCell.element.prop("disabled",false);
                currentCell.element.removeClass(this.options.classes.disabled);
            }

        }
    }
});