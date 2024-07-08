import type { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Author = {
  __typename?: 'Author';
  birthdate?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
};

export type AuthorInput = {
  birthdate: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
};

export type Film = {
  __typename?: 'Film';
  authors?: Maybe<Array<Maybe<Author>>>;
  genre?: Maybe<Scalars['String']['output']>;
  numbernote?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['String']['output']>;
};

export type FilmInput = {
  authors?: InputMaybe<Array<InputMaybe<AuthorInput>>>;
  genre?: InputMaybe<Scalars['String']['input']>;
  numbernote?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAuthor?: Maybe<Author>;
  addFilm?: Maybe<Film>;
  addSeries?: Maybe<Series>;
  deleteAuthor?: Maybe<Scalars['Boolean']['output']>;
  deleteFilm?: Maybe<Scalars['Boolean']['output']>;
  deleteSeries?: Maybe<Scalars['Boolean']['output']>;
  modifyAuthor?: Maybe<Author>;
  modifyFilm?: Maybe<Film>;
  modifySeries?: Maybe<Series>;
};


export type MutationAddAuthorArgs = {
  birthdate: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
};


export type MutationAddFilmArgs = {
  authors: Array<InputMaybe<AuthorInput>>;
  genre: Scalars['String']['input'];
  numbernote: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  year: Scalars['String']['input'];
};


export type MutationAddSeriesArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  films?: InputMaybe<Array<InputMaybe<FilmInput>>>;
  title: Scalars['String']['input'];
};


export type MutationDeleteAuthorArgs = {
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
};


export type MutationDeleteFilmArgs = {
  title: Scalars['String']['input'];
};


export type MutationDeleteSeriesArgs = {
  title: Scalars['String']['input'];
};


export type MutationModifyAuthorArgs = {
  birthdate: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  newBirthdate: Scalars['String']['input'];
  newFirstname: Scalars['String']['input'];
  newLastname: Scalars['String']['input'];
};


export type MutationModifyFilmArgs = {
  authors: Array<InputMaybe<AuthorInput>>;
  findTitle: Scalars['String']['input'];
  genre: Scalars['String']['input'];
  numbernote: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  year: Scalars['String']['input'];
};


export type MutationModifySeriesArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  findTitle: Scalars['String']['input'];
  films?: InputMaybe<Array<InputMaybe<FilmInput>>>;
  title: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  authors?: Maybe<Array<Maybe<Author>>>;
  films?: Maybe<Array<Maybe<Film>>>;
  series?: Maybe<Array<Maybe<Series>>>;
};

export type Series = {
  __typename?: 'Series';
  description?: Maybe<Scalars['String']['output']>;
  films?: Maybe<Array<Maybe<Film>>>;
  title: Scalars['String']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Author: ResolverTypeWrapper<Author>;
  AuthorInput: AuthorInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Film: ResolverTypeWrapper<Film>;
  FilmInput: FilmInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Series: ResolverTypeWrapper<Series>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Author: Author;
  AuthorInput: AuthorInput;
  Boolean: Scalars['Boolean']['output'];
  Int: Scalars['Int']['output'];
  Film: Film;
  FilmInput: FilmInput;
  Mutation: {};
  Query: {};
  Series: Series;
  String: Scalars['String']['output'];
}>;

export type AuthorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = ResolversObject<{
  birthdate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FilmResolvers<ContextType = any, ParentType extends ResolversParentTypes['Film'] = ResolversParentTypes['Film']> = ResolversObject<{
  authors?: Resolver<Maybe<Array<Maybe<ResolversTypes['Author']>>>, ParentType, ContextType>;
  genre?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  numbernote?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  year?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addAuthor?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType, RequireFields<MutationAddAuthorArgs, 'birthdate' | 'firstname' | 'lastname'>>;
  addFilm?: Resolver<Maybe<ResolversTypes['Film']>, ParentType, ContextType, RequireFields<MutationAddFilmArgs, 'authors' | 'genre' | 'numbernote' | 'title' | 'year'>>;
  addSeries?: Resolver<Maybe<ResolversTypes['Series']>, ParentType, ContextType, RequireFields<MutationAddSeriesArgs, 'title'>>;
  deleteAuthor?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteAuthorArgs, 'firstname' | 'lastname'>>;
  deleteFilm?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteFilmArgs, 'title'>>;
  deleteSeries?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteSeriesArgs, 'title'>>;
  modifyAuthor?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType, RequireFields<MutationModifyAuthorArgs, 'birthdate' | 'firstname' | 'lastname' | 'newBirthdate' | 'newFirstname' | 'newLastname'>>;
  modifyFilm?: Resolver<Maybe<ResolversTypes['Film']>, ParentType, ContextType, RequireFields<MutationModifyFilmArgs, 'authors' | 'findTitle' | 'genre' | 'numbernote' | 'title' | 'year'>>;
  modifySeries?: Resolver<Maybe<ResolversTypes['Series']>, ParentType, ContextType, RequireFields<MutationModifySeriesArgs, 'findTitle' | 'title'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  authors?: Resolver<Maybe<Array<Maybe<ResolversTypes['Author']>>>, ParentType, ContextType>;
  films?: Resolver<Maybe<Array<Maybe<ResolversTypes['Film']>>>, ParentType, ContextType>;
  series?: Resolver<Maybe<Array<Maybe<ResolversTypes['Series']>>>, ParentType, ContextType>;
}>;

export type SeriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Series'] = ResolversParentTypes['Series']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  films?: Resolver<Maybe<Array<Maybe<ResolversTypes['Film']>>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Author?: AuthorResolvers<ContextType>;
  Film?: FilmResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Series?: SeriesResolvers<ContextType>;
}>;

