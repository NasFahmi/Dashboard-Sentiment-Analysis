/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useIsMobile } from "@/hooks/useIsMobile";

type CommentViewerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: any | null;
};

export const CommentViewer = ({
  open,
  onOpenChange,
  post,
}: CommentViewerProps) => {
  const isMobile = useIsMobile();

  if (!post) return null;

  const Content = (
    <>
      <div className="overflow-x-auto px-4">
        <Table className="min-w-[720px]">
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">
                Username
              </TableHead>
              <TableHead>Komentar</TableHead>
              <TableHead className="whitespace-nowrap">
                Like
              </TableHead>
              <TableHead className="whitespace-nowrap">
                Waktu
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {post.comments.map((comment: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell className="whitespace-nowrap font-medium">
                  {comment.username}
                </TableCell>
                <TableCell>
                  <p className="max-w-[360px]">
                    {comment.text}
                  </p>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {comment.likeCount}
                </TableCell>
                <TableCell className="whitespace-nowrap text-slate-500">
                  {comment.createdAt}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );

  /* ================= MOBILE: DRAWER ================= */
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>Komentar Post</DrawerTitle>
            <DrawerDescription>
              {post.commentCount} komentar ditemukan
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-6">
            {Content}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  /* ================= TABLET & DESKTOP: SHEET ================= */
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Komentar Post</SheetTitle>
          <SheetDescription>
            {post.commentCount} komentar ditemukan
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4">
          {Content}
        </div>
      </SheetContent>
    </Sheet>
  );
};
