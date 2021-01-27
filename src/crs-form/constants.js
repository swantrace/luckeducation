import inRange from "lodash.inrange";

export const AGE_LEVELS = [
  "17岁及以下",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45岁及以上",
];

export const SINGLE_AGE_SCORE = [
  [18, 99],
  [19, 105],
  [20, 110],
  [21, 110],
  [22, 110],
  [23, 110],
  [24, 110],
  [25, 110],
  [26, 110],
  [27, 110],
  [28, 110],
  [29, 110],
  [30, 105],
  [31, 99],
  [32, 94],
  [33, 88],
  [34, 83],
  [35, 77],
  [36, 72],
  [37, 66],
  [38, 61],
  [39, 55],
  [40, 50],
  [41, 39],
  [42, 28],
  [43, 17],
  [44, 6],
];

export const MARRIED_AGE_SCORE = [
  [18, 90],
  [19, 95],
  [20, 100],
  [21, 100],
  [22, 100],
  [23, 100],
  [24, 100],
  [25, 100],
  [26, 100],
  [27, 100],
  [28, 100],
  [29, 100],
  [30, 95],
  [31, 90],
  [32, 85],
  [33, 80],
  [34, 75],
  [35, 70],
  [36, 65],
  [37, 60],
  [38, 55],
  [39, 50],
  [40, 45],
  [41, 35],
  [42, 25],
  [43, 15],
  [44, 5],
];

export const EDU_LEVELS = [
  "高中以下",
  "高中",
  "1年大专",
  "2年大专",
  "3年以上大专或本科",
  "双专业（3年以上+1年以上）",
  "硕士学位或专业学位（如医学）",
  "博士学位",
];

export const SINGLE_EDU_SCORE = [
  [EDU_LEVELS[0], 0],
  [EDU_LEVELS[1], 30],
  [EDU_LEVELS[2], 90],
  [EDU_LEVELS[3], 98],
  [EDU_LEVELS[4], 120],
  [EDU_LEVELS[5], 128],
  [EDU_LEVELS[6], 135],
  [EDU_LEVELS[7], 150],
];

export const MARRIED_EDU_SCORE = [
  [EDU_LEVELS[0], 0],
  [EDU_LEVELS[1], 28],
  [EDU_LEVELS[2], 84],
  [EDU_LEVELS[3], 91],
  [EDU_LEVELS[4], 112],
  [EDU_LEVELS[5], 119],
  [EDU_LEVELS[6], 126],
  [EDU_LEVELS[7], 140],
];

export const SPOUSE_EDU_SCORE = [
  [EDU_LEVELS[0], 0],
  [EDU_LEVELS[1], 2],
  [EDU_LEVELS[2], 6],
  [EDU_LEVELS[3], 7],
  [EDU_LEVELS[4], 8],
  [EDU_LEVELS[5], 9],
  [EDU_LEVELS[6], 10],
  [EDU_LEVELS[7], 10],
];

export const EXP_LEVELS = [
  [0, "0-1年以下"],
  [1, "1-2年以下"],
  [2, "2-3年以下"],
  [3, "3-4年以下"],
  [4, "4-5年以下"],
  [5, "5年以上"],
];

export const OVERSEAS_EXP_LEVELS = [
  [0, "0-1年以下"],
  [1, "1-3年以下"],
  [3, "3年以上"],
];

export const EMPLOYER_TYPES = [
  "我有00类的雇主担保",
  "我有其他类的雇主担保",
  "没有雇主担保",
];

export const EMPLOYER_SCORE = [
  [EMPLOYER_TYPES[0], 200],
  [EMPLOYER_TYPES[1], 50],
  [EMPLOYER_TYPES[2], 0],
];

export const CANADA_EDU_DEGREES = [
  "我有学制3年以上的加拿大学历，或者加拿大的硕士、博士学历",
  "我有学制1-2年的的加拿大学历",
  "没有上述学历",
];

export const CANADA_EDU_SCORE = [
  [CANADA_EDU_DEGREES[0], 30],
  [CANADA_EDU_DEGREES[1], 15],
  [CANADA_EDU_DEGREES[2], 0],
];

export const SIBLING_SCORE = 15;

export const PROVINCIAL_NOMINEE_SCORE = 600;

export const IETLS_SCORE_RANGE = {
  listen: [0, 9],
  speak: [0, 9],
  read: [0, 9],
  write: [0, 9],
};

export const CELPIP_SCORE_RANGE = {
  listen: [0, 10],
  speak: [0, 10],
  read: [0, 10],
  write: [0, 10],
};

export const TEF_SCORE_RANGE = {
  listen: [0, 360],
  speak: [0, 450],
  read: [0, 300],
  write: [0, 450],
};

export const TCF_SCORE_RANGE = {
  listen: [0, 699],
  speak: [0, 20],
  read: [0, 699],
  write: [0, 20],
};

export const SINGLE_FIRST_LAN_SCORE = [
  [4, 6],
  [5, 6],
  [6, 9],
  [7, 17],
  [8, 23],
  [9, 31],
  [10, 34],
];

export const MARRIED_FIRST_LAN_SCORE = [
  [4, 6],
  [5, 6],
  [6, 8],
  [7, 16],
  [8, 22],
  [9, 29],
  [10, 32],
];

export const SECOND_LAN_SCORE = [
  [5, 1],
  [6, 1],
  [7, 3],
  [8, 3],
  [9, 6],
  [10, 6],
];

export const SPOUSE_LAN_SCORE = [
  [5, 1],
  [6, 1],
  [7, 3],
  [8, 3],
  [9, 5],
  [10, 5],
];

export const SINGLE_EXP_SCORE = [
  [1, 40],
  [2, 53],
  [3, 64],
  [4, 72],
  [5, 80],
];

export const MARRIED_EXP_SCORE = [
  [1, 35],
  [2, 46],
  [3, 56],
  [4, 63],
  [5, 70],
];

export const SPOUSE_EXP_SCORE = [
  [1, 5],
  [2, 7],
  [3, 8],
  [4, 9],
  [5, 10],
];

export const EDU_TRANSFER_SCORE = [
  [0, 0],
  [1, 13],
  [2, 25],
  [3, -1],
  [4, 50],
];

export const OVERSEASEXP_TRANSFER_SCORE = [
  [0, 0],
  [1, 13],
  [2, 25],
  [3, -1],
  [4, 50],
];

export const CERTIFICATE_TRANSFER_SCORE = [
  [0, 0],
  [1, 25],
  [2, 50],
];

export const FRENCH_ADDITIONAL_SCORE = [
  [0, 0],
  [1, 25],
  [2, 50],
];

export const LAN_TEST_TYPES = ["雅思培训类", "思培（CELPIP）", "TEF", "TCF"];

export const ENGLISH_TEST_TYPES = [LAN_TEST_TYPES[0], LAN_TEST_TYPES[1]];

export const FRENCH_TEST_TYPES = [LAN_TEST_TYPES[2], LAN_TEST_TYPES[3]];

export const LAN_TEST_SUBJECTS = ["听", "说", "读", "写"];

export const LAN_TEST_SCORE_CLB_RELATIONS = {
  [LAN_TEST_TYPES[0]]: {
    [LAN_TEST_SUBJECTS[0]]: [
      [0, 1],
      [1, 2],
      [2, 3.5],
      [3.5, 4.5],
      [4.5, 5],
      [5, 5.5],
      [5.5, 6],
      [6, 7.5],
      [7.5, 8],
      [8, 8.5],
      [8.5, 9.001],
    ],
    [LAN_TEST_SUBJECTS[1]]: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 5.5],
      [5.5, 6],
      [6, 6.5],
      [6.5, 7],
      [7, 7.5],
      [7.5, 9.001],
    ],
    [LAN_TEST_SUBJECTS[2]]: [
      [0, 1],
      [1, 1.5],
      [1.5, 2.5],
      [2.5, 3.5],
      [3.5, 4.5],
      [4.5, 5],
      [5, 6],
      [6, 6.5],
      [6.5, 7],
      [7, 8],
      [8, 9.001],
    ],
    [LAN_TEST_SUBJECTS[3]]: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 5.5],
      [5.5, 6],
      [6, 6.5],
      [6.5, 7],
      [7, 7.5],
      [7.5, 9.001],
    ],
  },
  [LAN_TEST_TYPES[1]]: {
    [LAN_TEST_SUBJECTS[0]]: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 10],
      [10, 10.001],
    ],
    [LAN_TEST_SUBJECTS[1]]: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 10],
      [10, 10.001],
    ],
    [LAN_TEST_SUBJECTS[2]]: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 10],
      [10, 10.001],
    ],
    [LAN_TEST_SUBJECTS[3]]: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 10],
      [10, 10.001],
    ],
  },
  [LAN_TEST_TYPES[2]]: {
    [LAN_TEST_SUBJECTS[0]]: [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 145],
      [145, 181],
      [181, 217],
      [217, 249],
      [249, 280],
      [280, 298],
      [298, 316],
      [316, 360.001],
    ],
    [LAN_TEST_SUBJECTS[1]]: [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 181],
      [181, 226],
      [226, 271],
      [271, 310],
      [310, 349],
      [349, 371],
      [371, 393],
      [393, 450.001],
    ],
    [LAN_TEST_SUBJECTS[2]]: [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 121],
      [121, 151],
      [151, 181],
      [181, 207],
      [207, 233],
      [233, 248],
      [248, 263],
      [263, 300.001],
    ],
    [LAN_TEST_SUBJECTS[3]]: [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 181],
      [181, 226],
      [226, 271],
      [271, 310],
      [310, 349],
      [349, 371],
      [371, 393],
      [393, 450.001],
    ],
  },
  [LAN_TEST_TYPES[3]]: {
    [LAN_TEST_SUBJECTS[0]]: [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 331],
      [331, 369],
      [369, 398],
      [398, 458],
      [458, 503],
      [503, 523],
      [523, 549],
      [549, 699.001],
    ],
    [LAN_TEST_SUBJECTS[1]]: [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 4],
      [4, 6],
      [6, 7],
      [7, 10],
      [10, 12],
      [12, 14],
      [14, 16],
      [16, 20.001],
    ],
    [LAN_TEST_SUBJECTS[2]]: [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 342],
      [342, 375],
      [375, 406],
      [406, 453],
      [453, 499],
      [499, 524],
      [524, 549],
      [549, 699.001],
    ],
    [LAN_TEST_SUBJECTS[3]]: [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 4],
      [4, 6],
      [6, 7],
      [7, 10],
      [10, 12],
      [12, 14],
      [14, 16],
      [16, 20.001],
    ],
  },
};
