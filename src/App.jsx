import JSX        from './components/JSX';
import Components from './components/Components';
import State      from './components/State';
import Events     from './components/Events';
import Composition           from './components/Composition';
import Children              from './components/Children';
import ControlledUncontrolled from './components/ControlledUncontrolled';


import UseState   from './hooks/UseState';
import UseEffect  from './hooks/UseEffect';
import UseRef     from './hooks/UseRef';
import UseContext from './hooks/UseContext';
import UseMemo    from './hooks/UseMemo';

import UseActionState from './hooks/UseActionState';
import UseFormStatus  from './hooks/UseFormStatus';
import UseOptimistic  from './hooks/UseOptimistic';
import UseAPI         from './hooks/UseAPI';



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

      <h1>Core Hooks</h1>
      <hr />
      <UseState />
      <hr />
      <UseEffect />
      <hr />
      <UseRef />
      <hr />
      <UseContext />
      <hr />
      <UseMemo />

      <h1>React 19 New Features</h1>
      <hr />
      <UseActionState />
      <hr />
      <UseFormStatus />
      <hr />
      <UseOptimistic />
      <hr />
      <UseAPI />
    </div>
  );
}

export default App;
  



