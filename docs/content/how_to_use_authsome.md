Authsome is a minimal module with some syntactic sugar surrounding a flexible attribute-based access control (ABAC) core.

Each PubSweet app has a configuration file where you can specify by filepath an `authsome` “mode” (set of authorization functions) you'd like your application to use and what team types should exist in the system. For example:

```js static
module.exports = {
  authsome: {
    mode: path.resolve(\_\_dirname, 'authsome.js'),
    teams: {
      seniorEditor: {
        name: 'Senior Editors',
      },
      handlingEditor: {
        name: 'Handling Editors',
      },
      managingEditor: {
        name: 'Managing Editors',
      },
      reviewer: {
        name: 'Reviewer',
      },
    },
  },
}
```

See also https://gitlab.coko.foundation/xpub/xpub/blob/master/config/default.js#L5-22:

The way your mode handles an authorization query is completely flexible, for example, the simplest mode could look like:

```js static
const yourMode = async function(user, operation, object, context) {
  return true
}
```

The above will just return true for any kind of authorization query, so it's not really useful outside of the imaginary educational world (take a look at more example modes below).

Authsome is designed to enable isomorphic use on the client and server. Changing the authsome mode therefore has the potential to change the behaviour of the entire application, from the GraphQL API through to the client-side app.

# The Authsome API

The Authsome external API consists of:

```js static
const authsome = new Authsome({ mode: yourMode }, context)
const permission = authsome.can(user, operation, object)
```

The call to `authsome.can` is called an “authorization query” or “question” in discussions, and you'll see these terms pop up in various places.

A useful but still minimal example might be something like the below, where you instantiate a mode with more information about the environment where authorization questions are asked (such as how to find a user in the database):

```js static
const authsome = new Authsome(
  { mode: yourMode },
  {
    models: {
      User: {
        find: id => User.find(id),
      },
    },
  },
)
```

This would proxy `models.User.find` to your `User.find`, which is accessible from where you instantiate Authsome, e.g. in your server or your client, and in practice this gives your mode access to your models or similarly important context. An authsome mode that knows about the User model can then do things like this:

```js static
module.exports = {
  before: async function (userId, operation, object, context) {
    const user = await context.models.User.find(userId)
    if (user.admin) {
      return true
    }
  },
  someOperation: async function (userId, operation, object, context) {
    const user = await context.models.User.find(userId)
    if(user.allowedSomeOperation) {
      return true
    }
  }
```

The above gives you a good way to structure your authorization modes, where each property of your mode corresponds to handling of authorization queries for a certain operation. The one exception is the `before` property of a mode, which is evaluated before everything else, and is used to give, for example, admin users the permissions to do everything. The other property of the above example mode is `someOperation`, which corresponds to the operation parameter in an `authsome.can(user, someOperation, object)` query.

The client provides a helper component that make working with authorization on the client-side easier — the Authorize helper:

```jsx static
import Authorize from 'pubsweet-client'
;<Authorize object={manuscript} operation="DELETE">
  <Button onClick={this.onDestroyClick} plain>
    Delete
  </Button>
</Authorize>
```

Above is an example of showing/hiding UI that relates to an authorization request, for another example, perhaps a Create Blogpost button .

# How to write your mode

Note that we can replicate an RBAC system with Authsome if we wish, by storing whether or not a user can do `someOperation` on the User model. To give more flexibility, however, we recommend using the concept of Teams. Teams are groups of users that are either:

- Object-based: linked to particular objects (a team of reviewers may be reviewers for only one manuscript)
- Global: not linked to particular objects (admin permissions are the same for every kind of object)

The permissions of teams on objects are then stored in the authsome mode itself. That is, the authsome mode checks which whether the teams that are linked to a particular object can validly access that object in its current state. An example of a team is, e.g. a team of reviewers, which is linked to a manuscript object. When the question of `authsome.can(reviewerUser, 'review', manuscript)` is considered, the mode checks if the status property of the manuscript is 'in-review', and returns true if it is.

This system involves storing some redundant data, since we create a new set of teams for each new object in the system, but we find the flexibility gained to be worthwhile.

## Example 1: How can I prevent the Editor in Chief from accepting their own manuscript?

For some reason this question gets asked often in various contexts and variations. We don't know why exactly; maybe it's because it's something that's hard to do in current systems. With authsome it's straightforward.

If you have authorization failure conditions (as opposed to authorization granting conditions) you have to address those first. In the case of this question, `authsome.can(editor, 'accept', manuscript)`, you'd first check if the authenticated user (the editor) is a member of a global team of type 'Editor in Chief' and also one of the authors of the manuscript – and return false/deny access if they are, but allow every other action. A simpler example would be if one imagines a President, who has the power to issue pardons, but should not be able to pardon himself. In authsome, you'd simply do this in the mode:

```js static
module.exports = {
  pardon: async function (userId, operation, object, context) {
    const user = await context.models.User.find(userId)
    if (user === object) {
      return false
    }
    return true
  }
```

Using authsome you can then ask questions like:

```js static
authsome.can(president, 'pardon', president)
```

With this approach even generally omnipotent users' permissions can be finely tuned.

## Example 2 : Wormbase (a good way to get started with PubSweet)

In [Wormbase](https://gitlab.coko.foundation/micropubs/wormbase 'wormbase'), there are four types of teams: Author, Editor, Reviewer, and Science Officer. Authors write the manuscript. Editors approve and assign a Reviewer for a manuscript. A Science Officer (a super admin) has the same permissions as an Editor but across all manuscripts.

When you're managing teams, you create a new team with a certain type, and a certain object. In the case of Authors, you would choose the manuscript object as the object of the team. Reviewers can only review once they have accepted their invitation.

## Further Examples

For examples of Authsome in action look at the built in example modes:

1.  [Blog](https://gitlab.coko.foundation/pubsweet/authsome/blob/master/src/modes/blog/index.js 'undefined')
2.  [Journal](https://gitlab.coko.foundation/pubsweet/authsome/blob/master/src/modes/journal/index.js 'undefined')
3.  [Noon](https://gitlab.coko.foundation/pubsweet/authsome/blob/master/src/modes/noon/index.js 'undefined')
4.  [Specific](https://gitlab.coko.foundation/pubsweet/authsome/blob/master/src/modes/specific/index.js 'undefined')

The modes above are used mostly to test that authsome works, and continues to work, for all the use cases it's built to support. There are also real world/advanced examples out there for xpub ([PubSweet-based journal publishing platform](https://gitlab.coko.foundation/xpub/xpub/blob/e52a20537c9ab7447a1d316bb2decd26b14d4bb7/config/authsome.js 'undefined')) and Editoria ([PubSweet-based book production platform](https://gitlab.coko.foundation/editoria/booksprints/blob/master/config/modules/authsome.js 'undefined')). To see how Teams are used to address authorization requirements, consult these.
