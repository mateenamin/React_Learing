import { useState }          from 'react';
import { useForm }           from 'react-hook-form';
import { z }                 from 'zod';
import { zodResolver }       from '@hookform/resolvers/zod';

// ── Styles ────────────────────────────────
const box = (color = '#EFF6FF') => ({
  background: color, borderRadius: '10px',
  padding: '16px', marginBottom: '16px',
  border: '1px solid #E2E8F0',
});

const btn = (color = '#2563EB') => ({
  background: color, color: 'white',
  border: 'none', borderRadius: '6px',
  padding: '8px 16px', cursor: 'pointer',
  marginTop: '8px', width: '100%',
  fontSize: '15px', fontWeight: 'bold',
});

// Reusable Input
function Input({ label, register, error, type = 'text', placeholder }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <label style={{ display: 'block', marginBottom: '4px',
        fontWeight: 'bold', fontSize: '14px', color: '#1A1A2E' }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        style={{
          padding: '9px 12px', width: '100%',
          borderRadius: '7px', fontSize: '14px',
          border: `2px solid ${error ? '#DC2626' : '#E2E8F0'}`,
          outline: 'none', boxSizing: 'border-box',
          background: error ? '#FFF5F5' : 'white',
        }}
      />
      {error && (
        <p style={{ color: '#DC2626', fontSize: '12px',
          margin: '4px 0 0' }}>
          ⚠️ {error}
        </p>
      )}
    </div>
  );
}

// ══════════════════════════════════════════
// PART 1 — Controlled Form
// ══════════════════════════════════════════
function ControlledFormDemo() {
  const [form, setForm] = useState({
    name: '', email: '', password: ''
  });
  const [errors,  setErrors]  = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Error clear karo jab likhna shuru karo
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim())
      newErrors.name = 'Naam zaroori hai';
    else if (form.name.length < 2)
      newErrors.name = 'Naam 2 characters se zyada hona chahiye';

    if (!form.email.trim())
      newErrors.email = 'Email zaroori hai';
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = 'Email sahi format mein nahi';

    if (!form.password)
      newErrors.password = 'Password zaroori hai';
    else if (form.password.length < 6)
      newErrors.password = 'Password 6 characters se zyada hona chahiye';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSuccess(true);
    setForm({ name: '', email: '', password: '' });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div style={box('#EFF6FF')}>
      <h3>1️⃣ Controlled Form</h3>
      <p style={{ color: '#666', fontSize: '13px',
        marginBottom: '12px' }}>
        React state se control — khud validation likhna
      </p>

      {success && (
        <div style={{ background: '#DCFCE7', color: '#16A34A',
          padding: '10px', borderRadius: '8px',
          marginBottom: '12px', fontWeight: 'bold' }}>
          ✅ Form submit ho gaya!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          label="Naam"
          register={{
            name: 'name',
            value: form.name,
            onChange: handleChange,
          }}
          error={errors.name}
          placeholder="Apna naam likho..."
        />
        <Input
          label="Email"
          type="email"
          register={{
            name: 'email',
            value: form.email,
            onChange: handleChange,
          }}
          error={errors.email}
          placeholder="Email likho..."
        />
        <Input
          label="Password"
          type="password"
          register={{
            name: 'password',
            value: form.password,
            onChange: handleChange,
          }}
          error={errors.password}
          placeholder="Password likho..."
        />
        <button type="submit" style={btn()}>
          Submit
        </button>
      </form>

      {/* Code note */}
      <div style={{ background: '#1E293B', padding: '10px',
        borderRadius: '8px', marginTop: '12px',
        fontSize: '12px', color: '#94A3B8',
        fontFamily: 'monospace' }}>
        <p style={{ margin: '2px 0', color: '#F87171' }}>
          // Problem — zyada code
        </p>
        <p style={{ margin: '2px 0' }}>
          useState × 3 + validate() + errors object
        </p>
        <p style={{ margin: '2px 0', color: '#86EFAC' }}>
          // React Hook Form se yeh sab easy hoga ✅
        </p>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
// PART 2 — React Hook Form
// ══════════════════════════════════════════
function RHFDemo() {
  const [submitted, setSubmitted] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    // Fake API delay
    await new Promise(r => setTimeout(r, 1000));
    setSubmitted(data);
    reset();
  };

  // watch — live value dekho
  const nameValue = watch('name', '');

  return (
    <div style={box('#F0FDF4')}>
      <h3>2️⃣ React Hook Form</h3>
      <p style={{ color: '#666', fontSize: '13px',
        marginBottom: '12px' }}>
        Performance better — kam code — built-in validation
      </p>

      {/* RHF vs Controlled */}
      <div style={{ background: '#1E293B', padding: '10px',
        borderRadius: '8px', marginBottom: '12px',
        fontSize: '12px', color: '#94A3B8',
        fontFamily: 'monospace' }}>
        <p style={{ margin: '2px 0', color: '#60A5FA' }}>
          // register — input ko RHF se connect karo
        </p>
        <p style={{ margin: '2px 0' }}>
          {'<input {...register("name", { required: "..." })} />'}
        </p>
        <p style={{ margin: '2px 0', color: '#60A5FA' }}>
          // handleSubmit — sirf valid data aayega
        </p>
        <p style={{ margin: '2px 0' }}>
          {'<form onSubmit={handleSubmit(onSubmit)}>'}
        </p>
      </div>

      {submitted && (
        <div style={{ background: '#DCFCE7', padding: '10px',
          borderRadius: '8px', marginBottom: '12px' }}>
          <p style={{ color: '#16A34A', fontWeight: 'bold',
            margin: '0 0 4px' }}>
            ✅ Submitted!
          </p>
          <p style={{ margin: '2px 0', fontSize: '13px' }}>
            Name: {submitted.name}
          </p>
          <p style={{ margin: '2px 0', fontSize: '13px' }}>
            Email: {submitted.email}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px',
            fontWeight: 'bold', fontSize: '14px' }}>
            Naam {nameValue && (
              <span style={{ color: '#666', fontWeight: 'normal',
                fontSize: '12px' }}>
                — typing: "{nameValue}"
              </span>
            )}
          </label>
          <input
            placeholder="Naam likho..."
            {...register('name', {
              required:  'Naam zaroori hai',
              minLength: { value: 2, message: '2 chars se zyada' },
            })}
            style={{ padding: '9px', width: '100%',
              borderRadius: '7px', fontSize: '14px',
              border: `2px solid ${errors.name ? '#DC2626' : '#E2E8F0'}`,
              boxSizing: 'border-box' }}
          />
          {errors.name && (
            <p style={{ color: '#DC2626', fontSize: '12px',
              margin: '4px 0 0' }}>
              ⚠️ {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px',
            fontWeight: 'bold', fontSize: '14px' }}>
            Email
          </label>
          <input
            type="email"
            placeholder="Email likho..."
            {...register('email', {
              required: 'Email zaroori hai',
              pattern: {
                value:   /\S+@\S+\.\S+/,
                message: 'Email sahi format mein nahi',
              },
            })}
            style={{ padding: '9px', width: '100%',
              borderRadius: '7px', fontSize: '14px',
              border: `2px solid ${errors.email ? '#DC2626' : '#E2E8F0'}`,
              boxSizing: 'border-box' }}
          />
          {errors.email && (
            <p style={{ color: '#DC2626', fontSize: '12px',
              margin: '4px 0 0' }}>
              ⚠️ {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px',
            fontWeight: 'bold', fontSize: '14px' }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Password likho..."
            {...register('password', {
              required:  'Password zaroori hai',
              minLength: { value: 6, message: '6 chars se zyada' },
            })}
            style={{ padding: '9px', width: '100%',
              borderRadius: '7px', fontSize: '14px',
              border: `2px solid ${errors.password ? '#DC2626' : '#E2E8F0'}`,
              boxSizing: 'border-box' }}
          />
          {errors.password && (
            <p style={{ color: '#DC2626', fontSize: '12px',
              margin: '4px 0 0' }}>
              ⚠️ {errors.password.message}
            </p>
          )}
        </div>

        <button type="submit"
          disabled={isSubmitting}
          style={btn(isSubmitting ? '#93C5FD' : '#16A34A')}>
          {isSubmitting ? '⏳ Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

// ══════════════════════════════════════════
// PART 3 — RHF + Zod
// ══════════════════════════════════════════

// Zod Schema — validation rules
const registerSchema = z.object({
  name: z.string()
    .min(1,  'Naam zaroori hai')
    .min(2,  'Naam 2 chars se zyada hona chahiye')
    .max(50, 'Naam 50 chars se zyada nahi'),

  email: z.string()
    .min(1,    'Email zaroori hai')
    .email('Email sahi format mein nahi'),

  phone: z.string()
    .min(1,   'Phone zaroori hai')
    .regex(/^[0-9]{11}$/, 'Phone 11 numbers ka hona chahiye'),

  password: z.string()
    .min(1, 'Password zaroori hai')
    .min(8, 'Password 8 chars se zyada hona chahiye'),

  confirmPassword: z.string()
    .min(1, 'Password confirm karo'),

  age: z.number({
    invalid_type_error: 'Age number hona chahiye',
  }).min(18, 'Age 18+ honi chahiye')
    .max(100, 'Age 100 se kam honi chahiye'),

  role: z.enum(['user', 'admin', 'moderator'], {
    errorMap: () => ({ message: 'Role select karo' }),
  }),

  terms: z.boolean()
    .refine(val => val === true, 'Terms accept karo'),

}).refine(
  data => data.password === data.confirmPassword,
  {
    message: 'Passwords match nahi karte',
    path:    ['confirmPassword'],
  }
);

function ZodDemo() {
  const [submitted, setSubmitted] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'user', terms: false, age: 18 },
  });

  const onSubmit = async (data) => {
    await new Promise(r => setTimeout(r, 1000));
    setSubmitted(data);
    reset();
  };

  const fieldStyle = (error) => ({
    padding: '9px', width: '100%',
    borderRadius: '7px', fontSize: '14px',
    border: `2px solid ${error ? '#DC2626' : '#E2E8F0'}`,
    boxSizing: 'border-box',
    background: error ? '#FFF5F5' : 'white',
  });

  const errorText = (error) => error && (
    <p style={{ color: '#DC2626', fontSize: '12px',
      margin: '4px 0 0' }}>
      ⚠️ {error.message}
    </p>
  );

  const label = (text) => (
    <label style={{ display: 'block', marginBottom: '4px',
      fontWeight: 'bold', fontSize: '14px', color: '#1A1A2E' }}>
      {text}
    </label>
  );

  return (
    <div style={box('#F5F3FF')}>
      <h3>3️⃣ React Hook Form + Zod</h3>
      <p style={{ color: '#666', fontSize: '13px',
        marginBottom: '12px' }}>
        Zod schema — validation rules ek jagah — type safe ✅
      </p>

      {/* Zod Schema code */}
      <div style={{ background: '#1E293B', padding: '10px',
        borderRadius: '8px', marginBottom: '12px',
        fontSize: '12px', color: '#94A3B8',
        fontFamily: 'monospace' }}>
        <p style={{ margin: '2px 0', color: '#60A5FA' }}>
          // Zod Schema — rules ek jagah
        </p>
        <p style={{ margin: '2px 0' }}>
          const schema = z.object {'({'}
        </p>
        <p style={{ margin: '2px 0', paddingLeft: '12px' }}>
          name: z.string().min(2, 'Error msg'),
        </p>
        <p style={{ margin: '2px 0', paddingLeft: '12px' }}>
          email: z.string().email('Error msg'),
        </p>
        <p style={{ margin: '2px 0', paddingLeft: '12px' }}>
          age: z.number().min(18, 'Error msg'),
        </p>
        <p style={{ margin: '2px 0' }}>{'})'}</p>
      </div>

      {submitted && (
        <div style={{ background: '#DCFCE7', padding: '12px',
          borderRadius: '8px', marginBottom: '12px' }}>
          <p style={{ color: '#16A34A', fontWeight: 'bold',
            margin: '0 0 8px' }}>
            ✅ Registration Complete!
          </p>
          {Object.entries(submitted)
            .filter(([k]) => k !== 'password' &&
                             k !== 'confirmPassword')
            .map(([k, v]) => (
              <p key={k} style={{ margin: '2px 0',
                fontSize: '13px' }}>
                <strong>{k}:</strong> {String(v)}
              </p>
            ))
          }
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Name */}
        <div style={{ marginBottom: '12px' }}>
          {label('Naam *')}
          <input placeholder="Naam likho..."
            {...register('name')}
            style={fieldStyle(errors.name)} />
          {errorText(errors.name)}
        </div>

        {/* Email */}
        <div style={{ marginBottom: '12px' }}>
          {label('Email *')}
          <input type="email" placeholder="Email likho..."
            {...register('email')}
            style={fieldStyle(errors.email)} />
          {errorText(errors.email)}
        </div>

        {/* Phone */}
        <div style={{ marginBottom: '12px' }}>
          {label('Phone *')}
          <input placeholder="03001234567"
            {...register('phone')}
            style={fieldStyle(errors.phone)} />
          {errorText(errors.phone)}
        </div>

        {/* Age */}
        <div style={{ marginBottom: '12px' }}>
          {label('Age *')}
          <input type="number"
            {...register('age', { valueAsNumber: true })}
            style={fieldStyle(errors.age)} />
          {errorText(errors.age)}
        </div>

        {/* Role */}
        <div style={{ marginBottom: '12px' }}>
          {label('Role *')}
          <select {...register('role')}
            style={{ ...fieldStyle(errors.role), cursor: 'pointer' }}>
            <option value="">-- Select Role --</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
          </select>
          {errorText(errors.role)}
        </div>

        {/* Password */}
        <div style={{ marginBottom: '12px' }}>
          {label('Password *')}
          <input type="password" placeholder="Password..."
            {...register('password')}
            style={fieldStyle(errors.password)} />
          {errorText(errors.password)}
        </div>

        {/* Confirm Password */}
        <div style={{ marginBottom: '12px' }}>
          {label('Confirm Password *')}
          <input type="password" placeholder="Dobara likho..."
            {...register('confirmPassword')}
            style={fieldStyle(errors.confirmPassword)} />
          {errorText(errors.confirmPassword)}
        </div>

        {/* Terms */}
        <div style={{ marginBottom: '16px',
          display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <input type="checkbox"
            {...register('terms')}
            style={{ marginTop: '2px', cursor: 'pointer',
              width: '16px', height: '16px' }} />
          <div>
            <label style={{ fontSize: '14px',
              cursor: 'pointer' }}>
              Terms & Conditions accept karta hoon *
            </label>
            {errorText(errors.terms)}
          </div>
        </div>

        <button type="submit"
          disabled={isSubmitting}
          style={btn(isSubmitting ? '#A78BFA' : '#7C3AED')}>
          {isSubmitting ? '⏳ Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

// ══════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════
function FormsPage() {
  return (
    <div style={{ padding: '20px',
      maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#EA580C', marginBottom: '4px' }}>
        📋 Forms
      </h1>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Controlled Forms, React Hook Form, Zod Validation
      </p>

      <ControlledFormDemo />
      <RHFDemo />
      <ZodDemo />
    </div>
  );
}

export default FormsPage;