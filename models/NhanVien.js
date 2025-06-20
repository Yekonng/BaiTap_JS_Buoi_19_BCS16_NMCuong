export class NhanVien {
  tknv = "";
  name = "";
  email = "";
  password = "";
  datepicker = "";
  luongCB = "";
  chucvu = "";
  gioLam = "";
  tongLuong = "";
  loaiNhanVien = "";

  //5. Tính tổng lương và gán vào thuộc tính tongLuong
  tinhTongLuong() {
    let heSo = 1;
    if (this.chucvu === "Sếp") {
      heSo = 3;
    } else if (this.chucvu === "Trưởng phòng") {
      heSo = 2;
    } else if (this.chucvu === "Nhân viên") {
      heSo = 1;
    }
    return Number(this.luongCB) * heSo;
  }

  //6. Xây dựng phương thức xếp loại cho đối tượng nhân viên:
  xepLoai() {
    const gio = Number(this.gioLam);
    if (gio >= 192) {
      return "Xuất sắc";
    } else if (gio >= 176) {
      return "Giỏi";
    } else if (gio >= 160) {
      return "Khá";
    } else {
      return "Trung bình";
    }
  }
}
