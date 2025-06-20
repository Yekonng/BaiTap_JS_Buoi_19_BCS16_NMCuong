// Hàm kiểm tra rỗng cho các ô nhập liệu
export function kiemTraRong(value, selector, id) {
    if (value.trim() === "") {
    document.getElementById(selector).innerHTML = `${id} không được để trống`;
    return false; // Trả về false nếu rỗng
}
document.getElementById(selector).innerHTML = ""; // Xóa thông báo lỗi nếu không rỗng
return true; // Trả về true nếu không rỗng
}

// Hàm Kiểm Tra Rỗng riêng cho phần chức vụ
export function kiemTraChucVu(value, selector) {
  if (value === "Chọn chức vụ" || value.trim() === "") {
    document.getElementById(selector).innerHTML = "Vui lòng chọn chức vụ";
    return false;
  }
  document.getElementById(selector).innerHTML = "";
  return true;
}

// Regex cho nhập liệu ô Tài khoản
export function regexNumber(value, selector, name) {
    let regexNumber = /^\d{4,6}$/;
    if(regexNumber.test(value)) {
        document.getElementById(selector).innerHTML = "";
        return true;
    }
    document.getElementById(selector).innerHTML = `${name} phải là 4 đến 6 ký số`;
};

// Regex cho nhập liệu ô Họ và Tên
export function regexName(value, selector, name) {
    let regexName = /^[a-zA-ZÀ-ỹ\s]+$/;
    if(regexName.test(value)) {
        document.getElementById(selector).innerHTML = "";
        return true;
    }
    document.getElementById(selector).innerHTML = `${name} phải là chữ`;
};

// Regex cho nhập liệu ô Email
export function regexEmail(value, selector, name) {
    let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(regexEmail.test(value)) {
        document.getElementById(selector).innerHTML = "";
        return true;
    }
    document.getElementById(selector).innerHTML = `${name} phải đúng định dạng`;
};

// Regex cho nhập liệu ô Password
export function regexPassword(value, selector, name) {
    let regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{6,10}$/;
    if(regexPassword.test(value)) {
        document.getElementById(selector).innerHTML = "";
        return true;
    }
    document.getElementById(selector).innerHTML = `${name} phải từ 6-10 ký tự, có ít nhất 1 số, 1 chữ in hoa, 1 ký tự đặc biệt`;
};

// Regex cho nhập liệu ô Ngày làm
export function regexDate(value, selector, name) {
    let regexDate = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if(regexDate.test(value)) {
        document.getElementById(selector).innerHTML = "";
        return true;
    }
    document.getElementById(selector).innerHTML = `${name} phải có định dạng mm/dd/yyyy`;
};

// Regex cho nhập liệu ô Lương Cơ Bản
export function kiemTraLuongCB(value, selector, name) {
    let luong = Number(value);
    if (!isNaN(luong) && luong >= 1000000 && luong <= 20000000) {
        document.getElementById(selector).innerHTML = "";
        return true;
    }
    document.getElementById(selector).innerHTML = `${name} phải từ 1.000.000 đồng đến 20.000.000 đồng`;
}

// Regex cho nhập liệu ô Số giờ làm trong tháng
export function kiemTraGioLam(value, selector, name) {
    let gio = Number(value);
    if (!isNaN(gio) && gio >= 80 && gio <= 200) {
        document.getElementById(selector).innerHTML = "";
        return true;
    }
    document.getElementById(selector).innerHTML = `${name} phải từ 80 đến 200 giờ`;
}