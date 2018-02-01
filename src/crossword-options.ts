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
 * Parameters for the plugin
 */
export interface CrosswordOptions {
    /**
     * Namespace for events
     * @default "jq-crossword"
     */
    namespace?: string;
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
         * Class for active cell
         * @default "c-crossword__cell--active"
         */
        cellActive?: string;
        /**
         * Class for correct cells
         * @default "c-crossword__cell--correct"
         */
        cellCorrect?:string;
        /**
         * Class for incorrect cells
         * @default "c-crossword__cell--incorrect"
         */
        cellIncorrect?:string;
        /**
         * Class for cells with clue
         * @default "c-crossword__clue"
         */
        clue?: string;
        /**
         * Class for active clue
         * @default "c-crossword__clue--active"
         */
        clueActive?: string;
        /**
         * Class for correct clue
         * @default "c-crossword__clue--correct"
         */
        clueCorrect?:string;
        /**
         * Class for incorrect clue
         * @default "c-crossword__clue--correct"
         */
        clueIncorrect?:string;
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
         * Class for cells with the first letter of the clue
         * @default "c-crossword__cell--first-letter"
         */
        firstLetter?: string;
        /**
         * Class for across cells with the first letter of the clue
         * @default "c-crossword__cell--first-letter-across",
         */
        firstLetterAcross?: string;
        /**
         * Class for down cells with the first letter of the clue
         * @default "c-crossword__cell--first-letter-down",
         */
        firstLetterDown?: string;
        /**
         * Class for list items
         * @default "c-crossword__list-item",
         */
        listItem?: string;
        /**
         * Class for the clues list container
         * @default "c-crossword__clues",
         */
        cluesListContainer?: string;
        /**
         * Class for the clues list title
         * @default "c-crossword__clues__title",
         */
        cluesListTitle?: string;
        /**
         * Class for the cluests lists
         * @default "c-crossword__clues__list",
         */
        clueList?: string;
        /**
         * Class for the disabled state
         * @default "c-crossword--disabled"
         */
        disabled?: string;

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
     * Ingore case check in words
     * @default true
     */
    ignoreCase?:boolean;
    /**
     * When to show the feedback.
     * "cell" to show feedback on cell change
     * "clue" to show feedback on clue completion (all letters)
     * "end" to show feedback when all the words has been completed
     * @default clue
     */
    feedback?:CrosswordFeedback;
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
    createCellField?(definition: CrosswordCell): JQuery;

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
    createCluesList?(across: boolean): JQuery;

    /**
     * Override the default creation of a clues list item
     * @param {CrosswordClueDefinition} definition
     * @returns {JQuery}
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