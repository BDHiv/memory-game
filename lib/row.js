class Row extends React.Component {
    render() {
        // console.log('render from row.js');
        return (
            <div className="row">
                {this.props.children}
            </div>
        );
    }
}

export default Row;