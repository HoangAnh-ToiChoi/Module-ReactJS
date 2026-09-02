import {
  BsPlusLg,
  BsSearch,
  BsSend,
  BsHeart,
  BsPerson,
  BsBarChart,
  BsBookmark,
  BsArchive,
  BsEmojiSmile,
} from "react-icons/bs";
import { IoHome } from "react-icons/io5";

export const MENU_BLOCK_1 = [
  {
    id: "for-you",
    label: "Dành cho bạn",
    icon: IoHome,
    iconSize: "text-[19px]",
  },
  {
    id: "new-thread",
    label: "Thread mới",
    icon: BsPlusLg,
    iconSize: "text-[18px]",
  },
  {
    id: "search",
    label: "Tìm kiếm",
    icon: BsSearch,
    iconSize: "text-[18px]",
  },
];
export const MENU_BLOCK_2 = [
  {
    id: "messages",
    label: "Tin nhắn",
    icon: BsSend,
    iconSize: "text-[18px]",
  },
  {
    id: "activity",
    label: "Hoạt động",
    icon: BsHeart,
    iconSize: "text-[18px]",
  },
  {
    id: "profile",
    label: "Trang cá nhân",
    icon: BsPerson,
    iconSize: "text-[19px]",
  },
  {
    id: "insights",
    label: "Thông tin chi tiết",
    icon: BsBarChart,
    iconSize: "text-[18px]",
  },
];
export const MENU_BLOCK_3 = [
  { id: "following", label: "Đang theo dõi" },
  { id: "saved", label: "Đã lưu", icon: BsBookmark, iconSize: "text-[18px]" },
  { id: "liked", label: "Đã thích", icon: BsHeart, iconSize: "text-[18px]" },
  {
    id: "ghost-posts",
    label: "Bài viết tự hủy",
    rightIcon: BsEmojiSmile,
    extraClass: "justify-between",
  },
  {
    id: "archive",
    label: "Lưu trữ",
    icon: BsArchive,
    iconSize: "text-[18px]",
  },
];
