import Row from "./row";
import Cell from "./cell";
import Footer from "./Footer";
import _ from "lodash";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.matrix = [];
        //p82
        console.log('creating matrix on game.js');

        for (let r = 0; r < this.props.rows; r++) {
            let row = [];
            for (let c = 0; c < this.props.columns; c++) {
                row.push(`${r}${c}`);
            }
            this
                .matrix
                .push(row);
        }
        console.log('finish matrix on game.js');
        console.log(this.matrix);
        let flatMatrix = _.flatten(this.matrix);
        console.log(flatMatrix);
        this.activeCells = _.sampleSize(flatMatrix, this.props.activeCellsCount);
        console.log(this.activeCells);

        this.state = {
            gameState: "ready",
            wrongGuesses: [],
            correctGuesses: [] //p85
        };

    }

    recordGuess({cellId, userGuessIsCorrect}) { // is triggered by handleClick function on cell componente, this function is passed to the cell componente on this render file code whith a spred
        let {wrongGuesses, correctGuesses, gameState} = this.state; //getting from the state on this code, both are arrays objects
        if (userGuessIsCorrect) { // userGuessIsCorrect is an a variable getting from a cell componente from the boolean active function on same cell componente js code file
            correctGuesses.push(cellId);
            if (correctGuesses.length === this.props.activeCellsCount) {
                gameState = this.finishGame("won");
            }
        } else {
            wrongGuesses.push(cellId);
            if (wrongGuesses.length > this.props.allowedWrongAttempts) {
                gameState = this.finishGame("lost");
            }
        }
        this.setState({correctGuesses, wrongGuesses, gameState});
    }

    componentDidMount() {
        // setTimeout(() => this.setState({gameState: 'memorize'}), 2000); setTimeout(()
        // => this.setState({gameState: 'recall'}), 4000); p80 setTimeout(() => {
        // console.log('change game state to memorize'); //  this.setState({ gameState:
        // 'memorize' }, () => {    setTimeout(() => { console.log('change game state
        // to recall');      this.setState({gameState: 'recall'}) }, 2000);  }); },
        // 2000);

        this.memorizeTimerId = setTimeout(() => { //P98
            this.setState({
                gameState: 'memorize'
            }, () => {
                this.recallTimerId = setTimeout(this.startRecallMode.bind(this), 2000);
            });
        }, 2000);
    }
    componentWillUnmount() {
        clearTimeout(this.memorizeTimerId);
        clearTimeout(this.recallTimerId);
        this.finishGame();
    }
    startRecallMode() {
        this.setState({
            gameState: 'recall'
        }, () => {
            this.secondsRemaining = this.props.timeoutSeconds;
            this.playTimerId = setInterval(() => {
                if (--this.secondsRemaining === 0) {
                    this.setState({
                        gameState: this.finishGame("lost")
                    });
                }
            }, 1000);
        });
    }
    finishGame(gameState) {
        clearInterval(this.playTimerId);
        return gameState;
    }
    render() {
        console.log('render from game.js');
        let showActiveCells = ["memorize", "lost"].indexOf(this.state.gameState) >= 0; //p93
        return (
            <div className="grid">
                {this
                    .matrix
                    .map((row, ri) => (
                        <Row key={ri}>
                        {row.map(cellId => <Cell
                            key={cellId}
                            id={cellId}
                            activeCells={this.activeCells}
                            showActiveCells={showActiveCells}
                            {...this.state}
                            recordGuess={this
                            .recordGuess
                            .bind(this)}/>)}
                    </Row> //p86
                    ))}
                <Footer
                    {...this.state}
                    activeCellsCount={this.props.activeCellsCount}
                    playAgain={this.props.createNewGame}/>
            </div>

        );
    }

}

Game.defaultProps = {
    allowedWrongAttempts: 2,
    timeoutSeconds: 10
};

export default Game;