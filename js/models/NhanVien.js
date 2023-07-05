// 3. Tạo đối tượng nhân viên với thông tin lấy từ form người dùng nhập vào
function nhanVien(
  _taiKhoan,
  _hoTen,
  _email,
  _matKhau,
  _ngayLam,
  _luongCoBan,
  _chucVu,
  _gioLam
) {
  this.taiKhoan = _taiKhoan;
  this.hoTen = _hoTen;
  this.email = _email;
  this.matKhau = _matKhau;
  this.ngayLam = _ngayLam;
  this.luongCoBan = _luongCoBan;
  this.chucVu = _chucVu;
  this.gioLam = _gioLam;
  this.tongLuong = 0;
  this.xepLoai = "";

  // 5. Xây dựng phương thức tính tổng lương cho đối tượng nhân viên
  this.tinhTongLuong = function () {
    if (this.chucVu === "Sếp") {
      this.tongLuong = parseFloat(this.luongCoBan) * 3;
    } else if (this.chucVu === "Trưởng phòng") {
      this.tongLuong = parseFloat(this.luongCoBan) * 2;
    } else if (this.chucVu === "Nhân viên") {
      this.tongLuong = parseFloat(this.luongCoBan);
    }
  };

  // 6. Xây dựng phương thức xếp loại cho đối tượng nhân viên:
  this.xepLoaiNV = function () {
    if (this.gioLam < 160) {
      this.xepLoai = "Nhân viên trung bình";
    } else if (this.gioLam >= 160 && this.gioLam < 176) {
      this.xepLoai = "Nhân viên khá";
    } else if (this.gioLam >= 176 && this.gioLam < 192) {
      this.xepLoai = "Nhân viên giỏi";
    } else if (this.gioLam >= 192) {
      this.xepLoai = "Nhân viên xuất sắc";
    }
  };
}
