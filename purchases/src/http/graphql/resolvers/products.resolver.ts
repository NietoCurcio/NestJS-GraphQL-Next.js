import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from '../../../services/products.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CreateProductInput } from '../inputs/create-product-input';
import { Product } from '../models/product';

@Resolver()
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  // Typescript is Product[] or Array<Product>, in GraphQL is [Product]
  @Query(() => [Product])
  // @UseGuards(AuthorizationGuard)
  products() {
    return this.productsService.listAllProducts();
  }

  @Mutation(() => Product)
  @UseGuards(AuthorizationGuard)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.productsService.createProduct(data);
  }
}
