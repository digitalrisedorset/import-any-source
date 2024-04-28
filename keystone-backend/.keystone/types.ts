/* eslint-disable */

type Scalars = {
  readonly ID: string
  readonly Boolean: boolean
  readonly String: string
  readonly Int: number
  readonly Float: number
  readonly JSON: import('@keystone-6/core/types').JSONValue
  readonly Decimal: import('@keystone-6/core/types').Decimal | string
}

export type AuthorWhereUniqueInput = {
  readonly id?: Scalars['ID'] | null
  readonly email?: Scalars['String'] | null
}

export type AuthorWhereInput = {
  readonly AND?: ReadonlyArray<AuthorWhereInput> | AuthorWhereInput | null
  readonly OR?: ReadonlyArray<AuthorWhereInput> | AuthorWhereInput | null
  readonly NOT?: ReadonlyArray<AuthorWhereInput> | AuthorWhereInput | null
  readonly id?: IDFilter | null
  readonly name?: StringFilter | null
  readonly email?: StringFilter | null
  readonly posts?: PostManyRelationFilter | null
  readonly createdAt?: DateTimeNullableFilter | null
}

export type IDFilter = {
  readonly equals?: Scalars['ID'] | null
  readonly in?: ReadonlyArray<Scalars['ID']> | Scalars['ID'] | null
  readonly notIn?: ReadonlyArray<Scalars['ID']> | Scalars['ID'] | null
  readonly lt?: Scalars['ID'] | null
  readonly lte?: Scalars['ID'] | null
  readonly gt?: Scalars['ID'] | null
  readonly gte?: Scalars['ID'] | null
  readonly not?: IDFilter | null
}

export type StringFilter = {
  readonly equals?: Scalars['String'] | null
  readonly in?: ReadonlyArray<Scalars['String']> | Scalars['String'] | null
  readonly notIn?: ReadonlyArray<Scalars['String']> | Scalars['String'] | null
  readonly lt?: Scalars['String'] | null
  readonly lte?: Scalars['String'] | null
  readonly gt?: Scalars['String'] | null
  readonly gte?: Scalars['String'] | null
  readonly contains?: Scalars['String'] | null
  readonly startsWith?: Scalars['String'] | null
  readonly endsWith?: Scalars['String'] | null
  readonly not?: NestedStringFilter | null
}

export type NestedStringFilter = {
  readonly equals?: Scalars['String'] | null
  readonly in?: ReadonlyArray<Scalars['String']> | Scalars['String'] | null
  readonly notIn?: ReadonlyArray<Scalars['String']> | Scalars['String'] | null
  readonly lt?: Scalars['String'] | null
  readonly lte?: Scalars['String'] | null
  readonly gt?: Scalars['String'] | null
  readonly gte?: Scalars['String'] | null
  readonly contains?: Scalars['String'] | null
  readonly startsWith?: Scalars['String'] | null
  readonly endsWith?: Scalars['String'] | null
  readonly not?: NestedStringFilter | null
}

export type PostManyRelationFilter = {
  readonly every?: PostWhereInput | null
  readonly some?: PostWhereInput | null
  readonly none?: PostWhereInput | null
}

export type DateTimeNullableFilter = {
  readonly equals?: any | null
  readonly in?: ReadonlyArray<any> | any | null
  readonly notIn?: ReadonlyArray<any> | any | null
  readonly lt?: any | null
  readonly lte?: any | null
  readonly gt?: any | null
  readonly gte?: any | null
  readonly not?: DateTimeNullableFilter | null
}

export type AuthorOrderByInput = {
  readonly id?: OrderDirection | null
  readonly name?: OrderDirection | null
  readonly email?: OrderDirection | null
  readonly createdAt?: OrderDirection | null
}

export type OrderDirection =
  | 'asc'
  | 'desc'

export type AuthorUpdateInput = {
  readonly name?: Scalars['String'] | null
  readonly email?: Scalars['String'] | null
  readonly posts?: PostRelateToManyForUpdateInput | null
  readonly createdAt?: any | null
}

export type PostRelateToManyForUpdateInput = {
  readonly disconnect?: ReadonlyArray<PostWhereUniqueInput> | PostWhereUniqueInput | null
  readonly set?: ReadonlyArray<PostWhereUniqueInput> | PostWhereUniqueInput | null
  readonly create?: ReadonlyArray<PostCreateInput> | PostCreateInput | null
  readonly connect?: ReadonlyArray<PostWhereUniqueInput> | PostWhereUniqueInput | null
}

export type AuthorUpdateArgs = {
  readonly where: AuthorWhereUniqueInput
  readonly data: AuthorUpdateInput
}

export type AuthorCreateInput = {
  readonly name?: Scalars['String'] | null
  readonly email?: Scalars['String'] | null
  readonly posts?: PostRelateToManyForCreateInput | null
  readonly createdAt?: any | null
}

export type PostRelateToManyForCreateInput = {
  readonly create?: ReadonlyArray<PostCreateInput> | PostCreateInput | null
  readonly connect?: ReadonlyArray<PostWhereUniqueInput> | PostWhereUniqueInput | null
}

export type PostWhereUniqueInput = {
  readonly id?: Scalars['ID'] | null
}

export type PostWhereInput = {
  readonly AND?: ReadonlyArray<PostWhereInput> | PostWhereInput | null
  readonly OR?: ReadonlyArray<PostWhereInput> | PostWhereInput | null
  readonly NOT?: ReadonlyArray<PostWhereInput> | PostWhereInput | null
  readonly id?: IDFilter | null
  readonly title?: StringFilter | null
  readonly author?: AuthorWhereInput | null
  readonly tags?: TagManyRelationFilter | null
}

export type TagManyRelationFilter = {
  readonly every?: TagWhereInput | null
  readonly some?: TagWhereInput | null
  readonly none?: TagWhereInput | null
}

export type PostOrderByInput = {
  readonly id?: OrderDirection | null
  readonly title?: OrderDirection | null
}

export type PostUpdateInput = {
  readonly title?: Scalars['String'] | null
  readonly content?: Scalars['JSON'] | null
  readonly author?: AuthorRelateToOneForUpdateInput | null
  readonly tags?: TagRelateToManyForUpdateInput | null
}

export type AuthorRelateToOneForUpdateInput = {
  readonly create?: AuthorCreateInput | null
  readonly connect?: AuthorWhereUniqueInput | null
  readonly disconnect?: Scalars['Boolean'] | null
}

export type TagRelateToManyForUpdateInput = {
  readonly disconnect?: ReadonlyArray<TagWhereUniqueInput> | TagWhereUniqueInput | null
  readonly set?: ReadonlyArray<TagWhereUniqueInput> | TagWhereUniqueInput | null
  readonly create?: ReadonlyArray<TagCreateInput> | TagCreateInput | null
  readonly connect?: ReadonlyArray<TagWhereUniqueInput> | TagWhereUniqueInput | null
}

export type PostUpdateArgs = {
  readonly where: PostWhereUniqueInput
  readonly data: PostUpdateInput
}

export type PostCreateInput = {
  readonly title?: Scalars['String'] | null
  readonly content?: Scalars['JSON'] | null
  readonly author?: AuthorRelateToOneForCreateInput | null
  readonly tags?: TagRelateToManyForCreateInput | null
}

export type AuthorRelateToOneForCreateInput = {
  readonly create?: AuthorCreateInput | null
  readonly connect?: AuthorWhereUniqueInput | null
}

export type TagRelateToManyForCreateInput = {
  readonly create?: ReadonlyArray<TagCreateInput> | TagCreateInput | null
  readonly connect?: ReadonlyArray<TagWhereUniqueInput> | TagWhereUniqueInput | null
}

export type TagWhereUniqueInput = {
  readonly id?: Scalars['ID'] | null
}

export type TagWhereInput = {
  readonly AND?: ReadonlyArray<TagWhereInput> | TagWhereInput | null
  readonly OR?: ReadonlyArray<TagWhereInput> | TagWhereInput | null
  readonly NOT?: ReadonlyArray<TagWhereInput> | TagWhereInput | null
  readonly id?: IDFilter | null
  readonly name?: StringFilter | null
  readonly posts?: PostManyRelationFilter | null
}

export type TagOrderByInput = {
  readonly id?: OrderDirection | null
  readonly name?: OrderDirection | null
}

export type TagUpdateInput = {
  readonly name?: Scalars['String'] | null
  readonly posts?: PostRelateToManyForUpdateInput | null
}

export type TagUpdateArgs = {
  readonly where: TagWhereUniqueInput
  readonly data: TagUpdateInput
}

export type TagCreateInput = {
  readonly name?: Scalars['String'] | null
  readonly posts?: PostRelateToManyForCreateInput | null
}

export type KeystoneAdminUIFieldMetaIsNonNull =
  | 'read'
  | 'create'
  | 'update'

export type KeystoneAdminUIFieldMetaCreateViewFieldMode =
  | 'edit'
  | 'hidden'

export type KeystoneAdminUIFieldMetaListViewFieldMode =
  | 'read'
  | 'hidden'

export type KeystoneAdminUIFieldMetaItemViewFieldMode =
  | 'edit'
  | 'read'
  | 'hidden'

export type KeystoneAdminUIFieldMetaItemViewFieldPosition =
  | 'form'
  | 'sidebar'

export type QueryMode =
  | 'default'
  | 'insensitive'

export type KeystoneAdminUISortDirection =
  | 'ASC'
  | 'DESC'

type ResolvedAuthorCreateInput = {
  id?: import('./../.myprisma/client').Prisma.AuthorCreateInput['id']
  name?: import('./../.myprisma/client').Prisma.AuthorCreateInput['name']
  email?: import('./../.myprisma/client').Prisma.AuthorCreateInput['email']
  posts?: import('./../.myprisma/client').Prisma.AuthorCreateInput['posts']
  createdAt?: import('./../.myprisma/client').Prisma.AuthorCreateInput['createdAt']
}
type ResolvedAuthorUpdateInput = {
  id?: undefined
  name?: import('./../.myprisma/client').Prisma.AuthorUpdateInput['name']
  email?: import('./../.myprisma/client').Prisma.AuthorUpdateInput['email']
  posts?: import('./../.myprisma/client').Prisma.AuthorUpdateInput['posts']
  createdAt?: import('./../.myprisma/client').Prisma.AuthorUpdateInput['createdAt']
}
type ResolvedPostCreateInput = {
  id?: import('./../.myprisma/client').Prisma.PostCreateInput['id']
  title?: import('./../.myprisma/client').Prisma.PostCreateInput['title']
  content?: import('./../.myprisma/client').Prisma.PostCreateInput['content']
  author?: import('./../.myprisma/client').Prisma.PostCreateInput['author']
  tags?: import('./../.myprisma/client').Prisma.PostCreateInput['tags']
}
type ResolvedPostUpdateInput = {
  id?: undefined
  title?: import('./../.myprisma/client').Prisma.PostUpdateInput['title']
  content?: import('./../.myprisma/client').Prisma.PostUpdateInput['content']
  author?: import('./../.myprisma/client').Prisma.PostUpdateInput['author']
  tags?: import('./../.myprisma/client').Prisma.PostUpdateInput['tags']
}
type ResolvedTagCreateInput = {
  id?: import('./../.myprisma/client').Prisma.TagCreateInput['id']
  name?: import('./../.myprisma/client').Prisma.TagCreateInput['name']
  posts?: import('./../.myprisma/client').Prisma.TagCreateInput['posts']
}
type ResolvedTagUpdateInput = {
  id?: undefined
  name?: import('./../.myprisma/client').Prisma.TagUpdateInput['name']
  posts?: import('./../.myprisma/client').Prisma.TagUpdateInput['posts']
}

export declare namespace Lists {
  export type Author<Session = any> = import('@keystone-6/core').ListConfig<Lists.Author.TypeInfo<Session>>
  namespace Author {
    export type Item = import('./../.myprisma/client').Author
    export type TypeInfo<Session = any> = {
      key: 'Author'
      isSingleton: false
      fields: 'id' | 'name' | 'email' | 'posts' | 'createdAt'
      item: Item
      inputs: {
        where: AuthorWhereInput
        uniqueWhere: AuthorWhereUniqueInput
        create: AuthorCreateInput
        update: AuthorUpdateInput
        orderBy: AuthorOrderByInput
      }
      prisma: {
        create: ResolvedAuthorCreateInput
        update: ResolvedAuthorUpdateInput
      }
      all: __TypeInfo<Session>
    }
  }
  export type Post<Session = any> = import('@keystone-6/core').ListConfig<Lists.Post.TypeInfo<Session>>
  namespace Post {
    export type Item = import('./../.myprisma/client').Post
    export type TypeInfo<Session = any> = {
      key: 'Post'
      isSingleton: false
      fields: 'id' | 'title' | 'content' | 'author' | 'tags'
      item: Item
      inputs: {
        where: PostWhereInput
        uniqueWhere: PostWhereUniqueInput
        create: PostCreateInput
        update: PostUpdateInput
        orderBy: PostOrderByInput
      }
      prisma: {
        create: ResolvedPostCreateInput
        update: ResolvedPostUpdateInput
      }
      all: __TypeInfo<Session>
    }
  }
  export type Tag<Session = any> = import('@keystone-6/core').ListConfig<Lists.Tag.TypeInfo<Session>>
  namespace Tag {
    export type Item = import('./../.myprisma/client').Tag
    export type TypeInfo<Session = any> = {
      key: 'Tag'
      isSingleton: false
      fields: 'id' | 'name' | 'posts'
      item: Item
      inputs: {
        where: TagWhereInput
        uniqueWhere: TagWhereUniqueInput
        create: TagCreateInput
        update: TagUpdateInput
        orderBy: TagOrderByInput
      }
      prisma: {
        create: ResolvedTagCreateInput
        update: ResolvedTagUpdateInput
      }
      all: __TypeInfo<Session>
    }
  }
}
export type Context<Session = any> = import('@keystone-6/core/types').KeystoneContext<TypeInfo<Session>>
export type Config<Session = any> = import('@keystone-6/core/types').KeystoneConfig<TypeInfo<Session>>

export type TypeInfo<Session = any> = {
  lists: {
    readonly Author: Lists.Author.TypeInfo<Session>
    readonly Post: Lists.Post.TypeInfo<Session>
    readonly Tag: Lists.Tag.TypeInfo<Session>
  }
  prisma: import('./../.myprisma/client').PrismaClient
  session: Session
}

type __TypeInfo<Session = any> = TypeInfo<Session>

export type Lists<Session = any> = {
  [Key in keyof TypeInfo['lists']]?: import('@keystone-6/core').ListConfig<TypeInfo<Session>['lists'][Key]>
} & Record<string, import('@keystone-6/core').ListConfig<any>>

export {}
