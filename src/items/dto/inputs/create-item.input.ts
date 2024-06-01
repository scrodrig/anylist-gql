import { Field, Float, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreateItemInput {
  @Field(() => String, { description: 'The name of the item' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => Float, { description: 'The quantity of the item' })
  @IsPositive()
  quantity: number;

  @Field(() => String, { description: 'Units of the quantity', nullable: true })
  @IsString()
  @IsOptional()
  quantityUnits?: string;
}
