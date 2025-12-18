
import { SchemaField } from './types';

export const SECTIONS = [
  "File Information",
  "Address",
  "Scanning",
  "File Status",
  "Resubmission",
  "File Letter Distribution"
];

export const DOCUMENT_OPTIONS = [
  "FIR", "Complaint Letter", "Inquest Report", "Post Morterm", "Death Certificate",
  "Family Certificate", "Aadhar", "Voter", "Ration", "Pan", "Bank Account",
  "NewsPaper Cutting/Photos", "Incident Photos", "Driving License", "Final Report",
  "Charge Sheet", "RFSL Report", "Discharge/Death Summary", "Case Dairy/ Case Sheet",
  "AE Letter", "Metrological Report", "Translated All Documents", "Joint Bank Account",
  "Notorary Affidavit", "RFSL Opinion Report", "Proceeding Copy", "Motor Vehicle Report",
  "Alteration MEMO", "Train Ticket Copy"
];

export const SCHEMA: SchemaField[] = [
  { id: "FILE_ID", header: "FILE ID", type: "TEXT", section: "File Information", description: "Automated and hidden", hidden: true },
  { id: "INTIMATION_NO", header: "INTIMATION NO", type: "NUMBER", section: "File Information", description: "NUMBER" },
  { id: "AGENT_NAME", header: "AGENT NAME", type: "DROPDOWN", section: "File Information", options: ["Chandu", "Srilakshmi", "Gopi", "Durga Rao", "Nandini", "Ramya", "Lavanya"] },
  { id: "REFERENCE", header: "REFERENCE", type: "TEXT", section: "File Information", description: "TEXT" },
  { id: "MID", header: "MID", type: "NUMBER", section: "File Information", description: "8 Digit Number" },
  { id: "DEATH_PERSON_NAME", header: "DEATH PERSON NAME", type: "TEXT", section: "File Information", description: "TEXT" },
  { id: "INTIMATION_BY", header: "INTIMATION BY", type: "TEXT", section: "File Information", description: "TEXT" },
  { id: "INTIMATION_PERSON_PHONE_NUMBER", header: "INTIMATION PERSON PHONE NUMBER", type: "NUMBER", section: "File Information", description: "Phone Number 10 digits" },
  { id: "TYPE_OF_ACCIDENT", header: "TYPE OF ACCIDENT", type: "DROPDOWN", section: "File Information", options: ["Road Accidents", "Animals/Insects Bite", "Drowning", "Slips & Fall From Heights", "Electric Shock", "Thunder Strike", "Industrial Accidents", "Mining Accidents", "Fire Accidents", "Stampede", "Natural Calamities", "Animal Attack", "Train Accidents"] },
  { id: "ACCIDENT_REMARKS", header: "ACCIDENT REMARKS", type: "TEXTAREA", section: "File Information", description: "TEXT AREA" },
  { id: "NOMINEE_NAME", header: "NOMINEE NAME", type: "TEXT", section: "File Information", description: "TEXT" },
  { id: "NOMINEE_RELATION", header: "NOMINEE RELATION", type: "DROPDOWN", section: "File Information", options: ["Father", "Mother", "Brother", "Sister", "Son", "Daughter", "Husband", "Wife", "Grandfather", "Grandmother", "Grandson", "Granddaughter", "Great-grandfather", "Great-grandmother", "Great-grandson", "Great-granddaughter", "Uncle", "Aunt", "Cousin", "Nephew", "Niece", "Father-in-law", "Mother-in-law", "Brother-in-law", "Sister-in-law", "Son-in-law", "Daughter-in-law", "Cousin-in-law"] },
  { id: "NOMINEE_MOBILE", header: "NOMINEE MOBILE", type: "NUMBER", section: "File Information", description: "Phone Number 10 digits" },
  { id: "CONTACT_DETAILS", header: "CONTACT-DETAILS", type: "DYNAMIC_CONTACTS", section: "File Information", description: "Need a Plus Button to add more If wanted with name and Phone number column at the same time" },
  { id: "TICKET_NO", header: "TICKET NO", type: "NUMBER", section: "File Information", description: "6 digit Number" },
  { id: "CID", header: "CID", type: "NUMBER", section: "File Information", description: "5 Digit Number" },
  { id: "FILE_REMARKS", header: "FILE REMARKS", type: "TEXTAREA", section: "File Information", description: "TEXT AREA" },
  
  // Address Section
  { id: "DISTRICT", header: "DISTRICT", type: "DROPDOWN", section: "Address", options: ["Adilabad", "Alluri Sitarama Raju", "Anakapalli", "Anantapur", "Andaman", "Annamayya", "Bapatla", "Bhadradri Kothagudem", "Chittoor", "Dr. B.R. Ambedkar Konaseema", "East Godavari", "Eluru", "Guntur", "Hanmakonda", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhoopalpally", "Jogulamba Gadwal", "Kadapa", "Kakinada", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem Asifabad", "Krishna", "Kurnool", "Mahabubabad", "Mahbubnagar", "Mancherial", "Manyam", "Medak", "Medchal Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Nandyal", "Narayanapet", "Nellore", "Nicobar", "Nirmal", "Nizamabad", "North & Middle Andaman", "NTR", "Palanadu", "Peddapalli", "Prakasam", "Rajanna Sircilla", "Rangareddy", "Sangareddy", "Siddipet", "Sri Satya Sai", "Srikakulam", "Suryapet", "Tirupati", "Vikarabad", "Visakhapatnam", "Vizianagaram", "Wanaparthy", "Warangal", "West Godavari", "Yadadri Bhuvanagiri"] },
  { id: "AC_NAME", header: "CONSTITUENCY", type: "DROPDOWN", section: "Address", options: ["Achampet", "Achanta", "Addanki", "Adilabad", "Adoni", "Alair", "Alampur", "Allagadda", "Alur", "Amadalavalasa", "Amalapuram", "Amberpet", "Anakapalli", "Anantapur Urban", "Anaparthy", "Andaman And Nicobar", "Andole", "Araku Valley", "Armoor", "Asifabad", "Aswaraopet", "Atmakur", "Avanigadda", "Badvel", "Bahadurpura", "Balkonda", "Banaganapalle", "Banswada", "Bapatla", "Bellampalli", "Bhadrachalam", "Bhimavaram", "Bhimili", "Bhongir", "Bhupalpalle", "Boath", "Bobbili", "Bodhan", "Chandragiri", "Chandrayangutta", "Charminar", "Cheepurupalli", "Chennur", "Chevella", "Chilakaluripet", "Chintalapudi", "Chirala", "Chittoor", "Chodavaram", "Choppadandi", "Darsi", "Dendulur", "Devarkadra", "Deverkonda", "Dharmapuri", "Dharmavaram", "Dhone", "Dornakal", "Dubbak", "Elamanchili", "Eluru", "Etcherla", "Gadwal", "Gajapathinagaram", "Gajuwaka", "Gajwel", "Gangadhara Nellore", "Gannavaram (Eg)", "Gannavaram (Krishna)", "Ghanpur", "Giddalur", "Gopalpuram", "Goshamahal", "Gudivada", "Gudur", "Guntakal", "Guntur East", "Guntur West", "Gurzala", "Hindupur", "Husnabad", "Huzurabad", "Huzurnagar", "Ibrahimpatnam", "Ichapuram", "Jadcherla", "Jaggampeta", "Jaggayyapet", "Jagtial", "Jammalamadugu", "Jangaon", "Jubilee Hills", "Jukkal", "Kadapa", "Kadiri", "Kaikalur", "Kakinada City", "Kakinada Rural", "Kalwakurthi", "Kalyandurg", "Kamalapuram", "Kamareddy", "Kandukur", "Kanigiri", "Karimnagar", "Karwan", "Kavali", "Khairatabad", "Khammam", "Khanapur", "Kodad", "Kodangal", "Kodumur", "Kodur", "Kollapur", "Kondepi", "Koratla", "Kothagudem", "Kothapeta", "Kovur", "Kovvur", "Kukatpally", "Kuppam", "Kurnool", "Kurupam", "Lal Bahadur Nagar", "Macherla", "Machilipatnam", "Madakasira", "Madanpalle", "Madhira", "Madugula", "Mahbubabad", "Mahbubnagar", "Maheswaram", "Makthal", "Malakpet", "Malkajgiri", "Manakondur", "Mancherial", "Mandapeta", "Mangalagiri", "Manthani", "Mantralayam", "Markapur", "Medak", "Medchal", "Miryalguda", "Mudhole", "Mulug", "Mummidivaram", "Mungode", "Musheerabad", "Mydukur", "Mylavaram", "Nagari", "Nagarjuna Sagar", "Nagarkurnool", "Nakrekal", "Nalgonda", "Nampally", "Nandigama", "Nandikotkur", "Nandyal", "Narasannapeta", "Narasapur", "Narasaraopet", "Narayankhed", "Narayanpet", "Narsampet", "Narsapur", "Narsipatnam", "Nellimarla", "Nellore City", "Nellore Rural", "Nidadavole", "Nirmal", "Nizamabad Rural", "Nizamabad Urban", "Nuzvid", "Ongole", "Paderu", "Palacole", "Palair", "Palakonda", "Palakurthi", "Palamaner", "Palasa", "Pamarru", "Panyam", "Parchur", "Pargi", "Parkal", "Parvathipuram", "Patancheru", "Pathapatnam", "Pattikonda", "Payakaraopeta", "Pedana", "Peddakurapadu", "Peddapalli", "Peddapuram", "Penamaluru", "Pendurthi", "Penukonda", "Pileru", "Pinapaka", "Pithapuram", "Polavaram", "Ponnur", "Prathipad", "Prathipadu", "Proddatur", "Pulivendla", "Punganur", "Puthalapattu", "Puttaparthi", "Quthbullapur", "Rajahmundry City", "Rajahmundry Rural", "Rajam", "Rajampet", "Rajanagaram", "Rajendranagar", "Ramachandrapuram", "Ramagundam", "Rampachodavaram", "Raptadu", "Rayachoty", "Rayadurg", "Razole", "Repalle", "Salur", "Sanathnagar", "Sangareddy", "Santhanuthalapadu", "Sarvepalli", "Sathupalli", "Sattenapalli", "Satyavedu", "Secunderabad", "Secunderabad Cantonment", "Serlingampally", "Shadnagar", "Siddipet", "Singanamala", "Sircilla", "Sirpur", "Srikakulam", "Srikalahasti", "Srisailam", "Srungavarapukota", "Sullurpet", "Suryapet", "Tadepalligudem", "Tadikonda", "Tadpatri", "Tandur", "Tanuku", "Tekkali", "Tenali", "Thamballapalle", "Tirupati", "Tiruvuru", "Tungaturthi", "Tuni", "Udayagiri", "Undi", "Unguturu", "Uppal", "Uravakonda", "Vemulawada", "Vemuru", "Venkatagiri", "Vijayawada Central", "Vijayawada East", "Vijayawada West", "Vikarabad", "Vinukonda", "Visakhapatnam East", "Visakhapatnam North", "Visakhapatnam South", "Visakhapatnam West", "Vizianagaram", "Wanaparthy", "Warangal East", "Warangal West", "Wardhannapet", "Wyra", "Yakutpura", "Yellandu", "Yellareddy", "Yemmiganur", "Yerragondapalem", "Zahirabad"] },
  { id: "MANDAL_NAME", header: "MANDAL", type: "TEXT", section: "Address", description: "TEXT" },
  { id: "VILLAGE_NAME", header: "VILLAGE", type: "TEXT", section: "Address", description: "TEXT" },
  { id: "DOOR_NO", header: "H No", type: "TEXT", section: "Address", description: "TEXT" },
  { id: "ADD_REMARKS", header: "ADDRESS REMARKS", type: "TEXTAREA", section: "Address", description: "TEXT AREA" },
  
  // Scanning Section
  { id: "FILE_NO", header: "FILE NO", type: "NUMBER", section: "Scanning", description: "NUMBER" },
  { id: "SCANNED_DATE", header: "SCANNED DATE", type: "DATETIME", section: "Scanning", description: "DATE & TIME" },
  { id: "SCANNING_REMARKS", header: "SCANNING REMARKS", type: "TEXTAREA", section: "Scanning", description: "TEXT AREA" },
  
  // File Status Section
  { id: "FILE_STATUS", header: "FILE STATUS", type: "DROPDOWN", section: "File Status", options: ["Waiting For Documents", "Documents Submitted In Party", "Forwarded to Insurance", "Closed at Insurance", "Closed at Party", "Approved - Compensated", "Closed Letters", "Account Rejected"] },
  { id: "FWD_DATE", header: "FWD DATE", type: "DATE", section: "File Status", description: "DATE" },
  { id: "UTR_DATE", header: "UTR DATE", type: "DATE", section: "File Status", description: "DATE" },
  { id: "UTR_NO", header: "UTR NO", type: "TEXT", section: "File Status", description: "TEXT" },
  { id: "FILE_STATUS_REMARKS", header: "FILE STATUS REMARKS", type: "TEXTAREA", section: "File Status", description: "TEXT AREA" },
  
  // Resubmission Section
  { id: "RESUBMISSION_REQ_DOCS", header: "RESUBMISSION REQ DOCS", type: "MULTISELECT", section: "Resubmission", options: DOCUMENT_OPTIONS },
  { id: "RESUBMISSION_TYPE", header: "RESUBMISSION TYPE", type: "DROPDOWN", section: "Resubmission", options: ["Insurance", "Party"] },
  { id: "RESUBMISSION_DOCS_RECEIVED", header: "RESUBMISSION DOCS RECEIVED", type: "MULTISELECT", section: "Resubmission", options: DOCUMENT_OPTIONS },
  { id: "RESUBMISSION_INFORMATION", header: "RESUBMISSION INFORMED", type: "DYNAMIC_CONTACTS", section: "Resubmission", description: "Need a Plus Button to add more If wanted with name and Phone number and date picker column at the same time" },
  { id: "RESUBMISSION_STATUS", header: "RESUBMISSION STATUS", type: "DROPDOWN", section: "Resubmission", options: ["Submitted", "Pending"] },
  { id: "RESUBMISSION_DATE", header: "RESUBMISSION DATE", type: "DATE", section: "Resubmission", description: "DATE" },
  { id: "RESUBMISSION_FWD_DATE", header: "RESUBMISSION FWD DATE", type: "DATE", section: "Resubmission", description: "DATE" },
  { id: "RESUBMISSION_REMARKS", header: "RESUBMISSION REMARKS", type: "TEXTAREA", section: "Resubmission", description: "TEXT AREA" },
  
  // File Letter Distribution Section
  { id: "LTR_DATE", header: "LETTER SENT DATE", type: "DATE", section: "File Letter Distribution", description: "DATE" },
  { id: "LTR_DISTRIBUTED_DATE", header: "LETTER DISTRIBUTED DATE", type: "DATE", section: "File Letter Distribution", description: "DATE" },
  { id: "LTR_STATUS", header: "LETTER DISTRIBUTED", type: "DROPDOWN", section: "File Letter Distribution", options: ["Mla/Aci", "Mp", "Ppp", "Mpp", "Cluster", "Unit", "Chairmens", "Others"] },
  { id: "LTR_BY", header: "DISTRIBUTED LEADER NAME", type: "TEXT", section: "File Letter Distribution", description: "TEXT" },
  { id: "LTR_LINK1", header: "PHOTO LINK", type: "LINK", section: "File Letter Distribution", description: "LINK" },
  { id: "LTR_LINK2", header: "TESTIMONY VIDEO", type: "LINK", section: "File Letter Distribution", description: "LINK" },
  { id: "LTR_REMARKS", header: "LETTERS REMARKS", type: "TEXTAREA", section: "File Letter Distribution", description: "TEXT AREA" }
];
