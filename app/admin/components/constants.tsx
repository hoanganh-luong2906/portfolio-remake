export const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/admin",
    icon: (
      <path
        d="M3 13h7V3H3v10zm0 8h7v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
        fill="currentColor"
      />
    ),
  },
  {
    id: "posts",
    label: "Posts",
    href: "/admin/posts",
    icon: (
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm2 18H6V4h7v5h5v11z"
        fill="currentColor"
      />
    ),
  },
  {
    id: "new",
    label: "New post",
    href: "/admin/posts/new",
    icon: <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor" />,
  },
  {
    id: "view",
    label: "View site",
    href: "/",
    icon: (
      <path
        d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zM19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7z"
        fill="currentColor"
      />
    ),
  },
];
