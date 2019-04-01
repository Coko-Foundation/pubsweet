PubSweet is both an [open source software project](https://gitlab.coko.foundation/pubsweet/pubsweet 'undefined') and an open community, part of the broader [Collaborative Knowledge Foundation](https://coko.foundation/ 'undefined') (Coko) community. We welcome people of all kinds to join the community and contribute with knowledge, skills, expertise. Everyone is welcome in [our chat room](https://mattermost.coko.foundation/coko/channels/town-square 'undefined').

<img src="image-36-0.jpg" style="max-width: 400px; width: 100%;display: block;margin: 1em auto;">

Coko Community Meeting

The core modules and components are developed and maintained by a dedicated team and a community of contributors. Anyone is welcome to contribute ideas, issues, and code. Development is managed in the PubSweet project on the Coko Foundation GitLab instance. We track high-level PubSweet issues and discussion in the [project-wide issue tracker](https://gitlab.coko.foundation/pubsweet/pubsweet/issues 'undefined').

In order to contribute to PubSweet, you're expected to follow a few sensible guidelines.

## Search first, ask questions later

If you want to create a new component or if you've experienced a bug or want to discuss something in the issue trackers, please search before you start developing to find out whether it already exists.

## Discuss your contribution before you build

Please let us know about the contribution you plan to make before you start it. Either comment on a relevant existing issue, or open a new issue if you can't find an existing one. This helps us avoid duplicating effort and to ensure contributions are likely to be accepted. You can also [ask in the chat room](https://mattermost.coko.foundation/coko/channels/pubsweet 'undefined') if you are unsure.

For contributions made as discussions and suggestions, you can at any time open an RFC in our issue tracker and PubSweet community members will be happy to jump into a discussion.

## Use merge requests

We maintain `master` of the PubSweet monorepo (a [Lerna](https://lernajs.io/ 'undefined')\-managed single repository with multiple packages) as the production branch, and tag it with release names. If you wish to contribute to PubSweet, you need to make a branch and then issue a pull request following this procedure:

- Create a user account on [Coko GitLab](http://gitlab.coko.foundation 'undefined')
- Clone `master` with `git clone git@gitlab.coko.foundation:pubsweet/pubsweet.git`
- Create a new branch and work off that. Please name the branch which sensibly identifies the feature you are working on. You can push the branch to Coko Gitlab at anytime.

## Use Conventional Commits

An automated process will reject your commit if it doesn't follow the commit guidelines. All notable changes to the work will be automatically documented in a `CHANGELOG.md` file. See [Conventional Commits](https://conventionalcommits.org/ 'undefined') for commit guidelines.

## Merge request workflow

Merge requests should be marked as `WIP:` (Work In Progress) until they are completely ready to be reviewed. When you think the MR is ready, remove the WIP label and a member of the PubSweet team will review the changes. Once any requested changes or problems have been resolved, the MR will be considered for merging. We encourage feedback and discussion from as many people as possible on Merge Requests.

Before merging, all MRs must fulfill these three simple rules:

1.  It must pass the tests.
2.  It must not reduce the test coverage.
3.  If the MR is a bug fix, it must include a regression test.

# Releases

Releases are done with a `lerna publish` command from the main `pubsweet/pubsweet` repository. This releases all packages (about 50 of them) with the 'latest' tag on npm. Should you wish to do a release using a different tag (e.g. a prerelease with the 'next' tag), you can use e.g. `lerna publish --dist-tag next`. Be careful with releses!
