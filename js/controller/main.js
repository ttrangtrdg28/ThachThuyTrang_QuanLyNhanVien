var DSNhanVien = new DSNhanVien();
var validation = new Validation();
getLocalStorage();

function getEle(id) {
  return document.getElementById(id);
}

// Lưu dữ liệu vào bảng tạm local
function setLocalStorage() {
  // convert từ json sang string
  var dataString = JSON.stringify(DSNhanVien.arrNV);

  // tạo bảng dữ liệu local
  localStorage.setItem("DSNhanVien", dataString);
}

// Đọc dữ liệu lên giao diện từ bảng tạm local
function getLocalStorage() {
  if (localStorage.getItem("DSNhanVien")) {
    var dataString = localStorage.getItem("DSNhanVien");

    // convert từ string sang json
    var dataJson = JSON.parse(dataString);

    // nạp dữ liệu lại vào dssv.arr
    DSNhanVien.arrNV = dataJson;

    // render lại table
    renderTable(DSNhanVien.arrNV);
  }
}

function currentDate() {
  var curDate = new Date();
  var day =
    curDate.getDate() < 10 ? "0" + curDate.getDate() : curDate.getDate();
  var month =
    curDate.getMonth() + 1 < 10
      ? "0" + (curDate.getMonth() + 1)
      : curDate.getMonth() + 1;
  var year = curDate.getFullYear();

  return month + "/" + day + "/" + year;
}

function resetInput() {
  getEle("tknv").value = "";
  getEle("name").value = "";
  getEle("email").value = "";
  getEle("password").value = "";
  getEle("luongCB").value = "";
  getEle("chucvu").selectedIndex = 0;
  getEle("gioLam").value = "";
  getEle("datepicker").value = currentDate();
}

function resetNotify() {
  getEle("tbTKNV").innerHTML = "";
  getEle("tbTen").innerHTML = "";
  getEle("tbEmail").innerHTML = "";
  getEle("tbMatKhau").innerHTML = "";
  getEle("tbNgay").innerHTML = "";
  getEle("tbLuongCB").innerHTML = "";
  getEle("tbChucVu").innerHTML = "";
  getEle("tbGiolam").innerHTML = "";
}

function resetThongTin(isAdd) {
  if (isAdd) {
    resetInput();
    resetNotify();
  }
  resetNotify();
}

function thongTinNV(isAdd) {
  taiKhoan = getEle("tknv").value;
  hoTen = getEle("name").value;
  email = getEle("email").value;
  matKhau = getEle("password").value;
  ngayLam = getEle("datepicker").value;
  luongCoBan = getEle("luongCB").value;
  chucVu = getEle("chucvu").value;
  gioLam = getEle("gioLam").value;

  // 4. Validation
  var isValid = true;
  // + Tài khoản tối đa 4 - 6 ký số, không để trống
  if (isAdd) {
    isValid &=
      validation.kiemTraRong(
        taiKhoan,
        "tbTKNV",
        "(*) Vui lòng nhập tài khoản"
      ) &&
      validation.kiemTraDoDaiKyTu(
        taiKhoan,
        "tbTKNV",
        "(*) Vui lòng nhập từ 4-6 ký tự",
        4,
        6
      ) &&
      validation.kiemTraTaiKhoanTonTai(
        taiKhoan,
        "tbTKNV",
        "(*) Tài khoản nhân viên đã tồn tại",
        DSNhanVien.arrNV
      );
  }
  // + Tên nhân viên phải là chữ, không để trống
  isValid &=
    validation.kiemTraRong(
      hoTen,
      "tbTen",
      "(*) Vui lòng nhập họ tên nhân viên"
    ) &&
    validation.kiemTraChuoiKyTuChu(
      hoTen,
      "tbTen",
      "(*) Vui lòng nhập đúng định dạng"
    );
  // + Email phải đúng định dạng, không để trống
  isValid &=
    validation.kiemTraRong(
      email,
      "tbEmail",
      "(*) Vui lòng nhập email nhân viên"
    ) &&
    validation.kiemTraKyTuDacBiet(
      email,
      "tbEmail",
      "(*) Vui lòng nhập đúng định dạng email",
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );
  // + Mật khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc  biệt), không để trống
  isValid &=
    validation.kiemTraRong(
      matKhau,
      "tbMatKhau",
      "(*) Vui lòng nhập mật khẩu"
    ) &&
    validation.kiemTraDoDaiKyTu(
      matKhau,
      "tbMatKhau",
      "(*) Vui lòng nhập mật khẩu từ 6-10 ký tự",
      6,
      10
    ) &&
    validation.kiemTraKyTuDacBiet(
      matKhau,
      "tbMatKhau",
      "(*) Mật khẩu có ký tự đặc biệt, số, chữ in thường, chữ in hoa",
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/
    );
  // + Ngày làm không để trống, định dạng mm/dd/yyyy
  isValid &=
    validation.kiemTraRong(
      ngayLam,
      "tbNgay",
      "(*) Vui lòng nhập ngày bắt đầu làm việc"
    ) &&
    validation.kiemTraKyTuDacBiet(
      ngayLam,
      "tbNgay",
      "(*) Vui lòng nhập đúng định dạng mm/dd/yyyy",
      /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/
    );
  // + Lương cơ bản 1 000 000 - 20 000 000, không để trống
  isValid &=
    validation.kiemTraRong(
      luongCoBan,
      "tbLuongCB",
      "(*) Vui lòng nhập mức lương cơ bản"
    ) &&
    validation.kiemTraKhoangSo(
      luongCoBan,
      "tbLuongCB",
      "(*) Mức lương chỉ được nhập trong khoảng 1.000.000-20.000.000",
      1000000,
      20000000
    ) &&
    validation.kiemTraKyTuDacBiet(
      luongCoBan,
      "tbLuongCB",
      "(*) Vui lòng chỉ nhập ký tự số",
      /^[0-9]+$/
    );
  // + Chức vụ phải chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)
  isValid &= validation.kiemTraChucVu(
    "chucvu",
    "tbChucVu",
    "(*) Vui lòng chọn chức vụ"
  );

  // + Số giờ làm trong tháng 80 - 200 giờ, không để trống
  isValid &=
    validation.kiemTraRong(
      gioLam,
      "tbGiolam",
      "(*) Vui lòng nhập số giờ làm của nhân viên"
    ) &&
    validation.kiemTraKhoangSo(
      gioLam,
      "tbGiolam",
      "(*) Số giờ làm chỉ được nhập trong khoảng 80-200",
      80,
      200
    ) &&
    validation.kiemTraKyTuDacBiet(
      gioLam,
      "tbGiolam",
      "(*) Vui lòng chỉ nhập ký tự số",
      /^[0-9]+$/
    );

  if (isValid) {
    var nv = new nhanVien(
      taiKhoan,
      hoTen,
      email,
      matKhau,
      ngayLam,
      luongCoBan,
      chucVu,
      gioLam
    );

    nv.tinhTongLuong();
    nv.xepLoaiNV();
    return nv;
  }

  return null;
}

// 1. In ra table danh sách nhân viên
function renderTable(data) {
  var content = "";

  for (var i = 0; i < data.length; i++) {
    var nv = data[i];
    content += `<tr>
      <td>${nv.taiKhoan}</td>
      <td>${nv.hoTen}</td>
      <td>${nv.email}</td>
      <td>${nv.ngayLam}</td>
      <td>${nv.chucVu}</td>
      <td>${nv.tongLuong}</td>
      <td>${nv.xepLoai}</td>
      <td>
        <button class="btn btn-success" onclick="suaNhanVien('${nv.taiKhoan}')">Sửa</button>
        <button class="btn btn-danger" onclick="xoaNhanVien('${nv.taiKhoan}')">Xóa</button>
      </td>
    </tr>`;
  }

  getEle("tableDanhSach").innerHTML = content;
}

// 2. Thêm nhân viên mới
getEle("btnThem").onclick = function () {
  getEle("btnThemNV").disabled = false;
  getEle("btnCapNhat").disabled = true;
  resetThongTin(true);
};

getEle("btnThemNV").onclick = function () {
  var lstNhanVien = thongTinNV(true);
  if (lstNhanVien) {
    DSNhanVien.themNV(lstNhanVien);

    renderTable(DSNhanVien.arrNV);
    setLocalStorage();
    getEle("btnDong").click();
  }
};

// 7. Xóa nhân viên
function xoaNhanVien(userNhanVien) {
  DSNhanVien.xoaNV(userNhanVien);
  renderTable(DSNhanVien.arrNV);
  setLocalStorage();
}

// 8. Cập nhật nhân viên (có validation)
function suaNhanVien(userNhanVien) {
  var nv = DSNhanVien.chiTietNV(userNhanVien);

  getEle("btnThem").click();
  getEle("btnThemNV").disabled = true;
  getEle("btnCapNhat").disabled = false;

  if (nv) {
    getEle("tknv").value = nv.taiKhoan;
    getEle("name").value = nv.hoTen;
    getEle("email").value = nv.email;
    getEle("password").value = nv.matKhau;
    getEle("datepicker").value = nv.ngayLam;
    getEle("luongCB").value = nv.luongCoBan;
    getEle("chucvu").value = nv.chucVu;
    getEle("gioLam").value = nv.gioLam;
  }
}

getEle("btnCapNhat").onclick = function () {
  var nv = thongTinNV(false);
  if (nv) {
    DSNhanVien.suaNV(nv);
    renderTable(DSNhanVien.arrNV);
    setLocalStorage();
    getEle("btnDong").click();
  }
};

// 9. Tìm Nhân Viên theo loại (xuất săc, giỏi, khá...) và hiển thị
function timNhanVien() {
  var search = getEle("searchName").value;
  var timKiem = DSNhanVien.timNV(search);
  renderTable(timKiem);
}

getEle("searchName").addEventListener("keyup", timNhanVien);
