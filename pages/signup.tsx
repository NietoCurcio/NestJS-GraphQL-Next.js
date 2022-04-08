import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
} from 'amazon-cognito-identity-js'
import { FormEvent, useState } from 'react'

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_UserPoolId,
  ClientId: process.env.NEXT_PUBLIC_ClientId,
}
const userPool = new CognitoUserPool(poolData)

export default function Cognito() {
  const [state, setState] = useState('')

  const signUp = () => {
    const dataEmail = {
      Name: 'email',
      Value: 'felipe_nieto010@hotmail.com',
    }

    const dataPhoneNumber = {
      Name: 'phone_number',
      Value: '+5521975453974',
    }
    const attributeEmail = new CognitoUserAttribute(dataEmail)
    const attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber)

    const attributeList = [attributeEmail, attributePhoneNumber]

    userPool.signUp(
      'username',
      'Password1@',
      attributeList,
      null,
      function (err, result) {
        if (err) {
          alert(err.message || JSON.stringify(err))
          return
        }
        var cognitoUser = result.user
        console.log('user name is ' + cognitoUser.getUsername())
      }
    )
  }

  const confirmRegistration = (e: FormEvent) => {
    e.preventDefault()

    const userData = {
      Username: 'username',
      Pool: userPool,
    }

    const cognitoUser = new CognitoUser(userData)

    cognitoUser.confirmRegistration(state, true, function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err))
        return
      }
      console.log('call result: ' + result)
    })
  }

  return (
    <>
      <button onClick={signUp}>Sign Up</button>
      <form onSubmit={confirmRegistration}>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}
