import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'node:util';
import { CognitoJwtVerifier } from 'aws-jwt-verify'; // AWS Cognito

@Injectable()
export class AuthorizationGuard implements CanActivate {
  /*
  Auth 0
  private AUTH0_AUDIENCE: string;
  private AUTH0_DOMAIN: string;
  */

  constructor(private configService: ConfigService) {
    /*
    Auth 0
    this.AUTH0_AUDIENCE = this.configService.get('AUTH0_AUDIENCE') ?? '';
    this.AUTH0_DOMAIN = this.configService.get('AUTH0_DOMAIN') ?? '';
    */
  }

  async canActivate(context: ExecutionContext) {
    /* 
      this is for REST architecture
      const httpContext = context.switchToHttp();
      const req = httpContext.getRequest();
      const res = httpContext.getResponse();
    */

    const { req, res } = GqlExecutionContext.create(context).getContext();

    // AWS Cognito
    const verifier = CognitoJwtVerifier.create({
      userPoolId: process.env.COGNITO_USERPOOLID,
      tokenUse: 'access',
      clientId: process.env.COGNITO_CLIENTID,
    });

    const accessToken = req.headers.authorization?.split(' ')[1];

    try {
      const payload = await verifier.verify(accessToken);
      // console.log('Token is valid. Payload:', payload);
      req.user = payload;
      return true;
    } catch (err) {
      console.log('Token not valid!');
      throw new UnauthorizedException(err);
    }

    /*
    Auth0

    const checkJWT = promisify(
      jwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json`,
        }),
        audience: this.AUTH0_AUDIENCE,
        issuer: this.AUTH0_DOMAIN,
        algorithms: ['RS256'],
      }),
    );

    try {
      await checkJWT(req, res);
      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }

    */
  }
}
