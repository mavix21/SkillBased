/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as authAdapter from "../authAdapter.js";
import type * as authTables from "../authTables.js";
import type * as certifications from "../certifications.js";
import type * as comments from "../comments.js";
import type * as dummy from "../dummy.js";
import type * as follows from "../follows.js";
import type * as http from "../http.js";
import type * as likes from "../likes.js";
import type * as messages from "../messages.js";
import type * as posts from "../posts.js";
import type * as storage from "../storage.js";
import type * as tokens from "../tokens.js";
import type * as trendingTopics from "../trendingTopics.js";
import type * as userTopics from "../userTopics.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  authAdapter: typeof authAdapter;
  authTables: typeof authTables;
  certifications: typeof certifications;
  comments: typeof comments;
  dummy: typeof dummy;
  follows: typeof follows;
  http: typeof http;
  likes: typeof likes;
  messages: typeof messages;
  posts: typeof posts;
  storage: typeof storage;
  tokens: typeof tokens;
  trendingTopics: typeof trendingTopics;
  userTopics: typeof userTopics;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
