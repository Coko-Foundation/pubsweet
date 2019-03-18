PubSweet is already in use in a number of different publishing contexts. The following examples illustrate some ways PubSweet can be used.

# Books

Almost all scholarly monographs are written by authors in MS Word, then submitted as .docx files to publishers. The content work — editing, copyediting, and reviewing — usually happens on the Word files as well. Many presses style the .docx files using Word macros and add-on tools to semantically tag all the content. Passing static files back and forth between authors and editors can be cumbersome and slow, at best, and cause versioning problems, at worst: who has the latest files? who made these changes? Once the content is complete, books go through production to be paginated and converted to other formats, an expensive, slow, and sometimes error-prone endeavor.

No longer! Working with the University of California Press, the Collaborative Knowledge Foundation has created and continues to develop [Editoria](https://editoria.pub 'undefined'), an in-browser scholarly book production platform. Editors and authors upload author files into a book structure, then collaborate to style, copyedit, and review the content online, enabling fully automated export to a print-ready, paginated PDF, epub, and more.

<img src="image-4-0.svg" style="width: 100%;max-width: 500px; display: block;margin: 1em auto;">

Editoria Workspaces

There is strong interest in adoption from other university presses, and as of mid-2018, the University of North Carolina Press is planning to use Editoria to publish up to 150 Open Access, digital-first books in the next three years.

# Journals

As a response to inflexible and expensive content and journal management systems, several PubSweet journal systems for submission, peer review, and publication are being developed by organizations including eLife, Hindawi, and Collabra: Psychology from the University of California Press. Collectively we call these PubSweet journal platforms 'xPub' (and refer to them each as xpub-Collabra, xpub-eLife etc).

<img src="image-4-1.svg" style="width: 100%;max-width: 500px; display: block;margin: 1em auto;">

Hindawi Workspaces

Academic journals share many similarities, but also tend to have slightly different workflow variations from one to the next. For example, almost all journals need an interface to search, invite and manage reviewers, and many do so in much the same way. However, the minutiae of editorial workflows also tends to vary greatly: does it go to a senior editor for further editor assignment, or straight to a handling editor? is the editor assigned or invited? does the author or the editor assign the submission type? are there different editor assignment chains for different submission types, and if not, _should_ there be, were it possible?

This is perfect for PubSweet's use-what-you-want and build-only-what-you-need approach. Two separate journals might share the same reviewer assignment component, but both have separate reviewer forms and editor assignment workflows.

Its also important to note that PubSweet can be extended on the back end to accomodate journal requirements. For example, Semantic Extraction techniques are accommodated by PubSweet. Extraction is done within PubSweet using server-side components that are integrated into the workflow. There are many tools for extraction; currently the community is working together using [ScienceBeam Judge](https://github.com/elifesciences/sciencebeam-judge 'undefined') as a test framework to help improve the tools. The Coko project [INK](https://coko.foundation/product-suite/ 'undefined') can also be used to manage these kinds of processes and integrates with PubSweet very nicely.

# Micropublications

PubSweet can also be used to support micropublications - such things as data depositions or case studies that fall short of what would be considered a traditional journal research article. Legacy publishing systems are built with generic use cases in mind (e.g. typical journals). Consequently, other use cases such as micropublications are often left behind. It is almost impossible to find existing softwares that match their workflows or can be easily extended.

An example: the Collaborative Knowledge Foundation is working with WormBase, a nematode model organism gene database, to create an elegant submission, curation, and publication platform.

<img src="image-4-2.svg" style="width: 100%;max-width: 500px; display: block;margin: 1em auto;">

Micropublications Workspaces

Authors often misclassify their submission type. With the opportunity to build a new system, the Wormbase staff decided that in the best workflow, curators - not authors - would set the submission type. The author submits some initial information, common to all submissions, a curator selects the submission type, then the author submits a follow-up form with the submission type-specific data. These kinds of tweaks can make an incredible difference to a workflow but are simply not possible without the ability to customize a platform.

# Europe PMC plus

Europe PMC is a worldwide, free, life sciences literature repository for journal articles, preprints, books, patents and clinical guidelines. Researchers funded by the Europe PMC funders are required to submit their publications to Europe PMC plus (a manuscript submission system used by researchers, administrators submitting their behalf, and publishers who bulk-submit manuscripts via FTP) to comply with the funders' open access policies.

<img src="image-4-3.svg" style="width: 100%;max-width: 500px; display: block;margin: 1em auto;">

Europe PMC Plus Workspaces

As a repository, Europe PMC plus only accepts articles that have already been peer reviewed and accepted for publication, and requires a full publication citation before the submission is considered complete. The Europe PMC plus workflow and data requirements are therefore different from those of journal publishers using PubSweet. EMBL-EBI staff are using PubSweet components to develop and customize the Europe PMC plus workflow and functionalities to meet the requirements of all parties, including researchers, submitters, publishers, Europe PMC administrators, third party contractors (XML taggers) and funders.

# Aperture

The Organization for Human Brain Mapping is developing a new publishing system called Aperture, built with PubSweet. They plan to build a platform to publish tutorials, reviews, and educational materials. Beyond that, they plan to add support for living digital documents: interactive plots and software, computational notebooks, and post-publication peer review, to help move the needle away from static and isolated published research outputs to more dynamic, networked ones.
