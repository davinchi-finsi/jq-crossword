(function(){
    var _ece7 = {};
    _ece7.f = {}
    // cached modules
    _ece7.m = {};
    _ece7.r = function(id) {
        var cached = _ece7.m[id];
        // resolve if in cache
        if (cached) {
            return cached.m.exports;
        }
        var file = _ece7.f[id];
        if (!file)
            return;
        cached = _ece7.m[id] = {};
        cached.exports = {};
        cached.m = { exports: cached.exports };
        file(cached.m, cached.exports);
        return cached.m.exports;
    };
// default/index.js
_ece7.f[0] = function(module,exports){
function __export(m) {
    for (var p in m)
        if (!exports.hasOwnProperty(p))
            exports[p] = m[p];
}
Object.defineProperty(exports, '__esModule', { value: true });
__export(_ece7.r(1));
__export(_ece7.r(2));
__export(_ece7.r(3));
__export(_ece7.r(4));
__export(_ece7.r(5));
__export(_ece7.r(6));
__export(_ece7.r(7));
}
// default/crossword-options.js
_ece7.f[1] = function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
var CrosswordFeedback;
(function (CrosswordFeedback) {
    CrosswordFeedback['clue'] = 'clue';
}(CrosswordFeedback = exports.CrosswordFeedback || (exports.CrosswordFeedback = {})));
}
// default/crossword-events.js
_ece7.f[2] = function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
var CrosswordEvents;
(function (CrosswordEvents) {
    CrosswordEvents['onClueCompleted'] = 'crossword:clue';
    CrosswordEvents['onSolved'] = 'crossword:solved';
}(CrosswordEvents = exports.CrosswordEvents || (exports.CrosswordEvents = {})));
}
// default/crossword-cell-registry.js
_ece7.f[3] = function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
var CrosswordCellRegistry = function () {
    function CrosswordCellRegistry() {
    }
    return CrosswordCellRegistry;
}();
exports.CrosswordCellRegistry = CrosswordCellRegistry;
}
// default/crossword-clue-registry.js
_ece7.f[4] = function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
var CrosswordClueRegistry = function () {
    function CrosswordClueRegistry() {
        this.cellsElements = [];
        this.fieldsElements = [];
        this.cellsRegistries = [];
        this.currentAnswer = [];
        this.isCompleted = false;
    }
    Object.defineProperty(CrosswordClueRegistry.prototype, 'cellsAsJquery', {
        get: function () {
            if (!this._$cells) {
                this._$cells = $($.map(this.cellsElements, function (val) {
                    return val.get(0);
                }));
            }
            return this._$cells;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CrosswordClueRegistry.prototype, 'fieldsAsJquery', {
        get: function () {
            if (!this._$fields) {
                this._$fields = $($.map(this.fieldsElements, function (val) {
                    return val.get(0);
                }));
            }
            return this._$fields;
        },
        enumerable: true,
        configurable: true
    });
    return CrosswordClueRegistry;
}();
exports.CrosswordClueRegistry = CrosswordClueRegistry;
}
// default/crossword-row-registry.js
_ece7.f[5] = function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
var CrosswordRowRegistry = function () {
    function CrosswordRowRegistry() {
    }
    return CrosswordRowRegistry;
}();
exports.CrosswordRowRegistry = CrosswordRowRegistry;
}
// default/crossword-game.js
_ece7.f[6] = function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
var crossword_definition_1 = _ece7.r('crossword-definition');
var crossword_options_1 = _ece7.r(1);
var crossword_clue_registry_1 = _ece7.r(4);
var crossword_cell_registry_1 = _ece7.r(3);
var crossword_row_registry_1 = _ece7.r(5);
var crossword_events_1 = _ece7.r(2);
var CrosswordGame = function () {
    function CrosswordGame() {
        this.cluesRegistry = {};
    }
    CrosswordGame.prototype.disable = function () {
        this._super();
        this.element.addClass(this.options.classes.disabled);
        var cluesRegistry = this.cluesRegistry;
        for (var clueCode in cluesRegistry) {
            var clueRegistry = cluesRegistry[clueCode];
            clueRegistry.fieldsAsJquery.prop('disabled', true);
        }
    };
    CrosswordGame.prototype.enable = function () {
        this._super();
        this.element.removeClass(this.options.classes.disabled);
        var cluesRegistry = this.cluesRegistry;
        for (var clueCode in cluesRegistry) {
            var clueRegistry = cluesRegistry[clueCode];
            clueRegistry.fieldsAsJquery.prop('disabled', false);
        }
    };
    CrosswordGame.prototype.goToCell = function (yOrCell, x) {
        var cell, cellDefinition, definition;
        if ((typeof yOrCell).toLowerCase() == 'number') {
            var rowRegistry = this.rowsRegistry[yOrCell];
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
    };
    CrosswordGame.prototype.clearActive = function () {
        if (this.registryActive) {
            this.registryActive = null;
            this.element.find('.' + this.options.classes.clueActive).removeClass(this.options.classes.clueActive);
            this.registryCellActive.element.removeClass(this.options.classes.cellActive);
            this.registryCellActive = null;
        }
    };
    CrosswordGame.prototype.goToCellAbove = function () {
        if (this.registryCellActive) {
            var target = this._getCellFor(this.registryCellActive, true, false);
            if (target) {
                this.goToCell(target);
            }
        }
    };
    CrosswordGame.prototype.goToCellBelow = function () {
        if (this.registryCellActive) {
            var target = this._getCellFor(this.registryCellActive, true, true);
            if (target) {
                this.goToCell(target);
            }
        }
    };
    CrosswordGame.prototype.goToCellRight = function () {
        if (this.registryCellActive) {
            var target = this._getCellFor(this.registryCellActive, false, true);
            if (target) {
                this.goToCell(target);
            }
        }
    };
    CrosswordGame.prototype.goToCellLeft = function () {
        if (this.registryCellActive) {
            var target = this._getCellFor(this.registryCellActive, false, false);
            if (target) {
                this.goToCell(target);
            }
        }
    };
    CrosswordGame.prototype.goToNextWord = function () {
        if (this.registryCellActive) {
            var target = this._getNextOrPrevClueFrom(this.registryCellActive, true);
            this.cluesRegistry[target.code].fieldsElements[0].trigger('focus');
        }
    };
    CrosswordGame.prototype.goToPrevWord = function () {
        if (this.registryCellActive) {
            var target = this._getNextOrPrevClueFrom(this.registryCellActive, false);
            this.cluesRegistry[target.code].fieldsElements[0].trigger('focus');
        }
    };
    CrosswordGame.prototype.checkClue = function (clueRegistry) {
        var result;
        clueRegistry = clueRegistry || this.registryActive;
        if (clueRegistry) {
            var prevCompleted = clueRegistry.isCompleted;
            clueRegistry.isCompleted = clueRegistry.currentAnswer.join('').length === clueRegistry.definition.answer.length;
            if (clueRegistry.isCompleted) {
                var correct = 0;
                var cellRegistries = clueRegistry.cellsRegistries;
                for (var _i = 0, cellRegistries_1 = cellRegistries; _i < cellRegistries_1.length; _i++) {
                    var registry = cellRegistries_1[_i];
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
    };
    CrosswordGame.prototype.check = function () {
        var cluesRegistry = this.cluesRegistry;
        var correct = 0;
        for (var clueCode in cluesRegistry) {
            var clueRegistry = cluesRegistry[clueCode];
            if (!clueRegistry.isCorrect) {
                break;
            }
            correct++;
        }
        if (correct == Object.keys(cluesRegistry).length) {
            this.element.trigger(crossword_events_1.CrosswordEvents.onSolved, [this]);
        }
    };
    CrosswordGame.prototype.solve = function () {
        var cluesRegistry = this.cluesRegistry;
        for (var clueCode in cluesRegistry) {
            var clueRegistry = cluesRegistry[clueCode], cellsRegistries = clueRegistry.cellsRegistries;
            for (var _i = 0, cellsRegistries_1 = cellsRegistries; _i < cellsRegistries_1.length; _i++) {
                var cellRegistry = cellsRegistries_1[_i];
                cellRegistry.field.val(cellRegistry.definition.answer);
            }
        }
        this.element.trigger(crossword_events_1.CrosswordEvents.onSolved, [this]);
    };
    CrosswordGame.prototype._getCreateOptions = function () {
        var options = {
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
    };
    CrosswordGame.prototype._checkCellAnswer = function (cellRegistry) {
        if (cellRegistry.field.val()) {
            if (this.options.ignoreCase) {
                cellRegistry.isCorrect = new RegExp(cellRegistry.definition.answer, 'i').test(cellRegistry.currentAnswer);
            } else {
                cellRegistry.isCorrect = cellRegistry.currentAnswer == cellRegistry.definition.answer;
            }
        }
        return cellRegistry.isCorrect;
    };
    CrosswordGame.prototype._create = function () {
        this.element.addClass(this.options.classes.root);
        this._createDefinition();
        this.cluesRegistry = this._createClueRegistry();
        this._construct();
        this._createCluesLists();
        this._addEvents();
    };
    CrosswordGame.prototype._addEvents = function () {
        this.element.on('focus.' + this.options.namespace, '.' + this.options.classes.field, this._onFieldFocus.bind(this));
        this.element.on('blur.' + this.options.namespace, '.' + this.options.classes.field, this._onFieldBlur.bind(this));
        this.element.on('input.' + this.options.namespace, '.' + this.options.classes.field, this._onFieldChange.bind(this));
        this.element.on('keydown.' + this.options.namespace, '.' + this.options.classes.field, this._onFieldKey.bind(this));
        this.element.on('click.' + this.options.namespace, '.' + this.options.classes.listItem, this._onListItemClick.bind(this));
    };
    CrosswordGame.prototype.updateClueStateClass = function (clueRegistry) {
        if (clueRegistry.isCompleted) {
            var clueClassToAdd = clueRegistry.isCorrect ? this.options.classes.clueCorrect : this.options.classes.clueIncorrect, clueClassToRemove = !clueRegistry.isCorrect ? this.options.classes.clueCorrect : this.options.classes.clueIncorrect;
            clueRegistry.listItem.removeClass(clueClassToRemove).addClass(clueClassToAdd);
            clueRegistry.cellsAsJquery.removeClass(clueClassToRemove).addClass(clueClassToAdd);
        } else {
            var cellsRegistries = clueRegistry.cellsRegistries;
            for (var _i = 0, cellsRegistries_2 = cellsRegistries; _i < cellsRegistries_2.length; _i++) {
                var cellRegistry = cellsRegistries_2[_i];
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
    };
    CrosswordGame.prototype._onListItemClick = function (e) {
        if (!this.options.disabled) {
            this.interaction = true;
            var $target = $(e.target), downCode = $target.data('down'), acrossCode = $target.data('across'), registry = void 0;
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
    };
    CrosswordGame.prototype._getDefinitionForClosestToFirstLetter = function (cell) {
        var result;
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
    };
    CrosswordGame.prototype._onFieldFocus = function (e) {
        if (!this.options.disabled) {
            this.interaction = true;
            var $target = $(e.target), $cell = $target.parents('.' + this.options.classes.cell).first();
            var x = $cell.data('x'), y = $cell.data('y');
            this.goToCell(y, x);
            this.interaction = false;
        } else {
            e.preventDefault();
        }
    };
    CrosswordGame.prototype._onFieldBlur = function (e) {
        if (!this.interaction) {
            this.clearActive();
        }
    };
    CrosswordGame.prototype._storeAndCheckAnswer = function (val, cellRegistry) {
        cellRegistry.currentAnswer = val;
        if (cellRegistry.definition.acrossClue) {
            var registry = this.cluesRegistry[cellRegistry.definition.acrossClue.code], index = cellRegistry.definition.acrossClueLetterIndex;
            registry.currentAnswer[index] = val;
            if (this.options.feedback === crossword_options_1.CrosswordFeedback.clue) {
                this.checkClue(registry);
            }
        }
        if (cellRegistry.definition.downClue) {
            var registry = this.cluesRegistry[cellRegistry.definition.downClue.code], index = cellRegistry.definition.downClueLetterIndex;
            registry.currentAnswer[index] = val;
            if (this.options.feedback === crossword_options_1.CrosswordFeedback.clue) {
                this.checkClue(registry);
            }
        }
        this.check();
    };
    CrosswordGame.prototype._onFieldChange = function (e) {
        if (!this.options.disabled) {
            this.interaction = true;
            var val = this.registryCellActive.field.val();
            if (!this.registryActive) {
                var $target = $(e.target), $cell = $target.parents('.' + this.options.classes.cell).first();
                var x = $cell.data('x'), y = $cell.data('y');
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
    };
    CrosswordGame.prototype._activateClue = function (clue) {
        var registry = this.cluesRegistry[clue.code];
        if (registry && registry != this.registryActive) {
            this.registryActive = registry;
            this.element.find('.' + this.options.classes.clueActive).removeClass(this.options.classes.clueActive);
            registry.cellsAsJquery.addClass(this.options.classes.clueActive);
            registry.listItem.addClass(this.options.classes.clueActive);
        }
    };
    CrosswordGame.prototype._getNextOrPrevClueFrom = function (cellRegistry, next) {
        var cellDefinition = cellRegistry.definition, result, across, definition, useClues, alterClues, index;
        if (cellDefinition.acrossClue && cellDefinition.downClue) {
            var closestDefinition = this._getDefinitionForClosestToFirstLetter(cellRegistry.definition);
            across = closestDefinition.across;
            definition = closestDefinition;
        } else {
            across = cellDefinition.acrossClue != undefined;
            definition = across ? cellDefinition.acrossClue : cellDefinition.downClue;
        }
        useClues = across ? cellDefinition.crossword.acrossClues : cellDefinition.crossword.downClues;
        alterClues = across ? cellDefinition.crossword.downClues : cellDefinition.crossword.acrossClues;
        index = useClues.findIndex(function (cell) {
            return cell.number === definition.number;
        });
        if (index != -1) {
            index += next ? 1 : -1;
            var targetClue = void 0;
            if (next && index < useClues.length || !next && index >= 0) {
                targetClue = useClues[index];
            } else {
                targetClue = next ? alterClues[0] : alterClues.slice(-1)[0];
            }
            result = targetClue;
        }
        return result;
    };
    CrosswordGame.prototype._getCellFor = function (cell, vertical, increase) {
        var result, definition = cell.definition, x = definition.x, y = definition.y, yTarget = vertical ? increase ? y + 1 : y - 1 : y, xTarget = vertical ? x : increase ? x + 1 : x - 1, targetRow = this.rowsRegistry[yTarget];
        if (targetRow) {
            var targetCell = targetRow.cellsRegistry[xTarget];
            if (targetCell && targetCell.definition.light) {
                if (targetCell.definition.hint) {
                    result = this._getCellFor(targetCell, vertical, increase);
                } else {
                    result = targetCell;
                }
            }
        }
        return result;
    };
    CrosswordGame.prototype._onFieldKey = function (e) {
        if (!this.options.disabled) {
            this.interaction = true;
            var $target = $(e.target), $cell = $target.parents('.' + this.options.classes.cell).first();
            var x = $cell.data('x'), y = $cell.data('y'), cell = this.rowsRegistry[y].cellsRegistry[x];
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
    };
    CrosswordGame.prototype._createBoard = function () {
        var result;
        if ((typeof this.options.createBoard).toLowerCase() == 'function') {
            result = this.options.createBoard.apply(this, arguments);
        } else {
            result = $('<table class="' + this.options.classes.board + '"></table>');
        }
        return result;
    };
    CrosswordGame.prototype._createRow = function (rowIndex) {
        var result;
        if ((typeof this.options.createRow).toLowerCase() == 'function') {
            result = this.options.createRow.apply(this, arguments);
        } else {
            result = $('<tr class="' + this.options.classes.row + '" data-row="' + rowIndex + '"></tr>');
        }
        return result;
    };
    CrosswordGame.prototype._createCell = function (definition) {
        var result;
        if ((typeof this.options.createCell).toLowerCase() == 'function') {
            result = this.options.createCell.apply(this, arguments);
        } else {
            result = $('<td class="' + this.options.classes.cell + '"></td>');
        }
        return result;
    };
    CrosswordGame.prototype._createCellField = function (definition) {
        var result;
        if ((typeof this.options.createCellField).toLowerCase() == 'function') {
            result = this.options.createCellField.apply(this, arguments);
        } else {
            result = $('<input maxlength="1" tabindex="-1">');
        }
        return result;
    };
    CrosswordGame.prototype._createCluesListContainer = function (across) {
        var result;
        if ((typeof this.options.createCluesListContainer).toLowerCase() == 'function') {
            result = this.options.createCluesListContainer.apply(this, arguments);
        } else {
            result = $('\n                <div class="' + this.options.classes.cluesListContainer + '">\n                    <p class="' + this.options.classes.cluesListTitle + '">' + (across ? this.options.acrossListTitle : this.options.downListTitle) + '</p>\n                </div>\n            ');
        }
        return result;
    };
    CrosswordGame.prototype._createCluesList = function (across) {
        var result;
        if ((typeof this.options.createCluesList).toLowerCase() == 'function') {
            result = this.options.createCluesList.apply(this, arguments);
        } else {
            result = $('<ul class="' + this.options.classes.clueList + '"></ul>');
        }
        return result;
    };
    CrosswordGame.prototype._createCluesListItem = function (definition) {
        var result;
        if ((typeof this.options.createCluesListItem).toLowerCase() == 'function') {
            result = this.options.createCluesListItem.apply(this, arguments);
        } else {
            result = $('<li></li>');
        }
        return result;
    };
    CrosswordGame.prototype._createDownCluesList = function () {
        var down = this.definition.downClues;
        this.downCluesContainer = this._createCluesListContainer(false);
        this.downCluesList = this._createCluesList(false);
        for (var _i = 0, down_1 = down; _i < down_1.length; _i++) {
            var clue = down_1[_i];
            var $clue = this._createCluesListItem(clue);
            this._addInfoToListElement($clue, clue);
            this.downCluesList.append($clue);
            this.cluesRegistry[clue.code].listItem = $clue;
        }
        if (this.downCluesContainer) {
            this.downCluesContainer.append(this.downCluesList);
        }
    };
    CrosswordGame.prototype._createAcrossCluesList = function () {
        var across = this.definition.acrossClues;
        this.acrossCluesContainer = this._createCluesListContainer(true);
        this.acrossCluesList = this._createCluesList(true);
        for (var _i = 0, across_1 = across; _i < across_1.length; _i++) {
            var clue = across_1[_i];
            var $clue = this._createCluesListItem(clue);
            this._addInfoToListElement($clue, clue);
            this.acrossCluesList.append($clue);
            this.cluesRegistry[clue.code].listItem = $clue;
        }
        if (this.acrossCluesContainer) {
            this.acrossCluesContainer.append(this.acrossCluesList);
        }
    };
    CrosswordGame.prototype._createCluesLists = function () {
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
    };
    CrosswordGame.prototype._addInfoToListElement = function (listItem, clueDefinition) {
        listItem.addClass(this.options.classes.listItem);
        if (clueDefinition.across) {
            listItem.addClass(this.options.classes.clue + '--' + clueDefinition.code);
            listItem.attr('data-across', clueDefinition.code);
        } else {
            listItem.addClass(this.options.classes.clue + '--' + clueDefinition.code);
            listItem.attr('data-down', clueDefinition.code);
        }
        listItem.text(clueDefinition.clue);
    };
    CrosswordGame.prototype._addInfoToCellElement = function (cell, cellDefinition) {
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
    };
    CrosswordGame.prototype._createClueRegistry = function () {
        var crosswordClueRegistry = {}, definition = this.definition, clues = definition.acrossClues.concat(definition.downClues);
        for (var clueIndex = 0, cluesLength = clues.length; clueIndex < cluesLength; clueIndex++) {
            var currentClue = clues[clueIndex], registry = new crossword_clue_registry_1.CrosswordClueRegistry();
            registry.definition = currentClue;
            registry.currentAnswer = new Array(currentClue.answer.length);
            crosswordClueRegistry[currentClue.code] = registry;
        }
        return crosswordClueRegistry;
    };
    CrosswordGame.prototype._construct = function () {
        if (this.definition) {
            var definition = this.definition, matrix = definition.matrix, board = this._createBoard(), rowsRegistry = [], crosswordClueRegistry = this.cluesRegistry;
            for (var rowIndex = 0, matrixLength = matrix.length; rowIndex < matrixLength; rowIndex++) {
                var definitions = matrix[rowIndex], rowElement = void 0, cells = [], cellsRegistry = [], rowRegistry = new crossword_row_registry_1.CrosswordRowRegistry();
                rowRegistry.cellsRegistry = cellsRegistry;
                for (var columnIndex = 0, columnsLength = definitions.length; columnIndex < columnsLength; columnIndex++) {
                    var cellDefinition = definitions[columnIndex], cellElement = this._createCell(cellDefinition), cellRegistry = new crossword_cell_registry_1.CrosswordCellRegistry(), fieldElement = void 0;
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
                                var registry = crosswordClueRegistry[cellDefinition.acrossClue.code];
                                registry.cellsElements.push(cellElement);
                                registry.fieldsElements.push(fieldElement);
                                registry.cellsRegistries.push(cellRegistry);
                                cellRegistry.acrossClueRegistry = registry;
                            }
                            if (cellDefinition.downClue) {
                                var registry = crosswordClueRegistry[cellDefinition.downClue.code];
                                registry.cellsElements.push(cellElement);
                                registry.fieldsElements.push(fieldElement);
                                registry.cellsRegistries.push(cellRegistry);
                                cellRegistry.downClueRegistry = registry;
                            }
                        } else {
                            cellElement.text(cellDefinition.answer);
                            if (cellDefinition.acrossClue) {
                                var registry = crosswordClueRegistry[cellDefinition.acrossClue.code];
                                registry.currentAnswer[cellDefinition.acrossClueLetterIndex] = cellDefinition.answer;
                            }
                            if (cellDefinition.downClue) {
                                var registry = crosswordClueRegistry[cellDefinition.downClue.code];
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
    };
    CrosswordGame.prototype._createDefinition = function () {
        var definition = this.options.definition;
        if (definition) {
            if (definition instanceof crossword_definition_1.CrosswordDefinition !== true) {
                definition = new crossword_definition_1.CrosswordDefinition(definition);
            }
            this.definition = definition;
        }
    };
    return CrosswordGame;
}();
exports.CrosswordGame = CrosswordGame;
}
// default/jquery.crossword.js
_ece7.f[7] = function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
var crossword_game_1 = _ece7.r(6);
$.widget('ui.crossword', crossword_game_1.CrosswordGame.prototype);
}
var r = _ece7.r(0)
if (r){for(var i in r){ window[i] = r[i] }}
})();