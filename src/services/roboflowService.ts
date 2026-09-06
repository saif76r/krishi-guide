/**
 * Roboflow Computer Vision Integration for Agricultural Plant Disease Diagnosis
 * Models:
 * - Rice (ধান): rice-diseases-qzjka/3
 * - Papaya (পেঁপে): papaya-diseases-detection/1
 * - Tomato (টমেটো): tomato-disease-detection-f4q6c/1
 * - Potato (আলু): potato-disease-prediction/1
 * - Corn / Maize (ভুট্টা): corn-disease-detection/2
 */

export interface RoboflowPrediction {
  class: string;
  confidence: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface RoboflowResponse {
  predictions?: RoboflowPrediction[];
  top?: string;
  confidence?: number;
  image?: {
    width: number;
    height: number;
  };
}

// Helper to read env variables in both Node and Vite environments
const getCropEndpoint = (key: string, defaultEndpoint: string): string => {
  if (typeof process !== 'undefined' && process.env) {
    if (process.env[key]) return process.env[key]!;
    if (process.env[`VITE_${key}`]) return process.env[`VITE_${key}`]!;
  }
  if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
    if ((import.meta as any).env[key]) return (import.meta as any).env[key];
    if ((import.meta as any).env[`VITE_${key}`]) return (import.meta as any).env[`VITE_${key}`];
  }
  return defaultEndpoint;
};

export const ROBOFLOW_MODELS: Record<string, { endpoint: string; fallbackEndpoint?: string; banglaName: string; scientific: string }> = {
  ধান: {
    endpoint: getCropEndpoint("ROBOFLOW_ENDPOINT_RICE", "rice-diseases-qzjka/3"),
    banglaName: "ধান",
    scientific: "Oryza sativa",
  },
  rice: {
    endpoint: getCropEndpoint("ROBOFLOW_ENDPOINT_RICE", "rice-diseases-qzjka/3"),
    banglaName: "ধান",
    scientific: "Oryza sativa",
  },
  পেঁপে: {
    endpoint: getCropEndpoint("ROBOFLOW_ENDPOINT_PAPAYA", "papaya-disease-leaves/13"),
    fallbackEndpoint: "papaya-kl4jc/1",
    banglaName: "পেঁপে",
    scientific: "Carica papaya",
  },
  papaya: {
    endpoint: getCropEndpoint("ROBOFLOW_ENDPOINT_PAPAYA", "papaya-disease-leaves/13"),
    fallbackEndpoint: "papaya-kl4jc/1",
    banglaName: "পেঁপে",
    scientific: "Carica papaya",
  },
  কলা: {
    endpoint: getCropEndpoint("ROBOFLOW_ENDPOINT_BANANA", "banana-disease-tbmmy/2"),
    banglaName: "কলা",
    scientific: "Musa acuminata",
  },
  banana: {
    endpoint: getCropEndpoint("ROBOFLOW_ENDPOINT_BANANA", "banana-disease-tbmmy/2"),
    banglaName: "কলা",
    scientific: "Musa acuminata",
  },
  বেগুন: {
    endpoint: getCropEndpoint("ROBOFLOW_ENDPOINT_EGGPLANT", "eggplant-qhgwq/2"),
    banglaName: "বেগুন",
    scientific: "Solanum melongena",
  },
  eggplant: {
    endpoint: getCropEndpoint("ROBOFLOW_ENDPOINT_EGGPLANT", "eggplant-qhgwq/2"),
    banglaName: "বেগুন",
    scientific: "Solanum melongena",
  },
  brinjal: {
    endpoint: getCropEndpoint("ROBOFLOW_ENDPOINT_EGGPLANT", "eggplant-qhgwq/2"),
    banglaName: "বেগুন",
    scientific: "Solanum melongena",
  },
  টমেটো: {
    endpoint: getCropEndpoint("ROBOFLOW_ENDPOINT_TOMATO", "tomato-disease-detection-f4q6c/1"),
    banglaName: "টমেটো",
    scientific: "Solanum lycopersicum",
  },
  tomato: {
    endpoint: getCropEndpoint("ROBOFLOW_ENDPOINT_TOMATO", "tomato-disease-detection-f4q6c/1"),
    banglaName: "টমেটো",
    scientific: "Solanum lycopersicum",
  },
  আলু: {
    endpoint: getCropEndpoint("ROBOFLOW_ENDPOINT_POTATO", "potato-disease-prediction/1"),
    banglaName: "আলু",
    scientific: "Solanum tuberosum",
  },
  potato: {
    endpoint: getCropEndpoint("ROBOFLOW_ENDPOINT_POTATO", "potato-disease-prediction/1"),
    banglaName: "আলু",
    scientific: "Solanum tuberosum",
  },
  ভুট্টা: {
    endpoint: getCropEndpoint("ROBOFLOW_ENDPOINT_CORN", "corn-disease-detection/2"),
    banglaName: "ভুট্টা",
    scientific: "Zea mays",
  },
  corn: {
    endpoint: getCropEndpoint("ROBOFLOW_ENDPOINT_CORN", "corn-disease-detection/2"),
    banglaName: "ভুট্টা",
    scientific: "Zea mays",
  },
  maize: {
    endpoint: getCropEndpoint("ROBOFLOW_ENDPOINT_CORN", "corn-disease-detection/2"),
    banglaName: "ভুট্টা",
    scientific: "Zea mays",
  },
  ফুলকপি: {
    endpoint: getCropEndpoint("ROBOFLOW_ENDPOINT_CAULIFLOWER", "cauliflower-diseases-recognition/1"),
    banglaName: "ফুলকপি",
    scientific: "Brassica oleracea var. botrytis",
  },
  cauliflower: {
    endpoint: getCropEndpoint("ROBOFLOW_ENDPOINT_CAULIFLOWER", "cauliflower-diseases-recognition/1"),
    banglaName: "ফুলকপি",
    scientific: "Brassica oleracea var. botrytis",
  },
  সরিষা: {
    endpoint: getCropEndpoint("ROBOFLOW_ENDPOINT_MUSTARD", "mustard-disease/5"),
    banglaName: "সরিষা",
    scientific: "Brassica juncea",
  },
  mustard: {
    endpoint: getCropEndpoint("ROBOFLOW_ENDPOINT_MUSTARD", "mustard-disease/5"),
    banglaName: "সরিষা",
    scientific: "Brassica juncea",
  },
};

// Prescription and translation mapping for recognized Roboflow disease classes
export interface DiseasePrescription {
  diseaseName: string;
  diseaseScientific: string;
  severity: "কম" | "মাঝারি" | "তীব্র";
  symptomsObserved: string;
  cause: string;
  treatments: {
    chemical: Array<{ name: string; dose: string; instruction: string }>;
    organic: Array<{ method: string; details: string }>;
    prevention: string[];
  };
  expertNote: string;
}

export const DISEASE_PRESCRIPTIONS: Record<string, DiseasePrescription> = {
  // RICE DISEASES
  rice_blast: {
    diseaseName: "ধানের পাতা ব্লাস্ট রোগ (Rice Blast)",
    diseaseScientific: "Magnaporthe oryzae",
    severity: "তীব্র",
    symptomsObserved: "পাতায় চোখের মতো মাঝখানে ধূসর এবং কিনারায় লালচে-বাদামি বৃত্তাকার দাগ দৃশ্যমান।",
    cause: "ম্যাগনাপরথে ওরাইজি ছত্রাকের সংক্রমণ। অতিরিক্ত আর্দ্রতা ও অতিরিক্ত নাইট্রোজেন সার এর প্রধান কারণ।",
    treatments: {
      chemical: [
        {
          name: "ট্রাইসাইক্লাজল ৭৫% ডব্লিউপি (ট্রুপার / দিফা)",
          dose: "প্রতি লিটার পানিতে ১ গ্রাম",
          instruction: "বিকেলের মিষ্টি রোদে পাতার ওপর ও নিচ উভয় পাশ ভালোভাবে ভিজিয়ে স্প্রে করুন।",
        },
        {
          name: "এজোক্সিস্ট্রবিন + ডাইফেনোকোনাজল (এমিস্টার টপ ৩২৫ এসসি)",
          dose: "প্রতি লিটার পানিতে ১ মিলি",
          instruction: "তীব্র আক্রমণে ৭ দিন পর দ্বিতীয়বার স্প্রে করুন।",
        },
      ],
      organic: [
        {
          method: "কাঠের ছাই ও গোবর মিশ্রণ",
          details: "সকালে শিশির ভেজা পাতায় গুঁড়ো কাঠের ছাই ছিটিয়ে দিন অথবা কাঁচা গোবরের পাতলা দ্রবণ স্প্রে করুন।",
        },
      ],
      prevention: [
        "ইউরিয়া সারের অতিরিক্ত উপরিপ্রয়োগ বন্ধ রাখুন এবং জমিতে বিঘাপ্রতি ৫ কেজি পটাশ সার দিন।",
        "জমিতে সবসময় ২-৩ ইঞ্চি পানি ধরে রাখুন, জমি শুকাতে দেবেন না।",
      ],
    },
    expertNote: "ব্লাস্ট রোগ দ্রুত পুরো ক্ষেতে ছড়িয়ে পড়ে, তাই প্রথম দাগ দেখা মাত্রই অবিলম্বে ছত্রাকনাশক স্প্রে করুন।",
  },
  rice_bacterial_leaf_blight: {
    diseaseName: "ধানের পাতাপোড়া বা ব্যাক্টেরিয়াল ব্লাইট রোগ",
    diseaseScientific: "Xanthomonas oryzae pv. oryzae",
    severity: "তীব্র",
    symptomsObserved: "পাতার ডগা বা কিনারা থেকে ঢেউ খেলানো হলদে-সাদা রেখা নিচের দিকে ছড়িয়ে পাতা পুড়ে যাওয়ার মতো শুকিয়ে যাওয়া।",
    cause: "জ্যান্থোমোনাস ব্যাকটেরিয়ার আক্রমণ। ঝড়-বৃষ্টি ও প্রবল বাতাসে পাতার ক্ষত দিয়ে জীবাণু ছড়ায়।",
    treatments: {
      chemical: [
        {
          name: "কপার হাইড্রোক্সাইড (চ্যাম্পিয়ন) অথবা কপার অক্সিক্লোরাইড",
          dose: "প্রতি লিটার পানিতে ২ গ্রাম",
          instruction: "বিকেলে স্প্রে করুন। সাথে স্ট্রেপ্টোমাইসিন সালফেট ২০% (ব্যক্ট্রোট্রল) যোগ করতে পারেন।",
        },
      ],
      organic: [
        {
          method: "গোবর-ছাই মিশ্রণ ও পানি নিষ্কাশন",
          details: "আক্রান্ত জমির পানি বের করে দিয়ে নতুন পানি দিন এবং তাজা গোবর-পানির নির্যাস স্প্রে করুন।",
        },
      ],
      prevention: [
        "ইউরিয়ার উপরিপ্রয়োগ সম্পূর্ণ বন্ধ রাখুন। অতিরিক্ত ৫ কেজি পটাশ সার প্রয়োগ করুন।",
        "রোগমুক্ত সুস্থ প্রত্যায়িত বীজ ব্যবহার করুন।",
      ],
    },
    expertNote: "ব্যাক্টেরিয়াল ব্লাইট দেখা দিলে জমিতে নাইট্রোজেন সার কোনোভাবেই দেবেন না।",
  },
  rice_brown_spot: {
    diseaseName: "ধানের বাদামি দাগ রোগ (Brown Spot)",
    diseaseScientific: "Bipolaris oryzae",
    severity: "মাঝারি",
    symptomsObserved: "পাতায় ছোট ছোট অসংখ্য গোল বা ডিম্বাকৃতি গাঢ় বাদামি তিলের মতো দাগ।",
    cause: "মাটিতে পুষ্টিহীনতা, বিশেষ করে পটাশ ও সিলিকনের ঘাটতিতে বাইপোলারিস ছত্রাক সংক্রমণ।",
    treatments: {
      chemical: [
        {
          name: "ম্যানকোজেব + মেটালেক্সিল (রিডোমিল গোল্ড)",
          dose: "প্রতি লিটার পানিতে ২ গ্রাম",
          instruction: "ভালোভাবে পাতায় স্প্রে করুন।",
        },
      ],
      organic: [
        {
          method: "ট্রাইকোডার্মা বায়ো-ফার্টিলাইজার",
          details: "জমিতে পর্যাপ্ত ট্রাইকো-কম্পোস্ট ও জৈব সার ব্যবহার করুন।",
        },
      ],
      prevention: ["জমিতে সুষম সার দিন এবং পটাশ সারের ঘাটতি পূরণ করুন।"],
    },
    expertNote: "বাদামি দাগ রোগ মূলত জমির দুর্বল পুষ্টির লক্ষণ, তাই সুষম সার ব্যবস্থাপনা নিশ্চিত করুন।",
  },

  // POTATO DISEASES
  potato_late_blight: {
    diseaseName: "আলুর নাবি ধসা রোগ (Late Blight)",
    diseaseScientific: "Phytophthora infestans",
    severity: "তীব্র",
    symptomsObserved: "পাতায় দ্রুত বিস্তারকারী ভেজা কালচে-বাদামি পচা দাগ এবং পাতার উল্টো পিঠে সাদা তুলার মতো ছত্রাকের স্তর।",
    cause: "ফাইটোফথোরা ছত্রাকের সংক্রমণ। ঘন কুয়াশা, মেঘলা আকাশ ও স্যাঁতসেঁতে আবহাওয়ায় রোগটি অত্যন্ত দ্রুত মহামারি রূপ নেয়।",
    treatments: {
      chemical: [
        {
          name: "ম্যানকোজেব + সাইমোক্সানিল (কার্জেট / মেলোডি ডুও)",
          dose: "প্রতি লিটার পানিতে ২.৫ গ্রাম",
          instruction: "কুয়াশাচ্ছন্ন আবহাওয়ায় লক্ষণ দেখা মাত্রই পাতার উভয় পাশে স্প্রে করুন। ৫-৭ দিন পর পুনরায় দিন।",
        },
        {
          name: "ডাইমেথোমর্ফ (অ্যাক্রোবেট এমজেড)",
          dose: "প্রতি লিটার পানিতে ২ গ্রাম",
          instruction: "তীব্র আক্রমণে অত্যন্ত কার্যকর প্রতিকার।",
        },
      ],
      organic: [
        {
          method: "বোর্দো মিশ্রণ (১%)",
          details: "১০০ গ্রাম তুঁতে ও ১০০ গ্রাম চুন ১০ লিটার পানিতে গুলিয়ে রোগ আসার আগেই প্রতিরোধক হিসেবে স্প্রে করুন।",
        },
      ],
      prevention: [
        "কুয়াশার সময় জমিতে সেচ দেওয়া সম্পূর্ণ বন্ধ রাখুন।",
        "আক্রান্ত ডালপালা কেটে জমি থেকে দূরে মাটিতে পুঁতে ফেলুন।",
      ],
    },
    expertNote: "লেট ব্লাইট আলুর সবচেয়ে ধ্বংসাত্মক রোগ। আবহাওয়া কুয়াশাচ্ছন্ন হলে পূর্বসতর্কতা হিসেবে স্প্রে করুন।",
  },
  potato_early_blight: {
    diseaseName: "আলুর আগাম ধসা রোগ (Early Blight)",
    diseaseScientific: "Alternaria solani",
    severity: "মাঝারি",
    symptomsObserved: "নিচের পাতায় গাঢ় বাদামি রঙের বৃত্তাকার রিং বা টার্গেট বোর্ডের মতো দাগ।",
    cause: "অল্টারনারিয়া ছত্রাকের আক্রমণ। উষ্ণ ও পর্যায়ক্রমে আর্দ্র-শুষ্ক আবহাওয়ায় এ রোগ দেখা দেয়।",
    treatments: {
      chemical: [
        {
          name: "ম্যানকোজেব ৭৫% ডব্লিউপি (ডাইথেন এম-৪৫)",
          dose: "প্রতি লিটার পানিতে ২ গ্রাম",
          instruction: "৭-১০ দিন পর পর দুইবার স্প্রে করুন।",
        },
      ],
      organic: [
        {
          method: "নিম তেলের নির্যাস",
          details: "প্রতি লিটার পানিতে ৫ মিলি নিম তেল স্প্রে করুন।",
        },
      ],
      prevention: ["ফসল পর্যায় অনুসরণ করুন এবং আক্রান্ত গাছের অবশিষ্টাংশ ধ্বংস করুন।"],
    },
    expertNote: "গাছের নিচের পাতা নিয়মিত পর্যবেক্ষণ করুন এবং প্রাথমিক দাগেই ব্যবস্থা নিন।",
  },

  // CORN DISEASES
  corn_stem_rot: {
    diseaseName: "ভুট্টার কাণ্ড পচা ও গোড়া পচা রোগ (Stem / Stalk Rot)",
    diseaseScientific: "Diplodia maydis / Fusarium moniliforme",
    severity: "মাঝারি",
    symptomsObserved: "কাণ্ডের নিচের গিঁট বাদামি হয়ে পচে যাওয়া এবং ভেতরের মজ্জা (pith) নষ্ট হয়ে ফাঁপা ও ভঙ্গুর হওয়া।",
    cause: "ডিপ্লোডিয়া বা ফিউজারিয়াম ছত্রাক সংক্রমণ এবং জমিতে জলাবদ্ধতা বা অতিরিক্ত নাইট্রোজেন সার।",
    treatments: {
      chemical: [
        {
          name: "কার্বেন্ডাজিম ৫০% ডব্লিউপি (নোইন / অটোস্টিন)",
          dose: "প্রতি লিটার পানিতে ২ গ্রাম",
          instruction: "গাছের গোড়ার মাটি ও কাণ্ডের নিচের অংশে ভালোভাবে স্প্রে করুন।",
        },
        {
          name: "এমিস্টার টপ ৩২৫ এসসি (এজোক্সিস্ট্রবিন + ডাইফেনোকোনাজল)",
          dose: "প্রতি লিটার পানিতে ১ মিলি",
          instruction: "পাতার ঝলসানো ও কাণ্ড পচা উভয় রোগেই দ্রুত কার্যকর।",
        },
      ],
      organic: [
        {
          method: "ট্রাইকোডার্মা ও নিষ্কাশন",
          details: "গোড়ায় ট্রাইকোডার্মা জৈব সার দিন এবং জমিতে দ্রুত নিকাশ নালা তৈরি করুন।",
        },
      ],
      prevention: [
        "বীজ বপনের আগে প্রতি কেজি বীজে ৩ গ্রাম প্রভ্যাক্স ২০০ দিয়ে শোধন করুন।",
        "পর্যাপ্ত পটাশ সার ব্যবহার করুন যা কাণ্ডকে শক্ত ও মজবুত রাখে।",
      ],
    },
    expertNote: "কাণ্ডের গোড়ায় যেন সেচের পানি জমে না থাকে তা নিশ্চিত করুন।",
  },
  corn_leaf_blight: {
    diseaseName: "ভুট্টার পাতা ঝলসানো রোগ (Northern Corn Leaf Blight)",
    diseaseScientific: "Exserohilum turcicum",
    severity: "মাঝারি",
    symptomsObserved: "পাতায় লম্বাটে নৌকার মতো বা চুরুট আকৃতির ধূসর-বাদামি ছোপ ছোপ দাগ।",
    cause: "এক্সসেরোহিলাম ছত্রাকের সংক্রমণ। মেঘলা আবহাওয়া ও মাঝারি তাপমাত্রায় রোগ ছড়ায়।",
    treatments: {
      chemical: [
        {
          name: "প্রোপিকোনাজল ২৫% ইসি (টিল্ট / অটোটিল্ট)",
          dose: "প্রতি লিটার পানিতে ১ মিলি",
          instruction: "১০-১২ দিন পর পর ২ বার স্প্রে করুন।",
        },
      ],
      organic: [
        {
          method: "আক্রান্ত পাতা অপসারণ",
          details: "নিচের মারাত্মক আক্রান্ত পাতা ছিঁড়ে ফেলে দিন।",
        },
      ],
      prevention: ["সহনশীল জাতের বীজ ব্যবহার করুন ও জমিতে অতিরিক্ত ঘন করে চারা লাগাবেন না।"],
    },
    expertNote: "মোচা আসার আগেই রোগ দমন করা জরুরি, অন্যথায় ভুট্টার ফলন ৩০-৪০% পর্যন্ত কমে যায়।",
  },
  corn_common_rust: {
    diseaseName: "ভুট্টার মরিচা রোগ (Common Rust)",
    diseaseScientific: "Puccinia sorghi",
    severity: "মাঝারি",
    symptomsObserved: "পাতার উভয় পাশে ছোট ছোট গোলাকার বাদামি বা মরিচা রঙের ফোস্কা দাগ।",
    cause: "পাকসিনিয়া ছত্রাক। শীতল ও আর্দ্র আবহাওয়ায় বাতাসে রেণু উড়ে ছড়ায়।",
    treatments: {
      chemical: [
        {
          name: "ম্যানকোজেব (ডাইথেন এম-৪৫) অথবা টিল্ট",
          dose: "প্রতি লিটার পানিতে ২ গ্রাম অথবা ১ মিলি",
          instruction: "মরিচার ফোস্কা দেখা দিলে দ্রুত স্প্রে করুন।",
        },
      ],
      organic: [
        {
          method: "জৈব সালফার স্প্রে",
          details: "সালফোক্স বা কুমুলাস প্রতি লিটার পানিতে ২ গ্রাম স্প্রে করুন।",
        },
      ],
      prevention: ["আক্রান্ত ক্ষেতে নাইট্রোজেন সারের মাত্রা নিয়ন্ত্রণ করুন।"],
    },
    expertNote: "মরিচা রোগ সাধারণত দেরিতে রোপণ করা ফসলে বেশি আক্রমণ করে।",
  },

  // PAPAYA DISEASES
  papaya_ringspot: {
    diseaseName: "পেঁপের রিং স্পট ভাইরাস (Papaya Ringspot Virus - PRSV)",
    diseaseScientific: "Papaya Ringspot Potyvirus",
    severity: "তীব্র",
    symptomsObserved: "করতলাকার পাতায় মোজাইক হলুদ ছোপ, পাতা ছোট ও বিকৃত হওয়া এবং বোঁটায় গাঢ় সবুজ জলছাপ বলয়।",
    cause: "ভাইরাস সংক্রমণ। এফিড (জাবপোকা) এবং সাদা মাছি এই ভাইরাসের প্রধান বাহক।",
    treatments: {
      chemical: [
        {
          name: "ইমিডাক্লোপ্রিড ২০ এসএল (এডমায়ার / টিডো)",
          dose: "প্রতি লিটার পানিতে ০.৫ মিলি",
          instruction: "বাহক পোকা দমনে পাতার উভয় পিঠ ভালো করে ভিজিয়ে স্প্রে করুন।",
        },
      ],
      organic: [
        {
          method: "আক্রান্ত গাছ ধ্বংস ও নিম তেল",
          details: "মারাত্মক আক্রান্ত গাছ উপড়ে পুড়িয়ে ফেলুন এবং সুস্থ গাছে নিম তেল স্প্রে করুন।",
        },
      ],
      prevention: [
        "জমির চারপাশে ভুট্টা বা ধইঞ্চা দিয়ে প্রতিবন্ধক বেড়া তৈরি করুন যাতে পোকা উড়তে না পারে।",
        "উঁচু বেডে পেঁপের চারা লাগান।",
      ],
    },
    expertNote: "ভাইরাসের সরাসরি নিরাময় নেই, তাই বাহক পোকা দমনই এই রোগ নিয়ন্ত্রণের প্রধান উপায়।",
  },
  papaya_anthracnose: {
    diseaseName: "পেঁপের অ্যানথ্রাকনোজ ও দাগ রোগ (Anthracnose)",
    diseaseScientific: "Colletotrichum gloeosporioides",
    severity: "মাঝারি",
    symptomsObserved: "পাতা ও কাঁচা-পাকা ফলের ওপর ছোট বাদামি গোল দাগ যা পরবর্তীতে দেবে গিয়ে কালচে হয়।",
    cause: "কলেটোট্রিকাম ছত্রাক। অতিরিক্ত বৃষ্টি ও উচ্চ আর্দ্রতায় এ রোগ বৃদ্ধি পায়।",
    treatments: {
      chemical: [
        {
          name: "কার্বেন্ডাজিম ৫০% ডব্লিউপি (অটোস্টিন)",
          dose: "প্রতি লিটার পানিতে ২ গ্রাম",
          instruction: "ফল ও পাতায় ১০ দিন পর পর ২ বার স্প্রে করুন।",
        },
      ],
      organic: [
        {
          method: "ট্রাইকোডার্মা ও নিকাশ",
          details: "গাছের গোড়ায় পানি জমতে না দেওয়া ও জৈব ছত্রাকনাশক প্রয়োগ।",
        },
      ],
      prevention: ["গাছের নিচে ঝরে পড়া পচা ফল ও পাতা পরিষ্কার রাখুন।"],
    },
    expertNote: "ফল তোলার আগে শেষ ১৫ দিন কোনো রাসায়নিক স্প্রে করবেন না।",
  },
  papaya_bacterial_spot: {
    diseaseName: "পেঁপের ব্যাক্টেরিয়াল ও ব্ল্যাক স্পট রোগ (Bacterial / Black Spot)",
    diseaseScientific: "Asperisporium caricae / Xanthomonas campestris",
    severity: "মাঝারি",
    symptomsObserved: "পাতার উভয় পিঠে ছোট ছোট কালো বা কালচে-বাদামি জলছাপ দাগ ও পাতা হলুদ হয়ে ঝরে পড়া।",
    cause: "ছত্রাক ও ব্যাকটেরিয়া সংক্রমণ। আর্দ্র ও স্যাঁতসেঁতে আবহাওয়ায় এ রোগের বিস্তার দ্রুত ঘটে।",
    treatments: {
      chemical: [
        {
          name: "কপার অক্সিক্লোরাইড ৫০% ডব্লিউপি (কুপ্রোফিক্স / চ্যাম্পিয়ন)",
          dose: "প্রতি লিটার পানিতে ২ গ্রাম",
          instruction: "লক্ষণ দেখার সাথে সাথে পাতার নিচে ও উপরে ভালো করে স্প্রে করুন।",
        },
      ],
      organic: [
        {
          method: "আক্রান্ত পাতা অপসারণ",
          details: "গাছের নিচের দাগযুক্ত পাতা কেটে নিরাপদ স্থানে ধ্বংস করুন।",
        },
      ],
      prevention: ["গাছের গোড়ায় সেচের পানি যাতে জমে না থাকে তা নিশ্চিত করুন।"],
    },
    expertNote: "তামাযুক্ত ছত্রাকনাশক (কপার) স্প্রে করলে ব্যাক্টেরিয়াল স্পট দ্রুত নিয়ন্ত্রণে আসে।",
  },
  papaya_curl: {
    diseaseName: "পেঁপের পাতা কোঁকড়ানো রোগ (Papaya Leaf Curl Virus)",
    diseaseScientific: "Papaya Leaf Curl Geminivirus",
    severity: "তীব্র",
    symptomsObserved: "পাতা নিচের বা ওপরের দিকে কুঁকড়ে যাওয়া, পাতার শিরা মোটা ও শক্ত হওয়া এবং গাছের বৃদ্ধি কমে যাওয়া।",
    cause: "সাদা মাছি (Bemisia tabaci) বাহিত ভাইরাস।",
    treatments: {
      chemical: [
        {
          name: "অ্যাসিটামিপ্রিড ২০ এসপি (টুপেক্স / গেইন)",
          dose: "প্রতি লিটার পানিতে ১ গ্রাম",
          instruction: "সাদা মাছি দমনে পাতার উভয় পিঠে স্প্রে করুন।",
        },
      ],
      organic: [
        {
          method: "হলুদ আঠালো ফাঁদ ও নিম তেল",
          details: "প্রতি শতকে ১টি হলুদ ফাঁদ স্থাপন ও নিম তেল (৫ মিলি/লিটার) স্প্রে করুন।",
        },
      ],
      prevention: ["জমির আশেপাশে আগাছা পরিষ্কার রাখুন ও রোগমুক্ত চারা রোপণ করুন।"],
    },
    expertNote: "সাদা মাছি দমনই পাতা কোঁকড়ানো রোগ নিয়ন্ত্রণের একমাত্র উপায়।",
  },

  // BANANA (কলা) DISEASES
  banana_sigatoka: {
    diseaseName: "কলার সিগাটোকা রোগ (Black / Yellow Sigatoka)",
    diseaseScientific: "Pseudocercospora musae / Mycosphaerella fijiensis",
    severity: "মাঝারি",
    symptomsObserved: "কলার পাতায় শিরা বরাবর ছোট ছোট হলুদ বা বাদামি সরু দাগ, যা পরবর্তীতে বড় হয়ে মাঝখানে ধূসর ও কিনারায় কালচে বলয় তৈরি করে এবং পাতা পুড়ে যাওয়ার মতো শুকিয়ে ঝুলে পড়ে।",
    cause: "ছত্রাকজনিত সংক্রমণ। উচ্চ আর্দ্রতা (৮০%+) এবং উষ্ণ স্যাঁতসেঁতে আবহাওয়ায় বাতাসের মাধ্যমে জীবাণু দ্রুত ছড়ায়।",
    treatments: {
      chemical: [
        {
          name: "প্রোপিকোনাজল ২৫% ইসি (টিল্ট / অটোটিল্ট)",
          dose: "প্রতি লিটার পানিতে ১ মিলি",
          instruction: "লক্ষণ দেখার সাথে সাথে পাতার ওপর ও নিচ ভালো করে ভিজিয়ে স্প্রে করুন। ১৫ দিন পর আরেকবার দিন।",
        },
        {
          name: "এজোক্সিস্ট্রবিন + ডাইফেনোকোনাজল (এমিস্টার টপ ৩২৫ এসসি)",
          dose: "প্রতি লিটার পানিতে ১ মিলি",
          instruction: "তীব্র আক্রমণে অত্যন্ত কার্যকর প্রতিরোধ গড়ে তোলে।",
        },
      ],
      organic: [
        {
          method: "আক্রান্ত পাতা ছাঁটাই ও ধ্বংস",
          details: "৫০% এর বেশি আক্রান্ত পাতা ধারালো দা দিয়ে কেটে ক্ষেতের বাইরে নিরাপদ স্থানে পুড়িয়ে ফেলুন।",
        },
      ],
      prevention: [
        "ক্ষেতে সেচ বা বৃষ্টির পানি নিষ্কাশনের সুষ্ঠু নালা রাখুন।",
        "অতিরিক্ত ঘন করে চারা রোপণ করবেন না এবং নিয়মিত আগাছা পরিষ্কার রাখুন।",
      ],
    },
    expertNote: "সিগাটোকা রোগ দ্রুত পুরো পাতায় ছড়িয়ে শালোকসংশ্লেষণ বন্ধ করে দেয়, তাই প্রাথমিক দাগেই ছত্রাকনাশক স্প্রে করুন।",
  },
  banana_panama: {
    diseaseName: "কলার পানামা রোগ বা ফিউজারিয়াম উইল্ট (Panama Disease / Fusarium Wilt)",
    diseaseScientific: "Fusarium oxysporum f. sp. cubense",
    severity: "তীব্র",
    symptomsObserved: "নিচের বয়স্ক পাতা প্রথমে হলুদ হয়ে বোঁটা ভেঙে গাছের কাণ্ডের সাথে ঝুলে পড়ে এবং কাণ্ডের ভাস্কুলার বান্ডিল লম্বালম্বি কাটলে লালচে-বাদামি বা কালো দাগ দেখা যায়।",
    cause: "মাটিবাহিত ফিউজারিয়াম ছত্রাকের আক্রমণ। সেচের পানি ও সংক্রামিত সাকারের মাধ্যমে জীবাণু নতুন জমিতে ছড়ায়।",
    treatments: {
      chemical: [
        {
          name: "কার্বেন্ডাজিম ৫০% ডব্লিউপি (যেমন: অটোস্টিন / নোইন)",
          dose: "প্রতি লিটার পানিতে ২ গ্রাম",
          instruction: "গাছের গোড়ার মাটি ও কাণ্ডে স্প্রে ও মাটি ভিজিয়ে (ড্রেনচিং) দিন।",
        },
      ],
      organic: [
        {
          method: "ট্রাইকোডার্মা ও চুন প্রয়োগ",
          details: "আক্রান্ত গাছে প্রতি লিটার পানিতে ৫ গ্রাম ট্রাইকোডার্মা মিশিয়ে গোড়ায় দিন এবং জমিতে পর্যাপ্ত চুন প্রয়োগ করুন।",
        },
      ],
      prevention: [
        "রোগাক্রান্ত জমির কোনো চারা (সাকার) অন্য জমিতে ব্যবহার করবেন না।",
        "আক্রান্ত গাছ শিকড়সহ তুলে মাটিতে চুন দিয়ে গর্ত ভরাট করুন।",
      ],
    },
    expertNote: "পানামা মাটিবাহিত মারাত্মক রোগ; রোগমুক্ত টিস্যু কালচার চারা ব্যবহার করা সবচেয়ে নিরাপদ।",
  },
  banana_bunchy_top: {
    diseaseName: "বানানা বাঞ্চিটপ ভাইরাস রোগ (Banana Bunchy Top Virus - BBTV)",
    diseaseScientific: "Banana Bunchy Top Babuvirus",
    severity: "তীব্র",
    symptomsObserved: "গাছের বৃদ্ধি থমকে খর্বাকৃতি হয়, নতুন পাতা ছোট ও খাড়া হয়ে শীর্ষে গুচ্ছাকারে (bunchy) জমা হয় এবং পাতায় গাঢ় সবুজ রঙের জলছাপ মোর্স কোডের মতো দাগ দেখা যায়।",
    cause: "ভাইরাস আক্রমণ। কলার জাবপোকা (Banana Aphid - Pentalonia nigronervosa) এর প্রধান বাহক।",
    treatments: {
      chemical: [
        {
          name: "ইমিডাক্লোপ্রিড ২০ এসএল (যেমন: এডমায়ার / টিডো)",
          dose: "প্রতি লিটার পানিতে ০.৫ মিলি",
          instruction: "জাবপোকা দমনে গাছের পাতার খাঁজে ও কাণ্ডের গোড়ায় ভালো করে স্প্রে করুন।",
        },
      ],
      organic: [
        {
          method: "আক্রান্ত গাছ সমূলে ধ্বংস",
          details: "আক্রান্ত গাছ সম্পূর্ণ উপড়ে কেরোসিন বা আগুন দিয়ে পুড়িয়ে ফেলুন যাতে পোকা উড়তে না পারে।",
        },
      ],
      prevention: [
        "শতভাগ রোগমুক্ত সুস্থ চারা বা প্রত্যায়িত টিস্যু কালচার চারা রোপণ করুন।",
      ],
    },
    expertNote: "ভাইরাস লাগা গাছ কখনো ফল দেয় না, তাই বাহক পোকা মেরে গাছটি দ্রুত ধ্বংস করাই বুদ্ধিমানের কাজ।",
  },
  banana_anthracnose: {
    diseaseName: "কলার অ্যানথ্রাকনোজ ও দাগ রোগ (Anthracnose)",
    diseaseScientific: "Colletotrichum musae",
    severity: "মাঝারি",
    symptomsObserved: "পাতা ও কলার গায়ে ছোট কালচে বাদামি গোলাকার দাগ, যা ধীরে ধীরে বৃদ্ধি পেয়ে ফল নষ্ট করে।",
    cause: "কলেটোট্রিকাম ছত্রাক।",
    treatments: {
      chemical: [
        {
          name: "ম্যানকোজেব ৭৫% ডব্লিউপি (ডাইথেন এম-৪৫)",
          dose: "প্রতি লিটার পানিতে ২.৫ গ্রাম",
          instruction: "কলার ছড়িতে ও পাতায় স্প্রে করুন।",
        },
      ],
      organic: [
        {
          method: "বোর্দো মিশ্রণ (১%) প্রয়োগ",
          details: "১০ লিটার পানিতে ১০০ গ্রাম তুঁতে ও ১০০ গ্রাম চুন মিশিয়ে স্প্রে করুন।",
        },
      ],
      prevention: ["কলার মোচা বা কাঁদি পলিথিন ব্যাগ দিয়ে ঢেকে (বাঞ্চ কভার) চাষ করুন।"],
    },
    expertNote: "বাঞ্চ কভারিং করলে অ্যানথ্রাকনোজ ও দাগ থেকে ফল শতভাগ সুরক্ষিত থাকে।",
  },

  // EGGPLANT / BRINJAL (বেগুন) DISEASES
  eggplant_borer: {
    diseaseName: "বেগুনের ডগা ও ফল ছিদ্রকারী পোকা (Brinjal Shoot & Fruit Borer)",
    diseaseScientific: "Leucinodes orbonalis",
    severity: "তীব্র",
    symptomsObserved: "কচি ডগার ওপরের অংশ নুয়ে পড়ে শুকিয়ে যাওয়া এবং বেগুনের ফলের গায়ে ছোট ছিদ্র ও পোকার বিষ্ঠা থাকা।",
    cause: "লুসিনোডেস পোকার কীড়া ডগা ও ফলের ভেতর ঢুকে কুঁড়ে কুঁড়ে খায়।",
    treatments: {
      chemical: [
        {
          name: "এমামেকটিন বেনজোয়েট ৫ এসজি (প্রোক্লেম / সাসপেন্ড)",
          dose: "প্রতি লিটার পানিতে ১ গ্রাম",
          instruction: "বিকেলের মিষ্টি রোদে পাতায় ও ডগায় ভালোভাবে স্প্রে করুন।",
        },
        {
          name: "ক্লোরানট্রানিলিপ্রোল ১৮.৫ এসসি (কোরাজন)",
          dose: "প্রতি ১০ লিটার পানিতে ৩ মিলি",
          instruction: "পোকার আক্রমণ তীব্র হলে প্রয়োগ করুন।",
        },
      ],
      organic: [
        {
          method: "সেক্স ফেরোমোন ফাঁদ (Sex Pheromone Trap)",
          details: "জমিতে প্রতি শতকে ১টি লিউরযুক্ত ফেরোমোন ফাঁদ স্থাপন করে পুরুষ পোকা আটকে ফেলুন।",
        },
        {
          method: "আক্রান্ত ডগা ছাঁটাই",
          details: "নুয়ে পড়া ডগা পোকার কীড়াসহ নিয়মিত কেটে মাটিতে পুঁতে ফেলুন।",
        },
      ],
      prevention: [
        "আক্রান্ত ডগা দেখা মাত্রই কাঁচি দিয়ে কেটে ধ্বংস করুন।",
        "নিয়মিত জমি পরিদর্শন করুন ও রোগমুক্ত চারা লাগান।",
      ],
    },
    expertNote: "ফেরোমোন ফাঁদ ব্যবহার করলে কীটনাশক ছাড়াই পোকার উপদ্রব ৭০-৮০% কমানো সম্ভব।",
  },
  eggplant_phomopsis: {
    diseaseName: "বেগুনের ফোমোপসিস ব্লাইট ও ফল পচা রোগ (Phomopsis Blight)",
    diseaseScientific: "Phomopsis vexans",
    severity: "তীব্র",
    symptomsObserved: "পাতায় গোলাকার বা অনিয়মিত বাদামি দাগ এবং ফলের গায়ে কালচে দেবে যাওয়া পচা দাগ দেখা যায়।",
    cause: "ফোমোপসিস ছত্রাক। বৃষ্টির আর্দ্রতা ও স্যাঁতসেঁতে আবহাওয়ায় রোগটি দ্রুত ছড়ায়।",
    treatments: {
      chemical: [
        {
          name: "ম্যানকোজেব ৭৫% ডব্লিউপি (ডাইথেন এম-৪৫)",
          dose: "প্রতি লিটার পানিতে ২ গ্রাম",
          instruction: "লক্ষণ দেখা দিলে ৭ দিন পর পর ২ বার স্প্রে করুন।",
        },
        {
          name: "কার্বেন্ডাজিম ৫০% ডব্লিউপি (অটোস্টিন)",
          dose: "প্রতি লিটার পানিতে ১.৫ গ্রাম",
          instruction: "গাছে ও ফলে স্প্রে করুন।",
        },
      ],
      organic: [
        {
          method: "আক্রান্ত ফল ও পাতা অপসারণ",
          details: "পচা ফল ও পাতা তুলে মাটির নিচে পুঁতে ফেলুন।",
        },
      ],
      prevention: ["বীজ বপনের আগে প্রভ্যাক্স ২০০ দিয়ে বীজ শোধন করুন।"],
    },
    expertNote: "বীজ শোধন করলে এই রোগের আক্রমণ বহুলাংশে প্রতিরোধ করা যায়।",
  },
  eggplant_little_leaf: {
    diseaseName: "বেগুনের ক্ষুদ্রপত্র বা পাতা কোঁকড়ানো রোগ (Little Leaf Disease)",
    diseaseScientific: "Phytoplasma / Leafhopper borne",
    severity: "মাঝারি",
    symptomsObserved: "পাতা অতিরিক্ত ছোট হয়ে মসৃণ ও নরম হয় এবং গাছ ঝাঁটার মতো ঘন ঝোপালো রূপ নেয়, গাছে কোনো ফুল-ফল আসে না।",
    cause: "ফাইটোোপ্লাজমা জীবাণু। পাতায় থাকা সবুজ জাসিড পোকা (Hishimonus phycitis) রোগ ছড়ায়।",
    treatments: {
      chemical: [
        {
          name: "ইমিডাক্লোপ্রিড ২০ এসএল (এডমায়ার / টিডো)",
          dose: "প্রতি লিটার পানিতে ০.৫ মিলি",
          instruction: "জাসিড ও রসচোষা পোকা দমনে পাতার নিচের পিঠে স্প্রে করুন।",
        },
      ],
      organic: [
        {
          method: "হলুদ আঠালো ফাঁদ ও ছাই প্রয়োগ",
          details: "পোকা নিয়ন্ত্রণে হলুদ আঠালো ফাঁদ স্থাপন করুন।",
        },
      ],
      prevention: ["আক্রান্ত গাছ তুলে ফেলে সুস্থ চারা রক্ষা করুন।"],
    },
    expertNote: "গাছ ঝোপের মতো ছোট হয়ে গেলে তা আর ফল দেবে না, দ্রুত তা অপসারণ করে অন্যান্য গাছ বাঁচান।",
  },
  eggplant_bacterial_wilt: {
    diseaseName: "বেগুনের ব্যাক্টেরিয়াল উইল্ট বা ঢলে পড়া রোগ (Bacterial Wilt)",
    diseaseScientific: "Ralstonia solanacearum",
    severity: "তীব্র",
    symptomsObserved: "গাছের পাতা সবুজ থাকা অবস্থাতেই হঠাৎ দুপুরের রোদে নুয়ে পড়ে ও ঢলে মরে যায়, গোড়ার কাণ্ড কাটলে পানিতে সাদা দুধের মতো ব্যাকটেরিয়ার রেশা (ooze) বের হয়।",
    cause: "মাটিবাহিত রালস্টোনিয়া ব্যাক্টেরিয়া।",
    treatments: {
      chemical: [
        {
          name: "কপার হাইড্রোক্সাইড (চ্যাম্পিয়ন) অথবা ব্লিচিং পাউডার",
          dose: "প্রতি লিটার পানিতে ২ গ্রাম",
          instruction: "গাছের গোড়ার মাটিতে ড্রেনচিং করুন।",
        },
      ],
      organic: [
        {
          method: "ট্রাইকোডার্মা ও চুন প্রয়োগ",
          details: "মাটিতে ট্রাইকোডার্মা জৈব সার ও ডলোমাইট চুন ব্যবহার করুন।",
        },
      ],
      prevention: [
        "জলাবদ্ধতা মুক্ত উঁচু জমিতে বেগুন চাষ করুন।",
        "বুনো বেগুন (Solanum torvum)-এর সাথে গ্রাফটিং করা চারা ব্যবহার করুন।",
      ],
    },
    expertNote: "গ্রাফটিং করা চারা ব্যাক্টেরিয়াল উইল্ট রোগে ১০০% প্রতিরোধী হয়।",
  },

  // TOMATO DISEASES
  tomato_leaf_curl: {
    diseaseName: "টমেটোর পাতা কোঁকড়ানো রোগ (Tomato Leaf Curl Virus)",
    diseaseScientific: "Tomato Yellow Leaf Curl Virus (TYLCV)",
    severity: "তীব্র",
    symptomsObserved: "পাতা উপরের বা নিচের দিকে চামচের মতো কুঁকড়ে যাওয়া, গাছের বৃদ্ধি থেমে যাওয়া ও ঝোপের মতো হওয়া।",
    cause: "ভাইরাস সংক্রমণ, যা মূলত সাদা মাছি (Whitefly) দ্বারা সুস্থ গাছে ছড়ায়।",
    treatments: {
      chemical: [
        {
          name: "অ্যাসিটামিপ্রিড ২০ এসপি (টুপেক্স) অথবা ডায়াফেনথিউরন (পেগাসাস)",
          dose: "প্রতি লিটার পানিতে ১ গ্রাম",
          instruction: "সাদা মাছি দমনে পাতার নিচের পিঠে সুন্দরভাবে স্প্রে করুন।",
        },
      ],
      organic: [
        {
          method: "হলুদ আঠালো ফাঁদ (Yellow Sticky Trap)",
          details: "জমিতে প্রতি শতকে ১টি করে হলুদ ফাঁদ স্থাপন করে সাদা মাছি নিয়ন্ত্রণ করুন।",
        },
      ],
      prevention: ["চারা রোপণের সময় জাল বা নেট দিয়ে বীজতলা ঢেকে রাখুন।"],
    },
    expertNote: "সাদা মাছি দমন করলেই পাতা কোঁকড়ানো রোগ ৯০% কমে যায়।",
  },
  tomato_early_blight: {
    diseaseName: "টমেটোর আগাম ধসা বা ব্লাইট রোগ (Early Blight)",
    diseaseScientific: "Alternaria solani",
    severity: "মাঝারি",
    symptomsObserved: "নিচের বয়স্ক পাতায় গাঢ় বাদামি রঙের স্পষ্ট রিং বা বৃত্তাকার দাগ ও পাতা হলুদ হয়ে শুকিয়ে যাওয়া।",
    cause: "অল্টারনারিয়া ছত্রাকের আক্রমণ।",
    treatments: {
      chemical: [
        {
          name: "ম্যানকোজেব (ডাইথেন এম-৪৫) অথবা রোভরাল ৫০ ডব্লিউপি",
          dose: "প্রতি লিটার পানিতে ২ গ্রাম",
          instruction: "৭-১০ দিন অন্তর পাতায় স্প্রে করুন।",
        },
      ],
      organic: [
        {
          method: "আক্রান্ত পাতা অপসারণ ও জৈব মালচিং",
          details: "মাটি থেকে ছিটকে পড়া পানি রোধে মালচিং ব্যবহার করুন ও আক্রান্ত পাতা পুড়িয়ে ফেলুন।",
        },
      ],
      prevention: ["গাছের গোড়ায় পানি জমে থাকতে দেবেন না এবং সুষম সার ব্যবহার করুন।"],
    },
    expertNote: "গাছের নিচের পাতা কেটে পরিষ্কার রাখলে ছত্রাকের বিস্তার অনেক কমে।",
  },

  // CAULIFLOWER DISEASES
  cauliflower_black_rot: {
    diseaseName: "ফুলকপির ব্ল্যাক রট বা কালো পচা রোগ (Black Rot)",
    diseaseScientific: "Xanthomonas campestris pv. campestris",
    severity: "তীব্র",
    symptomsObserved: "পাতার কিনারায় ইংরেজি 'V' আকৃতির হলদে-বাদামি ছোপ, পাতার শিরাগুলো কালো হয়ে যাওয়া এবং দ্রুত পচন ধরা।",
    cause: "জ্যান্থোমোনাস ব্যাকটেরিয়ার আক্রমণ। অতিরিক্ত বৃষ্টিপাত, উষ্ণ ও আর্দ্র আবহাওয়ায় এ রোগ দ্রুত বিস্তার লাভ করে।",
    treatments: {
      chemical: [
        {
          name: "কপার অক্সিক্লোরাইড ৫০% ডব্লিউপি (কুপ্রোফিক্স বা চ্যাম্পিয়ন)",
          dose: "প্রতি লিটার পানিতে ২ গ্রাম",
          instruction: "বিকেলের মিষ্টি রোদে পাতার ওপর ও নিচে ভালোভাবে স্প্রে করুন। সাথে স্ট্রেপ্টোমাইসিন সালফেট ২০% (ব্যক্ট্রোট্রল ০.২ গ্রাম) যোগ করতে পারেন।",
        },
        {
          name: "কপার হাইড্রোক্সাইড (ক্যাপভিট)",
          dose: "প্রতি লিটার পানিতে ২ গ্রাম",
          instruction: "তীব্র আক্রমণে ৭-১০ দিন পর দ্বিতীয়বার স্প্রে করুন।",
        },
      ],
      organic: [
        {
          method: "গরম পানিতে বীজ শোধন ও আক্রান্ত পাতা অপসারণ",
          details: "৫০ ডিগ্রি সেলসিয়াস গরম পানিতে ৩০ মিনিট বীজ ডুবিয়ে রাখুন। আক্রান্ত পাতা কেটে মাটিতে পুঁতে ফেলুন।",
        },
      ],
      prevention: [
        "ফসলের জমিতে পানি নিষ্কাশনের সুব্যবস্থা রাখুন যাতে গোড়ায় পানি না জমে।",
        "একই জমিতে পরপর দুই বছর ক্রুসিফেরি পরিবারের ফসল চাষ না করে শস্যপর্যায় অবলম্বন করুন।",
        "রোগমুক্ত সুস্থ প্রত্যায়িত চারা বা বীজ ব্যবহার করুন।",
      ],
    },
    expertNote: "ব্ল্যাক রট ফুলকপির সবচেয়ে ক্ষতিকর রোগ। পাতার কিনারায় ইংরেজি 'V' আকারের হলুদ দাগ দেখলেই সঙ্গে সঙ্গে কপার স্প্রে করুন।",
  },
  cauliflower_downy_mildew: {
    diseaseName: "ফুলকপির ডাউনি মিলডিউ রোগ (Downy Mildew)",
    diseaseScientific: "Peronospora parasitica / Hyaloperonospora brassicae",
    severity: "মাঝারি",
    symptomsObserved: "পাতার উপরের পিঠে কোণাকৃতি হলুদ ছোপ দাগ এবং পাতার নিচের পিঠে সাদা বা ধূসর রঙের তুলার মতো ছত্রাকের আস্তরণ।",
    cause: "পেরোনোস্পোরা ছত্রাকের সংক্রমণ। ঠাণ্ডা ও কুয়াশাচ্ছন্ন আর্দ্র আবহাওয়ায় এ রোগ দ্রুত ছড়ায়।",
    treatments: {
      chemical: [
        {
          name: "মেটালেক্সিল + ম্যানকোজেব (রিডোমিল গোল্ড ৬৮ ডব্লিউজি)",
          dose: "প্রতি লিটার পানিতে ২ গ্রাম",
          instruction: "কুয়াশাচ্ছন্ন আবহাওয়ায় লক্ষণ দেখা দিলে পাতার নিচে ও উপরে ভালো করে ভিজিয়ে স্প্রে করুন।",
        },
        {
          name: "সাইমোক্সানিল + ম্যানকোজেব (কার্জেট)",
          dose: "প্রতি লিটার পানিতে ২ গ্রাম",
          instruction: "তীব্র সংক্রমণে ৭ দিন পর দ্বিতীয়বার স্প্রে করুন।",
        },
      ],
      organic: [
        {
          method: "বোর্দো মিশ্রণ (১%) প্রয়োগ",
          details: "১০০ গ্রাম তুঁতে ও ১০০ গ্রাম চুন ১০ লিটার পানিতে মিশিয়ে তৈরি দ্রবণ রোগ আসার আগেই স্প্রে করুন।",
        },
      ],
      prevention: [
        "চারা খুব ঘন করে রোপণ করবেন না যাতে গাছে আলো-বাতাস চলাচল ঠিক থাকে।",
        "সকালে চারার ওপর শিশির জমে থাকলে তা পরিষ্কার বাঁশের কঞ্চি দিয়ে ঝেড়ে দিন।",
      ],
    },
    expertNote: "ডাউনি মিলডিউ ছত্রাক পাতার নিচে বেশি থাকে, তাই স্প্রে করার সময় পাতার নিচের পিঠ ভালোভাবে ভেজাতে হবে।",
  },
  cauliflower_alternaria_blight: {
    diseaseName: "ফুলকপির অল্টারনারিয়া পাতার দাগ রোগ (Alternaria Leaf Spot)",
    diseaseScientific: "Alternaria brassicicola / Alternaria brassicae",
    severity: "মাঝারি",
    symptomsObserved: "পাতায় গোলাকার গাঢ় বাদামি বা কালচে বলয়যুক্ত দাগ, পাতা ঝলসে যাওয়া এবং ফুলকপির কুঁড়িতেও বাদামি ছোপ পড়া।",
    cause: "অল্টারনারিয়া ছত্রাকের আক্রমণ। গুঁড়ি গুঁড়ি বৃষ্টি ও স্যাঁতসেঁতে আবহাওয়ায় এ রোগ দ্রুত ছড়ায়।",
    treatments: {
      chemical: [
        {
          name: "ম্যানকোজেব ৭৫% ডব্লিউপি (ডাইথেন এম-৪৫)",
          dose: "প্রতি লিটার পানিতে ২ গ্রাম",
          instruction: "লক্ষণ দেখা দিলে ৭-১০ দিন পরপর ২-৩ বার স্প্রে করুন।",
        },
        {
          name: "আইপ্রোডিয়ন ৫০% ডব্লিউপি (রোভরাল)",
          dose: "প্রতি লিটার পানিতে ২ গ্রাম",
          instruction: "পাতার দাগ ও ফুলের পচন দমনে অত্যন্ত কার্যকর।",
        },
      ],
      organic: [
        {
          method: "ট্রাইকোডার্মা ও নিম খৈল প্রয়োগ",
          details: "জমিতে বিঘাপ্রতি ১৫-২০ কেজি নিম খৈল ব্যবহার করুন এবং ট্রাইকোডার্মা জৈব ছত্রাকনাশক স্প্রে করুন।",
        },
      ],
      prevention: [
        "বপনের আগে প্রতি কেজি বীজে ২.৫ গ্রাম প্রভ্যাক্স বা কার্বেন্ডাজিম দিয়ে বীজ শোধন করুন।",
        "জমি সবসময় আগাছামুক্ত রাখুন।",
      ],
    },
    expertNote: "অল্টারনারিয়া দাগের কারণে ফুলকপির গুণগত মান নষ্ট হয়ে যায়, প্রাথমিক দাগেই রোভরাল স্প্রে করুন।",
  },
  // MUSTARD (সরিষা) DISEASES
  mustard_alternaria_blight: {
    diseaseName: "সরিষার অল্টারনারিয়া পাতা ঝলসানো রোগ (Alternaria Blight)",
    diseaseScientific: "Alternaria brassicae & Alternaria brassicicola",
    severity: "তীব্র",
    symptomsObserved: "পাতায় ও শুঁটিতে গোলাকার কালচে-বাদামি বলয়যুক্ত দাগ (concentric rings), শুঁটি ফেটে দানা ঝরে পড়া।",
    cause: "অল্টারনারিয়া ছত্রাকের আক্রমণ। স্যাঁতসেঁতে আবহাওয়া ও কুয়াশায় দ্রুত ছড়ায়।",
    treatments: {
      chemical: [
        {
          name: "আইপ্রোডিয়ন ৫০% ডব্লিউপি (রোভরাল)",
          dose: "প্রতি লিটার পানিতে ২ গ্রাম",
          instruction: "লক্ষণ দেখা দিলে ৮-১০ দিন পর পর ২ বার স্প্রে করুন।",
        },
        {
          name: "ম্যানকোজেব ৭৫% ডব্লিউপি (ডাইথেন এম-৪৫)",
          dose: "প্রতি লিটার পানিতে ২.৫ গ্রাম",
          instruction: "পাতার ওপর-নিচ ভিজিয়ে স্প্রে করুন।",
        },
      ],
      organic: [
        {
          method: "রসুন ও নিমের নির্যাস স্প্রে",
          details: "১০০ গ্রাম রসুন বাটা ও নিম পাতার রস ১০ লিটার পানিতে মিশিয়ে স্প্রে করুন।",
        },
      ],
      prevention: [
        "বপনের আগে প্রতি কেজি বীজে ২.৫ গ্রাম কার্বেন্ডাজিম বা প্রভ্যাক্স দিয়ে বীজ শোধন করুন।",
        "আক্রান্ত শুঁটি ও নাড়া জমি থেকে তুলে পুড়িয়ে ফেলুন।",
      ],
    },
    expertNote: "অল্টারনারিয়া রোগ সরিষার ফলন ৩০-৬০% কমিয়ে দিতে পারে। গাছে ফুল আসার আগেই প্রতিরোধমূলক স্প্রে দিন।",
  },
  mustard_white_rust: {
    diseaseName: "সরিষার সাদা মরিচা রোগ (White Rust)",
    diseaseScientific: "Albugo candida",
    severity: "মাঝারি",
    symptomsObserved: "পাতার নিচের পিঠে চকচকে সাদা রঙের ফোস্কার মতো উঁচু দাগ এবং কচি ডগা ফুলে বিকৃত (staghead) হওয়া।",
    cause: "অ্যালবুগো ক্যান্ডিডা ছত্রাকের আক্রমণ। ঘন কুয়াশা ও কম তাপমাত্রায় এ রোগ দ্রুত বাড়ে।",
    treatments: {
      chemical: [
        {
          name: "মেটালেক্সিল + ম্যানকোজেব (রিডোমিল গোল্ড ৬৮ ডব্লিউজি)",
          dose: "প্রতি লিটার পানিতে ২ গ্রাম",
          instruction: "পাতার নিচে ও কাণ্ডে স্প্রে করুন।",
        },
      ],
      organic: [
        {
          method: "বোর্দো মিশ্রণ (১%)",
          details: "১০০ গ্রাম তুঁতে ও ১০০ গ্রাম চুন ১০ লিটার পানিতে মিশিয়ে স্প্রে করুন।",
        },
      ],
      prevention: [
        "সরিষা ঘন করে না বুনে সারি থেকে সারির দূরত্ব ৩০ সেমি রাখুন।",
        "রোগ প্রতিরোধী জাত (যেমন: বারি সরিষা-১৪, ১৭) চাষ করুন।",
      ],
    },
    expertNote: "সাদা মরিচার লক্ষণ দেখা দিলে নাইট্রোজেন সার কমিয়ে পটাশ সার প্রয়োগ করুন।",
  },
  mustard_aphid: {
    diseaseName: "সরিষার জাবপোকা বা এফিড আক্রমণ (Mustard Aphid)",
    diseaseScientific: "Lipaphis erysimi",
    severity: "তীব্র",
    symptomsObserved: "কচি ডগা, ফুল ও শুঁটিতে ক্ষুদ্র কালো-সবুজ পোকার ঝাঁক, রস চুষে খাওয়ায় ডগা শুকিয়ে যাওয়া ও আঠালো ভাব।",
    cause: "লিপাফিস এফিড পোকার উপদ্রব। মেঘলা আবহাওয়া ও মিষ্টি শীতে আক্রমণ বাড়ে।",
    treatments: {
      chemical: [
        {
          name: "ইমিডাক্লোপ্রিড ২০ এসএল (এডমায়ার বা টিডো)",
          dose: "প্রতি লিটার পানিতে ০.৫ মিলি",
          instruction: "বিকেলে ফুল ও ডগায় স্প্রে করুন।",
        },
        {
          name: "ম্যালাথিয়ন ৫৭ ইসি",
          dose: "প্রতি লিটার পানিতে ২ মিলি",
          instruction: "তীব্র আক্রমণে সকালে বা বিকেলে স্প্রে করুন।",
        },
      ],
      organic: [
        {
          method: "সাবান পানি ও নিম তেল স্প্রে",
          details: "প্রতি লিটার পানিতে ৫ মিলি নিম তেল ও সামান্য গুঁড়ো সাবান মিশিয়ে স্প্রে করুন।",
        },
      ],
      prevention: [
        "কার্তিক মাসের প্রথম দিকে (অক্টোবরের শেষ) আগাম সরিষা বপন করলে জাবপোকার আক্রমণ এড়ানো যায়।",
        "ক্ষেতে প্রতি শতকে ১টি হলুদ আঠালো ফাঁদ (Yellow Trap) স্থাপন করুন।",
      ],
    },
    expertNote: "সরিষার ফুল ফোটার সময় জাবপোকা আক্রমণ করলে মৌমাছির ক্ষতি এড়াতে কেবল বিকেলে স্প্রে করুন।",
  },
  healthy_plant: {
    diseaseName: "সুস্থ ও সতেজ উদ্ভিদ (Healthy Plant)",
    diseaseScientific: "কোনো রোগজীবাণু নেই",
    severity: "কম",
    symptomsObserved: "পাতার গঠন, রঙ ও অঙ্গসংস্থান স্বাভাবিক ও স্বাস্থ্যোজ্জ্বল। কোনো ছত্রাক, ব্যাক্টেরিয়া বা পোকার আক্রমণ নেই।",
    cause: "উদ্ভিদ সম্পূর্ণ সুস্থ ও রোগমুক্ত।",
    treatments: {
      chemical: [],
      organic: [
        {
          method: "নিয়মিত সুষম পুষ্টি ও পরিচর্যা",
          details: "গাছের স্বাভাবিক বৃদ্ধির জন্য পর্যাপ্ত সূর্যালোক, পরিমিত সেচ ও সুষম সার বজায় রাখুন।",
        },
      ],
      prevention: [
        "গাছে কোনো অতিরিক্ত বা অপ্রয়োজনীয় কীটনাশক স্প্রে করবেন না।",
        "নিয়মিত জমি পরিদর্শন করুন যাতে রোগ আসার আগেই সতর্ক থাকা যায়।",
      ],
    },
    expertNote: "আপনার ফসল চমৎকার অবস্থায় রয়েছে। কোনো রাসায়নিক ওষুধ ব্যবহারের প্রয়োজন নেই।",
  },
};

/**
 * Match Roboflow prediction class string to standardized prescription
 */
export function matchRoboflowClassToPrescription(
  cropKey: string,
  rawClass: string,
  confidence: number
): {
  cropName: string;
  cropScientific: string;
  disease: DiseasePrescription;
} {
  const normClass = (rawClass || "").toLowerCase().replace(/[\s-_]+/g, "_");
  const modelMeta = ROBOFLOW_MODELS[cropKey] || {
    banglaName: cropKey || "উদ্ভিদ",
    scientific: "Plantae",
  };

  // Healthy check
  if (normClass.includes("healthy") || normClass.includes("suvostho") || normClass.includes("clean")) {
    return {
      cropName: modelMeta.banglaName,
      cropScientific: modelMeta.scientific,
      disease: DISEASE_PRESCRIPTIONS.healthy_plant,
    };
  }

  // Rice matches
  if (normClass.includes("blast") || normClass.includes("neck_blast")) {
    return {
      cropName: "ধান",
      cropScientific: "Oryza sativa",
      disease: DISEASE_PRESCRIPTIONS.rice_blast,
    };
  }
  if (normClass.includes("bacterial") || normClass.includes("blight") && normClass.includes("leaf")) {
    return {
      cropName: "ধান",
      cropScientific: "Oryza sativa",
      disease: DISEASE_PRESCRIPTIONS.rice_bacterial_leaf_blight,
    };
  }
  if (normClass.includes("brown") || normClass.includes("spot")) {
    return {
      cropName: "ধান",
      cropScientific: "Oryza sativa",
      disease: DISEASE_PRESCRIPTIONS.rice_brown_spot,
    };
  }

  // Potato matches
  if (normClass.includes("late") || (normClass.includes("blight") && (cropKey.includes("আলু") || cropKey.includes("potato")))) {
    return {
      cropName: "আলু",
      cropScientific: "Solanum tuberosum",
      disease: DISEASE_PRESCRIPTIONS.potato_late_blight,
    };
  }
  if (normClass.includes("early")) {
    return {
      cropName: "আলু",
      cropScientific: "Solanum tuberosum",
      disease: DISEASE_PRESCRIPTIONS.potato_early_blight,
    };
  }

  // Corn matches
  if (normClass.includes("stem") || normClass.includes("stalk") || normClass.includes("rot")) {
    return {
      cropName: "ভুট্টা",
      cropScientific: "Zea mays",
      disease: DISEASE_PRESCRIPTIONS.corn_stem_rot,
    };
  }
  if (normClass.includes("northern") || normClass.includes("turcicum") || (normClass.includes("blight") && (cropKey.includes("ভুট্টা") || cropKey.includes("corn")))) {
    return {
      cropName: "ভুট্টা",
      cropScientific: "Zea mays",
      disease: DISEASE_PRESCRIPTIONS.corn_leaf_blight,
    };
  }
  if (normClass.includes("rust")) {
    return {
      cropName: "ভুট্টা",
      cropScientific: "Zea mays",
      disease: DISEASE_PRESCRIPTIONS.corn_common_rust,
    };
  }

  // Banana matches
  if (cropKey.includes("কলা") || cropKey.includes("banana")) {
    if (normClass.includes("sigatoka") || normClass.includes("yellow") || normClass.includes("black")) {
      return {
        cropName: "কলা",
        cropScientific: "Musa acuminata",
        disease: DISEASE_PRESCRIPTIONS.banana_sigatoka,
      };
    }
    if (normClass.includes("panama") || normClass.includes("wilt") || normClass.includes("fusarium")) {
      return {
        cropName: "কলা",
        cropScientific: "Musa acuminata",
        disease: DISEASE_PRESCRIPTIONS.banana_panama,
      };
    }
    if (normClass.includes("bunchy") || normClass.includes("bbtv") || normClass.includes("top")) {
      return {
        cropName: "কলা",
        cropScientific: "Musa acuminata",
        disease: DISEASE_PRESCRIPTIONS.banana_bunchy_top,
      };
    }
    if (normClass.includes("anthracnose") || normClass.includes("spot") || normClass.includes("cordana")) {
      return {
        cropName: "কলা",
        cropScientific: "Musa acuminata",
        disease: DISEASE_PRESCRIPTIONS.banana_anthracnose,
      };
    }
    return {
      cropName: "কলা",
      cropScientific: "Musa acuminata",
      disease: DISEASE_PRESCRIPTIONS.banana_sigatoka,
    };
  }

  // Eggplant matches
  if (cropKey.includes("বেগুন") || cropKey.includes("eggplant") || cropKey.includes("brinjal")) {
    if (normClass.includes("borer") || normClass.includes("shoot") || normClass.includes("fruit") || normClass.includes("larva")) {
      return {
        cropName: "বেগুন",
        cropScientific: "Solanum melongena",
        disease: DISEASE_PRESCRIPTIONS.eggplant_borer,
      };
    }
    if (normClass.includes("phomopsis") || normClass.includes("rot") || normClass.includes("blight")) {
      return {
        cropName: "বেগুন",
        cropScientific: "Solanum melongena",
        disease: DISEASE_PRESCRIPTIONS.eggplant_phomopsis,
      };
    }
    if (normClass.includes("little") || normClass.includes("curl") || normClass.includes("mosaic")) {
      return {
        cropName: "বেগুন",
        cropScientific: "Solanum melongena",
        disease: DISEASE_PRESCRIPTIONS.eggplant_little_leaf,
      };
    }
    if (normClass.includes("wilt") || normClass.includes("bacterial") || normClass.includes("ralstonia")) {
      return {
        cropName: "বেগুন",
        cropScientific: "Solanum melongena",
        disease: DISEASE_PRESCRIPTIONS.eggplant_bacterial_wilt,
      };
    }
    return {
      cropName: "বেগুন",
      cropScientific: "Solanum melongena",
      disease: DISEASE_PRESCRIPTIONS.eggplant_borer,
    };
  }

  // Papaya matches
  if (cropKey.includes("পেঁপে") || cropKey.includes("papaya")) {
    if (normClass.includes("curl")) {
      return {
        cropName: "পেঁপে",
        cropScientific: "Carica papaya",
        disease: DISEASE_PRESCRIPTIONS.papaya_curl,
      };
    }
    if (normClass.includes("anthracnose") || normClass.includes("antraknosa")) {
      return {
        cropName: "পেঁপে",
        cropScientific: "Carica papaya",
        disease: DISEASE_PRESCRIPTIONS.papaya_anthracnose,
      };
    }
    if (normClass.includes("bacterial") || normClass.includes("black")) {
      return {
        cropName: "পেঁপে",
        cropScientific: "Carica papaya",
        disease: DISEASE_PRESCRIPTIONS.papaya_bacterial_spot,
      };
    }
    if (normClass.includes("ring") || normClass.includes("spot") || normClass.includes("virus") || normClass.includes("prsv")) {
      return {
        cropName: "পেঁপে",
        cropScientific: "Carica papaya",
        disease: DISEASE_PRESCRIPTIONS.papaya_ringspot,
      };
    }
    return {
      cropName: "পেঁপে",
      cropScientific: "Carica papaya",
      disease: DISEASE_PRESCRIPTIONS.papaya_ringspot,
    };
  }

  // Cauliflower matches
  if (cropKey.includes("ফুলকপি") || cropKey.includes("cauliflower")) {
    if (normClass.includes("rot") || normClass.includes("black") || normClass.includes("bacterial")) {
      return {
        cropName: "ফুলকপি",
        cropScientific: "Brassica oleracea var. botrytis",
        disease: DISEASE_PRESCRIPTIONS.cauliflower_black_rot,
      };
    }
    if (normClass.includes("downy") || normClass.includes("mildew")) {
      return {
        cropName: "ফুলকপি",
        cropScientific: "Brassica oleracea var. botrytis",
        disease: DISEASE_PRESCRIPTIONS.cauliflower_downy_mildew,
      };
    }
    if (normClass.includes("alternaria") || normClass.includes("spot") || normClass.includes("blight")) {
      return {
        cropName: "ফুলকপি",
        cropScientific: "Brassica oleracea var. botrytis",
        disease: DISEASE_PRESCRIPTIONS.cauliflower_alternaria_blight,
      };
    }
    return {
      cropName: "ফুলকপি",
      cropScientific: "Brassica oleracea var. botrytis",
      disease: DISEASE_PRESCRIPTIONS.cauliflower_black_rot,
    };
  }

  // Mustard (সরিষা) matches - Roboflow: mustard-disease/5
  if (cropKey.includes("সরিষা") || cropKey.includes("mustard")) {
    if (normClass.includes("alternaria") || normClass.includes("blight") || normClass.includes("spot") || normClass.includes("black")) {
      return {
        cropName: "সরিষা",
        cropScientific: "Brassica juncea",
        disease: DISEASE_PRESCRIPTIONS.mustard_alternaria_blight,
      };
    }
    if (normClass.includes("white") || normClass.includes("rust") || normClass.includes("albugo")) {
      return {
        cropName: "সরিষা",
        cropScientific: "Brassica juncea",
        disease: DISEASE_PRESCRIPTIONS.mustard_white_rust,
      };
    }
    if (normClass.includes("aphid") || normClass.includes("insect") || normClass.includes("pest") || normClass.includes("poka") || normClass.includes("jab")) {
      return {
        cropName: "সরিষা",
        cropScientific: "Brassica juncea",
        disease: DISEASE_PRESCRIPTIONS.mustard_aphid,
      };
    }
    return {
      cropName: "সরিষা",
      cropScientific: "Brassica juncea",
      disease: DISEASE_PRESCRIPTIONS.mustard_alternaria_blight,
    };
  }

  // Tomato matches
  if (normClass.includes("curl") || normClass.includes("yellow") || normClass.includes("mosaic")) {
    return {
      cropName: "টমেটো",
      cropScientific: "Solanum lycopersicum",
      disease: DISEASE_PRESCRIPTIONS.tomato_leaf_curl,
    };
  }
  if (normClass.includes("blight") && (cropKey.includes("টমেটো") || cropKey.includes("tomato"))) {
    return {
      cropName: "টমেটো",
      cropScientific: "Solanum lycopersicum",
      disease: DISEASE_PRESCRIPTIONS.tomato_early_blight,
    };
  }

  // Default intelligent fallback based on crop
  if (cropKey.includes("সরিষা") || cropKey.includes("mustard")) {
    return {
      cropName: "সরিষা",
      cropScientific: "Brassica juncea",
      disease: DISEASE_PRESCRIPTIONS.mustard_alternaria_blight,
    };
  }
  if (cropKey.includes("ফুলকপি") || cropKey.includes("cauliflower")) {
    return {
      cropName: "ফুলকপি",
      cropScientific: "Brassica oleracea var. botrytis",
      disease: DISEASE_PRESCRIPTIONS.cauliflower_black_rot,
    };
  }
  if (cropKey.includes("পেঁপে") || cropKey.includes("papaya")) {
    return {
      cropName: "পেঁপে",
      cropScientific: "Carica papaya",
      disease: DISEASE_PRESCRIPTIONS.papaya_ringspot,
    };
  }
  if (cropKey.includes("কলা") || cropKey.includes("banana")) {
    return {
      cropName: "কলা",
      cropScientific: "Musa acuminata",
      disease: DISEASE_PRESCRIPTIONS.banana_sigatoka,
    };
  }
  if (cropKey.includes("বেগুন") || cropKey.includes("eggplant") || cropKey.includes("brinjal")) {
    return {
      cropName: "বেগুন",
      cropScientific: "Solanum melongena",
      disease: DISEASE_PRESCRIPTIONS.eggplant_borer,
    };
  }
  if (cropKey.includes("ভুট্টা") || cropKey.includes("corn")) {
    return {
      cropName: "ভুট্টা",
      cropScientific: "Zea mays",
      disease: DISEASE_PRESCRIPTIONS.corn_stem_rot,
    };
  }
  if (cropKey.includes("আলু") || cropKey.includes("potato")) {
    return {
      cropName: "আলু",
      cropScientific: "Solanum tuberosum",
      disease: DISEASE_PRESCRIPTIONS.potato_late_blight,
    };
  }
  if (cropKey.includes("টমেটো") || cropKey.includes("tomato")) {
    return {
      cropName: "টমেটো",
      cropScientific: "Solanum lycopersicum",
      disease: DISEASE_PRESCRIPTIONS.tomato_leaf_curl,
    };
  }

  return {
    cropName: "ধান",
    cropScientific: "Oryza sativa",
    disease: DISEASE_PRESCRIPTIONS.rice_blast,
  };
}

/**
 * Call Roboflow Inference API with Base64 Image
 */
export async function queryRoboflow(
  cropHint: string | undefined,
  base64Data: string,
  apiKey: string
): Promise<any | null> {
  try {
    // 1. Determine model endpoint based on cropHint
    let selectedModel = ROBOFLOW_MODELS["ধান"];
    let cropKey = "ধান";

    if (cropHint) {
      const hint = cropHint.toLowerCase();
      if (hint.includes("ফুলকপি") || hint.includes("cauliflower")) {
        selectedModel = ROBOFLOW_MODELS["ফুলকপি"];
        cropKey = "ফুলকপি";
      } else if (hint.includes("সরিষা") || hint.includes("mustard")) {
        selectedModel = ROBOFLOW_MODELS["সরিষা"];
        cropKey = "সরিষা";
      } else if (hint.includes("পেঁপে") || hint.includes("papaya")) {
        selectedModel = ROBOFLOW_MODELS["পেঁপে"];
        cropKey = "পেঁপে";
      } else if (hint.includes("কলা") || hint.includes("banana")) {
        selectedModel = ROBOFLOW_MODELS["কলা"];
        cropKey = "কলা";
      } else if (hint.includes("বেগুন") || hint.includes("eggplant") || hint.includes("brinjal")) {
        selectedModel = ROBOFLOW_MODELS["বেগুন"];
        cropKey = "বেগুন";
      } else if (hint.includes("ভুট্টা") || hint.includes("corn") || hint.includes("maize")) {
        selectedModel = ROBOFLOW_MODELS["ভুট্টা"];
        cropKey = "ভুট্টা";
      } else if (hint.includes("আলু") || hint.includes("potato")) {
        selectedModel = ROBOFLOW_MODELS["আলু"];
        cropKey = "আলু";
      } else if (hint.includes("টমেটো") || hint.includes("tomato")) {
        selectedModel = ROBOFLOW_MODELS["টমেটো"];
        cropKey = "টমেটো";
      } else if (hint.includes("ধান") || hint.includes("rice")) {
        selectedModel = ROBOFLOW_MODELS["ধান"];
        cropKey = "ধান";
      }
    }

    // Helper to request Roboflow
    const callEndpoint = async (endpoint: string): Promise<RoboflowResponse | null> => {
      const roboflowUrl = `https://detect.roboflow.com/${endpoint}?api_key=${apiKey}&confidence=25`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6500);

      try {
        const response = await fetch(roboflowUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: base64Data,
          signal: controller.signal,
        });
        clearTimeout(timeout);

        if (!response.ok) {
          console.warn(`Roboflow returned HTTP ${response.status} for ${endpoint}`);
          return null;
        }

        return (await response.json()) as RoboflowResponse;
      } catch (e: any) {
        clearTimeout(timeout);
        console.warn(`Roboflow fetch attempt failed for ${endpoint}:`, e?.message || e);
        return null;
      }
    };

    let json = await callEndpoint(selectedModel.endpoint);
    let activeEndpoint = selectedModel.endpoint;

    // If initial endpoint failed and a fallback endpoint exists (e.g., secondary papaya endpoint)
    if (!json && selectedModel.fallbackEndpoint) {
      console.log(`Trying fallback endpoint ${selectedModel.fallbackEndpoint}...`);
      json = await callEndpoint(selectedModel.fallbackEndpoint);
      if (json) {
        activeEndpoint = selectedModel.fallbackEndpoint;
      }
    }

    if (!json) {
      return null;
    }

    const predictions = json.predictions || [];

    if (predictions.length > 0) {
      // Find highest confidence prediction
      const topPred = predictions.reduce((prev, current) =>
        prev.confidence > current.confidence ? prev : current
      );

      const mapped = matchRoboflowClassToPrescription(
        cropKey,
        topPred.class,
        topPred.confidence
      );

      const confidencePercent = Math.round((topPred.confidence || 0.85) * 100);

      return {
        isPlant: true,
        cropName: mapped.cropName,
        cropScientific: mapped.cropScientific,
        diseaseName: mapped.disease.diseaseName,
        diseaseScientific: mapped.disease.diseaseScientific,
        severity: mapped.disease.severity,
        confidenceScore: Math.max(80, Math.min(99, confidencePercent)),
        symptomsObserved: mapped.disease.symptomsObserved,
        cause: mapped.disease.cause,
        treatments: mapped.disease.treatments,
        expertNote: mapped.disease.expertNote,
        detectedBox: {
          x: topPred.x,
          y: topPred.y,
          width: topPred.width,
          height: topPred.height,
          label: topPred.class,
        },
        modelProvider: `Roboflow (${activeEndpoint})`,
      };
    }

    // If no bounding box but 200 OK, check if it predicted top classification
    if (json.top) {
      const mapped = matchRoboflowClassToPrescription(
        cropKey,
        json.top,
        json.confidence || 0.88
      );
      return {
        isPlant: true,
        cropName: mapped.cropName,
        cropScientific: mapped.cropScientific,
        diseaseName: mapped.disease.diseaseName,
        diseaseScientific: mapped.disease.diseaseScientific,
        severity: mapped.disease.severity,
        confidenceScore: Math.round((json.confidence || 0.88) * 100),
        symptomsObserved: mapped.disease.symptomsObserved,
        cause: mapped.disease.cause,
        treatments: mapped.disease.treatments,
        expertNote: mapped.disease.expertNote,
        modelProvider: `Roboflow (${activeEndpoint})`,
      };
    }

    return null;
  } catch (err: any) {
    console.warn("Roboflow query notice:", err?.message || err);
    return null;
  }
}
