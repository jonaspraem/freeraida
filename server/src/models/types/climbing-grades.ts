enum SKILL {
  NOVICE = 'novice',
  BEGINNER = 'beginner',
  INTERMEDEIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert',
  SUPER_EXPERT = 'super expert',
  ELITE = 'elite',
  SUPER_ELITE = 'super elite',
}

module GRADES {
  const robedGrades = [
    { raw: 1, french: '1', UIAA: 'I', yosimite: '5', GB: '3a', AUS: '10', skill: SKILL.NOVICE },
    { raw: 2, french: '2', UIAA: 'II', yosimite: '5.1/5.2', GB: '3b', AUS: '11', skill: SKILL.NOVICE },
    { raw: 3, french: '3', UIAA: 'III', yosimite: '5.3/5.4', GB: '3c', AUS: '12', skill: SKILL.NOVICE },
    { raw: 4, french: '4a', UIAA: 'IV', yosimite: '5.5', GB: '4a', AUS: '13', skill: SKILL.BEGINNER },
    { raw: 5, french: '4b', UIAA: 'IV+', yosimite: '5.6', GB: '4b', AUS: '14', skill: SKILL.BEGINNER },
    { raw: 6, french: '4c', UIAA: 'V', yosimite: '5.7', GB: '4c', AUS: '15', skill: SKILL.BEGINNER },
    { raw: 7, french: '5a', UIAA: 'V+', yosimite: '5.8', GB: '4c', AUS: '16', skill: SKILL.BEGINNER },
    { raw: 8, french: '5b', UIAA: 'VI-', yosimite: '5.9', GB: '5a', AUS: '17', skill: SKILL.INTERMEDEIATE },
    { raw: 9, french: '5c', UIAA: 'VI', yosimite: '5.10a', GB: '5a', AUS: '18', skill: SKILL.INTERMEDEIATE },
    { raw: 10, french: '6a', UIAA: 'VI+', yosimite: '5.10b', GB: '5b', AUS: '19', skill: SKILL.INTERMEDEIATE },
    { raw: 11, french: '6a+', UIAA: 'VII-', yosimite: '5.10c', GB: '5b', AUS: '20', skill: SKILL.INTERMEDEIATE },
    { raw: 12, french: '6b', UIAA: 'VII', yosimite: '5.10d', GB: '5c', AUS: '21', skill: SKILL.INTERMEDEIATE },
    { raw: 13, french: '6b+', UIAA: 'VII+', yosimite: '5.11a', GB: '5c', AUS: '22', skill: SKILL.ADVANCED },
    { raw: 14, french: '6c', UIAA: 'VIII-', yosimite: '5.11b', GB: '5c', AUS: '23', skill: SKILL.ADVANCED },
    { raw: 15, french: '6c+', UIAA: 'VIII', yosimite: '5.11c', GB: '6a', AUS: '24', skill: SKILL.ADVANCED },
    { raw: 16, french: '7a', UIAA: 'VIII+', yosimite: '5.11d', GB: '6a', AUS: '25', skill: SKILL.ADVANCED },
    { raw: 17, french: '7a+', UIAA: 'IX-', yosimite: '5.12a', GB: '6a', AUS: '26', skill: SKILL.ADVANCED },
    { raw: 18, french: '7b', UIAA: 'IX-/IX', yosimite: '5.12b', GB: '6b', AUS: '26', skill: SKILL.EXPERT },
    { raw: 19, french: '7b+', UIAA: 'IX', yosimite: '5.12c', GB: '6b', AUS: '27', skill: SKILL.EXPERT },
    { raw: 20, french: '7c', UIAA: 'IX/IX+', yosimite: '5.12d', GB: '6c', AUS: '28', skill: SKILL.EXPERT },
    { raw: 21, french: '7c+', UIAA: 'IX+', yosimite: '5.13a', GB: '6c', AUS: '29', skill: SKILL.EXPERT },
    { raw: 22, french: '8a', UIAA: 'IX+/X-', yosimite: '5.13b', GB: '6c', AUS: '29', skill: SKILL.SUPER_EXPERT },
    { raw: 23, french: '8a+', UIAA: 'X-', yosimite: '5.13c', GB: '7a', AUS: '30', skill: SKILL.SUPER_EXPERT },
    { raw: 24, french: '8b', UIAA: 'X', yosimite: '5.13d', GB: '7a', AUS: '31', skill: SKILL.SUPER_EXPERT },
    { raw: 25, french: '8b+', UIAA: 'X+', yosimite: '5.14a', GB: '7a', AUS: '32', skill: SKILL.ELITE },
    { raw: 26, french: '8c', UIAA: 'X+/XI-', yosimite: '5.14b', GB: '7b', AUS: '33', skill: SKILL.ELITE },
    { raw: 27, french: '8c+', UIAA: 'XI-', yosimite: '5.14c', GB: '7b', AUS: '34', skill: SKILL.ELITE },
    { raw: 28, french: '9a', UIAA: 'XI', yosimite: '5.14d', GB: '7c', AUS: '35', skill: SKILL.SUPER_ELITE },
    { raw: 29, french: '9a+', UIAA: 'XI+', yosimite: '5.15a', GB: '7c', AUS: '36', skill: SKILL.SUPER_ELITE },
    { raw: 30, french: '9b', UIAA: 'XII-', yosimite: '5.15b', GB: '7c', AUS: '37', skill: SKILL.SUPER_ELITE },
    { raw: 31, french: '9b+', UIAA: 'XII', yosimite: '5.15c', GB: '7c', AUS: '38', skill: SKILL.SUPER_ELITE },
    { raw: 32, french: '9c', UIAA: 'XII+', yosimite: '5.15d', GB: '7c', AUS: '39', skill: SKILL.SUPER_ELITE },
  ];
  export const getRobedGrade = (level: number) => {
    return robedGrades[level];
  };
}
