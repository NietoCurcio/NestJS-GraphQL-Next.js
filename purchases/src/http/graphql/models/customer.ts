import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Purchase } from './purchase';

// 'User' is a common name in Purchases and Classroom
@ObjectType('User')
@Directive('@key(fields: "authUserId")')
export class Customer {
  id: string;

  // this is the key (authUserId) in common between
  // the two entities that represents the same
  // thing for the front-end (Customer and Student in the microservices)
  @Field(() => ID)
  authUserId: string;

  @Field(() => [Purchase])
  purchases: Purchase;
}
