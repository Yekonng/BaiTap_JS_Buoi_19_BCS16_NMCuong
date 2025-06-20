/** IPO - Quản lý nhân viên
 * Input (Nhập liệu)
Người dùng nhập thông tin nhân viên qua form gồm các trường:

Tài khoản (tknv)
Họ và tên (name)
Email (email)
Mật khẩu (password)
Ngày làm (datepicker)
Lương cơ bản (luongCB)
Chức vụ (chucvu)
Giờ làm trong tháng (gioLam)
Người dùng có thể:

Thêm mới nhân viên
Sửa thông tin nhân viên
Xóa nhân viên
Tìm kiếm nhân viên theo loại (xuất sắc, giỏi, khá, trung bình)

* Processing (Xử lý)
Validation:
Kiểm tra dữ liệu nhập vào theo các tiêu chí:

Tài khoản: 4-6 ký số, không để trống
Họ tên: chỉ chữ, không để trống
Email: đúng định dạng, không để trống
Mật khẩu: 6-10 ký tự, có số, in hoa, ký tự đặc biệt, không để trống
Ngày làm: đúng định dạng mm/dd/yyyy, không để trống
Lương cơ bản: 1.000.000 - 20.000.000, không để trống
Chức vụ: phải chọn hợp lệ
Giờ làm: 80-200, không để trống
Tạo đối tượng nhân viên:
Tạo instance của class NhanVien với các thuộc tính lấy từ form.

Tính toán:

Tính tổng lương dựa vào chức vụ:
Giám đốc: lương cơ bản * 3
Trưởng phòng: lương cơ bản * 2
Nhân viên: lương cơ bản * 1
Xếp loại nhân viên dựa vào số giờ làm:
=192: Xuất sắc

=176: Giỏi

=160: Khá

<160: Trung bình
Lưu trữ:

Lưu danh sách nhân viên vào mảng arrNhanVien và localStorage.
Khi sửa, cập nhật lại thông tin nhân viên trong mảng và localStorage.
Khi xóa, loại bỏ nhân viên khỏi mảng và localStorage.
Tìm kiếm:

Lọc danh sách nhân viên theo loại khi người dùng nhập từ khóa và bấm tìm kiếm.

* Output (Kết quả)
Hiển thị danh sách nhân viên dưới dạng bảng với các thông tin:

Tài khoản, Họ tên, Email, Ngày làm, Chức vụ, Tổng lương (định dạng VNĐ), Xếp loại
Các nút thao tác: Sửa, Xóa
Khi thêm, sửa, xóa hoặc tìm kiếm, bảng sẽ cập nhật lại đúng dữ liệu theo thao tác của người dùng.

Nếu nhập sai dữ liệu, hiển thị thông báo lỗi tương ứng dưới từng trường nhập liệu.
 */

import { NhanVien } from "./models/NhanVien.js";
import {
  kiemTraRong,
  kiemTraChucVu,
  regexNumber,
  regexName,
  regexEmail,
  regexPassword,
  regexDate,
  kiemTraLuongCB,
  kiemTraGioLam,
} from "./ultis/validation.js";

/**  1. In ra table danh sách nhân viên
 1.1 Xử lý sự kiện khi người dùng gửi form nhập thông tin nhân viên
- Kiểm tra rỗng các ô nhập liệu
- Kiểm tra Validation cho từng ô theo đúng yêu cầu
 - Dùng hàm renderTableNhanVien để hiển thị danh sách nhân viên
- Dùng hàm saveLocalStorage để lưu trữ dữ liệu
*/
let arrNhanVien = [];
document.querySelector("#formNhanVien").onsubmit = function (e) {
  e.preventDefault();
  let nv = new NhanVien();
  let arrInput = document.querySelectorAll(
    "#formNhanVien input, #formNhanVien select, #formNhanVien textarea"
  );

  for (let input of arrInput) {
    let id = input.id;
    let value = input.value;
    nv[id] = value;
  }

  // 4.Validation
  let valid = true;
  // Kiểm tra các ô nhập liệu không được để trống
  valid &=
    kiemTraRong(nv.tknv, "tbTKNV", "Tài khoản") &
    kiemTraRong(nv.name, "tbTen", "Họ và Tên") &
    kiemTraRong(nv.email, "tbEmail", "Email") &
    kiemTraRong(nv.password, "tbMatKhau", "Mật khẩu") &
    kiemTraRong(nv.datepicker, "tbNgay", "Ngày làm") &
    kiemTraRong(nv.luongCB, "tbLuongCB", "Lương Cơ bản") &
    kiemTraChucVu(nv.chucvu, "tbChucVu") & // 4.7 Sử dụng hàm kiểm tra riêng cho chức vụ
    kiemTraRong(nv.gioLam, "tbGiolam", "Giờ làm");

  // 4.1: Yêu cầu kiểm tra Tài khoản tối đa 4 - 6 ký số
  valid &= regexNumber(nv.tknv, "tbTKNV", "Tài khoản");

  // 4.2: Yêu cầu kiểm tra Tên nhân viên phải là chữ
  valid &= regexName(nv.name, "tbTen", "Họ và Tên");

  // 4.3: Yêu cầu kiểm tra Email phải đúng định dạng
  valid &= regexEmail(nv.email, "tbEmail", "Email");

  // 4.4: Yêu cầu kiểm tra Mật khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)
  valid &= regexPassword(nv.password, "tbMatKhau", "Mật khẩu");

  // 4.5: Yêu cầu kiểm tra Ngày làm định dạng mm/dd/yyyy
  valid &= regexDate(nv.datepicker, "tbNgay", "Ngày làm");

  // 4.6: Yêu cầu kiểm tra Lương cơ bản trong khoảng 1000000 - 20000000
  valid &= kiemTraLuongCB(nv.luongCB, "tbLuongCB", "Lương Cơ bản");

  // 4.8: Yêu cầu kiểm tra Số giờ làm trong tháng 80 - 200 giờ
  valid &= kiemTraGioLam(nv.gioLam, "tbGiolam", "Giờ làm");

  // Dừng logic, đặt cuối các hàm kiểm tra nhập liệu
  if (!valid) {
    return;
  }

  //5. Tính tổng lương và gán vào thuộc tính tongLuong
  nv.tongLuong = nv.tinhTongLuong();

  //6. Xây dựng phương thức xếp loại cho đối tượng nhân viên:
  nv.loaiNhanVien = nv.xepLoai();

  arrNhanVien.push(nv);
  renderTableNhanVien(arrNhanVien);
  saveLocalStorage();

  // Reset form và đóng modal
  document.getElementById("formNhanVien").reset();
  $("#myModal").modal("hide");
};

// 1.2 Khai báo hàm renderTableNhanVien để hiển thị danh sách nhân viên trên giao diện
window.renderTableNhanVien = function renderTableNhanVien(arrNhanVien) {
  let html = ``;
  for (let nv of arrNhanVien) {
    html += `
        <tr>
        <td>${nv.tknv}</td>
        <td>${nv.name}</td>
        <td>${nv.email}</td>
        <td>${nv.datepicker}</td>
        <td>${nv.chucvu}</td>
        <td>${Number(nv.tongLuong).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}</td>
        <td>${nv.loaiNhanVien}</td>
        <td><button class="btn btn-primary font-semibold py-2 px-4 rounded-lg shadow" onclick="suaNhanVien('${
          nv.tknv
        }')" >Sửa</button><button class="btn btn-danger font-semibold py-2 px-4 rounded-lg shadow" onclick="xoaNhanVien('${
      nv.tknv
    }')" >Xóa</button></td>
        </tr>`;
  }
  document.querySelector("#tableDanhSach").innerHTML = html;
};

// 1.3 Khai báo hàm saveLocalStorage để lưu trữ dữ liệu đã nhập
window.saveLocalStorage = function () {
  let strNhanVien = JSON.stringify(arrNhanVien);
  localStorage.setItem("arrNhanVien", strNhanVien);
};
// 1.4 Lấy dữ liệu từ LocalStorage
window.loadLocalStorage = function () {
  if (localStorage.getItem("arrNhanVien")) {
    let strNhanVien = localStorage.getItem("arrNhanVien");
    arrNhanVien = JSON.parse(strNhanVien);
    renderTableNhanVien(arrNhanVien);
  }
};
loadLocalStorage();

// 7. Xóa nhân viên
window.xoaNhanVien = function xoaNhanVien(tknv) {
  let nhanVienIndex = arrNhanVien.findIndex((nv) => nv.tknv == tknv);
  if (nhanVienIndex != -1) {
    arrNhanVien.splice(nhanVienIndex, 1);
    renderTableNhanVien(arrNhanVien);
    saveLocalStorage();
  }
};

// 8. Cập nhật nhân viên (có validation)
window.suaNhanVien = function suaNhanVien(tknv) {
  document.getElementById("tknv").disabled = true; // Không cho sửa tài khoản

  let nvUpdate = arrNhanVien.find((nv) => nv.tknv === tknv);

  if (nvUpdate) {
    for (let key in nvUpdate) {
      if (document.getElementById(key)) {
        document.getElementById(key).value = nvUpdate[key];
      }
    }
  }
  $("#myModal").modal("show");
};

document.getElementById("btnCapNhat").onclick = function () {
  let nvEdit = new NhanVien();
  let arrInput = document.querySelectorAll(
    "#formNhanVien input, #formNhanVien select"
  );
  for (let input of arrInput) {
    let id = input.id;
    let value = input.value;
    nvEdit[id] = value;
  }

  // Validation giống như khi thêm mới
  let valid = true;
  valid &= kiemTraRong(nvEdit.tknv, "tbTKNV", "Tài khoản");
  valid &= regexNumber(nvEdit.tknv, "tbTKNV", "Tài khoản");
  valid &= kiemTraRong(nvEdit.name, "tbTen", "Họ và Tên");
  valid &= regexName(nvEdit.name, "tbTen", "Họ và Tên");
  valid &= kiemTraRong(nvEdit.email, "tbEmail", "Email");
  valid &= regexEmail(nvEdit.email, "tbEmail", "Email");
  valid &= kiemTraRong(nvEdit.password, "tbMatKhau", "Mật khẩu");
  valid &= regexPassword(nvEdit.password, "tbMatKhau", "Mật khẩu");
  valid &= kiemTraRong(nvEdit.datepicker, "tbNgay", "Ngày làm");
  valid &= regexDate(nvEdit.datepicker, "tbNgay", "Ngày làm");
  valid &= kiemTraRong(nvEdit.luongCB, "tbLuongCB", "Lương Cơ bản");
  valid &= kiemTraLuongCB(nvEdit.luongCB, "tbLuongCB", "Lương Cơ bản");
  valid &= kiemTraChucVu(nvEdit.chucvu, "tbChucVu");
  valid &= kiemTraRong(nvEdit.gioLam, "tbGiolam", "Giờ làm");
  valid &= kiemTraGioLam(nvEdit.gioLam, "tbGiolam", "Giờ làm");

  if (!valid) return;

  // Tính lại tổng lương và xếp loại
  nvEdit.tongLuong = nvEdit.tinhTongLuong();
  nvEdit.loaiNhanVien = nvEdit.xepLoai();

  // Tìm và cập nhật nhân viên trong mảng
  let nvTrongMang = arrNhanVien.find((nv) => nv.tknv === nvEdit.tknv);
  if (nvTrongMang) {
    for (let key in nvEdit) {
      nvTrongMang[key] = nvEdit[key];
    }
  }

  renderTableNhanVien(arrNhanVien);
  saveLocalStorage();
  document.getElementById("tknv").disabled = false; // Cho phép nhập lại tài khoản khi thêm mới

  // Reset form và đóng modal
  document.getElementById("formNhanVien").reset();
  $("#myModal").modal("hide");
};

// 9. Tìm Nhân Viên theo loại (xuất săc, giỏi, khá...) và hiển thị
document.getElementById("btnTimNV").onclick = function () {
  let tuKhoa = document.getElementById("searchName").value.trim().toLowerCase();
  if (!tuKhoa) {
    renderTableNhanVien(arrNhanVien); // Nếu không nhập gì, hiển thị lại toàn bộ
    return;
  }
  let ketQua = arrNhanVien.filter((nv) =>
    nv.loaiNhanVien.toLowerCase().includes(tuKhoa)
  );
  renderTableNhanVien(ketQua);
};
