import React from 'react';
import { render } from 'react-dom';

import { ModalEl } from '../../src/index';

class Demo extends React.Component {

    constructor() {
        super()
        this.state = {
            visible: false
        }
    }

    handle() {
        ModalEl.success({
            title: 'success',
            content: 'some messages...some messages...'
        })
    }

    render() {
        return (
            <>
                <a onClick={() => { this.handle() }}>点击</a>
            </>
        )
    }
}


const App = () => <Demo />
render(<App />, document.getElementById('root'));