class Cell extends React.Component {
    active() {
        return this
            .props
            .activeCells
            .indexOf(this.props.id) >= 0; //p83  retorna true
    }

    handleClick() { //p85
        if (this.guessState() === undefined && this.props.gameState === "recall") {
            //from the father we will get gameState... spread operator
            this
                .props
                .recordGuess({ //getting this function from the cointainer father code on game.js
                    cellId: this.props.id,
                    userGuessIsCorrect: this.active() //read the condifition if this cell clicked is contained on a fathar activeCells array setting at first on the constructor on game component
                });
        }
    }
    guessState() { //validate if current id cell prop is on any array from container code
        // correctGuesses, wrongGuesses are values passed by spread on game render code

        if (this.props.correctGuesses.indexOf(this.props.id) >= 0) { //id is setted by the cellid that is the core object from the matrix mapped represented by a cell string object id "00"
            return true;
        } else if (this.props.wrongGuesses.indexOf(this.props.id) >= 0) {
            return false;
        }
    }
    showActiveCells() {
        console.log('showActiveCells');
        return ["memorize", "lost"].indexOf(this.props.gameState) >= 0; //if any of both states is the current state getting from container props
    }
    render() { //p83
        //console.log('render from cell.js');

        let className = "cell";
        if (this.props.showActiveCells && this.active()) { //92  is all about states... if we now on memorize or los states, and this cell is cointaned by container.activeCells
            className += " active"; //then activate
        }
        if (this.props.gameState === "memorize" && this.active()) {
            className += " active";
        }
        className += " guess-" + this.guessState();
        return (
            <div
                className={className}
                onClick={this
                .handleClick
                .bind(this)}></div>
        );

    }
}

export default Cell;