/**
 * @module jqCrossword
 *//** */
import {
    CrosswordClueDefinition
} from "crossword-definition";
import {CrosswordGame} from "./crossword-game";

/**
 * OnClueCompleted event
 * @example ```javascript
 * $("someSelector").on("crossword:clue",(e,data)=>{
 *  console.log(`
 *      isCorrect: ${data.isCorrect},
 *      word: ${data.definition.answer},
 *      isAcross: ${data.definition.across},
 *      isCompleted: ${data.isCompleted}
 *  `)
 * });
 * ```
 */
export interface CrosswordClueCompleteEvent{
    /**
     * Instance of crossword that triggers the event
     */
    instance:CrosswordGame;
    /**
     * The answer is correct
     */
    isCorrect:boolean;
    /**
     * All the words has been provided
     */
    isCompleted:boolean;
    /**
     * Clue definition
     */
    definition:CrosswordClueDefinition;
}
export enum CrosswordEvents{
    /**
     * Triggered when a clue is completed
     * @emits [[CrosswordClueCompleteEvent]]
     * @example ```
     * $("someSelector").on("crossword:clue",(e,data)=>{console.log(data)});
     * ```
     */
    onClueCompleted = "crossword:clue",
    /**
     * Triggered when the game is solved
     * @example ```
     * $("someSelector").on("crossword:solved",(e)=>{console.log("Solved!"});
     * ```
     */
    onSolved = "crossword:solved"
}