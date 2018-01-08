import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { computeICOTransparency, criticalToTransparencyLevel, icoTransparencyMap } from '../utils';
import config from '../config';


const getStatusForQuestion = (issues, key, status) => issues[key] ? `${criticalToTransparencyLevel(config.matrix[key].critical)}-${status}` : '';

export default(props) => {
  const { decision, name, matrix } = props;
  const result = computeICOTransparency(matrix);
  const status = result[0];
  const issues = result[1];

  const element = document.getElementById('decision');
  if (props.pagePointer && element) {
    element.scrollIntoView(true);
  }

  return (<div className="modal-container">
    <Row>
      <Col md={12}>
        <h3>Transparency decision table</h3>
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
      </Col>
    </Row>
  </div>);
};
