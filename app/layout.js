export const metadata = {
  title: "RadProp — Contract Proposal Generator for Rad Techs",
  description: "Generate professional radiology contract proposals in minutes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
