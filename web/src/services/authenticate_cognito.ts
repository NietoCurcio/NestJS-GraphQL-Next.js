import { Config, CognitoIdentityCredentials } from 'aws-sdk';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import * as AWSglobal from 'aws-sdk/global';
import { Console } from 'console';

export function authenticateUser(authenticationData2) {
  return new Promise((resolve, reject) => {
    var authenticationData = {
      Username: 'username',
      Password: 'Password1@',
    };

    const userPool = new CognitoUserPool({
      UserPoolId: process.env.NEXT_PUBLIC_USERPOOLID,
      ClientId: process.env.NEXT_PUBLIC_CLIENTID,
    });

    var userData = {
      Username: 'username',
      Pool: userPool,
    };

    var cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(
      new AuthenticationDetails(authenticationData),
      {
        onSuccess: function (result) {
          const accessToken = result.getAccessToken().getJwtToken();
          resolve(accessToken);
        },

        onFailure: function (err) {
          reject(err.message || JSON.stringify(err));
        },
      }
    );
  });
}
