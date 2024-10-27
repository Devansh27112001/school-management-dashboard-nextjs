export default function dashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>dashboard{children}</div>;
}
