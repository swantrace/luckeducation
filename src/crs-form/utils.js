import inRange from "lodash.inrange";
import maxBy from "lodash.maxby";
import {
  SINGLE_AGE_SCORE,
  MARRIED_AGE_SCORE,
  SINGLE_EDU_SCORE,
  MARRIED_EDU_SCORE,
  SPOUSE_EDU_SCORE,
  EDU_LEVELS,
  EMPLOYER_TYPES,
  CANADA_EDU_DEGREES,
  EMPLOYER_SCORE,
  CANADA_EDU_SCORE,
  SINGLE_FIRST_LAN_SCORE,
  MARRIED_FIRST_LAN_SCORE,
  SECOND_LAN_SCORE,
  SPOUSE_LAN_SCORE,
  SINGLE_EXP_SCORE,
  MARRIED_EXP_SCORE,
  SPOUSE_EXP_SCORE,
  EDU_TRANSFER_SCORE,
  OVERSEASEXP_TRANSFER_SCORE,
  SIBLING_SCORE,
  PROVINCIAL_NOMINEE_SCORE,
  LAN_TEST_TYPES,
  LAN_TEST_SUBJECTS,
  LAN_TEST_SCORE_CLB_RELATIONS,
  FRENCH_ADDITIONAL_SCORE,
  ENGLISH_TEST_TYPES,
  FRENCH_TEST_TYPES,
} from "./constants";

export const lanTestToClb = (rawScore, testType, testSubject) => {
  console.log(LAN_TEST_SCORE_CLB_RELATIONS);
  let clb = 0;
  let score = Number(rawScore);
  if (Number.isNaN(score)) {
    return 0;
  }
  if (!LAN_TEST_TYPES.find((type) => type === testType)) {
    return 0;
  }
  if (!LAN_TEST_SUBJECTS.find((subject) => subject === testSubject)) {
    return 0;
  }
  if (
    LAN_TEST_SCORE_CLB_RELATIONS[testType] &&
    LAN_TEST_SCORE_CLB_RELATIONS[testType][testSubject]
  ) {
    const testClbRelations =
      LAN_TEST_SCORE_CLB_RELATIONS[testType][testSubject];
    if (
      testClbRelations.findIndex((range) => inRange(score, ...range)) !== -1
    ) {
      clb = testClbRelations.findIndex((range) => inRange(score, ...range));
    }
  }
  return clb;
};

export const ageToScore = (rawAge, isSingle = true) => {
  const age = Number(rawAge);
  if (Number.isNaN(age) || age < 0) {
    return 0;
  }
  let score = 0;
  if (
    isSingle &&
    SINGLE_AGE_SCORE.find((ageScorePair) => ageScorePair[0] === age)
  ) {
    score = SINGLE_AGE_SCORE.find((ageScorePair) => ageScorePair[0] === age)[1];
  }
  if (
    !isSingle &&
    MARRIED_AGE_SCORE.find((ageScorePair) => ageScorePair[0] === age)
  ) {
    score = MARRIED_AGE_SCORE.find(
      (ageScorePair) => ageScorePair[0] === age
    )[1];
  }
  return score;
};

export const eduToScore = (eduLevel, isSingle = true, isSpouse = false) => {
  if (!EDU_LEVELS.find((level) => level === eduLevel)) {
    return 0;
  }
  let score = 0;
  if (
    isSingle &&
    SINGLE_EDU_SCORE.find((eduScorePair) => eduScorePair[0] === eduLevel)
  ) {
    score = SINGLE_EDU_SCORE.find(
      (eduScorePair) => eduScorePair[0] === eduLevel
    )[1];
  }

  if (
    !isSingle &&
    !isSpouse &&
    MARRIED_EDU_SCORE.find((eduScorePair) => eduScorePair[0] === eduLevel)
  ) {
    score = MARRIED_EDU_SCORE.find(
      (eduScorePair) => eduScorePair[0] === eduLevel
    )[1];
  }

  if (
    !isSingle &&
    isSpouse &&
    SPOUSE_EDU_SCORE.find((eduScorePair) => eduScorePair[0] === eduLevel)
  ) {
    score = SPOUSE_EDU_SCORE.find(
      (eduScorePair) => eduScorePair[0] === eduLevel
    )[1];
  }
  return score;
};

export const clbToScore = (
  rawClb,
  isSingle = true,
  isSpouse = false,
  isFirst = true
) => {
  const clb = Number(rawClb);
  if (Number.isNaN(clb) || clb > 10 || clb < 0) {
    return 0;
  }
  let score = 0;
  if (
    isSingle &&
    isFirst &&
    SINGLE_FIRST_LAN_SCORE.find((lanScorePair) => lanScorePair[0] === clb)
  ) {
    score = SINGLE_FIRST_LAN_SCORE.find(
      (lanScorePair) => lanScorePair[0] === clb
    )[1];
  }
  if (
    !isSingle &&
    isFirst &&
    MARRIED_FIRST_LAN_SCORE.find((lanScorePair) => lanScorePair[0] === clb)
  ) {
    score = MARRIED_FIRST_LAN_SCORE.find(
      (lanScorePair) => lanScorePair[0] === clb
    )[1];
  }
  if (
    !isFirst &&
    !isSpouse &&
    SECOND_LAN_SCORE.find((lanScorePair) => lanScorePair[0] === clb)
  ) {
    score = SECOND_LAN_SCORE.find((lanScorePair) => lanScorePair[0] === clb)[1];
  }
  if (
    !isSingle &&
    isSpouse &&
    SPOUSE_LAN_SCORE.find((lanScorePair) => lanScorePair[0] === clb)
  ) {
    score = SPOUSE_LAN_SCORE.find((lanScorePair) => lanScorePair[0] === clb)[1];
  }
  return score;
};

export const lanToScore = (
  testInfo,
  isSingle = true,
  isSpouse = false,
  isFirst = true
) => {
  let score = 0;
  Object.keys(testInfo).forEach((testSubject) => {
    score += testInfo[testSubject].score;
  });
  if (!isSingle && !isSpouse && !isFirst) {
    score = Math.min(22, score);
  }
  return score;
};

export const expToScore = (rawExp, isSingle = true, isSpouse = false) => {
  let exp = Number(rawExp);
  if (Number.isNaN(exp) || exp < 1) {
    return 0;
  }
  let score = 0;
  if (isSingle) {
    let maxKey = maxBy(SINGLE_EXP_SCORE, (expScorePair) => expScorePair[0])[0];
    exp = Math.min(maxKey, exp);
    if (SINGLE_EXP_SCORE.find((expScorePair) => expScorePair[0] === exp)) {
      score = SINGLE_EXP_SCORE.find(
        (expScorePair) => expScorePair[0] === exp
      )[1];
    }
  }

  if (!isSingle && !isSpouse) {
    let maxKey = maxBy(MARRIED_EXP_SCORE, (expScorePair) => expScorePair[0])[0];
    exp = Math.min(maxKey, exp);
    if (MARRIED_EXP_SCORE.find((expScorePair) => expScorePair[0] === exp)) {
      score = MARRIED_EXP_SCORE.find(
        (expScorePair) => expScorePair[0] === exp
      )[1];
    }
  }

  if (!isSingle && isSpouse) {
    let maxKey = maxBy(SPOUSE_EXP_SCORE, (expScorePair) => expScorePair[0])[0];
    exp = Math.min(maxKey, exp);
    if (SPOUSE_EXP_SCORE.find((expScorePair) => expScorePair[0] === exp)) {
      score = SPOUSE_EXP_SCORE.find(
        (expScorePair) => expScorePair[0] === exp
      )[1];
    }
  }

  return score;
};

export const transferEduMultiplyLanToScore = (eduLevel, lanTestInfo) => {
  const clbs = Object.keys(lanTestInfo).map(
    (testSubject) => lanTestInfo[testSubject].clb
  );
  const lanFactor = lanToLanFactor(clbs);
  const eduFactor = eduLevelToEduFactor(eduLevel);
  const multipliedFactor = lanFactor * eduFactor;
  let score = 0;
  if (
    EDU_TRANSFER_SCORE.find(
      (factorScorePair) => factorScorePair[0] === multipliedFactor
    )
  ) {
    score = EDU_TRANSFER_SCORE.find(
      (factorScorePair) => factorScorePair[0] === multipliedFactor
    )[1];
  }
  return score;
};

export const transferEduMultiplyExpToScore = (eduLevel, exp) => {
  const expFactor = expToExpFactor(exp);
  const eduFactor = eduLevelToEduFactor(eduLevel);
  const multipliedFactor = expFactor * eduFactor;
  let score = 0;
  if (
    EDU_TRANSFER_SCORE.find(
      (factorScorePair) => factorScorePair[0] === multipliedFactor
    )
  ) {
    score = EDU_TRANSFER_SCORE.find(
      (factorScorePair) => factorScorePair[0] === multipliedFactor
    )[1];
  }
  return score;
};

export const transferOverseasExpMultiplyLanToScore = (
  overseasExp,
  lanTestInfo
) => {
  const clbs = Object.keys(lanTestInfo).map(
    (testSubject) => lanTestInfo[testSubject].clb
  );
  const lanFactor = lanToLanFactor(clbs);
  const overseasExpFactor = overseasExpToOverseasExpFactor(overseasExp);
  const multipliedFactor = lanFactor * overseasExpFactor;
  let score = 0;
  if (
    OVERSEASEXP_TRANSFER_SCORE.find(
      (factorScorePair) => factorScorePair[0] === multipliedFactor
    )
  ) {
    score = OVERSEASEXP_TRANSFER_SCORE.find(
      (factorScorePair) => factorScorePair[0] === multipliedFactor
    )[1];
  }
  return score;
};

export const transferOverseasExpMultiplyExpToScore = (overseasExp, exp) => {
  const expFactor = expToExpFactor(exp);
  const overseasExpFactor = overseasExpToOverseasExpFactor(overseasExp);
  const multipliedFactor = expFactor * overseasExpFactor;
  let score = 0;
  if (
    OVERSEASEXP_TRANSFER_SCORE.find(
      (factorScorePair) => factorScorePair[0] === multipliedFactor
    )
  ) {
    score = OVERSEASEXP_TRANSFER_SCORE.find(
      (factorScorePair) => factorScorePair[0] === multipliedFactor
    )[1];
  }
  return score;
};

export const transferEduToScore = (
  rawEduMultiplyLanScore,
  rawEduMultiplyExpScore
) => {
  const eduMultiplyLanScore = Number(rawEduMultiplyLanScore);
  const eduMultiplyExpScore = Number(rawEduMultiplyExpScore);
  if (Number.isNaN(eduMultiplyLanScore) || Number.isNaN(eduMultiplyExpScore)) {
    return 0;
  }
  return Math.min(50, eduMultiplyLanScore + eduMultiplyExpScore);
};

export const transferOverseasExpToScore = (
  rawOverseasExpMultiplyLanScore,
  rawOverseasExpMultiplyExpScore
) => {
  const overseasExpMultiplyLanScore = Number(rawOverseasExpMultiplyLanScore);
  const overseasExpMultiplyExpScore = Number(rawOverseasExpMultiplyExpScore);
  if (
    Number.isNaN(overseasExpMultiplyLanScore) ||
    Number.isNaN(overseasExpMultiplyExpScore)
  ) {
    return 0;
  }
  return Math.min(
    50,
    overseasExpMultiplyLanScore + overseasExpMultiplyExpScore
  );
};

export const additionalProvincialNomineeToScore = (passed) => {
  if (passed) {
    return PROVINCIAL_NOMINEE_SCORE;
  }
  return 0;
};

export const additionalEmployerToScore = (employerType) => {
  if (!EMPLOYER_TYPES.find((type) => type === employerType)) {
    return 0;
  }
  let score = 0;
  if (
    EMPLOYER_SCORE.find((typeScorePair) => typeScorePair[0] === employerType)
  ) {
    score = EMPLOYER_SCORE.find(
      (typeScorePair) => typeScorePair[0] === employerType
    )[1];
  }
  return score;
};

export const additionalCanadaEduToScore = (canadaEduDegree) => {
  if (!CANADA_EDU_DEGREES.find((degree) => degree === canadaEduDegree)) {
    return 0;
  }
  let score = 0;
  if (
    CANADA_EDU_SCORE.find(
      (degreeScorePair) => degreeScorePair[0] === canadaEduDegree
    )
  ) {
    score = CANADA_EDU_SCORE.find(
      (degreeScorePair) => degreeScorePair[0] === canadaEduDegree
    )[1];
  }
  return score;
};

export const additionalSiblingToScore = (hasSibling) => {
  if (hasSibling) {
    return SIBLING_SCORE;
  }
  return 0;
};

export const additionalFrenchToScore = (
  firstLanTestType,
  firstLanTestInfo,
  secondLanTestType,
  secondLanTestInfo
) => {
  let frenchClbs = [0, 0, 0, 0];
  let englishClbs = [0, 0, 0, 0];

  if (ENGLISH_TEST_TYPES.includes(firstLanTestType)) {
    englishClbs = Object.keys(firstLanTestInfo).map(
      (testSubject) => firstLanTestInfo[testSubject].clb
    );
  } else if (ENGLISH_TEST_TYPES.includes(secondLanTestType)) {
    englishClbs = Object.keys(secondLanTestInfo).map(
      (testSubject) => secondLanTestInfo[testSubject].clb
    );
  }

  if (FRENCH_TEST_TYPES.includes(firstLanTestType)) {
    frenchClbs = Object.keys(firstLanTestInfo).map(
      (testSubject) => firstLanTestInfo[testSubject].clb
    );
  } else if (FRENCH_TEST_TYPES.includes(secondLanTestType)) {
    frenchClbs = Object.keys(secondLanTestInfo).map(
      (testSubject) => secondLanTestInfo[testSubject].clb
    );
  }

  let score = 0;
  let frenchFactor = 0;
  let englishFactor = 1;
  let multipliedFactor = 0;
  if (allClbsAbove(frenchClbs, 7)) {
    frenchFactor = 1;
  }
  if (allClbsAbove(englishClbs, 5)) {
    englishFactor = 2;
  }
  multipliedFactor = frenchFactor * englishFactor;
  if (
    FRENCH_ADDITIONAL_SCORE.find(
      (factorScorePair) => factorScorePair[0] === multipliedFactor
    )
  ) {
    score = FRENCH_ADDITIONAL_SCORE.find(
      (factorScorePair) => factorScorePair[0] === multipliedFactor
    )[1];
  }
  return score;
};

export const additionalToScore = (
  provincialNomineePassed,
  employerType,
  canadaEduDegree,
  hasSibling,
  frenchScore
) => {
  const provincialNomineeScore = additionalProvincialNomineeToScore(
    provincialNomineePassed
  );
  const employerScore = additionalEmployerToScore(employerType);
  const canadaEduScore = additionalCanadaEduToScore(canadaEduDegree);
  const siblingScore = additionalSiblingToScore(hasSibling);
  if (
    Number.isNaN(provincialNomineeScore) ||
    Number.isNaN(employerScore) ||
    Number.isNaN(canadaEduScore) ||
    Number.isNaN(siblingScore) ||
    Number.isNaN(frenchScore)
  ) {
    return 0;
  }
  return Math.min(
    600,
    provincialNomineeScore +
      employerScore +
      canadaEduScore +
      siblingScore +
      frenchScore
  );
};

export const getFinalScore = (
  rawAgeScore = 0,
  rawEduScore = 0,
  rawFirstLanScore = 0,
  rawExpScore = 0,
  rawSecondLanScore = 0,
  rawSpouseEduScore = 0,
  rawSpouseLanScore = 0,
  rawSpouseExpScore = 0,
  rawTransferEduScore = 0,
  rawTransferOverseasExpScore = 0,
  rawAdditionalScore = 0
) => {
  const ageScore = Number(rawAgeScore);
  const eduScore = Number(rawEduScore);
  const firstLanScore = Number(rawFirstLanScore);
  const expScore = Number(rawExpScore);
  const secondLanScore = Number(rawSecondLanScore);
  const spouseEduScore = Number(rawSpouseEduScore);
  const spouseLanScore = Number(rawSpouseLanScore);
  const spouseExpScore = Number(rawSpouseExpScore);
  const transferEduScore = Number(rawTransferEduScore);
  const transferOverseasExpScore = Number(rawTransferOverseasExpScore);
  const additionalScore = Number(rawAdditionalScore);

  if (
    Number.isNaN(ageScore) ||
    Number.isNaN(eduScore) ||
    Number.isNaN(firstLanScore) ||
    Number.isNaN(expScore) ||
    Number.isNaN(secondLanScore) ||
    Number.isNaN(spouseEduScore) ||
    Number.isNaN(spouseLanScore) ||
    Number.isNaN(spouseExpScore) ||
    Number.isNaN(transferEduScore) ||
    Number.isNaN(transferOverseasExpScore) ||
    Number.isNaN(additionalScore)
  ) {
    return 0;
  }
  return (
    ageScore +
    eduScore +
    firstLanScore +
    expScore +
    secondLanScore +
    spouseEduScore +
    spouseExpScore +
    spouseLanScore +
    transferEduScore +
    transferOverseasExpScore +
    additionalScore
  );
};

function allClbsAbove(clbs = [0, 0, 0, 0], rawLevel) {
  const level = Number(rawLevel);
  let flag = false;
  if (
    !Number.isNaN(level) &&
    level <= 10 &&
    clbs.every((rawClb) => {
      const clb = Number(rawClb);
      if (!Number.isNaN(clb) && inRange(clb, level, 10.001)) {
        return true;
      }
      return false;
    })
  ) {
    flag = true;
  }
  return flag;
}

function lanToLanFactor(clbs = [0, 0, 0, 0]) {
  let lanFactor = 0;
  if (allClbsAbove(clbs, 7)) {
    lanFactor = 1;
  }
  if (allClbsAbove(clbs, 9)) {
    lanFactor = 2;
  }
  return lanFactor;
}

function eduLevelToEduFactor(eduLevel) {
  if (!EDU_LEVELS.find((level) => level === eduLevel)) {
    return 0;
  }

  let eduFactor = 0;
  const eduIndex = EDU_LEVELS.findIndex((level) => level === eduLevel);
  if (eduIndex >= 2) {
    eduFactor = 1;
  }
  if (eduIndex >= 5) {
    eduFactor = 2;
  }
  return eduFactor;
}

function expToExpFactor(rawExp) {
  const exp = Number(rawExp);
  if (Number.isNaN(exp) || exp < 1) {
    return 0;
  }
  let expFactor = 0;
  if (exp >= 1) {
    expFactor = 1;
  }
  if (exp >= 2) {
    expFactor = 2;
  }
  return expFactor;
}

function overseasExpToOverseasExpFactor(rawOverseasExp) {
  const overseasExp = Number(rawOverseasExp);
  if (Number.isNaN(overseasExp) || overseasExp < 1) {
    return 0;
  }
  let overseasExpFactor = 0;
  if (overseasExp >= 1) {
    overseasExpFactor = 1;
  }
  if (overseasExp >= 3) {
    overseasExpFactor = 2;
  }
  return overseasExpFactor;
}
