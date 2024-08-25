// import { useEffect, useState } from 'react'
import './App.css';
import SignupForm from './components/SignupForm';
// import NFSFU234FormValidation from 'nfsfu234-form-validation-tester'

function App() {
  // const [isEmail, setIsEmail] = useState(false)
  // const email = useState("someone@domain.com");

  // useEffect( ()=>{

  //   const nfsfu234FormValidation = new NFSFU234FormValidation();


  //   setIsEmail( nfsfu234FormValidation.isEmail(email) );


  // }, [] )

        {/* <h1>Email Validation Test</h1>
      <p>Is <mark>&quot;{email}&quot;</mark> a valid email? <mark> {isEmail ? 'Yes' : 'No'} </mark></p> */}

  return (
    <div className='App bg-white'>
      <SignupForm />
    </div>
  )
}

export default App
