import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-4 gap-8">
          {/* Logo on the left */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Logo className="w-10 h-10" />
          </Link>
          
          {/* Navigation next to logo - hidden on mobile */}
          <nav className="hidden md:flex items-center gap-8 flex-1">
            <Link to="/about" className="text-black hover:text-[#930511] transition-colors">
              Giới thiệu
            </Link>
            <Link to="/donation-info" className="text-black hover:text-[#930511] transition-colors">
              Tiêu chuẩn hiến máu
            </Link>
            <Link to="/news" className="text-black hover:text-[#930511] transition-colors">
              Tin tức hoạt động
            </Link>
            <Link to="/contact" className="text-black hover:text-[#930511] transition-colors">
              Liên hệ
            </Link>
          </nav>

          {/* Auth buttons on the right */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link to="/account" className="hidden md:block">
                  <Button variant="outline" className="border-[#930511] text-[#930511] hover:bg-[#930511] hover:text-white">
                    Tài khoản
                  </Button>
                </Link>
                <Button 
                  onClick={handleLogout}
                  className="hidden md:flex bg-black text-white hover:bg-gray-800"
                >
                  Đăng xuất
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="hidden md:block">
                  <Button className="bg-[#930511] text-white hover:bg-[#7a0410]">
                    Đăng nhập
                  </Button>
                </Link>
                <Link to="/register" className="hidden md:block">
                  <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                    Đăng ký
                  </Button>
                </Link>
              </>
            )}
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4">
              <Link to="/about" className="text-black hover:text-[#930511] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Giới thiệu
              </Link>
              <Link to="/donation-info" className="text-black hover:text-[#930511] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Tiêu chuẩn hiến máu
              </Link>
              <Link to="/news" className="text-black hover:text-[#930511] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Tin tức hoạt động
              </Link>
              <Link to="/contact" className="text-black hover:text-[#930511] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Liên hệ
              </Link>
              {user ? (
                <>
                  <Link to="/account" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-[#930511] text-[#930511] hover:bg-[#930511] hover:text-white">
                      Tài khoản
                    </Button>
                  </Link>
                  <Button 
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-black text-white hover:bg-gray-800"
                  >
                    Đăng xuất
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-[#930511] text-white hover:bg-[#7a0410]">
                      Đăng nhập
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white">
                      Đăng ký
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}