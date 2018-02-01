import {
    CrosswordCell,
    CrosswordClueDefinition,
    CrosswordDefinition
} from "crossword-definition";
/**
 * Represents a clue
 */
import {CrosswordCellRegistry} from "./crossword-cell-registry";

export class CrosswordClueRegistry {
    /**
     * Clue definition
     */
    definition: CrosswordClueDefinition;
    /**
     * The jquery elements of the cells with letters of the clue. Is an js array not a Jquery object
     * @type {any[]}
     */
    cellsElements: JQuery[] = [];
    /**
     * The jquery elements of the fields for cells of the clue. Is an js array not a Jquery object
     * @type {any[]}
     */
    fieldsElements: JQuery[] = [];
    /**
     * Cell registries that belongs to the clue
     * @type {any[]}
     */
    cellsRegistries: CrosswordCellRegistry[] = [];
    /**
     * The user answer is correct
     */
    isCorrect: boolean;
    /**
     * The jquery element with the clue in the list
     */
    listItem: JQuery;
    /**
     * Current answer
     * @type {any[]}
     */
    currentAnswer:string[]=[];
    /**
     * All the letlers has been provided
     * @type {boolean}
     */
    isCompleted:boolean = false;
    protected _$cells;
    protected _$fields;

    /**
     * Get the cells as jquery element
     * @returns {any}
     */
    get cellsAsJquery() {
        if (!this._$cells) {
            this._$cells = $($.map(this.cellsElements, (val) => val.get(0)));
        }
        return this._$cells;
    }

    /**
     * Get the fields as a jquery element
     * @returns {any}
     */
    get fieldsAsJquery() {
        if (!this._$fields) {
            this._$fields = $($.map(this.fieldsElements, (val) => val.get(0)));
        }
        return this._$fields;
    }
}

