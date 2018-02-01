import {
    CrosswordDefinition
} from "crossword-definition";
import {CrosswordGame} from "./crossword-game";

/**
 * OnClueCompleted event
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
    definition:CrosswordDefinition;
}
export enum CrosswordEvents{
    /**
     * Triggered when a clue is completed or
     */
    onClueCompleted = "crossword:clue",
    onEnd = "crossword:end"
}