export const multiplicationFactorOptions = [
    {value:2.5, label:2.5},
    {value:2.6, label:2.6},
    {value:2.7, label:2.7},
    {value:2.8, label:2.8},
    {value:2.9, label:2.9},
    {value:3, label:3},
    {value:3.1, label:3.1},
    {value:3.2, label:3.2},
    {value:3.3, label:3.3},
    {value:3.4, label:3.4},
    {value:3.5, label:3.5}
];


  export const suppliers = [
    { value: "Bestseller", label: "Bestseller" },
    { value: "Vila", label: "Vila" },
    { value: "PVH", label: "PVH" },
    { value: "Ralph_Lauren", label: "Ralph_Lauren"},
    { value: "Acne_Studios", label: "Acne_Studios"},
    { value: "Second_Female", label: "Second_Female"},
    { value: "Reima", label: "Reima"},
    { value: "Nanso", label: "Nanso"},
    { value: "MossCPH", label: "MossCPH"},
    { value: "Molo", label: "Molo"},
    { value: "Modstrom", label: "Modstrom"},
    { value: "Metsola", label: "Metsola"},
    { value: "Mayoral", label: "Mayoral"},
    { value: "Marimekko", label: "Marimekko"},
    { value: "Marella", label: "Marella"},
    { value: "Marc_Opolo", label: "Marc_Opolo"},
    { value: "Makia", label: "Makia"},
    { value: "Liewood", label: "Liewood"},
    { value: "Kaiko", label: "Kaiko"},
    { value: "Armani", label: "Armani"},
    { value: "Didriksons", label: "Didriksons"},
    { value: "ACC3SS", label: "ACC3SS"},
    { value: "Sanetta", label: "Sanetta"},
    { value: "KCA", label: "KCA"},
    { value: "Mini_Rodini", label: "Mini_Rodini"},
    { value: "Gestuz", label: "Gestuz"},
    { value: "CWF", label: "CWF"},
    { value: "PRO_FASHION", label: "GANT"},
    { value: "Adidas_Suomi(Sports)", label: "Adidas_Suomi(Sports)"},
    { value: "Adidas_Suomi(RTW)", label: "Adidas_Suomi(RTW)"},
    { value:"onlinetextile", label:"onlinetextile"},
    { value:"VAGABOND_FINLAND_OY", label:"VAGABOND_FINLAND_OY"},
    { value:"DR_MARTENS_AIRWAIR_WHOLESALE_LIMITED", label:"DR_MARTENS_AIRWAIR_WHOLESALE_LIMITED"},
    {value:"testsupplier1", label: "testsupplier1"},
    {value:"testsupplier2", label: "testsupplier2"},
    {value:"SAND_CPH_A/S", label: "SAND_CPH_A/S"}
  ];


  export const brands = {
    VF_Scandinavia: [
      {
      value:"Timberland",label:"Timberland"},
      {value:"Eastpak",label:"Eastpak"
    }
  ],
  Marc_Opolo: [
    {
      value:"Denim",label:"Denim"},
     { value:"Other",label:"Other"
    }
  ]
  };



  export  const buyers = ["Anne Karhunen", "Antti Laiho", "Anu Kurki", "Eeva Siirama", "Eva Grondahl-Mykra", "Johanna Tarma", "Julia Koskilahti", "Karita Arrajoki", "Kati Karhunsaari", "Kristiina Kuuskoski", "Laura Oksanen", "Maisa Jaansivu", "Michele Eller", "Minna Fichera", "Paivi Aho", "Paivi Jordas", "Pete Rahikainen", "Tiina Kuusvuori", "Tuula Luomi", "Ulrika Hedman"];
  //const seasons = ["Continuity","2023 SS","2023 AW","2024 SS","2024 AW","Seasonal"];
  export  const seasons = [
    { value: 1, label: "Continuity" },
    { value: 5, label: "2025 SS" },
    { value: 6, label: "2025 AW" },
    { value: 500, label: "Seasonal" },
    { value: 800, label: "2024 SS" },
    { value: 801, label: "2024 AW" }
  ];
  export const phases = {
    1: [
      { value: 1, label: "Active" },
      { value: 2, label: "Temporarily Unavailable" },
      { value: 3, label: "Discontinued"},
      { value: 4, label: "Retired"},
      { value: 5, label: "Customer Orders"},
      { value: 6, label: "Dummy Customer Orders"},
      { value: 7, label: "Manual Replenishment"},
      { value: 8, label: "Promotional"}
    ],
    5: [
      { value: 1, label: "Pre Spring" },
      { value: 2, label: "Spring Main Collection" },
      { value: 3, label: "High Summer"},
      { value: 4, label: "Carry Over"},
      { value: 5, label: "Flash / In-Season"},
      { value: 6, label: "Crazy Days"},
      { value: 7, label: "LC"},
      { value: 8, label: "EASTER"},
      { value: 9, label: "Seasonal Continuity"},
      { value: 10, label: "Drop 1"},
      { value: 11, label: "Drop 2"},
      { value: 12, label: "Drop 3"},
      { value: 13, label: "Drop 4"},
      { value: 14, label: "Drop 5"},
      { value: 15, label: "Drop 6"}
    ],
    6: [
      { value: 1, label: "Pre Fall" },
      { value: 2, label: "Autumn Main Collection" },
      { value: 3, label: "Winter Collection"},
      { value: 4, label: "Carry Over"},
      { value: 5, label: "Flash / In-Season"},
      { value: 6, label: "Crazy Days"},
      { value: 7, label: "LC"},
      { value: 8, label: "Christmas"},
      { value: 9, label: "Seasonal Continuity"},
      { value: 10, label: "Drop 7"},
      { value: 11, label: "Drop 8"},
      { value: 12, label: "Drop 9"},
      { value: 13, label: "Drop 10"},
      { value: 14, label: "Drop 11"},
      { value: 15, label: "Drop 12"}
    ],
    500: [
      { value: 1, label: "Carry Over" }
    ],
    800: [
      { value: 1, label: "Pre Spring" },
      { value: 2, label: "Spring Main Collection" },
      { value: 3, label: "High Summer"},
      { value: 4, label: "Carry Over"},
      { value: 5, label: "Flash / In-Season"},
      { value: 6, label: "Crazy Days"},
      { value: 7, label: "LC"},
      { value: 8, label: "EASTER"},
      { value: 9, label: "Seasonal Continuity"},
      { value: 10, label: "Drop 1"},
      { value: 11, label: "Drop 2"},
      { value: 12, label: "Drop 3"},
      { value: 13, label: "Drop 4"},
      { value: 14, label: "Drop 5"},
      { value: 15, label: "Drop 6"}
    ],
    801: [
      { value: 1, label: "Pre Fall" },
      { value: 2, label: "Autumn Main Collection" },
      { value: 3, label: "Winter Collection"},
      { value: 4, label: "Carry Over"},
      { value: 5, label: "Flash / In-Season"},
      { value: 6, label: "Crazy Days"},
      { value: 7, label: "LC"},
      { value: 8, label: "Christmas"},
      { value: 9, label: "Seasonal Continuity"},
      { value: 10, label: "Drop 7"},
      { value: 11, label: "Drop 8"},
      { value: 12, label: "Drop 9"},
      { value: 13, label: "Drop 10"},
      { value: 14, label: "Drop 11"},
      { value: 15, label: "Drop 12"}
    ]

    // Define phase values for other seasons as needed
  };  
  export const lifestyles = ["Mens", "Womens","Kids","None"];
  export const lifestages = ["Adult", "Teen", "Kids", "Infant"];
  export const genders = ["Men", "Women", "Boys","Girls","Unisex"];
  export const ST_users = ["PROKING", "ABELKAR","LOREEGI","PAAJJOH","EXTSABA","SUKKSHA","KANDRAK","KLIMMAK","PIIPPI","HUTTING","NIKKJEN"];
  
  export const ticketTypes = [
    {value: "330F", label: "330F"},
    {value: "RF34", label: "RF34"},
    {value: "911F", label: "911F"},
    {value: "SE", label: "SE"}
  ];

  export const poLocations = ["Distribution Centre B&M", "Distribution Centre DR warehouse", "Helsinki Departmental Store", "Itis Departmental Store", "Jumbo Departmental Store", "Riga Departmental Store", "Tallinn Departmental Store", "Tampere Departmental Store", "Tapiola Departmental Store", "Turku Departmental Store"];
  export const poTypes = ["AdHoc","CD","LC","PRE"];
  export const poEDIs = ["yes", "no"];
  export const orderPriceTags = ["yes", "no"];

  export const lifestyleDetails = {
    Womens: [
      { value: "Casual", label: "Casual" },
      { value: "Classic", label: "Classic" },
      { value: "Coats and Outerwear", label: "Coats and Outerwear" },
      { value: "Denim", label: "Denim" },
      { value: "Sport", label: "Sport" },
      { value: "Trend", label: "Trend" },
      { value: "Contemporary", label: "Contemporary" },
      { value: "Exclusive", label: "Exclusive" },
      { value: "Jewellery Watches and Sunglasses", label: "Jewellery Watches and Sunglasses" },
      { value: "Modern", label: "Modern" },
      { value: "Womens Footwear", label: "Womens Footwear" },
      { value: "Womens Handbags and Small Leathergoods", label: "Womens Handbags and Small Leathergoods" },
      { value: "Womens Hosiery", label: "Womens Hosiery" },
      { value: "Womens Lingerie", label: "Womens Lingerie" },
      { value: "Womens Night and Loungewear", label: "Womens Night and Loungewear" },
      { value: "Womens Soft Accessories", label: "Womens Soft Accessories" },
      { value: "Womens Swimwear", label: "Womens Swimwear" }
    ],
    Mens: [
      { value: "Casual", label: "Casual" },
      { value: "Classic", label: "Classic" },
      { value: "Coats and Outerwear", label: "Coats and Outerwear" },
      { value: "Denim", label: "Denim" },
      { value: "Designer", label: "Designer" },
      { value: "Mens Accessories", label: "Mens Accessories" },
      { value: "Mens Casual Trousers and Knitwear", label: "Mens Casual Trousers and Knitwear" },
      { value: "Mens Footwear", label: "Mens Footwear" },
      { value: "Mens Shirts and Ties", label: "Mens Shirts and Ties" },
      { value: "Mens Underwear and Nightwear", label: "Mens Underwear and Nightwear" },
      { value: "Premium", label: "Premium" },
      { value: "Smart/Formal", label: "Smart/Formal" },
      { value: "Sport", label: "Sport" },
      { value: "Trend", label: "Trend" }
    ],
    Kids: [
      { value: "ToFill", label: "ToFill" }
    ]
  };
