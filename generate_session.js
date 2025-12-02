// =======================================================
// سكريبت إنشاء Session String لـ Telegram
// =======================================================
// هذا الكود يستخدم Deno
import { TelegramClient } from "npm:telegram@2.22.2";
import { StringSession } from "npm:telegram@2.22.2/sessions";

// =======================================================
// 🛑 مفاتيحك الخاصة (تم وضعها هنا مسبقاً)
// =======================================================
const API_ID = 33233734; 
const API_HASH = "b780a07bd15da6a06e45cf7fd6f7a485";

const stringSession = new StringSession("");

async function generateSession() {
    console.log("🚀 بدء إنشاء Session String...\n");
    
    const client = new TelegramClient(stringSession, API_ID, API_HASH, {
        connectionRetries: 5,
    });

    await client.start({
        phoneNumber: async () => {
            // استخدام prompt للسؤال
            const phone = prompt("📱 أدخل رقم هاتفك (مع كود البلد، مثال: +201234567890): ");
            return phone;
        },
        password: async () => {
            const pass = prompt("🔒 أدخل كلمة المرور للتحقق بخطوتين (اضغط Enter إذا لم تكن مفعلة): ");
            return pass || "";
        },
        phoneCode: async () => {
            const code = prompt("📨 أدخل كود التحقق المرسل إلى Telegram: ");
            return code;
        },
        onError: (err) => {
            console.error("❌ حدث خطأ:", err.message);
        },
    });

    console.log("\n✅ تم تسجيل الدخول بنجاح!");
    console.log("\n🔑 Session String الخاص بك:");
    console.log("=====================================");
    console.log(client.session.save()); // هذا هو الناتج الذي نريده
    console.log("=====================================");
    console.log("\n⚠️  انسخ هذا الـ String كاملاً!");
    
    await client.disconnect();
}

// دالة التشغيل
generateSession().catch(console.error);
