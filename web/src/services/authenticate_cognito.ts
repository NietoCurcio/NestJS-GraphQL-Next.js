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
  UserPoolId: 'us-east-1_YY9GKypnw',
  ClientId: '7dhne5b8u5evajq5an99rp83o5',
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

    /*
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:26b06165-2744-42d8-8b9c-f5078d56795c', // your identity pool id here
      Logins: {
        // Change the key below according to the specific region your user pool is in.
        'cognito-idp.us-east-1.amazonaws.com/us-east-1_YY9GKypnw': result
          .getIdToken()
          .getJwtToken(),
      },
    })
    */

    // Initialize the Amazon Cognito credentials provider
    /*
    AWS.config.region = 'us-east-1' // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:d045ee27-686e-455d-803b-a7a1705cb805',
    })
    */

    AWS.config.credentials.refresh((error) => {
      if (error) {
        console.error(error)
      } else {
        console.log('Successfully logged!')

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
