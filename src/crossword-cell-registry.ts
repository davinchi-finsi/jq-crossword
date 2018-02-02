import {
    CrosswordCell
} from "crossword-definition";
import {CrosswordRowRegistry} from "./crossword-row-registry";
import {CrosswordClueRegistry} from "./crossword-clue-registry";

/**
 * Represents a cell
 */
export class CrosswordCellRegistry {
    /**
     * Cell definition
     */
    definition: CrosswordCell;
    /**
     * Cell field
     */
    field: JQuery;
    /**
     * Cell element
     */
    element: JQuery;
    /**
     * Row registry to which the cell belongs
     */
    rowRegistry: CrosswordRowRegistry;
    /**
     * Across clue registry to which the cell belongs
     */
    acrossClueRegistry: CrosswordClueRegistry;
    /**
     * Down clue registry to which the cell belongs
     */
    downClueRegistry: CrosswordClueRegistry;
    /**
     * The user answer is correct
     */
    isCorrect?: boolean;
    /**
     * Value in the cell
     */
    currentAnswer?:string;
}
