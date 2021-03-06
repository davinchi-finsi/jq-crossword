# Change Log
## [1.2.2](https://github.com/davinchi-finsi/jq-crossword/compare/v1.2.1...v1.2.2) (2018-03-09)
### Bug Fixes
* Widget creation for old browsers
* Cell styles for IE11

## [1.2.1](https://github.com/davinchi-finsi/jq-crossword/compare/v1.2.0...v1.2.1) (2018-03-09)
### Bug Fixes
* Changed removeClass invocation for compatibility

## [1.2.0](https://github.com/davinchi-finsi/jq-crossword/compare/v1.1.0...v1.2.0) (2018-03-09)
### Features
* Added jquery-ui-deps to vcs
### Other
* Updated dependencies

<a name="1.1.0"></a>
## [1.1.0](https://github.com/davinchi-finsi/jq-crossword/compare/v1.1.0...v1.1.0) (2018-03-09)
### Feat
* Added jquery-ui-deps file chore: Updated gitignore and npmignore chore: Updated dependencies
### Bug Fixes
* When the across/down lists are outside the root element, the state classes aren't handled properly fix: When the across/down lists are outside the root element, the styles of the default theme aren't applied
* Check if the selector for acrossListAppendTo or downListAppendTo match with any element, otherwise, append to the root element
<a name="1.0.2"></a>
## [1.0.2](https://github.com/davinchi-finsi/jq-crossword/compare/v1.0.1...v1.0.2) (2018-02-26)
### Bug Fixes
* Widget name
* **README:** Vanilla js example
* **CHANGELOG:** Version 1.0.1 number

<a name="1.0.1"></a>
## [1.0.1](https://github.com/davinchi-finsi/jq-crossword/compare/v1.0.0...v1.0.1) (2018-02-26)
### Features
* **chore:** Added processed css to bundle
* **chore:** Implemented gulp
* **chore:** Implemented sass compilation
* **chore:**  Added esm2015 bundle
* **docs:** Added more comments
* **docs:** Added Known issues to README

### Bug Fixes
* **chore** Usage of local tsc for rollup
* **docs:** Fixes in README
* **docs:** Fixes inline docs
* updateClueStateClass should be protected