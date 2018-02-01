import {
    CrosswordCell,
    CrosswordClueDefinition,
    CrosswordDefinition
} from "crossword-definition";
import {CrosswordRowRegistry} from "./crossword-row-registry";

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
     * The user answer is correct
     */
    isCorrect?: boolean;
}
