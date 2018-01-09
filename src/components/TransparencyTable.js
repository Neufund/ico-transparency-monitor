import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { computeICOTransparency, criticalToTransparencyLevel, scrollPage } from '../utils';
import config from '../config';

const getStatusForQuestion = (issues, key, status) => issues[key] ? `${criticalToTransparencyLevel(config.matrix[key].critical)}-${status}` : '';

export default (props) => {
  const { matrix, tableStatus } = props;
  const result = computeICOTransparency(matrix);
  const issues = result[1];

  return (
    <div className={`row transparency-table transparency-table-${tableStatus}`} id="table">
      <div className="modal-container">
        <Row>
          <div className="modal-title-container">
            <div className="modal-title">
              <p className="ico-paragraph">
                These criteria are chosen based on the concept of
                trustless-trust. You can read more about it &nbsp;
                <a href="https://github.com/Neufund/ico-transparency-monitor#adding-custom-icos-to-the-transparency-monitor" target="_blank" rel="noopener noreferrer">here</a>
                &nbsp;If you want to submit new criteria please do it via github&nbsp;<a href="https://github.com/Neufund/ico-transparency-monitor#adding-custom-icos-to-the-transparency-monitor" target="_black" rel="noopener noreferrer">here</a>.
              </p>
            </div>
            <button
              className="show-stats"
              onClick={() => {
                scrollPage('statistics');
              }}
            >Show Statistics</button>
          </div>
        </Row>

        <Row>
          <Col md={12}>
            <div className="title-container">

              <table className="pure-table">
                <thead />
                <tbody>
                  {Object.keys(config.matrix).map((key, index) => {
                    const currentQuestion = matrix[key];
                    const mappedQuestionMatrix = config.matrix[key];
                    const rowClassName = getStatusForQuestion(issues, key, 'row');
                    const messageClassName = getStatusForQuestion(issues, key, 'alert');

                    return (<tr key={`${key}`}>
                      <td className={rowClassName}>
                        {mappedQuestionMatrix.question}
                        <p className={`alert-error ${messageClassName}`}>{currentQuestion.comment}</p>
                      </td>
                      <th>
                        {/* eslint-disable */}
                        <p>{currentQuestion.answer === null ? 'N/A' : (currentQuestion.answer ? 'Yes' : 'No')}</p>
                        {/* eslint-enable */}
                      </th>
                    </tr>);
                  })}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </div>
    </div>);
};
