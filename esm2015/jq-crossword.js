(function(){
    var _8a11 = {};
    _8a11.f = {}
    // cached modules
    _8a11.m = {};
    _8a11.r = function(id) {
        var cached = _8a11.m[id];
        // resolve if in cache
        if (cached) {
            return cached.m.exports;
        }
        var file = _8a11.f[id];
        if (!file)
            return;
        cached = _8a11.m[id] = {};
        cached.exports = {};
        cached.m = { exports: cached.exports };
        file(cached.m, cached.exports);
        return cached.m.exports;
    };
// default/index.js
_8a11.f[0] = function(module,exports){
function __export(m) {
    for (var p in m)
        if (!exports.hasOwnProperty(p))
            exports[p] = m[p];
}
Object.defineProperty(exports, '__esModule', { value: true });
__export(_8a11.r(1));
__export(_8a11.r(2));
__export(_8a11.r(3));
__export(_8a11.r(4));
__export(_8a11.r(5));
__export(_8a11.r(6));
__export(_8a11.r(7));
}
// default/crossword-options.js
_8a11.f[1] = function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
var CrosswordFeedback;
(function (CrosswordFeedback) {
    CrosswordFeedback['clue'] = 'clue';
}(CrosswordFeedback = exports.CrosswordFeedback || (exports.CrosswordFeedback = {})));
}
// default/crossword-events.js
_8a11.f[2] = function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
var CrosswordEvents;
(function (CrosswordEvents) {
    CrosswordEvents['onClueCompleted'] = 'crossword:clue';
    CrosswordEvents['onSolved'] = 'crossword:solved';
}(CrosswordEvents = exports.CrosswordEvents || (exports.CrosswordEvents = {})));
}
// default/crossword-cell-registry.js
_8a11.f[3] = function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
class CrosswordCellRegistry {
}
exports.CrosswordCellRegistry = CrosswordCellRegistry;
}
// default/crossword-clue-registry.js
_8a11.f[4] = function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
class CrosswordClueRegistry {
    constructor() {
        this.cellsElements = [];
        this.fieldsElements = [];
        this.cellsRegistries = [];
        this.currentAnswer = [];
        this.isCompleted = false;
    }
    get cellsAsJquery() {
        if (!this._$cells) {
            this._$cells = $($.map(this.cellsElements, val => val.get(0)));
        }
        return this._$cells;
    }
    get fieldsAsJquery() {
        if (!this._$fields) {
            this._$fields = $($.map(this.fieldsElements, val => val.get(0)));
        }
        return this._$fields;
    }
}
exports.CrosswordClueRegistry = CrosswordClueRegistry;
}
// default/crossword-row-registry.js
_8a11.f[5] = function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
class CrosswordRowRegistry {
}
exports.CrosswordRowRegistry = CrosswordRowRegistry;
}
// default/crossword-game.js
_8a11.f[6] = function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
const crossword_definition_1 = _8a11.r('crossword-definition');
const crossword_options_1 = _8a11.r(1);
const crossword_clue_registry_1 = _8a11.r(4);
const crossword_cell_registry_1 = _8a11.r(3);
const crossword_row_registry_1 = _8a11.r(5);
const crossword_events_1 = _8a11.r(2);
class CrosswordGame {
    constructor() {
        this.cluesRegistry = {};
    }
    disable() {
        this._super();
        this.element.addClass(this.options.classes.disabled);
        const cluesRegistry = this.cluesRegistry;
        for (let clueCode in cluesRegistry) {
            const clueRegistry = cluesRegistry[clueCode];
            clueRegistry.fieldsAsJquery.prop('disabled', true);
        }
    }
    enable() {
        this._super();
        this.element.removeClass(this.options.classes.disabled);
        const cluesRegistry = this.cluesRegistry;
        for (let clueCode in cluesRegistry) {
            const clueRegistry = cluesRegistry[clueCode];
            clueRegistry.fieldsAsJquery.prop('disabled', false);
        }
    }
    goToCell(yOrCell, x) {
        let cell, cellDefinition, definition;
        if ((typeof yOrCell).toLowerCase() == 'number') {
            let rowRegistry = this.rowsRegistry[yOrCell];
            if (rowRegistry) {
                cell = rowRegistry.cellsRegistry[x];
                cellDefinition = cell.definition;
            }
        } else {
            cell = yOrCell;
            cellDefinition = cell.definition;
        }
        if (cell && cellDefinition.light && cell != this.registryCellActive) {
            if (cellDefinition.acrossClue && cellDefinition.downClue) {
                if (cellDefinition.acrossClueLetterIndex == 0) {
                    definition = cellDefinition.acrossClue;
                } else if (cellDefinition.downClueLetterIndex == 0) {
                    definition = cellDefinition.downClue;
                }
            }
            if (this.registryActive) {
                this.registryCellActive.element.removeClass(this.options.classes.cellActive);
                if (this.registryActive.definition == cellDefinition.acrossClue) {
                    definition = cellDefinition.acrossClue;
                } else if (this.registryActive.definition == cellDefinition.downClue) {
                    definition = cellDefinition.downClue;
                } else {
                    definition = this._getDefinitionForClosestToFirstLetter(cell.definition);
                }
            } else {
                definition = this._getDefinitionForClosestToFirstLetter(cell.definition);
            }
            this.registryCellActive = cell;
            cell.element.addClass(this.options.classes.cellActive);
            this._activateClue(definition);
            if (!cell.field.is(':focus')) {
                cell.field.trigger('focus');
            }
        }
        return cell;
    }
    clearActive() {
        if (this.registryActive) {
            this.registryActive = null;
            this.element.find('.' + this.options.classes.clueActive).removeClass(this.options.classes.clueActive);
            this.registryCellActive.element.removeClass(this.options.classes.cellActive);
            this.registryCellActive = null;
        }
    }
    goToCellAbove() {
        if (this.registryCellActive) {
            let target = this._getCellFor(this.registryCellActive, true, false);
            if (target) {
                this.goToCell(target);
            }
        }
    }
    goToCellBelow() {
        if (this.registryCellActive) {
            let target = this._getCellFor(this.registryCellActive, true, true);
            if (target) {
                this.goToCell(target);
            }
        }
    }
    goToCellRight() {
        if (this.registryCellActive) {
            let target = this._getCellFor(this.registryCellActive, false, true);
            if (target) {
                this.goToCell(target);
            }
        }
    }
    goToCellLeft() {
        if (this.registryCellActive) {
            let target = this._getCellFor(this.registryCellActive, false, false);
            if (target) {
                this.goToCell(target);
            }
        }
    }
    goToNextWord() {
        if (this.registryCellActive) {
            let target = this._getNextOrPrevClueFrom(this.registryCellActive, true);
            this.cluesRegistry[target.code].fieldsElements[0].trigger('focus');
        }
    }
    goToPrevWord() {
        if (this.registryCellActive) {
            let target = this._getNextOrPrevClueFrom(this.registryCellActive, false);
            this.cluesRegistry[target.code].fieldsElements[0].trigger('focus');
        }
    }
    checkClue(clueRegistry) {
        let result;
        clueRegistry = clueRegistry || this.registryActive;
        if (clueRegistry) {
            const prevCompleted = clueRegistry.isCompleted;
            clueRegistry.isCompleted = clueRegistry.currentAnswer.join('').length === clueRegistry.definition.answer.length;
            if (clueRegistry.isCompleted) {
                let correct = 0;
                const cellRegistries = clueRegistry.cellsRegistries;
                for (let registry of cellRegistries) {
                    if (this._checkCellAnswer(registry)) {
                        correct++;
                    } else {
                    }
                }
                clueRegistry.isCorrect = correct == cellRegistries.length;
                this.updateClueStateClass(clueRegistry);
                result = clueRegistry.isCorrect;
            } else {
                clueRegistry.isCorrect = false;
                this.updateClueStateClass(clueRegistry);
            }
            if (prevCompleted != clueRegistry.isCompleted) {
                this.element.trigger(crossword_events_1.CrosswordEvents.onClueCompleted, [{
                        instance: this,
                        isCorrect: clueRegistry.isCorrect,
                        isCompleted: false,
                        definition: clueRegistry.definition
                    }]);
            }
        }
        return result;
    }
    check() {
        const cluesRegistry = this.cluesRegistry;
        let correct = 0;
        for (let clueCode in cluesRegistry) {
            const clueRegistry = cluesRegistry[clueCode];
            if (!clueRegistry.isCorrect) {
                break;
            }
            correct++;
        }
        if (correct == Object.keys(cluesRegistry).length) {
            this.element.trigger(crossword_events_1.CrosswordEvents.onSolved, [this]);
        }
    }
    solve() {
        const cluesRegistry = this.cluesRegistry;
        for (let clueCode in cluesRegistry) {
            const clueRegistry = cluesRegistry[clueCode], cellsRegistries = clueRegistry.cellsRegistries;
            for (let cellRegistry of cellsRegistries) {
                cellRegistry.field.val(cellRegistry.definition.answer);
            }
        }
        this.element.trigger(crossword_events_1.CrosswordEvents.onSolved, [this]);
    }
    _getCreateOptions() {
        let options = {
            namespace: 'jq-crossword',
            classes: {
                root: 'c-crossword',
                board: 'c-crossword__board',
                row: 'c-crossword__row',
                cell: 'c-crossword__cell',
                cellActive: 'c-crossword__cell--active',
                cellCorrect: 'c-crossword__cell--correct',
                cellIncorrect: 'c-crossword__cell--incorrect',
                clue: 'c-crossword__clue',
                clueActive: 'c-crossword__clue--active',
                clueCorrect: 'c-crossword__clue--correct',
                clueIncorrect: 'c-crossword__clue--incorrect',
                light: 'c-crossword__clue--light',
                hint: 'c-crossword__clue--hint',
                field: 'c-crossword__clue__field',
                firstLetter: 'c-crossword__cell--first-letter',
                firstLetterAcross: 'c-crossword__cell--first-letter-across',
                firstLetterDown: 'c-crossword__cell--first-letter-down',
                listItem: 'c-crossword__list-item',
                cluesListContainer: 'c-crossword__clues',
                cluesListTitle: 'c-crossword__clues__title',
                clueList: 'c-crossword__clues__list',
                disabled: 'c-crossword--disabled'
            },
            downListTitle: 'Down clues',
            acrossListTitle: 'Across clues',
            ignoreCase: true,
            feedback: crossword_options_1.CrosswordFeedback.clue
        };
        return options;
    }
    _checkCellAnswer(cellRegistry) {
        if (cellRegistry.field.val()) {
            if (this.options.ignoreCase) {
                cellRegistry.isCorrect = new RegExp(cellRegistry.definition.answer, 'i').test(cellRegistry.currentAnswer);
            } else {
                cellRegistry.isCorrect = cellRegistry.currentAnswer == cellRegistry.definition.answer;
            }
        }
        return cellRegistry.isCorrect;
    }
    _create() {
        this.element.addClass(this.options.classes.root);
        this._createDefinition();
        this.cluesRegistry = this._createClueRegistry();
        this._construct();
        this._createCluesLists();
        this._addEvents();
    }
    _addEvents() {
        this.element.on(`focus.${ this.options.namespace }`, '.' + this.options.classes.field, this._onFieldFocus.bind(this));
        this.element.on(`blur.${ this.options.namespace }`, '.' + this.options.classes.field, this._onFieldBlur.bind(this));
        this.element.on(`input.${ this.options.namespace }`, '.' + this.options.classes.field, this._onFieldChange.bind(this));
        this.element.on(`keydown.${ this.options.namespace }`, '.' + this.options.classes.field, this._onFieldKey.bind(this));
        this.element.on(`click.${ this.options.namespace }`, '.' + this.options.classes.listItem, this._onListItemClick.bind(this));
    }
    updateClueStateClass(clueRegistry) {
        if (clueRegistry.isCompleted) {
            let clueClassToAdd = clueRegistry.isCorrect ? this.options.classes.clueCorrect : this.options.classes.clueIncorrect, clueClassToRemove = !clueRegistry.isCorrect ? this.options.classes.clueCorrect : this.options.classes.clueIncorrect;
            clueRegistry.listItem.removeClass(clueClassToRemove).addClass(clueClassToAdd);
            clueRegistry.cellsAsJquery.removeClass(clueClassToRemove).addClass(clueClassToAdd);
        } else {
            const cellsRegistries = clueRegistry.cellsRegistries;
            for (let cellRegistry of cellsRegistries) {
                if (!cellRegistry.acrossClueRegistry || !cellRegistry.downClueRegistry || !cellRegistry.acrossClueRegistry.isCompleted && !cellRegistry.downClueRegistry.isCompleted) {
                    cellRegistry.element.removeClass([
                        this.options.classes.clueCorrect,
                        this.options.classes.clueIncorrect
                    ]);
                }
            }
            clueRegistry.listItem.removeClass([
                this.options.classes.clueCorrect,
                this.options.classes.clueIncorrect
            ]);
        }
    }
    _onListItemClick(e) {
        if (!this.options.disabled) {
            this.interaction = true;
            let $target = $(e.target), downCode = $target.data('down'), acrossCode = $target.data('across'), registry;
            if (downCode) {
                registry = this.cluesRegistry[downCode].cellsRegistries[0];
            } else {
                registry = this.cluesRegistry[acrossCode].cellsRegistries[0];
            }
            this.goToCell(registry);
            this.interaction = false;
        } else {
            e.preventDefault();
        }
    }
    _getDefinitionForClosestToFirstLetter(cell) {
        let result;
        if (cell.acrossClue && cell.downClue) {
            if (cell.acrossClueLetterIndex <= cell.downClueLetterIndex) {
                result = cell.acrossClue;
            } else {
                result = cell.downClue;
            }
        } else {
            result = cell.acrossClue || cell.downClue;
        }
        return result;
    }
    _onFieldFocus(e) {
        if (!this.options.disabled) {
            this.interaction = true;
            let $target = $(e.target), $cell = $target.parents('.' + this.options.classes.cell).first();
            let x = $cell.data('x'), y = $cell.data('y');
            this.goToCell(y, x);
            this.interaction = false;
        } else {
            e.preventDefault();
        }
    }
    _onFieldBlur(e) {
        if (!this.interaction) {
            this.clearActive();
        }
    }
    _storeAndCheckAnswer(val, cellRegistry) {
        cellRegistry.currentAnswer = val;
        if (cellRegistry.definition.acrossClue) {
            let registry = this.cluesRegistry[cellRegistry.definition.acrossClue.code], index = cellRegistry.definition.acrossClueLetterIndex;
            registry.currentAnswer[index] = val;
            if (this.options.feedback === crossword_options_1.CrosswordFeedback.clue) {
                this.checkClue(registry);
            }
        }
        if (cellRegistry.definition.downClue) {
            let registry = this.cluesRegistry[cellRegistry.definition.downClue.code], index = cellRegistry.definition.downClueLetterIndex;
            registry.currentAnswer[index] = val;
            if (this.options.feedback === crossword_options_1.CrosswordFeedback.clue) {
                this.checkClue(registry);
            }
        }
        this.check();
    }
    _onFieldChange(e) {
        if (!this.options.disabled) {
            this.interaction = true;
            let val = this.registryCellActive.field.val();
            if (!this.registryActive) {
                let $target = $(e.target), $cell = $target.parents('.' + this.options.classes.cell).first();
                let x = $cell.data('x'), y = $cell.data('y');
                this.goToCell(y, x);
            }
            this._storeAndCheckAnswer(val, this.registryCellActive);
            if (val) {
                if (this.registryActive.definition.across) {
                    this.goToCellRight();
                } else {
                    this.goToCellBelow();
                }
            } else {
                if (this.registryActive.definition.across) {
                    this.goToCellLeft();
                } else {
                    this.goToCellAbove();
                }
            }
            this.interaction = false;
        } else {
            e.preventDefault();
        }
    }
    _activateClue(clue) {
        let registry = this.cluesRegistry[clue.code];
        if (registry && registry != this.registryActive) {
            this.registryActive = registry;
            this.element.find('.' + this.options.classes.clueActive).removeClass(this.options.classes.clueActive);
            registry.cellsAsJquery.addClass(this.options.classes.clueActive);
            registry.listItem.addClass(this.options.classes.clueActive);
        }
    }
    _getNextOrPrevClueFrom(cellRegistry, next) {
        let cellDefinition = cellRegistry.definition, result, across, definition, useClues, alterClues, index;
        if (cellDefinition.acrossClue && cellDefinition.downClue) {
            let closestDefinition = this._getDefinitionForClosestToFirstLetter(cellRegistry.definition);
            across = closestDefinition.across;
            definition = closestDefinition;
        } else {
            across = cellDefinition.acrossClue != undefined;
            definition = across ? cellDefinition.acrossClue : cellDefinition.downClue;
        }
        useClues = across ? cellDefinition.crossword.acrossClues : cellDefinition.crossword.downClues;
        alterClues = across ? cellDefinition.crossword.downClues : cellDefinition.crossword.acrossClues;
        index = useClues.findIndex(cell => cell.number === definition.number);
        if (index != -1) {
            index += next ? 1 : -1;
            let targetClue;
            if (next && index < useClues.length || !next && index >= 0) {
                targetClue = useClues[index];
            } else {
                targetClue = next ? alterClues[0] : alterClues.slice(-1)[0];
            }
            result = targetClue;
        }
        return result;
    }
    _getCellFor(cell, vertical, increase) {
        let result, definition = cell.definition, x = definition.x, y = definition.y, yTarget = vertical ? increase ? y + 1 : y - 1 : y, xTarget = vertical ? x : increase ? x + 1 : x - 1, targetRow = this.rowsRegistry[yTarget];
        if (targetRow) {
            let targetCell = targetRow.cellsRegistry[xTarget];
            if (targetCell && targetCell.definition.light) {
                if (targetCell.definition.hint) {
                    result = this._getCellFor(targetCell, vertical, increase);
                } else {
                    result = targetCell;
                }
            }
        }
        return result;
    }
    _onFieldKey(e) {
        if (!this.options.disabled) {
            this.interaction = true;
            let $target = $(e.target), $cell = $target.parents('.' + this.options.classes.cell).first();
            let x = $cell.data('x'), y = $cell.data('y'), cell = this.rowsRegistry[y].cellsRegistry[x];
            switch (e.which) {
            case $.ui.keyCode.SPACE:
                e.preventDefault();
                break;
            case $.ui.keyCode.ENTER:
            case $.ui.keyCode.TAB:
                e.preventDefault();
                if (!e.shiftKey) {
                    this.goToNextWord();
                } else {
                    this.goToPrevWord();
                }
                break;
            case $.ui.keyCode.UP:
                this.goToCellAbove();
                break;
            case $.ui.keyCode.RIGHT:
                this.goToCellRight();
                break;
            case $.ui.keyCode.DOWN:
                this.goToCellBelow();
                break;
            case $.ui.keyCode.LEFT:
                this.goToCellLeft();
                break;
            case $.ui.keyCode.BACKSPACE:
                e.preventDefault();
                cell.field.val('').trigger('input');
                break;
            default:
                if (e.key.length == 1) {
                    e.preventDefault();
                    cell.field.val(e.key).trigger('input');
                }
                break;
            }
            this.interaction = false;
        } else {
            e.preventDefault();
        }
    }
    _createBoard() {
        let result;
        if ((typeof this.options.createBoard).toLowerCase() == 'function') {
            result = this.options.createBoard.apply(this, arguments);
        } else {
            result = $(`<table class="${ this.options.classes.board }"></table>`);
        }
        return result;
    }
    _createRow(rowIndex) {
        let result;
        if ((typeof this.options.createRow).toLowerCase() == 'function') {
            result = this.options.createRow.apply(this, arguments);
        } else {
            result = $(`<tr class="${ this.options.classes.row }" data-row="${ rowIndex }"></tr>`);
        }
        return result;
    }
    _createCell(definition) {
        let result;
        if ((typeof this.options.createCell).toLowerCase() == 'function') {
            result = this.options.createCell.apply(this, arguments);
        } else {
            result = $(`<td class="${ this.options.classes.cell }"></td>`);
        }
        return result;
    }
    _createCellField(definition) {
        let result;
        if ((typeof this.options.createCellField).toLowerCase() == 'function') {
            result = this.options.createCellField.apply(this, arguments);
        } else {
            result = $(`<input maxlength="1" tabindex="-1">`);
        }
        return result;
    }
    _createCluesListContainer(across) {
        let result;
        if ((typeof this.options.createCluesListContainer).toLowerCase() == 'function') {
            result = this.options.createCluesListContainer.apply(this, arguments);
        } else {
            result = $(`
                <div class="${ this.options.classes.cluesListContainer }">
                    <p class="${ this.options.classes.cluesListTitle }">${ across ? this.options.acrossListTitle : this.options.downListTitle }</p>
                </div>
            `);
        }
        return result;
    }
    _createCluesList(across) {
        let result;
        if ((typeof this.options.createCluesList).toLowerCase() == 'function') {
            result = this.options.createCluesList.apply(this, arguments);
        } else {
            result = $(`<ul class="${ this.options.classes.clueList }"></ul>`);
        }
        return result;
    }
    _createCluesListItem(definition) {
        let result;
        if ((typeof this.options.createCluesListItem).toLowerCase() == 'function') {
            result = this.options.createCluesListItem.apply(this, arguments);
        } else {
            result = $(`<li></li>`);
        }
        return result;
    }
    _createDownCluesList() {
        let down = this.definition.downClues;
        this.downCluesContainer = this._createCluesListContainer(false);
        this.downCluesList = this._createCluesList(false);
        for (let clue of down) {
            const $clue = this._createCluesListItem(clue);
            this._addInfoToListElement($clue, clue);
            this.downCluesList.append($clue);
            this.cluesRegistry[clue.code].listItem = $clue;
        }
        if (this.downCluesContainer) {
            this.downCluesContainer.append(this.downCluesList);
        }
    }
    _createAcrossCluesList() {
        let across = this.definition.acrossClues;
        this.acrossCluesContainer = this._createCluesListContainer(true);
        this.acrossCluesList = this._createCluesList(true);
        for (let clue of across) {
            const $clue = this._createCluesListItem(clue);
            this._addInfoToListElement($clue, clue);
            this.acrossCluesList.append($clue);
            this.cluesRegistry[clue.code].listItem = $clue;
        }
        if (this.acrossCluesContainer) {
            this.acrossCluesContainer.append(this.acrossCluesList);
        }
    }
    _createCluesLists() {
        this._createAcrossCluesList();
        this._createDownCluesList();
        if (this.options.acrossListAppendTo) {
            if (this.acrossCluesContainer) {
                $(this.options.acrossListAppendTo).append(this.acrossCluesContainer);
            } else {
                $(this.options.acrossListAppendTo).append(this.acrossCluesList);
            }
        } else {
            this.element.append(this.acrossCluesContainer);
        }
        if (this.options.downListAppendTo) {
            if (this.downCluesContainer) {
                $(this.options.downListAppendTo).append(this.downCluesContainer);
            } else {
                $(this.options.downListAppendTo).append(this.downCluesList);
            }
        } else {
            this.element.append(this.downCluesContainer);
        }
    }
    _addInfoToListElement(listItem, clueDefinition) {
        listItem.addClass(this.options.classes.listItem);
        if (clueDefinition.across) {
            listItem.addClass(this.options.classes.clue + '--' + clueDefinition.code);
            listItem.attr('data-across', clueDefinition.code);
        } else {
            listItem.addClass(this.options.classes.clue + '--' + clueDefinition.code);
            listItem.attr('data-down', clueDefinition.code);
        }
        listItem.text(clueDefinition.clue);
    }
    _addInfoToCellElement(cell, cellDefinition) {
        cell.attr({
            'data-x': cellDefinition.x,
            'data-y': cellDefinition.y
        });
        if (cellDefinition.acrossClue || cellDefinition.downClue) {
            cell.addClass(this.options.classes.clue);
        }
        if (cellDefinition.clueLabel) {
            cell.addClass(this.options.classes.firstLetter);
            if (cellDefinition.acrossClueLetterIndex == 0) {
                cell.addClass(this.options.classes.firstLetterAcross);
            }
            if (cellDefinition.downClueLetterIndex == 0) {
                cell.addClass(this.options.classes.firstLetterDown);
            }
        }
        if (cellDefinition.acrossClue) {
            cell.addClass(this.options.classes.clue + '--' + cellDefinition.acrossClue.code);
            cell.attr('data-across', cellDefinition.acrossClue.number);
        }
        if (cellDefinition.downClue) {
            cell.addClass(this.options.classes.clue + '--' + cellDefinition.downClue.code);
            cell.attr('data-down', cellDefinition.downClue.number);
        }
        if (cellDefinition.light) {
            cell.addClass(this.options.classes.light);
            if (cellDefinition.hint) {
                cell.addClass(this.options.classes.hint);
            }
        }
    }
    _createClueRegistry() {
        let crosswordClueRegistry = {}, definition = this.definition, clues = definition.acrossClues.concat(definition.downClues);
        for (let clueIndex = 0, cluesLength = clues.length; clueIndex < cluesLength; clueIndex++) {
            let currentClue = clues[clueIndex], registry = new crossword_clue_registry_1.CrosswordClueRegistry();
            registry.definition = currentClue;
            registry.currentAnswer = new Array(currentClue.answer.length);
            crosswordClueRegistry[currentClue.code] = registry;
        }
        return crosswordClueRegistry;
    }
    _construct() {
        if (this.definition) {
            let definition = this.definition, matrix = definition.matrix, board = this._createBoard(), rowsRegistry = [], crosswordClueRegistry = this.cluesRegistry;
            for (let rowIndex = 0, matrixLength = matrix.length; rowIndex < matrixLength; rowIndex++) {
                let definitions = matrix[rowIndex], rowElement, cells = [], cellsRegistry = [], rowRegistry = new crossword_row_registry_1.CrosswordRowRegistry();
                rowRegistry.cellsRegistry = cellsRegistry;
                for (let columnIndex = 0, columnsLength = definitions.length; columnIndex < columnsLength; columnIndex++) {
                    let cellDefinition = definitions[columnIndex], cellElement = this._createCell(cellDefinition), cellRegistry = new crossword_cell_registry_1.CrosswordCellRegistry(), fieldElement;
                    cellRegistry.rowRegistry = rowRegistry;
                    this._addInfoToCellElement(cellElement, cellDefinition);
                    cellRegistry.definition = cellDefinition;
                    cellRegistry.element = cellElement;
                    if (cellDefinition.light) {
                        if (!cellDefinition.hint) {
                            fieldElement = this._createCellField(cellDefinition);
                            fieldElement.addClass(this.options.classes.field);
                            cellRegistry.field = fieldElement;
                            cellElement.append(fieldElement);
                            if (cellDefinition.acrossClue) {
                                let registry = crosswordClueRegistry[cellDefinition.acrossClue.code];
                                registry.cellsElements.push(cellElement);
                                registry.fieldsElements.push(fieldElement);
                                registry.cellsRegistries.push(cellRegistry);
                                cellRegistry.acrossClueRegistry = registry;
                            }
                            if (cellDefinition.downClue) {
                                let registry = crosswordClueRegistry[cellDefinition.downClue.code];
                                registry.cellsElements.push(cellElement);
                                registry.fieldsElements.push(fieldElement);
                                registry.cellsRegistries.push(cellRegistry);
                                cellRegistry.downClueRegistry = registry;
                            }
                        } else {
                            cellElement.text(cellDefinition.answer);
                            if (cellDefinition.acrossClue) {
                                let registry = crosswordClueRegistry[cellDefinition.acrossClue.code];
                                registry.currentAnswer[cellDefinition.acrossClueLetterIndex] = cellDefinition.answer;
                            }
                            if (cellDefinition.downClue) {
                                let registry = crosswordClueRegistry[cellDefinition.downClue.code];
                                registry.currentAnswer[cellDefinition.downClueLetterIndex] = cellDefinition.answer;
                            }
                        }
                    }
                    cells.push(cellElement);
                    cellsRegistry[columnIndex] = cellRegistry;
                }
                rowElement = this._createRow(rowIndex);
                if (rowElement) {
                    rowRegistry.element = rowElement;
                    rowElement.append(cells);
                    board.append(rowElement);
                } else {
                    board.append(cells);
                }
                rowsRegistry.push(rowRegistry);
            }
            this.rowsRegistry = rowsRegistry;
            this.element.append(board);
        }
    }
    _createDefinition() {
        let definition = this.options.definition;
        if (definition) {
            if (definition instanceof crossword_definition_1.CrosswordDefinition !== true) {
                definition = new crossword_definition_1.CrosswordDefinition(definition);
            }
            this.definition = definition;
        }
    }
}
exports.CrosswordGame = CrosswordGame;
}
// default/jquery.crossword.js
_8a11.f[7] = function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
const crossword_game_1 = _8a11.r(6);
$.widget('ui.crossword', crossword_game_1.CrosswordGame.prototype);
}
var r = _8a11.r(0)
if (r){for(var i in r){ window[i] = r[i] }}
})();