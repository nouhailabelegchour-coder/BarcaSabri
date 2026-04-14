import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'بارصا صابري | أخبار وماتشات FC Barcelona',
  description: 'تابع أحدث أخبار وماتشات نادي برشلونة بالدارجة المغربية — بلا صابرة ماكاينش فرحة',
  keywords: ['برشلونة', 'FC Barcelona', 'الليغا', 'دوري الأبطال', 'أخبار', 'ماتشات', 'دارجة'],
  openGraph: {
    title: 'بارصا صابري',
    description: 'أخبار وماتشات FC Barcelona بالدارجة المغربية',
    locale: 'ar_MA',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-gray-50 font-arabic">
        {children}
      </body>
    </html>
  );
}
