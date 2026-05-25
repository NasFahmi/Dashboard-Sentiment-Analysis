import { usePageHeader } from "@/hooks/usePageHeader";
import { scrapperDetailBreadcrumbs } from "@/shared/breadcumb-config";
import { Download, User } from "lucide-react";
import { useState } from "react";
import { CommentViewer } from "../components/CommentViewer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const mockData = {
  username: "sahamtalk",
  fullName: "Saham Talk - Belajar Saham",
  followers: 655238,
  following: 51,
  bio: "💯Multibagger Trader\n💡B4nd4rmologi • Teknikal • Fundamental\n🎖Certified: WMI® CTA® CSA® CIC®\n⬇️Member & Class⬇️",
  profilePic:
    "https://instagram.fbwx2-1.fna.fbcdn.net/v/t51.2885-19/440765060_1308849310032201_4230738963432973489_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fbwx2-1.fna.fbcdn.net&_nc_cat=1&_nc_oc=Q6cZ2QEvjDz1IppD5WagYvS8IN3YYuruAPt9Nk4chD_uKZNd2aCshUzSR98DjbYhDpuXNnc&_nc_ohc=JyBDYmgm5FgQ7kNvwHbFfYM&_nc_gid=Y-YipzonEbMtS3dKNREtaQ&edm=ALGbJPMBAAAA&ccb=7-5&oh=00_AfqrYAxlox531hMaiBUTyqx_LktL2PMewhJRGyCVu9b6dQ&oe=695D1ED5&_nc_sid=7d3ac5",
  scrapedAt: "2025-11-18 06:48:17",
  posts: [
    {
      id: "1",
      imageUrl:
        "https://scontent.cdninstagram.com/v/t51.82787-15/582539048_18097395154801767_5163394360366275646_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=105&ig_cache_key=Mzc2ODQwMTU3MDk4NDgxODY3Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwOS5zZHIuQzMifQ%3D%3D&_nc_ohc=uk522rcf0FEQ7kNvwGGvczJ&_nc_oc=AdkrW-Yf_zILHNICrmH8fwclHHPZPdXSYY1X8k0iKCN8IhC0D89tnVY250uxjKWHsXQ&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=BSEZF1K-UDK5Dtd2Vk9cXw&oh=00_Afqdme_YPsKB_dFEdF8orx1XFfsxxWBl4ftlQXCplPvTbw&oe=695D2086",
      caption: "Hanya mengingatkan, hati-hati menyebarkan fitnah...",
      uploadedAt: "2025-11-18",
      likeCount: 8935,
      commentCount: 287,
      comments: [
        {
          "text": "😂😂 1",
          "username": "bismaprilianta 1",
          "createdAt": "2025-11-18 10:13:13",
          "likeCount": 6
        },
        {
          "text": "Semakin seru pertandingan ini. 🔥 1",
          "username": "hafizh1996 1",
          "createdAt": "2025-11-18 12:52:32",
          "likeCount": 2
        },
        {
          "text": "Gab bisa di tag 😂😂😂😂 1",
          "username": "anwar_29x 1",
          "createdAt": "2025-11-18 13:11:02",
          "likeCount": 1
        },

        {
          "text": "Lebih baik @sahamtalk lah . 1",
          "username": "fhanrianto 1",
          "createdAt": "2025-11-18 06:52:41",
          "likeCount": 5
        },
      ],
    },
    {
      id: "2",
      imageUrl:
        "https://scontent.cdninstagram.com/v/t51.82787-15/582539048_18097395154801767_5163394360366275646_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=105&ig_cache_key=Mzc2ODQwMTU3MDk4NDgxODY3Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwOS5zZHIuQzMifQ%3D%3D&_nc_ohc=uk522rcf0FEQ7kNvwGGvczJ&_nc_oc=AdkrW-Yf_zILHNICrmH8fwclHHPZPdXSYY1X8k0iKCN8IhC0D89tnVY250uxjKWHsXQ&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=BSEZF1K-UDK5Dtd2Vk9cXw&oh=00_Afqdme_YPsKB_dFEdF8orx1XFfsxxWBl4ftlQXCplPvTbw&oe=695D2086",
      caption: "Hanya mengingatkan, hati-hati menyebarkan fitnah...",
      uploadedAt: "2025-11-18",
      likeCount: 8935,
      commentCount: 287,
      comments: [
        {
          "text": "😂😂 2",
          "username": "bismaprilianta 2",
          "createdAt": "2025-11-18 10:13:13",
          "likeCount": 6
        },
        {
          "text": "Semakin seru pertandingan ini. 🔥 2",
          "username": "hafizh1996 2",
          "createdAt": "2025-11-18 12:52:32",
          "likeCount": 2
        },
        {
          "text": "Gab bisa di tag 😂😂😂😂 2",
          "username": "anwar_29x 2",
          "createdAt": "2025-11-18 13:11:02",
          "likeCount": 1
        },
        {
          "text": "Lebih baik @sahamtalk lah . 2",
          "username": "fhanrianto 2",
          "createdAt": "2025-11-18 06:52:41",
          "likeCount": 5
        },
      ],
    },
    {
      id: "3",
      imageUrl:
        "https://scontent.cdninstagram.com/v/t51.82787-15/582539048_18097395154801767_5163394360366275646_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=105&ig_cache_key=Mzc2ODQwMTU3MDk4NDgxODY3Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwOS5zZHIuQzMifQ%3D%3D&_nc_ohc=uk522rcf0FEQ7kNvwGGvczJ&_nc_oc=AdkrW-Yf_zILHNICrmH8fwclHHPZPdXSYY1X8k0iKCN8IhC0D89tnVY250uxjKWHsXQ&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=BSEZF1K-UDK5Dtd2Vk9cXw&oh=00_Afqdme_YPsKB_dFEdF8orx1XFfsxxWBl4ftlQXCplPvTbw&oe=695D2086",
      caption: "Hanya mengingatkan, hati-hati menyebarkan fitnah...",
      uploadedAt: "2025-11-18",
      likeCount: 8935,
      commentCount: 287,
      comments: [
        {
          "text": "😂😂 3",
          "username": "bismaprilianta 3",
          "createdAt": "2025-11-18 10:13:13 ",
          "likeCount": 6
        },
        {
          "text": "Semakin seru pertandingan ini. 🔥 3",
          "username": "hafizh1996 3",
          "createdAt": "2025-11-18 12:52:32",
          "likeCount": 2
        },
        {
          "text": "Gab bisa di tag 😂😂😂😂 3",
          "username": "anwar_29x 3",
          "createdAt": "2025-11-18 13:11:02",
          "likeCount": 1
        },
        {
          "text": "Lebih baik @sahamtalk lah . 3",
          "username": "fhanrianto 3",
          "createdAt": "2025-11-18 06:52:41",
          "likeCount": 5
        },
      ],
    },
  ],
};

const DetailScraperPage: React.FC = () => {
  usePageHeader(scrapperDetailBreadcrumbs);
  const [selectedPost, setSelectedPost] = useState<
    typeof mockData.posts[0] | null
  >(null);
  const [openComments, setOpenComments] = useState(false);


  return (

    <div className="w-full ">
      <CommentViewer
        open={openComments}
        onOpenChange={setOpenComments}
        post={selectedPost}
      />

      {/* ================= PAGE CONTENT ================= */}
      <div className="container mx-auto p-4 space-y-8">
        {/* ===== Header ===== */}
        <div className="flex justify-between items-center">
          <div className="">
            <h1 className="text-normal sm:text-2xl font-semibold text-slate-900">
              Detail Data Scraping
            </h1>
            <p className="mt-1 text-xs  sm:text-sm text-slate-500">
              @username · 10 post · 1.234 komentar
            </p>
          </div>
          {/* Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="px-4 py-2 text-sm border border-(--color-logo-1) bg-white rounded-lg font-medium text-(--color-logo-1) hover:border-logo-3 duration-300   flex items-center gap-2ounded-lg  gap-2"
              >
                <Download className="h-4 w-4" />
                Export
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => console.log("Export CSV")}>
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Export JSON")}>
                Export as JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Export Excel")}>
                Export as Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* ===== Profile Section ===== */}
        <div className="flex items-start gap-4">
          <div className="flex w-10 h-10 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-slate-100">
            <User className="w-5 h-5 sm:h-8 sm:w-8 text-slate-500" />
          </div>

          <div>
            <p className="font-medium text-slate-900">
              @{mockData.username} ({mockData.fullName})
            </p>
            <p className="text-sm text-slate-500">
              {mockData.followers.toLocaleString()} followers ·{" "}
              {mockData.following.toLocaleString()} following
            </p>
            <p className="mt-2 text-sm text-slate-600 whitespace-pre-line">
              {mockData.bio}
            </p>
          </div>
        </div>

        {/* ===== Post List ===== */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">
            Post yang Berhasil Discrape
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockData.posts.map((post) => (
              <div
                key={post.id}
                className="cursor-pointer rounded-lg border border-slate-200 bg-white p-3 hover:shadow-sm transition"
                onClick={() => {
                  setSelectedPost(post);
                  setOpenComments(true);
                }}

              >
                <img src={post.imageUrl} alt={post.caption} className="h-60 w-full rounded-md object-cover" />
                <p className="mt-2 text-sm text-slate-700 line-clamp-2">
                  {post.caption}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  ❤️ {post.likeCount.toLocaleString()} · 💬 {post.commentCount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default DetailScraperPage;
