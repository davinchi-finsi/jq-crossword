/**
 * @module jqCrossword
 *//** */
import {
    CrosswordCell,
    CrosswordClueDefinition,
    CrosswordDefinition
} from "crossword-definition";

/**
 * Available feedback options
 */
export enum CrosswordFeedback{
    /**
     * Show feedback when all the letters of a clue has been provided
     * @type {string}
     */
    clue="clue"
}
/**
 * Options for the plugin
 */
export interface CrosswordOptions {
    /**
     * Namespace for events
     * @default jq-crossword
     */
    namespace?: string;
    /**
     * Disable the widget
     * @default false
     */
    disabled?:boolean;
    /**
     * Definition to use
     */
    definition?: CrosswordDefinition;
    /**
     * Css classes to use
     */
    classes?: {//css classes for elements
        /**
         * Root element
         * @default c-crossword
         */
        root?: string;
        /**
         * Class for the board
         * @default `c-crossword__board`
         */
        board?: string;
        /**
         * Class for each row
         * @default `c-crossword__row`
         */
        row?: string;
        /**
         * Class for each cell
         * @default `c-crossword__cell`
         */
        cell?: string;
        /**
         * Class for active cell
         * @default `c-crossword__cell--active`
         */
        cellActive?: string;
        /**
         * Class for correct cells
         * @default `c-crossword__cell--correct`
         */
        cellCorrect?:string;
        /**
         * Class for incorrect cells
         * @default `c-crossword__cell--incorrect`
         */
        cellIncorrect?:string;
        /**
         * Class for cells with clue
         * @default `c-crossword__clue`
         */
        clue?: string;
        /**
         * Class for active clue
         * @default `c-crossword__clue--active`
         */
        clueActive?: string;
        /**
         * Class for correct clue
         * @default `c-crossword__clue--correct`
         */
        clueCorrect?:string;
        /**
         * Class for incorrect clue
         * @default `c-crossword__clue--correct`
         */
        clueIncorrect?:string;
        /**
         * Class for cells with content or field
         * @default `c-crossword__clue--light`
         */
        light?: string;
        /**
         * Class for cells that are hints
         * @default `c-crossword__clue--hint`
         */
        hint?: string;
        /**
         * Class for cells fields
         * @default `c-crossword__clue__field`
         */
        field?: string;
        /**
         * Class for cells with the first letter of the clue
         * @default `c-crossword__cell--first-letter`
         */
        firstLetter?: string;
        /**
         * Class for across cells with the first letter of the clue
         * @default `c-crossword__cell--first-letter-across`
         */
        firstLetterAcross?: string;
        /**
         * Class for down cells with the first letter of the clue
         * @default `c-crossword__cell--first-letter-down`
         */
        firstLetterDown?: string;
        /**
         * Class for list items
         * @default `c-crossword__list-item`
         */
        listItem?: string;
        /**
         * Class for the clues list container
         * @default `c-crossword__clues`
         */
        cluesListContainer?: string;
        /**
         * Class for the clues list title
         * @default `c-crossword__clues__title`
         */
        cluesListTitle?: string;
        /**
         * Class for the cluests lists
         * @default `c-crossword__clues__list`
         */
        clueList?: string;
        /**
         * Class for the disabled state
         * @default `c-crossword--disabled`
         */
        disabled?: string;

    },
    /**
     * Title ofr the down list
     * @default Down clues
     */
    downListTitle?: string;
    /**
     * Title for the across list
     * @default Across clues
     */
    acrossListTitle?: string;
    /**
     * Ignore case checking the letters
     * @default true
     */
    ignoreCase?:boolean;
    /**
     * When to show the feedback.
     * "clue" to show feedback on clue completion (all letters)
     * @default clue
     */
    feedback?:CrosswordFeedback;
    /**
     * Override the default creation of the board
     * @example ```typescript
     *$(".crossword").crossword({
     *      definition:definition,
     *      createBoard:()=>{
     *          return $(`<div class="my-custom-board"></div>`);
     *      }
     * })```
     * @returns {JQuery}
     * @see [[CrosswordGame._createBoard]]
     */
    createBoard?(): JQuery;

    /**
     * Override the default creation of the row
     * @param {number} rowIndex
     * @returns {JQuery}
     * @example ```typescript
     *$(".crossword").crossword({
     *      definition:definition,
     *      createRow:(rowIndex)=>{
     *          return $(`<div class="my-custom-row my-custom-row--${rowIndex}"></div>`);
     *      }
     * })```
     * @see [[CrosswordGame._createRow]]
     */
    createRow?(rowIndex: number): JQuery;

    /**
     * Override the default creation of the cell
     * Please note that jq-crossword requires some classes and attributes to work, those could not be override
     * @param {CrosswordCell} definition
     * @returns {JQuery}
     * @example ```typescript
     *$(".crossword").crossword({
     *      definition:definition,
     *      createCell:(definition)=>{
     *          return $(`<div class="my-custom-cell" data-x="${definition.x}" data-y="${definition.y}"></div>`);
     *      }
     * })```
     * @see [[CrosswordGame._createCell]]
     */
    createCell?(definition: CrosswordCell): JQuery;

    /**
     * Override the default creation of the field of a cell
     * @param {} definition
     * @example ```typescript
     *$(".crossword").crossword({
     *      definition:definition,
     *      createCellField:(definition)=>{
     *          return $(`<input class="my-custom-field">`);
     *      }
     * })```
     * @see [[CrosswordGame._createCellField]]
     */
    createCellField?(definition: CrosswordCell): JQuery;

    /**
     * Override the default creation of clues list container
     * This element is optional.
     * @param {boolean} across
     * @returns {JQuery}
     * @example ```typescript
     *$(".crossword").crossword({
     *      definition:definition,
     *      createCluesListContainer:(definition)=>{
     *          return $(`<div class="my-custom-create-clues-list-container"></div>`);
     *      }
     * })```
     * @see [[CrosswordGame._createCluesListContainer]]
     */
    createCluesListContainer?(across: boolean): JQuery;

    /**
     * Override the default creation of a list of clues
     * @param {boolean} across
     * @returns {JQuery}
     * @example ```typescript
     *$(".crossword").crossword({
     *      definition:definition,
     *      createCluesListContainer:(definition)=>{
     *          return $(`<ul class="my-custom-create-clues-list"></ul>`);
     *      }
     * })```
     * @see [[CrosswordGame._createCluesList]]
     */
    createCluesList?(across: boolean): JQuery;

    /**
     * Override the default creation of a clues list item
     * @param {CrosswordClueDefinition} definition
     * @returns {JQuery}
     * @example ```typescript
     *$(".crossword").crossword({
     *      definition:definition,
     *      createCluesListItem:(definition)=>{
     *          return $(`<li class="my-custom-create-clues-list-item"></li>`);
     *      }
     * })```
     * @see [[CrosswordGame._createCluesListItem]]
     */
    createCluesListItem?(definition: CrosswordClueDefinition): JQuery;

    /**
     * Where to append the across list
     * By default the list will be appended to the root element
     */
    acrossListAppendTo?: Element | JQuery | string;
    /**
     * Where to append the across list
     * By default the list will be appended to the root element
     */
    downListAppendTo?: Element | JQuery | string;
}