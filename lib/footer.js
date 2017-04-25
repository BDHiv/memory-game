class Footer extends React.Component {
    remainingCount() {
        if (this.props.gameState !== "recall") {
            return null;
        }
        return (
            <div className="remaining-count">
                {this.props.activeCellsCount - this.props.correctGuesses.length}
            </div>
        );
    }
    playAgainButton() { //p99
        if (["won", "lost"].indexOf(this.props.gameState) >= 0) {
            return (
                <button className="play-again-button" onClick={this.props.playAgain}>
                    Play Again
                </button>
            );
        }
    }
    render() {
        console.log('render from footer.js this.props.gameState: ' + this.props.gameState);
        return (
            <div className="footer">
                <div className="hint">
                    {this.props.hints[this.props.gameState]}...
                </div>
                {this.remainingCount()}
                {this.playAgainButton()}
            </div>
        );

    }
}
Footer.defaultProps = {
    hints: {
        ready: "Get Ready",
        memorize: "Memorize",
        recall: "Recall",
        won: "Well Played",
        lost: "Game Over"
    }
}
export default Footer;