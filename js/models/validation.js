function Validation() {
  this.kiemTraRong = function (value, errorID, mess) {
    if (value === "") {
      document.getElementById(errorID).innerHTML = mess;
      document.getElementById(errorID).style.display = "block";
      return false;
    }
    document.getElementById(errorID).innerHTML = "";
    document.getElementById(errorID).style.display = "none";
    return true;
  };

  this.kiemTraChucVu = function (idSelect, errorID, mess) {
    var selectChucVu = document.getElementById(idSelect);
    if (selectChucVu.selectedIndex !== 0) {
      document.getElementById(errorID).innerHTML = "";
      document.getElementById(errorID).style.display = "none";
      return true;
    }
    document.getElementById(errorID).innerHTML = mess;
    document.getElementById(errorID).style.display = "block";
    return false;
  };

  this.kiemTraDoDaiKyTu = function (value, errorID, mess, min, max) {
    if (min <= value.trim().length && value.trim().length <= max) {
      document.getElementById(errorID).innerHTML = "";
      document.getElementById(errorID).style.display = "none";
      return true;
    }
    document.getElementById(errorID).innerHTML = mess;
    document.getElementById(errorID).style.display = "block";
    return false;
  };

  this.kiemTraKhoangSo = function (value, errorID, mess, min, max) {
    if (min <= parseFloat(value) && parseFloat(value) <= max) {
      document.getElementById(errorID).innerHTML = "";
      document.getElementById(errorID).style.display = "none";
      return true;
    }
    document.getElementById(errorID).innerHTML = mess;
    document.getElementById(errorID).style.display = "block";
    return false;
  };

  this.kiemTraChuoiKyTuChu = function (value, errorID, mess) {
    var letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letter)) {
      document.getElementById(errorID).innerHTML = "";
      document.getElementById(errorID).style.display = "none";
      return true;
    }
    document.getElementById(errorID).innerHTML = mess;
    document.getElementById(errorID).style.display = "block";
    return false;
  };

  this.kiemTraKyTuDacBiet = function (value, errorID, mess, letter) {
    if (value.match(letter)) {
      document.getElementById(errorID).innerHTML = "";
      document.getElementById(errorID).style.display = "none";
      return true;
    }
    document.getElementById(errorID).innerHTML = mess;
    document.getElementById(errorID).style.display = "block";
    return false;
  };

  this.kiemTraTaiKhoanTonTai = function (value, errorID, mess, lstNV) {
    var isExist = false;
    for (var i = 0; i < lstNV.length; i++) {
      var nv = lstNV[i];
      if (nv.taiKhoan === value) {
        isExist = true;
        break;
      }
    }

    if (isExist) {
      document.getElementById(errorID).innerHTML = mess;
      document.getElementById(errorID).style.display = "block";
      return false;
    }
    document.getElementById(errorID).innerHTML = "";
    document.getElementById(errorID).style.display = "none";
    return true;
  };

  // this.kiemTraNgay = function (value, errorID, mess) {
  //   var splitDate = value.split("/");
  //   var parsedDate = new Date();
  //   if (
  //     parsedDate.getMonth() == splitDate[0] - 1 &&
  //     parsedDate.getDate() == splitDate[1] &&
  //     parsedDate.getFullYear() == splitDate[2]
  //   ) {
  //     document.getElementById(errorID).innerHTML = "";
  //     document.getElementById(errorID).style.display = "none";
  //     return true;
  //   }
  //   document.getElementById(errorID).innerHTML = mess;
  //   document.getElementById(errorID).style.display = "block";
  //   return false;
  // };
}
