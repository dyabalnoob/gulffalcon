import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ar" dir="rtl">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
        <title>مؤسسة الصقر الخليجي - Gulf Falcon Corporation</title>
        <meta name="description" content="مؤسسة الصقر الخليجي - منتجات فاخرة للرجال في الخليج العربي" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}