const Joi = require('joi')

module.exports = {
  manuscripts: Joi.any()
    .valid([
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/pdf',
      'application/msword',
    ])
    .error(new Error('Only Word documents and PDFs are allowed')),
  supplementary: Joi.any(),
  coverLetter: Joi.any()
    .valid([
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/pdf',
      'application/msword',
    ])
    .error(new Error('Only Word documents and PDFs are allowed')),
}
