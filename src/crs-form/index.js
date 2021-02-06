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
            <td width="15%">婚姻</td>
            <td colspan="2">
              <label>
                <input
                  type="radio"
                  name="maritalStatus"
                  ?checked=${isSingle}
                  @change=${(e) => onIsSingleChanged(e, true)}
                />
                单身或不带伴侣申请
              </label>
              <label>
                <input
                  type="radio"
                  name="maritalStatus"
                  ?checked=${!isSingle}
                  @change=${(e) => onIsSingleChanged(e, false)}
                />
                带配偶或伴侣申请
              </label>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              A. 核心/人力资本因素 Core / human capital factors
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
            <td>年龄</td>
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
            <td>学历</td>
            <td class="left">
              <div class="form-group">
                <label>现有最高学历</label>
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
                <label>在加拿大取得的最高学历</label>
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
                  我有加拿大认证的专业技工证书（如Red Seal证书）
                </label>
              </div>
            </td>
            <td><span>${eduToScore(eduLevel, isSingle, false)}</span></td>
          </tr>
          <tr>
            <td>第一语言</td>
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
                                .clb}：${firstLanTestInfo[testSubject].score}分
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
                    同时拥有第二门语言成绩
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
                <td>第二语言</td>
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
                                  .clb}：${secondLanTestInfo[testSubject]
                                  .score}分
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
            <td>工作经验</td>
            <td class="left">
              <div class="form-group">
                <label>加拿大工作经验（可以不连续）</label>
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
                <label>非加拿大工作经验（可以不连续）</label>
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
                非加拿大的工作经验不能直接产生分数，但是在后续交叉项有可能算分<br />
                工作经验必须是NOC的0、A或者B类
              </p>
            </td>
            <td><span>${expToScore(exp, isSingle, false)}</span></td>
          </tr>
          <tr>
            <td colspan="2">B. 配偶因素 Spouse factors</td>
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
                  <td>配偶学历</td>
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
                        配偶拥有语言成绩
                      </label>
                    </div>
                  </td>
                  <td>
                    <span>${eduToScore(spouseEduLevel, isSingle, true)}</span>
                  </td>
                </tr>
                ${spouseLanEnabled
                  ? html`<tr>
                      <td>配偶第一语言</td>
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
                                        .clb}：${spouseLanTestInfo[testSubject]
                                        .score}分
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
                  <td>配偶工作经验</td>
                  <td class="left">
                    <div class="form-group">
                      <label>加拿大工作经验（可以不连续）</label>
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
                    <p>工作经验必须是NOC的0、A或者B类</p>
                  </td>
                  <td>
                    <span>${expToScore(spouseExp, isSingle, true)}</span>
                  </td>
                </tr>`
            : null}
          <tr>
            <td colspan="2">
              C. 迁移能力因素（交叉项） Skill transferability factors
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
              教育<br />
              最高50分
            </td>
            <td class="left">
              <div class="form-group">
                <label>本栏自动计算分数</label>
                <p>教育背景x语言能力</p>
                <p>
                  您的得分：
                  <span>
                    ${transferEduMultiplyLanToScore(eduLevel, firstLanTestInfo)}
                  </span>
                </p>
                <ul>
                  <li>
                    <p>
                      1年大专及以上<strong>同时</strong>第一语言每一项都有CLB7级（含）以上，可以获得分数
                    </p>
                  </li>
                  <li>
                    <p>
                      双学位以上或者第一语言每一项都有CLB9级（含）以上，会有更多分数
                    </p>
                  </li>
                </ul>
                <p>教育背景x加拿大工作经验</p>
                <p>
                  您的得分：
                  <span>${transferEduMultiplyExpToScore(eduLevel, exp)}</span>
                </p>
                <ul>
                  <li>
                    <p>
                      1年大专及以上<strong>同时</strong>加拿大工作过1年，可以获得分数
                    </p>
                  </li>
                  <li><p>双学位以上或者加拿大工作两年以上，会有更多分数</p></li>
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
              海外工作经验<br />
              最高50分
            </td>
            <td class="left">
              <div class="form-group">
                <label>本栏自动计算分数</label>
                <p>海外（包括中国）工作经验x语言能力</p>
                <p>
                  您的得分：
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
                      1年海外工作经历<strong>同时</strong>第一语言每一项都有CLB7级（含）以上，可以获得分数
                    </p>
                  </li>
                  <li>
                    <p>
                      3年海外工作经历或者第一语言每一项都有CLB9级（含）以上，会有更多分数
                    </p>
                  </li>
                </ul>
                <p>海外工作经验x加拿大工作经验</p>
                <p>
                  您的得分：
                  <span>
                    ${transferOverseasExpMultiplyExpToScore(overseasExp, exp)}
                  </span>
                </p>
                <ul>
                  <li>
                    <p>
                      海外工作1年<strong>同时</strong>加拿大工作1年，可以获得分数
                    </p>
                  </li>
                  <li>
                    <p>3年海外工作经历或者加拿大工作两年以上，会有更多分数</p>
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
              技工证书<br />
              最高50分
            </td>
            <td class="left">
              <div class="form-group">
                <label>本栏自动计算分数</label>
                <p>加拿大认证的专业技工证书x语言能力</p>
                <p>
                  您的得分：
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
                      拥有加拿大认证的专业技工证书<strong>同时</strong>第一语言每一项都有CLB5级（含）以上，可以获得分数
                    </p>
                  </li>
                  <li>
                    <p>
                      拥有加拿大认证的专业技工证书<strong>同时</strong>第一语言每一项都有CLB7级（含）以上，会有更多分数
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
            <td colspan="2">D. 附加分 Additional points</td>
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
            <td>省提名</td>
            <td class="left">
              <div class="checkbox">
                <label>
                  <input
                    type="checkbox"
                    ?checked=${hasProvincialNominee}
                    @change=${onHasProvincialNomineeChanged}
                  />
                  我有省提名
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
            <td>雇主担保（LMIA或者封闭式工签）</td>
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
            <td>加拿大学历加分</td>
            <td class="left"><p>取得过加拿大学历自动产生附加分。</p></td>
            <td>
              <span>${additionalCanadaEduToScore(canadaEduDegree)}</span>
            </td>
          </tr>
          <tr>
            <td>法语加分</td>
            <td class="left"><p>法语达到 CLB7 以上会自动产生附加分。</p></td>
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
            <td>兄弟姐妹加分</td>
            <td class="left">
              <div class="checkbox">
                <label>
                  <input
                    type="checkbox"
                    ?checked=${hasSibling}
                    @change=${onHasSiblingChanged}
                  />
                  申请人或配偶有加拿大兄弟姐妹
                </label>
              </div>
            </td>
            <td>
              <span>${additionalSiblingToScore(hasSibling)}</span>
            </td>
          </tr>
          <tr>
            <td colspan="2">总分</td>
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
