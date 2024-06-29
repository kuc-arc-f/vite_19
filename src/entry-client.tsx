import './index.css'
import { hydrate, render } from 'preact'
import { App } from './app'

console.log("#entry-client.tsx");
//
//hydrate(<App />, document.getElementById('app') as HTMLElement)
render(<App />, document.getElementById('app')!);
