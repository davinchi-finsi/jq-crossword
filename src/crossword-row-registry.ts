import {CrosswordCellRegistry} from "./crossword-cell-registry";
/**
 * Represents a row of the board
 */
export class CrosswordRowRegistry {
    /**
     * Row element
     */
    element: JQuery;
    /**
     * Cells in the row
     */
    cellsRegistry: CrosswordCellRegistry[];
}