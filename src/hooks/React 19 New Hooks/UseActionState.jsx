// React 19 New Features — Kyun Aaye?
// Simple matlab: Forms aur async operations pehle bahut mushkil the — React 19 ne easy kar diya!


// Pehle React 18 mein:
// ❌ 4-5 useState chahiye tha ek form ke liye
// ❌ isPending, error, success — sab khud handle karo
// ❌ Optimistic UI — bahut complex tha

// React 19 mein:
// ✅ useActionState  — ek hook mein sab
// ✅ useFormStatus   — form status koi bhi component le sakta hai
// ✅ useOptimistic   — instant UI update
// ✅ use()           — Promise/Context seedha render mein


// useActionState — Kya Hai?
// Simple matlab: Form submit karo — pending, error, success — sab automatic!


// // React 18 — purana tarika 😫
// const [name, setName]         = useState('');
// const [isPending, setIsPending] = useState(false);
// const [error, setError]       = useState(null);
// const [success, setSuccess]   = useState(false);

// const handleSubmit = async () => {
//   setIsPending(true);
//   const err = await saveName(name);
//   setIsPending(false);
//   if (err) setError(err);
//   else setSuccess(true);
// };
// // 4 useState + complex logic 😫

// // React 19 — useActionState ✅
// const [error, formAction, isPending] = useActionState(
//   async (prevState, formData) => {
//     const err = await saveName(formData.get('name'));
//     if (err) return err;
//     return null;
//   },
//   null
// );
// // Bas itna! ✅


































import { useActionState } from 'react';

// Fake API — 2 second delay
function fakeUpdateProfile(name, city) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!name || name.length < 2) {
        reject('Naam 2 characters se zyada hona chahiye!');
      } else if (!city) {
        reject('City zaroori hai!');
      } else {
        resolve({ name, city });
      }
    }, 2000);
  });
}

function UseActionState() {

  // useActionState — 3 cheezein return karta hai
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const name = formData.get('name');
      const city = formData.get('city');

      try {
        const result = await fakeUpdateProfile(name, city);
        return { success: true, data: result, error: null };
      } catch (err) {
        return { success: false, data: null, error: err };
      }
    },
    // Initial state
    { success: false, data: null, error: null }
  );

  return (
    <div>
      <h2>useActionState Demo</h2>

      {/* React 18 vs React 19 comparison */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 1, background: '#FEE2E2',
          padding: '15px', borderRadius: '10px' }}>
          <h4>❌ React 18 — Purana</h4>
          <p style={{ fontSize: '13px' }}>
            4 useState chahiye tha:
            isPending, error, success, data
          </p>
        </div>
        <div style={{ flex: 1, background: '#DCFCE7',
          padding: '15px', borderRadius: '10px' }}>
          <h4>✅ React 19 — Naya</h4>
          <p style={{ fontSize: '13px' }}>
            Sirf useActionState — sab automatic!
          </p>
        </div>
      </div>

      {/* Form */}
      <form action={formAction} style={{
        border: '2px solid #2563EB',
        borderRadius: '10px',
        padding: '20px',
        maxWidth: '400px'
      }}>
        <h3>Profile Update Form</h3>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>
            Naam:
          </label>
          <input
            name="name"
            placeholder="Apna naam likho..."
            style={{ padding: '8px', width: '100%', borderRadius: '6px',
              border: '1px solid #ddd' }}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>
            City:
          </label>
          <input
            name="city"
            placeholder="City likho..."
            style={{ padding: '8px', width: '100%', borderRadius: '6px',
              border: '1px solid #ddd' }}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          style={{
            background: isPending ? '#93C5FD' : '#2563EB',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            cursor: isPending ? 'not-allowed' : 'pointer',
            width: '100%'
          }}
        >
          {isPending ? '⏳ Saving...' : 'Save Profile'}
        </button>
      </form>

      {/* Results */}
      {state.error && (
        <div style={{ marginTop: '15px', background: '#FEE2E2',
          border: '1px solid #DC2626', borderRadius: '8px', padding: '12px' }}>
          ❌ Error: {state.error}
        </div>
      )}

      {state.success && (
        <div style={{ marginTop: '15px', background: '#DCFCE7',
          border: '1px solid #16A34A', borderRadius: '8px', padding: '12px' }}>
          ✅ Profile save ho gaya!
          <p>Name: {state.data.name}</p>
          <p>City: {state.data.city}</p>
        </div>
      )}
    </div>
  );
}

export default UseActionState;