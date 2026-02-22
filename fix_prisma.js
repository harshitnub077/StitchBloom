const fs = require('fs');
let schema = fs.readFileSync('packages/database/prisma/schema.prisma', 'utf8');

// Replace @db.* directives
schema = schema.replace(/@db\.\w+(\([^\)]+\))?/g, '');

// Replace Enums with Strings
schema = schema.replace(/enum \w+ \{[^}]+\}/g, '');
schema = schema.replace(/role\s+Role\s+@default\(USER\)/g, 'role String @default("USER")');
schema = schema.replace(/status\s+OrderStatus\s+@default\(PENDING\)/g, 'status String @default("PENDING")');
schema = schema.replace(/paymentStatus\s+PaymentStatus\s+@default\(PENDING\)/g, 'paymentStatus String @default("PENDING")');
schema = schema.replace(/paymentMethod\s+PaymentMethod/g, 'paymentMethod String');
schema = schema.replace(/type\s+AddressType\s+@default\(SHIPPING\)/g, 'type String @default("SHIPPING")');

// Replace Decimal with Float
schema = schema.replace(/Decimal\?/g, 'Float?');
schema = schema.replace(/Decimal/g, 'Float');

// Replace Json with String
schema = schema.replace(/Json\?/g, 'String?');
schema = schema.replace(/Json/g, 'String');

// Replace String[] with String
schema = schema.replace(/String\[\]/g, 'String');
schema = schema.replace(/tags\s+String\[\]/g, 'tags String');

fs.writeFileSync('packages/database/prisma/schema.prisma', schema);
