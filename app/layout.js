import "./globals.css"

export const metadata = {
  title: "Official Permission Application",
  description: "Light-hearted official request for permission",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
