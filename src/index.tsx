import { Route, Router } from '@solidjs/router'
import { render } from 'solid-js/web'
import { App } from './App'
import './index.css'
import { Nav, NotFound, SignUp, Users } from './pages'

render(
  () => (
    <Router>
      <Route path="/" component={App}>
        <Route path="signup" component={SignUp} />
        <Route path="app">
          <Route path="/" component={Nav} />
          <Route path="/users">
            <Route path="/" component={Users} />
            <Route path="/:id" component={Users} />
          </Route>
        </Route>
      </Route>
      <Route path="*404" component={NotFound} />
    </Router>
  ),
  document.getElementById('root')!,
)
