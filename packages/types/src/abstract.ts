/**
 * # Core types
 * Share interfaces that exist in both domain and infrastructure concepts
 */
export interface Core {}


/**
 * This is the lowest common denominator across all entities in PubSweet
 */
export interface IObject {
  id: string;
  created: Date;
}

export interface IAction {

}

/**
 * Not everything is updatable
 */
export interface IUpdatable extends IObject {
  updated?: Date;
}

export interface IDeletable extends IObject {
  deleted?: Date;
}

export interface IMutable extends IUpdatable, IDeletable {}

export interface IActor extends IObject {
  kind: "user" | "admin" | "system";
  actor_id: string;
}

export interface IOwnable extends IObject {
  owner: IActor; // Need to define some kind of user interface
}

// Some things can have teams assigned to them

/**
 * Denotes a collection of users
 */
export interface IAssignable {
  assignees: IActor[]
}

/**
 * Used to group comments/reviews/notes on a Submission
 *
 * Questions:
 * - Is IFeedback an action or is it a Object?
 */
export interface IFeedback extends IOwnable, IObject {
  content: string;
}
