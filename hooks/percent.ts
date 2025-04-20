export  function getPercentage(input: string): string {
    // تبدیل رشته به عدد
    const num: number = Number(input);
  
    // اعتبارسنجی ورودی: باید عددی بین 1 تا 20 باشد
    if (isNaN(num) || num < 0 || num > 20) {
      throw new Error("ورودی باید عددی بین 1 تا 20 باشد");
    }
  
    // محاسبه درصد (هر واحد برابر با 5 درصد)
    const percentage: number = (num / 20) * 100;
    return `${percentage}%`;
  }


  // تابع اصلی محاسبه درصد اختلاف زمانی
 export function calculateTimeDifferencePercentage(input: string): string {
    // ورودی به فرم "روز/ماه/سال/ساعت"
    const parts = input.split("/");
    if (parts.length !== 4) {
      throw new Error("فرمت ورودی نادرست است. فرمت صحیح: روز/ماه/سال/ساعت");
    }
  
    // استخراج و تبدیل مقادیر به عدد
    const day = Number(parts[0]);
    const month = Number(parts[1]);
    const year = Number(parts[2]);
    const hour = Number(parts[3]);
  
    if ([day, month, year, hour].some(num => isNaN(num))) {
      throw new Error("تمام مقادیر ورودی باید عددی باشند");
    }
  
    // ساخت شیء Date برای تاریخ ورودی (تقویم میلادی)
    const inputDate = new Date(year, month - 1, day, hour);
    const now = new Date();
  
    // محاسبه اختلاف زمانی به میلی‌ثانیه
    const diffMillis = inputDate.getTime() - now.getTime();
  
    // اگر تاریخ ورودی گذشته باشد، خروجی "0%" برگردانده می‌شود
    if (diffMillis < 0) {
      return "0%";
    }
  
    // تبدیل اختلاف به روز
    const diffDays = diffMillis / (1000 * 60 * 60 * 24);
    let percentage: number;
  
    if (diffDays < 1) {
      // اختلاف کمتر از یک روز: درصد بر اساس نسبت روز (مثلاً 0.5 روز معادل 50%)
      percentage = diffDays * 100;
    } else if (diffDays <= 20) {
      // اختلاف بین 1 تا 20 روز: درصد به صورت نسبتی از 100
      percentage = (diffDays / 20) * 100;
    } else {
      // اگر اختلاف بیش از 20 روز باشد، حداکثر درصد 100 در نظر گرفته می‌شود
      percentage = 100;
    }
  
    // گرد کردن درصد به نزدیک‌ترین عدد صحیح
    percentage = Math.round(percentage);
    return `${percentage}%`;
  }
  
 
  ////////////////////////

  // تابع کمکی برای تبدیل تاریخ هجری شمسی به میلادی
function jalaliToGregorian(jy: number, jm: number, jd: number): { gy: number; gm: number; gd: number } {
    let gy: number, gm: number, gd: number = 0;
    if (jy > 979) {
      gy = 1600;
      jy -= 979;
    } else {
      gy = 621;
    }
    let days = (jy * 365) + Math.floor(jy / 33) * 8 + Math.floor(((jy % 33) + 3) / 4) + jd + (jm < 7 ? (jm - 1) * 31 : ((jm - 7) * 30 + 186));
    gy += 400 * Math.floor(days / 146097);
    days %= 146097;
    if (days > 36524) {
      gy += 100 * Math.floor((--days) / 36524);
      days %= 36524;
      if (days >= 365)
        days++;
    }
    gy += 4 * Math.floor(days / 1461);
    days %= 1461;
    if (days > 365) {
      gy += Math.floor((days - 1) / 365);
      days = (days - 1) % 365;
    }
    const sal_a = [
      0,
      31,
      ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)) ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    gm = 0;
    for (let i = 1; i <= 12; i++) {
      if (days < sal_a[i]) {
        gm = i;
        gd = days + 1;
        break;
      }
      days -= sal_a[i];
    }
    return { gy, gm, gd };
  }  
  // تابع اصلی برای محاسبه اختلاف زمانی به صورت درصدی
 export function calculateTimeDifferencePercentage2(input: string): {h?: string; p?: string } {
    // بررسی فرمت ورودی
    const parts = input.split("/");
    if (parts.length !== 4) {
      throw new Error("فرمت ورودی نادرست است. فرمت صحیح: روز/ماه/سال/ساعت");
    }
  
    // استخراج مقادیر و تبدیل به عدد
    const day = Number(parts[0]);
    const month = Number(parts[1]);
    const year = Number(parts[2]);
    const hour = Number(parts[3]);
  
    if ([day, month, year, hour].some(num => isNaN(num))) {
      throw new Error("همه‌ی مقادیر ورودی باید عددی باشند");
    }
  
    // تبدیل تاریخ هجری شمسی به میلادی
    const { gy, gm, gd } = jalaliToGregorian(year, month, day);
  
    // ساخت شیء Date با تاریخ میلادی به علاوه ساعت
    const inputDate = new Date(gy, gm - 1, gd, hour);
    const now = new Date();
  
    // محاسبه اختلاف زمانی به میلی‌ثانیه
    const diffMillis = inputDate.getTime() - now.getTime();
  
    // در صورتی که تاریخ ورودی گذشته باشد، می‌توان مقدار 0 درصد برگرداند
    if (diffMillis < 0) {
        return { h: "0%" };
    }
  
    // تبدیل اختلاف به روز
    const diffDays = diffMillis / (1000 * 60 * 60 * 24);
  
    if (diffDays < 1) {
      // اختلاف کمتر از یک روز (بر اساس نسبت از ۲۴ ساعت)
    //   percentage = diffDays * 100; // به عنوان مثال، 0.5 روز معادل 50%
      const h = Math.round(diffDays * 100);
      return { h: `${h}%` };
    } else if (diffDays <= 20) {
      // اختلاف بین 1 تا 20 روز
      const p = Math.round((diffDays / 20) * 100);
      return { p: `${p}%` };
    //   percentage = (diffDays / 20) * 100;
    } else {
      // اگر اختلاف بیش از 20 روز باشد، حداکثر درصد 100 در نظر گرفته می‌شود
      return { p: "100%" };
    }
  
    
  }

 export function calculateTimeDifference2(input: string): {hetr:boolean, h: string; d: string; ht: string; dt: string,de:boolean,he:boolean,het:boolean } {
    // ورودی باید به فرم "روز/ماه/سال/ساعت" باشد
    const parts = input.split("/");
    if (parts.length !== 4) {
      throw new Error("فرمت ورودی نادرست است. فرمت صحیح: روز/ماه/سال/ساعت");
    }
  
    // استخراج و تبدیل بخش‌ها به عدد
    const day = Number(parts[0]);
    const month = Number(parts[1]);
    const year = Number(parts[2]);
    const hour = Number(parts[3]);
  
    if ([day, month, year, hour].some(num => isNaN(num))) {
      throw new Error("تمام مقادیر ورودی باید عددی باشند");
    }
  
    // ساخت شیء Date برای تاریخ ورودی (تقویم میلادی)
    const inputDate = new Date(year, month - 1, day, hour);
    const now = new Date();
  
    // محاسبه اختلاف زمانی به میلی‌ثانیه
    const diffMillis = inputDate.getTime() - now.getTime();
  
    // اگر تاریخ ورودی گذشته باشد، مقادیر 0% برگردانده می‌شود
    if (diffMillis <= 0) {
      return { h: "0%", d: "0%", ht: "0%", dt: "0%",de:false,he:false ,het:false,hetr:false};
    }
  
    // محاسبه اختلاف به روز
    const diffDays = diffMillis / (1000 * 60 * 60 * 24);
    // محاسبه اختلاف به ساعت
    const diffHours = diffMillis / (1000 * 60 * 60);
  
    // محاسبه درصد برای h و d
    const h = diffDays < 1 ? Math.round(diffDays * 100) : 100;
    const d = diffDays <= 20 ? Math.round((diffDays / 20) * 100) : 100;
  
    // مقداردهی ht و dt
    const ht = diffDays >= 1 && diffDays <= 20 ? `${Math.floor(diffDays)} روز` : "0 روز";
    const dt = diffDays < 1 ? `${Math.floor(diffHours)} ساعت` : "0 ساعت";
    let de = false
    if(dt !== "0 ساعت"){
      de = true;
    }
    let he = false
    if(h === 100){
he=true
    }
    let het = false
    if(de=== false && h<=2){

        het=true

    }
    let hetr = false
    if(de=== true &&  dt === "1 ساعت" && h>=2){

        hetr=true

    }
  
    return { h: `${h}%`, d: `${d}%`, ht, dt,de,he,het,hetr };
  }
  