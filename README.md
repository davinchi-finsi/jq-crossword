# jq-crossword
Extensible crossword game JQuery widget

## Dependencies
- jquery
- jquery ui (only widget)
- crossword-definition


## Features
- Typescript sources
- Keyboard navigation. See [keyboard navigation](#keyboard-navigation)
- All the css classes are configurable. See [css classes](ttps://github.com/davinchi-finsi/jq-crossword/interfaces/jqcrossword.crosswordoptions.html#classes)
- Configurable markup. See [configurable markup](#configurable-markup)
- Extensible with Widget. See [jquery ui widget docs](http://api.jqueryui.com/jQuery.widget/)

or download the [latest release](https://github.com/davinchi-finsi/jq-crossword/releases)

## Docs
For more info, please check the [docs](https://davinchi-finsi.github.io/jq-crossword/)

## Playgrond
[Demo in jsfiddle](https://jsfiddle.net/Haztivity/aykjnv6q/1/?utm_source=website&utm_medium=embed&utm_campaign=aykjnv6q)

## Usage
`npm i jq-crossword`
### Create the definition
`jq-crossword` uses [crossword-definition](https://github.com/davinchi-finsi/crossword-definition) to handle the model.

**Please note** that the `x` and `y` positions starts from 1 instead of 0, the first cell is in the `x:0` and `y:0`
```javascript
/*
*To create
*
*                   W
*   H   e   l   l   o
*   i               r
*   s               l
*   t       o   l   d
*   o
*   r
*   y
*/
let definition = {
    height:8,//height of the board, 8 cells
    width:5,//width of the board, 5 cells
    acrossClues:[
        {
            number:1, //number to identify the world, must be unique
            x:1,//The x position where the word starts, starting from 1
            y:2,//The y position where the word starts, starting from 1
            answer:"Hello",//the word itself
            clue:"A common greeting",//the clue
            hints:[2],//the letter 'e' is a hint. Starting from 1
        },
        {
            number:2,
            x:3,
            y:5,
            answer:"Old",
            clue:"Having lived for a long time; no longer young."
        }
    ],
    downClues:[
        {
            number:1,//this clue starts in the same cell that "Hello", so it must have the same number
            x:1,
            y:2,
            answer:"History",
            clue:"The study of past events, particularly in human affairs.",
            hints:[2,7]
        },
        {
            number:3,
            x:5,
            y:1,
            answer:"World",
            clue:"The earth is our _____"
        }
    ]
};

//Init component
$('.crossword').crossword({
    definition:definition
}).on("crossword:solved",(e)=>{
    console.log("Solved!")
});
```

### Options
Please go to [CrosswordOptions](https://davinchi-finsi.github.io/jq-crossword/interfaces/jqcrossword.crosswordoptions.html)

### Events

| Event name    | Detail           | Emit  |
| ------------- | -------------| ----- |
|[crossword:clue](https://davinchi-finsi.github.io/jq-crossword/enums/jqcrossword.crosswordevents.html#oncluecompleted)|  Triggered when a clue is completed | [CrosswordClueCompletedEvent](https://davinchi-finsi.github.io/jq-crossword/interfaces/jqcrossword.crosswordcluecompleteevent.html) |
|[crossword:solved](https://davinchi-finsi.github.io/jq-crossword/enums/jqcrossword.crosswordevents.html#onsolved)    | Triggered when the game is solved   |   |

### Keyboard navigation
`jq-crossword` provides keyboard navigation:
| Key           | Action       |
| ------------- | -------------|
| Up arrow      | Move the focus to the cell above the current cell (if any cell is active and there is a cell above) |
| Right arrow   | Move the focus to the cell at right of the current cell (if any cell is active and there is a cell at the right) |
| Down arrow    | Move the focus to the cell below the current cell (if any cell is active and there is a cell below) |
| Left arrow    | Move the focus to the cell at left of the current cell (if any cell is active and there is a cell at the left) |
| Tab           | Move the focus to the next word at the current direction (across or down). If there is not next world at the current direction, move the focus to the first cell of the first word for the other list |
| Shift + Tab   | Move the focus to the previous word at the current direction (across or down). If there is not previous world at the current direction, move the focus to the first cell of the last word for the other list |
| Backspace     | Removes the value of the current cell and moves the focus to the previous cell |


### Configurable markup
By default `jq-crossword` uses a table to generate the board, but the markup could be customized by options.

Please check the [available options](https://davinchi-finsi.github.io/jq-crossword/interfaces/jqcrossword.crosswordoptions.html#createboard)


### Append clues list
By default the clues list are appended to the root element but could be appended in other elements by the options:
- acrossListAppendTo
- downListAppendTo


### Methods
Available methods to invoke:

| Method        | Short description       |
| ------------- | ----------------------- |
| [destroy](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#destroy)       | Destroy the widget |
| [disable](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#disable)       | Disable the widget |
| [enable](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#enable)        | Enable the widget |
| [goToCell](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#goToCell)      | Move the focus to a cell |
| [clearActive](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#clearActive)   | Clear the focus |
| [goToCellAbove](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#goToCellAbove) | Go to the cell above of the current active one |
| [goToCellBelow](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#goToCellBelow) | Go to the cell below of the current active one |
| [goToCellRight](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#goToCellRight) | Go to the cell at right of the current active one |
| [goToCellLeft](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#goToCellLeft)  | Go to the cell at left of the current active one |
| [goToNextWord](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#goToNextWord)  | Go to the next word |
| [goToPrevWord](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#goToPrevWord)  | Go to the previous word |
| [checkClue](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#checkClue)     | Check the answer of a clue |
| [check](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#check)         | Check the answers of all the clues |
| [solve](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#solve)         | Solve the game |