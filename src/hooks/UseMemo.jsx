
// useMemo — Cache Karo
// Simple matlab: Expensive calculation baar baar mat karo — result yaad rakho

// // Bina useMemo — har render pe calculate hoga
// const filtered = students.filter(s => s.marks > 50);

// // useMemo — sirf jab students ya search change ho
// const filtered = useMemo(() => {
//   return students.filter(s => s.marks > 50);
// }, [students]);


























import { useState, useMemo } from 'react';

// Fake heavy calculation
function heavyCalc(num) {
  console.log('Heavy calculation chal raha hai...');
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += num;
  }
  return result;
}

const students = [
  { id: 1, name: 'Mateen', marks: 75, city: 'Lahore'    },
  { id: 2, name: 'Ali',    marks: 45, city: 'Karachi'   },
  { id: 3, name: 'Sara',   marks: 88, city: 'Islamabad' },
  { id: 4, name: 'Ahmed',  marks: 32, city: 'Lahore'    },
  { id: 5, name: 'Zara',   marks: 91, city: 'Karachi'   },
];

function UseMemo() {
  const [num, setNum]       = useState(1);
  const [search, setSearch] = useState('');
  const [count, setCount]   = useState(0);

  // Bina useMemo — har render pe heavy calc chalega!
  // const result = heavyCalc(num);

  // useMemo — sirf num change pe chalega
  const result = useMemo(() => {
    return heavyCalc(num);
  }, [num]);

  // useMemo — sirf search change pe filter hoga
  const filtered = useMemo(() => {
    console.log('Filtering...');
    return students.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // Stats — sirf filtered change pe
  const stats = useMemo(() => {
    const total   = filtered.reduce((sum, s) => sum + s.marks, 0);
    const average = filtered.length ? (total / filtered.length).toFixed(1) : 0;
    const highest = filtered.length ? Math.max(...filtered.map(s => s.marks)) : 0;
    return { total, average, highest };
  }, [filtered]);

  return (
    <div>
      <h2>useMemo Demo</h2>

      {/* Heavy Calculation */}
      <div style={{ marginBottom: '15px', padding: '15px',
        border: '2px solid #7C3AED', borderRadius: '10px' }}>
        <h3>Heavy Calculation — Console dekho</h3>
        <p>Result: {result}</p>
        <button onClick={() => setNum(num + 1)}>
          Change Num ({num})
        </button>
        <button onClick={() => setCount(count + 1)} style={{ marginLeft: '8px' }}>
          Other Counter ({count}) — calc nahi chalega
        </button>
      </div>

      {/* Search Filter */}
      <div style={{ padding: '15px',
        border: '2px solid #2563EB', borderRadius: '10px' }}>
        <h3>Search Filter — Memoized</h3>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Student search karo..."
          style={{ padding: '8px', marginBottom: '10px', width: '200px' }}
        />

        {/* Stats */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '10px' }}>
          <span>Total: {stats.total}</span>
          <span>Average: {stats.average}</span>
          <span>Highest: {stats.highest}</span>
        </div>

        {/* Students */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#1A1A2E', color: 'white' }}>
              <th style={{ padding: '8px' }}>Name</th>
              <th style={{ padding: '8px' }}>Marks</th>
              <th style={{ padding: '8px' }}>City</th>
              <th style={{ padding: '8px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <tr key={s.id} style={{ background: i % 2 === 0 ? '#F8FAFC' : 'white' }}>
                <td style={{ padding: '8px', textAlign: 'center' }}>{s.name}</td>
                <td style={{ padding: '8px', textAlign: 'center' }}>{s.marks}</td>
                <td style={{ padding: '8px', textAlign: 'center' }}>{s.city}</td>
                <td style={{ padding: '8px', textAlign: 'center' }}>
                  {s.marks >= 50 ? ' Pass' : ' Fail'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UseMemo;