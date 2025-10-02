export type MomentTag =
  | "Pingxi"
  | "Chiang Mai"
  | "Hoi An"
  | "Sky Lantern"
  | "Water Lantern"

export interface MomentItem {
  id: string;                // 고유 ID (파일명과 같음)
  src: string;               // /images/{id}.jpg
  source: string;            // 출처(문자열)
  tags: MomentTag[];         // 0개 이상
  dateAdded: string;         // ISO: "2025-10-02"
  title?: string;            // (옵션) 캡션/타이틀
  href?: string;             // (옵션) 출처 링크
}

export const MOMENTS: MomentItem[] = [
  {
    id: "cm000001",
    src: "/images/cm000001.jpeg",
    source: "매일경제",
    tags: ["Chiang Mai", "Sky Lantern"],
    dateAdded: "2018-11-28",
    title: "Yi Peng Night",
    href: "https://www.mk.co.kr/news/culture/8575490",
  },
  {
    id: "cm000002",
    src: "/images/cm000002.jpeg",
    source: "매일경제",
    tags: ["Chiang Mai", "Sky Lantern"],
    dateAdded: "2018-11-28",
    href: "https://www.mk.co.kr/news/culture/8575490",
  },
  {
    id: "cm000003",
    src: "/images/cm000003.jpeg",
    source: "매일경제",
    tags: ["Chiang Mai", "Sky Lantern"],
    dateAdded: "2018-11-28",
    href: "https://www.mk.co.kr/news/culture/8575490",
  },

  {
    id: "px000001",
    src: "/images/px000001.webp",
    source: "traveloka",
    tags: ["Pingxi", "Sky Lantern"],
    dateAdded: "2019-02-06",
    title: "Pingxi Sky Lantern Festival Night Sky",
    href: "https://www.traveloka.com/en-vn/activities/taiwan/product/2025-pingxi-sky-lantern-festivalhundreds-of-sky-lanterns-in-shifen-squareone-day-tour-of-jiufen-old-street-8366397962294",
  },
  {
    id: "px000002",
    src: "/images/px000002.webp",
    source: "traveloka",
    tags: ["Pingxi", "Sky Lantern"],
    dateAdded: "2019-02-19",
    href: "https://www.traveloka.com/en-vn/activities/taiwan/product/2025-pingxi-sky-lantern-festivalhundreds-of-sky-lanterns-in-shifen-squareone-day-tour-of-jiufen-old-street-8366397962294",
  },
  {
    id: "px000003",
    src: "/images/px000003.webp",
    source: "IMAGINE X",
    tags: ["Pingxi", "Sky Lantern"],
    dateAdded: "2018-03-02",
    title: "Lanterns Rising Over Pingxi",
    href: "https://imaginexproductions.com/festival-event-management/#images-3",
  },
  {
    id: "px000004",
    src: "/images/px000004.jpg",
    source: "kkday",
    tags: ["Pingxi", "Sky Lantern"],
    dateAdded: "2020-02-06",
    href: "https://www.kkday.com/en-sg/blog/28381/asia-taiwan-pingxi-sky-lantern-festival-guide?srsltid=AfmBOoqakZDrtwclpoO2ULdgMKItG_7SQYHt_6s7GI1m-hWCvKW-_gep",
  },
  {
    id: "px000005",
    src: "/images/px000005.jpg",
    source: "Shutterstock",
    tags: ["Pingxi", "Sky Lantern"],
    dateAdded: "2020-02-06",
    href: "https://www.kkday.com/en-sg/blog/28381/asia-taiwan-pingxi-sky-lantern-festival-guide?srsltid=AfmBOoqakZDrtwclpoO2ULdgMKItG_7SQYHt_6s7GI1m-hWCvKW-_gep",
  },

  {
    id: "ha000001",
    src: "/images/ha000001.png",
    source: "FURAMA Resort DANANG",
    tags: ["Hoi An", "Water Lantern"],
    dateAdded: "2020-02-06",
    href: "https://furamavietnam.com/ko/hoi-an-da-nang-mua-trang-cung-duong-van-hoa-cho-tin-do-du-lich/",
  },

  {
    id: "ha000002",
    src: "/images/ha000002.jpg",
    source: "facebook",
    tags: ["Hoi An", "Water Lantern"],
    dateAdded: "2025-07-29",
    href: "https://www.facebook.com/groups/332906624145754/posts/1993105388125861/",
  },


  {
    id: "wl000001",
    src: "/images/wl000001.jpg",
    source: "paramount aurora",
    tags: ["Water Lantern"],
    dateAdded: "2025-09-16",
    href: "https://paramountaurora.com/events/water-lantern-festival/",
  },

  {
    id: "wl000002",
    src: "/images/wl000002.jpg",
    source: "paramount aurora",
    tags: ["Water Lantern"],
    dateAdded: "2025-09-16",
    href: "https://paramountaurora.com/events/water-lantern-festival/",
  },
];