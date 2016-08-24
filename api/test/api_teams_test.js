// const request = require('supertest-as-promised')
// const expect = require('expect.js')
//
// const Collection = require('../models/Collection')
// const User = require('../models/User')
// const Team = require('../models/Team')
//
// const dbCleaner = require('./helpers/db_cleaner')
// const fixtures = require('./fixtures/fixtures')
// const api = require('./helpers/api')
//
// describe('Teams API - admin', () => {
//   before(() => {
//     return dbCleaner().then(() => {
//       return new User(fixtures.fixtures.adminUser).save()
//     }).then(() => {
//       return new User(fixtures.user).save()
//     })
//   })
//
//   it('should display an initially empty list of teams if user is admin', () => {
//     return api.users.authenticate.post(
//       fixtures.adminUser
//     ).then(
//       (token) => {
//         return request(api)
//           .get('/api/teams')
//           .set('Authorization', 'Bearer ' + token)
//           .expect(200)
//       }
//     ).then(
//       (res) => {
//         expect(res.body).to.eql([])
//       }
//     )
//   })
//
//   it('should display the existing teams if user is admin', () => {
//     return new Team(fixtures.team).save().then(() => {
//       return api.users.authenticate.post(
//         fixtures.adminUser
//       )
//     }).then((token) => {
//       return request(api)
//         .get('/api/teams')
//         .set('Authorization', 'Bearer ' + token)
//         .expect(200)
//     }).then((res) => {
//       let team = res.body[0]
//       expect(team.teamType.name).to.eql(fixtures.team.teamType.name)
//       expect(team.users).to.eql([])
//     })
//   })
//
//   it('should not allow listing all teams if user is not an admin', () => {
//     return getToken(
//       user
//     ).then(
//       (token) => {
//         return request(api)
//           .get('/api/teams')
//           .set('Authorization', 'Bearer ' + token)
//           .expect(403)
//       }
//     )
//   })
// })
//
// describe('Teams API - per collection or fragment', () => {
//   describe('Collection teams', () => {
//     describe('owners', () => {
//       let collectionId
//       let otherUserId
//       let teamId
//       let team = fixtures.team
//
//       before(() => {
//         return dbCleaner().then(
//           () => new User(fixtures.user).save()
//         ).then(
//           (user) => {
//             let collection = new Collection(fixtures.collection)
//             collection.owners = [user]
//             return collection.save()
//           }
//         ).then(
//           (collection) => {
//             collectionId = collection.id
//           }
//         ).then(
//           () => new User(fixtures.updatedUser).save()
//         ).then(
//           (otherUser) => {
//             otherUserId = otherUser.id
//           }
//         )
//       })
//
//       it('can display an initially empty list of teams', () => {
//         return getToken(
//           fixtures.user.username,
//           fixtures.user.password
//         ).then(
//           (token) => {
//             return request(api)
//               .get('/api/collections/' + collectionId + '/teams')
//               .set('Authorization', 'Bearer ' + token)
//               .expect(200)
//           }
//         ).then(
//           (res) => expect(res.body).to.eql([])
//         )
//       })
//
//       it('can add a team with a team member to a collection and this team member can then create fragments', () => {
//         return api.users.authenticate.post(
//           fixtures.user
//         ).then((token) => {
//           team.name = 'Test team'
//           team.members = [otherUserId]
//           team.objectId = collectionId
//
//           return request(api)
//             .post('/api/collections/' + collectionId + '/teams')
//             .send(team)
//             .set('Authorization', 'Bearer ' + token)
//             .expect(201)
//         }).then((res) => {
//           teamId = res.body.id
//           expect(res.body.name).to.eql(team.name)
//         }).then(() => {
//           return api.users.authenticate.post(
//             fixtures.updatedUser
//           )
//         }).then((token) => {
//           return request(api)
//             .post('/api/collections/' + collectionId + '/fragments')
//             .send(fixtures.fragment)
//             .set('Authorization', 'Bearer ' + token)
//             .expect(201)
//         })
//       })
//
//       it('can remove a team member and that removed team member can no longer create fragments', () => {
//         team.members = []
//         return api.users.authenticate.post(
//           fixtures.user
//         ).then((token) => {
//           return request(api)
//             .put('/api/collections/' + collectionId + '/teams/' + teamId)
//             .send(team)
//             .set('Authorization', 'Bearer ' + token)
//             .expect(200)
//         }).then((res) => {
//           return api.users.authenticate.post(
//             fixtures.updatedUser
//           )
//         }).then((token) => {
//           return request(api)
//             .post('/api/collections/' + collectionId + '/fragments')
//             .send(fixtures.fragment)
//             .set('Authorization', 'Bearer ' + token)
//             .expect(403)
//         })
//       })
//     })
//
//     describe('non-owners', () => {
//       let collectionId
//       before(() => {
//         return dbCleaner().then(() => {
//           return new User(fixtures.user).save()
//         }).then((user) => {
//           let collection = new Collection(fixtures.collection)
//           collection.owners = []
//           return collection.save()
//         }).then((collection) => {
//           collectionId = collection.id
//         })
//       })
//
//       it('should not be authorized to see teams for a collection', () => {
//         return api.users.authenticate.post(
//           fixtures.user
//         ).then((token) => {
//           return request(api)
//             .get('/api/collections/' + collectionId + '/teams')
//             .set('Authorization', 'Bearer ' + token)
//             .expect(403)
//         })
//       })
//     })
//   })
// })
