// useFormStatus — Kya Hai?
// Simple matlab: Submit button ko pata hai form submit ho raha hai — bina props ke!




// // React 18 — props pass karne parte the
// <SubmitButton isPending={isPending} />  // 😫

// // React 19 — useFormStatus ✅
// function SubmitButton() {
//   const { pending } = useFormStatus();
//   // Parent form ka status automatically pata hai!
//   return <button disabled={pending}>Submit</button>;
// }



























import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

// Reusable Submit Button — form ka status khud jaanta hai!
function SubmitButton({ label = 'Submit' }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        background: pending ? '#93C5FD' : '#2563EB',
        color: 'white',
        padding: '10px 24px',
        border: 'none',
        borderRadius: '8px',
        cursor: pending ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      {pending && (
        <span style={{
          width: '16px', height: '16px',
          border: '2px solid white',
          borderTop: '2px solid transparent',
          borderRadius: '50%',
          display: 'inline-block',
          animation: 'spin 1s linear infinite'
        }} />
      )}
      {pending ? 'Processing...' : label}
    </button>
  );
}

// Fake login
async function fakeLogin(prevState, formData) {
  await new Promise(r => setTimeout(r, 2000));

  const email    = formData.get('email');
  const password = formData.get('password');

  if (email === 'mateen@gmail.com' && password === '12345678') {
    return { success: true, user: email, error: null };
  }
  return { success: false, user: null, error: 'Email ya password galat hai!' };
}

function UseFormStatus() {
  const [state, formAction] = useActionState(fakeLogin, {
    success: false, user: null, error: null
  });

  return (
    <div>
      <h2>useFormStatus Demo</h2>

      <div style={{ background: '#EFF6FF', padding: '12px',
        borderRadius: '8px', marginBottom: '15px' }}>
        <p>💡 Test karo: mateen@gmail.com / 12345678</p>
      </div>

      <form action={formAction} style={{
        border: '2px solid #7C3AED',
        borderRadius: '10px',
        padding: '20px',
        maxWidth: '400px'
      }}>
        <h3>Login Form</h3>

        <div style={{ marginBottom: '12px' }}>
          <input
            name="email"
            type="email"
            placeholder="Email..."
            defaultValue="mateen@gmail.com"
            style={{ padding: '8px', width: '100%',
              borderRadius: '6px', border: '1px solid #ddd' }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <input
            name="password"
            type="password"
            placeholder="Password..."
            defaultValue="12345678"
            style={{ padding: '8px', width: '100%',
              borderRadius: '6px', border: '1px solid #ddd' }}
          />
        </div>

        {/* Reusable button — pending khud jaanta hai! */}
        <SubmitButton label="Login" />
      </form>

      {state.error && (
        <div style={{ marginTop: '12px', background: '#FEE2E2',
          padding: '12px', borderRadius: '8px' }}>
          ❌ {state.error}
        </div>
      )}

      {state.success && (
        <div style={{ marginTop: '12px', background: '#DCFCE7',
          padding: '12px', borderRadius: '8px' }}>
          ✅ Welcome! {state.user}
        </div>
      )}
    </div>
  );
}

export default UseFormStatus;