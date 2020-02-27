The philosophy of workflow design articulated in the “[Platform Design](#/Designing%20workflow 'undefined')” section places emphasis on making the same Workspaces reusable by many different kinds of users. The system for deciding how a workspace should appear for different kinds of users must therefore encapsulate a significant amount of the workflow logic, and needs to be highly flexible. PubSweet's answer to this problem is the Authsome module.

The publishing world has a unique combination of requirements when it comes to authorization:

- highly complex hierarchical roles (many different roles with very specific tasks),
- collaborative work on documents (many people working on the same document at the same time)
- and different states of documents (e.g. a document can be in a 'submitted' state, or in a 'review' state).

This combination of requirements is not trivial to address using typical approaches for permissions in a web applications.

For example, a baseline approach would be a role-based system (RBAC), so let's try to work through an example of a journal publishing system using roles. In RBAC, you assign roles to users of your system, and that assignment of a role grants them permissions. Let's try to imagine a simple journal publishing system, and the roles that describe it:

- Author: users with the Author role can create and edit submissions.
- Reviewer: users with the Reviewer role can create and edit reviews.
- Editor: users with this role are all-powerful.

So far so good. These seem very sensible roles and permissions. But let's work through the example further. One of the requirements is that reviewers can only create a review for specific submissions, to which they are assigned. We can address this by enabling the linking of roles to resources; so, for example, the reviewer role can also be a resource-based role, linked to a specific manuscript: User X has the Reviewer role for manuscript Y. This seems sensible too. But let's continue working through the requirements.

Another requirement is that manuscripts should not be edited by the author while they are in review. This is where the combination of requirements becomes an issue for RBAC and similar systems and they start to break down. Specifically, permissions are often based on the state of the resource as well as other factors. This kind of granular control is nearly impossible with RBAC, but is achievable with RBAC's evolution, attributes-based access control or ABAC.

In ABAC, permissions can depend on any attribute in the system, not just roles. This gives you a lot of flexiblity in terms of how to structure your authorization principles.

As we have learned with other bits and pieces of the PubSweet ecosystem, the more flexiblity there is in a given system, the less likely it is that reusable solutions will come out of it. Some rigidity and structure is good for reusability, so we designed a flexible but well defined system within an ABAC context: Authsome. On the highest level, Authsome consists of a question-like interface: “Can user X do action Y to object Z?”, and a completely flexible mechanism for answering these types of questions in so-called `authsome` modes. Combining this approach with PubSweet's core Team model (teams of different types, e.g. team of Reviewers, linking groups of people to a specific resource), creates PubSweet's flexible but structured answer to the incredibly varied requirements of the publishing landscape.
