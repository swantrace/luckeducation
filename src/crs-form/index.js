import {
  eduToScore,
  ageToScore,
  clbToScore,
  expToScore,
  transferEduMultiplyExpToScore,
  transferEduMultiplyLanToScore,
  transferEduToScore,
  transferOverseasExpMultiplyExpToScore,
  transferOverseasExpMultiplyLanToScore,
  transferOverseasExpToScore,
  additionalFrenchToScore,
  additionalToScore,
  getFinalScore,
  lanTestToClb,
  lanToScore,
  additionalCanadaEduToScore,
  transferCertificateMultiplyLanToScore,
  displayMaxAndRealScores,
  additionalProvincialNomineeToScore,
  additionalEmployerToScore,
  additionalSiblingToScore,
} from "./utils";
import {
  EDU_LEVELS,
  EXP_LEVELS,
  OVERSEAS_EXP_LEVELS,
  LAN_TEST_TYPES,
  LAN_TEST_SUBJECTS,
  ENGLISH_TEST_TYPES,
  FRENCH_TEST_TYPES,
  EMPLOYER_TYPES,
  CANADA_EDU_DEGREES,
  AGE_LEVELS,
} from "./constants";
import { html, component, useState, useEffect } from "haunted";

function CRSForm() {
  const initialTestInfo = {};
  LAN_TEST_SUBJECTS.forEach((subject) => {
    initialTestInfo[subject] = { testScore: 0, clb: 0, score: 0 };
  });
  const [isSingle, setIsSingle] = useState(true);
  const [age, setAge] = useState(null);
  const [eduLevel, setEduLevel] = useState(null);
  const [firstLanTestType, setFirstLanTestType] = useState(null);
  const [firstLanTestInfo, setFirstLanTestInfo] = useState(initialTestInfo);
  const [secondLanEnabled, setSecondLanEnabled] = useState(false);
  const [secondLanTestType, setSecondLanTestType] = useState(null);
  const [secondLanTestInfo, setSecondLanTestInfo] = useState(initialTestInfo);
  const [exp, setExp] = useState(null);
  const [overseasExp, setOverseasExp] = useState(null);
  const [spouseEduLevel, setSpouseEduLevel] = useState(null);
  const [spouseLanEnabled, setSpouseLanEnabled] = useState(false);
  const [spouseLanTestType, setSpouseLanTestType] = useState(null);
  const [spouseLanTestInfo, setSpouseLanTestInfo] = useState(initialTestInfo);
  const [spouseExp, setSpouseExp] = useState(null);
  const [hasProvincialNominee, setHasProvincialNominee] = useState(false);
  const [employerType, setEmployerType] = useState(null);
  const [canadaEduDegree, setCanadaEduDegree] = useState(null);
  const [hasSibling, setHasSibling] = useState(false);
  const [hasCertificate, setHasCertificate] = useState(false);

  useEffect(() => {
    if (secondLanTestType === null) {
      this.querySelectorAll('[name="secondLanTestType"]').forEach(
        (radioButton) => {
          radioButton.checked = false;
        }
      );
    }
  }, [secondLanTestType]);

  const onIsSingleChanged = (e, isSingleCheckbox) => {
    console.log(isSingleCheckbox);
    if (isSingleCheckbox) {
      setIsSingle(e.target.checked);
      if (e.target.checked) {
        setSpouseEduLevel(null);
        setSpouseLanEnabled(false);
        setSpouseLanTestType(null);
        setSpouseLanTestInfo(initialTestInfo);
        setSpouseExp(null);
      }
    } else {
      setIsSingle(!e.target.checked);
    }
    setFirstLanTestInfo((firstLanTestInfo) => {
      let newFirstLanTestInfo = {};
      Object.keys(firstLanTestInfo).forEach((testSubject) => {
        const testScore = firstLanTestInfo[testSubject].testScore;
        const clb = firstLanTestInfo[testSubject].clb;
        newFirstLanTestInfo[testSubject] = {
          testScore,
          clb,
          score: clbToScore(
            clb,
            isSingleCheckbox ? e.target.checked : !e.target.checked,
            false,
            true
          ),
        };
      });
      return newFirstLanTestInfo;
    });
    if (secondLanEnabled) {
      setSecondLanTestInfo((secondLanTestInfo) => {
        let newSecondLanTestInfo = {};
        Object.keys(secondLanTestInfo).forEach((testSubject) => {
          const testScore = secondLanTestInfo[testSubject].testScore;
          const clb = secondLanTestInfo[testSubject].clb;
          newSecondLanTestInfo[testSubject] = {
            testScore,
            clb,
            score: clbToScore(clb, e.target.checked, false, false),
          };
        });
        return newSecondLanTestInfo;
      });
    }
  };

  const onAgeChanged = (e) => {
    console.log(e);
    const rawAge = e.target.value;
    const age = Number(rawAge);
    if (!Number.isNaN(age) && age > 0 && age < 100) {
      setAge(age);
    } else {
      setAge(null);
    }
  };

  const onFirstLanTestTypeChanged = (e) => {
    if (
      (ENGLISH_TEST_TYPES.includes(e.target.value) &&
        !ENGLISH_TEST_TYPES.includes(firstLanTestType)) ||
      (FRENCH_TEST_TYPES.includes(e.target.value) &&
        !FRENCH_TEST_TYPES.includes(firstLanTestType))
    ) {
      setSecondLanTestType(null);
      setSecondLanTestInfo(initialTestInfo);
    }
    setFirstLanTestType(e.target.value);
    setFirstLanTestInfo((firstLanTestInfo) => {
      let newFirstLanTestInfo = {};
      Object.keys(firstLanTestInfo).forEach((testSubject) => {
        const testScore = firstLanTestInfo[testSubject].testScore;
        newFirstLanTestInfo[testSubject] = {
          testScore,
          clb: lanTestToClb(testScore, e.target.value, testSubject),
          score: clbToScore(
            lanTestToClb(testScore, e.target.value, testSubject),
            isSingle,
            false,
            true
          ),
        };
      });
      return newFirstLanTestInfo;
    });
  };

  const onFirstLanChanged = (e, testSubject) => {
    const rawTestScore = e.target.value;
    const testScore = Number(rawTestScore);
    if (!Number.isNaN(testScore)) {
      setFirstLanTestInfo((firstLanTestInfo) => {
        return {
          ...firstLanTestInfo,
          [testSubject]: {
            testScore,
            clb: lanTestToClb(testScore, firstLanTestType, testSubject),
            score: clbToScore(
              lanTestToClb(testScore, firstLanTestType, testSubject),
              isSingle,
              false,
              true
            ),
          },
        };
      });
    }
  };

  const onSecondLanEnabledChanged = (e) => {
    setSecondLanEnabled(e.target.checked);
    if (e.target.checked === false) {
      setSecondLanTestType(null);
      setSecondLanTestInfo(initialTestInfo);
    }
  };

  const onSecondLanTestTypeChanged = (e) => {
    setSecondLanTestType(e.target.value);
    setSecondLanTestInfo((secondLanTestInfo) => {
      let newSecondLanTestInfo = {};
      Object.keys(secondLanTestInfo).forEach((testSubject) => {
        const testScore = secondLanTestInfo[testSubject].testScore;
        newSecondLanTestInfo[testSubject] = {
          testScore,
          clb: lanTestToClb(testScore, e.target.value, testSubject),
          score: clbToScore(
            lanTestToClb(testScore, e.target.value, testSubject),
            isSingle,
            false,
            false
          ),
        };
      });
      return newSecondLanTestInfo;
    });
  };

  const onSecondLanChanged = (e, testSubject) => {
    const rawTestScore = e.target.value;
    const testScore = Number(rawTestScore);
    if (!Number.isNaN(testScore)) {
      setSecondLanTestInfo((secondLanTestInfo) => {
        return {
          ...secondLanTestInfo,
          [testSubject]: {
            testScore,
            clb: lanTestToClb(testScore, secondLanTestType, testSubject),
            score: clbToScore(
              lanTestToClb(testScore, secondLanTestType, testSubject),
              isSingle,
              false,
              false
            ),
          },
        };
      });
    }
  };

  const onExpChanged = (e) => {
    const rawExp = e.target.value;
    const exp = Number(rawExp);
    if (!Number.isNaN(exp) && exp >= 0) {
      setExp(exp);
    } else {
      setExp(null);
    }
  };

  const onOverseasExpChanged = (e) => {
    const rawOverseasExp = e.target.value;
    const overseasExp = Number(rawOverseasExp);
    if (!Number.isNaN(overseasExp) && overseasExp >= 0) {
      setOverseasExp(overseasExp);
    } else {
      setOverseasExp(null);
    }
  };

  const onSpouseLanEnabledChanged = (e) => {
    setSpouseLanEnabled(e.target.checked);
    if (e.target.checked === false) {
      setSpouseLanTestType(null);
      setSpouseLanTestInfo(initialTestInfo);
    }
  };

  const onSpouseLanTestTypeChanged = (e) => {
    setSpouseLanTestType(e.target.value);
    setSpouseLanTestInfo((spouseLanTestInfo) => {
      let newSpouseLanTestInfo = {};
      Object.keys(spouseLanTestInfo).forEach((testSubject) => {
        const testScore = spouseLanTestInfo[testSubject].testScore;
        const clb = lanTestToClb(testScore, e.target.value, testSubject);
        newSpouseLanTestInfo[testSubject] = {
          testScore,
          clb,
          score: clbToScore(clb, isSingle, true, false),
        };
      });
      return newSpouseLanTestInfo;
    });
  };

  const onSpouseLanChanged = (e, testSubject) => {
    const rawTestScore = e.target.value;
    const testScore = Number(rawTestScore);
    if (!Number.isNaN(testScore)) {
      setSpouseLanTestInfo((spouseLanTestInfo) => {
        return {
          ...spouseLanTestInfo,
          [testSubject]: {
            testScore,
            clb: lanTestToClb(testScore, spouseLanTestType, testSubject),
            score: clbToScore(
              lanTestToClb(testScore, spouseLanTestType, testSubject),
              isSingle,
              true,
              false
            ),
          },
        };
      });
    }
  };

  const onSpouseExpChanged = (e) => {
    const rawSpouseExp = e.target.value;
    const spouseExp = Number(rawSpouseExp);
    if (!Number.isNaN(spouseExp) && spouseExp >= 0) {
      setSpouseExp(spouseExp);
    } else {
      setSpouseExp(null);
    }
  };

  const onHasProvincialNomineeChanged = (e) => {
    setHasProvincialNominee(e.target.checked);
  };

  const onEmployerTypeChanged = (e) => {
    setEmployerType(e.target.value);
  };

  const onCanadaEduDegreeChanged = (e) => {
    setCanadaEduDegree(e.target.value);
  };

  const onHasSiblingChanged = (e) => {
    setHasSibling(e.target.checked);
  };

  const onHasCertificateChanged = (e) => {
    setHasCertificate(e.target.checked);
  };

  return html`<div style="overflow-x: auto;">
      <table class="table table-bordered crs-table-inner">
        <tbody>
          <tr>
            <td width="15%">??????</td>
            <td colspan="2">
              <label>
                <input
                  type="radio"
                  name="maritalStatus"
                  ?checked=${isSingle}
                  @change=${(e) => onIsSingleChanged(e, true)}
                />
                ???????????????????????????
              </label>
              <label>
                <input
                  type="radio"
                  name="maritalStatus"
                  ?checked=${!isSingle}
                  @change=${(e) => onIsSingleChanged(e, false)}
                />
                ????????????????????????
              </label>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              A. ??????/?????????????????? Core / human capital factors
            </td>
            <td>
              ${displayMaxAndRealScores(
                isSingle ? 500 : 460,
                ageToScore(age, isSingle) +
                  eduToScore(eduLevel, isSingle, false) +
                  lanToScore(firstLanTestInfo, isSingle, false, true) +
                  lanToScore(secondLanTestInfo, isSingle, false, false) +
                  expToScore(exp, isSingle, false)
              )}
            </td>
          </tr>
          <tr>
            <td>??????</td>
            <td width="70%" class="left">
              <select
                name="age"
                @change=${onAgeChanged}
                style="width: 200px; max-width: 100%;"
              >
                ${AGE_LEVELS.map(
                  (level) => html`<option value=${level}>${level}</option>`
                )}
              </select>
            </td>
            <td width="15%"><span>${ageToScore(age, isSingle)}</span></td>
          </tr>
          <tr>
            <td>??????</td>
            <td class="left">
              <div class="form-group">
                <label>??????????????????</label>
                ${EDU_LEVELS.map(
                  (eduLevelName) =>
                    html`<div class="radio">
                      <label>
                        <input
                          type="radio"
                          value=${eduLevelName}
                          name="eduLevel"
                          ?checked=${eduLevel === eduLevelName}
                          @change=${(e) => setEduLevel(e.target.value)}
                        />
                        ${eduLevelName}
                      </label>
                    </div>`
                )}
              </div>
              <br />
              <div class="form-group">
                <label>?????????????????????????????????</label>
                ${CANADA_EDU_DEGREES.map(
                  (canadaEduDegreeName) =>
                    html`<div class="radio">
                      <label>
                        <input
                          type="radio"
                          value=${canadaEduDegreeName}
                          name="canadaEduDegree"
                          ?checked=${canadaEduDegree === canadaEduDegreeName}
                          @change=${onCanadaEduDegreeChanged}
                        />
                        ${canadaEduDegreeName}
                      </label>
                    </div>`
                )}
              </div>
              <div class="checkbox">
                <label>
                  <input
                    type="checkbox"
                    ?checked=${hasCertificate}
                    @change=${onHasCertificateChanged}
                  />
                  ????????????????????????????????????????????????Red Seal?????????
                </label>
              </div>
            </td>
            <td><span>${eduToScore(eduLevel, isSingle, false)}</span></td>
          </tr>
          <tr>
            <td>????????????</td>
            <td class="left">
              ${LAN_TEST_TYPES.map(
                (testType) =>
                  html`<div class="radio">
                    <label>
                      <input
                        type="radio"
                        value=${testType}
                        name="firstLanTestType"
                        ?checked=${testType === firstLanTestType}
                        @change=${onFirstLanTestTypeChanged}
                      />
                      ${testType}
                    </label>
                  </div>`
              )}
              ${firstLanTestType &&
              html`${LAN_TEST_SUBJECTS.map(
                  (testSubject) =>
                    html`<div class="form-group">
                      <label>
                        ${testSubject}
                        <input
                          type="text"
                          @keyup=${(e) => onFirstLanChanged(e, testSubject)}
                        />
                        ${firstLanTestInfo[testSubject].score > 0
                          ? html`<span>
                              CLB${firstLanTestInfo[testSubject]
                                .clb}???${firstLanTestInfo[testSubject].score}???
                            </span>`
                          : null}
                      </label>
                    </div>`
                )}
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      ?checked=${secondLanEnabled}
                      @change=${onSecondLanEnabledChanged}
                    />
                    ?????????????????????????????????
                  </label>
                </div>`}
            </td>
            <td>
              <span
                >${lanToScore(firstLanTestInfo, isSingle, false, true)}</span
              >
            </td>
          </tr>
          ${secondLanEnabled
            ? html`<tr>
                <td>????????????</td>
                <td class="left">
                  ${LAN_TEST_TYPES.filter((testType) => {
                    return (
                      (ENGLISH_TEST_TYPES.includes(testType) &&
                        !ENGLISH_TEST_TYPES.includes(firstLanTestType)) ||
                      (FRENCH_TEST_TYPES.includes(testType) &&
                        !FRENCH_TEST_TYPES.includes(firstLanTestType))
                    );
                  }).map(
                    (testType) =>
                      html`<div class="radio">
                        <label>
                          <input
                            type="radio"
                            value=${testType}
                            name="secondLanTestType"
                            ?checked=${testType === secondLanTestType}
                            @change=${onSecondLanTestTypeChanged}
                          />
                          ${testType}
                        </label>
                      </div>`
                  )}
                  ${secondLanTestType &&
                  html`${LAN_TEST_SUBJECTS.map(
                    (testSubject) =>
                      html`<div class="form-group">
                        <label>
                          ${testSubject}
                          <input
                            type="text"
                            @keyup=${(e) => onSecondLanChanged(e, testSubject)}
                          />
                          ${secondLanTestInfo[testSubject].score > 0
                            ? html`<span>
                                CLB${secondLanTestInfo[testSubject]
                                  .clb}???${secondLanTestInfo[testSubject]
                                  .score}???
                              </span>`
                            : null}
                        </label>
                      </div>`
                  )}`}
                </td>
                <td>
                  <span
                    >${lanToScore(
                      secondLanTestInfo,
                      isSingle,
                      false,
                      false
                    )}</span
                  >
                </td>
              </tr>`
            : null}
          <tr>
            <td>????????????</td>
            <td class="left">
              <div class="form-group">
                <label>??????????????????????????????????????????</label>
                ${EXP_LEVELS.map(
                  ([expFakeYear, expName]) =>
                    html`<div class="radio">
                      <label>
                        <input
                          type="radio"
                          value=${expFakeYear}
                          name="exp"
                          ?checked=${exp === expFakeYear}
                          @change=${onExpChanged}
                        />
                        ${expName}
                      </label>
                    </div>`
                )}
              </div>
              <br />
              <div class="form-group">
                <label>?????????????????????????????????????????????</label>
                ${OVERSEAS_EXP_LEVELS.map(
                  ([overseasFakeYear, overseasExpName]) =>
                    html`<div class="radio">
                      <label>
                        <input
                          type="radio"
                          value=${overseasFakeYear}
                          name="overseasExp"
                          ?checked=${overseasExp === overseasFakeYear}
                          @change=${onOverseasExpChanged}
                        />
                        ${overseasExpName}
                      </label>
                    </div>`
                )}
              </div>
              <p>
                ?????????????????????????????????????????????????????????????????????????????????????????????<br />
                ?????????????????????NOC???0???A??????B???
              </p>
            </td>
            <td><span>${expToScore(exp, isSingle, false)}</span></td>
          </tr>
          <tr>
            <td colspan="2">B. ???????????? Spouse factors</td>
            <td>
              ${displayMaxAndRealScores(
                isSingle ? 0 : 40,
                eduToScore(spouseEduLevel, isSingle, true) +
                  lanToScore(spouseLanTestInfo, isSingle, true, false) +
                  expToScore(spouseExp, isSingle, true)
              )}
            </td>
          </tr>
          ${!isSingle
            ? html`<tr>
                  <td>????????????</td>
                  <td class="left">
                    ${EDU_LEVELS.map(
                      (eduLevelName) =>
                        html`<div class="radio">
                          <label>
                            <input
                              type="radio"
                              value=${eduLevelName}
                              name="spouseEduLevel"
                              ?checked=${spouseEduLevel === eduLevelName}
                              @change=${(e) =>
                                setSpouseEduLevel(e.target.value)}
                            />
                            ${eduLevelName}
                          </label>
                        </div>`
                    )}
                    <div class="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          ?checked=${spouseLanEnabled}
                          @change=${onSpouseLanEnabledChanged}
                        />
                        ????????????????????????
                      </label>
                    </div>
                  </td>
                  <td>
                    <span>${eduToScore(spouseEduLevel, isSingle, true)}</span>
                  </td>
                </tr>
                ${spouseLanEnabled
                  ? html`<tr>
                      <td>??????????????????</td>
                      <td class="left">
                        ${LAN_TEST_TYPES.map(
                          (testType) =>
                            html`<div class="radio">
                              <label>
                                <input
                                  type="radio"
                                  value=${testType}
                                  name="spouseLanTestType"
                                  ?checked=${testType === spouseLanTestType}
                                  @change=${onSpouseLanTestTypeChanged}
                                />
                                ${testType}
                              </label>
                            </div>`
                        )}
                        ${spouseLanTestType &&
                        html`${LAN_TEST_SUBJECTS.map(
                          (testSubject) =>
                            html`<div class="form-group">
                              <label>
                                ${testSubject}
                                <input
                                  type="text"
                                  @keyup=${(e) =>
                                    onSpouseLanChanged(e, testSubject)}
                                />
                                ${spouseLanTestInfo[testSubject].score > 0
                                  ? html`<span>
                                      CLB${spouseLanTestInfo[testSubject]
                                        .clb}???${spouseLanTestInfo[testSubject]
                                        .score}???
                                    </span>`
                                  : null}
                              </label>
                            </div>`
                        )}`}
                      </td>
                      <td>
                        <span>
                          ${lanToScore(
                            spouseLanTestInfo,
                            isSingle,
                            true,
                            false
                          )}
                        </span>
                      </td>
                    </tr>`
                  : null}

                <tr>
                  <td>??????????????????</td>
                  <td class="left">
                    <div class="form-group">
                      <label>??????????????????????????????????????????</label>
                      ${EXP_LEVELS.map(
                        ([spouseExpFakeYear, spouseExpName]) =>
                          html`<div class="radio">
                            <label>
                              <input
                                type="radio"
                                value=${spouseExpFakeYear}
                                name="spouseExp"
                                ?checked=${spouseExp === spouseExpFakeYear}
                                @change=${onSpouseExpChanged}
                              />
                              ${spouseExpName}
                            </label>
                          </div>`
                      )}
                    </div>
                    <p>?????????????????????NOC???0???A??????B???</p>
                  </td>
                  <td>
                    <span>${expToScore(spouseExp, isSingle, true)}</span>
                  </td>
                </tr>`
            : null}
          <tr>
            <td colspan="2">
              C. ????????????????????????????????? Skill transferability factors
            </td>
            <td>
              ${displayMaxAndRealScores(
                100,
                Math.min(
                  100,
                  transferEduToScore(
                    transferEduMultiplyLanToScore(eduLevel, firstLanTestInfo),
                    transferEduMultiplyExpToScore(eduLevel, exp)
                  ) +
                    transferOverseasExpToScore(
                      transferOverseasExpMultiplyLanToScore(
                        overseasExp,
                        firstLanTestInfo
                      ),
                      transferOverseasExpMultiplyExpToScore(overseasExp, exp)
                    ) +
                    transferCertificateMultiplyLanToScore(
                      hasCertificate,
                      firstLanTestInfo
                    )
                )
              )}
            </td>
          </tr>
          <tr>
            <td>
              ??????<br />
              ??????50???
            </td>
            <td class="left">
              <div class="form-group">
                <label>????????????????????????</label>
                <p>????????????x????????????</p>
                <p>
                  ???????????????
                  <span>
                    ${transferEduMultiplyLanToScore(eduLevel, firstLanTestInfo)}
                  </span>
                </p>
                <ul>
                  <li>
                    <p>
                      1??????????????????<strong>??????</strong>???????????????????????????CLB7???????????????????????????????????????
                    </p>
                  </li>
                  <li>
                    <p>
                      ????????????????????????????????????????????????CLB9???????????????????????????????????????
                    </p>
                  </li>
                </ul>
                <p>????????????x?????????????????????</p>
                <p>
                  ???????????????
                  <span>${transferEduMultiplyExpToScore(eduLevel, exp)}</span>
                </p>
                <ul>
                  <li>
                    <p>
                      1??????????????????<strong>??????</strong>??????????????????1????????????????????????
                    </p>
                  </li>
                  <li><p>?????????????????????????????????????????????????????????????????????</p></li>
                </ul>
              </div>
            </td>
            <td>
              <span>
                ${transferEduToScore(
                  transferEduMultiplyLanToScore(eduLevel, firstLanTestInfo),
                  transferEduMultiplyExpToScore(eduLevel, exp)
                )}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              ??????????????????<br />
              ??????50???
            </td>
            <td class="left">
              <div class="form-group">
                <label>????????????????????????</label>
                <p>????????????????????????????????????x????????????</p>
                <p>
                  ???????????????
                  <span>
                    ${transferOverseasExpMultiplyLanToScore(
                      overseasExp,
                      firstLanTestInfo
                    )}
                  </span>
                </p>
                <ul>
                  <li>
                    <p>
                      1?????????????????????<strong>??????</strong>???????????????????????????CLB7???????????????????????????????????????
                    </p>
                  </li>
                  <li>
                    <p>
                      3??????????????????????????????????????????????????????CLB9???????????????????????????????????????
                    </p>
                  </li>
                </ul>
                <p>??????????????????x?????????????????????</p>
                <p>
                  ???????????????
                  <span>
                    ${transferOverseasExpMultiplyExpToScore(overseasExp, exp)}
                  </span>
                </p>
                <ul>
                  <li>
                    <p>
                      ????????????1???<strong>??????</strong>???????????????1????????????????????????
                    </p>
                  </li>
                  <li>
                    <p>3???????????????????????????????????????????????????????????????????????????</p>
                  </li>
                </ul>
              </div>
            </td>
            <td>
              <span
                >${transferOverseasExpToScore(
                  transferOverseasExpMultiplyLanToScore(
                    overseasExp,
                    firstLanTestInfo
                  ),
                  transferOverseasExpMultiplyExpToScore(overseasExp, exp)
                )}</span
              >
            </td>
          </tr>
          <tr>
            <td>
              ????????????<br />
              ??????50???
            </td>
            <td class="left">
              <div class="form-group">
                <label>????????????????????????</label>
                <p>????????????????????????????????????x????????????</p>
                <p>
                  ???????????????
                  <span>
                    ${transferCertificateMultiplyLanToScore(
                      hasCertificate,
                      firstLanTestInfo
                    )}
                  </span>
                </p>
                <ul>
                  <li>
                    <p>
                      ??????????????????????????????????????????<strong>??????</strong>???????????????????????????CLB5???????????????????????????????????????
                    </p>
                  </li>
                  <li>
                    <p>
                      ??????????????????????????????????????????<strong>??????</strong>???????????????????????????CLB7???????????????????????????????????????
                    </p>
                  </li>
                </ul>
              </div>
            </td>
            <td>
              <span
                >${transferCertificateMultiplyLanToScore(
                  hasCertificate,
                  firstLanTestInfo
                )}</span
              >
            </td>
          </tr>
          <tr>
            <td colspan="2">D. ????????? Additional points</td>
            <td>
              ${displayMaxAndRealScores(
                600,
                additionalToScore(
                  hasProvincialNominee,
                  employerType,
                  canadaEduDegree,
                  hasSibling,
                  additionalFrenchToScore(
                    firstLanTestType,
                    firstLanTestInfo,
                    secondLanTestType,
                    secondLanTestInfo
                  )
                )
              )}
            </td>
          </tr>
          <tr>
            <td>?????????</td>
            <td class="left">
              <div class="checkbox">
                <label>
                  <input
                    type="checkbox"
                    ?checked=${hasProvincialNominee}
                    @change=${onHasProvincialNomineeChanged}
                  />
                  ????????????EE??????????????????
                </label>
              </div>
            </td>
            <td>
              <span>
                ${additionalProvincialNomineeToScore(hasProvincialNominee)}
              </span>
            </td>
          </tr>
          <tr>
            <td>???????????????LMIA????????????????????????</td>
            <td class="left">
              ${EMPLOYER_TYPES.map(
                (employerTypeName) =>
                  html`<div class="radio">
                    <label>
                      <input
                        type="radio"
                        value=${employerTypeName}
                        name="employerType"
                        ?checked=${employerType === employerTypeName}
                        @change=${onEmployerTypeChanged}
                      />
                      ${employerTypeName}
                    </label>
                  </div>`
              )}
            </td>
            <td>
              <span>${additionalEmployerToScore(employerType)}</span>
            </td>
          </tr>
          <tr>
            <td>?????????????????????</td>
            <td class="left"><p>????????????????????????????????????????????????</p></td>
            <td>
              <span>${additionalCanadaEduToScore(canadaEduDegree)}</span>
            </td>
          </tr>
          <tr>
            <td>????????????</td>
            <td class="left"><p>???????????? CLB7 ?????????????????????????????????</p></td>
            <td>
              <span
                >${additionalFrenchToScore(
                  firstLanTestType,
                  firstLanTestInfo,
                  secondLanTestType,
                  secondLanTestInfo
                )}</span
              >
            </td>
          </tr>
          <tr>
            <td>??????????????????</td>
            <td class="left">
              <div class="checkbox">
                <label>
                  <input
                    type="checkbox"
                    ?checked=${hasSibling}
                    @change=${onHasSiblingChanged}
                  />
                  ??????????????????????????????????????????
                </label>
              </div>
            </td>
            <td>
              <span>${additionalSiblingToScore(hasSibling)}</span>
            </td>
          </tr>
          <tr>
            <td colspan="2">??????</td>
            <td>
              <span>
                ${displayMaxAndRealScores(
                  1200,
                  getFinalScore(
                    ageToScore(age, isSingle),
                    eduToScore(eduLevel, isSingle, false),
                    lanToScore(firstLanTestInfo, isSingle, false, true),
                    expToScore(exp, isSingle, false),
                    lanToScore(secondLanTestInfo, isSingle, false, false),
                    eduToScore(spouseEduLevel, isSingle, true),
                    lanToScore(spouseLanTestInfo, isSingle, true, false),
                    expToScore(spouseExp, isSingle, true),
                    transferEduToScore(
                      transferEduMultiplyLanToScore(eduLevel, firstLanTestInfo),
                      transferEduMultiplyExpToScore(eduLevel, exp)
                    ),
                    transferOverseasExpToScore(
                      transferOverseasExpMultiplyLanToScore(
                        overseasExp,
                        firstLanTestInfo
                      ),
                      transferOverseasExpMultiplyExpToScore(overseasExp, exp)
                    ),
                    transferCertificateMultiplyLanToScore(
                      hasCertificate,
                      firstLanTestInfo
                    ),
                    additionalToScore(
                      hasProvincialNominee,
                      employerType,
                      canadaEduDegree,
                      hasSibling,
                      additionalFrenchToScore(
                        firstLanTestType,
                        firstLanTestInfo,
                        secondLanTestType,
                        secondLanTestInfo
                      )
                    )
                  )
                )}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <style>
      .crs-table-inner .radio:first-child {
        margin-top: 0;
      }
      .crs-table-inner .form-group {
        margin-bottom: 0;
      }
      .crs-table-inner .form-group ul {
        padding-left: 20px;
      }
      .crs-table-inner p {
        max-height: 999999px;
      }
    </style>`;
}

customElements.define(
  "crs-form",
  component(CRSForm, {
    observedAttributes: [],
    useShadowDOM: false,
  })
);
