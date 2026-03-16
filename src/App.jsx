// import JSX        from './components/Fundamentals/JSX';
// import Components from './components/Fundamentals/Components';
// import State      from './components/Fundamentals/State';
// import Props       from'./components/Fundamentals/Props';
// import Events     from './components/Fundamentals/Events';
// import ConditionalRendering from './components/Fundamentals/ConditionalRendering';
// import ListsAndKeys         from './components/Fundamentals/ListsAndKeys';



// import Composition           from './components/Component Architecture/Composition';
// import Children              from './components/Component Architecture/Children';
// import ControlledUncontrolled from './components/Component Architecture/ControlledUncontrolled';
// import ReusableComponents from './components/Component Architecture/ReusableComponents';
// import PropDrilling       from './components/Component Architecture/PropDrilling';

// import UseState   from './hooks/UseState';
// import UseEffect  from './hooks/UseEffect';
// import UseRef     from './hooks/UseRef';
// import UseContext from './hooks/UseContext';
// import UseMemo    from './hooks/UseMemo';
// import UseCallback from './hooks/UseCallback';


// import UseFetch from './hooks/Custom Hooks/useFetch';
// import UseAuth from './hooks/Custom Hooks/UseAuth';
// import UseDebounce from './hooks/Custom Hooks/useDebounce';




// import UseActionState from './hooks/React 19 New Hooks/UseActionState';
// import UseFormStatus  from './hooks/React 19 New Hooks/UseFormStatus';
// import UseOptimistic  from './hooks/React 19 New Hooks/UseOptimistic';
// import UseAPI         from './hooks/React 19 New Hooks/UseAPI';



// import { Routes, Route, NavLink } from 'react-router-dom';

// // Pages import karo
// import Home       from './pages/Home';
// import JSXPage    from './pages/JSXPage';
// import HooksPage  from './pages/HooksPage';
// import RouterPage from './pages/RouterPage';
// import NotFound   from './pages/NotFound';



// function App() {
//   return (
//     <div style={{ padding: '20px' }}>
//         <h1>React 19 Practice</h1>
//       <h1>React Fundamentals</h1>
//       <hr />
//       <JSX />
//       <hr />
//       <Components />
//       <hr />
//       <State />
//       <hr />
//       <Props/>
//       <hr />
//       <Events />
//       <hr />
//       <ConditionalRendering />
//       <hr />
//       <ListsAndKeys />

//      <h1>Component Architecture</h1>
//       <hr />
//       <Composition />
//       <hr />
//       <Children />
//       <hr />
//       <ControlledUncontrolled />
//       <hr />
//       <ReusableComponents />
//       <hr />
//       <PropDrilling />

//       <h1>Core Hooks</h1>
//       <hr />
//       <UseState />
//       <hr />
//       <UseEffect />
//       <hr />
//       <UseRef />
//       <hr />
//       <UseContext />
//       <hr />
//       <UseMemo />
//          <hr />
//           <UseCallback />

//       <h1>Custom Hooks</h1>
//       {/* isy ma error show kr rha ha isy bad ma try kri gy  */}
//       <hr />
//       {/* <UseFetch url="https://api.com/posts" /> */}
//        <hr />
//       {/* <UseAuth/> */}
//        <hr />
//       {/* <UseDebounce/> */}
//       <hr />

//       {/* <CustomHooks /> */}


//       <h1>React 19 New Features</h1>
//       <hr />
//       <UseActionState />
//       <hr />
//       <UseFormStatus />
//       <hr />
//       <UseOptimistic />
//       <hr />
//       <UseAPI />
//     </div>
//   );
// }

// export default App;
  



import { Routes, Route, NavLink } from 'react-router-dom';

import Home                from './pages/Home';
import FundamentalsPage    from './pages/FundamentalsPage';
import ArchitecturePage    from './pages/ArchitecturePage';
import HooksPage           from './pages/HooksPage';
import CustomHooksPage     from './pages/CustomHooksPage';
import React19Page         from './pages/React19Page';
import RouterPage          from './pages/RouterPage';
import NotFound            from './pages/NotFound';
import DataFetchingPage from './pages/DataFetchingPage';
import StateManagementPage from './pages/StateManagementPage';
import FormsPage from './pages/FormsPage';
import AdvancedPage from './pages/AdvancedPage';
function App() {
  const links = [
    { to: '/',            label: '🏠 Home'          },
    { to: '/fundamentals',label: '📝 Fundamentals'  },
    { to: '/architecture',label: '🏗️ Architecture'  },
    { to: '/hooks',       label: '🪝 Hooks'         },
    { to: '/custom-hooks',label: '⚙️ Custom Hooks'  },
    { to: '/react19',     label: '🆕 React 19'      },
    { to: '/router',      label: '🔗 Router'        },
    { to: '/data-fetching', label: '🌐 Data Fetching' },
    { to: '/state', label: '🗄️ State' },
    { to: '/forms', label: '📋 Forms' },
    { to: '/advanced', label: '⚡ Advanced' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>

      {/* Navbar */}
      <nav style={{
        background: '#1A1A2E',
        padding: '12px 20px',
        display: 'flex',
        gap: '6px',
        alignItems: 'center',
        flexWrap: 'wrap',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            style={({ isActive }) => ({
              padding: '6px 12px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '13px',
              background: isActive ? '#2563EB' : 'transparent',
              color:      isActive ? 'white'   : '#94A3B8',
              transition: 'all 0.2s',
            })}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/"             element={<Home />}             />
        <Route path="/fundamentals" element={<FundamentalsPage />} />
        <Route path="/architecture" element={<ArchitecturePage />} />
        <Route path="/hooks"        element={<HooksPage />}        />
        <Route path="/custom-hooks" element={<CustomHooksPage />}  />
        <Route path="/react19"      element={<React19Page />}      />
        <Route path="/router"       element={<RouterPage />}       />
        <Route path="/data-fetching" element={<DataFetchingPage />} />
        <Route path="*"             element={<NotFound />}         />
        <Route path="/state" element={<StateManagementPage />} />
        <Route path="/forms" element={<FormsPage />} />
        <Route path="/advanced" element={<AdvancedPage />} />

      </Routes>

    </div>
  );
}

export default App;