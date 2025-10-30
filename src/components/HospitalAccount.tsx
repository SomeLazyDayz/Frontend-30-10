import React, { useState, useEffect } from 'react'; // Thêm React và useEffect
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner';
import { MapPin, Phone, Mail, Droplet, Search } from 'lucide-react'; // Thêm Search icon

// Định nghĩa kiểu dữ liệu trả về từ API /create_alert
interface DonorSearchResult {
    user: {
        id: number;
        name: string;
        phone: string;
        email?: string; // Email có thể không cần hiển thị ngay
        blood_type: string;
        // Thêm các trường khác nếu API trả về
    };
    distance_km: number;
    ai_score: number;
}

export default function HospitalAccount() {
  const { user, updateProfile } = useAuth(); // User này là hospital/admin
  // State isEditing và formData cho thông tin bệnh viện (giữ nguyên logic cũ)
  const [isEditing, setIsEditing] = useState(!user?.name); // Giả sử bệnh viện cũng có 'name'
  const [hospitalFormData, setHospitalFormData] = useState({
    hospitalName: user?.name || '', // Lấy tên bệnh viện từ user.name (cần tạo user bệnh viện đúng)
    address: user?.address || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });

   // Đồng bộ thông tin bệnh viện nếu user thay đổi
   useEffect(() => {
     if (user && (user.role === 'hospital' || user.role === 'admin')) {
       setHospitalFormData({
         hospitalName: user.name || '',
         address: user.address || '',
         phone: user.phone || '',
         email: user.email || '',
       });
       setIsEditing(!user.name); // Bật edit nếu chưa có tên
     }
   }, [user]);


  // --- State cho chức năng lọc ---
  const [filters, setFilters] = useState({
    // hospital_id: user?.hospitalId || 1, // Cần cách lấy hospital_id đúng, tạm dùng 1
    bloodType: 'O+', // Giá trị mặc định
    radius: '10',    // Giá trị mặc định
  });
  const [searchResults, setSearchResults] = useState<DonorSearchResult[]>([]); // Lưu kết quả từ API
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading
  const [searchError, setSearchError] = useState<string | null>(null); // Lưu lỗi tìm kiếm
  // --- Kết thúc State cho chức năng lọc ---

   // --- HÀM GỌI API /create_alert ---
   const handleSearchDonors = async () => {
       setIsLoading(true);
       setSearchError(null);
       setSearchResults([]); // Xóa kết quả cũ

       // Cần xác định hospital_id của bệnh viện đang đăng nhập
       // Ví dụ: lấy từ user.id nếu user.id đại diện cho hospital_id
       // Hoặc cần một trường riêng như user.hospital_profile_id
       const hospitalId = 1; // !!! THAY BẰNG ID BỆNH VIỆN ĐÚNG

       const searchPayload = {
           hospital_id: hospitalId,
           blood_type: filters.bloodType,
           radius_km: parseInt(filters.radius, 10),
       };

       try {
           const response = await fetch('http://localhost:5000/create_alert', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(searchPayload),
           });

           const result = await response.json();

           if (!response.ok) {
               throw new Error(result.error || `Lỗi ${response.status}`);
           }

           setSearchResults(result.top_50_users || []); // Lưu kết quả vào state
           if (!result.top_50_users || result.top_50_users.length === 0) {
              toast.info("Không tìm thấy tình nguyện viên phù hợp.");
           } else {
              toast.success(`Tìm thấy ${result.top_50_users.length} tình nguyện viên.`);
           }

       } catch (error: any) {
           console.error("Search donors API call failed:", error);
           setSearchError(`Lỗi tìm kiếm: ${error.message}`);
           toast.error(`Lỗi tìm kiếm: ${error.message}`);
       } finally {
           setIsLoading(false);
       }
   };
   // --- KẾT THÚC HÀM GỌI API ---

  // Hàm xử lý submit form thông tin bệnh viện (giữ nguyên)
  const handleHospitalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToUpdate = {
        name: hospitalFormData.hospitalName, // Cập nhật tên
        address: hospitalFormData.address,
        phone: hospitalFormData.phone,
        // Không gửi email vì thường không đổi
    };
    updateProfile(dataToUpdate); // Gọi hàm update từ context
    setIsEditing(false);
    toast.success('Cập nhật thông tin bệnh viện thành công!');
  };

  // Hàm xử lý thay đổi input thông tin bệnh viện (giữ nguyên)
  const handleHospitalChange = (field: string, value: string) => {
    setHospitalFormData(prev => ({ ...prev, [field]: value }));
  };

  // Hàm xử lý thay đổi bộ lọc tìm kiếm
  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  // Hàm xử lý khi nhấn nút liên hệ (có thể gọi API backend để gửi SMS/Email)
  const handleContact = (donor: DonorSearchResult['user']) => {
    toast.info(`Đang gửi yêu cầu liên hệ đến ${donor.name}...`);
    // TODO: Gọi API backend để thực hiện gửi thông báo (SMS, Email)
    console.log(`Simulating contact request for donor ID ${donor.id}, phone ${donor.phone}`);
    // Giả lập thành công sau 1 giây
    setTimeout(() => {
        toast.success(`Đã gửi yêu cầu liên hệ thành công đến ${donor.name}`);
    }, 1000);
  };

  // JSX giữ nguyên cấu trúc, thay thế phần hiển thị danh sách donor bằng searchResults
  return (
    <div className="space-y-8">
      {/* Phần hiển thị/chỉnh sửa thông tin bệnh viện (giữ nguyên) */}
      <div className="flex justify-between items-center">
        <h1>Tài khoản Bệnh viện</h1>
        {user?.name && !isEditing && (
          <Button onClick={() => setIsEditing(true)} className="bg-[#930511] text-white hover:bg-[#7a0410]">Chỉnh sửa</Button>
        )}
      </div>
       {/* Card thông tin bệnh viện */}
        <Card>
            <CardHeader>
                <CardTitle>{isEditing ? 'Cập nhật thông tin bệnh viện' : hospitalFormData.hospitalName || 'Thông tin bệnh viện'}</CardTitle>
            </CardHeader>
            <CardContent>
                {isEditing ? (
                    <form onSubmit={handleHospitalSubmit} className="space-y-6">
                        {/* Inputs for hospitalName, address, phone */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                            <Label htmlFor="hospitalName">Tên bệnh viện</Label>
                            <Input id="hospitalName" value={hospitalFormData.hospitalName} onChange={(e) => handleHospitalChange('hospitalName', e.target.value)} required className="mt-2"/>
                            </div>
                            <div className="md:col-span-2">
                            <Label htmlFor="hospitalAddress">Địa chỉ</Label>
                            <Input id="hospitalAddress" value={hospitalFormData.address} onChange={(e) => handleHospitalChange('address', e.target.value)} required className="mt-2"/>
                            </div>
                            <div>
                            <Label htmlFor="hospitalPhone">Số điện thoại</Label>
                            <Input id="hospitalPhone" type="tel" value={hospitalFormData.phone} onChange={(e) => handleHospitalChange('phone', e.target.value)} required className="mt-2"/>
                            </div>
                             <div>
                                <Label htmlFor="hospitalEmail">Email (Không thể thay đổi)</Label>
                                <Input id="hospitalEmail" type="email" value={hospitalFormData.email} readOnly disabled className="mt-2 bg-gray-100 cursor-not-allowed"/>
                             </div>
                        </div>
                        <div className="flex gap-4">
                            <Button type="submit" className="bg-[#930511] text-white hover:bg-[#7a0410]">Lưu thông tin</Button>
                            {user?.name && <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Hủy</Button>}
                        </div>
                    </form>
                ) : (
                     <div className="space-y-4">
                        {/* Display hospitalName, address, phone, email */}
                        <div><p className="text-sm text-gray-600">Địa chỉ</p><div className="flex items-start gap-2 mt-1"><MapPin className="w-4 h-4 mt-1 text-[#930511]" /> <p>{hospitalFormData.address || 'Chưa cập nhật'}</p></div></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><p className="text-sm text-gray-600">Số điện thoại</p><p className="mt-1">{hospitalFormData.phone || 'Chưa cập nhật'}</p></div>
                            <div><p className="text-sm text-gray-600">Email</p><p className="mt-1">{hospitalFormData.email}</p></div>
                        </div>
                     </div>
                )}
            </CardContent>
        </Card>


      {/* Phần tìm kiếm tình nguyện viên */}
      <Card>
        <CardHeader>
          <CardTitle>Tìm kiếm tình nguyện viên hiến máu</CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            Chọn nhóm máu và bán kính để tìm người hiến máu phù hợp.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-[#FBF2E1] rounded-lg items-end">
              <div>
                <Label htmlFor="bloodTypeFilter">Nhóm máu cần tìm</Label>
                <Select value={filters.bloodType} onValueChange={(value) => handleFilterChange('bloodType', value)} required>
                  <SelectTrigger className="mt-2 bg-white" id="bloodTypeFilter">
                    <SelectValue placeholder="Chọn nhóm máu" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Blood type options */}
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="radiusFilter">Bán kính (km)</Label>
                <Select value={filters.radius} onValueChange={(value) => handleFilterChange('radius', value)}>
                  <SelectTrigger className="mt-2 bg-white" id="radiusFilter">
                    <SelectValue placeholder="Chọn bán kính" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Radius options */}
                    {[1, 2, 3, 5, 10, 15, 20].map(r => (
                        <SelectItem key={r} value={String(r)}>{r} km</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleSearchDonors}
                disabled={isLoading}
                className="w-full md:w-auto bg-[#930511] text-white hover:bg-[#7a0410]"
              >
                <Search className="w-4 h-4 mr-2" />
                {isLoading ? 'Đang tìm...' : 'Tìm kiếm'}
              </Button>
            </div>

            {/* Error message */}
            {searchError && <p className="text-red-600">{searchError}</p>}

            {/* Results count */}
            {!isLoading && searchResults && (
              <p className="text-sm text-gray-600">
                Tìm thấy <span className="font-semibold text-[#930511]">{searchResults.length}</span> tình nguyện viên phù hợp.
              </p>
            )}

            {/* Donor List - Sử dụng searchResults từ state */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {isLoading && <p>Đang tải danh sách...</p> }
              {!isLoading && searchResults.length === 0 && !searchError && (
                 <p className="text-center text-gray-500 py-4 italic">Chưa có kết quả tìm kiếm.</p>
              )}
              {!isLoading && searchResults.map((result) => (
                <div
                  key={result.user.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#FBF2E1] rounded-lg hover:bg-[#f5e8ce] transition-colors gap-3"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#930511] rounded-full flex items-center justify-center text-white shrink-0">
                      <Droplet className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1 text-sm sm:text-base">{result.user.name}</h3>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <Phone className="w-3 h-3" />
                        <span>{result.user.phone}</span>
                      </div>
                       {/* Có thể thêm email nếu cần:
                       <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                          <Mail className="w-3 h-3" />
                          <span>{result.user.email}</span>
                       </div>
                       */}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto mt-2 sm:mt-0">
                    <div className="text-left sm:text-right flex-1 sm:flex-initial">
                       <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#930511] text-white rounded-full mb-1">
                          <Droplet className="w-3 h-3" />
                          <span className="text-xs font-medium">{result.user.blood_type}</span>
                       </div>
                       <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 justify-start sm:justify-end">
                          <MapPin className="w-3 h-3" />
                          <span>~{result.distance_km.toFixed(1)} km</span>
                          <span className="text-gray-400 text-xs">(AI: {result.ai_score.toFixed(2)})</span>
                       </div>
                    </div>
                    <Button
                      onClick={() => handleContact(result.user)}
                      size="sm" // Kích thước nhỏ hơn
                      className="bg-green-600 text-white hover:bg-green-700 shrink-0 px-3"
                    >
                      Liên hệ
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}