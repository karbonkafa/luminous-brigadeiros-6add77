#!/bin/bash
echo "🌱 Seeding Supabase database..."
npx prisma db push --accept-data-loss
npx prisma db seed
echo "✅ Done!"
