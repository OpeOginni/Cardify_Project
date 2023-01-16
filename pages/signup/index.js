import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Signup() {
  //if (signupForm)
  useEffect(() => {
    const signupForm = document.querySelector('#signupForm');
    signupForm.addEventListener('submit', async (e) => {
      const name = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const passwordConfirm = document.getElementById('passwordConfirm').value;
      e.preventDefault();

      try {
        const res = await axios
          .post(`http://127.0.0.1:3000/api/v1/users/signup`, {
            name: name,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm,
          })
          .then((res) => {
            console.log(res);
            if (res.status == 201) {
              window.location.assign('/');
              // return alert('Signed Up Successfuly');
            } else {
              alert('ERROR');
            }
          });
      } catch (err) {
        alert(err.message);
        // alert(err.message);
      }
    });
  }, []);

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Image
              className="mx-auto h-25 w-auto"
              src="/cardify-logo.png"
              alt="Cardify Logo"
              width="100"
              height="100"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create a new account
            </h2>
          </div>
          <form className="mt-8 space-y-6" id="signupForm">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="username" className="sr-only">
                  Full Name
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="text"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-project-pink focus:outline-none focus:ring-project-pink sm:text-sm"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-project-pink focus:outline-none focus:ring-project-pink sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-project-pink focus:outline-none focus:ring-project-pink sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="passwordConfirm" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  autoComplete="current-password-confirm"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-project-pink focus:outline-none focus:ring-project-pink sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-project-ruby py-2 px-4 text-sm font-medium text-white hover:bg-project-ruby/70 focus:outline-none focus:ring-2 focus:ring-project-pink focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
