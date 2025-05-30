"use client";

import { Authenticated, useConvexAuth, useQuery } from "convex/react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@skill-based/ui/components/tabs";

import { api } from "@/convex/_generated/api";

import { Post, PostEditor } from "./ui";

export function FeedPage() {
  const { isAuthenticated } = useConvexAuth();
  const posts = useQuery(api.posts.getPosts);
  const isLoading = posts === undefined;

  const PostSkeleton = () => (
    <div className="bg-card animate-pulse rounded-xl border p-4">
      <div className="flex items-center space-x-4">
        <div className="bg-muted h-12 w-12 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="bg-muted h-4 w-1/4 rounded"></div>
          <div className="bg-muted h-4 w-3/4 rounded"></div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="bg-muted h-4 w-full rounded"></div>
        <div className="bg-muted h-4 w-5/6 rounded"></div>
      </div>
    </div>
  );

  // Render 3 skeleton posts while loading
  if (isLoading) {
    return (
      <div
        className="h-full overflow-y-auto p-4"
        style={{
          scrollbarGutter: "stable both-edges",
        }}
      >
        <div className="mx-auto max-w-xl space-y-2 rounded-xl">
          {[...Array(7)].map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-background h-full overflow-y-auto px-4"
      style={{
        scrollbarGutter: "stable both-edges",
      }}
    >
      {/* Post Creation */}
      <div className="mx-auto mt-4 max-w-xl space-y-4">
        <Authenticated>
          <PostEditor />
        </Authenticated>

        <Tabs defaultValue="for-you">
          <div className="bg-card rounded-xl border p-1">
            <TabsList className="bg-card w-full">
              <TabsTrigger value="for-you" className="rounded-lg">
                For you
              </TabsTrigger>
              <TabsTrigger
                value="following"
                disabled={true}
                className="rounded-lg"
              >
                Following
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="for-you">
            {/* attachmentsUrls are generated from storage IDs using ctx.storage.getUrl on the backend */}
            {posts.map((post) => (
              <Post
                key={post._id}
                postId={post._id}
                authorName={post.authorName}
                content={post.content}
                creationTime={post._creationTime}
                attachmentsUrls={post.attachmentsUrls}
              />
            ))}
          </TabsContent>
          <TabsContent value="following">
            <Authenticated>
              <div>authenticated content</div>
            </Authenticated>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
