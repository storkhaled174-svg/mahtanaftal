-- Database snapshot: PROJ_926079ba_snap_20261005_100226_814
-- Created at: 2026-10-05 18:41:40.526712
-- Include structure: True
-- Include data: True

SET FOREIGN_KEY_CHECKS = 0;

-- Table structure for `_prisma_migrations`
DROP TABLE IF EXISTS `_prisma_migrations`;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for table `_prisma_migrations`
INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('b9d54898-9058-44fd-93c6-529263aec6bd', '46e687a898f3484e7d3510cf1879e1a2b9f7d9e3d757fb4beb1f5591d3e1fb34', '2026-10-05 08:31:46', '20261005083144_init', '', NULL, '2026-10-05 08:31:46', 0);

-- Table structure for `accountuser`
DROP TABLE IF EXISTS `accountuser`;
CREATE TABLE `accountuser` (
  `id` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `passwordHash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('ADMIN','CUSTOMER') COLLATE utf8mb4_unicode_ci NOT NULL,
  `phoneNumber` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nationalIdNumber` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AccountUser_username_key` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for table `accountuser`
INSERT INTO `accountuser` (`id`, `fullName`, `username`, `passwordHash`, `role`, `phoneNumber`, `nationalIdNumber`, `createdAt`, `updatedAt`) VALUES
('3c62884d-1fd8-443d-a38f-bb548d2e850b', 'ياسين بن عيسى', 'yassine_dz', '5f2edaef9cd3d13dd09863971c32395b6a792b43209a62a0e18d7867af9d9318', 'CUSTOMER', '0661234567', '199412345678901234', '2026-09-10 10:30:00', '2026-10-05 08:36:24'),
('f5783e71-c5db-4fb3-a74c-0d85516b7ee0', 'أمين بلقاسم', 'admin_naftal', '538fc9c44f339d4b692b91c2f2c3c1cfb66407fae5b749c704ffb5e8ee52e3a8', 'ADMIN', '0550123456', '100234567890123456', '2026-09-01 08:00:00', '2026-10-05 08:36:24');

-- Table structure for `algerianwilaya`
DROP TABLE IF EXISTS `algerianwilaya`;
CREATE TABLE `algerianwilaya` (
  `id` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameAr` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `communes` json NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AlgerianWilaya_code_key` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for table `algerianwilaya`
INSERT INTO `algerianwilaya` (`id`, `code`, `nameAr`, `communes`, `createdAt`, `updatedAt`) VALUES
('02bac65a-89ee-4d05-a96d-29e4573750da', '01', 'أدرار', '["أدرار", "تيمقطن", "تمنطيط", "فنوغيل", "زاوية كنتة"]', '2026-01-10 08:00:00', '2026-10-05 08:36:24'),
('461eb8db-aa1c-4f68-a6bd-05299cb23bb6', '25', 'قسنطينة', '["قسنطينة", "الخروب", "عين سمارة", "زيغود يوسف", "حامة بوزيان"]', '2026-01-10 08:20:00', '2026-10-05 08:36:24'),
('49782db4-2a95-47e8-af53-32b49f28fd38', '16', 'الجزائر', '["الجزائر الوسطى", "باب الوادي", "الدار البيضاء", "زرالدة", "بئر مراد رايس", "حسين داي"]', '2026-01-10 08:15:00', '2026-10-05 08:36:24'),
('71c351c2-95b0-4302-aec6-293ada0d5da9', '02', 'الشلف', '["الشلف", "تنس", "أولاد فارس", "بوقادير", "الكريمية", "بني حواء"]', '2026-01-10 08:05:00', '2026-10-05 08:36:24'),
('a5f8d7fb-9d32-4467-a34b-787ac617c7af', '03', 'الأغواط', '["الأغواط", "أفلو", "قصر الحيران", "عين ماضي", "سيدي مخلوف"]', '2026-01-10 08:10:00', '2026-10-05 08:36:24'),
('d12ed32a-df0c-469c-a654-a8c2591906e8', '31', 'وهران', '["وهران", "السانية", "بئر الجير", "عين الترك", "أرزيو", "بطيوة"]', '2026-01-10 08:25:00', '2026-10-05 08:36:24');

-- Table structure for `platformfaq`
DROP TABLE IF EXISTS `platformfaq`;
CREATE TABLE `platformfaq` (
  `id` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `question` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` enum('ORDERS','PAYMENT','DELIVERY','WARRANTY') COLLATE utf8mb4_unicode_ci NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for table `platformfaq`
INSERT INTO `platformfaq` (`id`, `question`, `answer`, `category`, `isActive`, `createdAt`, `updatedAt`) VALUES
('057157cc-6f22-42e8-a546-b38664e006b1', 'ما هي شروط وضمانات الجودة وما بعد البيع للإطارات المقتناة؟', 'تستفيد كافة الإطارات الأصلية المعتمدة (Continental وIris) من ضمان مصنعي رسمي ضد عيوب التصنيع لمدة 12 شهراً ابتداءً من تاريخ الاستلام والتركيب بمركز خدمات نفطال.', 'WARRANTY', 0, '2026-09-12 16:20:00', '2026-10-05 08:36:24'),
('0dbafc7b-b17d-4039-a457-fb57e142f309', 'ما هي طرق الدفع المتاحة لتسديد قيمة الإطارات المحجوزة؟', 'يمكن تسديد قيمة الطلبية إلكترونياً أثناء التسجيل بالبطاقة الذهبية، أو مباشرة في محطة نفطال المعينة عبر أجهزة الدفع الإلكتروني TPE أو نقداً بالدينار الجزائري وفق السعر المقنن.', 'PAYMENT', 1, '2026-06-22 11:00:00', '2026-10-05 08:36:24'),
('6044bab1-8a87-4606-aff5-a1011bfc5399', 'ما هي شروط الدفع الإلكتروني بالبطاقة الذهبية CIB لطلبيات الإطارات؟', 'يشترط أن تكون البطاقة الذهبية مفعلة لخدمة الدفع الإلكتروني، مع إدخال رقم البطاقة ورمز التأكيد السري OTP المستلم عبر الرسالة النصية لضمان تأكيد خصم المبلغ وتأكيد الطلبية فورياً.', 'PAYMENT', 1, '2026-05-18 14:15:00', '2026-10-05 08:36:24'),
('953fc191-5a8f-4d3a-aebf-6fb4501bdfe2', 'ما هو الحد الأقصى لعدد الإطارات المسموح بطلبها لكل مواطن؟', 'الحد الأقصى المسموح به هو 4 إطارات للمركبات السياحية والنفعية الخفيفة لكل رقم تعريف وطني خلال فترة 12 شهراً لضمان التوزيع العادل والشفاف وتفادي أي مضاربة.', 'ORDERS', 1, '2026-04-10 10:30:00', '2026-10-05 08:36:24'),
('b83203b6-4843-45f6-a9e5-4e85092937e5', 'ما هي الوثائق المطلوبة لاستلام الإطارات من محطة خدمة نفطال المختارة؟', 'يتوجب على الزبون إحضار بطاقة التعريف الوطنية البيومترية الأصلية ووصل حجز الطلبية الرقمي (NM-2026) المتضمن رمز QR للتحقق من هوية صاحب المركبة وتأكيد الاستلام بالمحطة.', 'DELIVERY', 1, '2026-08-05 08:45:00', '2026-10-05 08:36:24'),
('cf49b2a9-e05c-4d69-a052-c030b94c97a3', 'كيف تتم عملية حجز حصة الإطارات المطاطية عبر منصة نفطال محطتي؟', 'يتم حجز الحصة باختيار مقاس الإطار والعلامة المعتمدة (Continental أو Iris) عبر البوابة، وتحديد الولاية والمحطة المناسبة لاستلام الطلبية مع تثبيت رقم بطاقة التعريف الوطنية البيومترية.', 'ORDERS', 1, '2026-03-15 09:00:00', '2026-10-05 08:36:24');

-- Table structure for `supportchannel`
DROP TABLE IF EXISTS `supportchannel`;
CREATE TABLE `supportchannel` (
  `id` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for table `supportchannel`
INSERT INTO `supportchannel` (`id`, `title`, `value`, `description`, `isActive`, `createdAt`, `updatedAt`) VALUES
('801a1071-97be-4ab6-ac9e-67d7cca9be21', 'خلية الدعم الفني الخاصة بالدفع الإلكتروني CIB', '021 38 12 12', 'مخصصة لحل مشاكل تسوية المعاملات المالية العالقة والتحقق من حسابات بريد الجزائر وبنك الجزائر الخارجي.', 1, '2026-01-20 10:00:00', '2026-10-05 08:36:24'),
('b839748f-4124-4bb6-a1e0-37e14078cea7', 'الرقم الأخضر الوطني الموحد (مركز النداء)', '1050', 'متاح طيلة أيام الأسبوع من 07:30 صباحاً حتى 21:00 مساءً للرد المجاني على انشغالات المواطنين وطلبيات الإطارات والمحطات.', 1, '2026-01-05 08:00:00', '2026-10-05 08:36:24'),
('e02ebf89-4d3b-40b2-a1d6-95c5e74038db', 'البريد الإلكتروني الرسمي لخدمة الزبائن والدعم', 'support.mhatati@naftal.dz', 'استقبال استفسارات المواطنين والشكاوى التقنية المتعلقة بالدفع الإلكتروني بالبطاقة الذهبية وتأكيد الطلبيات على مدار 24/7.', 1, '2026-01-12 09:00:00', '2026-10-05 08:36:24');

-- Table structure for `tireorder`
DROP TABLE IF EXISTS `tireorder`;
CREATE TABLE `tireorder` (
  `id` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderNumber` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customerName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phoneNumber` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secondaryPhone` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `wilaya` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `commune` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand` enum('CONTINENTAL','IRIS') COLLATE utf8mb4_unicode_ci NOT NULL,
  `tireSize` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL,
  `unitPriceDzd` decimal(12,2) NOT NULL,
  `totalPriceDzd` decimal(12,2) NOT NULL,
  `nationalIdNumber` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dahabiaCardNumber` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dahabiaExpiry` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('NEW','PROCESSING','COMPLETED','CANCELLED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'NEW',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `customerId` varchar(72) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `TireOrder_orderNumber_key` (`orderNumber`),
  KEY `TireOrder_customerId_idx` (`customerId`),
  CONSTRAINT `TireOrder_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `accountuser` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for table `tireorder`
INSERT INTO `tireorder` (`id`, `orderNumber`, `customerName`, `phoneNumber`, `secondaryPhone`, `wilaya`, `commune`, `brand`, `tireSize`, `quantity`, `unitPriceDzd`, `totalPriceDzd`, `nationalIdNumber`, `dahabiaCardNumber`, `dahabiaExpiry`, `status`, `notes`, `customerId`, `createdAt`, `updatedAt`) VALUES
('0ca4d96f-ee48-4119-acd0-56abd42d3b6f', 'NM-2026-8493', 'فاطمة الزهراء بن عيسى', '0770332211', '0661998877', 'قسنطينة', 'الخروب', 'CONTINENTAL', '225/45 R17', 4, '24000.00', '96000.00', '112233445566778899', '628001122334455678', '05/29', 'COMPLETED', 'تم التركيب والتسليم بنجاح في مركز خدمات نفطال الخروب.', '3c62884d-1fd8-443d-a38f-bb548d2e850b', '2026-09-28 16:30:00', '2026-10-05 08:36:24'),
('1e405a2d-f94d-44f6-b5c8-f26be4ff4b56', 'NM-2026-4458', 'سمير قادري', '0667889012', '0770221737', '16 - الجزائر', 'زرالدة', 'CONTINENTAL', '195/70 R15C', 2, '21000.00', '42000.00', '199412345678901234', '628070305263849490', '08/27', 'NEW', NULL, '3c62884d-1fd8-443d-a38f-bb548d2e850b', '2026-10-05 10:32:04', '2026-10-05 10:32:04'),
('32166312-b771-4e9f-a09f-22834658c795', 'NM-2026-1024', 'ياسين قندوز العيد', '0770554433', '0661778899', 'سطيف', 'العلمة', 'IRIS', '175/70 R13', 4, '7800.00', '31200.00', '119844001928374622', '628033017748996234', '09/29', 'NEW', 'تم تأكيد تسجيل الطلب بنجاح وتجري مراجعة تطابق رقم الهوية مع سجلات البطاقة الذهبية.', NULL, '2026-10-04 15:45:00', '2026-10-05 08:36:24'),
('52ba550f-a5c3-4385-a88e-f89ff0cbb2f9', 'NM-2026-8841', 'سليمان بلقاسم العربي', '0550998877', '0770112233', 'الجزائر', 'زرالدة', 'CONTINENTAL', '235/60 R18', 2, '32000.00', '64000.00', '109845210394857211', '628044108892314012', '11/27', 'PROCESSING', 'تم تخصيص الحصة من مستودع رغاية المركزي وهي قيد الشحن نحو محطة نفطال زرالدة.', NULL, '2026-10-02 10:15:00', '2026-10-05 08:36:24'),
('6a501e46-aafc-4249-a276-c9d9a18e289d', 'NM-2026-8491', 'سليمان بوزيد', '0550123456', '0770987654', 'الجزائر', 'الدار البيضاء', 'CONTINENTAL', '205/55 R16', 4, '18500.00', '74000.00', '109827364519283746', '628001234567890123', '08/28', 'NEW', 'طلب استلام في محطة نفطال الدار البيضاء الطريق السريع.', '3c62884d-1fd8-443d-a38f-bb548d2e850b', '2026-10-04 09:15:00', '2026-10-05 08:36:24'),
('70df29e4-7dcc-4990-a0d3-20de317f9267', 'NM-2026-8492', 'عبد القادر بلحاج', '0661445566', '0560112233', 'وهران', 'السانية', 'IRIS', '185/65 R15', 2, '9200.00', '18400.00', '105647382910485729', '628009876543210987', '11/27', 'PROCESSING', 'تم التحقق من الحصة وتخصيص المقاس في المستودع الإقليمي.', '3c62884d-1fd8-443d-a38f-bb548d2e850b', '2026-10-03 14:20:00', '2026-10-05 08:36:24'),
('7b1a10d8-3993-49c2-a003-9760b89ce93c', 'NM-2026-7789', 'حمزة شريفي', '0770665544', '0560778899', 'تلمسان', 'منصورة', 'IRIS', '195/55 R16', 2, '10500.00', '21000.00', '108899001122334455', '628088990011223344', '07/28', 'NEW', 'طلب جديد مسجل عبر البوابة، قيد مراجعة بيانات البطاقة الذهبية.', NULL, '2026-10-05 07:10:00', '2026-10-05 08:36:24'),
('7f173d8e-dfc1-4c0a-b71f-12997bd509e4', 'NM-2026-6115', 'ياسين بن عيسى', '0661234567', '0647373627', '02 - الشلف', 'الكريمية', 'IRIS', '195/55 R16', 4, '10500.00', '42000.00', '1994123456789012340436282828272', '628070313748493828', '02/29', 'NEW', NULL, '3c62884d-1fd8-443d-a38f-bb548d2e850b', '2026-10-05 11:54:04', '2026-10-05 11:54:04'),
('8b157b6e-1e04-4297-9be7-b7c65a4e4289', 'NM-2026-3923', 'أحمد حسين', '0661234571', '0560628143', '16 - الجزائر', 'الجزائر الوسطى', 'CONTINENTAL', '195/70 R15C', 3, '21000.00', '63000.00', '199412345678901234', '628070306143816336', '07/28', 'NEW', NULL, '3c62884d-1fd8-443d-a38f-bb548d2e850b', '2026-10-05 13:39:47', '2026-10-05 13:39:47'),
('c314554c-e4d1-471c-a1f2-422553273f18', 'NM-2026-9012', 'طارق زياني', '0550776655', '0661221100', 'باتنة', 'عين التوتة', 'CONTINENTAL', '255/50 R19', 1, '38500.00', '38500.00', '109900112233445566', '628099001122334455', '04/27', 'CANCELLED', 'تم إلغاء الطلبية لعدم تطابق الاسم مع صاحب البطاقة الذهبية المسجلة.', NULL, '2026-09-20 13:00:00', '2026-10-05 08:36:24'),
('c88d7700-0bff-4b78-a5e7-904577d7a77c', 'NM-2026-4190', 'فاطمة الزهراء منصوري', '0661987654', '0550443322', 'وهران', 'بئر الجير', 'IRIS', '215/65 R16', 4, '13500.00', '54000.00', '204896320147852399', '628099412284771501', '05/28', 'COMPLETED', 'الحصة متوفرة بالكامل في ورشة المحطة، تم الاستلام والتركيب الفوري.', NULL, '2026-09-25 11:00:00', '2026-10-05 08:36:24'),
('db11c1cb-80a6-4090-a1c1-c66281399750', 'NM-2026-5544', 'نور الدين عماري', '0660334455', '0551667788', 'عنابة', 'البوني', 'IRIS', '205/75 R16C', 4, '15800.00', '63200.00', '107788990011223344', '628077889900112233', '12/27', 'COMPLETED', 'تم التسليم وتركيب الإطارات بمركز خدمات نفطال عنابة.', NULL, '2026-09-22 09:15:00', '2026-10-05 08:36:24'),
('e0198a68-8373-4fcf-af0b-8ae5fc9a570d', 'NM-2026-3312', 'محمد لمين بن سالم', '0561223344', '0771889900', 'البليدة', 'بوفاريك', 'CONTINENTAL', '195/70 R15C', 2, '21000.00', '42000.00', '103344556677889900', '628055667788990011', '03/28', 'PROCESSING', 'مركبة نفعية لنقل البضائع، تم حجز الإطارات في محطة بوفاريك.', NULL, '2026-10-01 08:30:00', '2026-10-05 08:36:24');

-- Table structure for `tirestock`
DROP TABLE IF EXISTS `tirestock`;
CREATE TABLE `tirestock` (
  `id` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand` enum('CONTINENTAL','IRIS') COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` enum('TOURISM','UTILITY','SUV') COLLATE utf8mb4_unicode_ci NOT NULL,
  `priceDzd` decimal(12,2) NOT NULL,
  `availableStock` int NOT NULL DEFAULT '0',
  `reservedStock` int NOT NULL DEFAULT '0',
  `minThreshold` int NOT NULL DEFAULT '0',
  `speedIndex` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isAvailable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for table `tirestock`
INSERT INTO `tirestock` (`id`, `brand`, `size`, `category`, `priceDzd`, `availableStock`, `reservedStock`, `minThreshold`, `speedIndex`, `isAvailable`, `createdAt`, `updatedAt`) VALUES
('00e6ec5c-e0b5-47b8-a3de-2b7a37c1ae2f', 'IRIS', '185/65 R15', 'TOURISM', '9200.00', 140, 35, 30, '88H Ecoris', 1, '2026-09-02 09:15:00', '2026-10-05 08:36:24'),
('29e41ef8-c927-4c36-a16b-9676efdec147', 'CONTINENTAL', '255/50 R19', 'SUV', '38500.00', 25, 6, 8, '107Y PremiumContact 6 SSR', 1, '2026-09-20 16:20:00', '2026-10-05 08:36:24'),
('340493ae-2b70-47bc-adf4-7cd1153777df', 'CONTINENTAL', '225/45 R17', 'TOURISM', '24000.00', 8, 12, 15, '94Y SportContact 5', 1, '2026-09-03 11:00:00', '2026-10-05 08:36:24'),
('3ca40414-185a-44e3-a68b-5cf40e191a88', 'CONTINENTAL', '205/55 R16', 'TOURISM', '18500.00', 85, 24, 20, '91V PremiumContact 6', 1, '2026-09-01 08:00:00', '2026-10-05 08:36:24'),
('4322cbcc-8fb3-43a7-abd8-84fa39d7fff9', 'CONTINENTAL', '195/65 R15', 'TOURISM', '16500.00', 0, 0, 20, '91H UltraContact', 0, '2026-09-15 15:10:00', '2026-10-05 08:36:24'),
('44015811-270c-40fa-ac1f-721af4281612', 'IRIS', '195/55 R16', 'TOURISM', '10500.00', 75, 20, 15, '87V Stormy', 1, '2026-09-18 11:40:00', '2026-10-05 08:36:24'),
('55e95161-40f6-4cdc-a32b-df116d805989', 'IRIS', '195/75 R16C', 'UTILITY', '14900.00', 40, 10, 10, '107/105R Lanev', 1, '2026-09-22 13:50:00', '2026-10-05 08:36:24'),
('64462322-1fc2-4874-ae41-10bdda0c123e', 'CONTINENTAL', '235/60 R18', 'SUV', '32000.00', 45, 10, 12, '103V CrossContact LX', 1, '2026-09-05 10:30:00', '2026-10-05 08:36:24'),
('666363bd-10d7-4626-abec-66f92f78b30e', 'CONTINENTAL', '195/70 R15C', 'UTILITY', '21000.00', 35, 8, 10, '104/102R VanContact 100', 1, '2026-09-10 12:00:00', '2026-10-05 08:36:24'),
('bcf6c6f6-8ae3-4aa8-a2e0-1b92bbe01a35', 'IRIS', '215/65 R16', 'SUV', '13500.00', 60, 15, 15, '98H Aures', 1, '2026-09-08 08:45:00', '2026-10-05 08:36:24'),
('d6645f62-778d-40da-af35-838d379be020', 'IRIS', '175/70 R13', 'TOURISM', '7800.00', 110, 18, 25, '82T Sefar', 1, '2026-09-06 14:20:00', '2026-10-05 08:36:24'),
('d8ea4d16-0d34-45b5-a961-b51f0e5d9fa3', 'IRIS', '205/75 R16C', 'UTILITY', '15800.00', 50, 14, 12, '110/108R Lanev', 1, '2026-09-12 09:00:00', '2026-10-05 08:36:24');

SET FOREIGN_KEY_CHECKS = 1;
