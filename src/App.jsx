import JSX        from './components/JSX';
import Components from './components/Components';
import State      from './components/State';
import Events     from './components/Events';
import Composition           from './components/Composition';
import Children              from './components/Children';
import ControlledUncontrolled from './components/ControlledUncontrolled';

function App() {
  return (
    <div style={{ padding: '20px' }}>
        <h1>React 19 Practice</h1>
      <h1>React Fundamentals</h1>
      <hr />
      <JSX />
      <hr />
      <Components />
      <hr />
      <State />
      <hr />
      <Events />

      <h1>Rendering & Patterns</h1>
      <hr />
      <Composition />
      <hr />
      <Children />
      <hr />
      <ControlledUncontrolled />
    </div>
  );
}

export default App;
  



