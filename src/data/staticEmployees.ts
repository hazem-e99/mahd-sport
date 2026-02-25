export interface Employee {
  id: number;
  fullNameEn: string;
  fullNameAr: string;
  jobTitle: string;
  jobTitleAr: string;
  department: string;
  departmentAr: string;
  email: string;
  mobileNumber: string;
  photoUrl: string;
  orderIndex: number;
  category: "Gold" | "Silver" | "Purple" | "Diamond";
  rating: number;
  position: string;
  year: number;
  stats: {
    pac: number;
    sho: number;
    pas: number;
    dri: number;
    def: number;
    phy: number;
  };
  statLabels?: {
    pac: string;
    sho: string;
    pas: string;
    dri: string;
    def: string;
    phy: string;
  };
}

export const staticEmployees: Employee[] = [
  {
    id: 1,
    fullNameEn: "Abdulkarim Al-Ghanem",
    fullNameAr: "عبدالكريم الغانم",
    jobTitle: "Football Coach",
    jobTitleAr: "مدرب كرة قدم",
    department: "Football",
    departmentAr: "كرة القدم",
    email: "abdulkarim.ghanem@mahd.gov.sa",
    mobileNumber: "+966 50 111 2222",
    photoUrl: "/src/assests/components/Football/Abdulkarim Al-Ghanem.png",
    orderIndex: 1,
    category: "Gold",
    rating: 99,
    position: "CF",
    year: 2010,
    stats: { pac: 92, sho: 94, pas: 75, dri: 84, def: 60, phy: 90 }
  },
  {
    id: 2,
    fullNameEn: "Abdullah Al-Jaryan",
    fullNameAr: "عبدالله الجريان",
    jobTitle: "Football Analyst",
    jobTitleAr: "محلل كرة قدم",
    department: "Football",
    departmentAr: "كرة القدم",
    email: "abdullah.jaryan@mahd.gov.sa",
    mobileNumber: "+966 50 222 3333",
    photoUrl: "/src/assests/components/Football/Abdullah Al-Jaryan.png",
    orderIndex: 2,
    category: "Silver",
    rating: 85,
    position: "CM",
    year: 2011,
    stats: { pac: 80, sho: 70, pas: 88, dri: 82, def: 75, phy: 78 }
  },
  {
    id: 3,
    fullNameEn: "Abdullah Baroum",
    fullNameAr: "عبدالله باروم",
    jobTitle: "Head of Football",
    jobTitleAr: "رئيس قسم كرة القدم",
    department: "Football",
    departmentAr: "كرة القدم",
    email: "abdullah.baroum@mahd.gov.sa",
    mobileNumber: "+966 50 333 4444",
    photoUrl: "/src/assests/components/Football/Abdullah Baroum.png",
    orderIndex: 3,
    category: "Purple",
    rating: 92,
    position: "CB",
    year: 2009,
    stats: { pac: 75, sho: 50, pas: 65, dri: 70, def: 94, phy: 88 }
  },
  {
    id: 4,
    fullNameEn: "Ali Tolbah",
    fullNameAr: "علي طلبة",
    jobTitle: "Technical Advisor",
    jobTitleAr: "مستشار فني",
    department: "Football",
    departmentAr: "كرة القدم",
    email: "ali.tolbah@mahd.gov.sa",
    mobileNumber: "+966 50 444 5555",
    photoUrl: "/src/assests/components/Football/Ali Tolbah.png",
    orderIndex: 4,
    category: "Gold",
    rating: 88,
    position: "LW",
    year: 2012,
    stats: { pac: 95, sho: 82, pas: 80, dri: 90, def: 45, phy: 70 }
  },
  {
    id: 5,
    fullNameEn: "Fahad Al-Wuhaimer",
    fullNameAr: "فهد الوحيمر",
    jobTitle: "Scout",
    jobTitleAr: "كشاف مواهب",
    department: "Football",
    departmentAr: "كرة القدم",
    email: "fahad.wuhaimer@mahd.gov.sa",
    mobileNumber: "+966 50 555 6666",
    photoUrl: "/src/assests/components/Football/Fahad Al-Wuhaimer.png",
    orderIndex: 5,
    category: "Silver",
    rating: 82,
    position: "ST",
    year: 2010,
    stats: { pac: 85, sho: 84, pas: 70, dri: 78, def: 35, phy: 80 }
  },
  {
    id: 6,
    fullNameEn: "Khaled Niazi",
    fullNameAr: "خالد نيازي",
    jobTitle: "Fitness Coach",
    jobTitleAr: "مدرب لياقة",
    department: "Football",
    departmentAr: "كرة القدم",
    email: "khaled.niazi@mahd.gov.sa",
    mobileNumber: "+966 50 666 7777",
    photoUrl: "/src/assests/components/Football/Khaled Niazi.png",
    orderIndex: 6,
    category: "Purple",
    rating: 90,
    position: "CDM",
    year: 2008,
    stats: { pac: 80, sho: 60, pas: 85, dri: 75, def: 88, phy: 92 }
  },
  {
    id: 7,
    fullNameEn: "Maryam Al-Qanaterah",
    fullNameAr: "مريم القناطرة",
    jobTitle: "Judo Athlete",
    jobTitleAr: "لاعبة جودو",
    department: "Judo",
    departmentAr: "الجودو",
    email: "maryam.qanaterah@mahd.gov.sa",
    mobileNumber: "+966 50 777 8888",
    photoUrl: "/src/assests/components/Judo/Maryam Al-Qanaterah.png",
    orderIndex: 7,
    category: "Diamond",
    rating: 95,
    position: "JDO",
    year: 2010,
    stats: { pac: 92, sho: 94, pas: 75, dri: 84, def: 60, phy: 90 },
    statLabels: { pac: "SPD", sho: "PWR", pas: "END", dri: "TEC", def: "AGI", phy: "DEF" }
  },
];
