import { Shirt, Wallpaper, Settings, ShoppingBag, Box } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
export const Nav = () => {
  const inactiveLink = 'flex gap-1 p-1 items-center';
  const activeLink = inactiveLink + ' bg-secondary text-primary rounded-l-lg';
  const router = useRouter();
  const { pathname } = router;
  return (
    <aside className="text-white p-4 pr-0">
      <Link href={'/'} className="flex gap-1 mb-4 mr-4 items-center">
        <Shirt size={32} />
        <span>Admin Panel</span>
      </Link>
      <nav className="flex flex-col gap-2">
        <Link
          href={'/'}
          className={pathname === '/' ? activeLink : inactiveLink}
        >
          <Wallpaper size={32} />
          Dashboard
        </Link>
        <Link
          href={'/products'}
          className={pathname.includes('/products') ? activeLink : inactiveLink}
        >
          <Box size={32} />
          Products
        </Link>
        <Link
          href={'/orders'}
          className={pathname.includes('/orders') ? activeLink : inactiveLink}
        >
          <ShoppingBag size={32} />
          Orders
        </Link>
        <Link
          href={'/settings'}
          className={pathname.includes('/settings') ? activeLink : inactiveLink}
        >
          <Settings size={32} />
          Settings
        </Link>
      </nav>
    </aside>
  );
};

export default Nav;
