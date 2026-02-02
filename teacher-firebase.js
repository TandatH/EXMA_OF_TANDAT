// TEACHER-FIREBASE.JS - PHIÊN BẢN ĐÃ SỬA LỖI & DỄ ĐỌC

let db = null;
let exam = null;
let results = [];
let listener = null;

// --- CẤU HÌNH & KẾT NỐI ---
function saveConfig() {
    const apiKey = document.getElementById("apiKey").value.trim();
    const dbURL = document.getElementById("databaseURL").value.trim();
    const projectId = document.getElementById("projectId").value.trim();

    // 1. Kiểm tra dữ liệu nhập
    if (!apiKey || !dbURL || !projectId) {
        return alert("⚠️ Vui lòng điền đầy đủ thông tin!");
    }

    if (!dbURL.startsWith("https://")) {
        return alert("❌ Database URL phải bắt đầu bằng 'https://'");
    }

    const config = {
        apiKey: apiKey,
        databaseURL: dbURL,
        projectId: projectId,
        authDomain: projectId + ".firebaseapp.com"
    };

    try {
        // 2. Thử khởi tạo Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        } else {
            console.log("Firebase already initialized, reusing...");
        }
        
        db = firebase.database();
        
        // 3. TẠO CƠ CHẾ BẮT LỖI TREO (TIMEOUT)
        // Nếu sau 5 giây mà chưa kết nối được -> Báo lỗi ngay
        const connectionTimeout = setTimeout(() => {
            alert("⏳ Kết nối quá lâu! \n1. Kiểm tra lại Database URL (chính xác từng ký tự).\n2. Kiểm tra lại Rules trong Firebase Console.\n3. Kiểm tra mạng.");
            updateStatus(false);
        }, 5000);

        // Thử kết nối thực tế
        db.ref(".info/connected").once("value", (snap) => {
            clearTimeout(connectionTimeout); // Hủy bộ đếm thời gian nếu có phản hồi
            
            if (snap.val() === true) {
                // Kết nối thành công
                localStorage.setItem("fbConfig", JSON.stringify(config));
                updateStatus(true);
                
                document.getElementById("configSection").classList.add("hidden");
                document.getElementById("loginSection").classList.remove("hidden");
                alert("✅ Kết nối thành công!");

                // Lắng nghe trạng thái mạng liên tục
                db.ref(".info/connected").on("value", (snap) => {
                    updateStatus(snap.val());
                });
            } else {
                alert("❌ Firebase từ chối kết nối. Hãy kiểm tra lại Rules hoặc Internet.");
            }
        }, (error) => {
            clearTimeout(connectionTimeout);
            alert("❌ Lỗi quyền truy cập: " + error.message);
        });

    } catch (e) {
        alert("❌ Lỗi Cấu Hình: " + e.message);
        console.error(e);
    }
}

function useLocal() {
    alert("⚠️ Chế độ Offline (Dữ liệu sẽ không được lưu lên mạng)");
    document.getElementById("configSection").classList.add("hidden");
    document.getElementById("loginSection").classList.remove("hidden");
}

function reconfig() {
    if(confirm("Bạn muốn cấu hình lại Firebase?")) {
        localStorage.removeItem("fbConfig");
        location.reload();
    }
}

function updateStatus(online) {
    const statusText = document.getElementById("status");
    const indicator = document.getElementById("indicator");
    
    if (statusText) statusText.textContent = online ? "🟢 Đã kết nối" : "🔴 Mất kết nối";
    if (indicator) indicator.textContent = online ? "🟢" : "🔴";
}

// --- ĐĂNG NHẬP & QUẢN LÝ ---
function login() {
    const name = document.getElementById("teacherName").value.trim();
    // Chấp nhận các tên sau làm admin
    const validNames = ["admin", "giaovien", "teacher", "gv"];
    
    if (validNames.includes(name) || name.toLowerCase().includes("giáo viên")) {
        localStorage.setItem("teacher", name);
        document.getElementById("loginSection").classList.add("hidden");
        document.getElementById("mainSection").classList.remove("hidden");
        loadActive();
        loadResults();
    } else {
        alert("Tên đăng nhập không hợp lệ! (Gợi ý: admin)");
    }
}

function logout() {
    if (listener) listener.off();
    localStorage.removeItem("teacher");
    location.reload();
}

// --- TẠO ĐỀ THI ---
function createExam() {
    const title = document.getElementById("examTitle").value.trim();
    const duration = parseInt(document.getElementById("duration").value);
    const latex = document.getElementById("latex").value.trim();

    if (!title || !latex) return alert("Vui lòng điền đầy đủ tiêu đề và nội dung!");

    try {
        const questions = parseLatex(latex);
        if (questions.length === 0) {
            alert("Không tìm thấy câu hỏi nào! Kiểm tra lại cú pháp LaTeX.");
        } else {
            exam = { title: title, duration: duration, questions: questions };
            showPreview(questions);
        }
    } catch (e) {
        alert("Lỗi phân tích LaTeX: " + e.message);
    }
}

function parseLatex(text) {
    const questions = [];
    // Tách câu hỏi bằng từ khóa \question
    const parts = text.split("\\question").filter(p => p.trim());

    parts.forEach((part, index) => {
        const lines = part.split("\n").map(l => l.trim()).filter(l => l);
        if (lines.length) {
            const qText = lines[0]; // Dòng đầu là câu hỏi
            const choices = [];
            let correct = -1;

            // Các dòng sau là đáp án
            lines.slice(1).forEach(line => {
                if (line.startsWith("\\choice")) {
                    choices.push(line.replace("\\choice", "").trim());
                } else if (line.startsWith("\\CorrectChoice")) {
                    correct = choices.length;
                    choices.push(line.replace("\\CorrectChoice", "").trim());
                }
            });

            if (qText && choices.length > 0 && correct !== -1) {
                questions.push({
                    id: index + 1,
                    question: qText,
                    choices: choices,
                    correctAnswer: correct
                });
            }
        }
    });
    return questions;
}

function showPreview(questions) {
    const previewBox = document.getElementById("previewBox");
    previewBox.innerHTML = "";

    questions.forEach((q, i) => {
        const div = document.createElement("div");
        div.className = "question-preview";
        
        let html = `<div class="question-text">Câu ${i + 1}: ${q.question}</div>`;
        q.choices.forEach((c, idx) => {
            const isCorrect = idx === q.correctAnswer;
            html += `<div class="choice-item ${isCorrect ? "correct-choice" : ""}">
                        ${String.fromCharCode(65 + idx)}. ${c} ${isCorrect ? "✓" : ""}
                     </div>`;
        });
        
        div.innerHTML = html;
        previewBox.appendChild(div);
    });

    document.getElementById("preview").classList.remove("hidden");
}

async function saveExam() {
    if (!exam) return;
    
    // Tạo mã đề ngẫu nhiên 6 ký tự
    const code = Math.random().toString(36).substr(2, 6).toUpperCase();
    
    const examData = {
        ...exam,
        code: code,
        created: new Date().toISOString(),
        teacher: localStorage.getItem("teacher"),
        active: true
    };

    if (db) {
        try {
            await db.ref("exams/" + code).set(examData);
            alert("✅ Đã lưu lên Firebase!");
        } catch (e) {
            return alert("Lỗi khi lưu: " + e.message);
        }
    } else {
        // Lưu offline
        const localExams = JSON.parse(localStorage.getItem("exams") || "{}");
        localExams[code] = examData;
        localStorage.setItem("exams", JSON.stringify(localExams));
    }

    document.getElementById("code").textContent = code;
    document.getElementById("codeBox").classList.remove("hidden");
    loadActive();
}

function copyCode() {
    const code = document.getElementById("code").textContent;
    navigator.clipboard.writeText(code).then(() => alert("Đã copy mã: " + code));
}

// --- QUẢN LÝ ĐỀ THI ---
function loadActive() {
    const activeList = document.getElementById("activeList");
    
    if (db) {
        db.ref("exams").orderByChild("active").equalTo(true).once("value", (snap) => {
            displayActive(snap.val() || {}, activeList);
        });
    } else {
        const exams = JSON.parse(localStorage.getItem("exams") || "{}");
        const activeExams = {};
        Object.keys(exams).forEach(k => {
            if (exams[k].active) activeExams[k] = exams[k];
        });
        displayActive(activeExams, activeList);
    }
}

function displayActive(exams, container) {
    if (Object.keys(exams).length === 0) {
        return container.innerHTML = '<p class="hint">Chưa có đề thi nào đang mở.</p>';
    }

    let html = `
        <table style="width:100%;border-collapse:collapse;">
            <tr style="background:#f8f9fa;">
                <th style="padding:10px;border:1px solid #ddd;">Mã</th>
                <th style="padding:10px;border:1px solid #ddd;">Tên đề</th>
                <th style="padding:10px;border:1px solid #ddd;">Thời gian</th>
                <th style="padding:10px;border:1px solid #ddd;">Số câu</th>
                <th style="padding:10px;border:1px solid #ddd;">Thao tác</th>
            </tr>`;

    Object.keys(exams).forEach(key => {
        const ex = exams[key];
        html += `
            <tr>
                <td style="padding:10px;border:1px solid #ddd;"><strong>${key}</strong></td>
                <td style="padding:10px;border:1px solid #ddd;">${ex.title}</td>
                <td style="padding:10px;border:1px solid #ddd;">${ex.duration} phút</td>
                <td style="padding:10px;border:1px solid #ddd;">${ex.questions.length} câu</td>
                <td style="padding:10px;border:1px solid #ddd;">
                    <button onclick="deactivate('${key}')" class="btn-delete">Tắt Đề</button>
                </td>
            </tr>`;
    });

    html += "</table>";
    container.innerHTML = html;
}

async function deactivate(code) {
    if (!confirm("Học sinh sẽ không thể vào thi đề này nữa. Tiếp tục?")) return;

    if (db) {
        await db.ref("exams/" + code + "/active").set(false);
    } else {
        const exams = JSON.parse(localStorage.getItem("exams") || "{}");
        if (exams[code]) exams[code].active = false;
        localStorage.setItem("exams", JSON.stringify(exams));
    }
    loadActive();
    alert("Đã tắt đề thi!");
}

// --- KẾT QUẢ ---
function loadResults() {
    if (db) {
        listener = db.ref("results");
        listener.on("value", (snap) => {
            results = Object.values(snap.val() || {});
            displayResults();
        });
    } else {
        results = JSON.parse(localStorage.getItem("results") || "[]");
        displayResults();
        // Giả lập realtime
        setInterval(() => {
            results = JSON.parse(localStorage.getItem("results") || "[]");
            displayResults();
        }, 5000);
    }
}

function displayResults() {
    const container = document.getElementById("resultsList");
    if (results.length === 0) {
        return container.innerHTML = '<p class="hint">Chưa có học sinh nộp bài.</p>';
    }

    let html = `
        <table style="width:100%;border-collapse:collapse;">
            <tr style="background:#f8f9fa;">
                <th style="padding:10px;border:1px solid #ddd;">Họ Tên</th>
                <th style="padding:10px;border:1px solid #ddd;">Mã Đề</th>
                <th style="padding:10px;border:1px solid #ddd;">Điểm</th>
                <th style="padding:10px;border:1px solid #ddd;">Thời gian nộp</th>
                <th style="padding:10px;border:1px solid #ddd;">Tab</th>
                <th style="padding:10px;border:1px solid #ddd;">Xóa</th>
            </tr>`;

    results.forEach((r, index) => {
        html += `
            <tr>
                <td style="padding:10px;border:1px solid #ddd;">${r.name}</td>
                <td style="padding:10px;border:1px solid #ddd;">${r.code}</td>
                <td style="padding:10px;border:1px solid #ddd;"><strong>${r.score}/10</strong></td>
                <td style="padding:10px;border:1px solid #ddd;">${new Date(r.time).toLocaleString("vi-VN")}</td>
                <td style="padding:10px;border:1px solid #ddd;">${r.tabSwitch ? "⚠️" : "✓"}</td>
                <td style="padding:10px;border:1px solid #ddd;">
                    <button onclick="deleteResult('${r.id || index}')" class="btn-delete">🗑️</button>
                </td>
            </tr>`;
    });

    html += "</table>";
    container.innerHTML = html;
}

async function deleteResult(id) {
    if (!confirm("Xóa kết quả này?")) return;
    
    if (db) {
        await db.ref("results/" + id).remove();
    } else {
        results = results.filter((r, i) => (r.id || i) != id);
        localStorage.setItem("results", JSON.stringify(results));
        displayResults();
    }
}

async function clearResults() {
    if (!confirm("⚠️ CẢNH BÁO: Xóa TOÀN BỘ kết quả?")) return;
    if (!confirm("Bạn có chắc chắn không? Hành động này không thể hoàn tác.")) return;

    if (db) {
        await db.ref("results").remove();
    } else {
        localStorage.setItem("results", "[]");
        results = [];
        displayResults();
    }
    alert("Đã xóa sạch dữ liệu!");
}

function refresh() {
    loadResults();
}

function downloadExcel() {
    if (results.length === 0) return alert("Chưa có kết quả để tải!");

    // 1. Sheet Kết Quả Chi Tiết
    const data = results.map((r, i) => ({
        "STT": i + 1,
        "Họ tên": r.name,
        "Mã đề": r.code,
        "Tên đề": r.examTitle || "",
        "Điểm": r.score,
        "Số câu đúng": r.correct || 0,
        "Tổng câu": r.total || 0,
        "Tỷ lệ %": r.total ? ((r.correct / r.total) * 100).toFixed(1) : 0,
        "Chuyển Tab": r.tabSwitch ? "Có (Vi phạm)" : "Không",
        "Thời gian nộp": new Date(r.time).toLocaleString("vi-VN")
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    
    // Chỉnh độ rộng cột
    ws['!cols'] = [
        { wch: 5 }, { wch: 25 }, { wch: 12 }, { wch: 30 }, 
        { wch: 8 }, { wch: 12 }, { wch: 12 }, { wch: 10 }, { wch: 15 }, { wch: 20 }
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Kết Quả Thi");

    // 2. Sheet Thống Kê
    const scores = results.map(r => Number(r.score));
    const avg = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
    
    const stats = [
        { "Chỉ số": "Tổng số học sinh", "Giá trị": results.length },
        { "Chỉ số": "Điểm Trung Bình", "Giá trị": avg },
        { "Chỉ số": "Điểm Cao nhất", "Giá trị": Math.max(...scores) },
        { "Chỉ số": "Điểm Thấp nhất", "Giá trị": Math.min(...scores) },
        { "Chỉ số": "Giỏi (>=8)", "Giá trị": scores.filter(s => s >= 8).length },
        { "Chỉ số": "Khá (>=6.5)", "Giá trị": scores.filter(s => s >= 6.5 && s < 8).length },
        { "Chỉ số": "Trung Bình (>=5)", "Giá trị": scores.filter(s => s >= 5 && s < 6.5).length },
        { "Chỉ số": "Yếu (<5)", "Giá trị": scores.filter(s => s < 5).length },
        { "Chỉ số": "Vi phạm quy chế (Tab)", "Giá trị": results.filter(r => r.tabSwitch).length }
    ];

    const wsStats = XLSX.utils.json_to_sheet(stats);
    wsStats['!cols'] = [{ wch: 25 }, { wch: 10 }];
    XLSX.utils.book_append_sheet(wb, wsStats, "Thống Kê");

    // Xuất file
    const date = new Date();
    const fileName = `KetQua_Thi_${date.getDate()}${date.getMonth()+1}_${date.getHours()}h${date.getMinutes()}.xlsx`;
    
    XLSX.writeFile(wb, fileName);
    alert("✅ Đã tải file: " + fileName);
}

// --- KHỞI TẠO KHI TẢI TRANG ---
window.addEventListener("load", () => {
    // Kiểm tra xem đã lưu cấu hình chưa
    const savedConfig = localStorage.getItem("fbConfig");
    
    if (savedConfig) {
        try {
            const config = JSON.parse(savedConfig);
            if (!firebase.apps.length) {
                firebase.initializeApp(config);
            }
            db = firebase.database();
            
            // Ẩn form cấu hình, hiện form đăng nhập
            document.getElementById("configSection").classList.add("hidden");
            
            // Lắng nghe kết nối lại
            db.ref(".info/connected").on("value", (snap) => {
                updateStatus(snap.val());
            });

            // Nếu giáo viên đã đăng nhập trước đó
            const savedTeacher = localStorage.getItem("teacher");
            if (savedTeacher) {
                document.getElementById("loginSection").classList.add("hidden");
                document.getElementById("mainSection").classList.remove("hidden");
                loadActive();
                loadResults();
            } else {
                document.getElementById("loginSection").classList.remove("hidden");
            }

        } catch (e) {
            console.error("Lỗi khởi tạo auto:", e);
            // Nếu lỗi config cũ, bắt nhập lại
            localStorage.removeItem("fbConfig");
            document.getElementById("configSection").classList.remove("hidden");
        }
    } else {
        // Chưa cấu hình -> Hiện form cấu hình
        document.getElementById("configSection").classList.remove("hidden");
    }
});
