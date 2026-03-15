function UserCard({ name, role, city, marks }) {
  return (
    <div style={{
      border: '2px solid #2563EB', borderRadius: '10px',
      padding: '15px', margin: '8px', width: '200px',
      display: 'inline-block'
    }}>
      <h3>{name}</h3>
      <p style={{ color: '#2563EB' }}>{role}</p>
      <p>📍 {city}</p>
      {marks && (
        <p style={{ color: marks >= 50 ? 'green' : 'red' }}>
          Marks: {marks}
        </p>
      )}
    </div>
  );
}

function Props() {
  return (
    <div>
      <h2>Props Demo</h2>
      <p>Parent se child ko data dena — read only hai</p>
      <UserCard name="Mateen" role="Developer" city="Lahore" marks={75} />
      <UserCard name="Ali"    role="Designer"  city="Karachi" marks={45} />
      <UserCard name="Sara"   role="Manager"   city="Islamabad" marks={88} />
    </div>
  );
}

export default Props;