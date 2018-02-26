# jq-crossword
Extensible crossword game made with JQuery widget

## Dependencies
- jquery
- jquery ui (only widget)
- crossword-definition


## Features
- Typescript sources
- Keyboard navigation. See [keyboard navigation](#keyboard-navigation)
- All the css classes are configurable. See [css classes](https://github.com/davinchi-finsi/jq-crossword/interfaces/jqcrossword.crosswordoptions.html#classes)
- Configurable markup. See [configurable markup](#configurable-markup)
- Extensible with Widget. See [jquery ui widget docs](http://api.jqueryui.com/jQuery.widget/)

or download the [latest release](https://github.com/davinchi-finsi/jq-crossword/releases)

## Docs
For more info, please check the [docs](https://davinchi-finsi.github.io/jq-crossword/)

## Demo and Playground
Please go to our [demo in jsfiddle](https://jsfiddle.net/Haztivity/aykjnv6q/1/?utm_source=website&utm_medium=embed&utm_campaign=aykjnv6q)

## Usage
`npm i jq-crossword`
### Create the definition
`jq-crossword` uses [crossword-definition](https://github.com/davinchi-finsi/crossword-definition) to handle the model.

**Please note** that the `x` and `y` positions starts from 1 instead of 0, the first cell is in the `x:1` and `y:1` instead of  is in the `x:0` and `y:0`
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


### Import as module
Typescript:
```typescript
import * as $ from "jquery";
//choose one of the follow options
//for jquery-ui package
import "jquery-ui/ui/widget";
//for jquery-ui-dist package
import "jquery-ui-dist/jquery-ui";
import {CrosswordGame} from "jq-crossword";
$("someSelector").crossword(<CrosswordOptions>{
    //options
});
```
Vanilla ES2015
```javascript
import "jq-snap-puzzle";
//choose one of the follow options
//for jquery-ui package
import "jquery-ui/ui/widget";
//for jquery-ui-dist package
import "jquery-ui-dist/jquery-ui";
import {CrosswordGame} from "jq-crossword";
$("someSelector").crossword({
    //options
});
```
**Please note** that depending of the bundler you are using other configurations may be necessary. For example, shimming JQuery and JQuery UI.
### Traditional way
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Some Title</title>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    </head>
    <body>
        <div class="crossword">
        <script type="text/javascript">
            $(".crossword").crossword({
                //options
            });
        </script>
    </body>
</html>
```
## JQuery ui
JQuery ui could be included in the projects in many different ways and with different packages, instead
of force you to use one, we leave up to you how to include it:

### Modularized
Using `npm i jquery-ui` that install the package allowing to import the widgets you want.

We provided a file with the import of the required dependencies:
```typescript
import "jquery-ui/ui/widget";
```

### dist package
In npm is available the package [jquery-ui-dist](https://www.npmjs.com/package/jquery-ui-dist). Recommended if you will use the most of the framework.

### Downloading a custom bundle
Go to the [jquery ui download page](https://jqueryui.com/download) and checks:
- core
    - widget
or use [this configuration](http://jqueryui.com/download/#!version=1.12.1&components=100000000000000000000000000000000000000000000000)

### Options
Please go to [CrosswordOptions](https://davinchi-finsi.github.io/jq-crossword/interfaces/jqcrossword.crosswordoptions.html)

### Events

| Event name    | Detail           | Emit  |
| ------------- | -------------| ----- |
|[crossword:clue](https://davinchi-finsi.github.io/jq-crossword/enums/jqcrossword.crosswordevents.html#oncluecompleted)|  Triggered when a clue is completed | [CrosswordClueCompletedEvent](https://davinchi-finsi.github.io/jq-crossword/interfaces/jqcrossword.crosswordcluecompleteevent.html) |
|[crossword:solved](https://davinchi-finsi.github.io/jq-crossword/enums/jqcrossword.crosswordevents.html#onsolved)    | Triggered when the game is solved   |   |

For more info please go to [docs](https://davinchi-finsi.github.io/jq-crossword/enums/jqcrossword.crosswordevents.html)
### Keyboard navigation
`jq-crossword` provides keyboard navigation:


| Key           | Action        |
| ------------- | ------------- |
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
- [acrossListAppendTo](https://davinchi-finsi.github.io/jq-crossword/interfaces/jqcrossword.crosswordoptions.html#acrosslistappendto)
- [downListAppendTo](https://davinchi-finsi.github.io/jq-crossword/interfaces/jqcrossword.crosswordoptions.html#downlistappendto)

The options could be a jquery valid selector, a DomElement or a JQuery element

For example:
```html
<div class="crossword">

</div>
<div class="crossword-across-list">

</div>
```
```typescript
$(".crossword").crossword({
    //another options
    acrossListAppendTo:".crossword-across-list"
})
```

For more info, please go to [docs](https://davinchi-finsi.github.io/jq-crossword/interfaces/jqcrossword.crosswordoptions.html#downlistappendto)
### List titles
By default `jq-crossword` generates the titles for the lists in the `createCluesList`,
this could be override with the option [createCluesListContainer](https://davinchi-finsi.github.io/jq-crossword/interfaces/jqcrossword.crosswordoptions.html#createclueslistcontainer)

For example, use an `h2` tag instead of the default one:
```typescript
$(".crossword").crossword({
    //another options
    createCluesListContainer:()=>{
        return $(`<div class="${this.options.classes.cluesListContainer}">
                      <h2 class="${this.options.classes.cluesListTitle}">
                      ${
                          across//if is accross
                          ? this.options.acrossListTitle //use acrossListTitle
                          : this.options.downListTitle //otherwise use downListTitle
                      }
                      </h2>
                  </div>`);
    }
})
```

For more info, please go to [docs](https://davinchi-finsi.github.io/jq-crossword/interfaces/jqcrossword.crosswordoptions.html#downlisttitle)

### Methods
Available methods to invoke:

| Method        | Short description       |
| ------------- | ----------------------- |
| [destroy](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#destroy)       | Destroy the widget |
| [disable](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#disable)       | Disable the widget |
| [enable](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#enable)        | Enable the widget |
| [goToCell](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#gotocell)      | Move the focus to a cell |
| [clearActive](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#clearactive)   | Clear the focus |
| [goToCellAbove](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#gotocellabove) | Go to the cell above of the current active one |
| [goToCellBelow](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#gotocellbelow) | Go to the cell below of the current active one |
| [goToCellRight](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#gotocellright) | Go to the cell at right of the current active one |
| [goToCellLeft](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#gotocellleft)  | Go to the cell at left of the current active one |
| [goToNextWord](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#gotonextword)  | Go to the next word |
| [goToPrevWord](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#gotoprevword)  | Go to the previous word |
| [checkClue](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#checkclue)     | Check the answer of a clue |
| [check](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#check)         | Check the answers of all the clues |
| [solve](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html#solve)         | Solve the game |

For more info, please go to [docs](https://davinchi-finsi.github.io/jq-crossword/classes/jqcrossword.crosswordgame.html)
**Please note** that only public methods are available using `$("selector").crossword("methodName","methodParams");`


## Known issues
- When two words starts in the same position, the navigation by tab fails