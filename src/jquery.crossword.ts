/**
 * @module jqCrossword
 *//** */
//Create the ui widget
import {CrosswordGame} from "./crossword-game";
import {CrosswordCellRegistry} from "./crossword-cell-registry";
import {CrosswordOptions} from "./crossword-options";
//$.widget extends the prototype that receives, to extend the prototype all the properties must be enumerable
//the properties of a es6 class prototype aren't enumerable so it's necessary to get the propertyNames and get the descriptor of each one
if(Object.hasOwnProperty("getOwnPropertyDescriptors")){
    //@ts-ignore
    let proto = {},
        names = Object.getOwnPropertyNames(CrosswordGame.prototype);
    for (let nameIndex = 0, namesLength = names.length; nameIndex < namesLength; nameIndex++) {
        let currentName = names[nameIndex];
        proto[currentName]=Object.getOwnPropertyDescriptor(CrosswordGame.prototype,currentName).value
    }
    $.widget("ui.snapPuzzle", proto);
}else {
    $.widget("ui.snapPuzzle", CrosswordGame);
}
declare interface JQuery {

    crossword(): JQuery;

    crossword(methodName: 'destroy'): void;

    crossword(methodName: 'disable'): void;

    crossword(methodName: 'enable'): void;

    crossword(methodName: 'widget'): JQuery;
    /**
     * Move the cursor to a cell. Also activates the related clue.
     * If the cell has one clue, the focus will be to the active clue or to the clue related to the cell
     * If the cell has two clues, the focus will be to the clue for which the cell is the first letter.
     * If none of the cells are the first letter, the focus will go to the current clue, or, if there isn't a current
     * clue, the focus will go to the clue for which the cell is closest to the first letter
     * @param yOrCell   Could be a number or a CrosswordCellRegistry.
     * @param [x]       The x position of the cell. Required if yOrCell is a number
     * @return {CrossCellRegistry}  The activated cell regitry
     */
    crossword(methodName: 'goToCell',yOrCell: number | CrosswordCellRegistry, x?: number):CrosswordCellRegistry;
    /**
     * Clear the active state
     */
    crossword(methodName: 'clearActive'): void;
    /**
     * Moves the focus to the cell above the current one
     * @private
     */
    crossword(methodName: 'goToCellAbove'): void;
    /**
     * Moves the focus to the cell below the current one
     */
    crossword(methodName: 'goToCellBelow'): void;
    /**
     * Moves the focus to the cell at the right side of the current one
     */
    crossword(methodName: 'goToCellRight'): void;
    /**
     * Moves the focus to the cell at the left side of the current one
     */
    crossword(methodName: 'goToCellLeft'): void;
    /**
     * Go to the next word from the current one
     */
    crossword(methodName: 'goToNextWord'): void;
    /**
     * Go to the previous word from the current one
     */
    crossword(methodName: 'goToPrevWord'): void;

    /**
     * Solve the game
     */
    crossword(methodName: 'solve'): void;

    /**
     * Check if a clue is correct
     * @param {CrosswordClueRegistry} [clueRegistry]  Clue to check. If is not provided, the active cell will be checked
     * @returns {boolean}
     */
    crossword(methodName: 'checkClue',clueRegistry): boolean;
    crossword(methodName: string): JQuery;

    crossword(options: CrosswordOptions): JQuery;

    crossword(optionLiteral: string, optionName: string): any;

    crossword(optionLiteral: string, options: CrosswordOptions): any;

    crossword(optionLiteral: string, optionName: string, optionValue: any): JQuery;
}