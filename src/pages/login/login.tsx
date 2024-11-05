import React from 'react'

export default function login() {
  return (
    <>
        <p>login</p>

        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Log in</button>

        <label htmlFor="rememberMe">
            Remember me
        </label>

        <input type="checkbox" id="rememberMe"/>
        
        <a href="/forget-password">Forget password</a>
    </>
  )
}
