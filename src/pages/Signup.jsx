// src/pages/Signup.jsx
function Signup() {
    return (
      <div>
        <h1>Signup</h1>
        <form>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <button type="submit">Signup</button>
        </form>
      </div>
    );
  }
  
  export default Signup;