# 🚀 HƯỚNG DẪN ĐƯA LÊN GITHUB

## 📦 CÁC FILE CẦN UPLOAD

Tất cả 9 files:
```
✓ index.html
✓ teacher-firebase.html
✓ student-firebase.html
✓ teacher-firebase.js
✓ student-firebase.js
✓ styles.css
✓ FIREBASE.md
✓ README.md
✓ GITHUB.md (file này)
```

---

## 🎯 CÁCH 1: GITHUB WEB (DỄ NHẤT)

### Bước 1: Tạo Repository
1. Vào: https://github.com
2. Click **"+"** > **"New repository"**
3. Tên: `KIEM_TRA_THI_EXAM`
4. **Public** ✅
5. **KHÔNG** tick "Add README"
6. Click **Create repository**

### Bước 2: Upload Files
1. Click **"uploading an existing file"**
2. Kéo thả **TẤT CẢ 9 FILES** vào
3. Commit message: "Initial commit"
4. Click **Commit changes**

### Bước 3: Kích Hoạt GitHub Pages
1. Click tab **Settings**
2. Menu trái > **Pages**
3. Source: **main branch**
4. Folder: **/ (root)**
5. Click **Save**
6. Đợi 2-5 phút

### Bước 4: Truy Cập
```
https://YOUR-USERNAME.github.io/KIEM_TRA_THI_EXAM/
```

**✅ XONG!**

---

## 💻 CÁCH 2: GIT COMMAND LINE

```bash
# 1. Vào thư mục chứa 9 files
cd /path/to/folder

# 2. Khởi tạo Git
git init
git add .
git commit -m "Initial commit"

# 3. Thêm remote (thay YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/KIEM_TRA_THI_EXAM.git

# 4. Push
git branch -M main
git push -u origin main
```

Sau đó kích hoạt Pages như Cách 1, Bước 3.

---

## 🔧 CẬP NHẬT CODE

### Dùng GitHub Web:
1. Click file cần sửa
2. Click icon ✏️
3. Sửa code
4. Commit changes

### Dùng Git Command:
```bash
# Sửa file
# Sau đó:
git add .
git commit -m "Update"
git push
```

---

## ❓ XỬ LÝ LỖI

### Lỗi 404:
→ Kiểm tra tên file (phân biệt hoa/thường)
→ Đợi 5 phút để deploy

### File không load:
→ Tất cả file phải cùng thư mục root
→ Không đặt trong folder con

---

## 📝 CHECKLIST

- [ ] Upload đủ 9 files
- [ ] Kích hoạt Pages
- [ ] Test link trang chủ
- [ ] Test link GV
- [ ] Test link HS
- [ ] Setup Firebase
- [ ] Test tạo đề
- [ ] Test thi thử

---

**🎉 Thành công!**
