import JSX                  from '../components/Fundamentals/JSX';
import Components           from '../components/Fundamentals/Components';
import State                from '../components/Fundamentals/State';
import Props                from '../components/Fundamentals/Props';
import Events               from '../components/Fundamentals/Events';
import ConditionalRendering from '../components/Fundamentals/ConditionalRendering';
import ListsAndKeys         from '../components/Fundamentals/ListsAndKeys';

function FundamentalsPage() {
  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ color: '#2563EB', marginBottom: '4px' }}>
        📝 React Fundamentals
      </h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>
        JSX, Components, Props, State, Events, Lists
      </p>
      <hr />
      <JSX />
      <hr />
      <Components />
      <hr />
      <State />
      <hr />
      <Props />
      <hr />
      <Events />
      <hr />
      <ConditionalRendering />
      <hr />
      <ListsAndKeys />
    </div>
  );
}

export default FundamentalsPage;