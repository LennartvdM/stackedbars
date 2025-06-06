// Chart data with simple references
const chartData = {
  leadership: {
    title: "Leiderschap",
    items: [
      { ref: "L1", score: 4 },
      { ref: "L2", score: 2 },
      { ref: "L3", score: 1 },
      { ref: "L4", score: 4 },
      { ref: "L5", score: 2 }
    ]
  },
  hr: {
    title: "HR Management",
    items: [
      { ref: "H1", score: 4 }, { ref: "H2", score: 4 }, { ref: "H3", score: 3 }, { ref: "H4", score: 2 },
      { ref: "H5", score: 4 }, { ref: "H6", score: 3 }, { ref: "H7", score: 4 }, { ref: "H8", score: 4 },
      { ref: "H9", score: 3 }, { ref: "H10", score: 3 }, { ref: "H11", score: 3 }, { ref: "H12", score: 3 },
      { ref: "H13", score: 2 }, { ref: "H14", score: 1 }
    ]
  },
  strategy: {
    title: "Strategie en Management",
    items: [
      { ref: "S1", score: 4 }, { ref: "S2", score: 4 }, { ref: "S3", score: 3 }, { ref: "S4", score: 4 },
      { ref: "S5", score: 4 }, { ref: "S6", score: 3 }, { ref: "S7", score: 3 }, { ref: "S8", score: 4 }
    ]
  },
  knowledge: {
    title: "Kennis en Vaardigheden",
    items: [
      { ref: "K1", score: 3 }, { ref: "K2", score: 3 }, { ref: "K3", score: 3 }, { ref: "K4", score: 3 },
      { ref: "K5", score: 3 }, { ref: "K6", score: 4 }, { ref: "K7", score: 4 }, { ref: "K8", score: 2 }
    ]
  },
  communication: {
    title: "Communicatie",
    items: [
      { ref: "C1", score: 4 }, { ref: "C2", score: 4 }, { ref: "C3", score: 4 }, { ref: "C4", score: 3 }, { ref: "C5", score: 3 }
    ]
  },
  climate: {
    title: "Klimaat",
    items: [
      { ref: "M1", score: 4 }, { ref: "M2", score: 4 }, { ref: "M3", score: 3 }, { ref: "M4", score: 3 }, { ref: "M5", score: 3 }, { ref: "M6", score: 3 }
    ]
  }
};

// Text references
const TEXT_REFS = {
  L1: "De top heeft zich verbonden (is gecommitteerd) aan de doelstellingen en het beleid voor meer mensen met herkomst Buiten-Europa",
  L2: "De top draagt het belang van culturele-diversiteit actief uit",
  L3: "De top stuurt aanwijsbaar op het bereiken van de gewenste resultaten",
  L4: "De top stelt voldoende middelen (financiën, personeel, technologie) ter beschikking om de doelstellingen te kunnen realiseren",
  L5: "De top neemt eindverantwoordelijkheid voor het culturele diversiteitsbeleid",
  H1: "De organisatie zet bewust maatwerkinstrumenten en regelingen in om de doorstroom van mensen met...",
  H2: "Bij de werving van kandidaten voor top- en subtopfuncties wordt doelbewust gestuurd naar culturele diversiteit",
  H3: "Subjectiviteit en stereotypering worden tegengegaan door transparante en objectieve selectieprocedures",
  H4: "Onze arbeidsmarktcommunicatie reflecteert ons streven naar culturele diversiteit",
  H5: "Begeliding van de carrière-ontwikkeling van mensen met herkomst Buiten-Europa door opleiding en management-development",
  H6: "Begeleding van de carrière-ontwikkeling van mensen met herkomst Buiten-Europa door middel van coaching en mentoring",
  H7: "Effectiviteit van onze HR-maatregelen ten behoeve het realiseren van culturele diversiteit wordt gemeten om beleid te kunnen verbeteren",
  H8: "Het aandeel met herkomst Buiten-Europa naar functieniveau en naar afdeling (business unit, team) wordt gemeten (is bekend)",
  H9: "Bij de personeels-/successieplanning wordt doelbewust gestuurd naar het realiseren van culturele diversiteit",
  H10: "Ondersteuning van de carrièreontwikkeling van mensen met herkomst Buiten-Europa door netwerken",
  H11: "Ondersteuning van de carrièreontwikkeling van mensen met herkomst Buiten-Europa door rolmodellen",
  H12: "Ons streven naar meer mensen met herkomst Buiten-Europa in de top is geïntegreerd in al onze diversiteitsbeleid",
  H13: "Door empowerment worden mensen met herkomst Buiten-Europa gestimuleerd tot carrièreontwikkeling vanuit eigen kracht",
  H14: "Ongewenste uitstroom van talentvolle mensen met herkomst Buiten-Europa wordt voorkomen",
  S1: "Culturele diversiteit is een business case voor onze organisatie",
  S2: "De organisatie streeft expliciete doelstellingen voor het aandeel mensen met herkomst Buiten-Europa in de top na",
  S3: "Vastgelegd is hoe deze doelstellingen bereikt gaan worden en op welke termijn",
  S4: "Bedrijfsonderdelen (business units, afdelingen, teams) rapporteren over het realiseren van culturele diversiteitsdoelstellingen",
  S5: "Leidinggevenden worden beoordeeld op het realiseren van culturele diversiteits-doelstellingen b.b.v. de periodieke beoordeling",
  S6: "Wij evalueren met vastgestelde regelmaat (bijvoorbeeld elk kwartaal) de resultaten van ons culturele diversiteitsbeleid",
  S7: "De uitkomsten van evaluaties worden gebruikt om ons culturele diversiteitsbeleid te verbeteren",
  S8: "Wij vergelijken ons culturele diversiteitsbeleid met dat van andere organisaties",
  K1: "Inzicht in bevorderende maatregelen culturele diversiteit",
  K2: "Inzicht in belemmerende maatregelen culturele diversiteit",
  K3: "Leidinggevenden bewust van meerwaarde culturele diversiteit",
  K4: "Leidinggevenden bewust van mechanismen belemmering",
  K5: "Leidinggevenden zetten maatregelen doorstroom in",
  K6: "Gebruik beschikbare kennis en ervaring voor verbetering",
  K7: "MTO gebruiken voor sturen op culturele diversiteit",
  K8: "Organisatie kent vertrekredenen en gebruikt deze voor behoud",
  C1: "Interne communicatie streven aantal mensen met een niet-Westerse migratieachtergrond in hogere functies",
  C2: "Externe communicatie streven mensen met een niet-Westerse migratieachtergrond in hogere functies",
  C3: "Interne communicatie aantal mensen met een niet-Westerse migratieachtergrond in hogere functies",
  C4: "Externe communicatie aantal mensen met een niet-Westerse migratieachtergrond in hogere functies",
  C5: "Mensen met een niet-Westerse migratieachtergrond in hogere functies zichtbaar in woord en beeld",
  M1: "Stereotypen/discriminatie actief bestreden",
  M2: "Inzet van maatregelen investeren culturele diversiteit geaccepteerd",
  M3: "Culturele verschillen in gehele organisatie erkend en gewaardeerd",
  M4: "Aandacht culturele diversiteit leeft",
  M5: "Leidinggevenden verantwoordelijk voor culturele diversiteit",
  M6: "Organisatie gezien als culturele diversiteitsminded"
};

// Resolve text references
function resolveTextReferences(data) {
  const resolved = JSON.parse(JSON.stringify(data));
  
  Object.keys(resolved).forEach(chartKey => {
    resolved[chartKey].items.forEach(item => {
      if (item.ref && TEXT_REFS[item.ref]) {
        item.label = TEXT_REFS[item.ref];
      }
    });
  });
  
  return resolved;
}

export { chartData, TEXT_REFS, resolveTextReferences }; 