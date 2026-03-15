import Composition            from '../components/Component Architecture/Composition';
import Children               from '../components/Component Architecture/Children';
import ControlledUncontrolled from '../components/Component Architecture/ControlledUncontrolled';
import ReusableComponents     from '../components/Component Architecture/ReusableComponents';
import PropDrilling           from '../components/Component Architecture/PropDrilling';

function ArchitecturePage() {
  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ color: '#16A34A', marginBottom: '4px' }}>
        🏗️ Component Architecture
      </h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>
        Composition, Children, Reusable Components, Prop Drilling
      </p>
      <hr />
      <Composition />
      <hr />
      <Children />
      <hr />
      <ControlledUncontrolled />
      <hr />
      <ReusableComponents />
      <hr />
      <PropDrilling />
    </div>
  );
}

export default ArchitecturePage;