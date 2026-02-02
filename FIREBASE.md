# 🔥 HƯỚNG DẪN FIREBASE - 10 PHÚT

## 🎯 TẠI SAO CẦN FIREBASE?
- ❌ LocalStorage: Chỉ 1 máy, GV và HS phải cùng máy
- ✅ Firebase: **NHIỀU MÁY THI CÙNG LÚC**, realtime, miễn phí

---

## 📋 SETUP FIREBASE (10 PHÚT)

### BƯỚC 1: Tạo Project (2 phút)
1. Vào: https://console.firebase.google.com
2. Click **"Add project"**
3. Tên: `exam-system`
4. Tắt Google Analytics
5. Click **Create project**

### BƯỚC 2: Tạo Database (3 phút)
1. Menu trái > **Realtime Database**
2. Click **"Create Database"**
3. Location: **asia-southeast1** (Singapore)
4. Security: **"Start in test mode"**
5. Click **Enable**

**📋 COPY DATABASE URL:**
```
https://exam-system-xxx.firebaseio.com
```

### BƯỚC 3: Lấy Config (3 phút)
1. Click ⚙️ (Settings) > **Project settings**
2. Scroll xuống **"Your apps"**
3. Click icon **"</>"** (Web)
4. Nickname: `Exam Web`
5. Click **Register app**

**📋 COPY 3 THÔNG TIN:**
```
apiKey: "AIzaSy..."
databaseURL: "https://...firebaseio.com"
projectId: "exam-system-xxx"
```

### BƯỚC 4: Cấu Hình (2 phút)
1. Mở `teacher-firebase.html`
2. Paste 3 thông tin vào form
3. Click **"Lưu & Kết Nối"**
4. Thấy: **"✅ Kết nối thành công!"**

---

## 🎓 SỬ DỤNG

### Giáo Viên:
```
1. Mở teacher-firebase.html
2. Đăng nhập: admin
3. Tạo đề LaTeX
4. Lưu đề → Lấy mã (ABC123)
5. Chia sẻ mã với HS
```

### Học Sinh:
```
1. Mở student-firebase.html (tự động kết nối)
2. Nhập tên + mã ABC123
3. Làm bài → Nộp
4. Xem kết quả
```

**🔥 KẾT QUẢ:** GV thấy tất cả kết quả realtime!

---

## 🎯 TEST

**2 Máy Khác Nhau:**
```
Máy A (GV): Tạo đề → Mã ABC123
Máy B (HS): Nhập ABC123 → Làm bài → Nộp
Máy A (GV): Thấy kết quả ngay (không cần F5)
```

**✅ THÀNH CÔNG!**

---

## 🔧 XỬ LÝ LỖI

### "Permission denied"
→ Database > Rules > Đổi thành:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

### "Mất kết nối"
→ Kiểm tra internet, F5 refresh

### Rules hết hạn (30 ngày)
→ Vào Rules > Gia hạn timestamp

---

## 💰 CHI PHÍ
**Spark Plan (MIỄN PHÍ):**
- 1GB storage
- 10GB/tháng
- **Đủ cho 100+ HS thi cùng lúc**

---

## 📊 SO SÁNH

| Tính năng | LocalStorage | Firebase |
|-----------|--------------|----------|
| Nhiều máy | ❌ | ✅ |
| Realtime | ❌ | ✅ |
| Setup | 0 phút | 10 phút |
| Chi phí | Miễn phí | Miễn phí |

**→ Dùng Firebase cho thi thật!**
