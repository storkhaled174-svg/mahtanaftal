import { PrismaClient, Prisma, FaqCategory, OrderStatus, TireBrand, TireCategory, UserRole } from "@prisma/client";
import { hashPassword } from "../src/@base/BaseActionFun";

function requireSeedPassword(name: string) {
  const value = process.env[name];
  if (!value || value.length < 12) throw new Error(`Set ${name} to a unique password of at least 12 characters before seeding`);
  return value;
}
const prisma = new PrismaClient();
type SeedEntity = Record<string, unknown>;
type RelationBinding = { target_entity_key: string; local_fields: readonly string[]; target_fields: readonly string[] };

const accountUserRecords = [
  { entityKey: "AccountUser:admin_user_1", data: {
      id: "f5783e71-c5db-4fb3-a74c-0d85516b7ee0",
      createdAt: new Date("2026-09-01T08:00:00.000Z"),
      fullName: "أمين بلقاسم",
      nationalIdNumber: "100234567890123456",
      passwordHash: hashPassword(requireSeedPassword("SEED_ADMIN_PASSWORD")),
      phoneNumber: "0550123456",
      role: UserRole.ADMIN,
      username: "admin_naftal"
    }, relations: [] },
  { entityKey: "AccountUser:customer_user_1", data: {
      id: "3c62884d-1fd8-443d-a38f-bb548d2e850b",
      createdAt: new Date("2026-09-10T10:30:00.000Z"),
      fullName: "ياسين بن عيسى",
      nationalIdNumber: "199412345678901234",
      passwordHash: hashPassword(requireSeedPassword("SEED_CUSTOMER_PASSWORD")),
      phoneNumber: "0661234567",
      role: UserRole.CUSTOMER,
      username: "yassine_dz"
    }, relations: [] },
] as const;

const algerianWilayaRecords = [
  { entityKey: "AlgerianWilaya:wilaya_01", data: {
      id: "02bac65a-89ee-4d05-a96d-29e4573750da",
      code: "01",
      communes: ["أدرار", "تيمقطن", "تمنطيط", "فنوغيل", "زاوية كنتة"] as Prisma.InputJsonValue,
      createdAt: new Date("2026-01-10T08:00:00.000Z"),
      nameAr: "أدرار"
    }, relations: [] },
  { entityKey: "AlgerianWilaya:wilaya_02", data: {
      id: "71c351c2-95b0-4302-aec6-293ada0d5da9",
      code: "02",
      communes: ["الشلف", "تنس", "أولاد فارس", "بوقادير", "الكريمية", "بني حواء"] as Prisma.InputJsonValue,
      createdAt: new Date("2026-01-10T08:05:00.000Z"),
      nameAr: "الشلف"
    }, relations: [] },
  { entityKey: "AlgerianWilaya:wilaya_03", data: {
      id: "a5f8d7fb-9d32-4467-a34b-787ac617c7af",
      code: "03",
      communes: ["الأغواط", "أفلو", "قصر الحيران", "عين ماضي", "سيدي مخلوف"] as Prisma.InputJsonValue,
      createdAt: new Date("2026-01-10T08:10:00.000Z"),
      nameAr: "الأغواط"
    }, relations: [] },
  { entityKey: "AlgerianWilaya:wilaya_16", data: {
      id: "49782db4-2a95-47e8-af53-32b49f28fd38",
      code: "16",
      communes: ["الجزائر الوسطى", "باب الوادي", "الدار البيضاء", "زرالدة", "بئر مراد رايس", "حسين داي"] as Prisma.InputJsonValue,
      createdAt: new Date("2026-01-10T08:15:00.000Z"),
      nameAr: "الجزائر"
    }, relations: [] },
  { entityKey: "AlgerianWilaya:wilaya_25", data: {
      id: "461eb8db-aa1c-4f68-a6bd-05299cb23bb6",
      code: "25",
      communes: ["قسنطينة", "الخروب", "عين سمارة", "زيغود يوسف", "حامة بوزيان"] as Prisma.InputJsonValue,
      createdAt: new Date("2026-01-10T08:20:00.000Z"),
      nameAr: "قسنطينة"
    }, relations: [] },
  { entityKey: "AlgerianWilaya:wilaya_31", data: {
      id: "d12ed32a-df0c-469c-a654-a8c2591906e8",
      code: "31",
      communes: ["وهران", "السانية", "بئر الجير", "عين الترك", "أرزيو", "بطيوة"] as Prisma.InputJsonValue,
      createdAt: new Date("2026-01-10T08:25:00.000Z"),
      nameAr: "وهران"
    }, relations: [] },
] as const;

const tireStockRecords = [
  { entityKey: "TireStock:tire_stock_cont_205_55_r16", data: {
      id: "3ca40414-185a-44e3-a68b-5cf40e191a88",
      availableStock: 85,
      brand: TireBrand.CONTINENTAL,
      category: TireCategory.TOURISM,
      createdAt: new Date("2026-09-01T08:00:00.000Z"),
      isAvailable: true,
      minThreshold: 20,
      priceDzd: new Prisma.Decimal("18500"),
      reservedStock: 24,
      size: "205/55 R16",
      speedIndex: "91V PremiumContact 6"
    }, relations: [] },
  { entityKey: "TireStock:tire_stock_iris_185_65_r15", data: {
      id: "00e6ec5c-e0b5-47b8-a3de-2b7a37c1ae2f",
      availableStock: 140,
      brand: TireBrand.IRIS,
      category: TireCategory.TOURISM,
      createdAt: new Date("2026-09-02T09:15:00.000Z"),
      isAvailable: true,
      minThreshold: 30,
      priceDzd: new Prisma.Decimal("9200"),
      reservedStock: 35,
      size: "185/65 R15",
      speedIndex: "88H Ecoris"
    }, relations: [] },
  { entityKey: "TireStock:tire_stock_cont_225_45_r17", data: {
      id: "340493ae-2b70-47bc-adf4-7cd1153777df",
      availableStock: 8,
      brand: TireBrand.CONTINENTAL,
      category: TireCategory.TOURISM,
      createdAt: new Date("2026-09-03T11:00:00.000Z"),
      isAvailable: true,
      minThreshold: 15,
      priceDzd: new Prisma.Decimal("24000"),
      reservedStock: 12,
      size: "225/45 R17",
      speedIndex: "94Y SportContact 5"
    }, relations: [] },
  { entityKey: "TireStock:tire_stock_cont_235_60_r18", data: {
      id: "64462322-1fc2-4874-ae41-10bdda0c123e",
      availableStock: 45,
      brand: TireBrand.CONTINENTAL,
      category: TireCategory.SUV,
      createdAt: new Date("2026-09-05T10:30:00.000Z"),
      isAvailable: true,
      minThreshold: 12,
      priceDzd: new Prisma.Decimal("32000"),
      reservedStock: 10,
      size: "235/60 R18",
      speedIndex: "103V CrossContact LX"
    }, relations: [] },
  { entityKey: "TireStock:tire_stock_iris_175_70_r13", data: {
      id: "d6645f62-778d-40da-af35-838d379be020",
      availableStock: 110,
      brand: TireBrand.IRIS,
      category: TireCategory.TOURISM,
      createdAt: new Date("2026-09-06T14:20:00.000Z"),
      isAvailable: true,
      minThreshold: 25,
      priceDzd: new Prisma.Decimal("7800"),
      reservedStock: 18,
      size: "175/70 R13",
      speedIndex: "82T Sefar"
    }, relations: [] },
  { entityKey: "TireStock:tire_stock_iris_215_65_r16", data: {
      id: "bcf6c6f6-8ae3-4aa8-a2e0-1b92bbe01a35",
      availableStock: 60,
      brand: TireBrand.IRIS,
      category: TireCategory.SUV,
      createdAt: new Date("2026-09-08T08:45:00.000Z"),
      isAvailable: true,
      minThreshold: 15,
      priceDzd: new Prisma.Decimal("13500"),
      reservedStock: 15,
      size: "215/65 R16",
      speedIndex: "98H Aures"
    }, relations: [] },
  { entityKey: "TireStock:tire_stock_cont_195_70_r15c", data: {
      id: "666363bd-10d7-4626-abec-66f92f78b30e",
      availableStock: 35,
      brand: TireBrand.CONTINENTAL,
      category: TireCategory.UTILITY,
      createdAt: new Date("2026-09-10T12:00:00.000Z"),
      isAvailable: true,
      minThreshold: 10,
      priceDzd: new Prisma.Decimal("21000"),
      reservedStock: 8,
      size: "195/70 R15C",
      speedIndex: "104/102R VanContact 100"
    }, relations: [] },
  { entityKey: "TireStock:tire_stock_iris_205_75_r16c", data: {
      id: "d8ea4d16-0d34-45b5-a961-b51f0e5d9fa3",
      availableStock: 50,
      brand: TireBrand.IRIS,
      category: TireCategory.UTILITY,
      createdAt: new Date("2026-09-12T09:00:00.000Z"),
      isAvailable: true,
      minThreshold: 12,
      priceDzd: new Prisma.Decimal("15800"),
      reservedStock: 14,
      size: "205/75 R16C",
      speedIndex: "110/108R Lanev"
    }, relations: [] },
  { entityKey: "TireStock:tire_stock_cont_195_65_r15", data: {
      id: "4322cbcc-8fb3-43a7-abd8-84fa39d7fff9",
      availableStock: 0,
      brand: TireBrand.CONTINENTAL,
      category: TireCategory.TOURISM,
      createdAt: new Date("2026-09-15T15:10:00.000Z"),
      isAvailable: false,
      minThreshold: 20,
      priceDzd: new Prisma.Decimal("16500"),
      reservedStock: 0,
      size: "195/65 R15",
      speedIndex: "91H UltraContact"
    }, relations: [] },
  { entityKey: "TireStock:tire_stock_iris_195_55_r16", data: {
      id: "44015811-270c-40fa-ac1f-721af4281612",
      availableStock: 75,
      brand: TireBrand.IRIS,
      category: TireCategory.TOURISM,
      createdAt: new Date("2026-09-18T11:40:00.000Z"),
      isAvailable: true,
      minThreshold: 15,
      priceDzd: new Prisma.Decimal("10500"),
      reservedStock: 20,
      size: "195/55 R16",
      speedIndex: "87V Stormy"
    }, relations: [] },
  { entityKey: "TireStock:tire_stock_cont_255_50_r19", data: {
      id: "29e41ef8-c927-4c36-a16b-9676efdec147",
      availableStock: 25,
      brand: TireBrand.CONTINENTAL,
      category: TireCategory.SUV,
      createdAt: new Date("2026-09-20T16:20:00.000Z"),
      isAvailable: true,
      minThreshold: 8,
      priceDzd: new Prisma.Decimal("38500"),
      reservedStock: 6,
      size: "255/50 R19",
      speedIndex: "107Y PremiumContact 6 SSR"
    }, relations: [] },
  { entityKey: "TireStock:tire_stock_iris_195_75_r16c", data: {
      id: "55e95161-40f6-4cdc-a32b-df116d805989",
      availableStock: 40,
      brand: TireBrand.IRIS,
      category: TireCategory.UTILITY,
      createdAt: new Date("2026-09-22T13:50:00.000Z"),
      isAvailable: true,
      minThreshold: 10,
      priceDzd: new Prisma.Decimal("14900"),
      reservedStock: 10,
      size: "195/75 R16C",
      speedIndex: "107/105R Lanev"
    }, relations: [] },
] as const;

const platformFaqRecords = [
  { entityKey: "PlatformFaq:faq-orders-reservation", data: {
      id: "cf49b2a9-e05c-4d69-a052-c030b94c97a3",
      answer: "يتم حجز الحصة باختيار مقاس الإطار والعلامة المعتمدة (Continental أو Iris) عبر البوابة، وتحديد الولاية والمحطة المناسبة لاستلام الطلبية مع تثبيت رقم بطاقة التعريف الوطنية البيومترية.",
      category: FaqCategory.ORDERS,
      createdAt: new Date("2026-03-15T09:00:00.000Z"),
      isActive: true,
      question: "كيف تتم عملية حجز حصة الإطارات المطاطية عبر منصة نفطال محطتي؟"
    }, relations: [] },
  { entityKey: "PlatformFaq:faq-orders-max-quota", data: {
      id: "953fc191-5a8f-4d3a-aebf-6fb4501bdfe2",
      answer: "الحد الأقصى المسموح به هو 4 إطارات للمركبات السياحية والنفعية الخفيفة لكل رقم تعريف وطني خلال فترة 12 شهراً لضمان التوزيع العادل والشفاف وتفادي أي مضاربة.",
      category: FaqCategory.ORDERS,
      createdAt: new Date("2026-04-10T10:30:00.000Z"),
      isActive: true,
      question: "ما هو الحد الأقصى لعدد الإطارات المسموح بطلبها لكل مواطن؟"
    }, relations: [] },
  { entityKey: "PlatformFaq:faq-payment-dahabia-otp", data: {
      id: "6044bab1-8a87-4606-aff5-a1011bfc5399",
      answer: "يشترط أن تكون البطاقة الذهبية مفعلة لخدمة الدفع الإلكتروني، مع إدخال رقم البطاقة ورمز التأكيد السري OTP المستلم عبر الرسالة النصية لضمان تأكيد خصم المبلغ وتأكيد الطلبية فورياً.",
      category: FaqCategory.PAYMENT,
      createdAt: new Date("2026-05-18T14:15:00.000Z"),
      isActive: true,
      question: "ما هي شروط الدفع الإلكتروني بالبطاقة الذهبية CIB لطلبيات الإطارات؟"
    }, relations: [] },
  { entityKey: "PlatformFaq:faq-payment-station-methods", data: {
      id: "0dbafc7b-b17d-4039-a457-fb57e142f309",
      answer: "يمكن تسديد قيمة الطلبية إلكترونياً أثناء التسجيل بالبطاقة الذهبية، أو مباشرة في محطة نفطال المعينة عبر أجهزة الدفع الإلكتروني TPE أو نقداً بالدينار الجزائري وفق السعر المقنن.",
      category: FaqCategory.PAYMENT,
      createdAt: new Date("2026-06-22T11:00:00.000Z"),
      isActive: true,
      question: "ما هي طرق الدفع المتاحة لتسديد قيمة الإطارات المحجوزة؟"
    }, relations: [] },
  { entityKey: "PlatformFaq:faq-delivery-station-documents", data: {
      id: "b83203b6-4843-45f6-a9e5-4e85092937e5",
      answer: "يتوجب على الزبون إحضار بطاقة التعريف الوطنية البيومترية الأصلية ووصل حجز الطلبية الرقمي (NM-2026) المتضمن رمز QR للتحقق من هوية صاحب المركبة وتأكيد الاستلام بالمحطة.",
      category: FaqCategory.DELIVERY,
      createdAt: new Date("2026-08-05T08:45:00.000Z"),
      isActive: true,
      question: "ما هي الوثائق المطلوبة لاستلام الإطارات من محطة خدمة نفطال المختارة؟"
    }, relations: [] },
  { entityKey: "PlatformFaq:faq-warranty-manufacturer-terms", data: {
      id: "057157cc-6f22-42e8-a546-b38664e006b1",
      answer: "تستفيد كافة الإطارات الأصلية المعتمدة (Continental وIris) من ضمان مصنعي رسمي ضد عيوب التصنيع لمدة 12 شهراً ابتداءً من تاريخ الاستلام والتركيب بمركز خدمات نفطال.",
      category: FaqCategory.WARRANTY,
      createdAt: new Date("2026-09-12T16:20:00.000Z"),
      isActive: false,
      question: "ما هي شروط وضمانات الجودة وما بعد البيع للإطارات المقتناة؟"
    }, relations: [] },
] as const;

const supportChannelRecords = [
  { entityKey: "SupportChannel:support_channel_green_line", data: {
      id: "b839748f-4124-4bb6-a1e0-37e14078cea7",
      createdAt: new Date("2026-01-05T08:00:00.000Z"),
      description: "متاح طيلة أيام الأسبوع من 07:30 صباحاً حتى 21:00 مساءً للرد المجاني على انشغالات المواطنين وطلبيات الإطارات والمحطات.",
      isActive: true,
      title: "الرقم الأخضر الوطني الموحد (مركز النداء)",
      value: "1050"
    }, relations: [] },
  { entityKey: "SupportChannel:support_channel_email", data: {
      id: "e02ebf89-4d3b-40b2-a1d6-95c5e74038db",
      createdAt: new Date("2026-01-12T09:00:00.000Z"),
      description: "استقبال استفسارات المواطنين والشكاوى التقنية المتعلقة بالدفع الإلكتروني بالبطاقة الذهبية وتأكيد الطلبيات على مدار 24/7.",
      isActive: true,
      title: "البريد الإلكتروني الرسمي لخدمة الزبائن والدعم",
      value: "support.mhatati@naftal.dz"
    }, relations: [] },
  { entityKey: "SupportChannel:support_channel_cib_support", data: {
      id: "801a1071-97be-4ab6-ac9e-67d7cca9be21",
      createdAt: new Date("2026-01-20T10:00:00.000Z"),
      description: "مخصصة لحل مشاكل تسوية المعاملات المالية العالقة والتحقق من حسابات بريد الجزائر وبنك الجزائر الخارجي.",
      isActive: true,
      title: "خلية الدعم الفني الخاصة بالدفع الإلكتروني CIB",
      value: "021 38 12 12"
    }, relations: [] },
] as const;

const tireOrderRecords = [
  { entityKey: "TireOrder:tire_order_1", data: {
      id: "6a501e46-aafc-4249-a276-c9d9a18e289d",
      brand: TireBrand.CONTINENTAL,
      commune: "الدار البيضاء",
      createdAt: new Date("2026-10-04T09:15:00.000Z"),
      customerName: "سليمان بوزيد",
      dahabiaCardNumber: "67890123",
      dahabiaExpiry: "08/28",
      nationalIdNumber: "109827364519283746",
      notes: "طلب استلام في محطة نفطال الدار البيضاء الطريق السريع.",
      orderNumber: "NM-2026-8491",
      phoneNumber: "0550123456",
      quantity: 4,
      secondaryPhone: "0770987654",
      status: OrderStatus.NEW,
      tireSize: "205/55 R16",
      totalPriceDzd: new Prisma.Decimal("74000"),
      unitPriceDzd: new Prisma.Decimal("18500"),
      wilaya: "الجزائر"
    }, relations: [{"target_entity_key": "AccountUser:customer_user_1", "local_fields": ["customerId"], "target_fields": ["id"]}] },
  { entityKey: "TireOrder:tire_order_2", data: {
      id: "70df29e4-7dcc-4990-a0d3-20de317f9267",
      brand: TireBrand.IRIS,
      commune: "السانية",
      createdAt: new Date("2026-10-03T14:20:00.000Z"),
      customerName: "عبد القادر بلحاج",
      dahabiaCardNumber: "43210987",
      dahabiaExpiry: "11/27",
      nationalIdNumber: "105647382910485729",
      notes: "تم التحقق من الحصة وتخصيص المقاس في المستودع الإقليمي.",
      orderNumber: "NM-2026-8492",
      phoneNumber: "0661445566",
      quantity: 2,
      secondaryPhone: "0560112233",
      status: OrderStatus.PROCESSING,
      tireSize: "185/65 R15",
      totalPriceDzd: new Prisma.Decimal("18400"),
      unitPriceDzd: new Prisma.Decimal("9200"),
      wilaya: "وهران"
    }, relations: [{"target_entity_key": "AccountUser:customer_user_1", "local_fields": ["customerId"], "target_fields": ["id"]}] },
  { entityKey: "TireOrder:tire_order_3", data: {
      id: "0ca4d96f-ee48-4119-acd0-56abd42d3b6f",
      brand: TireBrand.CONTINENTAL,
      commune: "الخروب",
      createdAt: new Date("2026-09-28T16:30:00.000Z"),
      customerName: "فاطمة الزهراء بن عيسى",
      dahabiaCardNumber: "34455678",
      dahabiaExpiry: "05/29",
      nationalIdNumber: "112233445566778899",
      notes: "تم التركيب والتسليم بنجاح في مركز خدمات نفطال الخروب.",
      orderNumber: "NM-2026-8493",
      phoneNumber: "0770332211",
      quantity: 4,
      secondaryPhone: "0661998877",
      status: OrderStatus.COMPLETED,
      tireSize: "225/45 R17",
      totalPriceDzd: new Prisma.Decimal("96000"),
      unitPriceDzd: new Prisma.Decimal("24000"),
      wilaya: "قسنطينة"
    }, relations: [{"target_entity_key": "AccountUser:customer_user_1", "local_fields": ["customerId"], "target_fields": ["id"]}] },
  { entityKey: "TireOrder:tire_order_4", data: {
      id: "52ba550f-a5c3-4385-a88e-f89ff0cbb2f9",
      brand: TireBrand.CONTINENTAL,
      commune: "زرالدة",
      createdAt: new Date("2026-10-02T10:15:00.000Z"),
      customerName: "سليمان بلقاسم العربي",
      dahabiaCardNumber: "92314012",
      dahabiaExpiry: "11/27",
      nationalIdNumber: "109845210394857211",
      notes: "تم تخصيص الحصة من مستودع رغاية المركزي وهي قيد الشحن نحو محطة نفطال زرالدة.",
      orderNumber: "NM-2026-8841",
      phoneNumber: "0550998877",
      quantity: 2,
      secondaryPhone: "0770112233",
      status: OrderStatus.PROCESSING,
      tireSize: "235/60 R18",
      totalPriceDzd: new Prisma.Decimal("64000"),
      unitPriceDzd: new Prisma.Decimal("32000"),
      wilaya: "الجزائر"
    }, relations: [] },
  { entityKey: "TireOrder:tire_order_5", data: {
      id: "c88d7700-0bff-4b78-a5e7-904577d7a77c",
      brand: TireBrand.IRIS,
      commune: "بئر الجير",
      createdAt: new Date("2026-09-25T11:00:00.000Z"),
      customerName: "فاطمة الزهراء منصوري",
      dahabiaCardNumber: "84771501",
      dahabiaExpiry: "05/28",
      nationalIdNumber: "204896320147852399",
      notes: "الحصة متوفرة بالكامل في ورشة المحطة، تم الاستلام والتركيب الفوري.",
      orderNumber: "NM-2026-4190",
      phoneNumber: "0661987654",
      quantity: 4,
      secondaryPhone: "0550443322",
      status: OrderStatus.COMPLETED,
      tireSize: "215/65 R16",
      totalPriceDzd: new Prisma.Decimal("54000"),
      unitPriceDzd: new Prisma.Decimal("13500"),
      wilaya: "وهران"
    }, relations: [] },
  { entityKey: "TireOrder:tire_order_6", data: {
      id: "32166312-b771-4e9f-a09f-22834658c795",
      brand: TireBrand.IRIS,
      commune: "العلمة",
      createdAt: new Date("2026-10-04T15:45:00.000Z"),
      customerName: "ياسين قندوز العيد",
      dahabiaCardNumber: "48996234",
      dahabiaExpiry: "09/29",
      nationalIdNumber: "119844001928374622",
      notes: "تم تأكيد تسجيل الطلب بنجاح وتجري مراجعة تطابق رقم الهوية مع سجلات البطاقة الذهبية.",
      orderNumber: "NM-2026-1024",
      phoneNumber: "0770554433",
      quantity: 4,
      secondaryPhone: "0661778899",
      status: OrderStatus.NEW,
      tireSize: "175/70 R13",
      totalPriceDzd: new Prisma.Decimal("31200"),
      unitPriceDzd: new Prisma.Decimal("7800"),
      wilaya: "سطيف"
    }, relations: [] },
  { entityKey: "TireOrder:tire_order_7", data: {
      id: "e0198a68-8373-4fcf-af0b-8ae5fc9a570d",
      brand: TireBrand.CONTINENTAL,
      commune: "بوفاريك",
      createdAt: new Date("2026-10-01T08:30:00.000Z"),
      customerName: "محمد لمين بن سالم",
      dahabiaCardNumber: "88990011",
      dahabiaExpiry: "03/28",
      nationalIdNumber: "103344556677889900",
      notes: "مركبة نفعية لنقل البضائع، تم حجز الإطارات في محطة بوفاريك.",
      orderNumber: "NM-2026-3312",
      phoneNumber: "0561223344",
      quantity: 2,
      secondaryPhone: "0771889900",
      status: OrderStatus.PROCESSING,
      tireSize: "195/70 R15C",
      totalPriceDzd: new Prisma.Decimal("42000"),
      unitPriceDzd: new Prisma.Decimal("21000"),
      wilaya: "البليدة"
    }, relations: [] },
  { entityKey: "TireOrder:tire_order_8", data: {
      id: "db11c1cb-80a6-4090-a1c1-c66281399750",
      brand: TireBrand.IRIS,
      commune: "البوني",
      createdAt: new Date("2026-09-22T09:15:00.000Z"),
      customerName: "نور الدين عماري",
      dahabiaCardNumber: "00112233",
      dahabiaExpiry: "12/27",
      nationalIdNumber: "107788990011223344",
      notes: "تم التسليم وتركيب الإطارات بمركز خدمات نفطال عنابة.",
      orderNumber: "NM-2026-5544",
      phoneNumber: "0660334455",
      quantity: 4,
      secondaryPhone: "0551667788",
      status: OrderStatus.COMPLETED,
      tireSize: "205/75 R16C",
      totalPriceDzd: new Prisma.Decimal("63200"),
      unitPriceDzd: new Prisma.Decimal("15800"),
      wilaya: "عنابة"
    }, relations: [] },
  { entityKey: "TireOrder:tire_order_9", data: {
      id: "7b1a10d8-3993-49c2-a003-9760b89ce93c",
      brand: TireBrand.IRIS,
      commune: "منصورة",
      createdAt: new Date("2026-10-05T07:10:00.000Z"),
      customerName: "حمزة شريفي",
      dahabiaCardNumber: "11223344",
      dahabiaExpiry: "07/28",
      nationalIdNumber: "108899001122334455",
      notes: "طلب جديد مسجل عبر البوابة، قيد مراجعة بيانات البطاقة الذهبية.",
      orderNumber: "NM-2026-7789",
      phoneNumber: "0770665544",
      quantity: 2,
      secondaryPhone: "0560778899",
      status: OrderStatus.NEW,
      tireSize: "195/55 R16",
      totalPriceDzd: new Prisma.Decimal("21000"),
      unitPriceDzd: new Prisma.Decimal("10500"),
      wilaya: "تلمسان"
    }, relations: [] },
  { entityKey: "TireOrder:tire_order_10", data: {
      id: "c314554c-e4d1-471c-a1f2-422553273f18",
      brand: TireBrand.CONTINENTAL,
      commune: "عين التوتة",
      createdAt: new Date("2026-09-20T13:00:00.000Z"),
      customerName: "طارق زياني",
      dahabiaCardNumber: "22334455",
      dahabiaExpiry: "04/27",
      nationalIdNumber: "109900112233445566",
      notes: "تم إلغاء الطلبية لعدم تطابق الاسم مع صاحب البطاقة الذهبية المسجلة.",
      orderNumber: "NM-2026-9012",
      phoneNumber: "0550776655",
      quantity: 1,
      secondaryPhone: "0661221100",
      status: OrderStatus.CANCELLED,
      tireSize: "255/50 R19",
      totalPriceDzd: new Prisma.Decimal("38500"),
      unitPriceDzd: new Prisma.Decimal("38500"),
      wilaya: "باتنة"
    }, relations: [] },
] as const;

function requireEntity(entities: Map<string, SeedEntity>, entityKey: string): SeedEntity {
  const entity = entities.get(entityKey);
  if (!entity) throw new Error(`seed relation target was not created: ${entityKey}`);
  return entity;
}

async function main() {
  await prisma.$transaction(async (tx) => {
    const entities = new Map<string, SeedEntity>();
    await tx.tireOrder.updateMany({ data: { customerId: null } });

    await tx.tireOrder.deleteMany({});
    await tx.supportChannel.deleteMany({});
    await tx.platformFaq.deleteMany({});
    await tx.tireStock.deleteMany({});
    await tx.algerianWilaya.deleteMany({});
    await tx.accountUser.deleteMany({});

    for (const record of accountUserRecords) {
      const data: Record<string, unknown> = { ...record.data };
      for (const relation of record.relations as readonly RelationBinding[]) {
        const target = requireEntity(entities, relation.target_entity_key);
        relation.local_fields.forEach((field, index) => { data[field] = target[relation.target_fields[index]]; });
      }
      const created = await tx.accountUser.create({ data: data as unknown as Prisma.AccountUserUncheckedCreateInput });
      entities.set(record.entityKey, created as unknown as SeedEntity);
    }
    for (const record of algerianWilayaRecords) {
      const data: Record<string, unknown> = { ...record.data };
      for (const relation of record.relations as readonly RelationBinding[]) {
        const target = requireEntity(entities, relation.target_entity_key);
        relation.local_fields.forEach((field, index) => { data[field] = target[relation.target_fields[index]]; });
      }
      const created = await tx.algerianWilaya.create({ data: data as unknown as Prisma.AlgerianWilayaUncheckedCreateInput });
      entities.set(record.entityKey, created as unknown as SeedEntity);
    }
    for (const record of tireStockRecords) {
      const data: Record<string, unknown> = { ...record.data };
      for (const relation of record.relations as readonly RelationBinding[]) {
        const target = requireEntity(entities, relation.target_entity_key);
        relation.local_fields.forEach((field, index) => { data[field] = target[relation.target_fields[index]]; });
      }
      const created = await tx.tireStock.create({ data: data as unknown as Prisma.TireStockUncheckedCreateInput });
      entities.set(record.entityKey, created as unknown as SeedEntity);
    }
    for (const record of platformFaqRecords) {
      const data: Record<string, unknown> = { ...record.data };
      for (const relation of record.relations as readonly RelationBinding[]) {
        const target = requireEntity(entities, relation.target_entity_key);
        relation.local_fields.forEach((field, index) => { data[field] = target[relation.target_fields[index]]; });
      }
      const created = await tx.platformFaq.create({ data: data as unknown as Prisma.PlatformFaqUncheckedCreateInput });
      entities.set(record.entityKey, created as unknown as SeedEntity);
    }
    for (const record of supportChannelRecords) {
      const data: Record<string, unknown> = { ...record.data };
      for (const relation of record.relations as readonly RelationBinding[]) {
        const target = requireEntity(entities, relation.target_entity_key);
        relation.local_fields.forEach((field, index) => { data[field] = target[relation.target_fields[index]]; });
      }
      const created = await tx.supportChannel.create({ data: data as unknown as Prisma.SupportChannelUncheckedCreateInput });
      entities.set(record.entityKey, created as unknown as SeedEntity);
    }
    for (const record of tireOrderRecords) {
      const data: Record<string, unknown> = { ...record.data };
      for (const relation of record.relations as readonly RelationBinding[]) {
        const target = requireEntity(entities, relation.target_entity_key);
        relation.local_fields.forEach((field, index) => { data[field] = target[relation.target_fields[index]]; });
      }
      const created = await tx.tireOrder.create({ data: data as unknown as Prisma.TireOrderUncheckedCreateInput });
      entities.set(record.entityKey, created as unknown as SeedEntity);
    }
  }, { maxWait: 30_000, timeout: 300_000 });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
