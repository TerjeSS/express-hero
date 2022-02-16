import React from 'react'

const Signin = () => {
  return (
    <div>
        <h1>Sign in</h1>
        <form action="/login" method="post">
            <div><label htmlFor="username">Username <input type="text" name="username"/></label></div>
            <div><label htmlFor="password">Password    </label><input type="password" name="password"/></div>
            <button>Log in</button>
        </form>
    </div>
  )
}

export default Signin;