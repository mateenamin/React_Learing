
// Concept 1 — Controlled Form
// jsx// React state se value control hoti hai
// const [name, setName] = useState('');

// <input
//   value={name}                          // state se value
//   onChange={e => setName(e.target.value)} // state update
// />


// ## Concept 2 — Validation — Kya Hai?

// User ne form submit kiya
// → Check karo data sahi hai?
// → Name empty nahi?
// → Email sahi format mein hai?
// → Password 8 characters se zyada hai?
// → Sab sahi → Submit ✅
// → Galat   → Error dikhao ❌





// Concept 3 — React Hook Form
// Simple matlab: Form ka data, validation, submit — sab easy
// jsx// Bina RHF — zyada code 😫
// const [name,  setName]  = useState('');
// const [email, setEmail] = useState('');
// const [nameError, setNameError] = useState('');

// // RHF ke saath — clean! ✅
// const { register, handleSubmit,
//         formState: { errors } } = useForm();

// <input {...register('name', { required: 'Naam zaroori hai' })} />



// Concept 4 — Zod
// Simple matlab: Validation rules ek jagah define karo
// jsxconst schema = z.object({
//   name:     z.string().min(2, 'Naam 2 chars se zyada'),
//   email:    z.string().email('Email sahi nahi'),
//   password: z.string().min(8, 'Password 8 chars se zyada'),
//   age:      z.number().min(18, 'Age 18+ honi chahiye'),
// });



















// 1️⃣ Controlled Forms (Beginner)

// React ka basic form pattern controlled component hota hai.

// Matlab:

// Input ka value React state se control hota hai.

// Example:


import { useState } from "react";

function Form() {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;


// Learn in Controlled Forms

// value

// onChange

// onSubmit

// preventDefault()

// Multiple inputs






// 2️⃣ React Hook Form (Modern Approach)

// Large apps me React Hook Form use hota hai.

// Advantages:

// Fast performance

// Less re-render

// Simple validation

// Clean code

// Install:

// npm install react-hook-form

// Example:

import { useForm } from "react-hook-form";

function Form() {

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      <input {...register("password")} />

      <button type="submit">Submit</button>
    </form>
  );
}







// 3️⃣ Validation with Zod

// Zod ek schema validation library hai.

// Install:

// npm install zod @hookform/resolvers

// Example:

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

function Form() {

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      <input {...register("password")} />

      <button type="submit">Submit</button>
    </form>
  );
}


