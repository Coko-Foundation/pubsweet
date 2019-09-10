import { IAssignable, IActor, IObject, IMutable, IOwnable } from './abstract';

/**
 * This is for domain types.
 *
 * This module is for interfaces and types that directly relate to the publishing domain. For example `ISubmittable` is a domain type, because it relates to a domain action that can be
 * taken on a domain entity.
 */

export interface Domain {}

interface Organisation extends IMutable {
  name: string;
  journals: Journal[];
}

interface Journal extends IMutable {
  journalTitle: string;
  manuscripts: Submission[];
  publisherName: string;
}

interface Submission extends IMutable {
  manuscriptVersions: never;
  files: File[];
  teams: any[];
  reviews: any[];
  status: string;
  formState: string;
  decision: string;
  title: string;
  articleType: string;
  articleIds: string;
  abstract: string;
  subjects: string;
  history: Array<Date>;
  publicationDates: Array<Date>;
  notes: Note[];
}

interface Note extends IMutable {
  notesType: string;
  content: string;
}

interface File extends IMutable {
  type: string;
  label: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
}

interface Review extends IMutable, IOwnable {
  comments: any[];
  reccomendation: string;
  open: boolean;
}

interface Team extends IMutable, IAssignable {
  members: TeamMember[]; // teamMember
  role: string;
  object: IObject;
  objectType: string;
}

interface TeamMember {
  user: IActor;
  status: string;
  alias: Alias; //Alias;
}

interface Alias extends PureIdentity{
  name: string;
}

export type LocalIdentifier = {
  name: string;
};

export type ExternalIdentifier =  {
  identifier: string;
  type: string;
};

export interface PureIdentity extends IObject, IMutable {
  email: string;
  aff: string;  // JATS <aff>
};

export interface LocalIdentity extends PureIdentity, LocalIdentifier {}
export interface ExternalIdentity extends PureIdentity, ExternalIdentifier {}
