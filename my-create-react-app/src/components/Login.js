// import React, { useState } from 'react';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch('/api/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();
//     console.log(data);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-80">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               className="w-full px-3 py-2 border rounded"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               className="w-full px-3 py-2 border rounded"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import NFSFU234FormValidation from 'nfsfu234-form-validation-tester';
import 'nfsfu234-form-validation-tester/dist/css/nfsfu234FormValidation.min.css'

const nfsfu234formValidation = new NFSFU234FormValidation();

const SignupComponent = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    agreeToTerms: false,
    newsletterSubscription: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const signupForm = e.target;
    const submitBtn = signupForm.querySelector("button[type=submit]") || signupForm.querySelector("input[type=submit]");

    nfsfu234formValidation.loading('Loading...', submitBtn);

    nfsfu234formValidation.validate(signupForm, (resp) => {

        const { message, type, data } = resp;

        const errorDetails = {
            type: 'modal',
            message: 'An Error Occured',
            duration: 5000,
            element: signupForm,
            success: false,
        };

        if ( message !== "success" )
        {
            nfsfu234formValidation.loading("Sign Up", submitBtn);
            return false;
        }

        if (!nfsfu234formValidation.isOnline()) {
            errorDetails.message = "Your device seems to be offline. Check your internet connection and try again.";
            nfsfu234formValidation.displayError(errorDetails);
            nfsfu234formValidation.loading("Sign Up", submitBtn);
            return false;
        }

        const formData = nfsfu234formValidation.getFormDetails(signupForm);
        const doesPasswordMatch = nfsfu234formValidation.verifyPassword(formData.password, formData.confirmPassword);

        doesPasswordMatch.then(resp => {

            doesPasswordMatch.then(resp => {
                if (!resp) {
                  errorDetails.message = "Passwords do not match";
                  nfsfu234formValidation.displayError(errorDetails);
                  nfsfu234formValidation.loading("Sign Up", submitBtn);
                  return false;
                }
      
                const AJAXOptions = {
                  url: 'https://fakestoreapi.com/users',
                  RequestMethod: 'POST',
                  RequestHeader: {
                    'Content-Type': 'application/json',
                  },
                  RequestBody: nfsfu234formValidation.getFormDetails(signupForm)
                };
      
                nfsfu234formValidation.ajax(AJAXOptions)
                  .then((response) => {
                    console.log('Request successful', response);
      
                    const message = response.message || 'Account created successfully';
      
                    errorDetails.message = message;
                    errorDetails.success = true;
      
                    nfsfu234formValidation.displayError(errorDetails);
                    nfsfu234formValidation.loading("Sign Up", submitBtn);
                    nfsfu234formValidation.reset();
                  })
                  .catch((error) => {
                    console.error('Request failed', error);
                    const message = error.message || error || 'An Error Occurred';
                    errorDetails.message = message;
      
                    nfsfu234formValidation.displayError(errorDetails);
                    nfsfu234formValidation.loading("Sign Up", submitBtn);
                  });
              });

        });

    });

  };

  return (
    <form id="signupForm" onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md flex flex-wrap gap-2 gap-x-6">
      <h2 className="text-2xl font-bold mb-6 w-full">Sign Up</h2>

      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formValues.username}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm 
          js-required"
          placeholder="Username"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formValues.password}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
          js-required"
          placeholder="Password"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={formValues.confirmPassword}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
          js-required"
          placeholder="Confirm Password"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formValues.email}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
          js-required"
          placeholder="Email"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={formValues.firstName}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="First Name"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={formValues.lastName}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Last Name"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="text"
          name="phone"
          id="phone"
          value={formValues.phone}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Phone"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="address.street" className="block text-sm font-medium text-gray-700">Street</label>
        <input
          type="text"
          name="address.street"
          id="address.street"
          value={formValues.address.street}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Street"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="address.city" className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          name="address.city"
          id="address.city"
          value={formValues.address.city}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="City"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="address.state" className="block text-sm font-medium text-gray-700">State</label>
        <input
          type="text"
          name="address.state"
          id="address.state"
          value={formValues.address.state}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="State"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="address.zipCode" className="block text-sm font-medium text-gray-700">Zip Code</label>
        <input
          type="text"
          name="address.zipCode"
          id="address.zipCode"
          value={formValues.address.zipCode}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Zip Code"
        />
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          name="agreeToTerms"
          id="agreeToTerms"
          checked={formValues.agreeToTerms}
          onChange={e => setFormValues({ ...formValues, agreeToTerms: e.target.checked })}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded 
          js-required"
        />
        <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700 ">Agree to Terms and Conditions</label>
      </div>

      <div className="mb-6 flex items-center">
        <input
          type="checkbox"
          name="newsletterSubscription"
          id="newsletterSubscription"
          checked={formValues.newsletterSubscription}
          onChange={e => setFormValues({ ...formValues, newsletterSubscription: e.target.checked })}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="newsletterSubscription" className="ml-2 block text-sm text-gray-700">Subscribe to Newsletter</label>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupComponent;
