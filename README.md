# 🔥 Hệ Thống Thi Trực Tuyến Firebase

Hệ thống thi trực tuyến hỗ trợ **NHIỀU MÁY THI CÙNG LÚC** với Firebase Realtime Database.

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

## 📖 Hướng Dẫn Nhanh

### Giáo Viên:
1. Cấu hình Firebase (1 lần, 10 phút)
2. Tạo đề thi từ LaTeX
3. Lấy mã (VD: ABC123)
4. Chia sẻ với học sinh

### Học Sinh:
1. Nhập mã đề thi
2. Làm bài (KHÔNG chuyển tab!)
3. Nộp bài
4. Xem kết quả ngay

### Ví dụ LaTeX:
```latex
\question 2 + 2 = ?
\choice 3
\CorrectChoice 4
\choice 5

\question Thủ đô VN?
\choice TP.HCM
\CorrectChoice Hà Nội
\choice Đà Nẵng
```

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
