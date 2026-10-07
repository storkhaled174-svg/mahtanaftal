import { WilayaData, OrderItem, TireSizeStock, PlatformFaqItem, SupportChannelItem } from "@/backend/types/AdminDashboard";
export const ALGERIAN_WILAYAS: WilayaData[] = [{
  id: "w-01",
  code: "01",
  nameAr: "أدرار",
  communes: ["أدرار", "تيمقطن", "تمنطيط", "فنوغيل", "زاوية كنتة"]
}, {
  id: "w-02",
  code: "02",
  nameAr: "الشلف",
  communes: ["الشلف", "تنس", "أولاد فارس", "بوقادير", "الكريمية", "بني حواء"]
}, {
  id: "w-03",
  code: "03",
  nameAr: "الأغواط",
  communes: ["الأغواط", "أفلو", "قصر الحيران", "عين ماضي", "سيدي مخلوف"]
}, {
  id: "w-04",
  code: "04",
  nameAr: "أم البواقي",
  communes: ["أم البواقي", "عين البيضاء", "عين مليلة", "مسكيانة", "عين فكرون"]
}, {
  id: "w-05",
  code: "05",
  nameAr: "باتنة",
  communes: ["باتنة", "بريكة", "عين التوتة", "مروانة", "أريس", "المعذر"]
}, {
  id: "w-06",
  code: "06",
  nameAr: "بجاية",
  communes: ["بجاية", "أميزور", "أقبو", "خراطة", "سيدي عيش", "سوق الاثنين"]
}, {
  id: "w-07",
  code: "07",
  nameAr: "بسكرة",
  communes: ["بسكرة", "طولقة", "سيدي عقبة", "الزيبان", "الوطاية"]
}, {
  id: "w-08",
  code: "08",
  nameAr: "بشار",
  communes: ["بشار", "القنادسة", "العبادلة", "تاغيت", "تبلبالة"]
}, {
  id: "w-09",
  code: "09",
  nameAr: "البليدة",
  communes: ["البليدة", "أولاد يعيش", "بوفاريك", "العفرون", "موزاية", "الصومعة"]
}, {
  id: "w-10",
  code: "10",
  nameAr: "البويرة",
  communes: ["البويرة", "سور الغزلان", "الأخضرية", "عين بسام", "مشدالة"]
}, {
  id: "w-11",
  code: "11",
  nameAr: "تمنراست",
  communes: ["تمنراست", "أبالسة", "تاظروك", "إدلس"]
}, {
  id: "w-12",
  code: "12",
  nameAr: "تبسة",
  communes: ["تبسة", "بئر العاتر", "الشريعة", "الونزة", "العوينات"]
}, {
  id: "w-13",
  code: "13",
  nameAr: "تلمسان",
  communes: ["تلمسان", "مغنية", "منصورة", "الرمشي", "شتوان", "سبدو"]
}, {
  id: "w-14",
  code: "14",
  nameAr: "تيارت",
  communes: ["تيارت", "السوقر", "فرندة", "قصر الشلالة", "مهدية"]
}, {
  id: "w-15",
  code: "15",
  nameAr: "تيزي وزو",
  communes: ["تيزي وزو", "ذراع بن خدة", "عزازقة", "تيزي غنيف", "لاربعا ناث إيراثن", "بوغني"]
}, {
  id: "w-16",
  code: "16",
  nameAr: "الجزائر",
  communes: ["الجزائر الوسطى", "باب الوادي", "حسين داي", "بئر مراد رايس", "الدار البيضاء", "زرالدة", "الشراقة", "الرويبة", "برج البحري"]
}, {
  id: "w-17",
  code: "17",
  nameAr: "الجلفة",
  communes: ["الجلفة", "مسعد", "عين وسارة", "حاسي بحبح", "دار الشيوخ"]
}, {
  id: "w-18",
  code: "18",
  nameAr: "جيجل",
  communes: ["جيجل", "الطاهير", "الميلية", "العوانة", "الزيامة منصورية"]
}, {
  id: "w-19",
  code: "19",
  nameAr: "سطيف",
  communes: ["سطيف", "العلمة", "عين ولمان", "عين أرنات", "بوقاعة", "عين الكبيرة"]
}, {
  id: "w-20",
  code: "20",
  nameAr: "سعيدة",
  communes: ["سعيدة", "عين الحجر", "يوب", "الحساسنة", "أولاد إبراهيم"]
}, {
  id: "w-21",
  code: "21",
  nameAr: "سكيكدة",
  communes: ["سكيكدة", "الحروش", "القل", "عزابة", "تمالوس"]
}, {
  id: "w-22",
  code: "22",
  nameAr: "سيدي بلعباس",
  communes: ["سيدي بلعباس", "تلاغ", "سفيزف", "ابن باديس", "رأس الماء"]
}, {
  id: "w-23",
  code: "23",
  nameAr: "عنابة",
  communes: ["عنابة", "البوني", "الحجار", "برحال", "سيدي عمار", "شطايبي"]
}, {
  id: "w-24",
  code: "24",
  nameAr: "قالمة",
  communes: ["قالمة", "وادي الزناتي", "بوشقوف", "هيليوبوليس", "حمام دباغ"]
}, {
  id: "w-25",
  code: "25",
  nameAr: "قسنطينة",
  communes: ["قسنطينة", "الخروب", "علي منجلي", "عين سمارة", "ديدوش مراد", "حامة بوزيان"]
}, {
  id: "w-26",
  code: "26",
  nameAr: "المدية",
  communes: ["المدية", "البرواقية", "قصر البخاري", "بني سليمان", "تابلاط"]
}, {
  id: "w-27",
  code: "27",
  nameAr: "مستغانم",
  communes: ["مستغانم", "عين تدلس", "سيدي علي", "حاسي ماماش", "ماسرة"]
}, {
  id: "w-28",
  code: "28",
  nameAr: "المسيلة",
  communes: ["المسيلة", "بوسعادة", "سيدي عيسى", "مقرة", "عين الحجل"]
}, {
  id: "w-29",
  code: "29",
  nameAr: "معسكر",
  communes: ["معسكر", "سيق", "تيغنيف", "المحمدية", "غريس"]
}, {
  id: "w-30",
  code: "30",
  nameAr: "ورقلة",
  communes: ["ورقلة", "حاسي مسعود", "الرويسات", "سيدي خويلد", "انقوسة"]
}, {
  id: "w-31",
  code: "31",
  nameAr: "وهران",
  communes: ["وهران", "السانية", "بئر الجير", "أرزيو", "عين الترك", "بطيوة", "قديل"]
}, {
  id: "w-32",
  code: "32",
  nameAr: "البيض",
  communes: ["البيض", "بوقطب", "الأبيض سيدي الشيخ", "بريزينة", "رقاصة"]
}, {
  id: "w-33",
  code: "33",
  nameAr: "إليزي",
  communes: ["إليزي", "جانت", "إن أميناس", "برج عمر إدريس"]
}, {
  id: "w-34",
  code: "34",
  nameAr: "برج بوعريريج",
  communes: ["برج بوعريريج", "رأس الوادي", "مجانة", "المنصورة", "برج زمورة"]
}, {
  id: "w-35",
  code: "35",
  nameAr: "بومرداس",
  communes: ["بومرداس", "برج منايل", "دلس", "يسر", "خميس الخشنة", "بودواو"]
}, {
  id: "w-36",
  code: "36",
  nameAr: "الطارف",
  communes: ["الطارف", "القالة", "بن مهيدي", "بوحجار", "الذرعان"]
}, {
  id: "w-37",
  code: "37",
  nameAr: "تندوف",
  communes: ["تندوف", "أم العسل"]
}, {
  id: "w-38",
  code: "38",
  nameAr: "تسمسيلت",
  communes: ["تسمسيلت", "ثنية الحد", "برج بونعامة", "خميستي", "لرجام"]
}, {
  id: "w-39",
  code: "39",
  nameAr: "الوادي",
  communes: ["الوادي", "قمار", "الدبيلة", "الرقيبة", "جامعة", "المقرن"]
}, {
  id: "w-40",
  code: "40",
  nameAr: "خنشلة",
  communes: ["خنشلة", "ششار", "قايس", "بوحمامة", "أولاد رشاش"]
}, {
  id: "w-41",
  code: "41",
  nameAr: "سوق أهراس",
  communes: ["سوق أهراس", "سدراتة", "مداوروش", "تاورة", "المراهنة"]
}, {
  id: "w-42",
  code: "42",
  nameAr: "تيبازة",
  communes: ["تيبازة", "شرشال", "القليعة", "حجوط", "بوسماعيل", "فوكة", "الداموس"]
}, {
  id: "w-43",
  code: "43",
  nameAr: "ميلة",
  communes: ["ميلة", "شلغوم العيد", "تاجنانت", "فرجيوة", "قرارم قوقة"]
}, {
  id: "w-44",
  code: "44",
  nameAr: "عين الدفلى",
  communes: ["عين الدفلى", "خميس مليانة", "مليانة", "العطاف", "العبادية"]
}, {
  id: "w-45",
  code: "45",
  nameAr: "النعامة",
  communes: ["النعامة", "المشرية", "عين الصفراء", "مكمن بن عمار", "عسلة"]
}, {
  id: "w-46",
  code: "46",
  nameAr: "عين تموشنت",
  communes: ["عين تموشنت", "بني صاف", "حمام بوحجر", "العامرية", "عين الكيحل"]
}, {
  id: "w-47",
  code: "47",
  nameAr: "غرداية",
  communes: ["غرداية", "متليلي", "القرارة", "بريان", "بني يزقن", "العطف"]
}, {
  id: "w-48",
  code: "48",
  nameAr: "غليزان",
  communes: ["غليزان", "وادي ارهيو", "مازونة", "زمورة", "يلل", "عمي موسى"]
}, {
  id: "w-49",
  code: "49",
  nameAr: "تيميمون",
  communes: ["تيميمون", "أوقروت", "شروين", "تينركوك"]
}, {
  id: "w-50",
  code: "50",
  nameAr: "برج باجي مختار",
  communes: ["برج باجي مختار", "تيمياوين"]
}, {
  id: "w-51",
  code: "51",
  nameAr: "أولاد جلال",
  communes: ["أولاد جلال", "سيدي خالد", "رأس الميعاد"]
}, {
  id: "w-52",
  code: "52",
  nameAr: "بني عباس",
  communes: ["بني عباس", "القصابي", "تبلبالة", "كرزاز"]
}, {
  id: "w-53",
  code: "53",
  nameAr: "عين صالح",
  communes: ["عين صالح", "إينغر", "فقارة الزاوية"]
}, {
  id: "w-54",
  code: "54",
  nameAr: "عين قزام",
  communes: ["عين قزام", "تين زواتين"]
}, {
  id: "w-55",
  code: "55",
  nameAr: "تقرت",
  communes: ["تقرت", "النزلة", "تماسين", "المقارين", "الطيبات"]
}, {
  id: "w-56",
  code: "56",
  nameAr: "جانت",
  communes: ["جانت", "برج الحواس"]
}, {
  id: "w-57",
  code: "57",
  nameAr: "المغير",
  communes: ["المغير", "جامعة", "أم الطيور", "سيدي عمران"]
}, {
  id: "w-58",
  code: "58",
  nameAr: "المنيعة",
  communes: ["المنيعة", "حاسي القارة", "حاسي الفحل"]
}];
export const INITIAL_ORDERS: OrderItem[] = [{
  id: "ord-1",
  orderNumber: "NM-2026-8491",
  customerName: "سليمان بوزيد",
  phoneNumber: "0550123456",
  secondaryPhone: "0770987654",
  wilaya: "الجزائر",
  commune: "الدار البيضاء",
  brand: "CONTINENTAL",
  tireSize: "205/55 R16 91V",
  quantity: 4,
  unitPriceDzd: 18500,
  totalPriceDzd: 74000,
  nationalIdNumber: "109827364519283746",
  dahabiaCardNumber: "628001234567890123",
  dahabiaExpiry: "08/28",
  status: "NEW",
  notes: "طلب استلام في محطة نفطال الدار البيضاء الطريق السريع.",
  customerId: null,
  createdAt: new Date("2026-03-29T09:15:00Z"),
  updatedAt: new Date("2026-03-29T09:15:00Z")
}, {
  id: "ord-2",
  orderNumber: "NM-2026-8492",
  customerName: "عبد القادر بلحاج",
  phoneNumber: "0661445566",
  secondaryPhone: "0560112233",
  wilaya: "وهران",
  commune: "السانية",
  brand: "IRIS",
  tireSize: "185/65 R15 88H",
  quantity: 2,
  unitPriceDzd: 9200,
  totalPriceDzd: 18400,
  nationalIdNumber: "105647382910485729",
  dahabiaCardNumber: "628009876543210987",
  dahabiaExpiry: "11/27",
  status: "PROCESSING",
  notes: "تم التحقق من الحصة وتخصيص المقاس في المستودع الإقليمي.",
  customerId: null,
  createdAt: new Date("2026-03-29T08:40:00Z"),
  updatedAt: new Date("2026-03-29T08:40:00Z")
}, {
  id: "ord-3",
  orderNumber: "NM-2026-8493",
  customerName: "فاطمة الزهراء بن عيسى",
  phoneNumber: "0770332211",
  secondaryPhone: "",
  wilaya: "قسنطينة",
  commune: "الخروب",
  brand: "CONTINENTAL",
  tireSize: "225/45 R17 94Y",
  quantity: 4,
  unitPriceDzd: 24500,
  totalPriceDzd: 98000,
  nationalIdNumber: "112233445566778899",
  dahabiaCardNumber: "628001122334455678",
  dahabiaExpiry: "05/29",
  status: "COMPLETED",
  notes: "تم التركيب والتسليم بنجاح في مركز خدمات نفطال الخروب.",
  customerId: null,
  createdAt: new Date("2026-03-28T17:30:00Z"),
  updatedAt: new Date("2026-03-28T17:30:00Z")
}, {
  id: "ord-4",
  orderNumber: "NM-2026-8494",
  customerName: "حمزة قندوز",
  phoneNumber: "0555889900",
  secondaryPhone: "",
  wilaya: "سطيف",
  commune: "العلمة",
  brand: "IRIS",
  tireSize: "205/60 R16 92H",
  quantity: 4,
  unitPriceDzd: 11500,
  totalPriceDzd: 46000,
  nationalIdNumber: "109988776655443322",
  dahabiaCardNumber: "628005544332211009",
  dahabiaExpiry: "03/27",
  status: "NEW",
  notes: "في انتظار إقرار الدفعة من المشرف المناوب.",
  customerId: null,
  createdAt: new Date("2026-03-28T14:10:00Z"),
  updatedAt: new Date("2026-03-28T14:10:00Z")
}, {
  id: "ord-5",
  orderNumber: "NM-2026-8495",
  customerName: "طارق زياني",
  phoneNumber: "0660778899",
  secondaryPhone: "0790123456",
  wilaya: "البليدة",
  commune: "بوفاريك",
  brand: "CONTINENTAL",
  tireSize: "195/65 R15 91H",
  quantity: 2,
  unitPriceDzd: 16200,
  totalPriceDzd: 32400,
  nationalIdNumber: "104455667788990011",
  dahabiaCardNumber: "628009988776655443",
  dahabiaExpiry: "12/28",
  status: "PROCESSING",
  notes: "تم تأكيد موعد الاستلام ليوم الغد.",
  customerId: null,
  createdAt: new Date("2026-03-28T11:05:00Z"),
  updatedAt: new Date("2026-03-28T11:05:00Z")
}, {
  id: "ord-6",
  orderNumber: "NM-2026-8496",
  customerName: "ياسين بن مرابط",
  phoneNumber: "0771223344",
  secondaryPhone: "",
  wilaya: "بجاية",
  commune: "أقبو",
  brand: "IRIS",
  tireSize: "175/70 R14 84T",
  quantity: 4,
  unitPriceDzd: 7800,
  totalPriceDzd: 31200,
  nationalIdNumber: "108877665544332211",
  dahabiaCardNumber: "628003344556677889",
  dahabiaExpiry: "09/26",
  status: "CANCELLED",
  notes: "تم الإلغاء لعدم تطابق الاسم مع بيانات البطاقة الذهبية.",
  customerId: null,
  createdAt: new Date("2026-03-27T16:45:00Z"),
  updatedAt: new Date("2026-03-27T16:45:00Z")
}, {
  id: "ord-7",
  orderNumber: "NM-2026-8497",
  customerName: "مصطفى رحماني",
  phoneNumber: "0551334455",
  secondaryPhone: "",
  wilaya: "ورقلة",
  commune: "حاسي مسعود",
  brand: "CONTINENTAL",
  tireSize: "265/65 R17 112T",
  quantity: 4,
  unitPriceDzd: 34000,
  totalPriceDzd: 136000,
  nationalIdNumber: "101122334455667788",
  dahabiaCardNumber: "628007788990011223",
  dahabiaExpiry: "07/30",
  status: "COMPLETED",
  notes: "استلام حصة مركبة رباعية الدفع في محطة نفطال حاسي مسعود.",
  customerId: null,
  createdAt: new Date("2026-03-27T10:20:00Z"),
  updatedAt: new Date("2026-03-27T10:20:00Z")
}, {
  id: "ord-8",
  orderNumber: "NM-2026-8498",
  customerName: "نور الدين عمروش",
  phoneNumber: "0662556677",
  secondaryPhone: "",
  wilaya: "تيزي وزو",
  commune: "عزازقة",
  brand: "IRIS",
  tireSize: "195/55 R16 87V",
  quantity: 2,
  unitPriceDzd: 10400,
  totalPriceDzd: 20800,
  nationalIdNumber: "107766554433221100",
  dahabiaCardNumber: "628002233445566778",
  dahabiaExpiry: "02/28",
  status: "NEW",
  notes: "طلب قيد المراجعة الإدارية.",
  customerId: null,
  createdAt: new Date("2026-03-26T15:50:00Z"),
  updatedAt: new Date("2026-03-26T15:50:00Z")
}, {
  id: "ord-9",
  orderNumber: "NM-2026-8499",
  customerName: "إلياس مقراني",
  phoneNumber: "0778990011",
  secondaryPhone: "",
  wilaya: "الجزائر",
  commune: "زرالدة",
  brand: "CONTINENTAL",
  tireSize: "215/60 R16 95V",
  quantity: 4,
  unitPriceDzd: 21000,
  totalPriceDzd: 84000,
  nationalIdNumber: "103344556677889900",
  dahabiaCardNumber: "628004455667788990",
  dahabiaExpiry: "04/29",
  status: "PROCESSING",
  notes: "في انتظار إشعار وصول الشحنة لنقطة التوزيع.",
  customerId: null,
  createdAt: new Date("2026-03-26T11:15:00Z"),
  updatedAt: new Date("2026-03-26T11:15:00Z")
}, {
  id: "ord-10",
  orderNumber: "NM-2026-8500",
  customerName: "خالد بن مهيدي",
  phoneNumber: "0559001122",
  secondaryPhone: "",
  wilaya: "وهران",
  commune: "أرزيو",
  brand: "IRIS",
  tireSize: "215/65 R16 98H",
  quantity: 4,
  unitPriceDzd: 12800,
  totalPriceDzd: 51200,
  nationalIdNumber: "102233445566778899",
  dahabiaCardNumber: "628006677889900112",
  dahabiaExpiry: "10/27",
  status: "COMPLETED",
  notes: "تم الاستلام مع تقديم الوصل والبطاقة البيومترية.",
  customerId: null,
  createdAt: new Date("2026-03-25T14:00:00Z"),
  updatedAt: new Date("2026-03-25T14:00:00Z")
}];
export const INITIAL_STOCKS: TireSizeStock[] = [
// Continental
{
  id: "cont-1",
  brand: "CONTINENTAL",
  size: "205/55 R16 91V",
  category: "TOURISM",
  priceDzd: 18500,
  availableStock: 84,
  reservedStock: 12,
  minThreshold: 15,
  speedIndex: "91V",
  isAvailable: true,
  createdAt: new Date("2026-03-01T00:00:00Z"),
  updatedAt: new Date("2026-03-01T00:00:00Z")
}, {
  id: "cont-2",
  brand: "CONTINENTAL",
  size: "195/65 R15 91H",
  category: "TOURISM",
  priceDzd: 16200,
  availableStock: 52,
  reservedStock: 8,
  minThreshold: 10,
  speedIndex: "91H",
  isAvailable: true,
  createdAt: new Date("2026-03-01T00:00:00Z"),
  updatedAt: new Date("2026-03-01T00:00:00Z")
}, {
  id: "cont-3",
  brand: "CONTINENTAL",
  size: "225/45 R17 94Y",
  category: "TOURISM",
  priceDzd: 24500,
  availableStock: 36,
  reservedStock: 6,
  minThreshold: 10,
  speedIndex: "94Y",
  isAvailable: true,
  createdAt: new Date("2026-03-01T00:00:00Z"),
  updatedAt: new Date("2026-03-01T00:00:00Z")
}, {
  id: "cont-4",
  brand: "CONTINENTAL",
  size: "215/60 R16 95V",
  category: "TOURISM",
  priceDzd: 21000,
  availableStock: 28,
  reservedStock: 4,
  minThreshold: 8,
  speedIndex: "95V",
  isAvailable: true,
  createdAt: new Date("2026-03-01T00:00:00Z"),
  updatedAt: new Date("2026-03-01T00:00:00Z")
}, {
  id: "cont-5",
  brand: "CONTINENTAL",
  size: "265/65 R17 112T",
  category: "SUV",
  priceDzd: 34000,
  availableStock: 8,
  reservedStock: 4,
  minThreshold: 10,
  speedIndex: "112T",
  isAvailable: true,
  createdAt: new Date("2026-03-01T00:00:00Z"),
  updatedAt: new Date("2026-03-01T00:00:00Z")
},
// Iris
{
  id: "iris-1",
  brand: "IRIS",
  size: "185/65 R15 88H",
  category: "TOURISM",
  priceDzd: 9200,
  availableStock: 140,
  reservedStock: 20,
  minThreshold: 20,
  speedIndex: "88H",
  isAvailable: true,
  createdAt: new Date("2026-03-01T00:00:00Z"),
  updatedAt: new Date("2026-03-01T00:00:00Z")
}, {
  id: "iris-2",
  brand: "IRIS",
  size: "205/55 R16 91V",
  category: "TOURISM",
  priceDzd: 10800,
  availableStock: 95,
  reservedStock: 14,
  minThreshold: 20,
  speedIndex: "91V",
  isAvailable: true,
  createdAt: new Date("2026-03-01T00:00:00Z"),
  updatedAt: new Date("2026-03-01T00:00:00Z")
}, {
  id: "iris-3",
  brand: "IRIS",
  size: "175/70 R14 84T",
  category: "TOURISM",
  priceDzd: 7800,
  availableStock: 110,
  reservedStock: 10,
  minThreshold: 25,
  speedIndex: "84T",
  isAvailable: true,
  createdAt: new Date("2026-03-01T00:00:00Z"),
  updatedAt: new Date("2026-03-01T00:00:00Z")
}, {
  id: "iris-4",
  brand: "IRIS",
  size: "205/60 R16 92H",
  category: "TOURISM",
  priceDzd: 11500,
  availableStock: 62,
  reservedStock: 8,
  minThreshold: 15,
  speedIndex: "92H",
  isAvailable: true,
  createdAt: new Date("2026-03-01T00:00:00Z"),
  updatedAt: new Date("2026-03-01T00:00:00Z")
}, {
  id: "iris-5",
  brand: "IRIS",
  size: "215/65 R16 98H",
  category: "UTILITY",
  priceDzd: 12800,
  availableStock: 6,
  reservedStock: 6,
  minThreshold: 10,
  speedIndex: "98H",
  isAvailable: true,
  createdAt: new Date("2026-03-01T00:00:00Z"),
  updatedAt: new Date("2026-03-01T00:00:00Z")
}];
export const INITIAL_FAQS: PlatformFaqItem[] = [{
  id: "faq-1",
  question: "ما هي شروط الاستفادة من حصة الإطارات الرسمية عبر منصة محطتي؟",
  answer: "يشترط تقديم بطاقة التعريف الوطنية البيومترية سارية المفعول ورقم البطاقة الذهبية المشفرة لبريد الجزائر (18 خانة) المطابقة لهوية صاحب الطلب.",
  category: "ORDERS",
  isActive: true,
  createdAt: new Date("2026-03-29T00:00:00Z"),
  updatedAt: new Date("2026-03-29T00:00:00Z")
}, {
  id: "faq-2",
  question: "كيف يتم التحقق من صحة البطاقة الذهبية أثناء تسجيل الطلبية؟",
  answer: "يتم فحص أرقام البطاقة الذهبية الـ 18 عبر خوارزمية التحقق الرسمية للتأكد من بنيتها المصرفية قبل تأكيد الحجز في محطة التوزيع المختارة.",
  category: "PAYMENT",
  isActive: true,
  createdAt: new Date("2026-03-28T00:00:00Z"),
  updatedAt: new Date("2026-03-28T00:00:00Z")
}, {
  id: "faq-3",
  question: "ما هو الحد الأقصى لعدد الإطارات المسموح بطلبها لكل مواطن؟",
  answer: "الحد الأقصى هو 4 إطارات للمركبات السياحية ونفعية خفيفة لكل رقم تعريف وطني خلال فترة 12 شهراً لضمان العدالة وتفادي المضاربة.",
  category: "ORDERS",
  isActive: true,
  createdAt: new Date("2026-03-25T00:00:00Z"),
  updatedAt: new Date("2026-03-25T00:00:00Z")
}, {
  id: "faq-4",
  question: "أين يتم استلام وتركيب الإطارات المعتمدة بعد تأكيد الطلب؟",
  answer: "يتم الاستلام حصرياً في مركز خدمات نفطال أو محطة الوقود المحددة أثناء التسجيل في الولاية والبلدية المختارة مع إبراز وصل الطلب NM-2026.",
  category: "DELIVERY",
  isActive: true,
  createdAt: new Date("2026-03-20T00:00:00Z"),
  updatedAt: new Date("2026-03-20T00:00:00Z")
}, {
  id: "faq-5",
  question: "ما هي مدة الضمان الرسمي المقدم على إطارات Continental و Iris؟",
  answer: "تستفيد كافة الإطارات المقتناة عبر المنصة من ضمان المصنع الرسمي لمدة 12 شهراً أو 30,000 كم ضد أي عيوب تصنيعية مع شهادة ضمان رقمية.",
  category: "WARRANTY",
  isActive: true,
  createdAt: new Date("2026-03-18T00:00:00Z"),
  updatedAt: new Date("2026-03-18T00:00:00Z")
}];
export const INITIAL_CHANNELS: SupportChannelItem[] = [{
  id: "ch-1",
  title: "الرقم الأخضر المجاني",
  value: "1050",
  description: "متاح طيلة أيام الأسبوع من 08:00 إلى 20:00 لاستقبال الاستفسارات والشكاوى ومتابعة وصول الحصص.",
  isActive: true,
  createdAt: new Date("2026-03-01T00:00:00Z"),
  updatedAt: new Date("2026-03-01T00:00:00Z")
}, {
  id: "ch-2",
  title: "البريد الإلكتروني للإسناد المركزي",
  value: "contact@naftal.dz",
  description: "المراسلات الرسمية وتأكيد حزم التوزيع لمراكز خدمات نفطال ونقاط التوزيع المعتمدة.",
  isActive: true,
  createdAt: new Date("2026-03-01T00:00:00Z"),
  updatedAt: new Date("2026-03-01T00:00:00Z")
}, {
  id: "ch-3",
  title: "مركز المراقبة والتنسيق الوطني",
  value: "021.38.10.50",
  description: "الخط المباشر المخصص للتنسيق بين المستودعات المركزية ومحطات التوزيع عبر الـ 58 ولاية.",
  isActive: true,
  createdAt: new Date("2026-03-01T00:00:00Z"),
  updatedAt: new Date("2026-03-01T00:00:00Z")
}];