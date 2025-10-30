import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

// Đảm bảo interface User có trường 'role'
interface User {
  id: number;
  email: string;
  role: 'donor' | 'hospital' | 'admin'; // Thêm 'admin' nếu cần phân biệt
  name?: string;
  phone?: string;
  address?: string;
  lat?: number | null;
  lng?: number | null;
  blood_type?: string;
  last_donation?: string | null;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: 'donor' | 'hospital') => Promise<void>; // Giữ nguyên chữ ký hàm
  logout: () => void;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('bloodplus_user');
    if (savedUser) {
      try {
        const parsedUser: User = JSON.parse(savedUser); // Ép kiểu User
        setUser(parsedUser);
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        localStorage.removeItem('bloodplus_user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) { throw new Error(result.error || `Lỗi ${response.status}`); }
      const loggedInUser: User = result.user; // Dữ liệu đã bao gồm role
      setUser(loggedInUser);
      localStorage.setItem('bloodplus_user', JSON.stringify(loggedInUser));
    } catch (error) {
      console.error("Login API call failed:", error);
      throw error;
    }
  };

  const register = async (email: string, password: string, /* role */) => {
      // Chỉ gọi API đăng ký, không set user ở đây nữa vì cần đăng nhập sau đó
       try {
            const response = await fetch('http://localhost:5000/register_donor', {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({ email, phone: '', password }), // Gửi thông tin tối thiểu
            });
            const result = await response.json();
            if (!response.ok) { throw new Error(result.error || `Lỗi ${response.status}`); }
            // Không tự động đăng nhập, chỉ thông báo thành công
            // setUser(result.user);
            // localStorage.setItem('bloodplus_user', JSON.stringify(result.user));
       } catch (error) {
            console.error("Register API call failed:", error);
            throw error; // Ném lỗi để RegisterPage xử lý
       }
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem('bloodplus_user');
  };

  // Hàm updateProfile gọi API backend
   const updateProfile = async (profileData: Partial<User>) => {
    if (!user) {
      toast.error("Bạn cần đăng nhập để cập nhật thông tin.");
      return Promise.reject(new Error("User not logged in")); // Trả về rejected promise
    }

    try {
      const response = await fetch(`http://localhost:5000/users/${user.id}`, { // Gọi API update
        method: 'PUT', // Hoặc PATCH
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${your_auth_token}` // Thêm token nếu API yêu cầu
        },
        body: JSON.stringify(profileData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Cập nhật thất bại');
      }

      // Cập nhật state và localStorage với dữ liệu mới nhất từ server
      const updatedUserFromServer: User = result.user;
      setUser(updatedUserFromServer);
      localStorage.setItem('bloodplus_user', JSON.stringify(updatedUserFromServer));
      // Không cần toast ở đây vì component gọi nó sẽ xử lý

    } catch (error: any) {
      console.error("Update profile API call failed:", error);
      toast.error(`Lỗi cập nhật: ${error.message}`);
      throw error; // Ném lỗi ra để component gọi nó biết
    }
  };


  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) { throw new Error('useAuth must be used within an AuthProvider'); }
  return context;
}