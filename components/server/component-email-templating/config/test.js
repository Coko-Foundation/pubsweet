module.exports = {
  mailer: {
    from: 'nobody@example.com',
    path: `${__dirname}/mailer-mock`,
  },
  journal: {
    name: 'Coko Foundation',
    staffEmail: 'Coko <team@coko.foundation>',
    logo: 'https://coko.foundation/wp-content/uploads/2017/11/logo-coko.png',
    ctaColor: '#EE2B77',
    logoLink: 'https://coko.foundation/',
    publisher: 'Coko Foundation',
    privacy: '',
    address: '2973 16th St., Suite 300, San Francisco, CA 94103',
    footerText:
      'You have received this email in regards to the account creation, submission, or peer review process of a paper submitted to a journal published by Coko Foundation.',
  },
}
