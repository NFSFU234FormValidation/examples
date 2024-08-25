

import NFSFU234FormValidation from 'nfsfu234-form-validation-tester';
import 'nfsfu234-form-validation-tester/dist/css/nfsfu234FormValidation.min.css'
import { useState } from 'react';

const nfsfu234FormValidation = new NFSFU234FormValidation();

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: {
      city: '',
      street: '',
      number: '',
      zipcode: '',
      geolocation: {
        lat: '',
        long: ''
      }
    },
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      // Handle nested fields like address.city, address.geolocation.lat, etc.
      const [parentKey, childKey] = name.split('.');
      setFormData({
        ...formData,
        [parentKey]: {
          ...formData[parentKey],
          [childKey]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const signupForm = e.target;
    const submitBtn = signupForm.querySelector("button[type=submit]");

    nfsfu234FormValidation.loading('Loading...', submitBtn);

    nfsfu234FormValidation.validate(e.target, (response) => {
      const { message, type } = response;

      const errorDetails = {
        type: 'modal',
        message: 'An Error Occured',
        duration: 5000,
        element: signupForm,
        success: false,
      };

      if (message === "success" && type === "success") {
        if (!nfsfu234FormValidation.isOnline()) {
          errorDetails.message = "Your device seems to be offline. Check your internet connection and try again.";
          nfsfu234FormValidation.displayError(errorDetails);
          nfsfu234FormValidation.loading("Sign Up", submitBtn);
          return false;
        }

        const doesPasswordMatch = nfsfu234FormValidation.verifyPassword(formData.password, formData.confirmPassword);

        doesPasswordMatch.then(resp => {
          if (!resp) {
            errorDetails.message = "Passwords do not match";
            nfsfu234FormValidation.displayError(errorDetails);
            nfsfu234FormValidation.loading("Sign Up", submitBtn);
            return false;
          }

          const AJAXOptions = {
            url: 'https://fakestoreapi.com/users',
            RequestMethod: 'POST',
            RequestHeader: {
              'Content-Type': 'application/json',
            },
            // RequestBody: JSON.stringify(userData)
            RequestBody: nfsfu234FormValidation.getFormDetails(signupForm)
          };

          nfsfu234FormValidation.ajax(AJAXOptions)
            .then((response) => {
              console.log('Request successful', response);

              const message = response.message || 'Account created successfully';

              errorDetails.message = message;
              errorDetails.success = true;

              nfsfu234FormValidation.displayError(errorDetails);
              nfsfu234FormValidation.loading("Sign Up", submitBtn);
              nfsfu234FormValidation.reset();
            })
            .catch((error) => {
              console.error('Request failed', error);
              const message = error.message || 'An Error Occurred';
              errorDetails.message = message;

              nfsfu234FormValidation.displayError(errorDetails);
              nfsfu234FormValidation.loading("Sign Up", submitBtn);
            });
        });
      }
      else
      {
        nfsfu234FormValidation.loading("Sign Up", submitBtn);
      }
    });
  };

  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-5xl h- w-full bg-white rounded-2xl shadow-2xl overflow-hidden overflow-y-auto">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-cover bg-center h-64 md:h-auto hidden md:block" style={{ backgroundImage: "url('https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
            <div className="h-full bg-black bg-opacity-50 flex items-center justify-center p-12">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-4">Gourmet Delights</h2>
                <p className="text-xl text-white">Experience culinary excellence</p>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 p-8 md:p-12 h-[95vh] overflow-y-auto">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Create Account</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out js-required"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out js-required"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out js-required"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out js-required"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  id="city"
                  name="address.city"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="City"
                  value={formData.address.city}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  id="street"
                  name="address.street"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="Street"
                  value={formData.address.street}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  id="number"
                  name="address.number"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="House Number"
                  value={formData.address.number}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  id="zipcode"
                  name="address.zipcode"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="Zipcode"
                  value={formData.address.zipcode}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  id="lat"
                  name="address.geolocation.lat"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="Latitude"
                  value={formData.address.geolocation.lat}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  id="long"
                  name="address.geolocation.long"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="Longitude"
                  value={formData.address.geolocation.long}
                  onChange={handleChange}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                >
                  Sign up
                </button>
              </div>
            </form>
            <div className="text-center w-full text-sm text-gray-600 mt-4">
              Created by <a href="https://nforshifu234dev.vercel.app/" target='_blank' rel="noopener noreferrer" className="font-bold hover:underline">NFORSHIFU234 Dev 🖤👨🏾‍💻</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
