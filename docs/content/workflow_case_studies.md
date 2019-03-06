# eLife case study

[eLife Sciences Publications Ltd](elifesciences.org 'undefined') is an Open Access journal that publishes promising research in the life and biomedical sciences. eLife is currently in the process of building an application based on PubSweet for its manuscript submission process.

At the start of the project, eLife's initial driver was to understand the publishing workflow from a user's perspective. To do this, eLife ran a three-day workshop with a representative group of users with the aim of understanding and recording the current pain points, goals and user's needs. The output from this activity was a rich set of highly dense information. To help feed the design process, these were turned into user stories and categorized using a Trello board.

The Coko development team were invited to visit the eLife offices to review the current Collabra Psychology version of xpub-Collabra components against eLife's user stories. This was done to see how closely the Collabra workflow matched eLife's, and also to understand whether any of the work could be reused.

There was plenty of overlap in ideas between eLife and Collabora's workflow, but the developers saw that eLife had a lot of organization-specific needs that would need to be catered to. Based on this understanding, eLife's current workflow was reviewed against the user stories by running a workflow mapping session with the editorial team.

Once eLife approved the resulting workflow diagram, the next step was to understand how a user might navigate each space and to outline some of the controls that might be needed per page. To make this easier to understand, the workflow was broken down per role. The diagram below shows a portion of this breakdown.

<img src="/image-10-0.svg" style="max-width: 700px; width: 100%;display: block;margin: 1em auto;">

eLife Workflow by role (partial)

## Wireframing

Based on the agreed diagrams, the development team started to build some wireframes in order to share their ideas with the Editorial team. At this stage there was no need to be too concerned about exactly how each control worked, but rather to determine whether the general controls per page would allow each user to carry out the tasks they needed to.

Wireframing provided a quick way to get some early feedback and ensure that the development team had covered the needs of the editorial team.

### Testing

It was useful for eLife to print out a full set of wireframes and ask the eLife Editorial team to assume various roles that would interact with the system. eLife had tested their initial submission workflows, so they needed to assume the roles of Staff, Author, Deputy Editor and Senior Editor. The eLife product team acted as “the system” by presenting each user with a paper prototype screen and asking them to interact with it.

This process uncovered parts of the system that were either missing or hard to understand and helped the developers make refinements to the lo-fi designs. These were then shared again until it was clear the the series of basic screens and controls had effectively covered the editorial team's workflow.

### Design Review

For the next stage, eLife reviewed what had been designed so far and discussed areas of the interface that needed refinement. The designs were laid out on the office floor and a post-it note session was run to allow participants to express any concerns. Finally, each design was checked to see if it had covered the list of user stories from the Trello board.

This step was very useful in refining the interface designs and led to significant changes to parts of the UI. eLife moved forward with the designs from this point by breaking the project into large components (Workspaces) such as assignment controls or submission wizard. This made it easier to work through parts of the interface that needed further consideration before increasing the fidelity of the designs to more closely match the final interface design.

# Hindawi case study

Hindawi is one of the world’s largest publishers of peer-reviewed, fully Open Access journals. Built on an ethos of openness, Hindawi is passionate about working with the global academic community to promote open scholarly research to the world. Hindawi's experience with PubSweet is an excellent illustration of the option to “build-only-what-you-need” approach.

Hindawi currently operates its peer review process with a distributed Editorial Board model. PubSweet enabled Hindawi to experiment by adding additional oversight with a new Editor in Chief (EiC) role by building the requisite functionality into a new submission system. To start this process, Hindawi took many of the workflows and diagrams that existed for the current Hindawi system, and applied them to the a new EiC model.

As Hindawi uses its own peer review management system, many of the flows and requirements for a new platform were already established. They just needed to identify areas to improve, and potential new requirements for partners. Hindawi joined a two-day product design workshop to discuss workflows and user journeys based on the existing use cases, and list out all the key actions, statuses, and role requirements for the workflows.

The main outcome of the product design phase was a first set of wireframes from a UX/UI designer for the articulated workflows. Based on the wireframes, multiple rounds of feedback were gathered from the existing production team, internal researchers, and external partners, to ensure the manuscript's workflow was correct. That effort resulted in a definitive list of required workspaces.

<img src="/image-11-0.svg" style="max-width: 700px; width: 100%;display: block;margin: 1em auto;">

Hindawi Workflow

Next, Hindawi reviewed how much of the workflow overlapped with xPub-Collabra and other existing PubSweet applications, and performed a gap analysis for PubSweet Components. This helped identify what could be reused and what needed to be built.

It is also worth mentioning that the logic governing the editor's process was deliberately left somewhat open-ended (e.g. no time limits, just reminders; no minimum number of reviewers, and so on). These details will be added once the flow of the manuscript works as expected. Hindawi also decided to leave complex email management out of the initial build to avoid complexity (i.e. certain email notifications are part of the system to begin with), but this functionality will need to be incorporated at a later stage. Discipline in choosing a minimum viable thin slice of functionality to build first — taking care not to build oneself into a corner — is an important guiding principle.

# Europe PMC case study

[Europe PMC](https://europepmc.org 'undefined') is a repository providing worldwide access to life sciences articles, books, patents, preprints, and clinical guidelines. [Europe PMC Funders' Group](http://europepmc.org/Funders/ 'null') organisations mandate that published research arising from the grants they award must be made available through Europe PMC. One way this can be achieved is for authors to submit, via the submission system run by Europe PMC (Europe PMC plus), the manuscripts of such articles once they have been peer reviewed and accepted for publication.

Europe PMC staff at the European Bioinformatics Institute (EMBL-EBI) are currently in the process of redeveloping Europe PMC plus using PubSweet. Because Europe PMC plus only accepts articles that have already been peer reviewed and accepted for publication, and requires a full publication citation before the submission is considered complete, the Europe PMC plus workflow and data requirements are somewhat different from those of the journal publishers using PubSweet. The editorial staff and requirements are also much more circumscribed.

At the start of the redevelopment project, Europe PMC team members worked together with Adam Hyde in a Workflow Sprint (see [Workflow Sprint](inline 'undefined') chapter) to define an idealised workflow and identify any overlaps with existing PubSweet components.

<img src="/image-12-0.svg" style="max-width: 700px; width: 100%;display: block;margin: 1em auto;">

Europe PMC plus submission workflow

Using this workflow and other excercises from the Workflow Sprint, the Europe PMC team came up with wireframes for three wizards that will comprise the new Plus system. Next, Europe PMC reviewed how much of the workflow and wireframes overlapped with xpub-Collabra, xpub-Faraday, xpub-eLife, and other existing PubSweet applications, and performed a gap analysis for the components that would still need to be developed.

Europe PMC follows a design and development process focused on User Experience (UX). The Europe PMC UX team improved the existing wireframes and developed user stories to expand upon the idealised workflow and provide detailed requirements for the components of each wizard. From this point, Europe PMC has quickly bootstrapped the Plus project based on xpub-Collabra. A UX designer is closely involved in the development of user interfaces from new and existing PubSweet components. Additionally, components and functionality are throroughly tested by the Europe PMC QA engineer, and user tested by the staff who administrate the Plus system. User testing with Europe PMC plus submitters will also be completed regularly throughout the development of the project.

Europe PMC plus will be hosted on EMBL-EBI's own computing infrastructure, such as its OpenShift container platform and its private Minio cloud storage.

# A general model

As a result of collaboratively writing the use cases and the example of the Workflow Sprint method during this Book Sprint, we were able to come up with a useful abstraction of the different paths to designing a PubSweet platform.

In essence, Coko, eLife, Hindawi, and Europe PMC each started with an understanding of the publishing workflow. This is, in short, a high level description of who does what as described by roles (Editor in Chief, Handling Editor, Reviewer, Author etc). While these might be documented in different ways, such as in a list for Workflow Sprints, or in Trello for eLife, the effect is the same.

At this moment, the processes diverged. Workflow Sprints went rapidly towards designing the high level workspace diagram and then iterated on the UX/UI for each space later (during the build process), whereas Hindawi and eLife moved to UX/UI first, designing the micro-iteractions upfront, and that was the driver for understanding the workspaces needed.

Both pathways started from the same point — workflow — and ended in the same point — workflow mapped onto PubSweet workspaces. Both processes spend time understanding and optimising a publisher's workflow. Both also include UX/UI design and a way to describe their system in terms of workspaces. However the journey in between is quite different as you can see in the below diagram.

<img src="/image-13-0.svg" style="max-width: 400px; width: 100%;display: block;margin: 1em auto;">

Different pathways from Workflow to Workspaces

The pathway for all starts at workflow. Workflow Sprints turns right and moves first to designing the block-level PubSweet workspace diagram before moving on to UI/UX. Hindawi and eLife both turn left to address UI/UX first, using that as a method for understanding the workspaces needed.

It should also be noted that in all cases the above diagram is convectional, in the sense that there are major flows but smaller iterative processes continuously move through each part of the above stages throughout the entire development cycle.

As the community grows and we can share more experiences like this, we will come to understand the strengths and weaknesses of each and learn which of these processes is good for which kind of situation. However it is interesting to note that all of the foundational Coko community partners place publishing workflow at the top of the mountain, and everything is driven by it - quite possibly a very different approach to the way publishing tool providers have done things to date.
