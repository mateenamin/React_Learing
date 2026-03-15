
// Lists and Keys — Kya Hai?
// Simple matlab: Array ko screen pe dikhao — har item ka unique key hona zaroori
// jsxconst students = ['Mateen', 'Ali', 'Sara'];

// // map se render karo
// {students.map((student, index) => (
//   <li key={index}>{student}</li>
//   //  ^^^^ key zaroori! — React track karta hai
// ))}
// ```

// **Key kyun zaroori hai?**
// ```
// Bina key — React confuse hota hai
// Key se   — React jaanta hai kaun sa item badla ✅




















import { useState } from 'react';

function ListsAndKeys() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Mateen', marks: 75, city: 'Lahore'    },
    { id: 2, name: 'Ali',    marks: 45, city: 'Karachi'   },
    { id: 3, name: 'Sara',   marks: 88, city: 'Islamabad' },
    { id: 4, name: 'Ahmed',  marks: 32, city: 'Lahore'    },
    { id: 5, name: 'Zara',   marks: 91, city: 'Karachi'   },
  ]);

  const [newName,   setNewName]   = useState('');
  const [newMarks,  setNewMarks]  = useState('');
  const [newCity,   setNewCity]   = useState('');
  const [filter,    setFilter]    = useState('all');
  const [sortBy,    setSortBy]    = useState('id');

  // Add student
  const addStudent = () => {
    if (!newName.trim() || !newMarks || !newCity.trim()) return;
    const student = {
      id:    Date.now(),  // unique id — key ke liye
      name:  newName,
      marks: Number(newMarks),
      city:  newCity,
    };
    setStudents([...students, student]);
    setNewName('');
    setNewMarks('');
    setNewCity('');
  };

  // Delete student
  const deleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };

  // Filter
  const filtered = students.filter(s => {
    if (filter === 'pass') return s.marks >= 50;
    if (filter === 'fail') return s.marks < 50;
    return true;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'name')  return a.name.localeCompare(b.name);
    if (sortBy === 'marks') return b.marks - a.marks;
    return a.id - b.id;
  });

  return (
    <div>
      <h2>Lists and Keys</h2>

      {/* Key kyun zaroori hai */}
      <div style={{ background: '#EFF6FF', padding: '12px',
        borderRadius: '8px', marginBottom: '15px' }}>
        <p>💡 Key React ko batati hai — kaun sa item badla</p>
        <p>✅ Unique ID use karo — index avoid karo</p>
      </div>

      {/* Add Student */}
      <div style={{ border: '2px solid #16A34A',
        borderRadius: '10px', padding: '15px', marginBottom: '15px' }}>
        <h3>Student Add Karo</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Naam..."
            style={{ padding: '8px', borderRadius: '6px',
              border: '1px solid #ddd' }}
          />
          <input
            value={newMarks}
            onChange={(e) => setNewMarks(e.target.value)}
            placeholder="Marks..."
            type="number"
            style={{ padding: '8px', borderRadius: '6px',
              border: '1px solid #ddd', width: '80px' }}
          />
          <input
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            placeholder="City..."
            style={{ padding: '8px', borderRadius: '6px',
              border: '1px solid #ddd' }}
          />
          <button onClick={addStudent}
            style={{ background: '#16A34A', color: 'white',
              padding: '8px 16px', border: 'none',
              borderRadius: '6px', cursor: 'pointer' }}>
            + Add
          </button>
        </div>
      </div>

      {/* Filter + Sort */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
        <div>
          <label>Filter: </label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}
            style={{ padding: '6px', borderRadius: '6px' }}>
            <option value="all">All ({students.length})</option>
            <option value="pass">Pass ({students.filter(s => s.marks >= 50).length})</option>
            <option value="fail">Fail ({students.filter(s => s.marks < 50).length})</option>
          </select>
        </div>
        <div>
          <label>Sort: </label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: '6px', borderRadius: '6px' }}>
            <option value="id">Default</option>
            <option value="name">Name</option>
            <option value="marks">Marks</option>
          </select>
        </div>
      </div>

      {/* List */}
      {sorted.length === 0 ? (
        // Conditional — empty state
        <div style={{ textAlign: 'center', padding: '30px',
          color: '#888', border: '2px dashed #ddd', borderRadius: '10px' }}>
          <p>Koi student nahi mila</p>
        </div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {sorted.map(student => (
            // key — unique id use karo
            <li key={student.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              marginBottom: '8px',
              background: '#F8FAFC',
              borderRadius: '8px',
              border: `2px solid ${student.marks >= 50 ? '#16A34A' : '#DC2626'}`
            }}>
              <div>
                <strong>{student.name}</strong>
                <span style={{ color: '#666', marginLeft: '8px' }}>
                  {student.city}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  color: student.marks >= 50 ? '#16A34A' : '#DC2626',
                  fontWeight: 'bold'
                }}>
                  {student.marks} marks
                </span>
                <span>
                  {student.marks >= 50 ? '✅ Pass' : '❌ Fail'}
                </span>
                <button
                  onClick={() => deleteStudent(student.id)}
                  style={{ background: '#DC2626', color: 'white',
                    border: 'none', borderRadius: '4px',
                    padding: '4px 8px', cursor: 'pointer' }}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Stats */}
      <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
        {[
          { label: 'Total',   value: students.length,                          color: '#2563EB' },
          { label: 'Pass',    value: students.filter(s => s.marks >= 50).length, color: '#16A34A' },
          { label: 'Fail',    value: students.filter(s => s.marks < 50).length,  color: '#DC2626' },
          { label: 'Average', value: students.length ?
            (students.reduce((sum, s) => sum + s.marks, 0) / students.length).toFixed(1) : 0,
            color: '#7C3AED' },
        ].map(stat => (
          <div key={stat.label} style={{
            flex: 1, textAlign: 'center', padding: '12px',
            background: '#F8FAFC', borderRadius: '8px',
            border: `2px solid ${stat.color}`
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold',
              color: stat.color }}>
              {stat.value}
            </div>
            <div style={{ color: '#666', fontSize: '14px' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListsAndKeys;