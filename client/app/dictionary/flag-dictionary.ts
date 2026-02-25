import { Injectable } from '@angular/core';

// Requires all flag images A to Z
// A
const abkhazia = '/js/app/browser/images/flags/abkhazia.png';
const afghanistan = '/js/app/browser/images/flags/afghanistan.png';
const aland_islands = '/js/app/browser/images/flags/aland-islands.png';
const albania = '/js/app/browser/images/flags/albania.png';
const algeria = '/js/app/browser/images/flags/algeria.png';
const american_samoa = '/js/app/browser/images/flags/american-samoa.png';
const andorra = '/js/app/browser/images/flags/andorra.png';
const anguilla = '/js/app/browser/images/flags/anguilla.png';
const antigua_and_barbuda = '/js/app/browser/images/flags/antigua-and-barbuda.png';
const argentina = '/js/app/browser/images/flags/argentina.png';
const armenia = '/js/app/browser/images/flags/armenia.png';
const aruba = '/js/app/browser/images/flags/aruba.png';
const australia = '/js/app/browser/images/flags/australia.png';
const austria = '/js/app/browser/images/flags/austria.png';
const azerbaijan = '/js/app/browser/images/flags/azerbaijan.png';
const azores_islands = '/js/app/browser/images/flags/azores-islands.png';

// B
const bahamas = '/js/app/browser/images/flags/bahamas.png';
const bahrain = '/js/app/browser/images/flags/bahrain.png';
const balearic_islands = '/js/app/browser/images/flags/balearic-islands.png';
const bangladesh = '/js/app/browser/images/flags/bangladesh.png';
const barbados = '/js/app/browser/images/flags/barbados.png';
const basque_country = '/js/app/browser/images/flags/basque-country.png';
const belarus = '/js/app/browser/images/flags/belarus.png';
const belgium = '/js/app/browser/images/flags/belgium.png';
const belize = '/js/app/browser/images/flags/belize.png';
const benin = '/js/app/browser/images/flags/benin.png';
const bermuda = '/js/app/browser/images/flags/bermuda.png';
const bhutan = '/js/app/browser/images/flags/bhutan-1.png';
const bolivia = '/js/app/browser/images/flags/bolivia.png';
const bonaire = '/js/app/browser/images/flags/bonaire.png';
const bosnia_and_herzegovina = '/js/app/browser/images/flags/bosnia-and-herzegovina.png';
const botswana = '/js/app/browser/images/flags/botswana.png';
const brazil = '/js/app/browser/images/flags/brazil.png';
const british_columbia = '/js/app/browser/images/flags/british-columbia.png';
const british_indian_ocean_territory = '/js/app/browser/images/flags/british-indian-ocean-territory.png';
const british_virgin_islands = '/js/app/browser/images/flags/british-virgin-islands.png';
const brunei = '/js/app/browser/images/flags/brunei.png';
const bulgaria = '/js/app/browser/images/flags/bulgaria.png';
const burkina_faso = '/js/app/browser/images/flags/burkina-faso.png';
const burundi = '/js/app/browser/images/flags/burundi.png';

// C
const cambodia = '/js/app/browser/images/flags/cambodia.png';
const cameroon = '/js/app/browser/images/flags/cameroon.png';
const canada = '/js/app/browser/images/flags/canada.png';
const canary_islands = '/js/app/browser/images/flags/canary-islands.png';
const cape_verde = '/js/app/browser/images/flags/cape-verde.png';
const cayman_islands = '/js/app/browser/images/flags/cayman-islands.png';
const central_african_republic = '/js/app/browser/images/flags/central-african-republic.png';
const ceuta = '/js/app/browser/images/flags/ceuta.png';
const chad = '/js/app/browser/images/flags/chad.png';
const chile = '/js/app/browser/images/flags/chile.png';
const china = '/js/app/browser/images/flags/china.png';
const christmas_island = '/js/app/browser/images/flags/christmas-island.png';
const cocos_island = '/js/app/browser/images/flags/cocos-island.png';
const colombia = '/js/app/browser/images/flags/colombia.png';
const comoros = '/js/app/browser/images/flags/comoros.png';
const congo = '/js/app/browser/images/flags/congo.png';
const cook_islands = '/js/app/browser/images/flags/cook-islands.png';
const corsica = '/js/app/browser/images/flags/corsica.png';
const costa_rica = '/js/app/browser/images/flags/costa-rica.png';
const croatia = '/js/app/browser/images/flags/croatia.png';
const cuba = '/js/app/browser/images/flags/cuba.png';
const curacao = '/js/app/browser/images/flags/curacao.png';
const cyprus = '/js/app/browser/images/flags/cyprus.png';
const czech_republic = '/js/app/browser/images/flags/czech-republic.png';

// D
const democratic_republic_of_congo = '/js/app/browser/images/flags/democratic-republic-of-congo.png';
const denmark = '/js/app/browser/images/flags/denmark.png';
const djibouti = '/js/app/browser/images/flags/djibouti.png';
const dominica = '/js/app/browser/images/flags/dominica.png';
const dominican_republic = '/js/app/browser/images/flags/dominican-republic.png';

// E
const east_timor = '/js/app/browser/images/flags/east-timor.png';
const ecuador = '/js/app/browser/images/flags/ecuador.png';
const egypt = '/js/app/browser/images/flags/egypt.png';
const england = '/js/app/browser/images/flags/england.png';
const equatorial_guinea = '/js/app/browser/images/flags/equatorial-guinea.png';
const eritrea = '/js/app/browser/images/flags/eritrea.png';
const estonia = '/js/app/browser/images/flags/estonia.png';
const ethiopia = '/js/app/browser/images/flags/ethiopia.png';
const european_union = '/js/app/browser/images/flags/european-union.png';

// F
const falkland_islands = '/js/app/browser/images/flags/falkland-islands.png';
const faroe_islands = '/js/app/browser/images/flags/faroe-islands.png';
const fiji = '/js/app/browser/images/flags/fiji.png';
const finland = '/js/app/browser/images/flags/finland.png';
const france = '/js/app/browser/images/flags/france.png';
const french_polynesia = '/js/app/browser/images/flags/french-polynesia.png';

// G
const gabon = '/js/app/browser/images/flags/gabon.png';
const galapagos_islands = '/js/app/browser/images/flags/galapagos-islands.png';
const gambia = '/js/app/browser/images/flags/gambia.png';
const georgia = '/js/app/browser/images/flags/georgia.png';
const germany = '/js/app/browser/images/flags/germany.png';
const ghana = '/js/app/browser/images/flags/ghana.png';
const gibraltar = '/js/app/browser/images/flags/gibraltar.png';
const greece = '/js/app/browser/images/flags/greece.png';
const greenland = '/js/app/browser/images/flags/greenland.png';
const grenada = '/js/app/browser/images/flags/grenada.png';
const guam = '/js/app/browser/images/flags/guam.png';
const guatemala = '/js/app/browser/images/flags/guatemala.png';
const guernsey = '/js/app/browser/images/flags/guernsey.png';
const guinea = '/js/app/browser/images/flags/guinea.png';
const guinea_bissau = '/js/app/browser/images/flags/guinea-bissau.png';
const guyana = '/js/app/browser/images/flags/guyana.png';

// H
const haiti = '/js/app/browser/images/flags/haiti.png';
const hawaii = '/js/app/browser/images/flags/hawaii.png';
const honduras = '/js/app/browser/images/flags/honduras.png';
const hong_kong = '/js/app/browser/images/flags/hong-kong.png';
const hungary = '/js/app/browser/images/flags/hungary.png';

// I
const iceland = '/js/app/browser/images/flags/iceland.png';
const india = '/js/app/browser/images/flags/india.png';
const indonesia = '/js/app/browser/images/flags/indonesia.png';
const iran = '/js/app/browser/images/flags/iran.png';
const iraq = '/js/app/browser/images/flags/iraq.png';
const ireland = '/js/app/browser/images/flags/ireland.png';
const isle_of_man = '/js/app/browser/images/flags/isle-of-man.png';
const israel = '/js/app/browser/images/flags/israel.png';
const ivory_coast = '/js/app/browser/images/flags/ivory-coast.png';

// J
const jamaica = '/js/app/browser/images/flags/jamaica.png';
const japan = '/js/app/browser/images/flags/japan.png';
const jersey = '/js/app/browser/images/flags/jersey.png';
const jordan = '/js/app/browser/images/flags/jordan.png';

// K
const kazakhstan = '/js/app/browser/images/flags/kazakhstan.png';
const kenya = '/js/app/browser/images/flags/kenya.png';
const kiribati = '/js/app/browser/images/flags/kiribati.png';
const kosovo = '/js/app/browser/images/flags/kosovo.png';
const kuwait = '/js/app/browser/images/flags/kuwait.png';
const kyrgyzstan = '/js/app/browser/images/flags/kyrgyzstan.png';

// L
const laos = '/js/app/browser/images/flags/laos.png';
const latvia = '/js/app/browser/images/flags/latvia.png';
const lebanon = '/js/app/browser/images/flags/lebanon.png';
const lesotho = '/js/app/browser/images/flags/lesotho.png';
const liberia = '/js/app/browser/images/flags/liberia.png';
const libya = '/js/app/browser/images/flags/libya.png';
const liechtenstein = '/js/app/browser/images/flags/liechtenstein.png';
const lithuania = '/js/app/browser/images/flags/lithuania.png';
const luxembourg = '/js/app/browser/images/flags/luxembourg.png';

// M
const macao = '/js/app/browser/images/flags/macao.png';
const macedonia = '/js/app/browser/images/flags/macedonia.png';
const madagascar = '/js/app/browser/images/flags/madagascar.png';
const madeira = '/js/app/browser/images/flags/madeira.png';
const malawi = '/js/app/browser/images/flags/malawi.png';
const malaysia = '/js/app/browser/images/flags/malaysia.png';
const maldives = '/js/app/browser/images/flags/maldives.png';
const mali = '/js/app/browser/images/flags/mali.png';
const malta = '/js/app/browser/images/flags/malta.png';
const marshall_island = '/js/app/browser/images/flags/marshall-island.png';
const martinique = '/js/app/browser/images/flags/martinique.png';
const mauritania = '/js/app/browser/images/flags/mauritania.png';
const mauritius = '/js/app/browser/images/flags/mauritius.png';
const melilla = '/js/app/browser/images/flags/melilla.png';
const mexico = '/js/app/browser/images/flags/mexico.png';
const micronesia = '/js/app/browser/images/flags/micronesia.png';
const moldova = '/js/app/browser/images/flags/moldova.png';
const monaco = '/js/app/browser/images/flags/monaco.png';
const mongolia = '/js/app/browser/images/flags/mongolia.png';
const montenegro = '/js/app/browser/images/flags/montenegro.png';
const montserrat = '/js/app/browser/images/flags/montserrat.png';
const morocco = '/js/app/browser/images/flags/morocco.png';
const mozambique = '/js/app/browser/images/flags/mozambique.png';
const myanmar = '/js/app/browser/images/flags/myanmar.png';

// N
const namibia = '/js/app/browser/images/flags/namibia.png';
const nato = '/js/app/browser/images/flags/nato.png';
const nauru = '/js/app/browser/images/flags/nauru.png';
const nepal = '/js/app/browser/images/flags/nepal.png';
const netherlands = '/js/app/browser/images/flags/netherlands.png';
const new_zealand = '/js/app/browser/images/flags/new-zealand.png';
const nicaragua = '/js/app/browser/images/flags/nicaragua.png';
const niger = '/js/app/browser/images/flags/niger.png';
const nigeria = '/js/app/browser/images/flags/nigeria.png';
const niue = '/js/app/browser/images/flags/niue.png';
const norfolk_island = '/js/app/browser/images/flags/norfolk-island.png';
const north_korea = '/js/app/browser/images/flags/north-korea.png';
const northern_cyprus = '/js/app/browser/images/flags/northern-cyprus.png';
const northern_marianas_islands = '/js/app/browser/images/flags/northern-marianas-islands.png';
const norway = '/js/app/browser/images/flags/norway.png';

// O
const oman = '/js/app/browser/images/flags/oman.png';
const orkney_islands = '/js/app/browser/images/flags/orkney-islands.png';
const ossetia = '/js/app/browser/images/flags/ossetia.png';

// P
const pakistan = '/js/app/browser/images/flags/pakistan.png';
const palau = '/js/app/browser/images/flags/palau.png';
const palestine = '/js/app/browser/images/flags/palestine.png';
const panama = '/js/app/browser/images/flags/panama.png';
const papua_new_guinea = '/js/app/browser/images/flags/papua-new-guinea.png';
const paraguay = '/js/app/browser/images/flags/paraguay.png';
const peru = '/js/app/browser/images/flags/peru.png';
const philippines = '/js/app/browser/images/flags/philippines.png';
const pitcairn_islands = '/js/app/browser/images/flags/pitcairn-islands.png';
const poland = '/js/app/browser/images/flags/poland.png';
const portugal = '/js/app/browser/images/flags/portugal.png';
const puerto_rico = '/js/app/browser/images/flags/puerto-rico.png';

// Q
const qatar = '/js/app/browser/images/flags/qatar.png';

// R
const rapa_nui = '/js/app/browser/images/flags/rapa-nui.png';
const romania = '/js/app/browser/images/flags/romania.png';
const russia = '/js/app/browser/images/flags/russia.png';
const rwanda = '/js/app/browser/images/flags/rwanda.png';

// S
const saba_island = '/js/app/browser/images/flags/saba-island.png';
const saint_kitts_and_nevis = '/js/app/browser/images/flags/saint-kitts-and-nevis.png';
const salvador = '/js/app/browser/images/flags/salvador.png';
const samoa = '/js/app/browser/images/flags/samoa.png';
const san_marino = '/js/app/browser/images/flags/san-marino.png';
const sao_tome_and_principe = '/js/app/browser/images/flags/sao-tome-and-principe.png';
const sardinia = '/js/app/browser/images/flags/sardinia.png';
const saudi_arabia = '/js/app/browser/images/flags/saudi-arabia.png';
const scotland = '/js/app/browser/images/flags/scotland.png';
const senegal = '/js/app/browser/images/flags/senegal.png';
const serbia = '/js/app/browser/images/flags/serbia.png';
const seychelles = '/js/app/browser/images/flags/seychelles.png';
const sierra_leone = '/js/app/browser/images/flags/sierra-leone.png';
const singapore = '/js/app/browser/images/flags/singapore.png';
const sint_eustatius = '/js/app/browser/images/flags/sint-eustatius.png';
const sint_maarten = '/js/app/browser/images/flags/sint-maarten.png';
const slovakia = '/js/app/browser/images/flags/slovakia.png';
const slovenia = '/js/app/browser/images/flags/slovenia.png';
const solomon_islands = '/js/app/browser/images/flags/solomon-islands.png';
const somalia = '/js/app/browser/images/flags/somalia.png';
const somaliland = '/js/app/browser/images/flags/somaliland.png';
const south_africa = '/js/app/browser/images/flags/south-africa.png';
const south_korea = '/js/app/browser/images/flags/south-korea.png';
const south_sudan = '/js/app/browser/images/flags/south-sudan.png';
const spain = '/js/app/browser/images/flags/spain.png';
const sri_lanka = '/js/app/browser/images/flags/sri-lanka.png';
const st_barthelemy = '/js/app/browser/images/flags/st-barthelemy.png';
const st_lucia = '/js/app/browser/images/flags/st-lucia.png';
const st_vincent_and_the_grenadines = '/js/app/browser/images/flags/st-vincent-and-the-grenadines.png';
const sudan = '/js/app/browser/images/flags/sudan.png';
const suriname = '/js/app/browser/images/flags/suriname.png';
const swaziland = '/js/app/browser/images/flags/swaziland.png';
const sweden = '/js/app/browser/images/flags/sweden.png';
const switzerland = '/js/app/browser/images/flags/switzerland.png';
const syria = '/js/app/browser/images/flags/syria.png';

// T
const taiwan = '/js/app/browser/images/flags/taiwan.png';
const tajikistan = '/js/app/browser/images/flags/tajikistan.png';
const tanzania = '/js/app/browser/images/flags/tanzania.png';
const thailand = '/js/app/browser/images/flags/thailand.png';
const tibet = '/js/app/browser/images/flags/tibet.png';
const togo = '/js/app/browser/images/flags/togo.png';
const tokelau = '/js/app/browser/images/flags/tokelau.png';
const tonga = '/js/app/browser/images/flags/tonga.png';
const transnistria = '/js/app/browser/images/flags/transnistria.png';
const trinidad_and_tobago = '/js/app/browser/images/flags/trinidad-and-tobago.png';
const tunisia = '/js/app/browser/images/flags/tunisia.png';
const turkey = '/js/app/browser/images/flags/turkey.png';
const turkmenistan = '/js/app/browser/images/flags/turkmenistan.png';
const turks_and_caicos = '/js/app/browser/images/flags/turks-and-caicos.png';
const tuvalu = '/js/app/browser/images/flags/tuvalu.png';

// U
const uganda = '/js/app/browser/images/flags/uganda.png';
const ukraine = '/js/app/browser/images/flags/ukraine.png';
const united_arab_emirates = '/js/app/browser/images/flags/united-arab-emirates.png';
const united_kingdom = '/js/app/browser/images/flags/united-kingdom.png';
const united_nations = '/js/app/browser/images/flags/united-nations.png';
const united_states_of_america = '/js/app/browser/images/flags/united-states-of-america.png';
const uruguay = '/js/app/browser/images/flags/uruguay.png';
const uzbekistan = '/js/app/browser/images/flags/uzbekistan.png';

// V
const vanuatu = '/js/app/browser/images/flags/vanuatu.png';
const vatican_city = '/js/app/browser/images/flags/vatican-city.png';
const venezuela = '/js/app/browser/images/flags/venezuela.png';
const vietnam = '/js/app/browser/images/flags/vietnam.png';
const virgin_islands = '/js/app/browser/images/flags/virgin-islands.png';

// W
const wales = '/js/app/browser/images/flags/wales.png';
const western_sahara = '/js/app/browser/images/flags/western-sahara.png';

// X

// Y
const yemen = '/js/app/browser/images/flags/yemen.png';

// Z
const zambia = '/js/app/browser/images/flags/zambia.png';
const zimbabwe = '/js/app/browser/images/flags/zimbabwe.png';

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
    // FLAG_DICTIONARY.flagmap.set('Nato', 'assets/images/flags/nato.png';
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
