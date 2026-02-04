# 🔥 Hệ Thống Thi Trực Tuyến 

Hệ thống thi trực tuyến hỗ trợ **NHIỀU MÁY THI CÙNG LÚC** v

## ✨ Tính Năng

- ✅ Tạo đề thi từ mã LaTeX
- ✅ **Nhiều máy thi cùng lúc không giới hạn**
- ✅ Realtime - Cập nhật kết quả tức thì
- ✅ Phát hiện chuyển tab → Tự động nộp bài
- ✅ Đồng hồ đếm ngược
- ✅ Xuất Excel với thống kê
- ✅ Tính điểm tự động (thang 10)
- ✅ Xem kết quả chi tiết


## 📦 Cài Đặt

### Bước 1: Clone repository
```bash
git clone https://github.com/tandath/KIEM_TRA_THI_EXAM.git
```

### Bước 2: Setup Firebase (10 phút)
Đọc file `FIREBASE.md` để biết cách setup.

### Bước 3: Sử dụng
- GV: Mở `teacher-firebase.html`
- HS: Mở `student-firebase.html`

## ✨ TÍNH NĂNG NỔI BẬT

### 👨‍🏫 Dành Cho Giáo Viên
- **Soạn đề siêu tốc:**
  - Hỗ trợ copy trực tiếp từ **Microsoft Word**.
  - Tự động nhận diện **Đáp án đúng được TÔ ĐỎ**.
  - Hỗ trợ công thức Toán học (LaTeX) và chèn Hình ảnh.
- **Quản lý thi Realtime:**
  - Theo dõi tiến độ làm bài của cả lớp ngay trên màn hình.
  - Biết ngay ai đang làm, ai đã nộp, điểm số bao nhiêu.
- **Chống gian lận:** Hệ thống cảnh báo ngay lập tức nếu học sinh thoát màn hình hoặc chuyển tab.
- **Báo cáo:** Xuất file Excel chi tiết điểm số và thống kê.

### 👨‍🎓 Dành Cho Học Sinh
- Giao diện thân thiện, dễ sử dụng trên cả Điện thoại và Máy tính.
- Có đồng hồ đếm ngược.
- Biết điểm ngay sau khi nộp bài.
- Xem lại đáp án chi tiết (Đúng/Sai).

1. Cách soạn đề thi (Mới & Tiện lợi)
Bạn không cần gõ code! Chỉ cần soạn trên Word như sau:

Viết câu hỏi bình thường.

Các đáp án A, B, C, D nằm trên các dòng riêng biệt.

Tô màu đỏ (Red) cho đáp án đúng.

Copy toàn bộ nội dung từ Word -> Dán vào ô nhập liệu của Giáo viên.

Ví dụ trong Word:

Câu 1: Thủ đô của Việt Nam là gì? A. TP. Hồ Chí Minh <span style="color:red">B. Hà Nội</span> (Chữ này tô đỏ) C. Đà Nẵng D. Cần Thơ

2. Quy trình tổ chức thi
GV: Đăng nhập > Tạo đề > Nhận Mã Đề Thi (Ví dụ: ABC123).

GV: Gửi mã ABC123 cho học sinh.

HS: Truy cập trang web > Nhập tên & Mã đề > Bắt đầu làm.

GV: Ngồi xem bảng kết quả nhảy số liên tục theo thời gian thực.

## 📊 Files

- `index.html` - Trang chủ
- `teacher-firebase.html` - Giao diện GV
- `student-firebase.html` - Giao diện HS
- `teacher-firebase.js` - Logic GV
- `student-firebase.js` - Logic HS
- `styles.css` - CSS chung
- `FIREBASE.md` - Hướng dẫn setup Firebase
- `README.md` - File này
- `GITHUB.md` - Hướng dẫn deploy GitHub

## 🔥 Firebase

**Lợi ích:**
- Nhiều máy thi cùng lúc
- Realtime cập nhật
- Miễn phí (Spark Plan)
- Không cần server

**Setup:** Đọc `FIREBASE.md`

## 💻 Công Nghệ

- HTML5, CSS3, JavaScript
- Firebase Realtime Database
- SheetJS (XLSX export)
- Responsive design

## 📄 License

MIT License

## 👨‍💻 Tác Giả

**Tandath** - [GitHub](https://github.com/tandath)

---

⭐ **Star repo nếu hữu ích!** ⭐
