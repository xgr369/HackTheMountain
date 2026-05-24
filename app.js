const DOMAIN_URL = "http://172.22.96.1:999";

// ─────────────────────────────────────────────
//  Genre Config
// ─────────────────────────────────────────────
const genreColors = {
  "Hip-Hop":    "#d97706",
  "Jazz/Blues": "#7c3aed",
  "Indie/Alt":  "#db2777",
  "Electronic": "#0891b2",
  "Classical":  "#059669",
  "Folk/World": "#ea580c",
  "Pop":        "#2563eb",
  "Rock":       "#dc2626"
};

// ─────────────────────────────────────────────
//  Neighbourhood Meta (for the Artist Finder)
//  population: thousands of residents
//  footTraffic: 1=low 2=medium 3=high
//  venueQuality: 1=few/small 2=decent 3=excellent
//  parkAccess: 1=limited 2=some 3=great
//  streetFriendly: 1=limited 2=decent 3=strong culture
//  vibeScore: 1-10 arts/music scene richness
// ─────────────────────────────────────────────
const neighbourhoodMeta = {
  "Rivière-des-Prairies–Pointe-aux-Trembles": {
    population: 105, footTraffic: 1, venueQuality: 1, parkAccess: 2, streetFriendly: 1, vibeScore: 2,
    character: "Suburban waterfront community — tight-knit local events",
    hotspots: {
      street:       ["Rue Sherbrooke Est near Pointe-aux-Trembles market", "Ave Rodolphe-Forget pedestrian strip"],
      park:         ["Parc-nature de la Pointe-aux-Prairies", "Bord-de-l'eau waterfront path"],
      bar_cafe:     ["Local brasseries along Sherbrooke Est"],
      concert_hall: ["Maison de la culture PAT, 12370 rue Notre-Dame Est"],
      community:    ["Centre culturel de Pointe-aux-Trembles, 14001 rue Notre-Dame Est"],
      festival:     ["Bord-de-l'eau waterfront park — summer events"]
    }
  },
  "Montréal-Est / Anjou": {
    population: 70, footTraffic: 1, venueQuality: 1, parkAccess: 1, streetFriendly: 1, vibeScore: 2,
    character: "Industrial east-end — local community halls and arena events",
    hotspots: {
      street:       ["Rue Sherbrooke Est commercial strip", "Carrefour Anjou entrance area"],
      park:         ["Parc Jean-Duceppe", "Parc du Boisé-du-Tremblay"],
      bar_cafe:     ["Brasseries along rue Sherbrooke Est"],
      concert_hall: ["Centre culturel d'Anjou, 7500 blvd des Galeries-d'Anjou"],
      community:    ["Centre culturel d'Anjou, 7500 blvd des Galeries-d'Anjou"],
      festival:     ["Carrefour Anjou outdoor plaza"]
    }
  },
  "Saint-Léonard": {
    population: 75, footTraffic: 2, venueQuality: 1, parkAccess: 1, streetFriendly: 2, vibeScore: 3,
    character: "Dense commercial strips — diverse Latin & Caribbean audience",
    hotspots: {
      street:       ["Jean-Talon Est & Viau intersection", "Lacordaire & Jean-Talon commercial strip"],
      park:         ["Parc Wilfrid-Bastien", "Parc de la Coulée-Verte"],
      bar_cafe:     ["Italian cafés along Bélanger Est", "Latin restaurants on Jean-Talon Est"],
      concert_hall: ["Maison de la culture Saint-Léonard, 5255 rue Jarry Est"],
      community:    ["Maison de la culture Saint-Léonard, 5255 rue Jarry Est"],
      festival:     ["Jean-Talon Est summer market area"]
    }
  },
  "Montréal-Nord": {
    population: 83, footTraffic: 2, venueQuality: 1, parkAccess: 2, streetFriendly: 2, vibeScore: 4,
    character: "Vibrant north — Caribbean & African community events, strong hip-hop scene",
    hotspots: {
      street:       ["Blvd Henri-Bourassa Est & Pie-IX", "Rue Fleury Est commercial strip"],
      park:         ["Parc Aimé-Léonard", "Parc Henri-Bourassa"],
      bar_cafe:     ["Haitian restaurants on Henri-Bourassa", "Bars on Pie-IX Blvd"],
      concert_hall: ["Maison de la culture Montréal-Nord, 12144 rue Prieur Est"],
      community:    ["Maison de la culture Montréal-Nord, 12144 rue Prieur Est"],
      festival:     ["Parc Aimé-Léonard — summer neighbourhood festivals"]
    }
  },
  "Ahuntsic-Cartierville": {
    population: 135, footTraffic: 2, venueQuality: 2, parkAccess: 3, streetFriendly: 2, vibeScore: 5,
    character: "Residential north — riverfront parks, maisons de la culture",
    hotspots: {
      street:       ["Rue Fleury Ouest between Lajeunesse & St-Denis", "Cartierville plaza area"],
      park:         ["Parc-nature de l'Île-de-la-Visitation", "Bord-de-la-Rivière-des-Prairies path"],
      bar_cafe:     ["Cafés and bars on rue Fleury Ouest", "Terrasse Ahuntsic"],
      concert_hall: ["Maison de la culture Ahuntsic, 10300 rue Lajeunesse"],
      community:    ["Maison de la culture Ahuntsic, 10300 rue Lajeunesse"],
      festival:     ["Parc-nature de l'Île-de-la-Visitation — summer concerts"]
    }
  },
  "Villeray–Saint-Michel–Parc-Extension": {
    population: 145, footTraffic: 2, venueQuality: 2, parkAccess: 2, streetFriendly: 3, vibeScore: 6,
    character: "Ultra-diverse — Bengali, Haitian, Moroccan street culture on Jarry & Jean-Talon",
    hotspots: {
      street:       ["Jean-Talon Ouest at Parc-Extension (Mile-Ex border)", "Rue Jarry & Lajeunesse intersection"],
      park:         ["Parc Jarry — massive outdoor park & stage", "Parc du Pélican"],
      bar_cafe:     ["Café Cleopatra strip", "Villeray bar scene on Jarry"],
      concert_hall: ["Maison de la culture Villeray, 1425 rue Jarry Est"],
      community:    ["Maison de la culture Villeray, 1425 rue Jarry Est"],
      festival:     ["Parc Jarry — Mural, Jazz Fest, major outdoor festivals"]
    }
  },
  "Rosemont–La Petite-Patrie": {
    population: 137, footTraffic: 3, venueQuality: 2, parkAccess: 2, streetFriendly: 3, vibeScore: 8,
    character: "Hip & creative — buzzing with live music bars, record shops, art studios",
    hotspots: {
      street:       ["Ave du Mont-Royal Est & St-Denis", "Rue Masson & 2nd Ave strip"],
      park:         ["Parc Maisonneuve & Olympic Stadium esplanade", "Parc Molson"],
      bar_cafe:     ["Quai des Brumes, 4481 rue St-Denis", "Le Ministère, 4521 rue St-Denis"],
      concert_hall: ["Théâtre Fairmount, 5240 ave du Parc"],
      community:    ["Maison de la culture Rosemont, 6707 ave de Lorimier"],
      festival:     ["Parc Maisonneuve — Piknic Électronik, outdoor festivals"]
    }
  },
  "Outremont": {
    population: 25, footTraffic: 2, venueQuality: 3, parkAccess: 2, streetFriendly: 1, vibeScore: 7,
    character: "Affluent cultural enclave — refined concert halls, classical & opera tradition",
    hotspots: {
      street:       ["Ave Bernard & Hutchison (café terrasse strip)"],
      park:         ["Parc du Mont-Royal access via Camillien-Houde"],
      bar_cafe:     ["Ave Bernard wine bars and cafés"],
      concert_hall: ["Théâtre Outremont, 1248 ave Bernard Ouest", "Rialto Theatre, 5723 ave du Parc"],
      community:    ["Maison de la culture Côte-des-Neiges, 5290 ch de la Côte-des-Neiges"],
      festival:     ["Ave Bernard summer festival strip"]
    }
  },
  "Le Plateau-Mont-Royal": {
    population: 100, footTraffic: 3, venueQuality: 3, parkAccess: 2, streetFriendly: 3, vibeScore: 10,
    character: "Montréal's bohemian heart — highest concentration of live music venues in the city",
    hotspots: {
      street:       ["St-Denis & Mont-Royal Ave (most famous busking corner)", "Blvd St-Laurent & Rachel (the Main)"],
      park:         ["Parc Lafontaine (outdoor stage + amphitheatre)", "Carré Saint-Louis fountain plaza"],
      bar_cafe:     ["Casa del Popolo, 4873 blvd St-Laurent", "L'Escogriffe, 4461 rue St-Denis", "Sala Rossa, 4848 blvd St-Laurent"],
      concert_hall: ["Sala Rossa, 4848 blvd St-Laurent", "Foufounes Électriques, 87 rue Ste-Catherine Est"],
      community:    ["Maison de la culture du Plateau, 465 ave du Mont-Royal Est"],
      festival:     ["Parc Lafontaine — Jazz Fest, Fringe, Osheaga (shuttle hub)"]
    }
  },
  "Saint-Laurent": {
    population: 98, footTraffic: 2, venueQuality: 2, parkAccess: 2, streetFriendly: 1, vibeScore: 5,
    character: "Industrial-creative corridor — electronic clubs, production studios",
    hotspots: {
      street:       ["Blvd Marcel-Laurin commercial strip", "Place Vertu mall entrance"],
      park:         ["Parc Basile-Routhier", "Parc du Centenaire"],
      bar_cafe:     ["Club Soda, 1225 blvd St-Laurent", "L'Astral, 305 rue Ste-Catherine Ouest"],
      concert_hall: ["Studio TD (Métropolis), 59 rue Ste-Catherine Est", "L'Astral, 305 rue Ste-Catherine Ouest"],
      community:    ["Maison de la culture St-Laurent, 1440 rue Fleury Ouest"],
      festival:     ["Parc du Centenaire — local summer events"]
    }
  },
  "Mont-Royal (TMR)": {
    population: 20, footTraffic: 1, venueQuality: 2, parkAccess: 2, streetFriendly: 1, vibeScore: 4,
    character: "Small affluent enclave — local concert series, private and community events",
    hotspots: {
      street:       ["Ave Victoria commercial strip"],
      park:         ["Parc du Centenaire TMR", "Belvédère Camillien-Houde"],
      bar_cafe:     ["Ave Victoria café terrasses"],
      concert_hall: ["Salle Marguerite-Bourgeoys, 2900 blvd Édouard-Montpetit"],
      community:    ["Maison de la culture TMR, 2900 blvd Édouard-Montpetit"],
      festival:     ["Parc du Centenaire TMR — summer festival"]
    }
  },
  "Côte-des-Neiges–NDG": {
    population: 167, footTraffic: 3, venueQuality: 2, parkAccess: 3, streetFriendly: 2, vibeScore: 7,
    character: "Montréal's most diverse borough — university crowd, Mount Royal & Oratory access",
    hotspots: {
      street:       ["Queen Mary & Côte-des-Neiges intersection (student hub)", "Monkland Ave in NDG"],
      park:         ["Parc du Mont-Royal summit & lower slopes", "Parc Angrignon (accessible via trail)"],
      bar_cafe:     ["Café Resonance, 5175A ave du Parc", "The Burgundy Lion, 2496 rue Notre-Dame Ouest", "Darling Foundry café"],
      concert_hall: ["Théâtre Déjà Vu, 3555 rue St-Denis", "Salle Claude-Champagne, 200 ave Vincent-d'Indy (Université de Montréal)"],
      community:    ["Maison de la culture Côte-des-Neiges, 5290 ch de la Côte-des-Neiges"],
      festival:     ["Parc du Mont-Royal — Tam-tams (Sunday drumming), summer picnics"]
    }
  },
  "Ville-Marie (Downtown)": {
    population: 80, footTraffic: 3, venueQuality: 3, parkAccess: 2, streetFriendly: 3, vibeScore: 9,
    character: "Downtown core — Place des Arts, Bell Centre, maximum foot traffic year-round",
    hotspots: {
      street:       ["Rue Ste-Catherine & Peel (busiest pedestrian corner)", "Place des Arts esplanade", "Vieux-Port waterfront promenade"],
      park:         ["Place des Arts outdoor amphitheatre", "Quartier des spectacles plaza", "Vieux-Port quays"],
      bar_cafe:     ["Le Belmont, 4483 blvd St-Laurent", "Club Soda, 1225 blvd St-Laurent", "Cabaret Lion d'Or, 1676 rue Ontario Est"],
      concert_hall: ["Place des Arts (Grande Salle, Théâtre Maisonneuve)", "Bell Centre, 1909 ave des Canadiens-de-Montréal", "Théâtre du Nouveau Monde, 84 rue Ste-Catherine Ouest"],
      community:    ["Maison de la culture Frontenac, 2550 rue Ontario Est"],
      festival:     ["Quartier des spectacles — Jazz Fest, Francofolies, Mural main stages"]
    }
  },
  "Mercier–Hochelaga-Maisonneuve": {
    population: 180, footTraffic: 2, venueQuality: 2, parkAccess: 2, streetFriendly: 2, vibeScore: 7,
    character: "Gritty & authentic — growing arts scene, working-class music culture, rock venues",
    hotspots: {
      street:       ["Rue Ontario Est & Préfontaine (HoMa main strip)", "Ave Papineau & Ste-Catherine Est"],
      park:         ["Parc Maisonneuve & Olympic Stadium esplanade", "Parc Morgan"],
      bar_cafe:     ["O Patro Vys, 356 ave du Mont-Royal Est", "La Tulipe, 4530 ave Papineau"],
      concert_hall: ["Théâtre Corona, 2490 rue Notre-Dame Ouest", "La Tulipe, 4530 ave Papineau"],
      community:    ["Maison de la culture Maisonneuve, 4200 rue Ontario Est"],
      festival:     ["Parc Maisonneuve — Piknic Électronik overflow, local festivals"]
    }
  },
  "Le Sud-Ouest": {
    population: 75, footTraffic: 2, venueQuality: 2, parkAccess: 2, streetFriendly: 2, vibeScore: 7,
    character: "Griffintown & Pointe-St-Charles — gentrifying, indie venues, canal cycling path",
    hotspots: {
      street:       ["Rue Notre-Dame Ouest & Atwater (Griffintown)", "Rue Wellington in Verdun/Pointe-St-Charles"],
      park:         ["Canal de Lachine cycling & walking path", "Parc du Canal"],
      bar_cafe:     ["Foufounes Électriques, 87 rue Ste-Catherine Est", "Taverne Normand, 82 rue Atwater", "Dominion Square Tavern"],
      concert_hall: ["Théâtre Corona, 2490 rue Notre-Dame Ouest"],
      community:    ["Bain Mathieu, 2915 rue Ontario Est"],
      festival:     ["Canal de Lachine — summer outdoor events, Piknic Électronik"]
    }
  },
  "Verdun": {
    population: 68, footTraffic: 2, venueQuality: 1, parkAccess: 3, streetFriendly: 2, vibeScore: 5,
    character: "Riverside community — Wellington St strip, waterfront parks, folk scene",
    hotspots: {
      street:       ["Rue Wellington main commercial strip", "Espace Wellington plaza"],
      park:         ["Berges de Verdun waterfront park", "Parc de la Rive-Sud canal path"],
      bar_cafe:     ["Espace Wellington bars", "Verre Bouteille, 4140 rue Wellington"],
      concert_hall: ["Théâtre Verre Bouteille, 4140 rue Wellington"],
      community:    ["Maison de la culture Verdun, 5955 rue Bannantyne"],
      festival:     ["Berges de Verdun — summer riverside festivals, Divers/Cité adjacent"]
    }
  },
  "LaSalle": {
    population: 80, footTraffic: 2, venueQuality: 1, parkAccess: 2, streetFriendly: 1, vibeScore: 3,
    character: "Canal-side suburb — maison de la culture, local community events",
    hotspots: {
      street:       ["Blvd Newman commercial strip", "Carrefour Angrignon entrance"],
      park:         ["Canal de Lachine LaSalle section", "Rapides-du-Cheval-Blanc park"],
      bar_cafe:     ["Blvd Newman brasseries"],
      concert_hall: ["Maison de la culture LaSalle, 8395 blvd Newman"],
      community:    ["Maison de la culture LaSalle, 8395 blvd Newman"],
      festival:     ["Canal Lachine LaSalle — summer cycling events"]
    }
  },
  "Lachine": {
    population: 45, footTraffic: 1, venueQuality: 1, parkAccess: 3, streetFriendly: 2, vibeScore: 4,
    character: "Historic waterfront — canal path events, summer festivals by the water",
    hotspots: {
      street:       ["Blvd St-Joseph historic strip", "Vieux-Lachine village square"],
      park:         ["Parc René-Lévesque (peninsula)", "Canal de Lachine eastern basin"],
      bar_cafe:     ["Terrasses along blvd St-Joseph"],
      concert_hall: ["Maison de la culture Lachine, 1001 blvd St-Joseph"],
      community:    ["Maison de la culture Lachine, 1001 blvd St-Joseph"],
      festival:     ["Parc René-Lévesque — Lachine Canal summer festival, jazz on the water"]
    }
  },
  "Côte-Saint-Luc / Hampstead / Montréal-Ouest": {
    population: 35, footTraffic: 1, venueQuality: 1, parkAccess: 2, streetFriendly: 1, vibeScore: 3,
    character: "Established anglophone/Jewish community — private events, community halls",
    hotspots: {
      street:       ["Blvd Cavendish shopping strip"],
      park:         ["Parc de la Falaise (NDG adjacent)", "Local neighbourhood parks"],
      bar_cafe:     ["Cavendish strip cafés"],
      concert_hall: ["Salle Claude-Champagne, 200 ave Vincent-d'Indy"],
      community:    ["Cummings Jewish Centre, 5700 blvd Westbury"],
      festival:     ["Parc Cavendish — community summer events"]
    }
  },
  "Pierrefonds-Roxboro / L'Île-Bizard": {
    population: 80, footTraffic: 1, venueQuality: 1, parkAccess: 3, streetFriendly: 1, vibeScore: 2,
    character: "Far-west suburban — outdoor parks, community center events",
    hotspots: {
      street:       ["Blvd Pierrefonds commercial strip"],
      park:         ["Parc-nature de l'Île-Bizard", "Bord-du-lac Lakeshore path"],
      bar_cafe:     ["Local family restaurants and cafés"],
      concert_hall: ["Maison de la culture Pierrefonds, 13665 blvd Pierrefonds"],
      community:    ["Maison de la culture Pierrefonds, 13665 blvd Pierrefonds"],
      festival:     ["Île-Bizard waterfront — summer outdoor events"]
    }
  }
};

// ─────────────────────────────────────────────
//  Neighbourhood Data
//  Polygons retraced against the official
//  Montreal borough map, staying within the
//  island coastline. Coords are [lat, lng].
// ─────────────────────────────────────────────
const neighbourhoods = [

  // ── EAST ISLAND ──────────────────────────────
  {
    name: "Rivière-des-Prairies–Pointe-aux-Trembles",
    topGenre: "Pop",
    genres: { "Pop": 34, "Rock": 26, "Hip-Hop": 18, "Electronic": 12, "Folk/World": 6, "Jazz/Blues": 4 },
    description: "Far-east waterfront community — pop radio staples and classic rock.",
    venues: ["Maison de la culture PAT", "Centre culturel de Pointe-aux-Trembles"],
    center: [45.6724, -73.5214],
    polygon: [
      [45.63421,-73.56834],[45.64324,-73.55452],[45.64839,-73.54485],[45.63769,-73.52141],
      [45.63169,-73.48404],[45.63564,-73.48023],[45.63784,-73.47868],[45.6405,-73.47765],
      [45.64391,-73.47731],[45.64605,-73.47759],[45.64821,-73.47829],[45.65486,-73.48291],
      [45.66254,-73.48578],[45.66805,-73.48659],[45.68262,-73.48618],[45.68508,-73.48561],
      [45.68711,-73.48439],[45.68909,-73.48243],[45.69344,-73.47932],[45.69494,-73.47866],
      [45.69701,-73.47834],[45.69896,-73.47744],[45.6996,-73.47659],[45.70039,-73.47448],
      [45.70162,-73.47478],[45.70492,-73.47387],[45.70587,-73.47397],[45.70681,-73.47456],
      [45.70758,-73.47535],[45.70467,-73.48094],[45.70284,-73.48642],[45.70234,-73.48892],
      [45.70266,-73.49078],[45.70497,-73.49294],[45.70524,-73.49441],[45.70438,-73.50039],
      [45.70096,-73.51415],[45.70064,-73.51666],[45.69996,-73.5191],[45.69887,-73.52148],
      [45.69619,-73.52515],[45.69427,-73.52665],[45.69255,-73.52764],[45.68747,-73.52955],
      [45.6853,-73.53101],[45.6788,-73.53866],[45.67679,-73.54243],[45.67374,-73.55209],
      [45.6727,-73.55418],[45.66628,-73.56345],[45.66505,-73.5659],[45.66266,-73.57202],
      [45.66124,-73.57429],[45.65811,-73.58094],[45.65673,-73.58479],[45.64816,-73.60097],
      [45.64734,-73.60442],[45.64541,-73.60877],[45.64227,-73.61361],[45.63368,-73.62464],
      [45.6126,-73.60232],[45.61403,-73.5986],[45.61546,-73.59601],[45.63421,-73.56834]
    ]
  },

  {
    name: "Montréal-Est / Anjou",
    topGenre: "Rock",
    genres: { "Rock": 32, "Pop": 26, "Hip-Hop": 20, "Electronic": 12, "Folk/World": 6, "Jazz/Blues": 4 },
    description: "East-end industrial boroughs — rock, pop and classic R&B.",
    venues: ["Cabaret Lion d'Or", "Centre culturel Anjou"],
    center: [45.6057, -73.5535],
    polygon: [
      [45.63421,-73.56834],[45.61546,-73.59601],[45.61403,-73.5986],[45.6126,-73.60232],
      [45.61197,-73.60166],[45.61113,-73.60314],[45.59978,-73.5771],[45.59937,-73.57732],
      [45.59901,-73.57531],[45.5966,-73.5697],[45.59714,-73.56941],[45.59031,-73.54895],
      [45.59399,-73.54646],[45.59457,-73.54815],[45.59542,-73.54731],[45.59489,-73.54581],
      [45.59809,-73.54385],[45.59821,-73.54423],[45.59941,-73.54454],[45.59955,-73.54483],
      [45.60065,-73.54448],[45.6011,-73.54525],[45.60191,-73.54473],[45.60068,-73.5407],
      [45.60181,-73.5398],[45.6032,-73.54295],[45.60418,-73.54218],[45.60214,-73.53659],
      [45.6027,-73.53675],[45.60263,-73.53652],[45.60459,-73.53716],[45.60478,-73.53777],
      [45.60518,-73.53755],[45.60693,-73.54158],[45.60784,-73.54083],[45.60816,-73.54157],
      [45.60951,-73.54108],[45.61074,-73.54534],[45.6122,-73.54459],[45.6127,-73.54632],
      [45.61411,-73.5454],[45.61505,-73.5441],[45.61391,-73.53787],[45.6199,-73.5355],
      [45.63421,-73.56834]
    ]
  },

  {
    name: "Saint-Léonard",
    topGenre: "Hip-Hop",
    genres: { "Hip-Hop": 36, "Pop": 26, "Electronic": 18, "Rock": 10, "Folk/World": 6, "Jazz/Blues": 4 },
    description: "Diverse northeast — Latin, Caribbean & hip-hop dominate the airwaves.",
    venues: ["Maison de la culture Saint-Léonard"],
    center: [45.5874, -73.5849],
    polygon: [
      [45.58144,-73.5685],[45.58189,-73.56804],[45.58203,-73.56699],[45.58248,-73.56674],
      [45.58251,-73.56603],[45.5828,-73.566],[45.583,-73.56478],[45.58426,-73.56616],
      [45.58499,-73.56395],[45.58541,-73.56425],[45.58724,-73.56422],[45.58842,-73.56642],
      [45.59181,-73.56845],[45.59354,-73.56902],[45.59488,-73.56868],[45.59661,-73.56971],
      [45.59901,-73.57531],[45.59937,-73.57732],[45.59978,-73.5771],[45.61113,-73.60314],
      [45.61065,-73.60403],[45.61017,-73.60352],[45.6095,-73.60476],[45.61075,-73.60608],
      [45.60818,-73.60914],[45.58382,-73.62961],[45.58325,-73.62882],[45.58547,-73.62676],
      [45.58464,-73.62424],[45.58283,-73.62084],[45.57555,-73.60431],[45.57427,-73.60234],
      [45.57449,-73.60184],[45.57402,-73.60054],[45.57275,-73.60158],[45.56637,-73.58714],
      [45.57767,-73.57726],[45.57807,-73.57812],[45.58193,-73.57397],[45.58092,-73.57102],
      [45.58147,-73.57065],[45.58121,-73.56986],[45.58166,-73.5696],[45.58144,-73.5685]
    ]
  },

  {
    name: "Montréal-Nord",
    topGenre: "Hip-Hop",
    genres: { "Hip-Hop": 40, "Pop": 22, "Electronic": 18, "Rock": 10, "Folk/World": 6, "Jazz/Blues": 4 },
    description: "Dense north borough — strong Caribbean, African & hip-hop scene.",
    venues: ["Maison de la culture Montréal-Nord"],
    center: [45.6013, -73.6282],
    polygon: [
      [45.61113,-73.60314],[45.61197,-73.60166],[45.63368,-73.62464],[45.6286,-73.63043],
      [45.62376,-73.63425],[45.61743,-73.63832],[45.61154,-73.63999],[45.60099,-73.64523],
      [45.59928,-73.64667],[45.59583,-73.65067],[45.58512,-73.65847],[45.58402,-73.65668],
      [45.58377,-73.65462],[45.576,-73.63651],[45.58002,-73.63291],[45.57962,-73.632],
      [45.58238,-73.62951],[45.58325,-73.62882],[45.58382,-73.62961],[45.60818,-73.60914],
      [45.61075,-73.60608],[45.6095,-73.60476],[45.61017,-73.60352],[45.61065,-73.60403],
      [45.61113,-73.60314]
    ]
  },

  // ── NORTH ISLAND ─────────────────────────────
  {
    name: "Ahuntsic-Cartierville",
    topGenre: "Hip-Hop",
    genres: { "Hip-Hop": 30, "Pop": 25, "Folk/World": 18, "Rock": 14, "Electronic": 8, "Jazz/Blues": 5 },
    description: "Northern borough with strong Haitian & North African music scenes.",
    venues: ["Maison de la culture Ahuntsic", "Café Cléopâtre"],
    center: [45.5517, -73.6857],
    polygon: [
      [45.58363,-73.6543],[45.58157,-73.65552],[45.58093,-73.6571],[45.58013,-73.65815],
      [45.57964,-73.65825],[45.57984,-73.65855],[45.57883,-73.65974],[45.57826,-73.66016],
      [45.57788,-73.66005],[45.57751,-73.66073],[45.57619,-73.6606],[45.57554,-73.66117],
      [45.575,-73.66116],[45.57512,-73.66173],[45.57543,-73.66158],[45.5755,-73.66183],
      [45.57699,-73.66144],[45.57728,-73.66165],[45.57879,-73.66062],[45.57927,-73.66061],
      [45.58044,-73.65968],[45.58128,-73.65759],[45.58193,-73.65691],[45.58247,-73.65681],
      [45.58099,-73.65902],[45.58058,-73.66054],[45.57814,-73.6621],[45.57676,-73.66396],
      [45.57409,-73.66598],[45.5737,-73.66608],[45.5729,-73.66544],[45.57281,-73.66445],
      [45.57301,-73.6639],[45.57499,-73.66241],[45.57472,-73.66111],[45.57326,-73.66181],
      [45.57134,-73.66193],[45.57052,-73.66257],[45.56893,-73.66264],[45.56795,-73.66359],
      [45.56643,-73.6632],[45.56533,-73.6635],[45.56434,-73.66435],[45.56341,-73.66737],
      [45.56016,-73.67192],[45.55847,-73.67326],[45.55528,-73.67421],[45.55192,-73.67712],
      [45.55014,-73.6791],[45.54868,-73.67926],[45.54896,-73.68],[45.54941,-73.67993],
      [45.54879,-73.68374],[45.5493,-73.68605],[45.54882,-73.6874],[45.54766,-73.68866],
      [45.54718,-73.69244],[45.54742,-73.6949],[45.54646,-73.69979],[45.54661,-73.70059],
      [45.54598,-73.70124],[45.54564,-73.7024],[45.54522,-73.70268],[45.54473,-73.70249],
      [45.54477,-73.7035],[45.54399,-73.70505],[45.54414,-73.70556],[45.54371,-73.70692],
      [45.54229,-73.70786],[45.54318,-73.70927],[45.54123,-73.71108],[45.53988,-73.71332],
      [45.53869,-73.71613],[45.53793,-73.72129],[45.53643,-73.72403],[45.53324,-73.728],
      [45.5322,-73.72979],[45.53113,-73.73436],[45.5296,-73.73812],[45.52745,-73.74125],
      [45.52586,-73.74264],[45.52228,-73.74474],[45.5204,-73.74663],[45.51933,-73.74868],
      [45.51894,-73.75358],[45.51814,-73.75588],[45.51647,-73.75814],[45.51386,-73.76032],
      [45.51191,-73.76369],[45.50649,-73.75517],[45.51611,-73.72851],[45.52073,-73.7359],
      [45.52367,-73.73174],[45.52135,-73.72806],[45.52675,-73.72169],[45.52474,-73.71852],
      [45.52569,-73.7173],[45.52399,-73.71463],[45.52516,-73.71309],[45.52306,-73.70921],
      [45.52823,-73.6946],[45.52879,-73.69101],[45.52867,-73.6871],[45.53016,-73.68498],
      [45.53211,-73.67648],[45.53236,-73.67322],[45.53184,-73.66974],[45.5263,-73.65075],
      [45.53072,-73.64819],[45.53088,-73.6486],[45.54291,-73.64079],[45.54818,-73.63635],
      [45.54963,-73.63382],[45.55087,-73.62873],[45.5545,-73.62174],[45.56478,-73.64536],
      [45.57589,-73.63624],[45.58363,-73.6543]
    ]
  },

  // ── CENTRAL-NORTH ─────────────────────────────
  {
    name: "Villeray–Saint-Michel–Parc-Extension",
    topGenre: "Hip-Hop",
    genres: { "Hip-Hop": 34, "Electronic": 22, "Folk/World": 20, "Pop": 14, "Indie/Alt": 6, "Rock": 4 },
    description: "Super-diverse borough — Bengali, Haitian, Moroccan & hip-hop sounds.",
    venues: ["Café Cleopatra", "Maison de la culture Villeray"],
    center: [45.5524, -73.6206],
    polygon: [
      [45.52365,-73.62078],[45.52751,-73.61753],[45.52768,-73.61707],[45.5286,-73.61692],
      [45.52945,-73.61722],[45.5303,-73.61815],[45.53112,-73.62153],[45.53478,-73.61821],
      [45.53521,-73.61732],[45.53851,-73.61425],[45.5422,-73.61227],[45.54794,-73.60706],
      [45.54636,-73.60354],[45.56615,-73.58629],[45.57275,-73.60158],[45.57402,-73.60054],
      [45.57449,-73.60184],[45.57427,-73.60234],[45.57555,-73.60431],[45.58283,-73.62084],
      [45.58464,-73.62424],[45.58547,-73.62676],[45.57962,-73.632],[45.58002,-73.63291],
      [45.57925,-73.63361],[45.57603,-73.63649],[45.57589,-73.63624],[45.56478,-73.64536],
      [45.5545,-73.62174],[45.55087,-73.62873],[45.54963,-73.63382],[45.54833,-73.63618],
      [45.5435,-73.64038],[45.53084,-73.64862],[45.52335,-73.62277],[45.52402,-73.62215],
      [45.52365,-73.62078]
    ]
  },

  {
    name: "Rosemont–La Petite-Patrie",
    topGenre: "Hip-Hop",
    genres: { "Hip-Hop": 32, "Electronic": 26, "Indie/Alt": 18, "Pop": 14, "Rock": 6, "Folk/World": 4 },
    description: "Young & multicultural — hip-hop beats and electronic nights.",
    venues: ["Théâtre Fairmount", "Quai des Brumes", "Le Ministère"],
    center: [45.5536, -73.5864],
    polygon: [
      [45.58144,-73.5685],[45.58166,-73.5696],[45.58121,-73.56986],[45.58147,-73.57065],
      [45.58092,-73.57102],[45.58193,-73.57397],[45.57899,-73.5772],[45.57807,-73.57812],
      [45.57767,-73.57726],[45.56641,-73.58711],[45.56615,-73.58629],[45.54758,-73.60239],
      [45.54636,-73.60354],[45.54794,-73.60706],[45.5422,-73.61227],[45.53851,-73.61425],
      [45.53521,-73.61732],[45.53478,-73.61821],[45.53112,-73.62153],[45.5303,-73.61815],
      [45.52915,-73.61706],[45.52768,-73.61707],[45.52562,-73.61242],[45.52811,-73.60762],
      [45.52856,-73.60074],[45.52966,-73.59709],[45.531,-73.59493],[45.5393,-73.58516],
      [45.54106,-73.58138],[45.54154,-73.57885],[45.5416,-73.57642],[45.53992,-73.55923],
      [45.54736,-73.55532],[45.55676,-73.55429],[45.5651,-73.55451],[45.57346,-73.54899],
      [45.57571,-73.55571],[45.57821,-73.55873],[45.58144,-73.5685]
    ]
  },

  // ── CENTRAL ───────────────────────────────────
  {
    name: "Outremont",
    topGenre: "Classical",
    genres: { "Classical": 40, "Jazz/Blues": 25, "Folk/World": 18, "Indie/Alt": 10, "Pop": 5, "Rock": 2 },
    description: "Affluent & cultured — classical concerts, opera & world music.",
    venues: ["Outremont Theatre", "Rialto Theatre", "Église Saint-Viateur"],
    center: [45.5109, -73.6057],
    polygon: [
      [45.51578,-73.59027],[45.52778,-73.61728],[45.51966,-73.6244],[45.51656,-73.62667],
      [45.51251,-73.61764],[45.51114,-73.61888],[45.51028,-73.61693],[45.50919,-73.61792],
      [45.50836,-73.61604],[45.50511,-73.61895],[45.5047,-73.61826],[45.51046,-73.61305],
      [45.50752,-73.60636],[45.50699,-73.60618],[45.50566,-73.6033],[45.5068,-73.60226],
      [45.50558,-73.59956],[45.5058,-73.59897],[45.50433,-73.59575],[45.50813,-73.59153],
      [45.51018,-73.5942],[45.51078,-73.59394],[45.51158,-73.59671],[45.51304,-73.59694],
      [45.51311,-73.5989],[45.51445,-73.59737],[45.51451,-73.5916],[45.51578,-73.59027]
    ]
  },

  {
    name: "Le Plateau-Mont-Royal",
    topGenre: "Indie/Alt",
    genres: { "Indie/Alt": 38, "Folk/World": 22, "Jazz/Blues": 18, "Hip-Hop": 10, "Pop": 8, "Electronic": 4 },
    description: "Bohemian heart of MTL — indie, folk & jazz cafés everywhere.",
    venues: ["Casa del Popolo", "Sala Rossa", "L'Escogriffe"],
    center: [45.5254, -73.5829],
    polygon: [
      [45.51578,-73.59027],[45.51679,-73.58937],[45.51164,-73.57814],[45.5082,-73.58014],
      [45.50497,-73.57349],[45.50877,-73.57104],[45.52108,-73.56558],[45.52314,-73.56543],
      [45.53584,-73.56139],[45.53992,-73.55923],[45.5416,-73.57642],[45.54154,-73.57885],
      [45.54106,-73.58138],[45.5393,-73.58516],[45.531,-73.59493],[45.52966,-73.59709],
      [45.52856,-73.60074],[45.52811,-73.60762],[45.52562,-73.61242],[45.51578,-73.59027]
    ]
  },

  // ── WEST-CENTRAL ──────────────────────────────
  {
    name: "Saint-Laurent",
    topGenre: "Electronic",
    genres: { "Electronic": 34, "Hip-Hop": 28, "Pop": 18, "Rock": 10, "Folk/World": 6, "Indie/Alt": 4 },
    description: "Industrial turned creative — electronic & hip-hop thrive here.",
    venues: ["Club Soda", "L'Astral", "Studio TD"],
    center: [45.5005, -73.7343],
    polygon: [
      [45.46318,-73.68281],[45.48369,-73.67721],[45.48946,-73.68584],[45.49126,-73.68119],
      [45.50443,-73.66464],[45.51961,-73.65475],[45.5263,-73.65075],[45.53184,-73.66974],
      [45.53236,-73.67322],[45.53211,-73.67648],[45.53016,-73.68498],[45.52867,-73.6871],
      [45.52879,-73.69101],[45.52823,-73.6946],[45.52306,-73.70921],[45.52516,-73.71309],
      [45.52399,-73.71463],[45.52569,-73.7173],[45.52474,-73.71852],[45.52675,-73.72169],
      [45.52135,-73.72806],[45.52367,-73.73174],[45.52073,-73.7359],[45.51611,-73.72851],
      [45.50649,-73.75517],[45.50431,-73.75174],[45.50355,-73.75292],[45.50329,-73.75474],
      [45.50199,-73.75831],[45.5027,-73.75949],[45.50155,-73.76097],[45.50341,-73.76391],
      [45.50285,-73.76464],[45.50336,-73.76541],[45.5027,-73.76724],[45.50397,-73.76925],
      [45.50251,-73.77253],[45.50147,-73.77091],[45.50051,-73.77388],[45.49911,-73.77168],
      [45.4982,-73.77362],[45.49571,-73.76971],[45.49039,-73.76442],[45.48917,-73.76704],
      [45.48877,-73.76718],[45.48827,-73.76662],[45.48792,-73.76683],[45.48779,-73.76634],
      [45.4874,-73.76651],[45.48704,-73.76608],[45.48576,-73.76694],[45.48542,-73.768],
      [45.48476,-73.7681],[45.48181,-73.7742],[45.47676,-73.76616],[45.47496,-73.76839],
      [45.46856,-73.76236],[45.46825,-73.76276],[45.4606,-73.75075],[45.48275,-73.72247],
      [45.46466,-73.69486],[45.47033,-73.6933],[45.46318,-73.68281]
    ]
  },

  {
    name: "Mont-Royal (TMR)",
    topGenre: "Classical",
    genres: { "Classical": 36, "Jazz/Blues": 24, "Folk/World": 18, "Indie/Alt": 12, "Pop": 6, "Rock": 4 },
    description: "Affluent enclave — classical concerts, opera & refined jazz.",
    venues: ["Salle Marguerite-Bourgeoys", "Maison de la culture TMR"],
    center: [45.5047, -73.6523],
    polygon: [
      [45.48369,-73.67721],[45.49127,-73.67513],[45.48681,-73.66804],[45.48676,-73.66586],
      [45.49433,-73.65618],[45.49911,-73.66372],[45.49922,-73.66175],[45.50221,-73.66245],
      [45.50243,-73.66058],[45.50332,-73.66005],[45.5047,-73.65997],[45.50372,-73.65639],
      [45.50431,-73.6516],[45.5016,-73.64573],[45.50546,-73.64224],[45.50618,-73.64229],
      [45.50702,-73.64154],[45.50719,-73.64187],[45.50754,-73.64167],[45.51118,-73.63852],
      [45.5144,-73.63665],[45.51418,-73.63589],[45.51565,-73.63464],[45.51405,-73.6289],
      [45.52365,-73.62078],[45.52402,-73.62215],[45.52335,-73.62277],[45.53072,-73.64819],
      [45.51961,-73.65475],[45.50443,-73.66464],[45.49126,-73.68119],[45.48946,-73.68584],
      [45.48369,-73.67721]
    ]
  },

  // ── DOWNTOWN CORE ─────────────────────────────
  {
    name: "Côte-des-Neiges–NDG",
    topGenre: "Folk/World",
    genres: { "Folk/World": 30, "Classical": 22, "Rock": 18, "Jazz/Blues": 16, "Indie/Alt": 10, "Pop": 4 },
    description: "Most diverse borough — world music from every continent.",
    venues: ["Théâtre Déjà Vu", "The Burgundy Lion", "Café Resonance"],
    center: [45.4885, -73.6323],
    polygon: [
      [45.47935,-73.63082],[45.47897,-73.63117],[45.47837,-73.62992],[45.47697,-73.63567],
      [45.4768,-73.63961],[45.4746,-73.64312],[45.47328,-73.64592],[45.47038,-73.64945],
      [45.46873,-73.65035],[45.46763,-73.65221],[45.46295,-73.65576],[45.46145,-73.65827],
      [45.46125,-73.65771],[45.46066,-73.65773],[45.46013,-73.6572],[45.45968,-73.65762],
      [45.45971,-73.65844],[45.45078,-73.6353],[45.45276,-73.63146],[45.45749,-73.6262],
      [45.46175,-73.61996],[45.46489,-73.61212],[45.46476,-73.61161],[45.46729,-73.60585],
      [45.4691,-73.60317],[45.46905,-73.60259],[45.47209,-73.59888],[45.47332,-73.59648],
      [45.47645,-73.59513],[45.4741,-73.59847],[45.47702,-73.605],[45.47657,-73.6054],
      [45.48062,-73.61438],[45.48261,-73.61238],[45.48479,-73.61722],[45.48679,-73.61529],
      [45.48821,-73.61842],[45.48898,-73.61841],[45.49303,-73.61476],[45.49171,-73.61161],
      [45.49405,-73.6094],[45.49367,-73.60839],[45.49527,-73.60684],[45.4949,-73.60547],
      [45.50086,-73.59912],[45.50191,-73.59732],[45.50277,-73.59496],[45.50353,-73.594],
      [45.5058,-73.59897],[45.50558,-73.59956],[45.5068,-73.60226],[45.50566,-73.6033],
      [45.50699,-73.60618],[45.50752,-73.60636],[45.51046,-73.61305],[45.5047,-73.61826],
      [45.50511,-73.61895],[45.50836,-73.61604],[45.50919,-73.61792],[45.51028,-73.61693],
      [45.51114,-73.61888],[45.51251,-73.61764],[45.51656,-73.62667],[45.51405,-73.6289],
      [45.51565,-73.63464],[45.51418,-73.63589],[45.5144,-73.63665],[45.51118,-73.63852],
      [45.50754,-73.64167],[45.50719,-73.64187],[45.50702,-73.64154],[45.50618,-73.64229],
      [45.50546,-73.64224],[45.5016,-73.64573],[45.50431,-73.6516],[45.50372,-73.65639],
      [45.5047,-73.65997],[45.50332,-73.66005],[45.50243,-73.66058],[45.50221,-73.66245],
      [45.49922,-73.66175],[45.49911,-73.66372],[45.49433,-73.65618],[45.48676,-73.66586],
      [45.48681,-73.66804],[45.49127,-73.67513],[45.48369,-73.67721],[45.48196,-73.67464],
      [45.48371,-73.66976],[45.48024,-73.66181],[45.48115,-73.66097],[45.47896,-73.65596],
      [45.48464,-73.65599],[45.48671,-73.65546],[45.48688,-73.65579],[45.49268,-73.65052],
      [45.49187,-73.64856],[45.48898,-73.65116],[45.47965,-73.6304],[45.47935,-73.63082]
    ]
  },

  {
    name: "Ville-Marie (Downtown)",
    topGenre: "Pop",
    genres: { "Pop": 30, "Electronic": 25, "Hip-Hop": 20, "Rock": 12, "Jazz/Blues": 8, "Classical": 5 },
    description: "High-traffic commercial core — mainstream pop & club sounds dominate.",
    venues: ["Bell Centre", "Place des Arts", "Théâtre du Nouveau Monde"],
    center: [45.508, -73.5699],
    polygon: [
      [45.49633,-73.51958],[45.49924,-73.52048],[45.49933,-73.51991],[45.53257,-73.53023],
      [45.5338,-73.53037],[45.53479,-73.53011],[45.53131,-73.5406],[45.53182,-73.54329],
      [45.53407,-73.54454],[45.53776,-73.54751],[45.53866,-73.54875],[45.53902,-73.55006],
      [45.53992,-73.55923],[45.53584,-73.56139],[45.52314,-73.56543],[45.52108,-73.56558],
      [45.50877,-73.57104],[45.50497,-73.57349],[45.5082,-73.58014],[45.51164,-73.57814],
      [45.51679,-73.58937],[45.51451,-73.5916],[45.51445,-73.59737],[45.51311,-73.5989],
      [45.51304,-73.59694],[45.51158,-73.59671],[45.51078,-73.59394],[45.51018,-73.5942],
      [45.50813,-73.59153],[45.50433,-73.59575],[45.50353,-73.594],[45.50324,-73.59426],
      [45.50086,-73.59912],[45.4949,-73.60547],[45.49472,-73.60406],[45.495,-73.60277],
      [45.49451,-73.60288],[45.49428,-73.60094],[45.4937,-73.60124],[45.49171,-73.59648],
      [45.49262,-73.5957],[45.4884,-73.58257],[45.48813,-73.58313],[45.48674,-73.58154],
      [45.4929,-73.57306],[45.4901,-73.5672],[45.49348,-73.56433],[45.4983,-73.56138],
      [45.49561,-73.55522],[45.49219,-73.55326],[45.49059,-73.55114],[45.48807,-73.53987],
      [45.49519,-73.51923],[45.49633,-73.51958]
    ]
  },

  {
    name: "Mercier–Hochelaga-Maisonneuve",
    topGenre: "Rock",
    genres: { "Rock": 35, "Hip-Hop": 28, "Electronic": 18, "Indie/Alt": 12, "Pop": 5, "Folk/World": 2 },
    description: "Gritty & authentic — rock venues, underground hip-hop & punk.",
    venues: ["Théâtre Corona", "O Patro Vys", "La Tulipe"],
    center: [45.5829, -73.5373],
    polygon: [
      [45.58144,-73.5685],[45.57821,-73.55873],[45.57571,-73.55571],[45.57346,-73.54899],
      [45.5651,-73.55451],[45.55676,-73.55429],[45.54736,-73.55532],[45.53992,-73.55923],
      [45.53902,-73.55006],[45.53866,-73.54875],[45.53776,-73.54751],[45.53407,-73.54454],
      [45.53182,-73.54329],[45.53131,-73.5406],[45.53479,-73.53011],[45.5361,-73.52923],
      [45.55229,-73.51314],[45.55519,-73.52201],[45.55867,-73.51858],[45.55892,-73.5191],
      [45.55715,-73.52084],[45.55762,-73.52172],[45.55885,-73.52089],[45.55909,-73.52149],
      [45.56038,-73.52064],[45.55678,-73.52361],[45.55648,-73.5241],[45.55714,-73.52532],
      [45.56614,-73.51807],[45.56751,-73.51549],[45.56766,-73.51594],[45.5683,-73.5156],
      [45.56906,-73.51751],[45.57098,-73.51383],[45.57577,-73.50918],[45.58053,-73.50591],
      [45.584,-73.50464],[45.58446,-73.50568],[45.58537,-73.50522],[45.58531,-73.50498],
      [45.58774,-73.50393],[45.59206,-73.50556],[45.59184,-73.50688],[45.59268,-73.5073],
      [45.59521,-73.50791],[45.59638,-73.50866],[45.60077,-73.50948],[45.60353,-73.5093],
      [45.60602,-73.50875],[45.60991,-73.50717],[45.6106,-73.5073],[45.61065,-73.50688],
      [45.61584,-73.53719],[45.61391,-73.53787],[45.61505,-73.5441],[45.61411,-73.5454],
      [45.6127,-73.54632],[45.6122,-73.54459],[45.61074,-73.54534],[45.60951,-73.54108],
      [45.60816,-73.54157],[45.60784,-73.54083],[45.60693,-73.54158],[45.60518,-73.53755],
      [45.60478,-73.53777],[45.60459,-73.53716],[45.60214,-73.53659],[45.60418,-73.54218],
      [45.6032,-73.54295],[45.60181,-73.5398],[45.60068,-73.5407],[45.60191,-73.54473],
      [45.6011,-73.54525],[45.60065,-73.54448],[45.59955,-73.54483],[45.59941,-73.54454],
      [45.59821,-73.54423],[45.59809,-73.54385],[45.59489,-73.54581],[45.59542,-73.54731],
      [45.59457,-73.54815],[45.59399,-73.54646],[45.59031,-73.54895],[45.59714,-73.56941],
      [45.5966,-73.5697],[45.59488,-73.56868],[45.59354,-73.56902],[45.59181,-73.56845],
      [45.58842,-73.56642],[45.58724,-73.56422],[45.58541,-73.56425],[45.58499,-73.56395],
      [45.58426,-73.56616],[45.583,-73.56478],[45.5828,-73.566],[45.58251,-73.56603],
      [45.58248,-73.56674],[45.58203,-73.56699],[45.58189,-73.56804],[45.58144,-73.5685]
    ]
  },

  // ── SOUTH & SOUTHWEST ─────────────────────────
  {
    name: "Le Sud-Ouest",
    topGenre: "Indie/Alt",
    genres: { "Indie/Alt": 28, "Electronic": 26, "Rock": 20, "Hip-Hop": 14, "Jazz/Blues": 8, "Pop": 4 },
    description: "Griffintown & Pointe-St-Charles — rapidly gentrifying, indie & electronic.",
    venues: ["Théâtre Corona", "Foufounes Électriques", "Astral"],
    center: [45.4694, -73.5813],
    polygon: [
      [45.48674,-73.58154],[45.48557,-73.58061],[45.48225,-73.58512],[45.48256,-73.58577],
      [45.48236,-73.58664],[45.47645,-73.59513],[45.47332,-73.59648],[45.47209,-73.59888],
      [45.46905,-73.60259],[45.4691,-73.60317],[45.46729,-73.60585],[45.46476,-73.61161],
      [45.46489,-73.61212],[45.46175,-73.61996],[45.45749,-73.6262],[45.45276,-73.63146],
      [45.45078,-73.6353],[45.44832,-73.62886],[45.45066,-73.62648],[45.45397,-73.62177],
      [45.45768,-73.61367],[45.45454,-73.60679],[45.44872,-73.60477],[45.44801,-73.6052],
      [45.4436,-73.61018],[45.43945,-73.61176],[45.4375,-73.59943],[45.44779,-73.59054],
      [45.44797,-73.5894],[45.45067,-73.58673],[45.45296,-73.58351],[45.4552,-73.5816],
      [45.45702,-73.58072],[45.45929,-73.5803],[45.46378,-73.58104],[45.46656,-73.58073],
      [45.46648,-73.57886],[45.46758,-73.57876],[45.46753,-73.5777],[45.4678,-73.57746],
      [45.46773,-73.57597],[45.46653,-73.57608],[45.4665,-73.57227],[45.4723,-73.57172],
      [45.47254,-73.5714],[45.47431,-73.5723],[45.47461,-73.57034],[45.4744,-73.56851],
      [45.46867,-73.55382],[45.46976,-73.55088],[45.47312,-73.54602],[45.47535,-73.54206],
      [45.47653,-73.53891],[45.47624,-73.5349],[45.47324,-73.52167],[45.47818,-73.52423],
      [45.49157,-73.52954],[45.48807,-73.53987],[45.49007,-73.54953],[45.49078,-73.55152],
      [45.49175,-73.55287],[45.49495,-73.55463],[45.49572,-73.55537],[45.4983,-73.56138],
      [45.49348,-73.56433],[45.4901,-73.5672],[45.4929,-73.57306],[45.48674,-73.58154]
    ]
  },

  {
    name: "Verdun",
    topGenre: "Rock",
    genres: { "Rock": 36, "Folk/World": 22, "Indie/Alt": 18, "Hip-Hop": 12, "Electronic": 8, "Pop": 4 },
    description: "Riverside community — indie rock & folk, growing arts scene.",
    venues: ["Théâtre Verre Bouteille", "Wellington St strip"],
    center: [45.4606, -73.5591],
    polygon: [
      [45.42805,-73.5398],[45.43315,-73.53347],[45.43715,-73.5297],[45.44229,-73.52603],
      [45.44788,-73.52322],[45.45679,-73.52028],[45.46456,-73.5188],[45.46593,-73.51885],
      [45.46821,-73.51948],[45.47324,-73.52167],[45.47624,-73.5349],[45.47653,-73.53891],
      [45.47535,-73.54206],[45.47312,-73.54602],[45.46976,-73.55088],[45.46867,-73.55382],
      [45.4744,-73.56851],[45.47461,-73.57034],[45.47431,-73.5723],[45.47254,-73.5714],
      [45.4723,-73.57172],[45.4665,-73.57227],[45.46653,-73.57608],[45.46773,-73.57597],
      [45.4678,-73.57746],[45.46753,-73.5777],[45.46758,-73.57876],[45.46648,-73.57886],
      [45.46656,-73.58073],[45.46378,-73.58104],[45.45929,-73.5803],[45.45702,-73.58072],
      [45.4552,-73.5816],[45.45296,-73.58351],[45.45067,-73.58673],[45.44797,-73.5894],
      [45.44779,-73.59054],[45.4375,-73.59943],[45.42805,-73.5398]
    ]
  },

  {
    name: "LaSalle",
    topGenre: "Rock",
    genres: { "Rock": 30, "Pop": 26, "Folk/World": 20, "Electronic": 12, "Hip-Hop": 8, "Jazz/Blues": 4 },
    description: "Canal-side borough — roots music, folk festivals and riverside rock.",
    venues: ["Maison de la culture LaSalle", "Canal events"],
    center: [45.4291, -73.617],
    polygon: [
      [45.4218,-73.6661],[45.41788,-73.65539],[45.41329,-73.64826],[45.41093,-73.64359],
      [45.40976,-73.63873],[45.40971,-73.63417],[45.41026,-73.62923],[45.41038,-73.62128],
      [45.4111,-73.61462],[45.41296,-73.60656],[45.41599,-73.59742],[45.41707,-73.5915],
      [45.41718,-73.57334],[45.41757,-73.56834],[45.4186,-73.5617],[45.42029,-73.55531],
      [45.42293,-73.54845],[45.42805,-73.5398],[45.43945,-73.61176],[45.4436,-73.61018],
      [45.44801,-73.6052],[45.44872,-73.60477],[45.45454,-73.60679],[45.45768,-73.61367],
      [45.45397,-73.62177],[45.45066,-73.62648],[45.44832,-73.62886],[45.44842,-73.62914],
      [45.44682,-73.63173],[45.44071,-73.64712],[45.43698,-73.65405],[45.43343,-73.66218],
      [45.43219,-73.66586],[45.4218,-73.6661]
    ]
  },

  {
    name: "Lachine",
    topGenre: "Folk/World",
    genres: { "Folk/World": 28, "Rock": 26, "Pop": 20, "Electronic": 14, "Hip-Hop": 8, "Jazz/Blues": 4 },
    description: "Canal-side borough — roots music and folk festivals by the water.",
    venues: ["Maison de la culture Lachine", "Canal Lachine events"],
    center: [45.4464, -73.6803],
    polygon: [
      [45.4218,-73.6661],[45.43219,-73.66586],[45.43343,-73.66218],[45.43698,-73.65405],
      [45.44071,-73.64712],[45.44627,-73.63296],[45.44842,-73.62914],[45.44951,-73.63197],
      [45.44788,-73.63653],[45.44669,-73.63881],[45.44831,-73.64314],[45.4479,-73.64313],
      [45.4476,-73.64481],[45.45655,-73.66817],[45.45502,-73.67006],[45.45269,-73.67179],
      [45.45273,-73.67751],[45.4554,-73.68723],[45.45676,-73.6865],[45.46003,-73.68302],
      [45.46101,-73.6828],[45.46136,-73.68183],[45.46215,-73.68129],[45.47033,-73.6933],
      [45.46466,-73.69486],[45.47346,-73.70793],[45.46094,-73.72481],[45.45993,-73.72423],
      [45.44885,-73.72079],[45.44888,-73.7223],[45.43943,-73.7193],[45.43936,-73.72009],
      [45.43897,-73.72003],[45.43933,-73.72081],[45.43853,-73.72085],[45.42227,-73.71584],
      [45.42307,-73.6972],[45.42315,-73.68698],[45.42257,-73.67181],[45.4218,-73.6661]
    ]
  },

  // ── WEST ISLAND ───────────────────────────────
  {
    name: "Côte-Saint-Luc / Hampstead / Montréal-Ouest",
    topGenre: "Classical",
    genres: { "Classical": 28, "Jazz/Blues": 26, "Pop": 22, "Folk/World": 14, "Rock": 6, "Electronic": 4 },
    description: "Established anglophone/Jewish community — jazz clubs and classical music.",
    venues: ["Salle Claude-Champagne", "Cummings Jewish Centre"],
    center: [45.464, -73.6662],
    polygon: [
      [45.46318,-73.68281],[45.46215,-73.68129],[45.46136,-73.68183],[45.46101,-73.6828],
      [45.46003,-73.68302],[45.45676,-73.6865],[45.4554,-73.68723],[45.45273,-73.67751],
      [45.45269,-73.67179],[45.45502,-73.67006],[45.45616,-73.66851],[45.45757,-73.66732],
      [45.45458,-73.65956],[45.45594,-73.65799],[45.45722,-73.66132],[45.45953,-73.65796],
      [45.45982,-73.65835],[45.45968,-73.65762],[45.46011,-73.65721],[45.46066,-73.65773],
      [45.46125,-73.65771],[45.46145,-73.65827],[45.46295,-73.65576],[45.46763,-73.65221],
      [45.46873,-73.65035],[45.47038,-73.64945],[45.47328,-73.64592],[45.47394,-73.64439],
      [45.48115,-73.66097],[45.48024,-73.66181],[45.48371,-73.66976],[45.48196,-73.67464],
      [45.48369,-73.67721],[45.46318,-73.68281]
    ]
  },


  {
    name: "Pierrefonds-Roxboro / L'Île-Bizard",
    topGenre: "Pop",
    genres: { "Pop": 32, "Rock": 26, "Classical": 16, "Electronic": 12, "Folk/World": 8, "Hip-Hop": 6 },
    description: "Far west suburban borough — pop and classic rock dominate.",
    venues: ["Maison de la culture Pierrefonds"],
    center: [45.4873, -73.848],
    polygon: [
      [45.44678,-73.90435],[45.4475,-73.90234],[45.44635,-73.90147],[45.44671,-73.90013],
      [45.44715,-73.90037],[45.44754,-73.89808],[45.44653,-73.89359],[45.44804,-73.89156],
      [45.44952,-73.88836],[45.45248,-73.88468],[45.45265,-73.8814],[45.46011,-73.86579],
      [45.4614,-73.86706],[45.46558,-73.85993],[45.466,-73.86041],[45.4706,-73.85456],
      [45.47366,-73.85741],[45.47951,-73.84584],[45.48674,-73.85051],[45.49453,-73.8352],
      [45.4977,-73.83764],[45.49874,-73.83582],[45.49827,-73.83552],[45.50618,-73.81925],
      [45.50262,-73.81576],[45.50274,-73.81495],[45.5024,-73.81462],[45.50213,-73.81518],
      [45.50193,-73.81499],[45.50221,-73.81443],[45.50199,-73.8142],[45.5016,-73.81384],
      [45.50126,-73.81434],[45.4968,-73.81003],[45.49726,-73.80906],[45.49705,-73.80888],
      [45.50031,-73.80206],[45.49901,-73.80071],[45.50395,-73.79036],[45.50517,-73.79226],
      [45.50324,-73.7837],[45.50271,-73.78394],[45.50199,-73.78622],[45.50142,-73.78631],
      [45.49929,-73.78292],[45.50011,-73.7812],[45.49974,-73.78062],[45.5009,-73.77818],
      [45.4982,-73.77362],[45.49911,-73.77168],[45.50051,-73.77388],[45.50147,-73.77091],
      [45.50251,-73.77253],[45.50397,-73.76925],[45.5027,-73.76724],[45.50336,-73.76541],
      [45.50285,-73.76464],[45.50341,-73.76391],[45.50155,-73.76097],[45.5027,-73.75949],
      [45.50199,-73.75831],[45.50329,-73.75474],[45.50355,-73.75292],[45.50431,-73.75174],
      [45.51191,-73.76369],[45.51143,-73.76612],[45.51133,-73.77149],[45.51225,-73.78848],
      [45.51226,-73.79356],[45.51274,-73.79585],[45.51533,-73.79963],[45.5159,-73.80183],
      [45.51616,-73.80509],[45.51774,-73.81065],[45.51761,-73.81288],[45.5159,-73.82015],
      [45.51602,-73.82147],[45.51851,-73.8285],[45.51872,-73.83026],[45.51832,-73.83311],
      [45.51856,-73.84437],[45.51814,-73.84558],[45.51669,-73.84732],[45.51258,-73.8505],
      [45.51144,-73.85254],[45.51149,-73.85318],[45.50938,-73.85509],[45.50751,-73.85874],
      [45.50704,-73.85897],[45.50537,-73.85822],[45.50437,-73.85841],[45.50335,-73.85919],
      [45.50229,-73.8606],[45.50105,-73.86117],[45.49989,-73.86072],[45.4978,-73.85783],
      [45.49661,-73.85715],[45.49602,-73.85731],[45.49267,-73.85993],[45.49178,-73.86107],
      [45.49105,-73.86074],[45.49012,-73.86132],[45.48974,-73.86086],[45.48987,-73.86018],
      [45.48731,-73.85876],[45.47561,-73.87296],[45.4733,-73.87121],[45.47128,-73.87617],
      [45.47048,-73.87829],[45.47525,-73.882],[45.47446,-73.88262],[45.47317,-73.88562],
      [45.47188,-73.88672],[45.47056,-73.88853],[45.46944,-73.89469],[45.46726,-73.89823],
      [45.46598,-73.90121],[45.46557,-73.90272],[45.46526,-73.91017],[45.46421,-73.9139],
      [45.46425,-73.91512],[45.4651,-73.91655],[45.46605,-73.91723],[45.46824,-73.91765],
      [45.469,-73.91815],[45.46982,-73.91962],[45.47205,-73.92094],[45.47358,-73.92316],
      [45.47542,-73.92501],[45.47568,-73.9309],[45.47443,-73.93305],[45.47489,-73.93473],
      [45.4748,-73.93595],[45.47373,-73.9394],[45.46643,-73.97435],[45.45096,-73.93702],
      [45.4406,-73.9249],[45.44069,-73.92462],[45.441,-73.92481],[45.44163,-73.92283],
      [45.44201,-73.9231],[45.44772,-73.90796],[45.44843,-73.90556],[45.44678,-73.90435]
    ]
  }
];

// Neighborhood stats
function updateNeighborhoodsStats() {
	for (const neighbourhood of neighbourhoods) {
		const matchingEvents = [];
		for (const event of events) {
			const lat = Number(event.lat);
			const lng = Number(event.lng);
			if (Number.isNaN(lat) || Number.isNaN(lng)) {
				continue;
			}
			const isInside = pointInPolygon(
				[lat, lng],
				neighbourhood.polygon
			);
			if (isInside) {
				matchingEvents.push(event);
				// Assign neighbourhood name so filterEventsByArea() works for server events
				if (!event.neighbourhood) {
					event.neighbourhood = neighbourhood.name;
				}
			}
		}

		const genreCounts = {};
		for (const event of matchingEvents) {
			const genre = event.genre || "Unknown";
			genreCounts[genre] = (genreCounts[genre] || 0) + 1;
		}

		const total = matchingEvents.length;
		const genres = {};
		for (const [genre, count] of Object.entries(genreCounts)) {
			genres[genre] = total > 0
				? Math.round((count / total) * 100)
				: 0;
		}

		const topGenre = Object.entries(genreCounts)
			.sort((a, b) => b[1] - a[1])[0]?.[0] || null;
		neighbourhood.events = matchingEvents;
		neighbourhood.totalEvents = total;
		if (total > 0) {
			neighbourhood.genres = genres;
			neighbourhood.topGenre = topGenre;
		}
		// else: keep static topGenre/genres as fallback
	}
}

function pointInPolygon(point, polygon) {
	const lat = point[0];
	const lng = point[1];

	let inside = false;

	for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		const latI = polygon[i][0];
		const lngI = polygon[i][1];
		const latJ = polygon[j][0];
		const lngJ = polygon[j][1];

		const intersect =
			(lngI > lng) !== (lngJ > lng) &&
			lat < ((latJ - latI) * (lng - lngI)) / (lngJ - lngI) + latI;

		if (intersect) {
			inside = !inside;
		}
	}

	return inside;
}

// ─────────────────────────────────────────────
//  Map Setup
// ─────────────────────────────────────────────
const montreal = [45.5200, -73.6100];
const map = L.map("map").setView(montreal, 11);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
  opacity: 0.85
}).addTo(map);

// ─────────────────────────────────────────────
//  Zone & Label Layers
// ─────────────────────────────────────────────
let zoneLayer  = L.layerGroup().addTo(map);
let labelLayer = L.layerGroup().addTo(map);
let polyRefs   = {};
let labelRefs  = {};
let zonesVisible       = true;
let selectedNeighbourhood = null;

// ─────────────────────────────────────────────
//  Draw Neighbourhood Zones
// ─────────────────────────────────────────────
function drawNeighbourhoodZones() {
  zoneLayer.clearLayers();
  labelLayer.clearLayers();
  polyRefs  = {};
  labelRefs = {};

  neighbourhoods.forEach(n => {
    const color = genreColors[n.topGenre];

    const poly = L.polygon(n.polygon, {
      color:       color,
      fillColor:   color,
      fillOpacity: 0.10,
      weight:      1.5
    });

    const genreRows = Object.entries(n.genres)
      .sort((a,b) => b[1]-a[1])
      .slice(0,4)
      .map(([g, pct]) => `
        <div class="genre-row">
          <span class="genre-dot" style="background:${genreColors[g]}"></span>
          <span class="genre-name">${g}</span>
          <div class="genre-bar-wrap">
            <div class="genre-bar" style="width:${pct}%;background:${genreColors[g]}"></div>
          </div>
          <span class="genre-pct">${pct}%</span>
        </div>`).join("");

    const venueList = n.venues ? n.venues.map(v => `<span class="venue-tag">${v}</span>`).join("") : "";

    poly.bindPopup(`
      <div class="zone-popup">
        <div class="zone-header" style="border-left:4px solid ${color}">
          <strong>${n.name}</strong>
          <span class="top-badge" style="background:${color}">${n.topGenre}</span>
        </div>
        ${n.description ? `<p class="zone-desc">${n.description}</p>` : ""}
        <div class="genre-chart">${genreRows}</div>
        ${venueList ? `<div class="venue-list"><strong>🎤 Venues:</strong><br>${venueList}</div>` : ""}
      </div>
    `, { maxWidth: 320 });

    poly.on("mouseover", () => {
      if (selectedNeighbourhood && selectedNeighbourhood !== n.name) return;
      poly.setStyle({ fillOpacity: 0.28, weight: 2.5 });
      highlightNeighbourhood(n.name);
    });
    poly.on("mouseout", () => {
      if (selectedNeighbourhood === n.name) {
        poly.setStyle({ fillOpacity: 0.18, weight: 2 });
        return;
      }
      if (selectedNeighbourhood) return;
      poly.setStyle({ fillOpacity: 0.10, weight: 1.5 });
      clearHighlight();
    });
    poly.on("click", () => handleNeighbourhoodClick(n));

    zoneLayer.addLayer(poly);
    polyRefs[n.name] = poly;

    const label = L.divIcon({
      className: "zone-label",
      html: `<div style="border-color:${color};color:${color}"><span>${n.topGenre}</span></div>`,
      iconSize: [0, 0]
    });
    const labelMarker = L.marker(n.center, { icon: label, interactive: false });
    labelLayer.addLayer(labelMarker);
    labelRefs[n.name] = labelMarker;
  });
}

// ─────────────────────────────────────────────
//  Neighbourhood Selection / Isolation
// ─────────────────────────────────────────────
function handleNeighbourhoodClick(n) {
  if (selectedNeighbourhood === n.name) {
    deselectNeighbourhood();
  } else {
    selectNeighbourhood(n);
  }
}

function selectNeighbourhood(n) {
  selectedNeighbourhood = n.name;
  const color = genreColors[n.topGenre];

  Object.entries(polyRefs).forEach(([name, poly]) => {
    if (name === n.name) {
      poly.setStyle({ color, fillColor: color, opacity: 1, fillOpacity: 0.18, weight: 2 });
    } else {
      poly.setStyle({ opacity: 0, fillOpacity: 0 });
    }
  });

  Object.entries(labelRefs).forEach(([name, marker]) => {
    marker.setOpacity(name === n.name ? 1 : 0);
  });

  showNeighbourhoodDetail(n);
  filterEventsByArea(n.name);
}

function deselectNeighbourhood() {
  selectedNeighbourhood = null;
  restoreAllZones();
  document.getElementById("neighbourhoodDetail").classList.remove("visible");
  clearEventFilter();
}

function restoreAllZones() {
  neighbourhoods.forEach(n => {
    const color = genreColors[n.topGenre];
    const poly  = polyRefs[n.name];
    if (poly) poly.setStyle({ color, fillColor: color, opacity: 1, fillOpacity: 0.10, weight: 1.5 });
    const lbl = labelRefs[n.name];
    if (lbl) lbl.setOpacity(1);
  });
}

// ─────────────────────────────────────────────
//  Toggle Zones Visibility
// ─────────────────────────────────────────────
function toggleZones() {
  zonesVisible = !zonesVisible;
  const btn = document.getElementById("toggleZonesBtn");
  const eyeIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  if (zonesVisible) {
    map.addLayer(zoneLayer);
    map.addLayer(labelLayer);
    btn.innerHTML = eyeIcon + " Hide Zones";
    btn.classList.remove("zones-hidden");
  } else {
    map.removeLayer(zoneLayer);
    map.removeLayer(labelLayer);
    btn.innerHTML = eyeIcon + " Show Zones";
    btn.classList.add("zones-hidden");
  }
}

// ─────────────────────────────────────────────
//  Neighbourhood Detail Overlay
// ─────────────────────────────────────────────
function showNeighbourhoodDetail(n) {
  const panel = document.getElementById("neighbourhoodDetail");
  const color = genreColors[n.topGenre];

  const genreRows = Object.entries(n.genres)
    .sort((a,b) => b[1]-a[1])
    .map(([g, pct]) => `
      <div class="detail-genre-row">
        <div class="detail-genre-label">
          <span class="genre-dot" style="background:${genreColors[g]}"></span>${g}
        </div>
        <div class="detail-bar-wrap">
          <div class="detail-bar" style="width:${pct}%;background:${genreColors[g]};--target:${pct}%"></div>
        </div>
        <span class="detail-pct">${pct}%</span>
      </div>`).join("");

  const venueItems = n.venues ? n.venues.map(v => `<li>${v}</li>`).join("") : "";

  panel.innerHTML = `
    <div class="detail-header" style="background:${color}18;border-left:4px solid ${color}">
      <div>
        <div class="detail-name">${n.name}</div>
        <div class="detail-top">🎵 Top genre: <strong>${n.topGenre}</strong></div>
      </div>
      <button class="close-detail" onclick="closeDetail()">✕</button>
    </div>
    ${n.description ? `<p class="detail-desc">${n.description}</p>` : ""}
    <div class="detail-section">
      <div class="section-title">Music Taste Breakdown</div>
      ${genreRows}
    </div>
    ${venueItems ? `
    <div class="detail-section">
      <div class="section-title">🎤 Where to Perform</div>
      <ul class="venue-list-ul">${venueItems}</ul>
    </div>` : ""}
    <button class="perform-here-btn" style="background:${color}" onclick="filterEventsByArea('${n.name}')">
      🎸 Find Events Here
    </button>
  `;
  panel.classList.add("visible");
}

function closeDetail() {
  document.getElementById("neighbourhoodDetail").classList.remove("visible");
  if (selectedNeighbourhood) {
    selectedNeighbourhood = null;
    restoreAllZones();
    clearEventFilter();
  }
}

function highlightNeighbourhood(name) {
  document.querySelectorAll(".hood-card").forEach(c => {
    c.classList.toggle("hovered", c.dataset.name === name);
  });
}

function clearHighlight() {
  document.querySelectorAll(".hood-card").forEach(c => c.classList.remove("hovered"));
}

// ─────────────────────────────────────────────
//  Left Sidebar — Neighbourhood List
// ─────────────────────────────────────────────
function renderNeighbourhoodList() {
  const container = document.getElementById("hoodList");
  container.innerHTML = neighbourhoods.map(n => {
    const color = genreColors[n.topGenre];
    const top3 = Object.entries(n.genres).sort((a,b) => b[1]-a[1]).slice(0,3);
    return `
      <div class="hood-card" data-name="${n.name}"
        onclick="flyToNeighbourhood('${n.name}')"
        style="border-left:4px solid ${color}">
        <div class="hood-top">
          <span class="hood-name">${n.name}</span>
          <span class="hood-badge" style="background:${color}">${n.topGenre}</span>
        </div>
        <div class="hood-bars">
          ${top3.map(([g,p]) => `
            <div class="mini-bar-row">
              <span class="mini-label">${g}</span>
              <div class="mini-bar-bg">
                <div class="mini-bar" style="width:${p}%;background:${color}66"></div>
              </div>
            </div>`).join("")}
        </div>
      </div>`;
  }).join("");
}

function flyToNeighbourhood(name) {
  const n = neighbourhoods.find(x => x.name === name);
  if (!n) return;
  map.flyTo(n.center, 13, { duration: 1 });
  setTimeout(() => selectNeighbourhood(n), 800);
}

// ─────────────────────────────────────────────
//  Legend
// ─────────────────────────────────────────────
function renderLegend() {
  document.getElementById("genreLegend").innerHTML = Object.entries(genreColors).map(([g,c]) => `
    <div class="legend-item">
      <span class="legend-dot" style="background:${c}"></span>
      <span>${g}</span>
    </div>`).join("");
}

// ─────────────────────────────────────────────
//  Events
// ─────────────────────────────────────────────
let events = [];

async function loadEvents() {
	try {
		const response = await fetch(`${DOMAIN_URL}/server/events`);

		if (!response.ok) {
			throw new Error("Could not fetch events");
		}

		events = await response.json();

		console.log("Events loaded:");
		console.log(events);

		renderEvents();
	} catch (err) {
		console.error("Could not load events:", err.message);
		events = [];
		renderEvents();
	}
}

let eventMarkers = [];
let activeFilter = null;
let currentUserType = null;
let spotifyAudience = [];
let audienceMarkers = [];
let fanProfiles = JSON.parse(localStorage.getItem("liveNearFanProfiles") || "[]");

// SVG location-pin icon for map markers
function createPinIcon(color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 38" width="28" height="38">
    <filter id="ds" x="-30%" y="-10%" width="160%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.22"/>
    </filter>
    <path d="M14 0C6.268 0 0 6.268 0 14c0 5.25 2.88 9.84 7.14 12.33L14 38l6.86-11.67C25.12 23.84 28 19.25 28 14 28 6.268 21.732 0 14 0z"
      fill="${color}" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" filter="url(#ds)"/>
    <circle cx="14" cy="14" r="5.5" fill="white" opacity="0.92"/>
  </svg>`;
  return L.divIcon({
    className: "",
    html: svg,
    iconSize:    [28, 38],
    iconAnchor:  [14, 38],
    popupAnchor: [0,  -40]
  });
}

function getGenreIcon(genre) {
  const icons = {
    "Hip-Hop":"🎤","Jazz/Blues":"🎷","Indie/Alt":"🎸",
    "Electronic":"🎹","Classical":"🎻","Folk/World":"🪗",
    "Pop":"🎵","Rock":"🥁","Theatre":"🎭","Dance":"💃"
  };
  return icons[genre] || "🎵";
}

function renderEvents(filterNeighbourhood = null) {
  eventMarkers.forEach(m => map.removeLayer(m));
  eventMarkers = [];
  const eventList = document.getElementById("eventList");
  eventList.innerHTML = "";
  const filtered = filterNeighbourhood
    ? events.filter(e => e.neighbourhood === filterNeighbourhood)
    : events;

  if (filtered.length === 0) {
    eventList.innerHTML = `<p class="no-events">No events here yet.<br>Be the first to perform!</p>`;
    return;
  }

  filtered.forEach(event => {
    const color = genreColors[event.genre] || "#6b7280";
    const marker = L.marker([event.lat, event.lng], { icon: createPinIcon(color) })
      .addTo(map)
      .bindPopup(`
        <div class="event-popup">
          <strong>${getGenreIcon(event.genre)} ${event.artistName}</strong><br>
          <span style="color:${color}">${event.genre}</span><br>
          📍 ${event.locationName}<br>🕐 ${event.time}<br>
          👥 ${event.interested} interested<br>
          ${event.liveLink !== "#" ? `<a href="${event.liveLink}" target="_blank">▶ Watch Live</a>` : ""}
        </div>
      `);
    eventMarkers.push(marker);

    const card = document.createElement("div");
    card.className = "event-card";
    card.style.borderLeft = `4px solid ${color}`;
    card.innerHTML = `
      <div class="event-card-top">
        <span class="event-icon">${getGenreIcon(event.genre)}</span>
        <div>
          <h3>${event.artistName}</h3>
          <span class="event-genre-badge" style="background:${color}20;color:${color}">${event.genre}</span>
        </div>
      </div>
      <p>📍 ${event.locationName}</p>
      <p>🕐 ${event.time}</p>
      <p>👥 <span id="interest-${event.id}">${event.interested}</span> interested</p>
      <div class="event-actions">
        <button class="interested-btn" onclick="addInterest(${event.id})" style="background:${color}">★ Interested</button>
        ${event.liveLink !== "#" ? `<a href="${event.liveLink}" target="_blank" class="watch-btn">▶ Live</a>` : ""}
      </div>`;
    eventList.appendChild(card);
  });
}

function filterEventsByArea(neighbourhood) {
  activeFilter = neighbourhood;
  document.getElementById("eventsTitle").textContent = neighbourhood;
  document.getElementById("clearFilter").style.display = "inline-block";
  renderEvents(neighbourhood);
  document.getElementById("eventsPanel").scrollIntoView({ behavior: "smooth" });
}

function clearEventFilter() {
  activeFilter = null;
  document.getElementById("eventsTitle").textContent = "Live Events";
  document.getElementById("clearFilter").style.display = "none";
  renderEvents();
}

function addInterest(eventId) {
  const event = events.find(e => e.id === eventId);
  if (event) { event.interested++; renderEvents(activeFilter); }
}

// ─────────────────────────────────────────────
//  Create Event — geocodes via Nominatim
// ─────────────────────────────────────────────
async function addEvent() {
  const artistName   = document.getElementById("artistName").value.trim();
  const genre        = document.getElementById("genre").value.trim();
  const locationName = document.getElementById("locationName").value.trim();
  const timeInput    = document.getElementById("time").value;
  const liveLink     = document.getElementById("liveLink").value.trim();

  if (!locationName || !timeInput) {
    showFormError("Please fill in all required fields ★");
    return;
  }

  const btn = document.querySelector(".create-btn");
  btn.textContent = "📍 Locating…";
  btn.disabled = true;

  let lat, lng;
  try {
    const query = encodeURIComponent(`${locationName}, Montreal, Quebec, Canada`);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`,
      { headers: { "Accept-Language": "en" } }
    );
    const data = await res.json();
	if (data && data.length > 0) {
		lat = parseFloat(data[0].lat);
		lng = parseFloat(data[0].lon);
	} else {
		lat = 45.5017;
		lng = -73.5673;
	}
  } catch {
    const n = neighbourhoods.find(x => x.name === hood);
    const j = () => (Math.random() - 0.5) * 0.010;
    lat = (n ? n.center[0] : 45.5017) + j();
    lng = (n ? n.center[1] : -73.5673) + j();
  }
  
  const time = Math.floor(new Date(timeInput).getTime() / 1000);

  const event = await addEventServer({
    artistName,
	genre,
	locationName,
	time,
	lat,
	lng,
  });
  
  if (event != null) {
	events.push(event);
	updateNeighborhoodsStats();
	renderEvents();
	renderNeighbourhoodList();
	drawNeighbourhoodZones();
  }
	  

  ["artistName","genre","locationName","time","liveLink"].forEach(id => {
    document.getElementById(id).value = "";
  });

  renderEvents(activeFilter);
  map.flyTo([lat, lng], 15, { duration: 1.2 });

  btn.textContent = "✓ Event Created!";
  btn.style.background = "#059669";
  setTimeout(() => {
    btn.textContent = "Create Event";
    btn.style.background = "";
    btn.disabled = false;
  }, 2500);
}

async function addEventServer(eventData) {
	try {
		const formData = new FormData();

		formData.append("artistName", eventData.artistName);
		formData.append("genre", eventData.genre);
		formData.append("locationName", eventData.locationName);
		formData.append("lat", String(eventData.lat));
		formData.append("lng", String(eventData.lng));
		if (eventData.time !== undefined) {
			formData.append("time", String(eventData.time));
		}

		if (eventData.tags) {
			formData.append("tags", JSON.stringify(eventData.tags));
		}

		if (eventData.imageFile) {
			formData.append("image", eventData.imageFile);
		}

		const response = await fetch(`${DOMAIN_URL}/server/addevent`, {
			method: "POST",
			body: formData
		});

		const data = await response.json();

		if (!response.ok) {
			console.log("Create event failed:");
			console.log(data);
			return null;
		}

		console.log("Event created successfully:");
		console.log(data);
		
		return data.event;
	} catch (err) {
		console.error("Could not create event:", err);
		return null;
	}
}

function showFormError(msg) {
  const el = document.getElementById("formError");
  el.textContent = msg;
  el.style.display = "block";
  setTimeout(() => { el.style.display = "none"; }, 3000);
}

// ─────────────────────────────────────────────
//  Minimize Create Panel
// ─────────────────────────────────────────────
function toggleCreatePanel() {
  const body    = document.getElementById("createPanelBody");
  const btn     = document.getElementById("minimizeCreateBtn");
  const panel   = document.getElementById("createPanel");
  const collapsed = body.classList.toggle("collapsed");
  panel.classList.toggle("is-collapsed", collapsed);
  btn.textContent = collapsed ? "+" : "−";
}

// ─────────────────────────────────────────────
//  Genre Filter Tabs
// ─────────────────────────────────────────────
function renderGenreTabs() {
  const container = document.getElementById("genreTabs");
  const all = ["All", ...Object.keys(genreColors)];
  container.innerHTML = all.map(g => `
    <button class="genre-tab ${g==="All"?"active":""}"
      style="${g!=="All"?`--gc:${genreColors[g]}`:"--gc:#6b7280"}"
      onclick="filterByGenre('${g}', this)">
      ${g === "All" ? "All" : getGenreIcon(g)+" "+g}
    </button>`).join("");
}

function filterByGenre(genre, btn) {
  document.querySelectorAll(".genre-tab").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".hood-card").forEach(card => {
    const n = neighbourhoods.find(x => x.name === card.dataset.name);
    card.style.opacity = (genre === "All" || !n || n.topGenre === genre) ? "1" : "0.3";
  });
}

// Genre select
function populateGenreSelect() {
  const sel = document.getElementById("genre");
  if (!sel || sel.tagName !== "SELECT") return;
  sel.innerHTML = `<option value="">Any Genre</option>` +
    Object.keys(genreColors).map(genre =>
      `<option value="${genre}">${genre}</option>`
    ).join("");
}

// ─────────────────────────────────────────────
//  Neighbourhood Select
// ─────────────────────────────────────────────
function populateNeighbourhoodSelect() {
  const sel = document.getElementById("neighbourhoodSelect");
  if (!sel) return;
  sel.innerHTML = `<option value="">Select neighbourhood…</option>` +
    neighbourhoods.map(n =>
      `<option value="${n.name}">${n.name} (${n.topGenre})</option>`
    ).join("");
}

// ─────────────────────────────────────────────
//  Login + Spotify Audience
// ─────────────────────────────────────────────
function loginAs(type) {
  // Toggle off if already active
  if (currentUserType === type) {
    closePanel(type);
    return;
  }
  currentUserType = type;
  const creatorPanel = document.getElementById("creatorPanel");
  const fanPanel     = document.getElementById("fanPanel");
  const fanBtn       = document.getElementById("fanLoginBtn");
  const creatorBtn   = document.getElementById("creatorLoginBtn");

  if (creatorPanel) creatorPanel.style.display = type === "creator" ? "block" : "none";
  if (fanPanel)     fanPanel.style.display     = type === "fan"     ? "block" : "none";
  if (fanBtn)       fanBtn.classList.toggle("active",     type === "fan");
  if (creatorBtn)   creatorBtn.classList.toggle("active", type === "creator");
}

function closePanel(type) {
  currentUserType = null;
  const panel = document.getElementById(type === "fan" ? "fanPanel" : "creatorPanel");
  const btn   = document.getElementById(type === "fan" ? "fanLoginBtn" : "creatorLoginBtn");
  if (panel) panel.style.display = "none";
  if (btn)   btn.classList.remove("active");
}

function connectSpotifyAudience() {
  const artistLink = document.getElementById("spotifyArtistLink").value.trim();
  const rawText    = document.getElementById("spotifyCities").value.trim();
  const result     = document.getElementById("spotifyResult");

  if (!rawText) { result.innerHTML = "Paste city data first, example: Montreal, 4200"; return; }

  spotifyAudience = rawText.split("\n").map(line => {
    const parts = line.split(",");
    if (parts.length < 2) return null;
    return { city: parts[0].trim(), listeners: Number(parts[1].trim()) };
  }).filter(item => item && item.city && !Number.isNaN(item.listeners));

  if (spotifyAudience.length === 0) { result.innerHTML = "No valid Spotify audience data found."; return; }

  result.innerHTML = `
    <strong>Audience imported${artistLink ? " from Spotify link" : ""}:</strong>
    ${spotifyAudience.map(item => `
      <div class="audience-city">
        <span>${item.city}</span>
        <strong>${item.listeners} listeners</strong>
      </div>`).join("")}`;

  renderSpotifyAudienceMap();
}

function renderSpotifyAudienceMap() {
  audienceMarkers.forEach(m => map.removeLayer(m));
  audienceMarkers = [];

  const cityCoords = {
    "Montreal":    [45.5017, -73.5673],
    "Laval":       [45.6066, -73.7124],
    "Longueuil":   [45.5369, -73.5107],
    "Brossard":    [45.4501, -73.4658],
    "Terrebonne":  [45.7000, -73.6473],
    "Repentigny":  [45.7422, -73.4501],
    "Quebec City": [46.8139, -71.2080],
    "Québec":      [46.8139, -71.2080],
    "Ottawa":      [45.4215, -75.6972],
    "Toronto":     [43.6532, -79.3832]
  };

  const maxListeners = Math.max(...spotifyAudience.map(i => i.listeners));

  for (const item of spotifyAudience) {
    const coords = cityCoords[item.city];
    if (!coords) { console.warn("Unknown city:", item.city); continue; }
    const radius = 400 + (item.listeners / maxListeners) * 2200;
    const circle = L.circle(coords, {
      radius, color: "#1db954", fillColor: "#1db954", fillOpacity: 0.25, weight: 2
    }).addTo(map).bindPopup(`
      <div class="event-popup">
        <strong>🎧 Spotify Audience Estimate</strong><br>
        📍 ${item.city}<br>
        👥 ${item.listeners} listeners<br>
        <small>Approximate city-level fan demand.</small>
      </div>`);
    audienceMarkers.push(circle);
  }

  if (audienceMarkers.length > 0) {
    map.fitBounds(L.featureGroup(audienceMarkers).getBounds(), { padding: [40, 40] });
  }
}

function saveFanProfile() {
  const name       = document.getElementById("fanName").value.trim();
  const postalCode = document.getElementById("fanPostalCode").value.trim().toUpperCase();
  const genre      = document.getElementById("fanGenre").value.trim();

  if (!name || !postalCode || !genre) {
    alert("Please fill in your name, postal code, and favourite genre.");
    return;
  }

  fanProfiles.push({ id: Date.now(), name, postalCode, genre });
  localStorage.setItem("liveNearFanProfiles", JSON.stringify(fanProfiles));

  document.getElementById("fanName").value       = "";
  document.getElementById("fanPostalCode").value = "";
  document.getElementById("fanGenre").value      = "";

  alert("Fan profile saved. Creators can use this as approximate demand data.");
}

// ═════════════════════════════════════════════
//  Artist Finder — Modal UI
// ═════════════════════════════════════════════
function openFinderModal() {
  initFinderGenreChips();
  document.getElementById("finderModal").style.display = "flex";
  showFinderForm();
  document.body.style.overflow = "hidden";
}

function closeFinderModal() {
  document.getElementById("finderModal").style.display = "none";
  document.body.style.overflow = "";
}

function handleFinderOverlayClick(e) {
  if (e.target === document.getElementById("finderModal")) closeFinderModal();
}

function showFinderForm() {
  document.getElementById("finderForm").style.display    = "block";
  document.getElementById("finderResults").style.display = "none";
  document.getElementById("finderError").style.display   = "none";
}

function initFinderGenreChips() {
  const container = document.getElementById("finderGenreChips");
  if (container.children.length > 0) return;
  container.innerHTML = Object.entries(genreColors).map(([g, c]) => `
    <button class="finder-chip" data-genre="${g}"
      style="--chip-color:${c}"
      onclick="this.classList.toggle('selected')">
      ${getGenreIcon(g)} ${g}
    </button>`).join("");
}

// ─────────────────────────────────────────────
//  Scoring Algorithm
// ─────────────────────────────────────────────
function scoreNeighbourhood(n, inputs) {
  const meta = neighbourhoodMeta[n.name];
  if (!meta) return null;

  // 1. Genre match  — 0–40 pts
  let genreRaw = 50; // neutral if no genre selected
  if (inputs.genres.length > 0) {
    genreRaw = inputs.genres.reduce((sum, g) => sum + (n.genres[g] || 0), 0) / inputs.genres.length;
  }
  const genreScore = Math.round((genreRaw / 100) * 40);

  // 2. Venue / setting fit — 0–30 pts
  let venueScore = 0;
  switch (inputs.performanceType) {
    case "street":
      venueScore = meta.footTraffic * 7 + meta.streetFriendly * 3;
      break;
    case "park":
      venueScore = meta.parkAccess * 7 + (meta.footTraffic >= 2 ? 9 : 0);
      break;
    case "bar_cafe":
      venueScore = meta.venueQuality * 7 + (meta.footTraffic >= 2 ? 9 : 0);
      break;
    case "concert_hall":
      venueScore = meta.venueQuality * 10;
      break;
    case "community":
      venueScore = 10 + Math.min(10, Math.round(meta.population / 15)) + (meta.footTraffic >= 2 ? 10 : 0);
      break;
    case "festival":
      venueScore = meta.footTraffic * 5 + meta.parkAccess * 5 + (meta.vibeScore >= 7 ? 10 : 0);
      break;
    default:
      venueScore = 15;
  }
  venueScore = Math.min(30, Math.round(venueScore));

  // 3. Audience size fit — 0–20 pts
  const ticketed = inputs.performanceType === "concert_hall" || inputs.performanceType === "community";
  let audienceScore = 0;
  switch (inputs.crowdSize) {
    case "solo":
      audienceScore = 14 + meta.footTraffic * 2;
      break;
    case "small":
      audienceScore = 8 + meta.footTraffic * 4;
      break;
    case "medium":
      if (ticketed) {
        audienceScore = (meta.venueQuality >= 2 ? 8 : 3) + (meta.population > 80 ? 7 : 0) + (meta.population > 130 ? 5 : 0);
      } else {
        audienceScore = meta.footTraffic * 4 + (meta.venueQuality >= 2 ? 4 : 0) + (meta.population > 80 ? 6 : 0) + (meta.population > 130 ? 6 : 0);
      }
      break;
    case "large":
      if (ticketed) {
        audienceScore = (meta.venueQuality === 3 ? 12 : meta.venueQuality === 2 ? 6 : 0) + (meta.population > 80 ? 5 : 0) + (meta.population > 130 ? 3 : 0);
      } else {
        audienceScore = meta.footTraffic * 4 + (meta.venueQuality === 3 ? 6 : meta.venueQuality === 2 ? 3 : 0) + (meta.population > 80 ? 4 : 0) + (meta.population > 130 ? 3 : 0);
      }
      break;
    default:
      audienceScore = 10;
  }
  audienceScore = Math.min(20, Math.round(audienceScore));

  // 4. Arts scene vibe — 0–10 pts
  const vibeScore = Math.min(10, meta.vibeScore);

  // 5. Experience bonus — 0–5 pts
  let expBonus = 0;
  if (inputs.experience === "beginner") {
    expBonus = (meta.streetFriendly >= 2 ? 2 : 0) + (meta.footTraffic >= 2 ? 2 : 0) + (meta.vibeScore >= 6 ? 1 : 0);
  } else if (inputs.experience === "professional") {
    expBonus = meta.venueQuality === 3 ? 5 : meta.venueQuality === 2 ? 2 : 0;
  } else {
    expBonus = (meta.venueQuality >= 2 ? 2 : 0) + (meta.vibeScore >= 5 ? 1 : 0);
  }
  expBonus = Math.min(5, expBonus);

  const total = Math.min(100, genreScore + venueScore + audienceScore + vibeScore + expBonus);
  return { total, genreScore, venueScore, audienceScore, vibeScore, expBonus };
}

// ─────────────────────────────────────────────
//  Reason generation
// ─────────────────────────────────────────────
function buildReasons(n, meta, inputs) {
  const reasons = [];

  const genreMatches = inputs.genres
    .map(g => ({ genre: g, pct: n.genres[g] || 0 }))
    .filter(x => x.pct > 0)
    .sort((a, b) => b.pct - a.pct);

  if (genreMatches.length > 0) {
    const top = genreMatches[0];
    if (top.pct >= 30)      reasons.push(`${top.pct}% of residents actively listen to ${top.genre} — dominant local genre`);
    else if (top.pct >= 15) reasons.push(`${top.pct}% local audience enjoys ${top.genre} — solid built-in fan base`);
    else                    reasons.push(`${top.pct}% ${top.genre} listeners here — niche but passionate crowd`);
  } else if (inputs.genres.length === 0) {
    reasons.push("Broad audience open to all genres — great for experimental sets");
  } else {
    reasons.push("Eclectic audience — open to discovering new sounds");
  }

  const traffic = ["", "low foot traffic", "moderate foot traffic", "high foot traffic"][meta.footTraffic];
  switch (inputs.performanceType) {
    case "street":
      if (meta.streetFriendly === 3) reasons.push("Strong street performance culture — buskers are common and welcomed here");
      else if (meta.streetFriendly === 2) reasons.push(`${traffic} along commercial strips — decent busking exposure`);
      else reasons.push("Limited street performance spots — aim for the main commercial street");
      break;
    case "park":
      if (meta.parkAccess === 3) reasons.push("Excellent outdoor spaces — parks here regularly host live performances");
      else reasons.push("Parks available for outdoor sets — check permit requirements");
      break;
    case "bar_cafe":
      if (n.venues && n.venues.length > 0) reasons.push(`Known live music venues: ${n.venues.slice(0, 2).join(", ")}`);
      else reasons.push("Bar and café scene active — reach out to local spots for a slot");
      break;
    case "concert_hall":
      if (meta.venueQuality === 3) reasons.push(`Premier stages available: ${n.venues ? n.venues.slice(0, 2).join(", ") : ""}`);
      else if (meta.venueQuality === 2) reasons.push(`Mid-size venues: ${n.venues ? n.venues.join(", ") : ""}`);
      else reasons.push("Limited dedicated concert halls — community halls fill the gap");
      break;
    case "community":
      reasons.push(`Maison de la culture serves ~${meta.population}k local residents — captive community audience`);
      break;
    case "festival":
      if (meta.vibeScore >= 8) reasons.push("One of Montréal's top festival destinations — major events pass through here");
      else if (meta.vibeScore >= 5) reasons.push("Active outdoor event scene — neighbourhood festivals run May–September");
      else reasons.push("Quieter festival scene — good for smaller local events");
      break;
  }

  if (inputs.crowdSize === "large") {
    if (meta.footTraffic === 3) reasons.push("Maximum foot traffic in Montréal — best area to draw 200+ people");
    else if (meta.population > 130) reasons.push(`~${meta.population}k residents — large local population to draw from`);
    else reasons.push(`Population of ~${meta.population}k — promote ahead to fill a large crowd`);
  } else if (inputs.crowdSize === "medium" && meta.footTraffic >= 2) {
    reasons.push(`${traffic} — supports organic crowds of 50–200 without heavy promotion`);
  }

  if (meta.vibeScore >= 9) reasons.push("Montréal's #1 live music destination — every artist performs here eventually");
  else if (meta.vibeScore >= 7) reasons.push("Thriving arts scene with year-round live events and industry presence");
  else if (meta.vibeScore >= 5) reasons.push("Growing arts community — great for building a loyal local following");

  return reasons.slice(0, 3);
}

// ─────────────────────────────────────────────
//  Run the Finder
// ─────────────────────────────────────────────
function runFinderAlgorithm() {
  const genres = [...document.querySelectorAll(".finder-chip.selected")].map(el => el.dataset.genre);
  const crowdEl = document.querySelector("input[name='finderCrowd']:checked");
  const venueEl = document.querySelector("input[name='finderVenue']:checked");
  const expEl   = document.querySelector("input[name='finderExp']:checked");

  if (!crowdEl || !venueEl || !expEl) {
    const err = document.getElementById("finderError");
    err.textContent = "Please answer all three questions to continue.";
    err.style.display = "block";
    return;
  }

  const inputs = {
    genres:          genres,
    crowdSize:       crowdEl.value,
    performanceType: venueEl.value,
    experience:      expEl.value
  };

  const scored = neighbourhoods
    .map(n => {
      const scores = scoreNeighbourhood(n, inputs);
      return scores ? { n, scores } : null;
    })
    .filter(Boolean)
    .sort((a, b) => b.scores.total - a.scores.total)
    .slice(0, 3);

  renderFinderResults(scored, inputs);
}

// ─────────────────────────────────────────────
//  Render Results
// ─────────────────────────────────────────────
function renderFinderResults(ranked, inputs) {
  const venueLabels = {
    street:       "Street / Busking",
    park:         "Park / Outdoor",
    bar_cafe:     "Bar & Café",
    concert_hall: "Concert Hall",
    community:    "Community Center",
    festival:     "Festival / Event"
  };
  const crowdLabels = {
    solo:   "intimate", small: "small crowd (<50)",
    medium: "medium crowd (50–200)", large: "large crowd (200+)"
  };

  const sub = [
    inputs.genres.length > 0 ? `${inputs.genres.join(" & ")} · ` : "",
    `${venueLabels[inputs.performanceType]} · ${crowdLabels[inputs.crowdSize]}`
  ].join("");

  document.getElementById("finderResultsSub").textContent = sub;

  const rankColors = ["#f59e0b", "#64748b", "#b45309"];
  const rankLabels = ["#1", "#2", "#3"];

  const list = document.getElementById("finderResultsList");
  list.innerHTML = ranked.map(({ n, scores }, i) => {
    const meta     = neighbourhoodMeta[n.name];
    const color    = genreColors[n.topGenre];
    const reasons  = buildReasons(n, meta, inputs);
    const spots    = (meta.hotspots[inputs.performanceType] || meta.hotspots.street).slice(0, 2);
    const pct      = scores.total;

    const reasonsHtml = reasons.map(r => `<li>${r}</li>`).join("");
    const spotsHtml   = spots.map(s => `<div class="result-address-spot">${s}</div>`).join("");

    return `
      <div class="result-card rank-${i+1}">
        <div class="result-top">
          <div class="result-rank-badge">${rankLabels[i]}</div>
          <div class="result-info">
            <div class="result-name">${n.name}</div>
            <div class="result-score-row">
              <div class="result-score-bg">
                <div class="result-score-fill" style="width:${pct}%"></div>
              </div>
              <span class="result-score-num" style="color:${rankColors[i]}">${pct}%</span>
            </div>
          </div>
          <span style="background:${color};color:#fff;font-size:10px;font-weight:700;padding:3px 8px;border-radius:999px;white-space:nowrap;flex-shrink:0;align-self:flex-start;margin-top:4px">${n.topGenre}</span>
        </div>

        <ul class="result-reasons">${reasonsHtml}</ul>

        <div class="result-address">
          <div class="result-address-label">Recommended spots</div>
          ${spotsHtml}
        </div>

        <button class="result-explore-btn"
          onclick="exploreFromFinder('${n.name}')">
          Explore ${n.name} on Map →
        </button>
      </div>`;
  }).join("");

  document.getElementById("finderForm").style.display    = "none";
  document.getElementById("finderResults").style.display = "block";
}

function exploreFromFinder(name) {
  closeFinderModal();
  const n = neighbourhoods.find(x => x.name === name);
  if (!n) return;
  map.flyTo(n.center, 13, { duration: 1 });
  setTimeout(() => selectNeighbourhood(n), 900);
}

// ─────────────────────────────────────────────
//  Init
// ─────────────────────────────────────────────
async function init() {
  await loadEvents();
  updateNeighborhoodsStats();
  drawNeighbourhoodZones();
  renderNeighbourhoodList();
  renderLegend();
  renderEvents();
  renderGenreTabs();
  populateGenreSelect();
  populateNeighbourhoodSelect();
}

init();

document.getElementById("fanLoginBtn")?.addEventListener("click", () => loginAs("fan"));
document.getElementById("creatorLoginBtn")?.addEventListener("click", () => loginAs("creator"));
document.getElementById("saveFanBtn")?.addEventListener("click", saveFanProfile);
