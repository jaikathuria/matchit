import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'


/* Import CSS Librarie */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css/animate.min.css'
import 'font-awesome/css/font-awesome.min.css'


/* Import Styles */ 
import './styles/App.css'

/* Import Service Worker */
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
