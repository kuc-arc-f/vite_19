
import { h, Component, render } from 'preact'
import Router from 'preact-router';
//
const Header = () => (
	<header>
		<nav>
			<a href="/">[ Home ]</a>
			<a href="/about">[ About ]</a>
			<a href="/contact">[ Contact ]</a>
			<a href="/test">[ Test ]</a>
		</nav>
    <hr class="my-2" />
	</header>
);
//
const pages = import.meta.glob('./pages/*.tsx', { eager: true })

const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages\/(.*)\.tsx$/)[1]
  return {
    name,
    path: name === 'Home' ? '/' : `/${name.toLowerCase()}`,
    component: pages[path].default,
  }
})
console.log(routes);
//
export function App() {
  return (
  <div class="app">
    <Header />
    <Router>
    {routes.map(({ path, component: RouteComp }) => {
      return (
        <RouteComp key={path} path={path}  
        ></RouteComp>
      )
    })}
    </Router>
  </div>
  );
}
//render(<App />, document.getElementById('app')!);
/*
<Component path="/about" />
*/