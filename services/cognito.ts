import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js'
import * as AWSglobal from 'aws-sdk/global'

const AWS: any = AWSglobal

var authenticationData = {
  Username: 'username',
  Password: 'Password1@',
}

var authenticationDetails = new AuthenticationDetails(authenticationData)
var poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_UserPoolId,
  ClientId: process.env.NEXT_PUBLIC_ClientId,
}

var userPool = new CognitoUserPool(poolData)
var userData = {
  Username: 'username',
  Pool: userPool,
}

var cognitoUser = new CognitoUser(userData)

cognitoUser.authenticateUser(authenticationDetails, {
  onSuccess: function (result) {
    var accessToken = result.getAccessToken().getJwtToken()

    //POTENTIAL: Region needs to be set if not already set previously elsewhere.
    AWS.config.region = 'us-east-1'

    const cognitoIdp = `cognito-idp.us-east-1.amazonaws.com/${process.env.NEXT_PUBLIC_UserPoolId}`

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: process.env.NEXT_PUBLIC_IdentityPoolId, // your identity pool id here
      Logins: {
        // Change the key below according to the specific region your user pool is in.
        cognitoIdp: result.getIdToken().getJwtToken(),
      },
    })
    //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
    AWS.config.credentials.refresh((error) => {
      if (error) {
        console.error(error)
      } else {
        // Instantiate aws sdk service objects now that the credentials have been updated.
        // example: var s3 = new AWS.S3();
        console.log('Successfully logged!')

        cognitoUser.getUserAttributes(function (err, result) {
          if (err) {
            console.log(err.message)
            return
          }
          for (let i = 0; i < result.length; i++) {
            console.log(
              'attribute ' +
                result[i].getName() +
                ' has value ' +
                result[i].getValue()
            )
          }
        })

        cognitoUser.getSession((err, session) => {
          if (err) {
            console.log(err)
            return
          }

          console.log('session validity: ' + session.isValid())
          console.log(JSON.stringify(session.getIdToken(), null, 2))
        })
      }
    })
  },

  onFailure: function (err) {
    alert(err.message || JSON.stringify(err))
  },
})
