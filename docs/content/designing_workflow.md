Unless you are starting a completely new publishing venture, your workflow has likely been at least partially dictated over the years by inflexible, prescriptive content management systems, and a combination of workflow steps and ad hoc platform modifications designed to get around your tools' limitations. The end result is legacy workflows with many _cul-de-sacs_ and eddies that do not reflect anything like an _ideal_ workflow.

We want workflow, not workarounds…

With PubSweet, publishers of all sizes have the opportunity to break this unhealthy pattern, and are empowered to re-imagine and build the workflow they really want. However workflow design isn't a job title and it is sometimes difficult to know where to start. This is also where the Coko community can help.

In "PubSweet, workflow and workspaces", we go over the core concepts of designing a workflow for PubSweet. The following chapter, “Workflow Sprints”, documents a method for working out your ideal workflow and mapping it onto a PubSweet platform, designed by Coko co-founder Adam Hyde. After that, in the “case study” chapters, we describe the experience of eLife, Hindawi, and Europe PMC in redesigning their workflow for PubSweet. The teams carried out a process influenced by the Workflow Sprints, modified to suit their organizations. Finally, in “A general model”, we collate lessons learned from these case studies.

<img src="image-7-0.jpg" style="max-width: 400px; width: 100%;display: block;margin: 1em auto;">

Cindy (University of California Press) designing Editoria

# PubSweet, workflow and workspaces

Before designing your PubSweet platform, there are some core PubSweet concepts to become familiar with.

The genesis of PubSweet followed the observation that many “big box” platforms had a single (and therefore prescriptive) approach to what journal publishing workflow should look like, or at least, how workflow should be tracked. PubSweet's proposition is that there is no one journal workflow, nor is there one book workflow, micropublications workflow, and so on, although they do all share some common fundamentals. PubSweet is not prescriptive about your workflow, but it does make some assumptions about how that workflow is realized. Just two will do for now - the rest are better described in other chapters.

The first assumption is that publishing workflows should occur in the web. Currently the web has not really affected publishing workflow, with two exceptions:

1.  Using the browser as an interface to what are essentially data stores (manuscript submission systems or, in the case of books, title management systems).
2.  Using the web to deliver books and articles.

The web offers the opportunity for publishing to leverage tools for collaboration that could reach beyond the submission moment (into the lab), past the point of publication (“living documents”) and everything in between. PubSweet takes the position that the web is the most powerful collaborative network of our time, and needs to be brought into the heart of publishing workflows.

Secondly, PubSweet has the concept of **workspaces** (often also refered to as “components”, “front end components” or just “spaces“). To bring publishing to the web, we need our workflows to inhabit the browser; we need to see the browser as a workspace, or rather a series of workspaces that instantiate our desired workflow.

Perhaps the easiest way to illustrate this idea of workspaces is by example. In your online experience, you have probably come across the notion of a dashboard. Many web platforms have them — Wordpress Dashboard for example, or Google Dashboard — a common space where you can get an overview of all things you need in order to get on with the particular task at hand. Dashboards are good examples of a particular kind of workspace. PubSweet enables your workflow by chaining together a series of workspaces, then directing the right people to the right workspaces at the right moments so they can do what they have to do.

For example, Editoria, as it is configured for the University of California Press, has the following roles: Production Editor, Copy Editor, Author. Works come in from the acquisitions department in the form of a folder of MS Word documents. The Production Editor creates a new book from the Dashboard and uploads these documents into Editoria. The Production Editor then collaborates with the Author and Copy Editor on each book by re-arranging the structure in the Book Builder workspace and editing individual chapters using the editor (you could also call it a chapter-editing-workspace, if you wish). There is a lot of other detail, such as controlling who should have access to what and when (more on all this later) but in essence, everything is performed in three workspaces: the Dashboard, The Book Builder, and the Editor. A high-level system architecture for the Editoria platform looks like this:

<img src="image-8-0.svg" style="max-width: 400px; width: 100%;display: block;margin: 1em auto;">

Editoria Workspaces

Let's contrast that with a completely different workflow. Collabra Psychology is a journal that also operates out of the University of California Press. Coko is building a new platform for Collabra on top of PubSweet. The roles are pretty standard for a journal: Managing Editor, Senior Editor, Handling Editor, Author, and Reviewer. The workflow is also pretty standard: An Author creates a new submission (from the Dashboard), creates and submits a manuscript and associated metadata from the Submission Page, then a series of Editors manage the workflow from the Decision Control workspace. Reviewers are assigned from the Manage Review workspace, and then reviewers read the article, write and submit reviews from dedicated Review workspaces.

The total number of workspaces for Collabra Psychology then is 6 - Dashboard, Submission Page, Manuscript, Decision Control, Manage Review, and the Review workspaces. The high level workspaces architecture looks like this:

<img src="image-8-1.svg" style="max-width: 400px; width: 100%;display: block;margin: 1em auto;">

Collabra Workspaces

Now you have an idea of how Workspaces work, the next thing you want to do, if you are designing a PubSweet platform, is to work out your ideal workflow, and map it onto PubSweet workspaces. This will be covered in the following chapters.

# Workflow Sprints

The following methodology is a process designed by Coko co-founder Adam Hyde, who has successfully facilitated a number of publishers through this process, including Wormbase, Collabra Psychology, the Organization for Human Brain Mapping, ArXiv, Erudit and others. The aim of these sprints is to design an optimized publishing workflow and translate that into a high level architecture for a PubSweet platform using workspaces — in one day!

This process can be facilitated to work with new publishing projects, or to optimize tthe workflow of existing publishing organizations. To conduct a Workflow Sprint you need the following:

- an afternoon's commitment from at least one person per role within the publisher
- a room
- a whiteboard
- large pieces of paper
- pens
- an experienced facilitator
- some nice snacks and drinks (coffee)!

Be warned — Workflow Sprints are fun and exciting, and great team building exercises, but they are also definitely exhausting. Make sure you have a nice space and plenty of good food and drinks to help your team enjoy the experience.

## Step one: designing / optimizing workflow

The process of designing (in the case of new projects) a publishing workflow or optimizing an existing workflow is a process of open discussion. Like all good stories, you start at the beginning and ask what happens first. You want the people that are actually involved in that part of the story to tell it.

<img src="image-9-0.jpg" style="max-width: 400px; width: 100%;display: block;margin: 1em auto;">

Aperture Workflow Sprint

If you can, make sure you also involve an author in the process to say what happens from their experience. The workflow is recorded in a very basic form in the following format:

1.  Role and title of step
2.  Action(s) for each step.

A basic step could look something like this:

**Author starts new submission**

If we were to go further, it might look like this:

**Author starts new submission**

**Author completes submission**

**Author submits submission**

**Editor reviews submission...**

When documenting these steps, write them down on a surface that all involved can easily see (such as a whiteboard). Some of these records will be revisited as you go, so leave room for alterations and additions.

Note that you are not documenting the current _software_, you are documenting the _workflow_ as it is now and discussing as you go and looking for ways to improve it. Modify the steps so they reflect the improvements that come from the discusssions (we want to design an improved workflow, not document the existing workflow). Discussion and new ideas are very important as you want the participants to start leaving behind their legacy understanding of workflow based on their current software, to enable a new way of thinking about what they do. Later you will design a system to meet this optimal workflow design.

As you go through this process, discussion is facilitated. Anyone with a query needs to be able to ask a question about the step being discussed. You also want people to suggest better ways of doing things as you go, and to tease out as much nuance as possible about how things are currently done. This will require the facilitator to ask many clarifying questions about the current step, and it is important to drill down and get absolute clarity. It often means asking apparently stupid questions, but only by doing this will you uncover what is actually happening. This is absolutely critical to understand before you can attempt to improve upon the current way of doing things.

For example, it is not uncommon that one or more parts of the workflow involve someone moving to a specific computer with the tools for a certain task, which may actually be in another room or building. It is important that this detail is teased out so everyone can understand how absurd some of the things their colleagues have to do really are. If they understand, they will be motivated to help optimize the workflow to flush out these absurdities and improve their colleagues' workflow.

A word about facilitation of this process: you can facilitate this process for your own organization, but it's best to avoid this if possible. Experience has shown that existing hierarchies and inter-personal dynamics within an organization will hamper an internal facilitator's ability to challenge what is said and to provoke discussion on new ways of doing things. It is far better that a facilitator isn't subject to these dynamics, so if possible bring in an external facilitator.

The trick here is to get clarity but not get stuck in a quagmire of nuance. You will need to move the conversation along and to dig out the detail relatively quickly. In addition, be very careful to avoid magical thinking with regard to the role technology can play in this process. Often someone will say something like “Imagine if we could automatically....” That is one of a number of indicators that there's an investment in magical thinking. Be very realistic with what technology can and can’t do. Do not make the mistake of including a workflow step that magically makes a lot of steps disappear through automation _unless_ you have that technology available and know its limits, as illustrated through your own experiences in production.

Avoiding quagmires and magical thinking is another reason why an experienced facilitator is recommended. It should take no longer than an afternoon to map out the optimized workflow. Don’t worry if this is not yet ‘as optimized’ as you would like: there will be plenty of time in the following processes to improve on things.

Note that you should be able to document and optimize at the same time. However, should you feel more comfortable with breaking this into a two-stage process, you can first document the current workflow, then discuss and work on optimizing it in a second session.

Whichever way you choose, document it all as you go.

## Step two: mapping work to Workspaces

With the above information you could now make a flow diagram representing the workflow. However it is hard to design software based on a typical flow diagram representation. The workflow looks horribly convoluted, linear, inflexible; and recursive processes are awfully hard to document and parse.

So, let’s throw away the flow diagram approach for describing workflow, and find a better way. Let's connect each of the above steps directly to a the concept of a Workspace as described in the previous chapter.

Let’s look at how this applies with an example from the world of journals. For example, imagine a Managing Editor needs to sanity-check all new submissions. They log into the system (or they might receive an email notification) and see a new submission listed. Contained in the notification (email/dashboard, etc.) is a link, and they click through to the submission page and read through it. That submission page is a simple Workspace.

So this is pretty simple. Now step through every step in the workflow, as described in the section above, and map out the Workspaces. To do this, take each step already identified and connect it to a Workspace where the action is performed.

When listed out for any workflow, formatted as who (role) does what (actions) _where_ (Workspace), the process will look something like this:

1.  Author creates a new submission from the _Dashboard_
2.  Author fills out submission data _on the Submission page_
3.  Author Submits the submission _from the Submission page_
4.  Managing Editor checks submission data _on the Submission page_
5.  Managing Editor assigns Handling Editor _from the Dashboard_

…etc.

### Keep it simple

An entire workflow could be mapped in the same way as the above example, one step after the other, describing a simple workspace for each step until the whole workflow is accounted for. But, there's a danger of creating a whole lot of unique workspaces, with each step showing a dashboard notification “directing the user” to a unique workspace. That’s not very helpful, as you would soon end up with hundreds of unique, one-action workspaces.

Instead, impose a few simple constraints on the team. The basic constraints are as follows:

1.  Reuse as many workspaces as possible.
2.  Only add a new workspace when absolutely sure the existing workspaces can’t be reused.

If this is done through the entire workflow and you stay disciplined, you will end up with a very simple diagram of workspaces. For example, in mapping the _Collabra: Psychology_ journal, the following results:

<img src="image-9-1.svg" style="max-width: 400px; width: 100%;display: block;margin: 1em auto;">

Collabra Workspaces

This ‘bird's eye view’ of the workspace architecture shows just 6 workspaces that cover the entire workflow. Your goal is to design a similarly simple view for your own workflow.

### Simple actions

It is important to keep one final principle in mind during the system design: simple single actions usually don't need their own dedicated workspace, and are best added to an existing workspace. Also, don’t put the same simple action feature in two places. One of those places is wrong — make a decision!

As with every part of system design, these trade offs are up to you to decide on.

## Summary

The entire process is actually quite simple:

1.  Write down each step of the workflow in the format - who (Role) does what (action), optimizing as you go.
2.  Start with a Dashboard (it's a handy starting point) and go through the workflow step by step.
3.  With each step try to reuse an existing Workspace.
4.  If you can’t use an existing workspace, create a new one.
5.  At each step also ask yourself: is this a simple single action, and if so can it be added to an existing Workspace or do I need different workspace?

There is a bit of wrangling needed, but this is a pretty effective way of capturing seemingly complex workflows in relatively simple systems, systems that can also be optimized over time.
