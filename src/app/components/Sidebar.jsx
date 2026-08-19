// components/Sidebar.jsx
import Link from 'next/link';
import { CATEGORY_ICONS } from '@/app/constants';

export default function Sidebar({ categories }) {
  return (
    <>
      <Link href="/" className="nav-item active">
        <span className="material-icons-extended" style={{ color: '#1a73e8' }}>language</span>
        <span>Principais notícias</span>
      </Link>
      <Link href="/" className="nav-item">
        <span className="material-icons-extended" style={{ color: '#fbbc04' }}>star_border</span>
        <span>Para você</span>
      </Link>
      <div className="sidebar-divider"></div>
      <div className="sidebar-divider"></div>
      {categories?.map((cat) => {
        const iconName = CATEGORY_ICONS[cat.slug] || 'category';
        const targetHref = cat.slug === 'horoscopo' ? '/horoscopo' : cat.slug === 'clima' ? '/clima' : cat.slug === 'passatempos' ? '/#passatempos' : `/categoria/${cat.slug}`;
        
        return (
          <Link key={cat.id} href={targetHref} className="nav-item">
            <span className="material-icons-extended" style={{ color: cat.color_code || '#1a73e8', marginRight: '8px', fontSize: '20px' }}>
              {iconName}
            </span>
            <span>{cat.name}</span>
          </Link>
        );
      })}
    </>
  );
}
