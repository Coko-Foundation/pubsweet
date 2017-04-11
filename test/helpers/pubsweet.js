const port = process.env.PORT || '3000'
const home = process.env.PUBSWEET_URL || `http://localhost:${port}`

const routeurl = route => `${home}/${route}`

const gotoroute = route => nightmare => nightmare.goto(routeurl(route))

const gohome = () => nightmare => nightmare.goto(home).wait('#root')

// signup

const signupform = {
  username: 'form div:nth-child(1) input',
  email: 'form div:nth-child(2) input',
  password: 'form div:nth-child(3) input',
  submit: 'form button'
}

const gotosignup = () => nightmare => nightmare
  .use(gotoroute('signup'))
  .wait('#root form button')

// login

const loginform = {
  username: 'form input[type=text]',
  password: 'form input[type=password]',
  submit: 'form button'
}

const gotologin = () => nightmare => nightmare
  .use(gotoroute('login'))
  .wait('#root form button')

// teams

const newteamroot = '#root > div > div > div > div:nth-child(2) > div > div > div'
const newteamform = {
  name: `${newteamroot} > div.form-group > input`,
  type: `${newteamroot} > div.row > div.col-md-3 > div > div.Select-control input`,
  typechoice: n => `${newteamroot} > div.row > div.col-md-3 > div > div.Select-menu-outer > div > div:nth-child(${n})`,
  fragment: `${newteamroot} > div.row > div:nth-child(2) > div > div.Select-control input`,
  fragmentchoice: n => `${newteamroot} > div.row > div:nth-child(2) > div > div.Select-menu-outer > div > div:nth-child(${n})`,
  collection: `${newteamroot} > div.row > div:nth-child(4) > div > div.Select-control input`,
  collectionchoice: n => `${newteamroot} > div.row > div:nth-child(4) > div > div.Select-menu-outer > div > div:nth-child(${n})`,
  submit: `${newteamroot} > button`
}

const editteamform = {
  addmember: () => {
    return '#root > div > div > div > div:nth-child(2) table tbody tr:nth-child(1) > td:nth-child(5) .Select-input input'
  },
  memberchoice: (team, n) => {
    return `#root > div > div > div > div:nth-child(2) table tbody tr:nth-child(1) > td:nth-child(5) div.Select-menu-outer > div > div:nth-child(${n})`
  }
}

const gototeams = () => nightmare => nightmare.use(gotoroute('manage/teams'))

// posts
const newpostroot = '#root > div > div > div > div:nth-child(2) > div > div > div:nth-child(4)'
const newpostform = {
  title: `${newpostroot} > div > input`,
  submit: `${newpostroot} > button`
}
const editpostform = {
  edit: 'a[title="Edit"]',
  publish: 'button[title="Publish"]',
  unpublish: 'button[title="Unpublish"]',
  delete: 'button[title="Delete"]'
}
const gotoposts = () => nightmare => nightmare.use(gotoroute('manage/posts'))

// writer
const writerroot = '.sc-lens-writer > div > .sc-split-pane.sm-vertical'
const writer = {
  title: `${writerroot} .title[contenteditable=true]`,
  abstract: `${writerroot} .abstract[contenteditable=true]`,
  content: `${writerroot} .document-content > div[contenteditable=true]`,
  save: `${writerroot} div[title="Save"] > button`
}

// export
module.exports = {
  port: port,
  home: home,
  routeurl: routeurl,
  gotoroute: gotoroute,
  gohome: gohome,

  // signup
  gotosignup: gotosignup,
  signupform: signupform,
  signup: user => nightmare => nightmare
    .use(gotosignup())
    .type(signupform.username, user.username)
    .type(signupform.email, user.email)
    .type(signupform.password, user.password)
    .click(signupform.submit),

  // login
  gotologin: gotologin,
  loginform: loginform,
  login: user => nightmare => nightmare
    .use(gotologin())
    .type(loginform.username, user.username)
    .type(loginform.password, user.password)
    .click(loginform.submit),
  logout: () => nightmare => nightmare
    .use(gotoposts())
    .wait('.logout')
    .click('.logout > a'),

  // teams
  gotoManageTeams: gototeams,
  newteamform: newteamform,
  createteam: team => nightmare => nightmare
    .use(gototeams())
    .waitForUrl(/manage.teams/)
    .wait('input')
    .type(newteamform.name, team.name)
    .type(newteamform.type, team.type)
    .click(newteamform.typechoice(1))
    .wait(200)
    .type(
      team.fragment ? newteamform.fragment : newteamform.collection,
      team.fragment ? team.fragment : team.collection
    )
    .click(
      team.fragment
      ? newteamform.fragmentchoice(1)
      : newteamform.collectionchoice(1)
    )
    .wait(200)
    .click(newteamform.submit),
  addteammember: update => nightmare => nightmare
    .use(gototeams())
    .waitForUrl(/manage.teams/)
    .wait('input')
    .type(editteamform.addmember(update.team), `${update.member}`)
    .click(editteamform.memberchoice(update.team, 1)),

  // posts
  gotoManagePosts: gotoposts,
  createpost: post => nightmare => nightmare
    .use(gotoposts())
    .waitForUrl(/manage.posts/)
    .wait('input')
    .type(newpostform.title, post.title)
    .click(newteamform.submit),
  publishpost: () => nightmare => nightmare
    .use(gotoposts())
    .waitForUrl(/manage.posts/)
    .wait('input')
    .click(editpostform.publish),
  unpublishpost: () => nightmare => nightmare
    .use(gotoposts())
    .waitForUrl(/manage.posts/)
    .wait('input')
    .click(editpostform.unpublish),
  writepost: post => nightmare => nightmare
    .use(gotoposts())
    .waitForUrl(/manage.posts/)
    .wait('input')
    .click(editpostform.edit)
    .waitForUrl(/sciencewriter/)
    .wait('.title')
    .wait(200)
    .insert(writer.title, false)
    .type(writer.title, post.title)
    .type(writer.abstract, post.abstract)
    .type(writer.content, post.content)
    .click(writer.abstract).wait(200)
    .click(writer.save),
  readpost: () => nightmare => nightmare
    .use(gohome())
    .waitForUrl(home)
    .wait('.blogpost')
    .click('.blogpost a')
    .waitForUrl(/sciencewriter/)
    .wait(writerroot)
}
