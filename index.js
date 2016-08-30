import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';

class Consumer extends Component {

    render() {
        const p1 = this.props;
        const p2 = {...this.props};
        const s1 = Object.keys(p1).join(", ");
        const s2 = Object.keys(p2).join(", ");
        console.log(s1);
        console.log(s2);
        if (s1 !== s2) {
            console.log("^^^ Reproduced the bug!");
        }
        console.log();
        return <div><p>{s1}</p><p>{s2}</p></div>;
    }

}

class App extends Component {

    render() {
        const data = [
            {name: 'one', image: 'foo.png'},
            {name: 'two', image: 'bar.png'},
        ];
        return <div>
            {data.map(({name, image}, index) =>
                <Consumer
                    key={index}
                    className="el"
                    onClick={() => {}}
                    aria-pressed={false}
                    aria-role="button"
                >
                    <img
                        alt={name}
                        src={image}
                        className="elimg"
                    />
                </Consumer>)}
        </div>;
    }

}

/*
 * This function demonstrates the bug, when it exists.
 */
export default function demo(ignored, optionalCallback) {
    console.log("First render...");
    ReactDOMServer.renderToString(<App />);
    console.log();

    console.log("Second render...");
    ReactDOMServer.renderToString(<App />);
    console.log();

    if (optionalCallback) {
        optionalCallback(null, '<html></html>');
    }
};
