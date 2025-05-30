"use client";

import { createContext, use, useCallback, useMemo, useState } from "react";
import { Unauthenticated } from "convex/react";
import { useTranslations } from "next-intl";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@skill-based/ui/components/dialog";

import { ConnectButton } from "./connect-button";

interface AuthGateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
}

const useAuthGateDialogMessages = () => {
  const t = useTranslations("onboarding");

  return useMemo(
    () =>
      ({
        default: {
          title: t("default.title", {
            default: "Build your profile with SkillBased",
          }),
          description: t("default.description", {
            default:
              "Join SkillBased to create your professional identity, showcase your skills, and connect with others on-chain.",
          }),
        },
        profile: {
          title: t("profile.title", {
            default: "Build your profile with SkillBased",
          }),
          description: t("profile.description", {
            default:
              "Join SkillBased to create your professional identity, showcase your skills, and connect with others on-chain.",
          }),
        },
        notifications: {
          title: t("notifications.title", { default: "Stay up to date" }),
          description: t("notifications.description", {
            default:
              "Sign in to SkillBased to receive notifications about your network and activity.",
          }),
        },
        like: {
          title: t("like.title", { default: "Show your support" }),
          description: t("like.description", {
            default: "Sign in to SkillBased to give a like to a post.",
          }),
        },
        comment: {
          title: t("comment.title", { default: "Join the conversation" }),
          description: t("comment.description", {
            default: "Sign in to SkillBased to comment on a post.",
          }),
        },
        search: {
          title: t("search.title", { default: "Find your next connection" }),
          description: t("search.description", {
            default: "Search for professionals by name or wallet address.",
          }),
        },
        chat: {
          title: t("chat.title", { default: "Start chatting" }),
          description: t("chat.description", {
            default: "Sign in to SkillBased to chat with others.",
          }),
        },
        othersProfile: {
          title: t("othersProfile.title", {
            default: "View others' profile",
          }),
          description: t("othersProfile.description", {
            default:
              "Sign in to SkillBased to view others' profile and connect with them.",
          }),
        },
        comingSoon: {
          title: t("comingSoon.title", { default: "Coming soon" }),
          description: t("comingSoon.description", {
            default: "This feature is coming soon.",
          }),
        },
      }) as const,
    [t],
  );
};

interface OpenOptions {
  key?: keyof ReturnType<typeof useAuthGateDialogMessages>;
}

const AuthGateDialogContext = createContext<{
  open: (options?: OpenOptions) => void;
}>({
  open: () => {},
});

function AuthGateDialog({
  open,
  onOpenChange,
  title,
  description,
}: AuthGateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-fit p-8">
        <DialogHeader>
          <DialogTitle className="mx-auto max-w-fit text-center text-4xl font-bold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-md mt-2 grid gap-8">
            <span className="mx-auto block max-w-[30ch] text-center">
              {description}
            </span>
            <Unauthenticated>
              <ConnectButton />
            </Unauthenticated>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export const AuthGateDialogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [_open, setOpen] = useState(false);
  const [dialogKey, setDialogKey] =
    useState<keyof ReturnType<typeof useAuthGateDialogMessages>>("default");

  const dialogMessages = useAuthGateDialogMessages();
  const open = useCallback((options?: OpenOptions) => {
    setDialogKey(options?.key ?? "default");
    setOpen(true);
  }, []);

  return (
    <AuthGateDialogContext value={{ open }}>
      {children}
      <AuthGateDialog
        open={_open}
        onOpenChange={setOpen}
        title={dialogMessages[dialogKey].title}
        description={dialogMessages[dialogKey].description}
      />
    </AuthGateDialogContext>
  );
};

export const useAuthGateDialog = () => {
  const context = use(AuthGateDialogContext);

  if (!context) {
    throw new Error(
      "useAuthGateDialog must be used within a AuthGateDialogProvider",
    );
  }

  return context;
};
