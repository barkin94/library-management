import { Entity, PrimaryKey } from "@mikro-orm/core";
import { ulid } from 'ulid';

@Entity({ abstract: true })
export abstract class BaseEntity {

  @PrimaryKey()
  id = ulid(); 
}
