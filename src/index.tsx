import { Route, Router } from '@solidjs/router'
import { render } from 'solid-js/web'
import { App } from './App'
import { Inbox, NotFound, SignUp } from './pages'

import './index.css'

render(
  () => (
    <Router>
      <Route path="/" component={App}>
        <Route path="signup" component={SignUp} />
        <Route path="inbox" component={Inbox} />
        <Route path="*404" component={NotFound} />
      </Route>
    </Router>
  ),
  document.getElementById('root')!,
)
