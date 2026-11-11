// ============================================================
// lib/studiesData.js
// 10 REAL digital forensics case studies.
// All content is from public, authoritative sources.
// No API, no keys, fully static.
// ============================================================

export const STUDIES = [
  {
    id: "silk-road",
    title: "Silk Road Takedown",
    year: "2013",
    type: "Dark Web Marketplace / Cryptocurrency",
    summary:
      "Ross Ulbricht operated Silk Road, the largest darknet marketplace, under the pseudonym 'Dread Pirate Roberts.' Investigators identified him through a series of operational security mistakes, including linking the alias 'altoid' to his personal email and posting on Stack Overflow under his real name. In October 2013, undercover agents observed Ulbricht accessing Silk Road's admin panel in a public library, arresting him with his laptop open and unencrypted [citation:3][citation:13].",
    keyEvidence: [
      "Unencrypted laptop seized while logged into the Silk Road admin panel",
      "Tor browser history and configuration files",
      "Bitcoin wallet records and private keys on the device",
      "Forum posts linking alias 'altoid' to Ulbricht's personal email",
      "Stack Overflow posts under his real name",
    ],
    lesson:
      "Anonymity tools like Tor and Bitcoin are not foolproof. Timing matters — catching a suspect while logged into an unencrypted session can yield decisive evidence. Blockchain records on a physical device can connect a person to illegal activity [citation:3].",
    source: "FBI Artifact Record; Belkasoft Lessons Learned from Silk Road Investigation",
    sourceUrl: "https://www.fbi.gov/history/artifacts/ross-william-ulbrichts-laptop",
  },
  {
    id: "btk-floppy",
    title: "BTK Killer — Floppy Disk Metadata",
    year: "2005",
    type: "Serial Murder / Metadata Forensics",
    summary:
      "Dennis Rader, the BTK Killer, terrorized Kansas for decades and murdered ten victims. In 2004 he resurfaced and taunted police, eventually asking whether a floppy disk could be traced. Police lied and said no. Rader sent a purple floppy disk to a local TV station. Forensic analysis of the metadata on a deleted Word document revealed the last user as 'Dennis' and the registered organization as 'Christ Lutheran Church.' A simple Google search identified Dennis Rader as the church council president [citation:4][citation:14].",
    keyEvidence: [
      "Floppy disk sent by the killer to a TV station",
      "Deleted Word document with intact metadata",
      "Last-modified user: 'Dennis'",
      "Registered organization: 'Christ Lutheran Church'",
    ],
    lesson:
      "File metadata (author, organization, last-modified user) survives deletion and is often overlooked by criminals. Never assume a wiped disk is clean — metadata can be a direct fingerprint [citation:4].",
    source: "eDiscovery 101: Metadata (Parcels, Inc.); WatchMojo",
    sourceUrl: "https://parcelsinc.com/ediscovery-101-metadata/",
  },
  {
    id: "sony-hack",
    title: "Sony Pictures Hack",
    year: "2014",
    type: "Destructive Cyberattack / Attribution",
    summary:
      "Sony Pictures Entertainment suffered a devastating cyberattack that wiped data and leaked confidential information. The FBI attributed the attack to North Korea, citing reused code from previous attacks associated with the regime, similarities in the networks used to launch attacks, and Korean-language artifacts in the code. Security expert Bruce Schneier publicly expressed skepticism, noting the evidence was circumstantial and could be faked or misinterpreted [citation:5].",
    keyEvidence: [
      "Reused attack code linked to prior North Korea-associated incidents",
      "Network infrastructure overlap with previous attacks",
      "Korean language strings in malware code",
      "Destructive wiper malware",
    ],
    lesson:
      "Attribution is hard. Code reuse and infrastructure overlap are circumstantial evidence at best — they can be faked or misread. A rigorous forensic analyst must distinguish between what the evidence proves and what the narrative wants it to prove [citation:5].",
    source: "Schneier on Security — 'Did North Korea Really Attack Sony?'",
    sourceUrl: "https://www.schneier.com/blog/archives/2014/",
  },
  {
    id: "mirai-botnet",
    title: "Mirai Botnet Infrastructure",
    year: "2016–2019",
    type: "IoT Botnet / DDoS Infrastructure",
    summary:
      "The Mirai botnet infected IoT devices and was used for massive DDoS attacks. A Dutch court convicted a defendant for facilitating Mirai botnet infrastructure between 2018 and 2019, providing servers and IP addresses to cybercriminals. The court noted that a Mirai botnet had once taken down a major European web hosting provider for a week, affecting 18 million applications for over one million customers with millions in damages [citation:6].",
    keyEvidence: [
      "Servers and IP addresses provided to botnet operators",
      "At least three confirmed automated systems breached",
      "Indications of many more compromised systems",
      "Downstream ransomware attacks enabled by the infrastructure",
    ],
    lesson:
      "Infrastructure providers can be criminally liable even if they don't launch the attacks themselves. Forensic investigation of botnet cases must trace the chain from infected devices through command-and-control infrastructure to the people who facilitate it [citation:6].",
    source: "Rechtspraak (Dutch Judiciary) — ECLI:NL:RBROT:2025:2515",
    sourceUrl: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBROT:2025:2515",
  },
  {
    id: "target-breach",
    title: "Target Data Breach — HVAC Supply Chain",
    year: "2013",
    type: "Retail Data Breach / Supply Chain Attack",
    summary:
      "Target suffered a massive data breach compromising 40 million card numbers. Attackers gained entry through credentials stolen from Fazio Mechanical Services, an HVAC subcontractor with network access to Target's systems. The breach exposed the danger of third-party vendor access and the gap between PCI compliance certification and actual security posture [citation:7].",
    keyEvidence: [
      "Credentials stolen from HVAC subcontractor Fazio Mechanical",
      "Lateral movement from vendor network into payment systems",
      "POS malware exfiltrating card data",
      "PCI compliance was certified but later disputed by forensic investigators",
    ],
    lesson:
      "The weakest link is often a third-party vendor. Forensic scope must include supply chain access paths, not just the victim's own perimeter. Compliance certificates are not evidence of security [citation:7].",
    source: "Orion Security — Target Data Breach Analysis; Krebs on Security",
    sourceUrl: "https://www.orionsec.io/blog/target-data-breach-pos-malware",
  },
  {
    id: "colonial-pipeline",
    title: "Colonial Pipeline Ransomware",
    year: "2021",
    type: "Critical Infrastructure / Ransomware",
    summary:
      "Colonial Pipeline suffered a ransomware attack by the DarkSide group, disrupting fuel supply across the U.S. East Coast. The company paid 75 Bitcoin (approximately $4.4 million). The FBI traced multiple transfers through the Bitcoin public ledger, identified the hackers' wallet, and seized 63.7 Bitcoin (nearly $2.3 million) with a warrant. Officials obtained the private key to the wallet, though they did not explain how [citation:8].",
    keyEvidence: [
      "Bitcoin public ledger transaction records",
      "Wallet tracing across multiple transfers",
      "Seized private key enabling fund recovery",
      "Unprotected VPN account as initial access vector",
    ],
    lesson:
      "Blockchain is not anonymous — it is pseudonymous and permanently auditable. Law enforcement can trace ransom payments through the public ledger and, in some cases, seize the funds. Ransomware forensics must include cryptocurrency analysis [citation:8].",
    source: "CyberSecurity Help / U.S. Department of Justice",
    sourceUrl: "https://www.cybersecurity-help.cz/blog/2157.html",
  },
  {
    id: "stuxnet",
    title: "Stuxnet",
    year: "2010",
    type: "Industrial Control System Sabotage",
    summary:
      "Stuxnet was a sophisticated worm targeting Siemens SCADA systems, widely attributed to a U.S.-Israeli operation against Iran's Natanz nuclear facility. The malware contained a kill date (halting after June 24, 2012) and would not affect systems that did not have the specific target configuration — if it didn't find the right files, it would not affect the host and might even delete itself. Forensics on the related Duqu worm revealed shared provenance in a driver compiled in January 2008 [citation:9].",
    keyEvidence: [
      "Embedded target configuration requirements",
      "Self-limiting kill date and infection windows",
      "Shared code provenance with Duqu malware",
      "Siemens SCADA system targeting",
    ],
    lesson:
      "The malware's targeting logic is itself evidence. Stuxnet's self-deleting behavior on non-target systems shows deliberate precision — the attackers knew exactly what they were after. Reverse-engineering what malware does NOT do can be as revealing as what it does [citation:9].",
    source: "Taylor & Francis Online — 'Stuxnet and the Limits of Cyber Warfare'",
    sourceUrl: "https://www.tandfonline.com/doi/pdf/10.1080/09636412.2013.816122",
  },
  {
    id: "ashley-madison",
    title: "Ashley Madison Data Breach",
    year: "2015",
    type: "Data Theft / Leak",
    summary:
      "Ashley Madison, a website for extramarital affairs, suffered a breach in July 2015. The hacker group 'Impact Team' released approximately 20 gigabytes of stolen data, roughly double the size of an earlier dump, including emails linked to the site's founder and CEO Noel Biderman. Security consultant David Kennedy confirmed the data appeared legitimate. The breach exposed millions of members and raised national security concerns when military email addresses were found in the data [citation:10].",
    keyEvidence: [
      "Stolen user database and internal emails",
      "Two separate data dumps totaling ~30 GB",
      "Emails linked to CEO Noel Biderman",
      "Military and government email addresses in the leaked data",
    ],
    lesson:
      "Data breaches can have cascading consequences beyond the immediate victims — national security, military personnel, and public figures can be exposed. Forensic validation of leaked data authenticity is critical before drawing conclusions [citation:10].",
    source: "Australian Broadcasting Corporation (ABC News)",
    sourceUrl: "https://www.abc.net.au/news/2015-08-21/more-ashley-madison-affair-website-data-leaked-online/6713524",
  },
  {
    id: "nist-data-leakage",
    title: "NIST Data Leakage Case",
    year: "2015",
    type: "Insider Threat / Data Exfiltration",
    summary:
      "The NIST CFReDS Data Leakage Case is a single-actor insider threat investigation. A NIST employee identified as 'Iaman Informant' systematically exfiltrated classified 'Secret Project Data' from a secured network share to removable media and cloud storage over a multi-month period (December 2014 – March 2015), while simultaneously researching anti-forensic techniques to cover their tracks. The case includes PC disk images, USB images, and a CD-R image, with a published answer key of 60 detailed questions .",
    keyEvidence: [
      "Network share source: \\10.11.11.128\\SECURED_DRIVE",
      "Exfiltration via USB (RM1, RM2), CD-R (RM3), and cloud (Google Drive, iCloud)",
      "Anti-forensic tool usage: Eraser, CCleaner",
      "900+ search queries showing premeditation",
      "Google Drive Sync active after anti-forensic cleanup",
      "Resignation letter correlated with cleanup session",
    ],
    lesson:
      "Anti-forensic behavior itself becomes evidence. The suspect's searches for wiping tools, the timing of cleanup sessions relative to resignation, and the fact that cloud sync ran after local wiping — these are all forensic artifacts. Deleted data can be reconstructed; the attempt to destroy it leaves its own trail .",
    source: "NIST CFReDS (Computer Forensic Reference Data Sets)",
    sourceUrl: "https://cfreds.nist.gov/",
  },
  {
    id: "szechuan-sauce",
    title: "The Stolen Szechuan Sauce (DFIR Madness)",
    year: "2020",
    type: "Intellectual Property Theft / Full DFIR Investigation",
    summary:
      "A DFIR Madness training case: a proprietary recipe file was stolen and listed for sale on the dark web. Investigators received disk images of a domain controller and desktop, a PCAP, and memory dumps. The attack chain was reconstructed from initial RDP brute-force entry (312 failed logon attempts from 194.61.24.102), to malware delivery (coreupdater.exe / Metasploit payload), to lateral movement and data exfiltration. The case is widely used as a benchmark for DFIR tool testing and training [citation:1][citation:11].",
    keyEvidence: [
      "312 failed RDP logon events (EID 4625) from 194.61.24.102",
      "Successful logon at 02:21:46 UTC",
      "coreupdater.exe malware identified across 4 independent sources",
      "RWX injection into spoolsv.exe confirming Meterpreter migration",
      "Registry persistence key: ControlSet001\\Services\\coreupdater",
      "File access in C:\\FileShare\\Secret directory",
    ],
    lesson:
      "A complete attack chain leaves artifacts at every stage: brute-force attempts in event logs, malware on disk, memory injection, registry persistence, and file access records. Correlating across disk, memory, and network is essential — no single source tells the whole story [citation:1][citation:11].",
    source: "DFIR Madness — The Stolen Szechuan Sauce; GitHub forensic analyses",
    sourceUrl: "https://dfirmadness.com/the-stolen-szechuan-sauce/",
  },
];

// Helper: get a single study by id
export function getStudy(id) {
  return STUDIES.find((s) => s.id === id) || null;
}

// Helper: get all study ids for static generation
export function getAllStudyIds() {
  return STUDIES.map((s) => ({ slug: s.id }));
}