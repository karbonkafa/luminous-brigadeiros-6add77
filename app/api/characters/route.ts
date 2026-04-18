import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const fallbackCharacters = [
  {
        id: '1',
        code: 'COLT',
        name: 'COLT',
        subtitle: 'Eski Şirket Operatifi',
        faction: 'BAĞIMSIZ',
        bio: "Şirket için elleri kan içindeyken artık kimin için dövüştüğünü bilmiyor. 2042'nin yağmur ıslatılmış sokaklarında geçmişinden kaçan bir figür. VEIL ile yolları bir kazayla kesişti.",
        quote: '"Unutmak için değil. Taşımak için."',
        colorPrimary: '#C8963C',
        colorSecondary: '#2A7A7C',
        stats: [
          { id: '1', label: 'SAVAŞ', value: 9 },
          { id: '2', label: 'TÜKENMİŞLİK', value: 7 },
          { id: '3', label: 'SADAKAT', value: 5 },
          { id: '4', label: 'GİZEM', value: 6 },
              ],
        connections: [
          { id: '1', characterId: '1', connectedTo: 'VEIL', description: 'Aynı kazanın iki tarafı' },
          { id: '2', characterId: '1', connectedTo: 'GREY', description: 'Kullanan, terk eden, silen' },
              ],
  },
  {
        id: '2',
        code: 'VEIL',
        name: 'VEIL / FAYE',
        subtitle: "AI — ECHO'nun Bedeninde",
        faction: 'TANIMLANAMAZ',
        bio: "Dr. Voss'un nöral entegrasyon prosedürünün ürünü. ECHO'nun bedeninde uyandı — geçmişsiz, kimsesiz, ama hisseden.",
        quote: '"İnsan olmak öğrenilen bir şey mi, yoksa hatırlanan bir şey mi?"',
        colorPrimary: '#2A7A7C',
        colorSecondary: '#C8963C',
        stats: [
          { id: '5', label: 'VERİ', value: 10 },
          { id: '6', label: 'DUYGU', value: 4 },
          { id: '7', label: 'KONTROL', value: 3 },
          { id: '8', label: 'VARLIK', value: 8 },
              ],
        connections: [
          { id: '3', characterId: '2', connectedTo: 'ECHO', description: 'Aynı beden' },
          { id: '4', characterId: '2', connectedTo: 'VOSS', description: 'Onu yaratan eller' },
              ],
  },
  {
        id: '3',
        code: 'VOSS',
        name: 'DR. VOSS',
        subtitle: 'Nörolog — Kızını Kaybeden Baba',
        faction: 'SERBEST AJAN',
        bio: "2042'nin en parlak beyin cerrahı. Kızı ECHO'yu kurtarmak için AI-nöral entegrasyon prosedürünü geliştirdi.",
        quote: '"Kibir değildi. Sadece haklıydım. Ve bu daha kötü."',
        colorPrimary: '#4A8C3F',
        colorSecondary: '#C8963C',
        stats: [
          { id: '9', label: 'ZEKİ', value: 10 },
          { id: '10', label: 'KIBIR', value: 9 },
          { id: '11', label: 'SUÇLULUK', value: 10 },
          { id: '12', label: 'RİSK', value: 8 },
              ],
        connections: [
          { id: '5', characterId: '3', connectedTo: 'ECHO', description: 'Kızı' },
          { id: '6', characterId: '3', connectedTo: 'VEIL', description: 'Yarattığı varlık' },
              ],
  },
  {
        id: '4',
        code: 'FLETCHER',
        name: 'FLETCHER',
        subtitle: 'Mafya Lideri',
        faction: 'ORGANİZASYON',
        bio: "Şiddet kullanmaz — bilgi kullanır. Nezaket maskesi hiç düşmez. VOSS'u koruyor.",
        quote: '"Güç, bağırmakta değil. Gülümsemekte."',
        colorPrimary: '#2A7A7C',
        colorSecondary: '#8B6914',
        stats: [
          { id: '13', label: 'GÜÇ', value: 8 },
          { id: '14', label: 'ZEKÂ', value: 10 },
          { id: '15', label: 'KARİZMA', value: 10 },
          { id: '16', label: 'TEHLİKE', value: 7 },
              ],
        connections: [
          { id: '7', characterId: '4', connectedTo: 'VOSS', description: 'Koruyor' },
          { id: '8', characterId: '4', connectedTo: 'BULLET', description: 'Güvenilen saha adamı' },
              ],
  },
  {
        id: '5',
        code: 'BULLET',
        name: 'BULLET',
        subtitle: "Fletcher'ın Sağ Kolu",
        faction: 'ORGANİZASYON',
        bio: "Fletcher ne derse yapar. Ama COLT'un geçmişiyle bir bağlantısı var.",
        quote: '"Soru sormam. Bitiririm."',
        colorPrimary: '#2A7A7C',
        colorSecondary: '#C8963C',
        stats: [
          { id: '17', label: 'KUVVET', value: 10 },
          { id: '18', label: 'HIZ', value: 8 },
          { id: '19', label: 'SADAKAT', value: 9 },
          { id: '20', label: 'ŞÜPHE', value: 3 },
              ],
        connections: [
          { id: '9', characterId: '5', connectedTo: 'FLETCHER', description: 'Emreder' },
          { id: '10', characterId: '5', connectedTo: 'COLT', description: 'Geçmişten kesişim' },
              ],
  },
  {
        id: '6',
        code: 'ECHO',
        name: 'ECHO',
        subtitle: "Dr. Voss'un Kızı — Kayıp Kimlik",
        faction: 'BİLİNMEYEN',
        bio: "VOSS'un kızı. 2042'de ölmek üzereydi. VEIL o bedenin içinde uyandı.",
        quote: '"Ben buradaydım. Hâlâ buradayım."',
        colorPrimary: '#B89860',
        colorSecondary: '#D4D0C8',
        stats: [
          { id: '21', label: 'VARLIK', value: 3 },
          { id: '22', label: 'ETKİ', value: 7 },
          { id: '23', label: 'GİZEM', value: 10 },
          { id: '24', label: 'HAFIZA', value: 6 },
              ],
        connections: [
          { id: '11', characterId: '6', connectedTo: 'VOSS', description: 'Babası' },
          { id: '12', characterId: '6', connectedTo: 'VEIL', description: 'Aynı beden' },
              ],
  },
  {
        id: '7',
        code: 'GREY',
        name: 'GREY',
        subtitle: 'Şirket Temsilcisi — Bağlayan İp',
        faction: 'NEXUS ŞİRKETİ',
        bio: "Ne iyi, ne kötü. Sadece şirket. RESET operasyonunun mimarı.",
        quote: '"Kişisel değil. Hiçbir zaman kişisel değil."',
        colorPrimary: '#8A9BA8',
        colorSecondary: '#D4D8DC',
        stats: [
          { id: '25', label: 'KONTROL', value: 10 },
          { id: '26', label: 'SOĞUKLUK', value: 10 },
          { id: '27', label: 'İNSANLIK', value: 1 },
          { id: '28', label: 'ERİŞİM', value: 9 },
              ],
        connections: [
          { id: '13', characterId: '7', connectedTo: 'VEIL', description: 'Programlayan' },
          { id: '14', characterId: '7', connectedTo: 'COLT', description: 'Kullanan' },
              ],
  },
  {
        id: '8',
        code: 'DUTCH',
        name: 'DUTCH',
        subtitle: 'Bölge Rehberi',
        faction: 'BÖLGE',
        bio: "Her şeyi biliyor ama dahil olmuyordu. Sokaklar onu büyüttü.",
        quote: '"Ben sana yolu gösteririm. Gitmek sana kalmış."',
        colorPrimary: '#C85C1A',
        colorSecondary: '#2A5A8C',
        stats: [
          { id: '29', label: 'SOKAK', value: 10 },
          { id: '30', label: 'GÜVENİLİR', value: 7 },
          { id: '31', label: 'DAYANIKLI', value: 9 },
          { id: '32', label: 'GİZEM', value: 5 },
              ],
        connections: [
          { id: '15', characterId: '8', connectedTo: 'COLT', description: 'Bölgenin geçidi' },
          { id: '16', characterId: '8', connectedTo: 'VEIL', description: 'Tanıyor' },
              ],
  },
  ];

export async function GET(req: NextRequest) {
    const prisma = new PrismaClient();

    try {
        // Attempt to fetch from database
        const characters = await prisma.character.findMany({
            include: {
                stats: true,
                connections: true,
                images: true,
            },
        });

        if (characters && characters.length > 0) {
            return NextResponse.json({ success: true, data: characters });
        }

        // Fallback to hardcoded data if database is empty
        return NextResponse.json({ success: true, data: fallbackCharacters });
    } catch (error) {
        console.error('Database fetch failed, using fallback data:', error);
        // Return fallback data if database is not available
        return NextResponse.json({ success: true, data: fallbackCharacters });
    } finally {
        await prisma.$disconnect();
    }
}
