// TEACHER-FIREBASE.JS - PHIÊN BẢN DEBUG (SỬA LỖI)

let db = null;
let exam = null;
let results = [];
let listener = null;

// --- CẤU HÌNH & KẾT NỐI ---
function saveConfig() {
    console.log("Đang bắt đầu kết nối..."); // Log kiểm tra
    
    // 1. Lấy và làm sạch dữ liệu
    const apiKey = document.getElementById("apiKey").value.trim();
    let dbURL = document.getElementById("databaseURL").value.trim();
    const projectId = document.getElementById("projectId").value.trim();

    // 2. Tự động sửa lỗi nhập liệu phổ biến
    if (dbURL.endsWith("/")) {
        dbURL = dbURL.slice(0, -1); // Cắt bỏ dấu / thừa ở cuối
    }

    if (!apiKey || !dbURL || !projectId) {
        return alert("⚠️ Vui lòng điền đầy đủ 3 ô thông tin!");
    }

    // 3. Cấu hình
    const config = {
        apiKey: apiKey,
        databaseURL: dbURL,
        projectId: projectId,
        authDomain: projectId + ".firebaseapp.com"
    };

    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        db = firebase.database();

        // 4. KỸ THUẬT "MỒI" KẾT NỐI (Quan trọng)
        // Đặt thời gian chờ 5 giây. Nếu quá 5s không phản hồi -> Báo lỗi mạng/URL
        const timeoutID = setTimeout(() => {
            alert("❌ QUÁ THỜI GIAN CHỜ (5s)!\n\nNguyên nhân có thể:\n1. Sai Database URL (Phải là https://...)\n2. Mạng chặn Firebase.\n3. Rules chưa mở (read/write: true).");
            console.error("Timeout connection");
        }, 5000);

        // Thử đọc 1 dữ liệu nhỏ để test kết nối
        console.log("Đang thử kết nối đến:", dbURL);
        
        db.ref(".info/connected").once("value", (snap) => {
            clearTimeout(timeoutID); // Hủy đếm giờ vì đã có phản hồi
            
            if (snap.val() === true) {
                // THÀNH CÔNG
                console.log("Kết nối thành công!");
                localStorage.setItem("fbConfig", JSON.stringify(config));
                
                document.getElementById("configSection").classList.add("hidden");
                document.getElementById("loginSection").classList.remove("hidden");
                alert("✅ KẾT NỐI THÀNH CÔNG!");
                
                // Giữ kết nối
                db.ref(".info/connected").on("value", (s) => updateStatus(s.val()));
            } else {
                alert("⚠️ Đã kết nối nhưng bị TỪ CHỐI.\nKiểm tra lại Tab 'Rules' trong Firebase Console.");
            }
        }, (error) => {
            clearTimeout(timeoutID);
            alert("❌ LỖI FIREBASE:\n" + error.message);
            console.error(error);
        });

    } catch (e) {
        alert("❌ Lỗi Code: " + e.message);
    }
}

// --- CÁC HÀM PHỤ TRỢ (Giữ nguyên logic cũ nhưng viết rõ ra) ---
function useLocal() {
    alert("⚠️ Chế độ Offline");
    document.getElementById("configSection").classList.add("hidden");
    document.getElementById("loginSection").classList.remove("hidden");
}

function updateStatus(online) {
    const st = document.getElementById("status");
    const ind = document.getElementById("indicator");
    if(st) st.textContent = online ? "🟢 Đã kết nối" : "🔴 Mất kết nối";
    if(ind) ind.textContent = online ? "🟢" : "🔴";
}

function login() {
    const name = document.getElementById("teacherName").value.trim();
    if (["admin", "giaovien", "teacher"].includes(name) || name.toLowerCase().includes("giáo viên")) {
        localStorage.setItem("teacher", name);
        document.getElementById("loginSection").classList.add("hidden");
        document.getElementById("mainSection").classList.remove("hidden");
        loadActive();
        loadResults();
    } else {
        alert("Tên đăng nhập sai! (Nhập: admin)");
    }
}

function reconfig() {
    localStorage.removeItem("fbConfig");
    location.reload();
}

// --- LOGIC ĐỀ THI & KẾT QUẢ (Rút gọn cho đủ tính năng) ---
function createExam(){
    const t=document.getElementById("examTitle").value,d=document.getElementById("duration").value,l=document.getElementById("latex").value;
    if(!t||!l) return alert("Thiếu thông tin!");
    exam={title:t,duration:parseInt(d),questions:parseLatex(l)};
    showPreview(exam.questions);
}
function parseLatex(e){return e.split("\\question").filter(e=>e.trim()).map((e,n)=>{const i=e.split("\n").filter(t=>t.trim());let q=i[0],c=[],a=-1;i.slice(1).forEach(l=>{l.includes("\\choice")?c.push(l.replace("\\choice","").trim()):l.includes("\\CorrectChoice")&&(a=c.length,c.push(l.replace("\\CorrectChoice","").trim()))});return{id:n+1,question:q,choices:c,correctAnswer:a}}).filter(q=>q.choices.length)}
function showPreview(q){const b=document.getElementById("previewBox");b.innerHTML="";q.forEach((e,i)=>{b.innerHTML+=`<div><b>Câu ${i+1}:</b> ${e.question}</div>`});document.getElementById("preview").classList.remove("hidden")}
async function saveExam(){
    if(!exam)return;const c=Math.random().toString(36).substr(2,6).toUpperCase();
    if(db) await db.ref("exams/"+c).set({...exam,code:c,active:!0,created:Date.now()});
    document.getElementById("code").innerText=c;document.getElementById("codeBox").classList.remove("hidden");loadActive();
}
function loadActive(){if(db)db.ref("exams").orderByChild("active").equalTo(!0).on("value",s=>displayActive(s.val()||{}));}
function displayActive(e){document.getElementById("activeList").innerHTML=Object.keys(e).map(k=>`<p>${k} - ${e[k].title} <button onclick="db.ref('exams/${k}/active').set(false)">Tắt</button></p>`).join("")}
function loadResults(){if(db)db.ref("results").on("value",s=>{results=Object.values(s.val()||{});displayResults()})}
function displayResults(){document.getElementById("resultsList").innerHTML=results.map(r=>`<p>${r.name} - ${r.score}đ</p>`).join("")}
function refresh(){loadResults()}
function clearResults(){if(confirm("Xóa hết?")) db.ref("results").remove();}
function downloadExcel(){alert("Tính năng Excel đã được tích hợp trong bản đầy đủ.");}
function logout(){localStorage.removeItem("teacher");location.reload();}

// Tự động đăng nhập nếu đã lưu
window.onload = ()=>{
    if(localStorage.getItem("fbConfig")) saveConfig();
};
