import {CrosswordDefinition,CrosswordCell,CrosswordClueDefinition} from "crossword-definition";

/**
 * Parameters for the plugin
 */
export interface JqCrosswordOptions {
    /**
     * Definition to use
     */
    definition: CrosswordDefinition;
    /**
     * Css classes to use
     */
    classes?: {//css classes for elements
        /**
         * Root element
         * @default "c-crossword"
         */
        root?: string;
        /**
         * Class for the board
         * @default "c-crossword__board"
         */
        board?: string;
        /**
         * Class for each row
         * @default "c-crossword__row"
         */
        row?: string;
        /**
         * Class for each cell
         * @default "c-crossword__cell"
         */
        cell?: string;
        /**
         * Class for cells with clue
         * @default "c-crossword__clue"
         */
        clue?: string;
        /**
         * Class for cells with content or field
         * @default "c-crossword__clue--light"
         */
        light?: string;
        /**
         * Class for cells that are hints
         * @default "c-crossword__clue--hint"
         */
        hint?: string;
        /**
         * Class for cells fields
         * @default "c-crossword__clue__field"
         */
        field?: string;
        /**
         * Class for the list items
         */
        listItem?: string;
    },
    /**
     * Title ofr the down list
     */
    downListTitle?: string;
    /**
     * Title for the across list
     */
    acrossListTitle?: string;

    /**
     * Override the default creation of the board
     * @returns {JQuery}
     */
    createBoard?(): JQuery;

    /**
     * Override the default creation of the row
     * @param {number} rowIndex
     * @returns {JQuery}
     */
    createRow?(rowIndex: number): JQuery;

    /**
     * Override the default creation of the cell
     * @param {CrosswordCell} definition
     * @returns {JQuery}
     */
    createCell?(definition: CrosswordCell): JQuery;

    /**
     * Override the default creation of the field of a cell
     * @param {} definition
     */
    createCellField?(definition: CrosswordCell):JQuery;
    /**
     * Override the default creation of clues list
     * @param {boolean} across
     * @returns {JQuery}
     */
    createCluesListContainer?(across: boolean): JQuery;

    /**
     * Override the default creation of a list of clues
     * @param {boolean} across
     * @returns {JQuery}
     */
    createCluesList?(across: boolean):JQuery;

    /**
     * Override the default creation of a clues list item
     * @param {CrosswordClueDefinition} definition
     * @returns {JQuery}
     */
    createCluesListItem?(definition: CrosswordClueDefinition):JQuery;

}
/**
 * Represents a cell
 */
class CrosswordCellRegistry{
    /**
     * Cell definition
     */
    definition:CrosswordCell;
    /**
     * Cell field
     */
    field:JQuery;
    /**
     * Cell element
     */
    element:JQuery;
    /**
     * Row registry to which the cell belongs
     */
    rowRegistry:CrosswordRowRegistry;
    /**
     * The user answer is correct
     */
    isCorrect?:boolean;
}

/**
 * Represents a clue
 */
class CrosswordClueRegistry{
    /**
     * Clue definition
     */
    definition:CrosswordClueDefinition;
    /**
     * The jquery elements of the cells with letters of the clue. Is an js array not a Jquery object
     * @type {any[]}
     */
    cellsElements:JQuery[]=[];
    /**
     * The jquery elements of the fields for cells of the clue. Is an js array not a Jquery object
     * @type {any[]}
     */
    fieldsElements:JQuery[]=[];
    /**
     * Cell registries that belongs to the clue
     * @type {any[]}
     */
    cellsRegistries:CrosswordCellRegistry[]=[];
    /**
     * The user answer is correct
     */
    isCorrect:boolean;
    /**
     * The jquery element with the clue in the list
     */
    listItem:JQuery;
    protected _$cells;
    protected _$fields;

    /**
     * Get the cells as jquery element
     * @returns {any}
     */
    get cellsAsJquery(){
        if(!this._$cells){
            this._$cells = $($.map(this.cellsElements,(val)=>val.get(0)));
        }
        return this._$cells
    }

    /**
     * Get the fields as a jquery element
     * @returns {any}
     */
    getFieldsAsJquery(){
        if(!this._$fields){
            this._$fields = $($.map(this.fieldsElements,(val)=>val.get(0)));
        }
        return this._$fields
    }
}

/**
 * Represents a row of the board
 */
class CrosswordRowRegistry{
    /**
     * Row element
     */
    element:JQuery;
    /**
     * Cells in the row
     */
    cellsRegistry:CrosswordCellRegistry[];
}
$.widget("ui.crossword",{
    NAMESPACE: "jq-crossword",
    options: {
        classes: {//css classes for elements
            root:"c-crossword",
            board:"c-crossword__board",
            row:"c-crossword__row",
            cell:"c-crossword__cell",
            cellActive:"c-crossword__cell--active",
            clue:"c-crossword__clue",
            clueActive:"c-crossword__clue--active",
            light:"c-crossword__clue--light",
            hint:"c-crossword__clue--hint",
            field:"c-crossword__clue__field",
            firstLetter:"c-crossword__cell--first-letter",
            firstLetterAcross:"c-crossword__cell--first-letter-across",
            firstLetterDown:"c-crossword__cell--first-letter-down",
            listItem:"c-crossword__list-item",
            cluesListContainer:"c-crossword__clues",
            cluesListTitle:"c-crossword__clues__title",
            clueList:"c-crossword__clues__list",
        },
        downListTitle:"Down clues",
        acrossListTitle:"Across clues"
    },
    /**
     * @constructor
     * @private
     */
    _create() {
        this.element.addClass(this.options.classes.root);
        this._createDefinition();
        this.cluesRegistry = this._createClueRegistry();
        this._createDOMForDefinition();
        this._createCluesLists();
        this._addEvents();
        //use or create model
        //create markup from model
        //assign events
    },
    _addEvents(){
        this.element.on(`focus.${this.NAMESPACE}`,"."+this.options.classes.field,{instance:this},this._onFieldFocus);
        this.element.on(`blur.${this.NAMESPACE}`,"."+this.options.classes.field,{instance:this},this._onFieldBlur);
        this.element.on(`input.${this.NAMESPACE}`,"."+this.options.classes.field,{instance:this},this._onFieldChange);
        this.element.on(`keydown.${this.NAMESPACE}`,"."+this.options.classes.field,{instance:this},this._onFieldKey);
        this.element.on(`click.${this.NAMESPACE}`,"."+this.options.classes.listItem,{instance:this},this._onListItemClick);
    },
    _onListItemClick(e){
        let instance = e.data.instance;
        if(!instance.disabled) {
            instance.interaction = true;
            let $target = $(this),
                downCode = $target.data("down"),
                acrossCode = $target.data("across"),
                registry;
            if(downCode){
                registry = instance.cluesRegistry[downCode].cellsRegistries[0];
            }else{
                registry = instance.cluesRegistry[acrossCode].cellsRegistries[0];
            }
            instance._goToCell(registry);
            instance.interaction = false;
        }else{
            e.preventDefault();
        }
    },
    /**
     * Get the definition for a clue based on the position of the letter.
     * If the cell has across and down definitions, returns the definition for which the cell is closest to the first letter
     * If the cell has only one definition, returns that definition
     * @param {} cell
     * @returns {any}
     * @private
     */
    _getDefinitionForClosestToFirstLetter(cell:CrosswordCell){
        let result;
        //if there are two clues
        if(cell.acrossClue && cell.downClue){
            //get the clue for which the cell is closest to the first letter
            if(cell.acrossClueLetterIndex <= cell.downClueLetterIndex){
                result = cell.acrossClue;
            }else{
                result = cell.downClue;
            }
        }else{
            result = cell.acrossClue || cell.downClue;
        }
        return result;
    },
    /**
     * Invoked when a field receives focus. Goes to the cell
     * @param e
     * @private
     */
    _onFieldFocus(e){
        let instance = e.data.instance;
        if(!instance.disabled) {
            instance.interaction = true;
            let $target = $(this),
                $cell = $target.parents("." + instance.options.classes.cell).first();
            let x = $cell.data("x"),
                y = $cell.data("y");
            instance._goToCell(y,x);
            instance.interaction = false;
        }else{
            e.preventDefault();
        }
    },
    /**
     * Invoked when a field lose focus.
     * @param e
     * @private
     */
    _onFieldBlur(e){
        let instance = e.data.instance;
        if(!instance.interaction){
            instance._clearActivate();
        }
    },
    /**
     * Move the cursor to a cell. Also activates the related clue.
     * If the cell has one clue, the focus will be to the active clue or to the clue related to the cell
     * If the cell has two clues, the focus will be to the clue for which the cell is the first letter.
     * If none of the cells are the first letter, the focus will go to the current clue, or, if there isn't a current
     * clue, the focus will go to the clue for which the cell is closest to the first letter
     * @param yOrCell   Could be a number or a CrosswordCellRegistry.
     * @param x         The x position of the cell. Required if yOrCell is a number
     * @private
     */
    _goToCell(yOrCell,x){
        let cell:CrosswordCellRegistry = (typeof yOrCell).toLowerCase() == "number" ? this.rowsRegistry[yOrCell].cellsRegistry[x] : yOrCell,
            cellDefinition:CrosswordCell = cell.definition,
            definition;
        //if is not the active one
        if(cell != this.cellsRegistry) {
            //if cell has across and down clues
            if (cellDefinition.acrossClue && cellDefinition.downClue) {
                //activate the clue for which the cell is the first letter
                if (cellDefinition.acrossClueLetterIndex == 0) {
                    definition = cellDefinition.acrossClue;
                } else if (cellDefinition.downClueLetterIndex == 0) {
                    definition = cellDefinition.downClue
                }
            }
            //if the current definition is the same of the across or down, continue with the same definition
            if (this.registryActive) {
                this.registryCellActive.element.removeClass(this.options.classes.cellActive);
                if (this.registryActive.definition == cellDefinition.acrossClue) {
                    definition = cellDefinition.acrossClue;
                } else if (this.registryActive.definition == cellDefinition.downClue) {
                    definition = cellDefinition.downClue
                } else {
                    definition = this._getDefinitionForClosestToFirstLetter(cell.definition);
                }
            } else {
                definition = this._getDefinitionForClosestToFirstLetter(cell.definition);
            }
            this.registryCellActive = cell;
            cell.element.addClass(this.options.classes.cellActive);
            this._activateClue(definition);
            if(!cell.field.is(":focus")){
                cell.field.trigger("focus");
            }
        }
    },
    /**
     * Invoked when the field changes. Moves the focus to the next cell
     * @param e
     * @private
     */
    _onFieldChange(e){
        let instance = e.data.instance;
        if(!instance.disabled){
            instance.interaction = true;
            //if the cell has a value
            if(!!e.target.value) {
                //go to the next cell
                //check if there is an active registry
                if (!instance.registryActive) {
                    let $target = $(this),
                        $cell = $target.parents("." + instance.options.classes.cell).first();
                    let x = $cell.data("x"),
                        y = $cell.data("y");
                    instance._goToCell(y, x);
                }
                if (instance.registryActive.definition.across) {
                    instance._goToCellRight();
                } else {
                    instance._goToCellBelow();
                }
            }
            instance.interaction = false;
        }else{
            e.preventDefault()
        }
    },
    _clearActivate(){
        if(this.registryActive){
            this.registryActive = null;
            this.element.find("."+this.options.classes.clueActive).removeClass(this.options.classes.clueActive);
            this.registryCellActive.element.removeClass(this.options.classes.cellActive);
            this.registryCellActive = null;
        }
    },
    /**
     * Activate a clue. Store the activated clue in registryActive
     * @param {CrosswordClueDefinition} clue    Registry of the clue to activate
     * @private
     */
    _activateClue(clue:CrosswordClueDefinition){
        let registry:CrosswordClueRegistry = this.cluesRegistry[clue.code];
        if(registry && registry != this.registryActive){
            this.registryActive = registry;
            this.element.find("."+this.options.classes.clueActive).removeClass(this.options.classes.clueActive);
            registry.cellsAsJquery.addClass(this.options.classes.clueActive);
            registry.listItem.addClass(this.options.classes.clueActive);
        }
    },
    /**
     * Get the next or prev clue related to a registry
     * @param {CrosswordCellRegistry} cellRegistry
     * @param {boolean} next    If true, will look for the next clue, otherwise will look for the prev clue
     * @returns {any}
     * @private
     */
    _getNextOrPrevClueFrom(cellRegistry:CrosswordCellRegistry,next:boolean){
        let cellDefinition:CrosswordCell = cellRegistry.definition,
            result,
            across,
            definition,
            useClues,
            alterClues,
            index;
        if(cellDefinition.acrossClue && cellDefinition.downClue){
            let closestDefinition:CrosswordClueDefinition = this._getDefinitionForClosestToFirstLetter(cellRegistry.definition);
            across = closestDefinition.across;
            definition = closestDefinition;
            //look for which one the letter is the first
        }else{
            //if in the cell there is only one clue
            across = cellDefinition.acrossClue != undefined;
            //get the clue from across or down
            definition = across ? cellDefinition.acrossClue : cellDefinition.downClue;
        }
        useClues = across ? cellDefinition.crossword.acrossClues : cellDefinition.crossword.downClues;
        alterClues = across ? cellDefinition.crossword.downClues : cellDefinition.crossword.acrossClues;
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
        return result;
    },
    _goToNextWordFrom(cellRegistry:CrosswordCellRegistry){
        let target:CrosswordClueDefinition = this._getNextOrPrevClueFrom(cellRegistry,true);
        this.cluesRegistry[target.code].fieldsElements[0].trigger("focus");
    },
    _goToPrevWordFrom(cellRegistry:CrosswordCellRegistry){
        let target:CrosswordClueDefinition = this._getNextOrPrevClueFrom(cellRegistry,false);
        this.cluesRegistry[target.code].fieldsElements[0].trigger("focus");
    },
    /**
     * Get the cell registry related to an other registry
     * @param {CrosswordCellRegistry} cell  Registry related
     * @param {boolean} vertical            If true, will search in vertical. Otherwise in horizontal
     * @param {boolean} increase            If true, will search by increment. Otherwise by decrease
     * @returns {CrosswordCellRegistry}
     * @private
     * @example _getCellFor(someCell,true,false);//will look in vertical by decrease, the result is the cell above the registry passed to the function
     */
    _getCellFor(cell:CrosswordCellRegistry,vertical:boolean,increase:boolean){
        let result:CrosswordCellRegistry,
            definition = cell.definition,
            x= definition.x,
            y= definition.y,
            yTarget = vertical ? (increase ? y+1 : y-1): y,
            xTarget = vertical ? x : (increase ? x+1 : x-1),
            targetRow:CrosswordRowRegistry = this.rowsRegistry[yTarget];
        //if row exists
        if(targetRow){
            let targetCell:CrosswordCellRegistry = targetRow.cellsRegistry[xTarget];
            //check if is light
            if(targetCell.definition.light){
                //if is a hint, look for the next available
                if(targetCell.definition.hint){
                    result = this._getCellFor(targetCell,vertical,increase);
                }else{
                    result = targetCell;
                }
            }
        }
        return result;
    },
    _goToCellAbove(){
        if(this.registryCellActive){
            let target:CrosswordCellRegistry = this._getCellFor(this.registryCellActive,true,false);
            if(target){
                this._goToCell(target);
            }
        }
    },
    _goToCellBelow(){
        if(this.registryCellActive){
            let target:CrosswordCellRegistry = this._getCellFor(this.registryCellActive,true,true);
            if(target){
                this._goToCell(target);
            }
        }
    },
    _goToCellRight(){
        if(this.registryCellActive){
            let target:CrosswordCellRegistry = this._getCellFor(this.registryCellActive,false,true);
            if(target){
                this._goToCell(target);
            }
        }
    },
    _goToCellLeft(){
        if(this.registryCellActive){
            let target:CrosswordCellRegistry = this._getCellFor(this.registryCellActive,false,false);
            if(target){
                this._goToCell(target);
            }
        }
    },
    _onFieldKey(e){
        let instance = e.data.instance;
        if(!instance.disabled){
            instance.interaction = true;
            let $target = $(this),
                $cell = $target.parents("."+instance.options.classes.cell).first();
            let x = $cell.data("x"),
                y = $cell.data("y"),
                cell = instance.rowsRegistry[y].cellsRegistry[x];
            switch(e.which){
                case $.ui.keyCode.SPACE:
                    e.preventDefault();
                    break;
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
                    instance._goToCellAbove();
                    break;
                case $.ui.keyCode.RIGHT:
                    instance._goToCellRight();
                    break;
                case $.ui.keyCode.DOWN:
                    instance._goToCellBelow();
                    break;
                case $.ui.keyCode.LEFT:
                    instance._goToCellLeft();
                    break;
                case $.ui.keyCode.BACKSPACE:
                    e.preventDefault();
                    cell.field.val("");
                    if(instance.registryActive.definition.across){
                        instance._goToCellLeft();
                    }else{
                        instance._goToCellAbove();
                    }
                    break;
                default:
                    //if the key is a letter or a valid character
                    if(e.key.length == 1){
                        e.preventDefault();
                        cell.field.val(e.key).trigger("input");
                    }
                    break;
            }
            instance.interaction = false;
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
    _createCellField(definition:CrosswordCell):JQuery{
        let result:JQuery;
        if((typeof this.options.createCellField).toLowerCase() == "function"){
            result = this.options.createCellField.apply(this,arguments);
        }else{
            result = $(`<input maxlength="1" tabindex="-1">`);
        }
        return result;
    },
    /**
     * Create the container of a list of clues.
     * If the option "createCluesListContainer" is provided, will be used instead
     * @param {boolean} across
     * @returns {JQuery}
     * @private
     */
    _createCluesListContainer(across:boolean):JQuery{
        let result:JQuery;
        if((typeof this.options.createCluesListContainer).toLowerCase() == "function"){
            result = this.options.createCluesListContainer.apply(this,arguments);
        }else{
            result = $(`
                <div class="${this.options.classes.cluesListContainer}">
                    <p class="${this.options.classes.cluesListTitle}">${across?this.options.acrossListTitle:this.options.downListTitle}</p>
                </div>
            `);
        }
        return result;
    },
    /**
     * Create a list of clues
     * If the option "createCluesList" is provided, will be used instead
     * @param {boolean} across
     * @returns {JQuery}
     * @private
     */
    _createCluesList(across:boolean):JQuery{
        let result:JQuery;
        if((typeof this.options.createCluesList).toLowerCase() == "function"){
            result = this.options.createCluesList.apply(this,arguments);
        }else{
            result = $(`<ul class="${this.options.classes.clueList}"></ul>`);
        }
        return result;
    },
    /**
     * Create a clue list item.
     * If the option "createCluesListContainer" is provided, will be used instead
     * @param {CrosswordClueDefinition} definition  Definition
     * @returns {JQuery}
     * @private
     */
    _createCluesListItem(definition:CrosswordClueDefinition):JQuery{
        let result:JQuery;
        if((typeof this.options.createCluesListItem).toLowerCase() == "function"){
            result = this.options.createCluesListItem.apply(this,arguments);
        }else{
            result = $(`<li></li>`);
        }
        return result;
    },
    _createCluesLists():JQuery{
        let across = this.definition.acrossClues,
            down = this.definition.downClues;
        this.acrossCluesContainer = this._createCluesListContainer(true);
        this.acrossCluesList = this._createCluesList(true);
        for(let clue of across){
            const $clue = this._createCluesListItem(clue);
            this._addInfoToListElement($clue,clue);
            this.acrossCluesList.append($clue);
            this.cluesRegistry[clue.code].listItem = $clue;
        }

        this.downCluesContainer = this._createCluesListContainer(false);
        this.downCluesList = this._createCluesList(false);
        for(let clue of down){
            const $clue = this._createCluesListItem(clue);
            this._addInfoToListElement($clue,clue);
            this.downCluesList.append($clue);
            this.cluesRegistry[clue.code].listItem = $clue;
        }
        if(this.acrossCluesContainer){
            this.acrossCluesContainer.append(this.acrossCluesList);
        }
        if(this.options.acrossAppendTo){
            if(this.acrossCluesContainer){
                $(this.options.downAppendTo).append(this.acrossCluesContainer);
            }else{
                $(this.options.downAppendTo).append(this.acrossCluesList);
            }
        }else{
            this.element.append(this.acrossCluesContainer);
        }

        if(this.downCluesContainer){
            this.downCluesContainer.append(this.downCluesList);
        }
        if(this.options.downAppendTo){
            if(this.downCluesContainer){
                $(this.options.downAppendTo).append(this.downCluesContainer);
            }else{
                $(this.options.downAppendTo).append(this.downCluesList);
            }
        }else{
            this.element.append(this.downCluesContainer);
        }
    },
    /**
     * Add info to the list element like classes and attributes
     * @param {JQuery} list
     * @param {CrosswordCell} clueDefinition
     * @private
     */
    _addInfoToListElement(listItem:JQuery,clueDefinition:CrosswordCell){
        listItem.addClass(this.options.classes.listItem);
        //data for across
        if(clueDefinition.across){
            listItem.addClass(this.options.classes.clue+"--"+clueDefinition.code);
            listItem.attr("data-across",clueDefinition.code);
        }else{
            listItem.addClass(this.options.classes.clue+"--"+clueDefinition.code);
            listItem.attr("data-down",clueDefinition.code);
        }
        listItem.text(clueDefinition.clue);
    },
    /**
     * Add info to the cell element like classes and attributes
     * @param {JQuery} cell
     * @param {CrosswordCell} cellDefinition
     * @private
     */
    _addInfoToCellElement(cell:JQuery,cellDefinition:CrosswordCell){
        //coordinates
        cell.attr({
            "data-x":cellDefinition.x,
            "data-y":cellDefinition.y
        });
        //has clue
        if(cellDefinition.acrossClue || cellDefinition.downClue){
            cell.addClass(this.options.classes.clue);
        }
        //is first letter
        if(cellDefinition.clueLabel){
            cell.addClass(this.options.classes.firstLetter);
            if(cellDefinition.acrossClueLetterIndex == 0){
                cell.addClass(this.options.classes.firstLetterAcross);
            }
            if(cellDefinition.downClueLetterIndex == 0){
                cell.addClass(this.options.classes.firstLetterDown);
            }
        }
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
        //is light
        if(cellDefinition.light){
            cell.addClass(this.options.classes.light);
            if(cellDefinition.hint){
                cell.addClass(this.options.classes.hint);
            }
        }
    },
    _createClueRegistry(){
        let crosswordClueRegistry:{[key:number]:CrosswordClueRegistry} = {},
            definition:CrosswordDefinition = this.definition,
            clues = definition.acrossClues.concat(definition.downClues);
        for (let clueIndex = 0, cluesLength = clues.length; clueIndex < cluesLength; clueIndex++) {
            let currentClue = clues[clueIndex],
                registry = new CrosswordClueRegistry();
            registry.definition = currentClue;
            crosswordClueRegistry[currentClue.code]=registry;
        }
        return crosswordClueRegistry;
    },
    _createDOMForDefinition(){
        if(this.definition){
            let definition:CrosswordDefinition = this.definition,
                matrix:CrosswordCell[][] = definition.matrix,
                board:JQuery = this._createBoard(),
                rowsRegistry:CrosswordRowRegistry[] = [],
                cellsMap = {},
                crosswordClueRegistry:{[key:string]:CrosswordClueRegistry} = this.cluesRegistry;
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
                    if(cellDefinition.acrossClue){
                        let registry = crosswordClueRegistry[cellDefinition.acrossClue.code];
                        registry.cellsElements.push(cellElement);
                        registry.fieldsElements.push(fieldElement);
                        registry.cellsRegistries.push(cellRegistry);
                    }
                    if(cellDefinition.downClue){
                        let registry = crosswordClueRegistry[cellDefinition.downClue.code];
                        registry.cellsElements.push(cellElement);
                        registry.fieldsElements.push(fieldElement);
                        registry.cellsRegistries.push(cellRegistry);
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
    _createDefinition(){
        let definition = this.options.definition;
        if(definition){
            if(definition instanceof CrosswordDefinition !== true){
                definition = new CrosswordDefinition(definition);
            }
            this.definition = definition;
        }
    },
    disable(){
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
    enable(){
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