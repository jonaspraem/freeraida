import 'rxjs';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';

// Requires all flag images A to Z
// A
const abkhazia = require('../../images/flags/abkhazia.png');
const afghanistan = require('../../images/flags/afghanistan.png');
const aland_islands = require('../../images/flags/aland-islands.png');
const albania = require('../../images/flags/albania.png');
const algeria = require('../../images/flags/algeria.png');
const american_samoa = require('../../images/flags/american-samoa.png');
const andorra = require('../../images/flags/andorra.png');
const anguilla = require('../../images/flags/anguilla.png');
const antigua_and_barbuda = require('../../images/flags/antigua-and-barbuda.png');
const argentina = require('../../images/flags/argentina.png');
const armenia = require('../../images/flags/armenia.png');
const aruba = require('../../images/flags/aruba.png');
const australia = require('../../images/flags/australia.png');
const austria = require('../../images/flags/austria.png');
const azerbaijan = require('../../images/flags/azerbaijan.png');
const azores_islands = require('../../images/flags/azores-islands.png');

// B
const bahamas = require('../../images/flags/bahamas.png');
const bahrain = require('../../images/flags/bahrain.png');
const balearic_islands = require('../../images/flags/balearic-islands.png');
const bangladesh = require('../../images/flags/bangladesh.png');
const barbados = require('../../images/flags/barbados.png');
const basque_country = require('../../images/flags/basque-country.png');
const belarus = require('../../images/flags/belarus.png');
const belgium = require('../../images/flags/belgium.png');
const belize = require('../../images/flags/belize.png');
const benin = require('../../images/flags/benin.png');
const bermuda = require('../../images/flags/bermuda.png');
const bhutan = require('../../images/flags/bhutan-1.png');
const bolivia = require('../../images/flags/bolivia.png');
const bonaire = require('../../images/flags/bonaire.png');
const bosnia_and_herzegovina = require('../../images/flags/bosnia-and-herzegovina.png');
const botswana = require('../../images/flags/botswana.png');
const brazil = require('../../images/flags/brazil.png');
const british_columbia = require('../../images/flags/british-columbia.png');
const british_indian_ocean_territory = require('../../images/flags/british-indian-ocean-territory.png');
const british_virgin_islands = require('../../images/flags/british-virgin-islands.png');
const brunei = require('../../images/flags/brunei.png');
const bulgaria = require('../../images/flags/bulgaria.png');
const burkina_faso = require('../../images/flags/burkina-faso.png');
const burundi = require('../../images/flags/burundi.png');

// C
const cambodia = require('../../images/flags/cambodia.png');
const cameroon = require('../../images/flags/cameroon.png');
const canada = require('../../images/flags/canada.png');
const canary_islands = require('../../images/flags/canary-islands.png');
const cape_verde = require('../../images/flags/cape-verde.png');
const cayman_islands = require('../../images/flags/cayman-islands.png');
const central_african_republic = require('../../images/flags/central-african-republic.png');
const ceuta = require('../../images/flags/ceuta.png');
const chad = require('../../images/flags/chad.png');
const chile = require('../../images/flags/chile.png');
const china = require('../../images/flags/china.png');
const christmas_island = require('../../images/flags/christmas-island.png');
const cocos_island = require('../../images/flags/cocos-island.png');
const colombia = require('../../images/flags/colombia.png');
const comoros = require('../../images/flags/comoros.png');
const congo = require('../../images/flags/congo.png');
const cook_islands = require('../../images/flags/cook-islands.png');
const corsica = require('../../images/flags/corsica.png');
const costa_rica = require('../../images/flags/costa-rica.png');
const croatia = require('../../images/flags/croatia.png');
const cuba = require('../../images/flags/cuba.png');
const curacao = require('../../images/flags/curacao.png');
const cyprus = require('../../images/flags/cyprus.png');
const czech_republic = require('../../images/flags/czech-republic.png');

// D
const democratic_republic_of_congo = require('../../images/flags/democratic-republic-of-congo.png');
const denmark = require('../../images/flags/denmark.png');
const djibouti = require('../../images/flags/djibouti.png');
const dominica = require('../../images/flags/dominica.png');
const dominican_republic = require('../../images/flags/dominican-republic.png');

// E
const east_timor = require('../../images/flags/east-timor.png');
const ecuador = require('../../images/flags/ecuador.png');
const egypt = require('../../images/flags/egypt.png');
const england = require('../../images/flags/england.png');
const equatorial_guinea = require('../../images/flags/equatorial-guinea.png');
const eritrea = require('../../images/flags/eritrea.png');
const estonia = require('../../images/flags/estonia.png');
const ethiopia = require('../../images/flags/ethiopia.png');
const european_union = require('../../images/flags/european-union.png');

// F
const falkland_islands = require('../../images/flags/falkland-islands.png');
const faroe_islands = require('../../images/flags/faroe-islands.png');
const fiji = require('../../images/flags/fiji.png');
const finland = require('../../images/flags/finland.png');
const france = require('../../images/flags/france.png');
const french_polynesia = require('../../images/flags/french-polynesia.png');

// G
const gabon = require('../../images/flags/gabon.png');
const galapagos_islands = require('../../images/flags/galapagos-islands.png');
const gambia = require('../../images/flags/gambia.png');
const georgia = require('../../images/flags/georgia.png');
const germany = require('../../images/flags/germany.png');
const ghana = require('../../images/flags/ghana.png');
const gibraltar = require('../../images/flags/gibraltar.png');
const greece = require('../../images/flags/greece.png');
const greenland = require('../../images/flags/greenland.png');
const grenada = require('../../images/flags/grenada.png');
const guam = require('../../images/flags/guam.png');
const guatemala = require('../../images/flags/guatemala.png');
const guernsey = require('../../images/flags/guernsey.png');
const guinea = require('../../images/flags/guinea.png');
const guinea_bissau = require('../../images/flags/guinea-bissau.png');
const guyana = require('../../images/flags/guyana.png');

// H
const haiti = require('../../images/flags/haiti.png');
const hawaii = require('../../images/flags/hawaii.png');
const honduras = require('../../images/flags/honduras.png');
const hong_kong = require('../../images/flags/hong-kong.png');
const hungary = require('../../images/flags/hungary.png');

// I
const iceland = require('../../images/flags/iceland.png');
const india = require('../../images/flags/india.png');
const indonesia = require('../../images/flags/indonesia.png');
const iran = require('../../images/flags/iran.png');
const iraq = require('../../images/flags/iraq.png');
const ireland = require('../../images/flags/ireland.png');
const isle_of_man = require('../../images/flags/isle-of-man.png');
const israel = require('../../images/flags/israel.png');
const ivory_coast = require('../../images/flags/ivory-coast.png');

// J
const jamaica = require('../../images/flags/jamaica.png');
const japan = require('../../images/flags/japan.png');
const jersey = require('../../images/flags/jersey.png');
const jordan = require('../../images/flags/jordan.png');

// K
const kazakhstan = require('../../images/flags/kazakhstan.png');
const kenya = require('../../images/flags/kenya.png');
const kiribati = require('../../images/flags/kiribati.png');
const kosovo = require('../../images/flags/kosovo.png');
const kuwait = require('../../images/flags/kuwait.png');
const kyrgyzstan = require('../../images/flags/kyrgyzstan.png');

// L
const laos = require('../../images/flags/laos.png');
const latvia = require('../../images/flags/latvia.png');
const lebanon = require('../../images/flags/lebanon.png');
const lesotho = require('../../images/flags/lesotho.png');
const liberia = require('../../images/flags/liberia.png');
const libya = require('../../images/flags/libya.png');
const liechtenstein = require('../../images/flags/liechtenstein.png');
const lithuania = require('../../images/flags/lithuania.png');
const luxembourg = require('../../images/flags/luxembourg.png');

// M
const macao = require('../../images/flags/macao.png');
const macedonia = require('../../images/flags/macedonia.png');
const madagascar = require('../../images/flags/madagascar.png');
const madeira = require('../../images/flags/madeira.png');
const malawi = require('../../images/flags/malawi.png');
const malaysia = require('../../images/flags/malaysia.png');
const maldives = require('../../images/flags/maldives.png');
const mali = require('../../images/flags/mali.png');
const malta = require('../../images/flags/malta.png');
const marshall_island = require('../../images/flags/marshall-island.png');
const martinique = require('../../images/flags/martinique.png');
const mauritania = require('../../images/flags/mauritania.png');
const mauritius = require('../../images/flags/mauritius.png');
const melilla = require('../../images/flags/melilla.png');
const mexico = require('../../images/flags/mexico.png');
const micronesia = require('../../images/flags/micronesia.png');
const moldova = require('../../images/flags/moldova.png');
const monaco = require('../../images/flags/monaco.png');
const mongolia = require('../../images/flags/mongolia.png');
const montenegro = require('../../images/flags/montenegro.png');
const montserrat = require('../../images/flags/montserrat.png');
const morocco = require('../../images/flags/morocco.png');
const mozambique = require('../../images/flags/mozambique.png');
const myanmar = require('../../images/flags/myanmar.png');

// N
const namibia = require('../../images/flags/namibia.png');
const nato = require('../../images/flags/nato.png');
const nauru = require('../../images/flags/nauru.png');
const nepal = require('../../images/flags/nepal.png');
const netherlands = require('../../images/flags/netherlands.png');
const new_zealand = require('../../images/flags/new-zealand.png');
const nicaragua = require('../../images/flags/nicaragua.png');
const niger = require('../../images/flags/niger.png');
const nigeria = require('../../images/flags/nigeria.png');
const niue = require('../../images/flags/niue.png');
const norfolk_island = require('../../images/flags/norfolk-island.png');
const north_korea = require('../../images/flags/north-korea.png');
const northern_cyprus = require('../../images/flags/northern-cyprus.png');
const northern_marianas_islands = require('../../images/flags/northern-marianas-islands.png');
const norway = require('../../images/flags/norway.png');

// O
const oman = require('../../images/flags/oman.png');
const orkney_islands = require('../../images/flags/orkney-islands.png');
const ossetia = require('../../images/flags/ossetia.png');

// P
const pakistan = require('../../images/flags/pakistan.png');
const palau = require('../../images/flags/palau.png');
const palestine = require('../../images/flags/palestine.png');
const panama = require('../../images/flags/panama.png');
const papua_new_guinea = require('../../images/flags/papua-new-guinea.png');
const paraguay = require('../../images/flags/paraguay.png');
const peru = require('../../images/flags/peru.png');
const philippines = require('../../images/flags/philippines.png');
const pitcairn_islands = require('../../images/flags/pitcairn-islands.png');
const poland = require('../../images/flags/poland.png');
const portugal = require('../../images/flags/portugal.png');
const puerto_rico = require('../../images/flags/puerto-rico.png');

// Q
const qatar = require('../../images/flags/qatar.png');

// R
const rapa_nui = require('../../images/flags/rapa-nui.png');
const romania = require('../../images/flags/romania.png');
const russia = require('../../images/flags/russia.png');
const rwanda = require('../../images/flags/rwanda.png');

// S
const saba_island = require('../../images/flags/saba-island.png');
const saint_kitts_and_nevis = require('../../images/flags/saint-kitts-and-nevis.png');
const salvador = require('../../images/flags/salvador.png');
const samoa = require('../../images/flags/samoa.png');
const san_marino = require('../../images/flags/san-marino.png');
const sao_tome_and_principe = require('../../images/flags/sao-tome-and-principe.png');
const sardinia = require('../../images/flags/sardinia.png');
const saudi_arabia = require('../../images/flags/saudi-arabia.png');
const scotland = require('../../images/flags/scotland.png');
const senegal = require('../../images/flags/senegal.png');
const serbia = require('../../images/flags/serbia.png');
const seychelles = require('../../images/flags/seychelles.png');
const sierra_leone = require('../../images/flags/sierra-leone.png');
const singapore = require('../../images/flags/singapore.png');
const sint_eustatius = require('../../images/flags/sint-eustatius.png');
const sint_maarten = require('../../images/flags/sint-maarten.png');
const slovakia = require('../../images/flags/slovakia.png');
const slovenia = require('../../images/flags/slovenia.png');
const solomon_islands = require('../../images/flags/solomon-islands.png');
const somalia = require('../../images/flags/somalia.png');
const somaliland = require('../../images/flags/somaliland.png');
const south_africa = require('../../images/flags/south-africa.png');
const south_korea = require('../../images/flags/south-korea.png');
const south_sudan = require('../../images/flags/south-sudan.png');
const spain = require('../../images/flags/spain.png');
const sri_lanka = require('../../images/flags/sri-lanka.png');
const st_barthelemy = require('../../images/flags/st-barthelemy.png');
const st_lucia = require('../../images/flags/st-lucia.png');
const st_vincent_and_the_grenadines = require('../../images/flags/st-vincent-and-the-grenadines.png');
const sudan = require('../../images/flags/sudan.png');
const suriname = require('../../images/flags/suriname.png');
const swaziland = require('../../images/flags/swaziland.png');
const sweden = require('../../images/flags/sweden.png');
const switzerland = require('../../images/flags/switzerland.png');
const syria = require('../../images/flags/syria.png');

// T
const taiwan = require('../../images/flags/taiwan.png');
const tajikistan = require('../../images/flags/tajikistan.png');
const tanzania = require('../../images/flags/tanzania.png');
const thailand = require('../../images/flags/thailand.png');
const tibet = require('../../images/flags/tibet.png');
const togo = require('../../images/flags/togo.png');
const tokelau = require('../../images/flags/tokelau.png');
const tonga = require('../../images/flags/tonga.png');
const transnistria = require('../../images/flags/transnistria.png');
const trinidad_and_tobago = require('../../images/flags/trinidad-and-tobago.png');
const tunisia = require('../../images/flags/tunisia.png');
const turkey = require('../../images/flags/turkey.png');
const turkmenistan = require('../../images/flags/turkmenistan.png');
const turks_and_caicos = require('../../images/flags/turks-and-caicos.png');
const tuvalu = require('../../images/flags/tuvalu.png');

// U
const uganda = require('../../images/flags/uganda.png');
const ukraine = require('../../images/flags/ukraine.png');
const united_arab_emirates = require('../../images/flags/united-arab-emirates.png');
const united_kingdom = require('../../images/flags/united-kingdom.png');
const united_nations = require('../../images/flags/united-nations.png');
const united_states_of_america = require('../../images/flags/united-states-of-america.png');
const uruguay = require('../../images/flags/uruguay.png');
const uzbekistan = require('../../images/flags/uzbekistan.png');

// V
const vanuatu = require('../../images/flags/vanuatu.png');
const vatican_city = require('../../images/flags/vatican-city.png');
const venezuela = require('../../images/flags/venezuela.png');
const vietnam = require('../../images/flags/vietnam.png');
const virgin_islands = require('../../images/flags/virgin-islands.png');

// W
const wales = require('../../images/flags/wales.png');
const western_sahara = require('../../images/flags/western-sahara.png');

// X

// Y
const yemen = require('../../images/flags/yemen.png');

// Z
const zambia = require('../../images/flags/zambia.png');
const zimbabwe = require('../../images/flags/zimbabwe.png');

@Injectable()
export class FLAG_DICTIONARY {
  private static flagmap: Map<string, string> = new Map<string, string>();

  static initialize() {
    // From a to z

    // A
    FLAG_DICTIONARY.flagmap.set('Abkhazia', abkhazia);
    FLAG_DICTIONARY.flagmap.set('Afghanistan', afghanistan);
    FLAG_DICTIONARY.flagmap.set('Aland Islands', aland_islands);
    FLAG_DICTIONARY.flagmap.set('Albania', albania);
    FLAG_DICTIONARY.flagmap.set('Algeria', algeria);
    FLAG_DICTIONARY.flagmap.set('American Samoa', american_samoa);
    FLAG_DICTIONARY.flagmap.set('Andorra', andorra);
    FLAG_DICTIONARY.flagmap.set('Anguilla', anguilla);
    FLAG_DICTIONARY.flagmap.set('Antigua and Barbuda', antigua_and_barbuda);
    FLAG_DICTIONARY.flagmap.set('Argentina', argentina);
    FLAG_DICTIONARY.flagmap.set('Armenia', armenia);
    FLAG_DICTIONARY.flagmap.set('Aruba', aruba);
    FLAG_DICTIONARY.flagmap.set('Australia', australia);
    FLAG_DICTIONARY.flagmap.set('Austria', austria);
    FLAG_DICTIONARY.flagmap.set('Azerbaijan', azerbaijan);
    FLAG_DICTIONARY.flagmap.set('Azores Islands', azores_islands);

    // B
    FLAG_DICTIONARY.flagmap.set('Bahamas', bahamas);
    FLAG_DICTIONARY.flagmap.set('Bahrain', bahrain);
    FLAG_DICTIONARY.flagmap.set('Balearic Islands', balearic_islands);
    FLAG_DICTIONARY.flagmap.set('Bangladesh', bangladesh);
    FLAG_DICTIONARY.flagmap.set('Barbados', barbados);
    FLAG_DICTIONARY.flagmap.set('Basque Country', basque_country);
    FLAG_DICTIONARY.flagmap.set('Belarus', belarus);
    FLAG_DICTIONARY.flagmap.set('Belgium', belgium);
    FLAG_DICTIONARY.flagmap.set('Belize', belize);
    FLAG_DICTIONARY.flagmap.set('Benin', benin);
    FLAG_DICTIONARY.flagmap.set('Bermuda', bermuda);
    FLAG_DICTIONARY.flagmap.set('Bhutan', bhutan);
    FLAG_DICTIONARY.flagmap.set('Bolivia', bolivia);
    FLAG_DICTIONARY.flagmap.set('Bonaire', bonaire);
    FLAG_DICTIONARY.flagmap.set('Bosnia and Herzegovina', bosnia_and_herzegovina);
    FLAG_DICTIONARY.flagmap.set('Botswana', botswana);
    FLAG_DICTIONARY.flagmap.set('Brazil', brazil);
    FLAG_DICTIONARY.flagmap.set('British Columbia', british_columbia);
    FLAG_DICTIONARY.flagmap.set('British Indian Ocean Territory', british_indian_ocean_territory);
    FLAG_DICTIONARY.flagmap.set('British Virgin Islands', british_virgin_islands);
    FLAG_DICTIONARY.flagmap.set('Brunei', brunei);
    FLAG_DICTIONARY.flagmap.set('Bulgaria', bulgaria);
    FLAG_DICTIONARY.flagmap.set('Burkina Faso', burkina_faso);
    FLAG_DICTIONARY.flagmap.set('Burundi', burundi);

    // C
    FLAG_DICTIONARY.flagmap.set('Cambodia', cambodia);
    FLAG_DICTIONARY.flagmap.set('Cameroon', cameroon);
    FLAG_DICTIONARY.flagmap.set('Canada', canada);
    FLAG_DICTIONARY.flagmap.set('Canary Islands', canary_islands);
    FLAG_DICTIONARY.flagmap.set('Cape Verde', cape_verde);
    FLAG_DICTIONARY.flagmap.set('Cayman Islands', cayman_islands);
    FLAG_DICTIONARY.flagmap.set('Central African Republic', central_african_republic);
    FLAG_DICTIONARY.flagmap.set('Ceuta', ceuta);
    FLAG_DICTIONARY.flagmap.set('Chad', chad);
    FLAG_DICTIONARY.flagmap.set('Chile', chile);
    FLAG_DICTIONARY.flagmap.set('China', china);
    FLAG_DICTIONARY.flagmap.set('Christmas Island', christmas_island);
    FLAG_DICTIONARY.flagmap.set('Cocos Island', cocos_island);
    FLAG_DICTIONARY.flagmap.set('Colombia', colombia);
    FLAG_DICTIONARY.flagmap.set('Comoros', comoros);
    FLAG_DICTIONARY.flagmap.set('Congo', congo);
    FLAG_DICTIONARY.flagmap.set('Cook Islands', cook_islands);
    FLAG_DICTIONARY.flagmap.set('Corsica', corsica);
    FLAG_DICTIONARY.flagmap.set('Costa Rica', costa_rica);
    FLAG_DICTIONARY.flagmap.set('Croatia', croatia);
    FLAG_DICTIONARY.flagmap.set('Cuba', cuba);
    FLAG_DICTIONARY.flagmap.set('Curacao', curacao);
    FLAG_DICTIONARY.flagmap.set('Cyprus', cyprus);
    FLAG_DICTIONARY.flagmap.set('Czech Republic', czech_republic);

    // D
    FLAG_DICTIONARY.flagmap.set('Democratic Republic of Congo', democratic_republic_of_congo);
    FLAG_DICTIONARY.flagmap.set('Denmark', denmark);
    FLAG_DICTIONARY.flagmap.set('Djibouti', djibouti);
    FLAG_DICTIONARY.flagmap.set('Dominica', dominica);
    FLAG_DICTIONARY.flagmap.set('Dominican Republic', dominican_republic);

    // E
    FLAG_DICTIONARY.flagmap.set('East Timor', east_timor);
    FLAG_DICTIONARY.flagmap.set('Ecuador', ecuador);
    FLAG_DICTIONARY.flagmap.set('Egypt', egypt);
    FLAG_DICTIONARY.flagmap.set('England', england);
    FLAG_DICTIONARY.flagmap.set('Equatorial Guinea', equatorial_guinea);
    FLAG_DICTIONARY.flagmap.set('Eritrea', eritrea);
    FLAG_DICTIONARY.flagmap.set('Estonia', estonia);
    FLAG_DICTIONARY.flagmap.set('Ethiopia', ethiopia);
    FLAG_DICTIONARY.flagmap.set('European Union', european_union);

    // F
    FLAG_DICTIONARY.flagmap.set('Falkland Islands', falkland_islands);
    FLAG_DICTIONARY.flagmap.set('Faroe Islands', faroe_islands);
    FLAG_DICTIONARY.flagmap.set('Fiji', fiji);
    FLAG_DICTIONARY.flagmap.set('Finland', finland);
    FLAG_DICTIONARY.flagmap.set('France', france);
    FLAG_DICTIONARY.flagmap.set('French Polynesia', french_polynesia);

    // G
    FLAG_DICTIONARY.flagmap.set('Gabon', gabon);
    FLAG_DICTIONARY.flagmap.set('Galapagos Islands', galapagos_islands);
    FLAG_DICTIONARY.flagmap.set('Gambia', gambia);
    FLAG_DICTIONARY.flagmap.set('Georgia', georgia);
    FLAG_DICTIONARY.flagmap.set('Germany', germany);
    FLAG_DICTIONARY.flagmap.set('Ghana', ghana);
    FLAG_DICTIONARY.flagmap.set('Gibraltar', gibraltar);
    FLAG_DICTIONARY.flagmap.set('Greece', greece);
    FLAG_DICTIONARY.flagmap.set('Greenland', greenland);
    FLAG_DICTIONARY.flagmap.set('Grenada', grenada);
    FLAG_DICTIONARY.flagmap.set('Guam', guam);
    FLAG_DICTIONARY.flagmap.set('Guatemala', guatemala);
    FLAG_DICTIONARY.flagmap.set('Guernsey', guernsey);
    FLAG_DICTIONARY.flagmap.set('Guinea', guinea);
    FLAG_DICTIONARY.flagmap.set('Guinea Bissau', guinea_bissau);
    FLAG_DICTIONARY.flagmap.set('Guyana', guyana);

    // H
    FLAG_DICTIONARY.flagmap.set('Haiti', haiti);
    FLAG_DICTIONARY.flagmap.set('Hawaii', hawaii);
    FLAG_DICTIONARY.flagmap.set('Honduras', honduras);
    FLAG_DICTIONARY.flagmap.set('Hong Kong', hong_kong);
    FLAG_DICTIONARY.flagmap.set('Hungary', hungary);

    // I
    FLAG_DICTIONARY.flagmap.set('Iceland', iceland);
    FLAG_DICTIONARY.flagmap.set('India', india);
    FLAG_DICTIONARY.flagmap.set('Indonesia', indonesia);
    FLAG_DICTIONARY.flagmap.set('Iran', iran);
    FLAG_DICTIONARY.flagmap.set('Iraq', iraq);
    FLAG_DICTIONARY.flagmap.set('Ireland', ireland);
    FLAG_DICTIONARY.flagmap.set('Isle of Man', isle_of_man);
    FLAG_DICTIONARY.flagmap.set('Israel', israel);
    FLAG_DICTIONARY.flagmap.set('Ivory Coast', ivory_coast);

    // J
    FLAG_DICTIONARY.flagmap.set('Jamaica', jamaica);
    FLAG_DICTIONARY.flagmap.set('Japan', japan);
    FLAG_DICTIONARY.flagmap.set('Jersey', jersey);
    FLAG_DICTIONARY.flagmap.set('Jordan', jordan);

    // K
    FLAG_DICTIONARY.flagmap.set('Kazakhstan', kazakhstan);
    FLAG_DICTIONARY.flagmap.set('Kenya', kenya);
    FLAG_DICTIONARY.flagmap.set('Kiribati', kiribati);
    FLAG_DICTIONARY.flagmap.set('Kosovo', kosovo);
    FLAG_DICTIONARY.flagmap.set('Kuwait', kuwait);
    FLAG_DICTIONARY.flagmap.set('Kyrgyzstan', kyrgyzstan);

    // L
    FLAG_DICTIONARY.flagmap.set('Laos', laos);
    FLAG_DICTIONARY.flagmap.set('Latvia', latvia);
    FLAG_DICTIONARY.flagmap.set('Lebanon', lebanon);
    FLAG_DICTIONARY.flagmap.set('Lesotho', lesotho);
    FLAG_DICTIONARY.flagmap.set('Liberia', liberia);
    FLAG_DICTIONARY.flagmap.set('Libya', libya);
    FLAG_DICTIONARY.flagmap.set('Liechtenstein', liechtenstein);
    FLAG_DICTIONARY.flagmap.set('Lithuania', lithuania);
    FLAG_DICTIONARY.flagmap.set('Luxembourg', luxembourg);

    // M
    FLAG_DICTIONARY.flagmap.set('Macao', macao);
    FLAG_DICTIONARY.flagmap.set('Macedonia', macedonia);
    FLAG_DICTIONARY.flagmap.set('Madagascar', madagascar);
    FLAG_DICTIONARY.flagmap.set('Madeira', madeira);
    FLAG_DICTIONARY.flagmap.set('Malawi', malawi);
    FLAG_DICTIONARY.flagmap.set('Malaysia', malaysia);
    FLAG_DICTIONARY.flagmap.set('Maldives', maldives);
    FLAG_DICTIONARY.flagmap.set('Mali', mali);
    FLAG_DICTIONARY.flagmap.set('Malta', malta);
    FLAG_DICTIONARY.flagmap.set('Marshall Islands', marshall_island);
    FLAG_DICTIONARY.flagmap.set('Martinique', martinique);
    FLAG_DICTIONARY.flagmap.set('Mauritania', mauritania);
    FLAG_DICTIONARY.flagmap.set('Mauritius', mauritius);
    FLAG_DICTIONARY.flagmap.set('Melilla', melilla);
    FLAG_DICTIONARY.flagmap.set('Mexico', mexico);
    FLAG_DICTIONARY.flagmap.set('Micronesia', micronesia);
    FLAG_DICTIONARY.flagmap.set('Moldova', moldova);
    FLAG_DICTIONARY.flagmap.set('Monaco', monaco);
    FLAG_DICTIONARY.flagmap.set('Mongolia', mongolia);
    FLAG_DICTIONARY.flagmap.set('Montenegro', montenegro);
    FLAG_DICTIONARY.flagmap.set('Montserrat', montserrat);
    FLAG_DICTIONARY.flagmap.set('Morocco', morocco);
    FLAG_DICTIONARY.flagmap.set('Mozambique', mozambique);
    FLAG_DICTIONARY.flagmap.set('Myanmar', myanmar);

    // N
    FLAG_DICTIONARY.flagmap.set('Namibia', namibia);
    // FLAG_DICTIONARY.flagmap.set('Nato', 'assets/images/flags/nato.png');
    FLAG_DICTIONARY.flagmap.set('Nauru', nauru);
    FLAG_DICTIONARY.flagmap.set('Nepal', nepal);
    FLAG_DICTIONARY.flagmap.set('Netherlands', netherlands);
    FLAG_DICTIONARY.flagmap.set('New Zealand', new_zealand);
    FLAG_DICTIONARY.flagmap.set('Nicaragua', nicaragua);
    FLAG_DICTIONARY.flagmap.set('Niger', niger);
    FLAG_DICTIONARY.flagmap.set('Nigeria', nigeria);
    FLAG_DICTIONARY.flagmap.set('Niue', niue);
    FLAG_DICTIONARY.flagmap.set('Norfolk Island', norfolk_island);
    FLAG_DICTIONARY.flagmap.set('North Korea', north_korea);
    FLAG_DICTIONARY.flagmap.set('Northern Cyprus', northern_cyprus);
    FLAG_DICTIONARY.flagmap.set('Northern Marianas Islands', northern_marianas_islands);
    FLAG_DICTIONARY.flagmap.set('Norway', norway);

    // O
    FLAG_DICTIONARY.flagmap.set('Oman', oman);
    FLAG_DICTIONARY.flagmap.set('Orkney Islands', orkney_islands);
    FLAG_DICTIONARY.flagmap.set('Ossetia', ossetia);

    // P
    FLAG_DICTIONARY.flagmap.set('Pakistan', pakistan);
    FLAG_DICTIONARY.flagmap.set('Palau', palau);
    FLAG_DICTIONARY.flagmap.set('Palestine', palestine);
    FLAG_DICTIONARY.flagmap.set('Panama', panama);
    FLAG_DICTIONARY.flagmap.set('Papua New Guinea', papua_new_guinea);
    FLAG_DICTIONARY.flagmap.set('Paraguay', paraguay);
    FLAG_DICTIONARY.flagmap.set('Peru', peru);
    FLAG_DICTIONARY.flagmap.set('Philippines', philippines);
    FLAG_DICTIONARY.flagmap.set('Pitcairn Islands', pitcairn_islands);
    FLAG_DICTIONARY.flagmap.set('Poland', poland);
    FLAG_DICTIONARY.flagmap.set('Portugal', portugal);
    FLAG_DICTIONARY.flagmap.set('Puerto Rico', puerto_rico);

    // Q
    FLAG_DICTIONARY.flagmap.set('Qatar', qatar);

    // R
    FLAG_DICTIONARY.flagmap.set('Rapa Nui', rapa_nui);
    FLAG_DICTIONARY.flagmap.set('Romania', romania);
    FLAG_DICTIONARY.flagmap.set('Russia', russia);
    FLAG_DICTIONARY.flagmap.set('Rwanda', rwanda);

    // S
    FLAG_DICTIONARY.flagmap.set('Saba Island', saba_island);
    FLAG_DICTIONARY.flagmap.set('Saint Kitts and Nevis', saint_kitts_and_nevis);
    FLAG_DICTIONARY.flagmap.set('Salvador', salvador);
    FLAG_DICTIONARY.flagmap.set('Samoa', samoa);
    FLAG_DICTIONARY.flagmap.set('San Marino', san_marino);
    FLAG_DICTIONARY.flagmap.set('Sao Tome and Principe', sao_tome_and_principe);
    FLAG_DICTIONARY.flagmap.set('Sardinia', sardinia);
    FLAG_DICTIONARY.flagmap.set('Saudi Arabia', saudi_arabia);
    FLAG_DICTIONARY.flagmap.set('Scotland', scotland);
    FLAG_DICTIONARY.flagmap.set('Senegal', senegal);
    FLAG_DICTIONARY.flagmap.set('Serbia', serbia);
    FLAG_DICTIONARY.flagmap.set('Seychelles', seychelles);
    FLAG_DICTIONARY.flagmap.set('Sierra Leone', sierra_leone);
    FLAG_DICTIONARY.flagmap.set('Singapore', singapore);
    FLAG_DICTIONARY.flagmap.set('Sint Eustatius', sint_eustatius);
    FLAG_DICTIONARY.flagmap.set('Sint Maarten', sint_maarten);
    FLAG_DICTIONARY.flagmap.set('Slovakia', slovakia);
    FLAG_DICTIONARY.flagmap.set('Slovenia', slovenia);
    FLAG_DICTIONARY.flagmap.set('Solomon Islands', solomon_islands);
    FLAG_DICTIONARY.flagmap.set('Somalia', somalia);
    FLAG_DICTIONARY.flagmap.set('Somaliland', somaliland);
    FLAG_DICTIONARY.flagmap.set('South Africa', south_africa);
    FLAG_DICTIONARY.flagmap.set('South Korea', south_korea);
    FLAG_DICTIONARY.flagmap.set('South Sudan', south_sudan);
    FLAG_DICTIONARY.flagmap.set('Spain', spain);
    FLAG_DICTIONARY.flagmap.set('Sri Lanka', sri_lanka);
    FLAG_DICTIONARY.flagmap.set('St Barthelemy', st_barthelemy);
    FLAG_DICTIONARY.flagmap.set('St Lucia', st_lucia);
    FLAG_DICTIONARY.flagmap.set('St Vincent and the Grenadines', st_vincent_and_the_grenadines);
    FLAG_DICTIONARY.flagmap.set('Sudan', sudan);
    FLAG_DICTIONARY.flagmap.set('Suriname', suriname);
    FLAG_DICTIONARY.flagmap.set('Swaziland', swaziland);
    FLAG_DICTIONARY.flagmap.set('Sweden', sweden);
    FLAG_DICTIONARY.flagmap.set('Switzerland', switzerland);
    FLAG_DICTIONARY.flagmap.set('Syria', syria);

    // T
    FLAG_DICTIONARY.flagmap.set('Taiwan', taiwan);
    FLAG_DICTIONARY.flagmap.set('Tajikistan', tajikistan);
    FLAG_DICTIONARY.flagmap.set('Tanzania', tanzania);
    FLAG_DICTIONARY.flagmap.set('Thailand', thailand);
    FLAG_DICTIONARY.flagmap.set('Tibet', tibet);
    FLAG_DICTIONARY.flagmap.set('Togo', togo);
    FLAG_DICTIONARY.flagmap.set('Tokelau', tokelau);
    FLAG_DICTIONARY.flagmap.set('Tonga', tonga);
    FLAG_DICTIONARY.flagmap.set('Transnistria', transnistria);
    FLAG_DICTIONARY.flagmap.set('Trinidad and Tobago', trinidad_and_tobago);
    FLAG_DICTIONARY.flagmap.set('Tunisia', tunisia);
    FLAG_DICTIONARY.flagmap.set('Turkey', turkey);
    FLAG_DICTIONARY.flagmap.set('Turkmenistan', turkmenistan);
    FLAG_DICTIONARY.flagmap.set('Turks and Caicos Islands', turks_and_caicos);
    FLAG_DICTIONARY.flagmap.set('Tuvalu', tuvalu);

    // U
    FLAG_DICTIONARY.flagmap.set('Uganda', uganda);
    FLAG_DICTIONARY.flagmap.set('Ukraine', ukraine);
    FLAG_DICTIONARY.flagmap.set('United Arab Emirates', united_arab_emirates);
    FLAG_DICTIONARY.flagmap.set('United Kingdom', united_kingdom);
    FLAG_DICTIONARY.flagmap.set('United Nations', united_nations);
    FLAG_DICTIONARY.flagmap.set('United States of America', united_states_of_america);
    FLAG_DICTIONARY.flagmap.set('Uruguay', uruguay);
    FLAG_DICTIONARY.flagmap.set('Uzbekistan', uzbekistan);

    // V
    FLAG_DICTIONARY.flagmap.set('Vanuatu', vanuatu);
    FLAG_DICTIONARY.flagmap.set('Vatican City', vatican_city);
    FLAG_DICTIONARY.flagmap.set('Venezuela', venezuela);
    FLAG_DICTIONARY.flagmap.set('Vietnam', vietnam);
    FLAG_DICTIONARY.flagmap.set('Virgin Islands', virgin_islands);

    // W
    FLAG_DICTIONARY.flagmap.set('Wales', wales);
    FLAG_DICTIONARY.flagmap.set('Western Sahara', western_sahara);

    // X

    // Y
    FLAG_DICTIONARY.flagmap.set('Yemen', yemen);

    // Z
    FLAG_DICTIONARY.flagmap.set('Zambia', zambia);
    FLAG_DICTIONARY.flagmap.set('Zimbabwe', zimbabwe);
  }

  get(key: string) {
    return FLAG_DICTIONARY.flagmap.get(key);
  }

  static get(key: string) {
    return FLAG_DICTIONARY.flagmap.get(key);
  }

  static toList(): string[] {
    let output: string[] = [];
    for (let key of Array.from(FLAG_DICTIONARY.flagmap.keys())) {
      output.push(key);
    }
    return output;
  }
}
